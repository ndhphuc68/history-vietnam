import type { HistoryMap, LessonContent } from "~/types/history";
import historyMapData from "~/content/history-map.json";

export const useHistoryData = () => {
  const historyMap = historyMapData as HistoryMap;

  // Use import.meta.glob to find all available lesson JSON files
  // This allows us to know which lessons have content without hardcoding
  const lessonFiles = import.meta.glob("~/content/lessons/**/*.json", {
    eager: true,
  });

  /**
   * Returns a list of all lesson IDs that have a corresponding JSON file.
   */
  const availableLessonIds = computed(() => {
    return Object.keys(lessonFiles).map((path) => {
      const filename = path.split("/").pop() || "";
      return filename.replace(".json", "");
    });
  });

  /**
   * Checks if a lesson has content available.
   */
  const isLessonAvailable = (lessonId: string) => {
    return availableLessonIds.value.includes(lessonId);
  };

  /**
   * Gets the thumbnail for an era.
   */
  const getEraThumbnail = (eraId: string) => {
    return `/images/eras/${eraId}.webp`;
  };

  /**
   * Gets the thumbnail for a specific lesson by reading its JSON content.
   */
  const getLessonThumbnail = (lessonId: string): string | undefined => {
    const fileKey = Object.keys(lessonFiles).find((path) =>
      path.endsWith(`/${lessonId}.json`)
    );

    if (fileKey) {
      const mod = lessonFiles[fileKey] as { default?: LessonContent } | LessonContent;
      const data = ("default" in mod ? mod.default : mod) as LessonContent;
      return data.image;
    }
    return undefined;
  };

  return {
    eras: computed(() => historyMap.eras.filter((era) => era.enabled)),
    availableLessonIds,
    isLessonAvailable,
    getEraThumbnail,
    getLessonThumbnail,
  };
};
