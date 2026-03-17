<script setup lang="ts">
import { useProgressStore } from "~/stores/progressStore";
import type { LessonData, LessonSlide } from "~/types/history";

const route = useRoute();
const router = useRouter();
const progressStore = useProgressStore();

const lessonId = route.params.id as string;
const lessonData = ref<LessonData | null>(null);
const currentSlideIndex = ref(-1); // -1 for Intro
const quizSuccess = ref(false);
const isLessonFinished = ref(false);

// Fetch lesson data
onMounted(async () => {
  try {
    const data = await import(`../../content/lessons/${lessonId}.json`);
    lessonData.value = data.default;
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
    currentSlideIndex.value++;
    quizSuccess.value = false;
  } else {
    // Finished all slides
    isLessonFinished.value = true;
    progressStore.completeLesson(lessonId);
  }
};

const prevSlide = () => {
  if (currentSlideIndex.value > 0) {
    currentSlideIndex.value--;
    quizSuccess.value = false;
  } else if (currentSlideIndex.value === 0) {
    currentSlideIndex.value = -1; // Go back to intro
  }
};

const handleQuizAnswer = (correct: boolean) => {
  if (correct) {
    quizSuccess.value = true;
  }
};

const finishLesson = () => {
  router.push("/map");
};

// Map image path
const getImagePath = (index: number) => {
  return `/images/history/${lessonId}/${index}.png`;
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
        class="bg-white rounded-[50px] shadow-2xl p-12 max-w-2xl mx-auto border-8 border-white text-center"
      >
        <div class="text-8xl mb-8 animate-bounce">📜</div>
        <h1 class="text-5xl font-black text-[#1A535C] mb-6 leading-tight">
          {{ lessonData.title }}
        </h1>
        <p class="text-2xl font-bold text-[#4ECDC4] mb-12 leading-relaxed">
          {{ lessonData.summary }}
        </p>
        <LessonNextButton label="BẮT ĐẦU HỌC 🚀" @click="startLesson" />
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
        <transition name="slide-fade" mode="out-in">
          <div :key="currentSlideIndex">
            <LessonStorySlide
              v-if="currentSlide?.type === 'story'"
              :text="currentSlide.text || ''"
              :image="getImagePath(currentSlideIndex)"
              :show-prev="true"
              :next-label="
                currentSlideIndex === (lessonData?.slides.length || 0) - 1
                  ? 'HOÀN THÀNH 🎉'
                  : 'TIẾP THEO ➜'
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
                  ? 'HOÀN THÀNH 🎉'
                  : 'TIẾP THEO ➜'
              "
              @answered="handleQuizAnswer"
              @next="nextSlide"
              @prev="prevSlide"
            />
          </div>
        </transition>
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
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-100px);
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
