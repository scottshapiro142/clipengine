import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/caption
 * Body: { filePath: string }
 *
 * Transcribes the audio of a clip using Whisper (or compatible model)
 * and returns timestamped captions. Optionally burns them into the video.
 * TODO: Implement Whisper transcription integration.
 */
export async function POST(req: NextRequest) {
  const { filePath } = await req.json();

  if (!filePath) {
    return NextResponse.json({ error: "Missing filePath" }, { status: 400 });
  }

  // TODO: Call Whisper API or local model, return SRT/VTT captions
  return NextResponse.json({ message: "Caption endpoint stub", filePath });
}
