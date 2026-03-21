<script setup lang="ts">
import { useProgressStore } from "~/stores/progressStore";
import type { EraSectionProps } from "~/types/props/lesson";

defineProps<EraSectionProps>();
const progressStore = useProgressStore();
</script>

<template>
  <div :id="era.id" class="mb-24 scroll-mt-24">
    <!-- Era Header -->
    <div
      class="flex flex-col md:flex-row items-center gap-10 mb-12 animate-slide-up"
      :style="{ animationDelay: `${index * 100}ms` }"
    >
      <div
        class="w-full md:w-[40%] aspect-video rounded-[40px] overflow-hidden shadow-2xl border-8 border-white bg-white/50 relative group"
      >
        <UiLazyImage
          :src="getEraThumbnail(era.id)"
          class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          :alt="era.title"
        />
        <div
          class="absolute inset-0 shadow-[inset_0_2px_15px_rgba(0,0,0,0.05)] pointer-events-none"
        ></div>
      </div>
      <div class="flex-1 text-center md:text-left">
        <h2
          class="text-3xl md:text-5xl font-black text-text mb-6 drop-shadow-sm"
        >
          {{ era.title }}
        </h2>
        <div
          class="h-3 w-40 bg-primary rounded-full mx-auto md:mx-0 shadow-sm"
        ></div>
      </div>
    </div>

    <!-- Lessons Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <LessonCard
        v-for="level in era.levels"
        :key="level.id"
        :id="level.lesson"
        :title="level.title"
        :period="era.title"
        :thumbnail="getLessonThumbnail(level.lesson)"
        :era-thumbnail="getEraThumbnail(era.id)"
        :is-locked="
          !availableLessonIds.includes(level.lesson) ||
          !progressStore.isLessonUnlocked(level.lesson, allEras)
        "
        :is-available="availableLessonIds.includes(level.lesson)"
        :is-completed="progressStore.isLessonCompleted(level.lesson)"
      />
    </div>
  </div>
</template>

<style scoped>
.animate-slide-up {
  opacity: 0;
  animation: slideUp 0.8s ease-out forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
