import { defineStore } from 'pinia';
import type { Artifact } from '~/types/history';

export const useArtifactStore = defineStore('artifact', () => {
  const unlockedArtifactIds = ref<string[]>([]);
  const lastUnlockedArtifact = ref<Artifact | null>(null);
  const showUnlockModal = ref(false);
  const artifactsData = ref<Artifact[]>([]);

  const STORAGE_KEY = 'history-artifacts';

  const initialize = async () => {
    const { locale } = useI18n();
    
    const loadData = async () => {
      try {
        const data = await import(`../content/${locale.value}/artifacts.json`);
        artifactsData.value = data.default as Artifact[];
      } catch (e) {
        console.error('Failed to load localized artifacts', e);
        const data = await import(`../content/vi/artifacts.json`);
        artifactsData.value = data.default as Artifact[];
      }
    };

    await loadData();

    // Re-load when locale changes
    watch(locale, async () => {
      await loadData();
    });

    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      unlockedArtifactIds.value = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse artifacts', e);
    }
  };

  const saveToStorage = () => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedArtifactIds.value));
  };

  const checkArtifactUnlock = (lessonId: string) => {
    const artifact = artifactsData.value.find(a => a.lessonId === lessonId);
    if (artifact && !unlockedArtifactIds.value.includes(artifact.id)) {
      unlockedArtifactIds.value.push(artifact.id);
      lastUnlockedArtifact.value = artifact as Artifact;
      showUnlockModal.value = true;
      saveToStorage();
      return true;
    }
    return false;
  };

  return {
    unlockedArtifactIds,
    lastUnlockedArtifact,
    showUnlockModal,
    allArtifacts: computed(() => artifactsData.value),
    initialize,
    checkArtifactUnlock
  };
});
