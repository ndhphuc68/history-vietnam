<script setup lang="ts">
import type { CompletionScreenProps } from "~/types/props/lesson";

/**
 * Celebration screen after completing a lesson.
 */
defineProps<CompletionScreenProps>();
const emit = defineEmits(["finished"]);

type ConfettiPiece = {
  left: string;
  top: string;
  backgroundColor: string;
  animationDelay: string;
  transform: string;
};

const confettiPieces = ref<ConfettiPiece[]>([]);

onMounted(() => {
  const colors = ["#FFD700", "#FF69B4", "#00CED1", "#9370DB", "#FF4500"];
  confettiPieces.value = Array.from({ length: 30 }, () => ({
    left: `${Math.random() * 100}%`,
    top: "-20px",
    backgroundColor: colors[Math.floor(Math.random() * colors.length)]!,
    animationDelay: `${Math.random() * 3}s`,
    transform: `rotate(${Math.random() * 360}deg)`,
  }));
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center animate-completion relative overflow-hidden"
  >
    <!-- Background Particles -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        v-for="(piece, idx) in confettiPieces"
        :key="idx"
        class="absolute w-3 h-3 rounded-sm opacity-0 animate-confetti-fall"
        :style="piece"
      ></div>
    </div>

    <div
      class="max-w-xl w-full bg-white rounded-[50px] shadow-[0_20px_60px_rgba(0,0,0,0.1)] p-12 border-8 border-accent relative z-10"
    >
      <!-- Celebration Header -->
      <div class="relative inline-block mb-10">
        <div
          class="w-32 h-32 bg-accent/10 rounded-[40px] flex items-center justify-center animate-float-slow"
        >
          <Icon name="fluent-emoji:trophy" class="text-7xl drop-shadow-lg" />
        </div>
        <!-- Sparkles around trophy -->
        <Icon
          name="fluent-emoji:sparkles"
          class="absolute -top-4 -right-4 text-4xl animate-pulse"
        />
        <Icon
          name="fluent-emoji:star"
          class="absolute -bottom-2 -left-6 text-3xl animate-bounce"
        />
      </div>

      <h2 class="text-5xl font-black text-text mb-6 tracking-tight">
        {{ $t("completion.awesome") }}
      </h2>

      <div class="space-y-2 mb-12">
        <p class="text-2xl font-bold text-text/60">
          {{ $t("completion.completed_text") }}
        </p>
        <p class="text-3xl font-black text-primary leading-tight px-4">
          "{{ lessonTitle }}"
        </p>
      </div>

      <div class="space-y-4">
        <button
          @click="emit('finished')"
          class="w-full py-6 bg-secondary text-white text-2xl font-black rounded-[24px] shadow-2xl hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center justify-center gap-4 uppercase tracking-widest"
        >
          {{ $t("completion.continue") }} <Icon name="fluent-emoji:rocket" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-completion {
  animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(40px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-float-slow {
  animation: floatSlow 4s ease-in-out infinite;
}

@keyframes floatSlow {
  0%,
  100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
}

.animate-confetti-fall {
  animation: fall 4s linear infinite;
}

@keyframes fall {
  0% {
    transform: translateY(-50px) rotate(0deg);
    opacity: 1;
  }
  25% {
    transform: translateX(30px) rotate(90deg);
  }
  50% {
    transform: translateX(-30px) rotate(180deg);
  }
  75% {
    transform: translateX(15px) rotate(270deg);
  }
  100% {
    transform: translateY(800px) rotate(360deg);
    opacity: 0;
  }
}
</style>
