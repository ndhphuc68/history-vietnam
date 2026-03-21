import type { LessonContent, Era } from "~/types/history";
import { useHistoryStore } from "~/stores/historyStore";

export const useHistoryData = () => {
  const { locale } = useI18n();
  const historyStore = useHistoryStore();

  // Use import.meta.glob to find all available lesson JSON files lazily
  const lessonFiles = import.meta.glob<{ default: LessonContent }>("~~/content/lessons/**/*.json");
  const lessonThumbnails = ref<Record<string, string>>({});

  const availableLessonIds = computed(() => {
    return Object.keys(lessonFiles)
      .filter((path) => path.includes(`/${locale.value}/`))
      .map((path) => {
        const filename = path.split("/").pop() || "";
        return filename.replace(".json", "");
      });
  });

  const isLessonAvailable = (lessonId: string) => {
    return availableLessonIds.value.includes(lessonId);
  };

  const getEraThumbnail = (eraId: string) => {
    return `/images/eras/${eraId}.webp`;
  };

  const getLessonThumbnail = (lessonId: string): string | undefined => {
    if (lessonThumbnails.value[lessonId]) {
      return lessonThumbnails.value[lessonId];
    }

    const fileKey = Object.keys(lessonFiles).find((path) =>
      path.includes(`/${locale.value}/`) && path.endsWith(`/${lessonId}.json`)
    );

    if (fileKey && typeof lessonFiles[fileKey] === "function" && lessonThumbnails.value[lessonId] !== "") {
      // Mark as loading to prevent duplicate requests
      lessonThumbnails.value[lessonId] = ""; 
      
      const loader = lessonFiles[fileKey] as () => Promise<{ default: LessonContent }>;
      loader().then((mod) => {
        if (mod && mod.default && mod.default.image) {
          lessonThumbnails.value[lessonId] = mod.default.image;
        }
      }).catch(e => console.error("Error loading lesson thumbnail:", e));
    }
    
    return lessonThumbnails.value[lessonId] || undefined;
  };

  const eras = computed((): Era[] => {
    return historyStore.eras.filter((era) => era.enabled);
  });

  const allEras = computed((): Era[] => {
    return historyStore.eras;
  });

  const loadHistoryMap = async () => {
    await historyStore.initialize();
  };

  return {
    historyMap: computed(() => ({ eras: historyStore.eras })),
    eras,
    allEras,
    availableLessonIds,
    isLessonAvailable,
    getEraThumbnail,
    getLessonThumbnail,
    loadHistoryMap,
    isLoaded: computed(() => historyStore.isLoaded),
    loading: computed(() => historyStore.loading),
  };
};
