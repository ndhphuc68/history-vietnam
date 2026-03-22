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
  <div id="glossary-index" class="relative">
    <!-- Desktop Vertical Index -->
    <div class="hidden lg:flex flex-col gap-3">
      <button
        v-for="letter in availableLetters"
        :key="letter"
        @click="$emit('select', letter)"
        class="w-11 h-11 rounded-2xl flex items-center justify-center font-black transition-all hover:scale-110 shadow-sm border-2 border-transparent"
        :class="
          activeLetter === letter
            ? 'bg-secondary text-slate-50 shadow-lg border-secondary/20'
            : 'bg-white dark:bg-slate-800 text-text/40 dark:text-slate-400 hover:bg-secondary/10 hover:text-secondary dark:hover:bg-secondary/20 border-slate-100 dark:border-slate-700'
        "
        :title="`Cuộn đến chữ ${letter}`"
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
        class="min-w-[44px] h-11 rounded-2xl flex items-center justify-center font-black transition-all shadow-sm flex-shrink-0 border-2 border-transparent"
        :class="
          activeLetter === letter
            ? 'bg-secondary text-slate-50 shadow-lg border-secondary/20'
            : 'bg-white dark:bg-slate-800 text-text/40 dark:text-slate-400 border-slate-100 dark:border-slate-700'
        "
        :title="`Cuộn đến chữ ${letter}`"
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
