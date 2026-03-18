import { defineStore } from "pinia";
import type { QuizAttempt } from "~/types/history";

export const useQuizStore = defineStore("quiz", () => {
  // Record of best scores for each lesson/mastery quiz
  // Key: lessonId or eraId (for mastery)
  const quizScores = ref<Record<string, number>>({});
  
  // High scores (100% correct)
  const masteredQuizzes = ref<string[]>([]);
  
  // Active quiz state
  const currentLives = ref(3);
  const isGameOver = ref(false);

  const setScore = (id: string, score: number, total: number) => {
    const percent = Math.round((score / total) * 100);
    
    // Update best score if higher
    if (!quizScores.value[id] || percent > quizScores.value[id]) {
      quizScores.value[id] = percent;
    }

    // Mark as mastered if 100%
    if (percent === 100 && !masteredQuizzes.value.includes(id)) {
      masteredQuizzes.value.push(id);
    }
  };

  const resetQuizSession = () => {
    currentLives.value = 3;
    isGameOver.value = false;
  };

  const loseLife = () => {
    if (currentLives.value > 0) {
      currentLives.value--;
    }
    if (currentLives.value === 0) {
      isGameOver.value = true;
    }
  };

  const isMastered = (id: string) => masteredQuizzes.value.includes(id);

  return {
    quizScores,
    masteredQuizzes,
    currentLives,
    isGameOver,
    setScore,
    resetQuizSession,
    loseLife,
    isMastered,
  };
});
