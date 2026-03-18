<script setup lang="ts">
import { useProgressStore } from "~/stores/progressStore";

const props = defineProps<{
  totalLessons: number;
  currentEraTitle: string;
}>();

const progressStore = useProgressStore();

const progressPercent = computed(() => {
  if (props.totalLessons === 0) return 0;
  return Math.round((progressStore.totalCompleted / props.totalLessons) * 100);
});
</script>

<template>
  <div
    class="fixed top-24 left-1/2 -translate-x-1/2 z-[40] w-full max-w-xl px-4 pointer-events-none"
  >
    <div
      class="bg-white/90 backdrop-blur-xl rounded-[32px] shadow-2xl border-4 border-white p-6 pointer-events-auto transform hover:scale-[1.02] transition-all duration-500"
    >
      <div class="flex items-center gap-6">
        <!-- Progress Circle/Icon -->
        <div class="relative w-16 h-16 flex-shrink-0">
          <svg class="w-full h-full transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="var(--background)"
              stroke-width="8"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="var(--primary)"
              stroke-width="8"
              stroke-dasharray="175"
              :stroke-dashoffset="175 - (175 * progressPercent) / 100"
              stroke-linecap="round"
              class="transition-all duration-1000 ease-out"
            />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <Icon name="fluent-emoji:walking-boot" class="text-2xl" />
          </div>
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <div class="flex items-end justify-between mb-1">
            <h3
              class="text-xs font-black text-primary uppercase tracking-widest whitespace-nowrap"
            >
              Hành trình của em
            </h3>
            <span class="text-lg font-black text-text"
              >{{ progressStore.totalCompleted }}/{{ totalLessons }} Bài</span
            >
          </div>

          <!-- Progress Bar -->
          <div
            class="h-4 bg-background rounded-full overflow-hidden border-2 border-white mb-2 shadow-inner"
          >
            <div
              class="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out relative"
              :style="{ width: `${progressPercent}%` }"
            >
              <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>

          <p class="text-[10px] font-bold text-text/60 truncate italic">
            Đang khám phá: <span class="text-text">{{ currentEraTitle }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(26, 83, 92, 0.15);
}
</style>
