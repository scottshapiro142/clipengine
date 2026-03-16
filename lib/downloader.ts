import ytDlp from "yt-dlp-exec";
import fs from "fs/promises";
import path from "path";

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
 * Downloads a YouTube video to the provided directory using yt-dlp.
 *
 * @param url - The YouTube video URL
 * @param outputDir - The directory where the downloaded file should be saved
 * @returns The absolute local file path of the downloaded video
 */
export async function downloadVideo(url: string, outputDir: string): Promise<string> {
  if (!isValidYouTubeUrl(url)) {
    throw new Error("Invalid YouTube URL");
  }

  await fs.mkdir(outputDir, { recursive: true });

  const metadata = await ytDlp(url, {
    dumpSingleJson: true,
    skipDownload: true,
    noWarnings: true,
    noPlaylist: true,
  });

  if (!metadata?.id) {
    throw new Error("Failed to resolve YouTube video ID");
  }

  const outputTemplate = path.join(outputDir, `${metadata.id}.%(ext)s`);

  await ytDlp(url, {
    output: outputTemplate,
    noPlaylist: true,
    format: "bestvideo+bestaudio/best",
    mergeOutputFormat: "mp4",
  });

  return path.resolve(outputDir, `${metadata.id}.mp4`);
}
