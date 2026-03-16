import ffmpeg from "fluent-ffmpeg";

/**
 * Clips a video segment and converts it to vertical 9:16 format for Shorts.
 *
 * @param inputPath - Path to the source video file
 * @param outputPath - Destination path for the clipped output
 * @param startTime - Start time in seconds
 * @param duration - Duration in seconds (max 60 for Shorts)
 */
export function clipToShorts(
  inputPath: string,
  outputPath: string,
  startTime: number,
  duration: number,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!Number.isFinite(startTime) || startTime < 0) {
      reject(new Error("startTime must be a non-negative number"));
      return;
    }

    if (!Number.isFinite(duration) || duration <= 0) {
      reject(new Error("duration must be a positive number"));
      return;
    }

    const clippedDuration = Math.min(duration, 60);

    ffmpeg(inputPath)
      .setStartTime(startTime)
      .setDuration(clippedDuration)
      .videoFilters("crop=ih*9/16:ih")
      .output(outputPath)
      .on("end", () => resolve())
      .on("error", (err) => reject(err))
      .run();
  });
}
