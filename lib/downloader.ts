import ytDlp from "yt-dlp-exec";
import path from "path";
import os from "os";

/**
 * Downloads a YouTube video to a temporary directory using yt-dlp.
 *
 * @param url - The YouTube video URL
 * @returns The local file path of the downloaded video
 */
export async function downloadVideo(url: string): Promise<string> {
  const outputDir = os.tmpdir();
  const outputTemplate = path.join(outputDir, "%(id)s.%(ext)s");

  // TODO: Capture the actual output filename from yt-dlp stdout
  await ytDlp(url, {
    output: outputTemplate,
    format: "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
    mergeOutputFormat: "mp4",
  });

  // Placeholder: return expected path; improve with actual filename resolution
  return outputDir;
}
