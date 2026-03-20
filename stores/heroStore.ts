import { defineStore } from 'pinia';

export const useHeroStore = defineStore('hero', () => {
  const unlockedHeroIds = ref<string[]>([]);
  const devMode = ref(false);

  const STORAGE_KEY = 'history-hero-collection';

  const initialize = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          unlockedHeroIds.value = JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse hero collection', e);
        }
      }
    }
  };

  const saveToStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedHeroIds.value));
    }
  };

  const unlockHero = async (heroId: string): Promise<boolean> => {
    const { locale } = useI18n();
    if (!unlockedHeroIds.value.includes(heroId)) {
      unlockedHeroIds.value.push(heroId);
      saveToStorage();

      // Trigger badge check
      const { useBadgeStore } = await import('./badgeStore');
      const { useProgressStore } = await import('./progressStore');
      const badgeStore = useBadgeStore();
      const progressStore = useProgressStore();
      const historyMap = await import(`../content/${locale.value}/history-map.json`);
      badgeStore.checkNewBadges(progressStore.completedLessons, unlockedHeroIds.value, historyMap.default);

      return true;
    }
    return false;
  };

  const setDevMode = (value: boolean) => {
    devMode.value = value;
  };

  const isUnlocked = computed(() => (heroId: string) => {
    return devMode.value || unlockedHeroIds.value.includes(heroId);
  });

  const totalUnlocked = computed(() => unlockedHeroIds.value.length);

  return {
    unlockedHeroIds,
    devMode,
    initialize,
    saveToStorage,
    unlockHero,
    setDevMode,
    isUnlocked,
    totalUnlocked,
  };
});
