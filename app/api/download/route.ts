import { NextRequest, NextResponse } from "next/server";
import os from "os";
import path from "path";
import { downloadVideo } from "@/lib/downloader";

function isValidYouTubeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();

    return (
      host === "youtube.com" ||
      host === "www.youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtu.be"
    );
  } catch {
    return false;
  }
}

/**
 * POST /api/download
 * Body: { url: string }
 *
 * Downloads a YouTube video and returns the local file path.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = body?.url;

    if (typeof url !== "string" || !url.trim()) {
      return NextResponse.json({ error: "Missing YouTube URL" }, { status: 400 });
    }

    if (!isValidYouTubeUrl(url)) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    const outputDir = path.join(os.tmpdir(), "clipengine-downloads");
    const filePath = await downloadVideo(url, outputDir);

    return NextResponse.json({ filePath });
  } catch (error) {
    console.error("Video download failed:", error);

    const message = error instanceof Error ? error.message : "Failed to download video";

    return NextResponse.json(
      { error: message || "Failed to download video" },
      { status: 500 },
    );
  }
}
