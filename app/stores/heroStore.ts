import { useHistoryStore } from './historyStore';
import localforage from 'localforage';

export const useHeroStore = defineStore('hero', () => {
  const unlockedHeroIds = ref<string[]>([]);
  const devMode = ref(false);
  const historyStore = useHistoryStore();

  const STORAGE_KEY = 'history-hero-collection';

  const initialize = async () => {
    if (typeof window !== 'undefined') {
      let saved = await localforage.getItem<string>(STORAGE_KEY);
      if (!saved) {
        saved = localStorage.getItem(STORAGE_KEY);
        if (saved) await localforage.setItem(STORAGE_KEY, saved);
      }
      if (saved) {
        try {
          unlockedHeroIds.value = JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse hero collection', e);
        }
      }
    }
  };

  const saveToStorage = async () => {
    if (typeof window !== 'undefined') {
      await localforage.setItem(STORAGE_KEY, JSON.stringify(unlockedHeroIds.value));
    }
  };

  const unlockHero = async (heroId: string): Promise<boolean> => {
    if (!unlockedHeroIds.value.includes(heroId)) {
      unlockedHeroIds.value.push(heroId);
      saveToStorage();

      // Trigger badge check using historyStore data
      const { useBadgeStore } = await import('./badgeStore');
      const { useProgressStore } = await import('./progressStore');
      const badgeStore = useBadgeStore();
      const progressStore = useProgressStore();
      
      badgeStore.checkNewBadges(
        progressStore.completedLessons, 
        unlockedHeroIds.value, 
        { eras: historyStore.eras }
      );

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
