<script setup lang="ts">
import { useProgressStore } from '~/stores/progressStore';

/**
 * Main component for the history learning map.
 * Displays levels as nodes with connections.
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

defineProps<Props>();

const progressStore = useProgressStore();

// Randomize horizontal offsets for a more "organic" map feel
const getOffsetClass = (eraIndex: number, levelIndex: number) => {
  const seed = eraIndex * 13 + levelIndex * 7;
  const offsets = ['translate-x-0', 'translate-x-12', 'translate-x-[-40px]', 'translate-x-16', 'translate-x-[-24px]'];
  return offsets[seed % offsets.length];
};
</script>

<template>
  <div class="relative py-12 flex flex-col items-center">
    <!-- SVG Connections Container -->
    <div class="absolute inset-x-0 top-0 bottom-0 flex justify-center -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30">
      <div class="w-2 bg-gray-200 h-full rounded-full"></div>
    </div>

    <!-- Eras Loop -->
    <div 
      v-for="(era, eraIndex) in eras" 
      :key="era.id"
      class="w-full flex flex-col items-center mb-16 last:mb-0"
    >
      <!-- Era Header -->
      <div class="mb-12 sticky top-24 z-10 w-full flex justify-center">
        <div class="bg-white border-4 border-[#4ECDC4] text-[#1A535C] font-black px-8 py-3 rounded-full shadow-lg transform -rotate-1 hover:rotate-0 transition-transform cursor-default">
          {{ era.title }}
        </div>
      </div>

      <!-- Levels Within Era -->
      <div 
        v-for="(level, levelIndex) in era.levels" 
        :key="level.id"
        class="mb-24 relative transition-all duration-500"
        :class="getOffsetClass(eraIndex, levelIndex)"
      >
        <MapMapNode 
          :id="level.id"
          :title="level.title"
          :lesson-id="level.lesson"
          :icon="level.icon || 'default'"
          :is-completed="progressStore.completedLessons.includes(level.lesson)"
        />
        
        <!-- Arrow pointing down (except for very last node in entire map) -->
        <div 
          v-if="!(eraIndex === eras.length - 1 && levelIndex === era.levels.length - 1)"
          class="absolute -bottom-16 left-1/2 -translate-x-1/2 text-gray-300 text-2xl animate-bounce"
        >
          ⬇️
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Any specific map path animations can go here */
</style>
