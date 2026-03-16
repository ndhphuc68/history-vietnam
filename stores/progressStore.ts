import { defineStore } from 'pinia'

interface ProgressState {
  completedLessons: string[]
  unlockedBadges: string[]
  currentLessonId: string | null
}

export const useProgressStore = defineStore('progress', {
  state: (): ProgressState => ({
    completedLessons: [],
    unlockedBadges: [],
    currentLessonId: null
  }),

  actions: {
    completeLesson(lessonId: string) {
      if (!this.completedLessons.includes(lessonId)) {
        this.completedLessons.push(lessonId)
      }
    },
    unlockBadge(badgeId: string) {
      if (!this.unlockedBadges.includes(badgeId)) {
        this.unlockedBadges.push(badgeId)
      }
    },
    setCurrentLesson(lessonId: string | null) {
      this.currentLessonId = lessonId
    }
  },

  getters: {
    isLessonCompleted: (state) => (lessonId: string) => {
      return state.completedLessons.includes(lessonId)
    },
    totalCompleted: (state) => {
      return state.completedLessons.length
    }
  },

  // Enable persistence if needed later (e.g., with pinia-plugin-persistedstate)
  persist: false
})
