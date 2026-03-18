import type { Era } from "~/types/history";

export type MapNodeAlign = "left" | "right";

export interface HistoryMapProps {
  eras: Era[];
}

export interface MapNodeProps {
  id: string;
  title: string;
  lessonId: string;
  year?: string;
  isUnlocked?: boolean;
  isCompleted?: boolean;
  align?: MapNodeAlign;
}

