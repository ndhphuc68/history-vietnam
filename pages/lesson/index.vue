<script setup lang="ts">
import { useProgressStore } from "~/stores/progressStore";
import { useHistoryData } from "~/composables/useHistoryData";

const progressStore = useProgressStore();
const { eras, availableLessonIds, getEraThumbnail, getLessonThumbnail } =
  useHistoryData();
</script>

<template>
  <div class="min-h-screen bg-background pb-24">
    <!-- Hero Header -->
    <LessonHero />

    <div class="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
      <!-- Eras Navigation (Optional/Mini Map) -->
      <div class="overflow-x-auto pb-8 mb-8 no-scrollbar">
        <div class="flex gap-4 min-w-max px-2">
          <a
            v-for="era in eras"
            :key="era.id"
            :href="`#${era.id}`"
            class="px-6 py-3 bg-white rounded-full shadow-md font-black text-text hover:bg-primary hover:text-white transition-all whitespace-nowrap border-2 border-white hover:border-primary"
          >
            {{ era.title }}
          </a>
        </div>
      </div>

      <!-- Eras Sections -->
      <LessonEraSection
        v-for="(era, index) in eras"
        :key="era.id"
        :era="era"
        :index="index"
        :available-lesson-ids="availableLessonIds"
        :get-era-thumbnail="getEraThumbnail"
        :get-lesson-thumbnail="getLessonThumbnail"
      />
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slideUp 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
