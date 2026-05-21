export type AnalysisSnapshot = {
  id: string;
  savedAt: string;
  excerpt: string;
  wordCount: number;
  charCount: number;
  readingTimeSecs: number;
  topKeywords: { word: string; count: number }[];
};
