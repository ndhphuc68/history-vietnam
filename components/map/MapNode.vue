<script setup lang="ts">
/**
 * Component for an individual node on the history learning map.
 */
interface Props {
  id: string;
  title: string;
  lessonId: string;
  icon: string;
  isUnlocked?: boolean;
  isCompleted?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isUnlocked: true,
  isCompleted: false
});

const iconMap: Record<string, string> = {
  mountain: '⛰️',
  castle: '🏰',
  sword: '⚔️',
  river: '🌊',
  default: '📜'
};

const displayIcon = computed(() => iconMap[props.icon] || iconMap.default);
</script>

<template>
  <div class="relative flex flex-col items-center group">
    <!-- Node Circle -->
    <NuxtLink 
      :to="isUnlocked ? `/lesson/${lessonId}` : '#'"
      class="w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-xl border-8 transition-all transform"
      :class="[
        isUnlocked 
          ? 'bg-white border-[#FF6B6B] hover:scale-110 cursor-pointer' 
          : 'bg-gray-200 border-gray-300 opacity-50 cursor-not-allowed',
        isCompleted ? 'ring-4 ring-green-400' : ''
      ]"
    >
      {{ displayIcon }}
      
      <!-- Completed Badge -->
      <div v-if="isCompleted" class="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center border-4 border-white">
        ✅
      </div>
    </NuxtLink>

    <!-- Node Title -->
    <div class="mt-4 bg-[#1A535C] text-white px-4 py-1 rounded-full font-bold text-sm shadow-md whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
      {{ title }}
    </div>
  </div>
</template>

<style scoped>
/* Scale animation on hover already handled by tailwind transform classes */
</style>
