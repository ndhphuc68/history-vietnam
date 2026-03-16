<script setup lang="ts">
import { useProgressStore } from "~/stores/progressStore";

/**
 * Premium Main component for the history learning map.
 * Displays eras and levels with a winding decorative path.
 */
interface Level {
  id: string;
  title: string;
  lesson: string;
  icon?: string;
}

interface Era {
  id: string;
  title: string;
  levels: Level[];
}

interface Props {
  eras: Era[];
}

const props = defineProps<Props>();

const progressStore = useProgressStore();

const getGlobalIndex = (eraIndex: number, levelIndex: number) => {
  let count = 0;
  for (let i = 0; i < eraIndex; i++) {
    count += props.eras[i].levels.length;
  }
  return count + levelIndex;
};
</script>

<template>
  <div
    class="relative py-40 flex flex-col items-center w-full max-w-6xl mx-auto"
  >
    <!-- Central Timeline Trunk -->
    <div class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 z-0">
      <!-- Bamboo/Vine Texture Trunk -->
      <div
        class="h-full w-full bg-gradient-to-b from-[#8B4513] via-[#D4AF37] to-[#8B4513] rounded-full border-x-4 border-white/20 shadow-lg"
      ></div>

      <!-- Growth Particles -->
      <div
        v-for="i in 50"
        :key="i"
        class="absolute w-2 h-2 bg-[#FFE66D] rounded-full blur-[2px] opacity-40"
        :style="{ top: i * 2 + '%', left: Math.sin(i) * 10 + 'px' }"
      ></div>
    </div>

    <!-- Eras Loop -->
    <div
      v-for="(era, eraIndex) in eras"
      :key="era.id"
      class="w-full flex flex-col items-center mb-64 last:mb-0 relative"
    >
      <!-- Era Milestone (Sticky Branch) -->
      <div class="mb-32 sticky top-24 z-40 w-full flex justify-center">
        <div class="group relative">
          <!-- Branch sticking out from trunk -->
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-4 bg-[#8B4513] border-y-2 border-[#D4AF37] -z-10 rounded-full"
          ></div>

          <div
            class="relative bg-white border-8 border-[#D4AF37] px-16 py-8 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.1)] flex items-center gap-6 transform transition-all duration-700 group-hover:scale-110"
          >
            <span class="text-5xl">🚩</span>
            <span
              class="text-4xl font-black text-[#1A535C] tracking-tighter uppercase"
            >
              {{ era.title }}
            </span>
            <span class="text-5xl">✨</span>
          </div>
        </div>
      </div>

      <!-- Levels Within Era (Alternating) -->
      <div
        v-for="(level, levelIndex) in era.levels"
        :key="level.id"
        class="w-full relative z-10 py-16"
      >
        <div class="flex justify-center w-full">
          <MapNode
            :id="level.id"
            :title="level.title"
            :lesson-id="level.lesson"
            :is-completed="
              progressStore.completedLessons.includes(level.lesson)
            "
            :align="
              getGlobalIndex(eraIndex, levelIndex) % 2 === 0 ? 'left' : 'right'
            "
          />
        </div>

        <!-- Timeline Marker (Dot on Trunk) -->
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border-4 border-[#FF6B6B] rounded-full shadow-lg z-20 group-hover:scale-150 transition-transform"
        ></div>
      </div>
    </div>

    <!-- Final Destination Marker -->
    <div class="relative z-10 mt-32">
      <div
        class="w-32 h-32 bg-[#4ECDC4] rounded-full border-8 border-white shadow-2xl flex items-center justify-center animate-bounce"
      >
        <span class="text-5xl">🏆</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Individual node sections need to be wide to allow left/right content without overlapping the trunk too much */
.w-full {
  position: relative;
}
</style>
