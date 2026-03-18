<script setup lang="ts">
import type { MapNodeProps } from "~/types/props/map";
/**
 * Redesigned MapNode for an alternating timeline layout.
 * Features significantly larger illustrations for children.
 */
const props = withDefaults(
  defineProps<MapNodeProps & { isCurrent?: boolean }>(),
  {
    isUnlocked: true,
    isCompleted: false,
    isCurrent: false,
    align: "left",
  },
);

const statusText = computed(() => {
  if (props.isCompleted) return "Bạn đã chinh phục cột mốc này!";
  if (props.isUnlocked)
    return "Khám phá câu chuyện hào hùng về nguồn gốc dân tộc.";
  return "Nội dung đang được soạn thảo, hãy chờ nhé!";
});
</script>

<template>
  <div
    class="relative w-full flex flex-col items-center group"
    :class="[isCurrent ? 'z-30' : 'z-20']"
  >
    <!-- The Unified Card Container -->
    <div
      class="relative w-full max-w-[340px] md:max-w-none bg-white rounded-[2.5rem] shadow-xl md:shadow-none border-[6px] border-white md:border-0 overflow-hidden transition-all duration-500 hover:shadow-2xl md:hover:shadow-none"
      :class="[
        isCurrent
          ? 'ring-4 ring-primary ring-offset-4 animate-[pulse-soft_3s_infinite]'
          : '',
        align === 'right' ? 'md:bg-transparent' : 'md:bg-transparent',
      ]"
    >
      <div
        class="flex flex-col md:grid md:grid-cols-2 items-center gap-0 md:gap-0"
      >
        <!-- Illustration Column -->
        <div
          class="w-full aspect-square md:aspect-auto md:h-[400px] relative overflow-hidden"
          :class="[align === 'right' ? 'md:order-2' : 'md:order-1']"
        >
          <UiLazyImage
            :src="`/images/history/${id}.png`"
            @error="
              (e: Event) =>
                ((e.target as HTMLImageElement).src =
                  '/images/history/default-thumb.png')
            "
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            :alt="title"
          />

          <!-- Overlay for Locked/Unlocked -->
          <div
            v-if="!isUnlocked"
            class="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          >
            <div class="bg-white/90 p-4 rounded-full shadow-2xl scale-110">
              <Icon name="fluent-emoji:locked" class="text-4xl" />
            </div>
          </div>

          <!-- Done Ribbon (Pinned to Top-Left of Image) -->
          <div v-if="isCompleted" class="absolute top-4 left-4 z-10">
            <div
              class="bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1 uppercase tracking-widest"
            >
              <Icon name="fluent-emoji:check-mark-button" /> Hoàn thành
            </div>
          </div>

          <!-- Current Ribbon (Pinned to Top-Right of Image) -->
          <div
            v-if="isCurrent"
            class="absolute top-4 right-4 z-10 animate-bounce"
          >
            <div
              class="bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1 uppercase tracking-widest"
            >
              <Icon name="fluent-emoji:star" /> Bé đang ở đây
            </div>
          </div>
        </div>

        <!-- Content Column -->
        <div
          class="w-full p-8 md:p-12 flex flex-col justify-center text-center md:text-left"
          :class="[
            align === 'right'
              ? 'md:order-1 md:items-end md:text-right'
              : 'md:order-2 md:items-start md:text-left',
          ]"
        >
          <!-- Tags -->
          <div
            class="flex items-center justify-center md:justify-start gap-2 mb-4"
          >
            <div
              v-if="year"
              class="px-3 py-1 bg-secondary/15 text-text text-[11px] font-black rounded-full border border-secondary/20 flex items-center gap-1.5"
            >
              <Icon name="fluent-emoji:spiral-calendar" class="text-xs" />
              {{ year }}
            </div>
          </div>

          <h3
            class="text-2xl md:text-5xl font-black text-text mb-3 leading-tight group-hover:text-primary transition-colors"
          >
            {{ title }}
          </h3>

          <p
            class="text-text/60 font-bold text-sm md:text-lg leading-relaxed mb-8 max-w-sm"
          >
            {{ statusText }}
          </p>

          <!-- Action -->
          <NuxtLink
            v-if="isUnlocked"
            :to="`/lesson/${lessonId}`"
            class="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest"
          >
            KHÁM PHÁ <Icon name="fluent-emoji:rocket" class="text-lg" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse-soft {
  0%,
  100% {
    transform: scale(1);
    box-shadow:
      0 20px 25px -5px rgba(26, 83, 92, 0.1),
      0 10px 10px -5px rgba(26, 83, 92, 0.04);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 0 40px rgba(26, 83, 92, 0.2);
  }
}
</style>
