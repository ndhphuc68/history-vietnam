import { useHistoryStore } from './historyStore';
import localforage from 'localforage';

export const useProgressStore = defineStore('progress', () => {
  const completedLessons = ref<string[]>([]);
  const unlockedBadges = ref<string[]>([]);
  const currentLessonId = ref<string | null>(null);
  const totalXP = ref<number>(0);
  const userName = ref("");
  const selectedAvatar = ref("lac-long");
  const historyStore = useHistoryStore();

  const STORAGE_KEY = 'history-progress';

  const initialize = async () => {
    if (typeof window === 'undefined') return;
    try {
      let saved = await localforage.getItem<string>(STORAGE_KEY);
      
      // Fallback migration from localStorage
      if (!saved) {
        saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          await localforage.setItem(STORAGE_KEY, saved);
        }
      }

      if (!saved) return;
      const parsed = JSON.parse(saved);
      completedLessons.value = Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [];
      unlockedBadges.value = Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : [];
      currentLessonId.value = typeof parsed.currentLessonId === 'string' || parsed.currentLessonId === null ? parsed.currentLessonId : null;
      totalXP.value = typeof parsed.totalXP === 'number' ? parsed.totalXP : 0;
      userName.value = typeof parsed.userName === 'string' ? parsed.userName : "";
      selectedAvatar.value = typeof parsed.selectedAvatar === 'string' ? parsed.selectedAvatar : "lac-long";
    } catch (e) {
      console.error('Failed to parse progress', e);
    }
  };

  const saveToStorage = async () => {
    if (typeof window === 'undefined') return;
    const payload = {
      completedLessons: completedLessons.value,
      unlockedBadges: unlockedBadges.value,
      currentLessonId: currentLessonId.value,
      totalXP: totalXP.value,
      userName: userName.value,
      selectedAvatar: selectedAvatar.value,
    };
    await localforage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

  const completeLesson = async (lessonId: string, options?: { quizBonus?: boolean }) => {
    if (!completedLessons.value.includes(lessonId)) {
      completedLessons.value.push(lessonId);
      
      // Grant XP
      totalXP.value += 100;
      if (options?.quizBonus) {
        totalXP.value += 50;
      }
      
      saveToStorage();

      // Trigger badge and artifact check
      const { useBadgeStore } = await import('./badgeStore');
      const { useHeroStore } = await import('./heroStore');
      const { useArtifactStore } = await import('./artifactStore');
      
      const badgeStore = useBadgeStore();
      const heroStore = useHeroStore();
      const artifactStore = useArtifactStore();
      
      badgeStore.checkNewBadges(completedLessons.value, heroStore.unlockedHeroIds, { eras: historyStore.eras });
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

  // Level Logic: XP = level * 200
  // Level 1: 0-199 XP
  // Level 2: 200-599 XP (200 + 400)
  // Level 3: 600-1199 XP (600 + 600)
  // etc.
  
  const currentLevel = computed(() => {
    let level = 1;
    let xpRequired = level * 200;
    let tempXp = totalXP.value;
    
    while (tempXp >= xpRequired) {
      tempXp -= xpRequired;
      level++;
      xpRequired = level * 200;
    }
    return level;
  });

  const xpInCurrentLevel = computed(() => {
    let level = 1;
    let xpRequired = level * 200;
    let tempXp = totalXP.value;
    
    while (tempXp >= xpRequired) {
      tempXp -= xpRequired;
      level++;
      xpRequired = level * 200;
    }
    return tempXp;
  });

  const xpRequiredForNextLevel = computed(() => {
    return currentLevel.value * 200;
  });

  const levelProgress = computed(() => {
    return Math.min(100, (xpInCurrentLevel.value / xpRequiredForNextLevel.value) * 100);
  });

  const userTitle = computed(() => {
    const level = currentLevel.value;
    if (level >= 21) return "user_titles.legendary";
    if (level >= 16) return "user_titles.lac_hong";
    if (level >= 11) return "user_titles.dai_co_viet";
    if (level >= 6) return "user_titles.thang_long";
    return "user_titles.rookie";
  });

  const avatarFrame = computed(() => {
    const level = currentLevel.value;
    if (level >= 31) return 'amber';
    if (level >= 21) return 'purple';
    if (level >= 11) return 'blue';
    return 'slate';
  });

  const isLessonCompleted = computed(() => (lessonId: string) => {
    return completedLessons.value.includes(lessonId);
  });

  const isLessonUnlocked = computed(() => (lessonId: string, allEras: any[]) => {
    if (!allEras || allEras.length === 0) return false;

    // Flatten all eras into a single level sequence
    const allLevels = allEras.flatMap(era => era.levels || []);
    
    const index = allLevels.findIndex(l => l.lesson === lessonId);
    if (index === -1) return false;

    // The very first lesson is always unlocked
    if (index === 0) return true;

    // Subsequent lessons are unlocked if the PREVIOUS lesson in the global sequence is completed
    const prevLessonId = allLevels[index - 1].lesson;
    return completedLessons.value.includes(prevLessonId);
  });

  const isEraEnabled = computed(() => (eraId: string, eras: any[]) => {
    if (!eras) return false;
    const eraIndex = eras.findIndex((e: any) => e.id === eraId);
    if (eraIndex === 0) return true; // First era always enabled

    // Previous era must be fully completed
    const prevEra = eras[eraIndex - 1];
    return prevEra.levels.every((l: any) => completedLessons.value.includes(l.lesson));
  });

  const totalCompleted = computed(() => completedLessons.value.length);

  // Rescue Code Logic (Base64 for simplicity since data is small)
  const generateRescueCode = () => {
    try {
      const payload = {
        cl: completedLessons.value,
        ub: unlockedBadges.value,
        xp: totalXP.value,
        un: userName.value,
        av: selectedAvatar.value,
        ts: Date.now(),
      };
      const json = JSON.stringify(payload);
      // Simple base64 encoding (UTF-8 safe)
      const code = btoa(encodeURIComponent(json));
      return `HV-${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8, 12)}-${code.slice(12)}`;
    } catch (e) {
      console.error('Failed to generate rescue code', e);
      return null;
    }
  };

  const importRescueCode = (rawCode: string): boolean => {
    try {
      // Strip prefix and dashes
      const cleanCode = rawCode.replace(/^HV-/i, '').replace(/-/g, '');
      const json = decodeURIComponent(atob(cleanCode));
      const parsed = JSON.parse(json);

      if (Array.isArray(parsed.cl) && Array.isArray(parsed.ub) && typeof parsed.xp === 'number') {
        completedLessons.value = parsed.cl;
        unlockedBadges.value = parsed.ub;
        totalXP.value = parsed.xp;
        userName.value = parsed.un || "";
        selectedAvatar.value = parsed.av || "lac-long";
        saveToStorage();
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to import rescue code', e);
      return false;
    }
  };

  return {
    completedLessons,
    unlockedBadges,
    currentLessonId,
    totalXP,
    currentLevel,
    xpInCurrentLevel,
    xpRequiredForNextLevel,
    levelProgress,
    userTitle,
    avatarFrame,
    initialize,
    saveToStorage,
    completeLesson,
    unlockBadge,
    setCurrentLesson,
    isLessonCompleted,
    isLessonUnlocked,
    isEraEnabled,
    totalCompleted,
    userName,
    selectedAvatar,
    generateRescueCode,
    importRescueCode,
  };
});
