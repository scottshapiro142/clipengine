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
  duration: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    // TODO: Add crop filter for 9:16 aspect ratio based on source dimensions
    ffmpeg(inputPath)
      .setStartTime(startTime)
      .setDuration(Math.min(duration, 60))
      .videoFilters("crop=ih*9/16:ih") // center-crop to 9:16
      .output(outputPath)
      .on("end", () => resolve())
      .on("error", (err) => reject(err))
      .run();
  });
}
