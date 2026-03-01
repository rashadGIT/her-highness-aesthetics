import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  // Protect /admin and all /admin/* routes EXCEPT /admin/login
  matcher: ["/admin", "/admin/((?!login).*)"],
};
