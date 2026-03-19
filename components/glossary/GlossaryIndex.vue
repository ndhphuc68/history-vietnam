<script setup lang="ts">
const props = defineProps<{
  availableLetters: string[];
  activeLetter: string;
}>();

defineEmits<{
  (e: "select", letter: string): void;
}>();
</script>

<template>
  <div class="relative">
    <!-- Desktop Vertical Index -->
    <div class="hidden lg:flex flex-col gap-3 sticky top-40">
      <button
        v-for="letter in availableLetters"
        :key="letter"
        @click="$emit('select', letter)"
        class="w-11 h-11 rounded-2xl flex items-center justify-center font-black transition-all hover:scale-110 shadow-sm"
        :class="
          activeLetter === letter
            ? 'bg-secondary text-white shadow-lg'
            : 'bg-white text-text/40 hover:bg-secondary/10 hover:text-secondary'
        "
      >
        {{ letter }}
      </button>
    </div>

    <!-- Mobile Horizontal Index -->
    <div class="flex lg:hidden gap-2 overflow-x-auto pb-4 no-scrollbar">
      <button
        v-for="letter in availableLetters"
        :key="letter"
        @click="$emit('select', letter)"
        class="min-w-[44px] h-11 rounded-2xl flex items-center justify-center font-black transition-all shadow-sm flex-shrink-0"
        :class="
          activeLetter === letter
            ? 'bg-secondary text-white shadow-lg'
            : 'bg-white text-text/40'
        "
      >
        {{ letter }}
      </button>
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
</style>
