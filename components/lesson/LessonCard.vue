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
  <NuxtLink
    v-if="!isLocked"
    :to="`/lesson/${id}`"
    class="card relative flex flex-col h-full transition-all duration-300 group overflow-hidden border-4 hover:border-[#FF6B6B] hover:shadow-xl hover:-translate-y-1 shadow-md cursor-pointer"
    :class="
      isCompleted ? 'border-green-400 bg-green-50/30' : 'border-white bg-white'
    "
  >
    <!-- Card Corner Ribbon -->
    <div
      v-if="isCompleted"
      class="absolute -top-1 -right-1 w-36 h-36 overflow-hidden z-40 pointer-events-none"
    >
      <div
        class="bg-green-500 text-white font-black text-xs py-1.5 w-[170%] text-center absolute top-9 right-[-60px] rotate-45 shadow-xl border-y border-white/20 uppercase tracking-[0.2em]"
      >
        HOÀN THÀNH
      </div>
    </div>
    <!-- Same content as below, but for NuxtLink -->
    <div class="p-0 flex flex-col h-full">
      <!-- Thumbnail Section -->
      <div
        class="relative w-full aspect-[16/10] overflow-hidden rounded-2xl mb-2 bg-gray-50 border-b shadow-inner flex items-center justify-center"
      >
        <UiLazyImage
          :src="
            thumbnail || eraThumbnail || '/images/history/default-thumb.png'
          "
          class="w-full h-full transition-transform duration-700"
          :class="thumbnail ? 'object-cover' : 'object-contain'"
          alt="Lesson Thumbnail"
        />
        <!-- Period Badge -->
        <div class="absolute top-2 left-2 z-20">
          <span
            class="px-3 py-1 bg-[#FFE66D]/90 backdrop-blur-sm text-[#1A535C] font-black rounded-full text-[10px] uppercase tracking-wider shadow-sm border border-white/20"
          >
            {{ period }}
          </span>
        </div>
      </div>
      <div class="px-3 py-1.5 flex-grow flex flex-col">
        <h3
          class="text-lg font-black text-[#1A535C] mb-0.5 group-hover:text-[#FF6B6B] transition-colors line-clamp-1 leading-tight"
        >
          {{ title }}
        </h3>

        <p
          class="text-[#1A535C] opacity-70 line-clamp-2 mb-2 text-xs leading-snug"
        >
          {{ summary }}
        </p>

        <div class="mt-auto pb-1">
          <div
            v-if="isCompleted"
            class="flex items-center text-green-600 font-bold text-xs group-hover:translate-x-2 transition-transform"
          >
            Xem lại bài học
            <Icon name="lucide:refresh-cw" class="ml-1 w-3.5 h-3.5" />
          </div>
          <div
            v-else
            class="flex items-center text-[#FF6B6B] font-bold text-xs group-hover:translate-x-2 transition-transform"
          >
            Học ngay <Icon name="lucide:arrow-right" class="ml-1 w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>

  <div
    v-else
    class="card relative flex flex-col h-full transition-all duration-300 group overflow-hidden border-4 cursor-not-allowed border-[#FF6B6B]/10 bg-white shadow-sm"
  >
    <!-- Thumbnail Section -->
    <div
      class="relative w-full aspect-video overflow-hidden rounded-2xl mb-4 bg-gray-50 border-b shadow-inner flex items-center justify-center"
    >
      <UiLazyImage
        :src="thumbnail || eraThumbnail || '/images/history/default-thumb.png'"
        class="w-full h-full p-1 object-contain"
        alt="Lesson Thumbnail"
      />
      <div
        class="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center"
      >
        <div
          class="bg-white/95 p-3 rounded-full shadow-xl border border-white/50"
        >
          <Icon name="fluent-emoji:locked" class="text-4xl opacity-80" />
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

    <div class="px-3 py-1.5 flex-grow flex flex-col">
      <div class="flex items-center justify-between mb-1 min-h-[20px]">
        <span
          class="text-[#FF6B6B] font-black text-[9px] uppercase tracking-wider bg-[#FF6B6B]/10 px-2 py-0.5 rounded-md"
        >
          Sắp ra mắt
        </span>
      </div>

      <h3
        class="text-lg font-black text-[#1A535C] mb-0.5 line-clamp-1 leading-tight"
      >
        {{ title }}
      </h3>

      <p
        class="text-[#1A535C] opacity-70 line-clamp-2 mb-2 text-xs leading-snug"
      >
        {{ summary }}
      </p>

      <div class="mt-auto pb-1 text-[#FF6B6B]/40 font-bold text-xs italic">
        Đang biên soạn...
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 2rem;
}
</style>
