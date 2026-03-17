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
    class="relative py-20 flex flex-col items-center w-full max-w-4xl mx-auto"
  >
    <!-- Central Timeline Line (Simple Solid Orange) -->
    <div
      class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1.5 z-0 bg-[#D97706] opacity-40"
    ></div>

    <!-- Eras Loop -->
    <div
      v-for="(era, eraIndex) in eras"
      :key="era.id"
      class="w-full flex flex-col items-center mb-32 last:mb-0 relative"
    >
      <!-- Era Milestone (Large Gradient Card) -->
      <div class="mb-24 w-full flex justify-center z-20">
        <div
          class="relative w-full max-w-md bg-gradient-to-br from-[#F87171] to-[#EA580C] p-8 rounded-[40px] shadow-2xl overflow-hidden border-b-8 border-orange-800/20 group hover:scale-[1.05] transition-transform duration-300"
        >
          <!-- Decorative Background Circles -->
          <div
            class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
          ></div>
          <div
            class="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-3xl"
          ></div>

          <div class="relative flex flex-col items-center text-center gap-2">
            <h2
              class="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase drop-shadow-lg"
            >
              {{ era.title }}
            </h2>

            <p class="text-white/80 font-bold text-lg">
              Giai đoạn khởi đầu lịch sử hào hùng
            </p>
          </div>
        </div>
      </div>

      <!-- Levels Within Era -->
      <div
        v-for="(level, levelIndex) in era.levels"
        :key="level.id"
        class="w-full relative z-10 py-12"
      >
        <div class="flex justify-center w-full px-4">
          <MapNode
            :id="level.id"
            :title="level.title"
            :lesson-id="level.lesson"
            :is-completed="
              progressStore.completedLessons.includes(level.lesson)
            "
            :align="
              getGlobalIndex(eraIndex, levelIndex) % 2 === 0 ? 'right' : 'left'
            "
          />
        </div>

        <!-- Timeline Marker (Dot on Trunk) -->
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border-6 border-[#F87171] rounded-full shadow-xl z-30 transition-transform hover:scale-125"
        ></div>
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
