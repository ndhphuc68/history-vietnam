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
    class="relative flex items-center gap-12 group w-full max-w-5xl px-4 md:px-0"
    :class="[align === 'right' ? 'flex-row-reverse text-right' : 'text-left']"
  >
    <!-- Illustration Container (Large Storybook Frame) -->
    <NuxtLink
      :to="isUnlocked ? `/lesson/${lessonId}` : '#'"
      class="relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80 flex items-center justify-center transition-all duration-700 transform active:scale-95 z-20 group-hover:scale-105"
      :class="[
        isUnlocked
          ? 'cursor-pointer'
          : 'opacity-60 cursor-not-allowed grayscale',
      ]"
    >
      <!-- Premium Storybook Frame -->
      <div
        class="absolute inset-0 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-white transition-all duration-700 group-hover:rotate-3 group-hover:shadow-2xl"
      ></div>

      <!-- Decorative Bamboo/Wood Corners -->
      <div
        class="absolute -top-4 -left-4 w-12 h-12 bg-[#8B4513] rounded-full border-4 border-[#D4AF37] opacity-80 z-30 flex items-center justify-center text-white text-xl"
      >
        ✨
      </div>
      <div
        class="absolute -bottom-4 -right-4 w-12 h-12 bg-[#8B4513] rounded-full border-4 border-[#D4AF37] opacity-80 z-30 flex items-center justify-center text-white text-xl"
      >
        📜
      </div>

      <!-- Illustration Content -->
      <div
        class="relative w-full h-full rounded-2xl overflow-hidden bg-white z-20 shadow-inner"
      >
        <img
          :src="`/images/history/${id}.png`"
          @error="
            (e) => ((e.target as HTMLImageElement).style.display = 'none')
          "
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          :alt="title"
        />

        <!-- Fallback -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-[#1A535C]/5 to-[#4ECDC4]/5 -z-10"
        ></div>

        <!-- Locked Overlay -->
        <div
          v-if="!isUnlocked"
          class="absolute inset-0 bg-white/60 flex items-center justify-center z-30 backdrop-blur-md"
        >
          <span class="text-7xl opacity-40 grayscale">🔒</span>
        </div>
      </div>

      <!-- Completion Badge (Golden Seal) -->
      <div
        v-if="isCompleted"
        class="absolute -top-8 -right-8 bg-[#FFD700] rounded-full w-20 h-20 flex items-center justify-center border-8 border-white shadow-2xl z-40 animate-bounce"
        style="animation-duration: 3s"
      >
        <span class="text-4xl drop-shadow-md">⭐</span>
      </div>
    </NuxtLink>

    <!-- Info Section (Large Text & Context) -->
    <div class="flex-1 space-y-4 py-8">
      <!-- Era Mini Tag -->
      <div
        class="inline-block px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-2"
        :class="
          isUnlocked
            ? 'bg-[#FFE66D] text-[#1A535C]'
            : 'bg-gray-200 text-gray-400'
        "
      >
        Mốc Lịch Sử
      </div>

      <h3
        class="text-4xl md:text-5xl font-black tracking-tighter transition-colors duration-300"
        :class="
          isUnlocked
            ? 'text-[#1A535C] group-hover:text-[#FF6B6B]'
            : 'text-gray-400'
        "
      >
        {{ title }}
      </h3>

      <p
        class="text-lg md:text-xl font-medium leading-relaxed max-w-md"
        :class="isUnlocked ? 'text-gray-600' : 'text-gray-400'"
        v-if="isUnlocked"
      >
        Khám phá câu chuyện hào hùng về
        <span class="font-bold underline decoration-[#4ECDC4] decoration-4">{{
          title
        }}</span>
        ngay nhé! 🛶✨
      </p>

      <!-- Action Button (Only for unlocked) -->
      <div v-if="isUnlocked" class="pt-4">
        <NuxtLink
          :to="`/lesson/${lessonId}`"
          class="inline-flex items-center gap-3 px-8 py-3 bg-[#4ECDC4] text-white font-black rounded-full shadow-lg hover:bg-[#FF6B6B] transition-all transform hover:-translate-y-1 active:scale-95"
        >
          HỌC NGAY
          <span class="text-2xl">👉</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Central Timeline Connection (Branch) -->
    <div
      class="absolute top-1/2 -translate-y-1/2 w-32 h-2 bg-[#D4AF37]/30 -z-10"
      :class="[
        align === 'right'
          ? 'right-full translate-x-12'
          : 'left-full -translate-x-12',
      ]"
    >
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#D4AF37] rounded-full border-4 border-white shadow-md"
      ></div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth Storybook Reveal */
.group:hover .rounded-3xl {
  border-color: #ffe66d;
}
</style>
