import { defineStore } from 'pinia';

export const useProgressStore = defineStore('progress', () => {
  const completedLessons = ref<string[]>([]);
  const unlockedBadges = ref<string[]>([]);
  const currentLessonId = ref<string | null>(null);

  const STORAGE_KEY = 'history-progress';

  const initialize = () => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      completedLessons.value = Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [];
      unlockedBadges.value = Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : [];
      currentLessonId.value = typeof parsed.currentLessonId === 'string' || parsed.currentLessonId === null ? parsed.currentLessonId : null;
    } catch (e) {
      console.error('Failed to parse progress', e);
    }
  };

  const saveToStorage = () => {
    if (typeof window === 'undefined') return;
    const payload = {
      completedLessons: completedLessons.value,
      unlockedBadges: unlockedBadges.value,
      currentLessonId: currentLessonId.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

  const completeLesson = async (lessonId: string) => {
    if (!completedLessons.value.includes(lessonId)) {
      completedLessons.value.push(lessonId);
      saveToStorage();

      // Trigger badge and artifact check
      const { useBadgeStore } = await import('./badgeStore');
      const { useHeroStore } = await import('./heroStore');
      const { useArtifactStore } = await import('./artifactStore');
      
      const badgeStore = useBadgeStore();
      const heroStore = useHeroStore();
      const artifactStore = useArtifactStore();
      
      const historyMap = await import('~/content/history-map.json');
      
      badgeStore.checkNewBadges(completedLessons.value, heroStore.unlockedHeroIds, historyMap.default);
      artifactStore.checkArtifactUnlock(lessonId);
    }
  };

  const unlockBadge = (badgeId: string) => {
    if (!unlockedBadges.value.includes(badgeId)) {
      unlockedBadges.value.push(badgeId);
      saveToStorage();
    }
  };

  const setCurrentLesson = (lessonId: string | null) => {
    currentLessonId.value = lessonId;
    saveToStorage();
  };

  const isLessonCompleted = computed(() => (lessonId: string) => {
    return completedLessons.value.includes(lessonId);
  });

  const totalCompleted = computed(() => completedLessons.value.length);

  return {
    completedLessons,
    unlockedBadges,
    currentLessonId,
    initialize,
    saveToStorage,
    completeLesson,
    unlockBadge,
    setCurrentLesson,
    isLessonCompleted,
    totalCompleted,
  };
});
