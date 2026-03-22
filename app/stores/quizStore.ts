import { defineStore } from "pinia";
import type { QuizAttempt } from "~/types/history";
import localforage from "localforage";

export const useQuizStore = defineStore("quiz", () => {
  // Record of best scores for each lesson/mastery quiz
  // Key: lessonId or eraId (for mastery)
  const quizScores = ref<Record<string, number>>({});
  
  // High scores (100% correct)
  const masteredQuizzes = ref<string[]>([]);
  
  // Active quiz state
  const currentLives = ref(3);
  const isGameOver = ref(false);

  const initialize = async () => {
    if (typeof window !== "undefined") {
      let savedScores = await localforage.getItem<string>("quiz-scores");
      if (!savedScores) { savedScores = localStorage.getItem("quiz-scores"); if(savedScores) await localforage.setItem("quiz-scores", savedScores); }
      if (savedScores) quizScores.value = JSON.parse(savedScores);

      let savedMastery = await localforage.getItem<string>("mastered-quizzes");
      if (!savedMastery) { savedMastery = localStorage.getItem("mastered-quizzes"); if(savedMastery) await localforage.setItem("mastered-quizzes", savedMastery); }
      if (savedMastery) masteredQuizzes.value = JSON.parse(savedMastery);
    }
  };

  const saveToStorage = async () => {
    if (typeof window !== "undefined") {
      await localforage.setItem("quiz-scores", JSON.stringify(quizScores.value));
      await localforage.setItem("mastered-quizzes", JSON.stringify(masteredQuizzes.value));
    }
  };

  const setScore = (id: string, score: number, total: number) => {
    const percent = Math.round((score / total) * 100);
    
    // Update best score if higher
    if (!quizScores.value[id] || percent > quizScores.value[id]) {
      quizScores.value[id] = percent;
    }

    // Mark as mastered if 100%
    if (percent === 100) {
      if (!masteredQuizzes.value.includes(id)) {
        masteredQuizzes.value.push(id);
      }
      
      // Unlock Hero Letter if available (even if already mastered)
      const letterStore = useLetterStore();
      letterStore.unlockLetter(id);
    }
    saveToStorage();
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
    initialize,
    setScore,
    resetQuizSession,
    loseLife,
    isMastered,
  };
});
