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
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  "Sự vật": {
    icon: "fluent-emoji:shield",
    color: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/10",
  },
  "Khái niệm": {
    icon: "fluent-emoji:light-bulb",
    color: "text-secondary",
    bg: "bg-secondary/5",
    border: "border-secondary/10",
  },
  "Địa danh": {
    icon: "fluent-emoji:world-map",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  "Thời kỳ": {
    icon: "fluent-emoji:hourglass-done",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
  },
};

const config = computed(() => {
  return (
    categoryConfig[props.item.category || ""] || {
      icon: "fluent-emoji:scroll",
      color: "text-text/60",
      bg: "bg-background",
      border: "border-text/10",
    }
  );
});
</script>

<template>
  <div
    class="relative group bg-white rounded-[40px] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-secondary/20 flex flex-col h-full"
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
        class="text-3xl font-black text-text group-hover:text-secondary transition-colors leading-tight"
      >
        {{ item.term }}
      </h3>
    </div>

    <!-- Definition -->
    <p class="text-text/70 font-bold leading-relaxed flex-1">
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
      class="mt-6 pt-6 border-t-2 border-dashed border-text/5 flex items-center gap-2"
    >
      <div class="w-2 h-2 rounded-full bg-secondary/30"></div>
      <div class="flex-1 h-0.5 bg-secondary/10"></div>
    </div>
  </div>
</template>

<style scoped>
/* Add a subtle paper texture to the background in shadow or hover if needed */
</style>
