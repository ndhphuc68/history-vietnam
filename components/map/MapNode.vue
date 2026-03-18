<script setup lang="ts">
import type { MapNodeProps } from "~/types/props/map";
/**
 * Redesigned MapNode for an alternating timeline layout.
 * Features significantly larger illustrations for children.
 */
const props = withDefaults(defineProps<MapNodeProps>(), {
  isUnlocked: true,
  isCompleted: false,
  align: "left",
});

const statusText = computed(() => {
  if (props.isCompleted) return "Bạn đã chinh phục cột mốc này!";
  if (props.isUnlocked)
    return "Khám phá câu chuyện hào hùng về nguồn gốc dân tộc.";
  return "Nội dung đang được soạn thảo, hãy chờ nhé!";
});
</script>

<template>
  <div
    class="group relative w-full grid grid-cols-1 md:grid-cols-2 items-center min-h-[auto] md:min-h-[400px] gap-8 md:gap-0 py-12 md:py-0"
  >
    <!-- Left Column -->
    <div
      class="h-full flex flex-col justify-center transition-all duration-500 px-6 sm:px-10 md:px-0 pl-20"
      :class="[
        align === 'right'
          ? 'md:order-1 md:items-end md:pr-20 md:text-right'
          : 'md:order-2 md:items-start md:pl-20 md:text-left',
        'order-2 items-start text-left',
      ]"
    >
      <!-- Tags Row -->
      <div class="flex items-center gap-2 mb-2">
        <div
          class="px-2 py-0.5 bg-[#FDE68A] text-[#92400E] text-[10px] font-black uppercase rounded shadow-sm tracking-wider"
        >
          MỐC LỊCH SỬ
        </div>
        <div
          v-if="year"
          class="px-3 py-1 bg-secondary/20 text-text text-[11px] font-black rounded-full shadow-sm flex items-center gap-1.5 border border-white/50"
        >
          <Icon name="fluent-emoji:spiral-calendar" class="text-sm" />
          {{ year }}
        </div>
      </div>

      <h3
        class="text-3xl sm:text-4xl md:text-5xl font-black text-text tracking-tight leading-tight transition-colors group-hover:text-primary mb-2"
      >
        {{ title }}
      </h3>

      <p
        class="text-text font-bold text-base md:text-lg max-w-xs leading-relaxed opacity-60 mb-8"
      >
        {{ statusText }}
      </p>

      <!-- Action Button -->
      <NuxtLink
        v-if="isUnlocked"
        :to="`/lesson/${lessonId}`"
        class="inline-flex items-center gap-3 px-8 md:px-10 py-3.5 md:py-4 bg-primary text-white font-black rounded-2xl shadow-xl hover:scale-[1.05] active:scale-[0.95] transition-all duration-300 text-sm md:text-base uppercase tracking-widest group-hover:shadow-primary/20"
      >
        KHÁM PHÁ NGAY <Icon name="fluent-emoji:rocket" class="text-xl" />
      </NuxtLink>
      <div
        v-else
        class="inline-flex items-center gap-3 px-10 py-4 bg-gray-100 text-gray-400 font-black rounded-2xl text-base uppercase tracking-widest cursor-not-allowed border-2 border-dashed border-gray-300"
      >
        <Icon name="fluent-emoji:tools" class="text-xl" />
        ĐANG BIÊN SOẠN
      </div>
    </div>

    <!-- Right Column (Illustration) -->
    <div
      class="h-full flex items-center transition-all duration-500 pl-20 md:pl-0"
      :class="[
        align === 'right'
          ? 'md:order-2 md:justify-start md:pl-20'
          : 'md:order-1 md:justify-end md:pr-20',
        'order-1 justify-start',
      ]"
    >
      <div class="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 z-20">
        <!-- Image Frame -->
        <div
          class="absolute inset-0 bg-white rounded-3xl shadow-2xl border-4 border-white overflow-hidden"
        >
          <UiLazyImage
            :src="`/images/history/${id}.png`"
            @error="
              (e: Event) =>
                ((e.target as HTMLImageElement).src =
                  '/images/history/default-thumb.png')
            "
            class="w-full h-full object-cover transition-transform duration-700"
            :alt="title"
          />
          <div
            v-if="!isUnlocked"
            class="absolute inset-0 bg-black/10 flex items-center justify-center"
          >
            <div
              class="bg-white/90 p-3 rounded-full shadow-lg border-2 border-white"
            >
              <Icon name="fluent-emoji:locked" class="text-4xl opacity-80" />
            </div>
          </div>
          <div
            v-else
            class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"
          ></div>
        </div>

        <!-- Done Ribbon -->
        <div
          v-if="isCompleted"
          class="absolute -top-2 -right-2 w-32 h-32 overflow-hidden z-40 pointer-events-none rounded-tr-3xl"
        >
          <div
            class="bg-green-500 text-white font-black text-[10px] py-1 w-[170%] text-center absolute top-7 right-[-45px] rotate-45 shadow-xl border-y border-white/20 uppercase tracking-widest"
          >
            HOÀN THÀNH
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No extra scoped css needed as we use Tailwind */
</style>
