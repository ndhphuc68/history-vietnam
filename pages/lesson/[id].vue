<script setup lang="ts">
import { useLesson } from "~/composables/useLesson";

const route = useRoute();
const router = useRouter();
const lessonId = route.params.id as string;

const {
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
  loadLesson,
  startLesson,
  nextSlide,
  prevSlide,
  handleQuizAnswer,
  getImagePath,
  closeBadgePopup,
} = useLesson(lessonId);

onMounted(() => {
  loadLesson();
});

useHead({
  title: computed(() => lessonData.value?.title || "Đang tải bài học..."),
});

useSeoMeta({
  title: computed(
    () => `${lessonData.value?.title || "Bài học"} | Lịch sử Việt Nam cho Bé`,
  ),
  ogTitle: computed(
    () => `${lessonData.value?.title || "Bài học"} | Lịch sử Việt Nam cho Bé`,
  ),
  description: computed(
    () =>
      lessonData.value?.summary ||
      "Học lịch sử Việt Nam qua những câu chuyện hấp dẫn và hình ảnh sinh động.",
  ),
  ogDescription: computed(
    () =>
      lessonData.value?.summary ||
      "Học lịch sử Việt Nam qua những câu chuyện hấp dẫn và hình ảnh sinh động.",
  ),
  ogImage: computed(
    () => lessonData.value?.image || "/images/banner/banner.png",
  ),
  twitterCard: "summary_large_image",
});

const finishLesson = () => {
  router.push("/lesson");
};
</script>

<template>
  <div
    class="min-h-screen bg-background relative overflow-hidden flex flex-col"
  >
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
          class="text-4xl md:text-5xl font-black text-text mb-3 leading-tight"
        >
          {{ lessonData.title }}
        </h1>
        <p
          class="text-xl md:text-2xl font-bold text-secondary mb-6 leading-relaxed px-4"
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
        <LessonSlideViewer
          :current-slide="currentSlide"
          :current-slide-index="currentSlideIndex"
          :lesson-data="lessonData"
          :quiz-success="quizSuccess"
          :transition-name="transitionName"
          :get-image-path="getImagePath"
          @next="nextSlide"
          @prev="prevSlide"
          @answered="handleQuizAnswer"
        />
      </LessonContainer>
    </template>

    <!-- Loading State -->
    <div v-else class="flex-1 flex flex-col items-center justify-center gap-4">
      <div
        class="animate-spin rounded-full h-20 w-20 border-t-8 border-b-8 border-primary"
      ></div>
      <p class="text-xl font-black text-text animate-pulse">
        Đang chuẩn bị bài học...
      </p>
    </div>

    <!-- Hero Unlock Celebration -->
    <HeroUnlockPopup
      :show="showUnlockPopup"
      :unlocked-hero="unlockedHero"
      @close="showUnlockPopup = false"
    />

    <!-- Badge Unlock Celebration -->
    <BadgeUnlockPopup
      :show="showBadgePopup"
      :badge="unlockedBadges[currentBadgeIndex]"
      @close="closeBadgePopup"
    />
  </div>
</template>

<style scoped>
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
