/**
 * Interface for a single slide in a lesson.
 */
export interface LessonSlide {
  type: "story" | "quiz";
  text?: string;
  image?: string;
  imagePrompt?: string;
  question?: string;
  options?: string[];
  answer?: string;
}

/**
 * Interface for the full lesson data structure.
 */
export interface LessonData {
  id: string;
  title: string;
  period: string;
  summary: string;
  image?: string;
  heroId?: string;
  slides: LessonSlide[];
}

/**
 * Interface for a specific level within an era.
 */
export interface Level {
  id: string;
  title: string;
  lesson: string;
}

/**
 * Interface for a historical era.
 */
export interface Era {
  id: string;
  title: string;
  levels: Level[];
}

/**
 * Interface for the root history map structure.
 */
export interface HistoryMap {
  eras: Era[];
}
