export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface LessonBlock {
  type: "paragraph" | "list" | "heading";
  text?: string;
  items?: string[];
}

export interface LessonContent {
  blocks: LessonBlock[];
}
