<script setup lang="ts">
/**
 * Redesigned MapNode for an alternating timeline layout.
 * Features significantly larger illustrations for children.
 */
interface Props {
  id: string;
  title: string;
  lessonId: string;
  isUnlocked?: boolean;
  isCompleted?: boolean;
  align?: "left" | "right";
}

const props = withDefaults(defineProps<Props>(), {
  isUnlocked: true,
  isCompleted: false,
  align: "left",
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
      <!-- History Tag -->
      <div
        class="px-3 py-1 bg-[#FDE68A] text-[#92400E] text-xs font-black uppercase rounded-md tracking-wider mb-2"
      >
        MỐC LỊCH SỬ
      </div>

      <h3
        class="text-4xl md:text-5xl font-black text-[#1E293B] tracking-tighter leading-tight transition-colors group-hover:text-[#F87171] mb-2"
      >
        {{ title }}
      </h3>

      <p
        class="text-[#334155] font-bold text-lg max-w-xs leading-relaxed opacity-80 mb-6"
      >
        {{
          isCompleted
            ? "Bạn đã chinh phục cột mốc này!"
            : "Khám phá câu chuyện hào hùng về nguồn gốc dân tộc."
        }}
      </p>

      <!-- Action Button -->
      <NuxtLink
        :to="isUnlocked ? `/lesson/${lessonId}` : '#'"
        class="inline-flex items-center gap-2 px-8 py-3 bg-[#115E59] text-white font-black rounded-xl shadow-lg hover:scale-[1.05] active:scale-[0.95] transition-transform duration-300 text-sm uppercase tracking-widest group-hover:bg-[#0D9488]"
      >
        HỌC NGAY
      </NuxtLink>
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
          class="absolute inset-0 bg-white rounded-3xl shadow-2xl border-4 border-white overflow-hidden hover:scale-[1.05] transition-transform duration-300"
        >
          <UiLazyImage
            :src="`/images/history/${id}.png`"
            @error="
              (e: Event) =>
                ((e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/400x400?text=History')
            "
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            :alt="title"
          />
          <div
            class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"
          ></div>
        </div>

        <!-- Done Badge -->
        <div
          v-if="isCompleted"
          class="absolute -top-4 -right-4 w-12 h-12 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white z-30"
        >
          ✅
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No extra scoped css needed as we use Tailwind */
</style>
