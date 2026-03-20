<script setup lang="ts">
import type { LessonContainerProps } from "~/types/props/lesson";
/**
 * Container component that manages the layout of the lesson.
 * This unifies the progress bar and content area.
 */
defineProps<LessonContainerProps>();
</script>

<template>
  <div class="w-full max-w-4xl mx-auto flex flex-col h-full overflow-hidden">
    <!-- Header Area -->
    <div class="px-6 py-4">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-xl font-black text-text truncate pr-4">
          {{ title }}
        </h1>
        <div
          class="bg-white/80 backdrop-blur px-4 py-1 rounded-full text-xs font-black text-text shadow-sm whitespace-nowrap"
        >
          {{
            $t("lesson_container.step", {
              current: currentStep,
              total: totalSteps,
            })
          }}
        </div>
      </div>

      <!-- Progress Bar -->
      <div
        class="h-4 bg-gray-100 rounded-full overflow-hidden border-2 border-white shadow-sm"
      >
        <div
          class="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-700 ease-out"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 px-4 py-2 overflow-y-auto custom-scrollbar">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 rounded-full;
}
</style>
