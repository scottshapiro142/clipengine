import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/download
 * Body: { url: string }
 *
 * Downloads a YouTube video using yt-dlp and returns the local file path.
 * TODO: Implement yt-dlp integration.
 */
export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "Missing YouTube URL" }, { status: 400 });
  }

  // TODO: Spawn yt-dlp process, download to /tmp, return file path
  return NextResponse.json({ message: "Download endpoint stub", url });
}
