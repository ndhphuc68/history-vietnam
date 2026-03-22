<script setup lang="ts">
import type { GlossaryItem } from "~/types/history";

const props = defineProps<{
  item: GlossaryItem;
}>();

// Map categories to icons and colors
const categoryConfig: Record<
  string,
  { icon: string; color: string; bg: string; border: string }
> = {
  "Chức danh": {
    icon: "fluent-emoji:crown",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/40",
    border: "border-amber-200 dark:border-amber-800/50",
  },
  "Sự vật": {
    icon: "fluent-emoji:shield",
    color: "text-primary dark:text-primary",
    bg: "bg-primary/5 dark:bg-primary/20",
    border: "border-primary/10 dark:border-primary/30",
  },
  "Khái niệm": {
    icon: "fluent-emoji:light-bulb",
    color: "text-secondary dark:text-cyan-400",
    bg: "bg-secondary/5 dark:bg-cyan-900/40",
    border: "border-secondary/10 dark:border-cyan-800/50",
  },
  "Địa danh": {
    icon: "fluent-emoji:world-map",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-200 dark:border-emerald-800/50",
  },
  "Thời kỳ": {
    icon: "fluent-emoji:hourglass-done",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    border: "border-rose-200 dark:border-rose-800/50",
  },
};

const config = computed(() => {
  return (
    categoryConfig[props.item.category || ""] || {
      icon: "fluent-emoji:scroll",
      color: "text-text/60 dark:text-slate-400",
      bg: "bg-background dark:bg-slate-900",
      border: "border-text/10 dark:border-slate-800",
    }
  );
});
</script>

<template>
  <div
    v-if="item"
    class="relative group bg-white dark:bg-slate-800/80 backdrop-blur-md rounded-[40px] p-8 shadow-sm h-full flex flex-col transition-all duration-300 border-2 border-transparent dark:border-slate-700 hover:border-secondary/40 shadow-xl"
    role="article"
    :id="'term-' + item.id"
  >
    <!-- Category Icon Floating -->
    <div
      class="absolute -top-6 -right-6 w-16 h-16 rounded-3xl shadow-lg flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 z-10"
      :class="[config.bg, config.border, 'border-2']"
    >
      <Icon :name="config.icon" class="text-3xl" />
    </div>

    <!-- Header -->
    <div class="mb-4">
      <span
        class="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3"
        :class="[config.bg, config.color]"
      >
        {{ item.category || "Chung" }}
      </span>
      <h3
        class="text-3xl font-black text-text dark:text-gray-100 group-hover:text-secondary transition-colors leading-tight"
      >
        {{ item.term }}
      </h3>
    </div>

    <!-- Definition -->
    <p class="text-text/70 dark:text-gray-300 font-bold leading-relaxed flex-1">
      {{ item.definition }}
    </p>

    <!-- Decorative Corner (Notebook Style) -->
    <div
      class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-10 transition-opacity"
    >
      <Icon name="fluent:bookmark-24-filled" class="text-4xl text-secondary" />
    </div>

    <!-- Bottom Ornament -->
    <div
      class="mt-6 pt-6 border-t-2 border-dashed border-text/5 dark:border-white/10 flex items-center gap-2"
    >
      <div class="w-2 h-2 rounded-full bg-secondary/30"></div>
      <div class="flex-1 h-0.5 bg-secondary/10"></div>
    </div>
  </div>
</template>

<style scoped>
/* Add a subtle paper texture to the background in shadow or hover if needed */
</style>
