import { defineStore } from 'pinia'

interface ProgressState {
  completedLessons: string[]
  unlockedBadges: string[]
  currentLessonId: string | null
}

const STORAGE_KEY = 'history-progress'

export const useProgressStore = defineStore('progress', {
  state: (): ProgressState => ({
    completedLessons: [],
    unlockedBadges: [],
    currentLessonId: null
  }),

  actions: {
    initialize() {
      if (typeof window === 'undefined') return
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) return
      try {
        const parsed = JSON.parse(saved) as Partial<ProgressState>
        this.completedLessons = Array.isArray(parsed.completedLessons)
          ? parsed.completedLessons
          : []
        this.unlockedBadges = Array.isArray(parsed.unlockedBadges)
          ? parsed.unlockedBadges
          : []
        this.currentLessonId =
          typeof parsed.currentLessonId === 'string' || parsed.currentLessonId === null
            ? parsed.currentLessonId
            : null
      } catch (e) {
        console.error('Failed to parse progress', e)
      }
    },

    saveToStorage() {
      if (typeof window === 'undefined') return
      const payload: ProgressState = {
        completedLessons: this.completedLessons,
        unlockedBadges: this.unlockedBadges,
        currentLessonId: this.currentLessonId
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    },

    completeLesson(lessonId: string) {
      if (!this.completedLessons.includes(lessonId)) {
        this.completedLessons.push(lessonId)
        this.saveToStorage()
      }
    },
    unlockBadge(badgeId: string) {
      if (!this.unlockedBadges.includes(badgeId)) {
        this.unlockedBadges.push(badgeId)
        this.saveToStorage()
      }
    },
    setCurrentLesson(lessonId: string | null) {
      this.currentLessonId = lessonId
      this.saveToStorage()
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

  persist: false
})
