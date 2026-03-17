<script setup lang="ts">
import { useProgressStore } from "~/stores/progressStore";
import { useHeroStore } from "~/stores/heroStore";
import heroesData from "~/content/heroes.json";
import type { LessonData, LessonSlide } from "~/types/history";

const heroStore = useHeroStore();
const unlockedHero = ref<any>(null);
const showUnlockPopup = ref(false);

const route = useRoute();
const router = useRouter();
const progressStore = useProgressStore();

const lessonId = route.params.id as string;
const lessonData = ref<LessonData | null>(null);
const currentSlideIndex = ref(-1); // -1 for Intro
const quizSuccess = ref(false);
const isLessonFinished = ref(false);
const transitionName = ref("slide-next");

// Fetch lesson data using import.meta.glob for better Vite reliability
const lessonFiles = import.meta.glob("../../content/lessons/**/*.json");

onMounted(async () => {
  try {
    // Find the file path that ends with our lessonId.json
    const fileKey = Object.keys(lessonFiles).find((path) =>
      path.endsWith(`/${lessonId}.json`),
    );

    if (fileKey && lessonFiles[fileKey]) {
      const data: any = await (lessonFiles[fileKey] as () => Promise<any>)();
      lessonData.value = data.default || data;
    } else {
      throw new Error(`Lesson ${lessonId} not found`);
    }
  } catch (error) {
    console.error("Failed to load lesson data:", error);
    router.push("/map");
  }
});

const currentSlide = computed((): LessonSlide | null => {
  if (!lessonData.value || currentSlideIndex.value < 0) return null;
  const slide = lessonData.value.slides[currentSlideIndex.value];
  return slide || null;
});

const progressPercent = computed(() => {
  if (!lessonData.value) return 0;
  if (currentSlideIndex.value < 0) return 0;
  return ((currentSlideIndex.value + 1) / lessonData.value.slides.length) * 100;
});

const startLesson = () => {
  currentSlideIndex.value = 0;
};

const nextSlide = () => {
  if (
    lessonData.value &&
    currentSlideIndex.value < lessonData.value.slides.length - 1
  ) {
    transitionName.value = "slide-next";
    currentSlideIndex.value++;
    quizSuccess.value = false;
  } else {
    // Finished all slides
    isLessonFinished.value = true;
    // @ts-ignore - fixing persistent lint error
    progressStore.completeLesson(lessonId);

    // Hero Unlock Logic
    if (lessonData.value?.heroId) {
      const heroId = lessonData.value.heroId;
      const isNewUnlock = heroStore.unlockHero(heroId);
      if (isNewUnlock) {
        unlockedHero.value = heroesData.find((h) => h.id === heroId);
        showUnlockPopup.value = true;
      }
    }
  }
};

const prevSlide = () => {
  if (currentSlideIndex.value > 0) {
    transitionName.value = "slide-prev";
    currentSlideIndex.value--;
    quizSuccess.value = false;
  } else if (currentSlideIndex.value === 0) {
    transitionName.value = "slide-prev";
    currentSlideIndex.value = -1; // Go back to intro
  }
};

const handleQuizAnswer = (correct: boolean) => {
  if (correct) {
    quizSuccess.value = true;
  }
};

const finishLesson = () => {
  router.push("/lesson");
};

// Map image path - support slide-specific images or the main lesson image
const getImagePath = (index: number) => {
  if (!lessonData.value) return "/images/history/default-thumb.png";

  // Directly access the slide from lessonData to avoid computed issues during transitions
  const slide = lessonData.value.slides[index];
  if (slide?.image) return slide.image;

  // Fallback to the main lesson image if no slide-specific image is provided
  return lessonData.value.image || `/images/history/${lessonId}.png`;
};
</script>

<template>
  <div class="min-h-screen bg-[#F7FFF7] relative overflow-hidden flex flex-col">
    <!-- Intro Screen -->
    <div
      v-if="currentSlideIndex === -1 && lessonData"
      class="flex-1 flex items-center justify-center p-6 z-10 animate-fade-in"
    >
      <div
        class="bg-white rounded-[50px] shadow-[rgba(0,0,0,0.16)_0px_1px_4px] p-6 md:p-10 max-w-2xl w-full mx-auto border-8 border-white text-center flex flex-col items-center"
      >
        <!-- Lesson Thumbnail -->
        <div
          class="w-full aspect-video rounded-[32px] overflow-hidden mb-6 shadow-inner border-2 border-gray-50 flex items-center justify-center bg-gray-50 group"
        >
          <UiLazyImage
            :src="lessonData.image || '/images/history/default-thumb.png'"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            :alt="lessonData.title"
          />
        </div>

        <h1
          class="text-4xl md:text-5xl font-black text-[#1A535C] mb-3 leading-tight"
        >
          {{ lessonData.title }}
        </h1>
        <p
          class="text-xl md:text-2xl font-bold text-[#4ECDC4] mb-6 leading-relaxed px-4"
        >
          {{ lessonData.summary }}
        </p>

        <div class="w-full flex justify-center">
          <LessonNextButton label="BẮT ĐẦU HỌC" @click="startLesson">
            <template #icon>
              <Icon name="fluent-emoji:rocket" />
            </template>
          </LessonNextButton>
        </div>
      </div>
    </div>

    <!-- Completion Screen -->
    <div
      v-else-if="isLessonFinished && lessonData"
      class="flex-1 flex items-center justify-center p-6 z-10"
    >
      <LessonCompletionScreen
        :lesson-title="lessonData.title"
        @finished="finishLesson"
      />
    </div>

    <!-- Main Lesson Content -->
    <template v-else-if="lessonData">
      <LessonContainer
        :title="lessonData.title"
        :current-step="currentSlideIndex + 1"
        :total-steps="lessonData.slides.length"
        :progress="progressPercent"
      >
        <!-- Slide Content -->
        <div class="relative flex-1 min-h-0 overflow-hidden">
          <transition :name="transitionName">
            <div :key="currentSlideIndex" class="slide-container">
              <LessonStorySlide
                v-if="currentSlide?.type === 'story'"
                :text="currentSlide.text || ''"
                :image="getImagePath(currentSlideIndex)"
                :show-prev="true"
                :next-label="
                  currentSlideIndex === (lessonData?.slides.length || 0) - 1
                    ? 'HOÀN THÀNH'
                    : 'TIẾP THEO'
                "
                :next-icon="
                  currentSlideIndex === (lessonData?.slides.length || 0) - 1
                    ? 'fluent-emoji:party-popper'
                    : 'lucide:arrow-right'
                "
                @next="nextSlide"
                @prev="prevSlide"
              />
              <LessonQuizSlide
                v-else-if="currentSlide?.type === 'quiz'"
                :question="currentSlide.question || ''"
                :options="currentSlide.options || []"
                :answer="currentSlide.answer || ''"
                :can-next="quizSuccess"
                :show-prev="true"
                :next-label="
                  currentSlideIndex === (lessonData?.slides.length || 0) - 1
                    ? 'HOÀN THÀNH'
                    : 'TIẾP THEO'
                "
                :next-icon="
                  currentSlideIndex === (lessonData?.slides.length || 0) - 1
                    ? 'fluent-emoji:party-popper'
                    : 'lucide:arrow-right'
                "
                @answered="handleQuizAnswer"
                @next="nextSlide"
                @prev="prevSlide"
              />
            </div>
          </transition>
        </div>
      </LessonContainer>
    </template>

    <!-- Loading State -->
    <div v-else class="flex-1 flex flex-col items-center justify-center gap-4">
      <div
        class="animate-spin rounded-full h-20 w-20 border-t-8 border-b-8 border-[#FF6B6B]"
      ></div>
      <p class="text-xl font-black text-[#1A535C] animate-pulse">
        Đang chuẩn bị bài học...
      </p>
    </div>

    <!-- Hero Unlock Celebration -->
    <HeroUnlockPopup
      :show="showUnlockPopup"
      :unlocked-hero="unlockedHero"
      @close="showUnlockPopup = false"
    />
  </div>
</template>

<style scoped>
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

.slide-next-leave-active,
.slide-prev-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

/* Slide Next (Push Left) */
.slide-next-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.slide-next-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* Slide Prev (Push Right) */
.slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.slide-prev-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slide-container {
  width: 100%;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseSubtle {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.animate-pulse-subtle {
  animation: pulseSubtle 2s infinite ease-in-out;
}
</style>
