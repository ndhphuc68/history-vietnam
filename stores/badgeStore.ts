import { defineStore } from 'pinia';
import badgeData from '~/content/badges.json';
import { useQuizStore } from '~/stores/quizStore';
import { useProgressStore } from '~/stores/progressStore';
import { useHeroStore } from '~/stores/heroStore';
import historyMapData from '~/content/history-map.json';

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
  const perfectQuizStreak = ref(0);
  const viewedGlossaryCount = ref(0);

  const initialize = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('earned-badges');
      if (saved) {
        earnedBadgeIds.value = JSON.parse(saved);
      }
      const streak = localStorage.getItem('quiz-streak');
      if (streak) perfectQuizStreak.value = parseInt(streak);
      const views = localStorage.getItem('glossary-views');
      if (views) viewedGlossaryCount.value = parseInt(views);
    }
  };

  const saveToStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('earned-badges', JSON.stringify(earnedBadgeIds.value));
      localStorage.setItem('quiz-streak', perfectQuizStreak.value.toString());
      localStorage.setItem('glossary-views', viewedGlossaryCount.value.toString());
    }
  };

  const trackGlossaryView = () => {
    viewedGlossaryCount.value++;
    saveToStorage();
    
    // Auto check badges
    const progressStore = useProgressStore();
    const heroStore = useHeroStore();
    checkNewBadges(progressStore.completedLessons, heroStore.unlockedHeroIds, historyMapData);
  };

  const trackQuizResult = (isPerfect: boolean) => {
    if (isPerfect) {
      perfectQuizStreak.value++;
    } else {
      perfectQuizStreak.value = 0;
    }
    saveToStorage();

    // Auto check badges
    const progressStore = useProgressStore();
    const heroStore = useHeroStore();
    checkNewBadges(progressStore.completedLessons, heroStore.unlockedHeroIds, historyMapData);
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
      } else if (type === "era") {
        // Find the era in the map
        const era = historyMap.eras.find((e: any) => e.id === value);
        if (era && era.levels) {
          isEligible = era.levels.every((level: any) =>
            completedLessons.includes(level.lesson),
          );
        }
      } else if (type === "mastery") {
        // Mastery check: all lessons in the era must be 100% (in quizStore.masteredQuizzes)
        const era = historyMap.eras.find((e: any) => e.id === value);
        if (era && era.levels) {
          isEligible = era.levels.every((level: any) =>
            quizStore.masteredQuizzes.includes(level.lesson),
          );
        }
      } else if (type === "perfect_quiz_streak") {
        isEligible = perfectQuizStreak.value >= (value as number);
      } else if (type === "glossary_view_count") {
        isEligible = viewedGlossaryCount.value >= (value as number);
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

  const totalBadges = computed(() => allBadges.value.length);
  const earnedCount = computed(() => earnedBadgeIds.value.length);
  const progressPercent = computed(() => 
    totalBadges.value > 0 ? Math.round((earnedCount.value / totalBadges.value) * 100) : 0
  );

  const stats = computed(() => {
    const counts = {
      common: 0,
      rare: 0,
      epic: 0,
      legendary: 0
    };
    
    allBadges.value.forEach(badge => {
      if (earnedBadgeIds.value.includes(badge.id)) {
        counts[badge.rarity]++;
      }
    });
    
    return counts;
  });

  return {
    earnedBadgeIds,
    allBadges,
    lastUnlockedBadge,
    perfectQuizStreak,
    viewedGlossaryCount,
    totalBadges,
    earnedCount,
    progressPercent,
    stats,
    initialize,
    checkNewBadges,
    trackGlossaryView,
    trackQuizResult
  };
});
