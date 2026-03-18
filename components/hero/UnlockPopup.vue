<script setup lang="ts">
import type { Hero } from "~/types/history";

const props = defineProps<{
  unlockedHero: Hero | null;
  show: boolean;
}>();

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};

type ConfettiPiece = {
  left: string;
  top: string;
  backgroundColor: string;
  animationDelay: string;
  transform: string;
};

const confettiPieces = ref<ConfettiPiece[]>([]);

watch(
  () => props.show,
  (show) => {
    if (!show) return;
    const colors = [
      "var(--primary)",
      "var(--secondary)",
      "var(--accent)",
      "var(--text)",
    ];
    confettiPieces.value = Array.from({ length: 12 }, () => ({
      left: `${Math.random() * 100}%`,
      top: "-10px",
      backgroundColor: colors[Math.floor(Math.random() * colors.length)]!,
      animationDelay: `${Math.random() * 2}s`,
      transform: `rotate(${Math.random() * 360}deg)`,
    }));
  },
  { immediate: true },
);
</script>

<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/80 backdrop-blur-sm"
        @click="close"
      ></div>

      <!-- Content -->
      <div
        class="relative w-full max-w-sm bg-white rounded-[40px] overflow-hidden shadow-2xl animate-scale-up"
      >
        <!-- Celebration Header -->
        <div class="bg-gradient-to-br from-accent to-primary p-6 text-center">
          <div
            class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg animate-bounce"
          >
            <Icon name="fluent-emoji:sparkles" class="text-4xl text-primary" />
          </div>
          <h2 class="text-3xl font-black text-white leading-tight">
            BẠN ĐÃ MỞ KHÓA <br />
            THẺ TƯỚNG MỚI!
          </h2>
        </div>

        <!-- Hero Card Preview -->
        <div class="p-8 flex flex-col items-center">
          <div
            class="w-48 h-64 bg-background rounded-3xl border-8 border-accent shadow-inner mb-6 flex items-center justify-center relative overflow-hidden group"
          >
            <img
              :src="unlockedHero?.image"
              :alt="unlockedHero?.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            ></div>
            <div class="absolute bottom-4 left-4 right-4 text-white">
              <p class="text-sm font-bold opacity-80 uppercase tracking-widest">
                {{ unlockedHero?.era }}
              </p>
              <h3 class="text-xl font-black leading-tight">
                {{ unlockedHero?.name }}
              </h3>
            </div>
          </div>

          <p class="text-center text-text font-medium opacity-80 mb-8 italic">
            "{{ unlockedHero?.title }}"
          </p>

          <button
            @click="close"
            class="w-full py-4 bg-secondary text-white font-black rounded-2xl shadow-lg hover:scale-[1.05] active:scale-[0.95] transition-all text-xl uppercase"
          >
            TUYỆT VỜI!
          </button>
        </div>

        <!-- Confetti Decorations -->
        <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div
            v-for="(piece, idx) in confettiPieces"
            :key="idx"
            class="absolute animate-confetti"
            :style="piece"
          ></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.animate-scale-up {
  animation: scaleUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes scaleUp {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-confetti {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  opacity: 0;
  animation: fall 3s linear infinite;
}

@keyframes fall {
  0% {
    transform: translateY(-10px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(400px) rotate(720deg);
    opacity: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
