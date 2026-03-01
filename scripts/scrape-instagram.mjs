/**
 * Instagram Image Downloader
 * ─────────────────────────────────────────────────────────────────
 * Downloads publicly visible images from @herhighness__aesthetics
 * and saves them to public/images/gallery/
 *
 * Usage: npm run scrape:instagram
 *
 * NOTE: Run this once to seed your gallery. After running,
 * upload the best images to AWS S3 for CDN delivery.
 *
 * Requirements: node >= 18 (native fetch), puppeteer installed separately:
 *   npm install --save-dev puppeteer sharp
 */

import { mkdir, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const GALLERY_DIR = join(__dirname, "../public/images/gallery");
const INSTAGRAM_USERNAME = "herhighness__aesthetics";
const MAX_IMAGES = 12;

async function scrapeInstagram() {
  let puppeteer;
  try {
    puppeteer = await import("puppeteer");
  } catch {
    console.error(
      "❌ Puppeteer not installed. Run: npm install --save-dev puppeteer"
    );
    process.exit(1);
  }

  await mkdir(GALLERY_DIR, { recursive: true });
  console.log(`📁 Gallery directory ready: ${GALLERY_DIR}`);

  const browser = await puppeteer.default.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );
    await page.setViewport({ width: 1280, height: 800 });

    const url = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;
    console.log(`🌐 Loading ${url}...`);
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

    // Wait for images to load
    await page.waitForSelector("img", { timeout: 10000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 3000));

    // Extract image URLs from page
    const imageUrls = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll("img"));
      return imgs
        .map((img) => img.src)
        .filter(
          (src) =>
            src.includes("instagram") &&
            (src.includes(".jpg") || src.includes(".jpeg") || src.includes("jpg")) &&
            !src.includes("profile_pic") &&
            src.length > 50
        )
        .slice(0, 15);
    });

    console.log(`📸 Found ${imageUrls.length} potential images`);

    let downloaded = 0;
    for (let i = 0; i < Math.min(imageUrls.length, MAX_IMAGES); i++) {
      try {
        const response = await fetch(imageUrls[i]);
        if (!response.ok) continue;

        const buffer = Buffer.from(await response.arrayBuffer());
        const filename = `${i + 1}.jpg`;
        const filepath = join(GALLERY_DIR, filename);
        await writeFile(filepath, buffer);
        console.log(`  ✅ Saved: ${filename}`);
        downloaded++;

        // Polite delay
        await new Promise((r) => setTimeout(r, 500));
      } catch (err) {
        console.log(`  ⚠ Skipped image ${i + 1}: ${err.message}`);
      }
    }

    console.log(`\n✨ Done! Downloaded ${downloaded} images to ${GALLERY_DIR}`);
    console.log("\nNext steps:");
    console.log("1. Review the images in public/images/gallery/");
    console.log("2. Keep the best 6-9 for the gallery");
    console.log(
      "3. Upload them to S3: aws s3 sync public/images/ s3://hha-assets/images/"
    );
    console.log(
      "4. Update GALLERY array in app/gallery/page.tsx with S3/CloudFront URLs"
    );
  } finally {
    await browser.close();
  }
}

scrapeInstagram().catch((err) => {
  console.error("❌ Scraper failed:", err.message);
  process.exit(1);
});
