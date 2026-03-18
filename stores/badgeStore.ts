import { defineStore } from 'pinia';
import badgeData from '~/content/badges.json';
import { useQuizStore } from '~/stores/quizStore';

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirement: {
    type: 'count' | 'lesson' | 'era' | 'hero-count' | 'mastery';
    value: string | number;
  };
}

export const useBadgeStore = defineStore('badge', () => {
  const earnedBadgeIds = ref<string[]>([]);
  const allBadges = ref<Badge[]>(badgeData as Badge[]);
  const lastUnlockedBadge = ref<Badge | null>(null);

  const initialize = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('earned-badges');
      if (saved) {
        earnedBadgeIds.value = JSON.parse(saved);
      }
    }
  };

  const saveToStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('earned-badges', JSON.stringify(earnedBadgeIds.value));
    }
  };

  const checkNewBadges = (completedLessons: string[], unlockedHeroes: string[], historyMap: any) => {
    const quizStore = useQuizStore();
    const newBadges: Badge[] = [];

    allBadges.value.forEach(badge => {
      if (earnedBadgeIds.value.includes(badge.id)) return;

      let isEligible = false;
      const { type, value } = badge.requirement;

      if (type === 'count') {
        isEligible = completedLessons.length >= (value as number);
      } else if (type === 'lesson') {
        isEligible = completedLessons.includes(value as string);
      } else if (type === 'hero-count') {
        isEligible = unlockedHeroes.length >= (value as number);
      } else if (type === 'era') {
        // Find the era in the map
        const era = historyMap.eras.find((e: any) => e.id === value);
        if (era && era.levels) {
          isEligible = era.levels.every((level: any) => completedLessons.includes(level.lesson));
        }
      } else if (type === 'mastery') {
        isEligible = quizStore.isMastered(`mastery-${value}`);
      }

      if (isEligible) {
        earnedBadgeIds.value.push(badge.id);
        newBadges.push(badge);
      }
    });

    if (newBadges.length > 0) {
      saveToStorage();
      lastUnlockedBadge.value = newBadges[newBadges.length - 1] || null;
      return newBadges;
    }
    return [];
  };

  return {
    earnedBadgeIds,
    allBadges,
    lastUnlockedBadge,
    initialize,
    checkNewBadges
  };
});
