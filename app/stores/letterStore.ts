import { defineStore } from 'pinia';
import type { HeroLetter } from '~/types/history';

export const useLetterStore = defineStore('letter', () => {
  const collectedLetterIds = ref<string[]>([]);
  const allLetters = ref<HeroLetter[]>([]);
  const lastUnlockedLetter = ref<HeroLetter | null>(null);

  const initialize = async () => {
    const { locale } = useI18n();
    
    const loadData = async () => {
      try {
        const data = await import(`../../content/${locale.value}/hero-letters.json`);
        allLetters.value = data.default as HeroLetter[];
      } catch (e) {
        console.error('Failed to load localized hero letters', e);
        const data = await import(`../../content/vi/hero-letters.json`);
        allLetters.value = data.default as HeroLetter[];
      }
    };

    await loadData();

    // Re-load when locale changes
    watch(locale, async () => {
      await loadData();
    });

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('collected-letters');
      if (saved) {
        collectedLetterIds.value = JSON.parse(saved);
      }
    }
  };

  const saveToStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('collected-letters', JSON.stringify(collectedLetterIds.value));
    }
  };

  const unlockLetter = (lessonId: string) => {
    const letter = allLetters.value.find(l => l.lessonId === lessonId);
    if (letter && !collectedLetterIds.value.includes(letter.id)) {
      collectedLetterIds.value.push(letter.id);
      lastUnlockedLetter.value = letter;
      saveToStorage();
      return letter;
    }
    return null;
  };

  const isCollected = (letterId: string) => {
    return collectedLetterIds.value.includes(letterId);
  };

  return {
    collectedLetterIds,
    allLetters,
    lastUnlockedLetter,
    initialize,
    unlockLetter,
    isCollected
  };
});
