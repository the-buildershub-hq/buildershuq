import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const alt = "Builders Hub: Software Development Agency";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const imagePath = path.join(process.cwd(), "public", "og.png");
  const imageBuffer = fs.readFileSync(imagePath);

  return new Response(imageBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
