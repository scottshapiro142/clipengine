# Feature Breakdown & Tasks

This document outlines the initial feature breakdown for Codex to pick up and implement.

## 1. YouTube URL Input and Video Download
- Implement a user interface to accept a YouTube URL.
- Integrate `yt-dlp` to download the video in the highest available quality.
- Handle error states (invalid URL, age-restricted, private videos).

## 2. AI-Powered Moment Detection
- Process the downloaded video to find the "best" clips.
- This could involve analyzing audio spikes, silence detection, or using a vision/language model to identify high-engagement segments.
- Return a list of timestamps (start and end times) for potential clips.

## 3. Auto-Clipping to Shorts Format
- Use `ffmpeg` to crop the selected segments into a vertical format (9:16 aspect ratio).
- Ensure the final clip duration is a maximum of 60 seconds to comply with YouTube Shorts requirements.
- Handle different original aspect ratios (e.g., center cropping).

## 4. Auto-Captioning with Timing Sync
- Integrate an AI transcription model (like Whisper) to generate text from the clip's audio.
- Generate timestamped word-level or sentence-level captions.
- Burn the captions into the video using `ffmpeg` with styling suitable for short-form content (large, readable fonts).

## 5. Export/Upload to YouTube Shorts
- Provide an interface to preview the final generated Short.
- Implement functionality to export the video file locally.
- (Optional/Future) Integrate with the YouTube Data API to upload directly to a user's channel.
