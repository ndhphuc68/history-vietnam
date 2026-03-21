import { defineStore } from 'pinia';
import type { Era, Hero } from '~/types/history';

export const useHistoryStore = defineStore('history', () => {
  const eras = ref<Era[]>([]);
  const heroes = ref<Hero[]>([]);
  const isLoaded = ref(false);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const { locale } = useI18n();

  /**
   * Load all core history data for the current locale.
   */
  const loadHistoryData = async (force = false) => {
    if (isLoaded.value && !force) return;

    loading.value = true;
    error.value = null;

    try {
      // Use dynamic imports to load localized JSON files
      const [mapData, heroesData] = await Promise.all([
        import(`../../content/${locale.value}/history-map.json`),
        import(`../../content/${locale.value}/heroes.json`)
      ]);

      eras.value = mapData.default.eras || [];
      heroes.value = heroesData.default || [];
      
      isLoaded.value = true;
    } catch (err: any) {
      console.error('Failed to load history data:', err);
      error.value = err.message || 'Unknown error';
    } finally {
      loading.value = false;
    }
  };

  /**
   * Initialize the store.
   */
  const initialize = async () => {
    await loadHistoryData();
  };

  /**
   * Find a specific lesson (level) across all eras.
   */
  const getLessonById = (lessonId: string) => {
    for (const era of eras.value) {
      const level = era.levels.find(l => l.id === lessonId);
      if (level) return { level, era };
    }
    return null;
  };

  /**
   * Get a flat list of all lessons.
   */
  const allLessons = computed(() => {
    return eras.value.flatMap(era => era.levels);
  });

  /**
   * Find a specific hero by ID.
   */
  const getHeroById = (heroId: string) => {
    return heroes.value.find(h => h.id === heroId);
  };

  // Watch for locale changes to reload data
  watch(locale, () => {
    loadHistoryData(true);
  });

  return {
    eras,
    heroes,
    isLoaded,
    loading,
    error,
    loadHistoryData,
    initialize,
    getLessonById,
    allLessons,
    getHeroById
  };
});
