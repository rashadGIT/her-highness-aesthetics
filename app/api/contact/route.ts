import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validators";
import { sendContactFormNotification, sendContactAutoReply } from "@/lib/ses";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = contactFormSchema.parse(body);

    // Fire both emails in parallel
    await Promise.all([
      sendContactFormNotification(data),
      sendContactAutoReply({ name: data.name, email: data.email }),
    ]);

    // Fire n8n webhook (non-blocking, best-effort)
    const n8nUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nUrl) {
      fetch(`${n8nUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
      }).catch(() => {}); // fire and forget
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
