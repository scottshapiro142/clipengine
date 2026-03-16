import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/clip
 * Body: { filePath: string; startTime: number; endTime: number }
 *
 * Uses ffmpeg to clip the video to a vertical 9:16 Shorts-ready format.
 * TODO: Implement ffmpeg integration.
 */
export async function POST(req: NextRequest) {
  const { filePath, startTime, endTime } = await req.json();

  if (!filePath || startTime === undefined || endTime === undefined) {
    return NextResponse.json(
      { error: "Missing filePath, startTime, or endTime" },
      { status: 400 }
    );
  }

  // TODO: Use fluent-ffmpeg to crop, resize to 9:16, and trim the clip
  return NextResponse.json({
    message: "Clip endpoint stub",
    filePath,
    startTime,
    endTime,
  });
}
