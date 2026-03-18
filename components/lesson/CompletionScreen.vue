<script setup lang="ts">
import type { CompletionScreenProps } from "~/types/props/lesson";
/**
 * Celebration screen after completing a lesson.
 */
defineProps<CompletionScreenProps>();
const emit = defineEmits(["finished"]);
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center animate-completion"
  >
    <div
      class="max-w-xl w-full bg-white rounded-[40px] shadow-2xl p-12 border-8 border-accent relative"
    >
      <!-- Icon -->
      <div
        class="text-8xl mb-6 transform hover:rotate-12 transition-transform cursor-pointer flex justify-center"
      >
        <Icon name="fluent-emoji:trophy" />
      </div>

      <h2 class="text-4xl md:text-5xl font-black text-text mb-4">
        Chúc mừng bạn!
      </h2>

      <p
        class="text-xl md:text-2xl font-bold text-secondary mb-10 leading-relaxed"
      >
        Bạn đã xuất sắc hoàn thành bài học
        <br />
        <span class="text-primary block mt-2">"{{ lessonTitle }}"</span>
      </p>

      <div class="space-y-4">
        <button
          @click="emit('finished')"
          class="w-full py-5 bg-primary text-white text-2xl font-black rounded-2xl shadow-xl hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center justify-center gap-3"
        >
          TIẾP TỤC KHÁM PHÁ <Icon name="fluent-emoji:rocket" />
        </button>
      </div>

      <!-- Confetti simulation background is usually handled by a library, 
           but we can add some emoji particles for a simple playful effect -->
      <div
        class="absolute inset-x-0 -top-20 flex justify-center gap-4 text-4xl opacity-50 select-none pointer-events-none"
      >
        <div class="animate-bounce" style="animation-delay: 0.1s">
          <Icon name="fluent-emoji:star" />
        </div>
        <div class="animate-bounce" style="animation-delay: 0.3s">
          <Icon name="fluent-emoji:party-popper" />
        </div>
        <div class="animate-bounce" style="animation-delay: 0.5s">
          <Icon name="fluent-emoji:sparkles" />
        </div>
        <div class="animate-bounce" style="animation-delay: 0.2s">
          <Icon name="fluent-emoji:balloon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-completion {
  animation: popUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes popUp {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(100px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
