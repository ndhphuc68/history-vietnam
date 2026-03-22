<script setup lang="ts">
import { useHistoryData } from "~/composables/useHistoryData";
import { useQuizStore } from "~/stores/quizStore";
import { useBadgeStore } from "~/stores/badgeStore";
import { useProgressStore } from "~/stores/progressStore";
import { useHeroStore } from "~/stores/heroStore";
import type { QuizSlide, LessonContent } from "~/types/history";

import LessonQuizSlide from "~/components/lesson/QuizSlide.vue";

const router = useRouter();
const historyData = useHistoryData();
const quizStore = useQuizStore();
const badgeStore = useBadgeStore();
const progressStore = useProgressStore();
const heroStore = useHeroStore();
const localePath = useLocalePath();

// State
const isLoading = ref(true);
const allAvailableQuestions = ref<QuizSlide[]>([]);
const currentQuizQuestions = ref<QuizSlide[]>([]);
const currentQuestionIndex = ref(0);
const quizFinished = ref(false);
const showResult = ref(false);
const shouldShake = ref(false);

const currentQuestion = computed(() => {
  if (
    currentQuizQuestions.value.length > 0 &&
    currentQuestionIndex.value < currentQuizQuestions.value.length
  ) {
    return currentQuizQuestions.value[currentQuestionIndex.value];
  }
  return null;
});

// Load all questions from completed lessons
const loadAllQuestions = async () => {
  isLoading.value = true;
  quizStore.resetQuizSession();

  if (progressStore.completedLessons.length === 0) {
    router.push(localePath("/quiz"));
    return;
  }

  const questions: QuizSlide[] = [];
  const lessonFiles = import.meta.glob<{ default: LessonContent }>(
    "~~/content/lessons/**/*.json",
  );

  // Filter lessons that user has completed
  const completedLessonIds = progressStore.completedLessons;

  for (const lessonId of completedLessonIds) {
    const fileKey = Object.keys(lessonFiles).find((path) =>
      path.endsWith(`/${lessonId}.json`),
    );

    if (fileKey) {
      const loader = lessonFiles[fileKey];
      if (loader) {
        const mod = await loader();
        const content = mod.default;
        const quizzes = content.slides.filter(
          (s) => s.type === "quiz",
        ) as QuizSlide[];
        questions.push(...quizzes);
      }
    }
  }

  allAvailableQuestions.value = questions;

  if (questions.length === 0) {
    console.error(
      "No questions found for completed lessons:",
      completedLessonIds,
    );
    setTimeout(() => router.push(localePath("/quiz")), 2000);
    return;
  }

  // Shuffle and pick 15 (or fewer if not enough)
  currentQuizQuestions.value = [...questions]
    .sort(() => Math.random() - 0.5)
    .slice(0, 15);

  isLoading.value = false;
};

const handleAnswer = (correct: boolean) => {
  if (!correct) {
    quizStore.loseLife();
    shouldShake.value = true;
    setTimeout(() => {
      shouldShake.value = false;
    }, 500);

    if (quizStore.isGameOver) {
      showResult.value = true;
      return;
    }
  }

  // Progress to next question after a delay
  // Longer delay for incorrect answers to let user see the correct one
  const delay = correct ? 1200 : 2500;

  setTimeout(() => {
    if (currentQuestionIndex.value < currentQuizQuestions.value.length - 1) {
      currentQuestionIndex.value++;
    } else {
      quizFinished.value = true;
      showResult.value = true;

      // Save score for global challenge
      quizStore.setScore(
        "global-challenge",
        currentQuizQuestions.value.length,
        currentQuizQuestions.value.length,
      );

      // Check for new badges
      badgeStore.checkNewBadges(
        progressStore.completedLessons,
        heroStore.unlockedHeroIds,
        { eras: historyData.eras.value },
      );
    }
  }, delay);
};

const restartQuiz = () => {
  currentQuestionIndex.value = 0;
  quizFinished.value = false;
  showResult.value = false;
  loadAllQuestions();
};

onMounted(loadAllQuestions);
</script>

<template>
  <div
    class="min-h-screen bg-background flex flex-col pt-10 transition-all duration-300"
    :class="{ 'animate-shake-screen': shouldShake }"
  >
    <!-- Header with Hearts -->
    <div
      class="max-w-4xl w-full mx-auto px-6 mb-8 flex items-center justify-between"
    >
      <NuxtLink
        :to="localePath('/quiz')"
        class="flex items-center gap-2 text-text/60 font-bold hover:text-primary transition-colors"
      >
        <Icon name="lucide:arrow-left" /> Thoát thử thách
      </NuxtLink>

      <div
        class="flex items-center gap-4 bg-white dark:bg-slate-800 px-6 py-3 rounded-full shadow-md border-2 border-primary/10 dark:border-slate-700 transition-all"
      >
        <div class="flex items-center gap-1">
          <Icon
            v-for="i in 3"
            :key="i"
            :name="
              i <= quizStore.currentLives
                ? 'fluent-emoji:heart'
                : 'fluent-emoji:broken-heart'
            "
            class="text-3xl transition-transform duration-500"
            :class="{
              'scale-125 animate-pulse': i === quizStore.currentLives,
              'opacity-30 grayscale': i > quizStore.currentLives,
            }"
          />
        </div>
        <div class="w-px h-6 bg-gray-200 mx-2"></div>
        <div class="text-xl font-black text-text">
          {{ currentQuestionIndex + 1
          }}<span class="text-text/40">/{{ currentQuizQuestions.length }}</span>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col items-center justify-center p-6 relative">
      <template v-if="isLoading">
        <div class="flex flex-col items-center gap-4">
          <Icon name="fluent-emoji:brain" class="text-8xl animate-pulse" />
          <p class="text-2xl font-black text-text">
            Đang tổng hợp thử thách...
          </p>
        </div>
      </template>

      <template v-else-if="showResult">
        <div class="max-w-2xl w-full animate-pop-in">
          <!-- Success Screen -->
          <div
            v-if="quizFinished"
            class="bg-white dark:bg-slate-800 rounded-[50px] p-12 text-center shadow-2xl border-8 border-primary relative overflow-hidden"
          >
            <div
              class="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
            ></div>
            <Icon
              name="fluent-emoji:star-struck"
              class="text-9xl mb-6 mx-auto"
            />
            <h2 class="text-5xl font-black text-text mb-4 uppercase">
              THÔNG THÁI QUÁ!
            </h2>
            <p class="text-2xl font-bold text-secondary mb-10 leading-relaxed">
              Bạn đã hoàn thành Thử thách Toàn thư. <br />
              Kiến thức của bạn thật đáng nể!
            </p>
            <div class="flex flex-col gap-4">
              <button
                @click="router.push(localePath('/quiz'))"
                class="w-full py-5 bg-primary text-white text-2xl font-black rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                TIẾP TỤC KHÁM PHÁ
                <Icon name="lucide:arrow-right" class="ml-2" />
              </button>
            </div>
          </div>

          <!-- Game Over Screen -->
          <div
            v-else
            class="bg-white dark:bg-slate-800 rounded-[50px] p-12 text-center shadow-2xl border-8 border-red-400"
          >
            <Icon
              name="fluent-emoji:disappointed-face"
              class="text-9xl mb-6 mx-auto"
            />
            <h2
              class="text-5xl font-black text-text mb-4 uppercase text-red-500"
            >
              HẾT LƯỢT RỒI!
            </h2>
            <p class="text-2xl font-bold text-secondary mb-10 leading-relaxed">
              Thử thách Toàn thư rất khó, đừng nản lòng nhé. <br />
              Ôn lại bài và phục thù sau nào!
            </p>
            <div class="flex flex-col gap-4">
              <button
                @click="restartQuiz"
                class="w-full py-5 bg-secondary text-white text-2xl font-black rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                THỬ LẠI NGAY <Icon name="lucide:refresh-cw" class="ml-2" />
              </button>
              <button
                @click="router.push(localePath('/quiz'))"
                class="text-text/60 font-black text-lg hover:text-text transition-colors"
              >
                Quay về Đấu trường
              </button>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <!-- Actual Question Component -->
        <div v-if="currentQuestion" class="w-full max-w-4xl">
          <LessonQuizSlide
            :question="currentQuestion.question"
            :options="currentQuestion.options"
            :answer="currentQuestion.answer"
            :show-prev="false"
            :can-next="false"
            :show-retry="false"
            @answered="handleAnswer"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.animate-pop-in {
  animation: popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(50px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.animate-shake-screen {
  animation: shakeScreen 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shakeScreen {
  10%,
  90% {
    transform: translate3d(-2px, 0, 0);
  }
  20%,
  90% {
    transform: translate3d(4px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-8px, 2px, 0);
  }
  40%,
  60% {
    transform: translate3d(8px, -2px, 0);
  }
}
</style>
