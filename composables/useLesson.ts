import type { Hero, LessonContent, Slide } from "~/types/history";
import { useProgressStore } from "~/stores/progressStore";
import { useHeroStore } from "~/stores/heroStore";
import { useBadgeStore } from "~/stores/badgeStore";
import { useQuizStore } from "~/stores/quizStore";

export const useLesson = (lessonId: string) => {
  const progressStore = useProgressStore();
  const heroStore = useHeroStore();
  const quizStore = useQuizStore();
  const badgeStore = useBadgeStore();
  const router = useRouter();

  const { locale } = useI18n();
  const lessonData = ref<LessonContent | null>(null);
  const currentSlideIndex = ref(-1); // -1 for Intro
  const quizSuccess = ref(false);
  const isLessonFinished = ref(false);
  const transitionName = ref("slide-next");
  const unlockedHero = ref<Hero | null>(null);
  const showUnlockPopup = ref(false);
  const quizErrors = ref(0);
  const historyMapData = ref<any>(null);
  const heroesData = ref<any[]>([]);

  const unlockedBadges = ref<any[]>([]);
  const currentBadgeIndex = ref(0);
  const showBadgePopup = ref(false);

  // Lesson files mapping
  const lessonFiles = import.meta.glob("~/content/lessons/**/*.json");

  const findLessonFileKey = () =>
    Object.keys(lessonFiles).find((path) => 
      path.includes(`/${locale.value}/`) && path.endsWith(`/${lessonId}.json`)
    );

  const loadLesson = async () => {
    try {
      const fileKey = findLessonFileKey();

      if (fileKey && lessonFiles[fileKey]) {
        const mod = (await (lessonFiles[fileKey] as () => Promise<unknown>)()) as
          | { default: LessonContent }
          | LessonContent;
        lessonData.value = ("default" in mod ? mod.default : mod) as LessonContent;

        // Load supplementary data
        const [mapMod, heroesMod] = await Promise.all([
          import(`../content/${locale.value}/history-map.json`),
          import(`../content/${locale.value}/heroes.json`)
        ]);
        historyMapData.value = mapMod.default;
        heroesData.value = heroesMod.default;
      } else {
        throw new Error(`Lesson ${lessonId} not found`);
      }
    } catch (error) {
      console.error("Failed to load lesson data:", error);
      router.push("/lesson");
    }
  };

  const currentSlide = computed((): Slide | null => {
    if (!lessonData.value || currentSlideIndex.value < 0) return null;
    return lessonData.value.slides[currentSlideIndex.value] || null;
  });

  const progressPercent = computed(() => {
    if (!lessonData.value || currentSlideIndex.value < 0) return 0;
    return ((currentSlideIndex.value + 1) / lessonData.value.slides.length) * 100;
  });

  const startLesson = () => {
    currentSlideIndex.value = 0;
  };

  const nextSlide = async () => {
    if (!lessonData.value) return;
    
    if (currentSlideIndex.value < lessonData.value.slides.length - 1) {
      transitionName.value = "slide-next";
      currentSlideIndex.value++;
      quizSuccess.value = false;
    } else {
      await finishProgress();
    }
  };

  const finishProgress = async () => {
    isLessonFinished.value = true;
    progressStore.completeLesson(lessonId, {
      quizBonus: quizErrors.value === 0,
    });

    // Record quiz score in quizStore
    const finalScore = quizErrors.value === 0 ? 1 : 0;
    quizStore.setScore(lessonId, finalScore, 1);

    // Track for badges
    const newBadges = badgeStore.checkNewBadges(
      progressStore.completedLessons,
      heroStore.unlockedHeroIds,
      historyMapData.value
    );
    
    if (newBadges && newBadges.length > 0) {
      unlockedBadges.value = newBadges;
      currentBadgeIndex.value = 0;
      showBadgePopup.value = true;
    }

    if (lessonData.value?.heroId) {
      const heroId = lessonData.value.heroId;
      const isNewUnlock = await heroStore.unlockHero(heroId);
      if (isNewUnlock) {
        const heroes = heroesData.value as Hero[];
        unlockedHero.value = heroes.find((h) => h.id === heroId) ?? null;
        showUnlockPopup.value = true;
      }
    }
  };

  const closeBadgePopup = () => {
    if (currentBadgeIndex.value < unlockedBadges.value.length - 1) {
      currentBadgeIndex.value++;
    } else {
      showBadgePopup.value = false;
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex.value > 0) {
      transitionName.value = "slide-prev";
      currentSlideIndex.value--;
      quizSuccess.value = false;
    } else if (currentSlideIndex.value === 0) {
      transitionName.value = "slide-prev";
      currentSlideIndex.value = -1;
    }
  };

  const handleQuizAnswer = (correct: boolean) => {
    if (correct) {
      quizSuccess.value = true;
    } else {
      quizErrors.value++;
    }
  };

  const getImagePath = (index: number) => {
    if (!lessonData.value) return "/images/history/default-thumb.png";
    const slide = lessonData.value.slides[index];
    if (slide && slide.type === "story" && slide.image) {
      return slide.image;
    }
    return (
      lessonData.value.image || `/images/history/${lessonId}.png`
    );
  };

  return {
    lessonData,
    currentSlideIndex,
    currentSlide,
    progressPercent,
    quizSuccess,
    isLessonFinished,
    transitionName,
    unlockedHero,
    showUnlockPopup,
    unlockedBadges,
    currentBadgeIndex,
    showBadgePopup,
    closeBadgePopup,
    loadLesson,
    startLesson,
    nextSlide,
    prevSlide,
    handleQuizAnswer,
    getImagePath,
  };
};
