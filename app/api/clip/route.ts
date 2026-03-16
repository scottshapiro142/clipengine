import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { clipToShorts } from "@/lib/ffmpeg";

type ClipBody = {
  filePath?: unknown;
  startTime?: unknown;
  duration?: unknown;
};

/**
 * POST /api/clip
 * Body: { filePath: string; startTime: number; duration: number }
 *
 * Clips the video to a vertical 9:16 Shorts-ready format.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ClipBody;
    const filePath = body?.filePath;
    const startTime = body?.startTime;
    const duration = body?.duration;

    if (typeof filePath !== "string" || !filePath.trim()) {
      return NextResponse.json(
        { error: "Missing or invalid filePath" },
        { status: 400 },
      );
    }

    if (typeof startTime !== "number" || !Number.isFinite(startTime) || startTime < 0) {
      return NextResponse.json(
        { error: "startTime must be a non-negative number" },
        { status: 400 },
      );
    }

    if (typeof duration !== "number" || !Number.isFinite(duration) || duration <= 0) {
      return NextResponse.json(
        { error: "duration must be a positive number" },
        { status: 400 },
      );
    }

    const absoluteInputPath = path.resolve(filePath);

    try {
      await fs.access(absoluteInputPath);
    } catch {
      return NextResponse.json(
        { error: "Input file does not exist or is not accessible" },
        { status: 400 },
      );
    }

    const parsed = path.parse(absoluteInputPath);
    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const clippedFilePath = path.join(parsed.dir, `${parsed.name}_clipped_${uniqueSuffix}.mp4`);

    await clipToShorts(absoluteInputPath, clippedFilePath, startTime, duration);

    return NextResponse.json({ clippedFilePath });
  } catch (error) {
    console.error("Video clipping failed:", error);

    const message = error instanceof Error ? error.message : "Failed to clip video";

    return NextResponse.json(
      { error: message || "Failed to clip video" },
      { status: 500 },
    );
  }
}
