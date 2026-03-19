import { defineStore } from 'pinia';
import letterData from '~/content/hero-letters.json';

export interface HeroLetter {
  id: string;
  heroId: string;
  lessonId: string;
  title: string;
  content: string;
  signature: string;
  date: string;
  icon: string;
}

export const useLetterStore = defineStore('letter', () => {
  const collectedLetterIds = ref<string[]>([]);
  const allLetters = ref<HeroLetter[]>(letterData as HeroLetter[]);
  const lastUnlockedLetter = ref<HeroLetter | null>(null);

  const initialize = () => {
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
