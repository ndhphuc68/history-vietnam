<script setup lang="ts">
import type { NextButtonProps } from "~/types/props/lesson";
/**
 * Main button used for navigation in lessons.
 */
defineProps<NextButtonProps>();
defineEmits(["click"]);
</script>

<template>
  <button
    @click="$emit('click')"
    :disabled="disabled"
    class="px-12 py-5 bg-primary text-white text-2xl font-black rounded-2xl shadow-xl hover:scale-[1.05] active:scale-[0.95] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
  >
    <span>{{ label }}</span>
    <slot name="icon" />
  </button>
</template>
