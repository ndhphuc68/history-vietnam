<script setup lang="ts">
/**
 * Redesigned MapNode for an alternating timeline layout.
 * Features significantly larger illustrations for children.
 */
interface Props {
  id: string;
  title: string;
  lessonId: string;
  year?: string;
  isUnlocked?: boolean;
  isCompleted?: boolean;
  align?: "left" | "right";
}

const props = withDefaults(defineProps<Props>(), {
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
    class="group relative w-full grid grid-cols-2 items-center min-h-[400px]"
  >
    <!-- Left Column -->
    <div
      class="h-full flex flex-col justify-center transition-all duration-500"
      :class="[
        align === 'right'
          ? 'order-1 items-end pr-20 text-right'
          : 'order-2 items-start pl-20 text-left',
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
          class="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-black rounded shadow-sm tracking-wider flex items-center gap-1"
        >
          <Icon name="lucide:calendar" class="text-[10px]" />
          {{ year }}
        </div>
      </div>

      <h3
        class="text-4xl md:text-5xl font-black text-[#1E293B] tracking-tighter leading-tight transition-colors group-hover:text-[#F87171] mb-2"
      >
        {{ title }}
      </h3>

      <p
        class="text-[#334155] font-bold text-lg max-w-xs leading-relaxed opacity-80 mb-6"
      >
        {{ statusText }}
      </p>

      <!-- Action Button -->
      <NuxtLink
        v-if="isUnlocked"
        :to="`/lesson/${lessonId}`"
        class="inline-flex items-center gap-2 px-8 py-3 bg-[#115E59] text-white font-black rounded-xl shadow-lg hover:scale-[1.05] active:scale-[0.95] transition-transform duration-300 text-sm uppercase tracking-widest group-hover:bg-[#0D9488]"
      >
        HỌC NGAY
      </NuxtLink>
      <div
        v-else
        class="inline-flex items-center gap-2 px-8 py-3 bg-gray-200 text-gray-500 font-black rounded-xl text-sm uppercase tracking-widest cursor-not-allowed border-2 border-gray-300/50"
      >
        <Icon name="lucide:construction" class="text-lg" />
        ĐANG BIÊN SOẠN
      </div>
    </div>

    <!-- Right Column (Illustration) -->
    <div
      class="h-full flex items-center transition-all duration-500"
      :class="[
        align === 'right'
          ? 'order-2 justify-start pl-20'
          : 'order-1 justify-end pr-20',
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
                  'https://via.placeholder.com/400x400?text=History')
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
