<script setup lang="ts">
import { useBadgeStore } from "~/stores/badgeStore";

const badgeStore = useBadgeStore();
const show = ref(false);
const badge = ref<any>(null);

// Watch for new badges
watch(
  () => badgeStore.lastUnlockedBadge,
  (newBadge) => {
    if (newBadge) {
      badge.value = newBadge;
      show.value = true;

      // Auto close after 5 seconds
      setTimeout(() => {
        show.value = false;
        // Reset last unlocked badge after showing
        badgeStore.lastUnlockedBadge = null;
      }, 5000);
    }
  },
);

const close = () => {
  show.value = false;
  badgeStore.lastUnlockedBadge = null;
};
</script>

<template>
  <Teleport to="body">
    <Transition name="badge-pop">
      <div
        v-if="show && badge"
        class="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none"
      >
        <!-- Backdrop (Optional, but let's keep it transparent for non-blocking if possible) -->
        <!-- For a "WOW" effect, a light blur backdrop is better -->
        <div
          class="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-auto"
          @click="close"
        ></div>

        <div
          class="relative bg-white rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.2)] p-10 max-w-sm w-full text-center border-[8px] border-primary pointer-events-auto animate-bounce-in"
        >
          <!-- Confetti Effect (Simple CSS and Icons) -->
          <div
            class="absolute inset-0 overflow-hidden rounded-[32px] pointer-events-none"
          >
            <div
              v-for="i in 12"
              :key="i"
              class="absolute text-2xl animate-confetti"
              :style="{
                left: Math.random() * 100 + '%',
                top: '-20px',
                animationDelay: Math.random() * 2 + 's',
                color: ['#1A535C', '#F76C6C', '#4ECDC4', '#FFE66D'][
                  Math.floor(Math.random() * 4)
                ],
              }"
            >
              <Icon name="fluent-emoji:star" />
            </div>
          </div>

          <div class="relative z-10">
            <div
              class="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-dashed border-primary animate-spin-slow"
            >
              <Icon :name="badge.icon" class="text-7xl" />
            </div>

            <h4
              class="text-primary font-black uppercase tracking-[0.2em] text-sm mb-2"
            >
              Thành tựu mới!
            </h4>
            <h2 class="text-3xl font-black text-text mb-4">
              {{ badge.title }}
            </h2>
            <p class="text-text/70 font-bold mb-8 italic">
              "{{ badge.description }}"
            </p>

            <button
              @click="close"
              class="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
            >
              TUYỆT VỜI! 🚀
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.bounce-in-enter-active {
  animation: bounce-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes bounce-in {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 10s linear infinite;
}

@keyframes confetti {
  0% {
    transform: translateY(0) rotate(0);
    opacity: 1;
  }
  100% {
    transform: translateY(400px) rotate(720deg);
    opacity: 0;
  }
}

.animate-confetti {
  animation: confetti 3s ease-out forwards;
}

.badge-pop-enter-active,
.badge-pop-leave-active {
  transition: all 0.5s ease;
}
.badge-pop-enter-from,
.badge-pop-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}
</style>
