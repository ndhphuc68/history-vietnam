import { defineStore } from 'pinia';
import artifactsData from '~/content/artifacts.json';

export interface Artifact {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const useArtifactStore = defineStore('artifact', () => {
  const unlockedArtifactIds = ref<string[]>([]);
  const lastUnlockedArtifact = ref<Artifact | null>(null);
  const showUnlockModal = ref(false);

  const STORAGE_KEY = 'history-artifacts';

  const initialize = () => {
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
    const artifact = artifactsData.find(a => a.lessonId === lessonId);
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
    allArtifacts: artifactsData as Artifact[],
    initialize,
    checkArtifactUnlock
  };
});
