import { defineStore } from 'pinia'

interface HeroState {
  unlockedHeroIds: string[]
  devMode: boolean
}

const STORAGE_KEY = 'history-hero-collection'

export const useHeroStore = defineStore('hero', {
  state: (): HeroState => ({
    unlockedHeroIds: [],
    // Unlock all heroes for content verification in local development
    devMode: true 
  }),

  actions: {
    // Manual hydration for persistence
    initialize() {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          try {
            this.unlockedHeroIds = JSON.parse(saved)
          } catch (e) {
            console.error('Failed to parse hero collection', e)
          }
        }
      }
    },

    saveToStorage() {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.unlockedHeroIds))
      }
    },

    unlockHero(heroId: string) {
      if (!this.unlockedHeroIds.includes(heroId)) {
        this.unlockedHeroIds.push(heroId)
        this.saveToStorage()
        return true // Success, newly unlocked
      }
      return false // Already unlocked
    },

    setDevMode(value: boolean) {
      this.devMode = value;
    }
  },

  getters: {
    isUnlocked: (state) => (heroId: string) => {
      // In devMode, OR if it's already in the list, it's unlocked
      return state.devMode || state.unlockedHeroIds.includes(heroId)
    },
    totalUnlocked: (state) => {
      return state.unlockedHeroIds.length
    }
  }
})
