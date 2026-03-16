export interface ClipJob {
  id: string;
  youtubeUrl: string;
  status: "pending" | "downloading" | "analyzing" | "clipping" | "captioning" | "done" | "error";
  localFilePath?: string;
  clips?: Clip[];
  error?: string;
}

export interface Clip {
  id: string;
  startTime: number; // seconds
  endTime: number;   // seconds
  score: number;     // AI engagement score 0–1
  outputPath?: string;
  captions?: Caption[];
}

export interface Caption {
  startTime: number; // seconds
  endTime: number;   // seconds
  text: string;
}
