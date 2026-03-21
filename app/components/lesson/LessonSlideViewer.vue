<script setup lang="ts">
import type { LessonSlideViewerProps } from "~/types/props/lesson";

const props = defineProps<LessonSlideViewerProps>();
const emit = defineEmits(["next", "prev", "answered"]);

const onNext = () => emit("next");
const onPrev = () => emit("prev");
const onAnswered = (correct: boolean) => emit("answered", correct);
</script>

<template>
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
          @next="onNext"
          @prev="onPrev"
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
          @answered="onAnswered"
          @next="onNext"
          @prev="onPrev"
        />
      </div>
    </transition>
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

.slide-next-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.slide-next-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

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
</style>
