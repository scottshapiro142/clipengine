import type { Caption } from "@/types";

/**
 * Transcribes the audio of a video clip using a Whisper-compatible API
 * and returns timestamped captions.
 *
 * @param filePath - Path to the video or audio file
 * @returns Array of Caption objects with start/end times and text
 */
export async function generateCaptions(filePath: string): Promise<Caption[]> {
  // TODO: Integrate with OpenAI Whisper API or a local Whisper model.
  // The audio should be extracted from the video using ffmpeg before passing
  // to the transcription API.
  console.log(`Generating captions for: ${filePath}`);
  return [];
}
