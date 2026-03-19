/**
 * Interface representing a specific level or checkpoint within an Era.
 */
export interface Level {
  /** Unique identifier for the level node in the map */
  id: string;
  /** Display title for children */
  title: string;
  /** Pointer to the lesson JSON filename (without .json) */
  lesson: string;
  /** Historical year or period (e.g., "Năm 938", "Thời Hùng Vương") */
  year?: string;
  /** Optional icon override (3D Fluent Emoji name) */
  icon?: string;
}

/**
 * Interface for a historical era containing multiple levels.
 */
export interface Era {
  /** Unique identifier for the era (e.g., "era1-founding") */
  id: string;
  /** Official name of the era (e.g., "Thời kỳ Dựng nước") */
  title: string;
  /** List of levels belonging to this era */
  levels: Level[];
}

/**
 * Root structure for the application's historical timeline.
 */
export interface HistoryMap {
  eras: Era[];
}

/**
 * Represents a story slide with text and illustration.
 */
export interface StorySlide {
  type: "story";
  /** Short, child-friendly storytelling text (max 2-3 sentences) */
  text: string;
  /** Path to the illustration image */
  image: string;
  /** The prompt used to generate the illustration (for reference) */
  imagePrompt?: string;
}

/**
 * Represents a quiz slide with a question and multiple choice options.
 */
export interface QuizSlide {
  type: "quiz";
  /** The question being asked */
  question: string;
  /** List of 3 options to choose from */
  options: string[];
  /** The correct answer string (must match one of the options) */
  answer: string;
}

/**
 * Discriminated union for lesson slides.
 */
export type Slide = StorySlide | QuizSlide;

/**
 * The structure of a lesson content JSON file.
 */
export interface LessonContent {
  /** Unique ID matching the filename */
  id: string;
  /** Full title of the lesson */
  title: string;
  /** Historical period name */
  period: string;
  /** Short descriptive summary/hook */
  summary: string;
  /** Main cover image for the lesson card */
  image: string;
  /** Optional ID of a hero unlocked upon completing this lesson */
  heroId?: string;
  /** Sequential list of story and quiz slides */
  slides: Slide[];
}

/**
 * Interface for historical heroes/figures.
 */
export interface Hero {
  /** Unique ID for the hero */
  id: string;
  /** Full name of the historical figure */
  name: string;
  /** Real name / alternate name */
  realName: string;
  /** Birth date / period (string for historical eras) */
  birthDate: string;
  /** Death date / period (string for historical eras) */
  deathDate: string;
  /** Place of origin */
  hometown: string;
  /** Position / role */
  position: string;
  /** Title or common designation (e.g., "Bố Cái Đại Vương") */
  title: string;
  /** Detailed description of their achievements */
  description: string;
  /** Path to the hero's avatar/illustration */
  image: string;
  /** Historical era/dynasty they belong to */
  era: string;
  /** Key achievements list */
  achievements: string[];
  /** A fun, child-friendly fact about the hero */
  funFact?: string;
}

/**
 * Represents a single quiz attempt by the user.
 */
export interface QuizAttempt {
  lessonId: string;
  score: number;
  total: number;
  timestamp: number;
}

/**
 * State structure for the Quiz store.
 */
export interface QuizState {
  /** Map of lessonId to best score percentage */
  quizScores: Record<string, number>;
  /** List of lessonIds where the user got 100% */
  masteredQuizzes: string[];
}

/**
 * Interface for historical terms and their definitions.
 */
export interface GlossaryItem {
  /** Unique identifier for the term (e.g., "lac-hau") */
  id: string;
  /** The term to be defined (e.g., "Lạc hầu") */
  term: string;
  /** Child-friendly definition of the term */
  definition: string;
  /** Optional category for filtering */
  category?: "Chức danh" | "Sự vật" | "Khái niệm" | "Địa danh" | "Thời kỳ";
}
