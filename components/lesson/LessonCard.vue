<script setup lang="ts">
/**
 * Component to display a summary of a lesson in a card format.
 */
interface Props {
  id: string;
  title: string;
  summary?: string;
  period?: string;
  isCompleted?: boolean;
  isLocked?: boolean;
  thumbnail?: string;
  eraThumbnail?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isCompleted: false,
  isLocked: false,
  summary: "Câu chuyện lịch sử đang chờ bạn khám phá...",
  period: "Lịch sử",
});
</script>

<template>
  <component
    :is="isLocked ? 'div' : 'NuxtLink'"
    :to="isLocked ? undefined : `/lesson/${id}`"
    class="card relative flex flex-col h-full transition-all duration-300 group overflow-hidden border-4"
    :class="[
      isLocked
        ? 'opacity-75 grayscale cursor-not-allowed border-gray-100 bg-gray-50'
        : 'hover:border-[#FF6B6B] hover:shadow-xl hover:-translate-y-1 bg-white border-white shadow-md',
    ]"
  >
    <!-- Thumbnail Section -->
    <div
      class="relative w-full aspect-video overflow-hidden rounded-2xl mb-4 bg-gray-50 border-b shadow-inner flex items-center justify-center"
    >
      <UiLazyImage
        :src="thumbnail || eraThumbnail || '/images/history/default-thumb.png'"
        class="w-full h-full p-1 transition-transform duration-700"
        :class="[
          thumbnail ? 'object-cover' : 'object-contain',
          { 'group-hover:scale-110': !isLocked },
        ]"
        alt="Lesson Thumbnail"
      />
      <div
        v-if="isLocked"
        class="absolute inset-0 bg-black/40 flex items-center justify-center"
      >
        <div class="bg-white/90 p-3 rounded-full shadow-lg">
          <Icon name="fluent-emoji:locked" class="text-4xl" />
        </div>
      </div>

      <!-- Period Badge -->
      <div class="absolute top-2 left-2">
        <span
          class="px-3 py-1 bg-[#FFE66D]/90 backdrop-blur-sm text-[#1A535C] font-bold rounded-full text-[10px] uppercase tracking-wider shadow-sm"
        >
          {{ period }}
        </span>
      </div>
    </div>

    <div class="px-2 flex-grow flex flex-col">
      <div class="flex items-center justify-between mb-2">
        <span
          v-if="isCompleted"
          class="text-green-500 font-bold text-xs flex items-center gap-1"
        >
          <Icon name="fluent-emoji:check-mark-button" class="text-xl" /> Đã hoàn
          thành
        </span>
        <span v-else-if="isLocked" class="text-gray-400 font-bold text-xs">
          Sắp ra mắt
        </span>
      </div>

      <h3
        class="text-xl font-black text-[#1A535C] mb-2 group-hover:text-[#FF6B6B] transition-colors line-clamp-2"
      >
        {{ title }}
      </h3>

      <p
        class="text-[#1A535C] opacity-70 line-clamp-2 mb-4 text-sm leading-relaxed"
      >
        {{ summary }}
      </p>

      <div v-if="!isLocked" class="mt-auto pb-2">
        <div
          class="flex items-center text-[#FF6B6B] font-bold text-sm group-hover:translate-x-2 transition-transform"
        >
          Bắt đầu học ngay ➔
        </div>
      </div>
      <div v-else class="mt-auto pb-2 text-gray-400 font-bold text-sm">
        Đang biên soạn...
      </div>
    </div>
  </component>
</template>

<style scoped>
.card {
  border-radius: 2rem;
}
</style>
