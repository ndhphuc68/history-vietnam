import type { Era, LessonContent, Slide } from "~/types/history";

export interface EraSectionProps {
  era: Era;
  index: number;
  allEras: Era[];
  availableLessonIds: string[];
  getEraThumbnail: (id: string) => string;
  getLessonThumbnail: (id: string) => string | undefined;
}

export interface LessonSlideViewerProps {
  currentSlide: Slide | null;
  currentSlideIndex: number;
  lessonData: LessonContent | null;
  quizSuccess: boolean;
  transitionName: string;
  getImagePath: (index: number) => string;
}

export interface LessonCardProps {
  id: string;
  title: string;
  summary?: string;
  period?: string;
  isCompleted?: boolean;
  isLocked?: boolean;
  isAvailable?: boolean;
  thumbnail?: string;
  eraThumbnail?: string;
}

export interface LessonContainerProps {
  progress: number;
  currentStep: number;
  totalSteps: number;
  title: string;
}

export interface StorySlideProps {
  text: string;
  image?: string;
  canNext?: boolean;
  showPrev?: boolean;
  nextLabel?: string;
  nextIcon?: string;
}

export interface QuizSlideProps {
  question: string;
  options: string[];
  answer: string;
  canNext?: boolean;
  showPrev?: boolean;
  nextLabel?: string;
  nextIcon?: string;
}

export interface NextButtonProps {
  label: string;
  disabled?: boolean;
}

export interface CompletionScreenProps {
  lessonTitle: string;
}

