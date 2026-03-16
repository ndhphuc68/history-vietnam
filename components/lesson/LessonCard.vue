<script setup lang="ts">
/**
 * Component to display a summary of a lesson in a card format.
 */
interface Props {
  id: string;
  title: string;
  summary: string;
  period: string;
  isCompleted?: boolean;
}

defineProps<Props>();
</script>

<template>
  <NuxtLink
    :to="`/lesson/${id}`"
    class="card flex flex-col h-full hover:border-[#FF6B6B] transition-all group"
  >
    <div class="flex items-center justify-between mb-4">
      <span
        class="px-3 py-1 bg-[#FFE66D] text-[#1A535C] font-bold rounded-full text-xs uppercase tracking-wider"
      >
        {{ period }}
      </span>
      <span
        v-if="isCompleted"
        class="text-green-500 font-bold flex items-center gap-1"
      >
        <span class="text-lg">✅</span> Đã xong
      </span>
    </div>

    <h3
      class="text-2xl font-black text-[#1A535C] mb-3 group-hover:text-[#FF6B6B] transition-colors"
    >
      {{ title }}
    </h3>

    <p class="text-[#1A535C] opacity-80 line-clamp-3 mb-6 flex-grow text-lg">
      {{ summary }}
    </p>

    <div
      class="flex items-center text-[#FF6B6B] font-bold text-lg group-hover:translate-x-2 transition-transform"
    >
      Bắt đầu học ngay ➔
    </div>
  </NuxtLink>
</template>
