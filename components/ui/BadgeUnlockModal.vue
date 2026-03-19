<script setup lang="ts">
import { useBadgeStore } from "~/stores/badgeStore";
import { useMascotStore } from "~/stores/mascotStore";

const badgeStore = useBadgeStore();
const mascotStore = useMascotStore();
const show = ref(false);
const badge = ref<any>(null);

// Watch for new badges
watch(
  () => badgeStore.lastUnlockedBadge,
  (newBadge) => {
    if (newBadge) {
      badge.value = newBadge;
      show.value = true;

      // Mascot congratulates
      mascotStore.congratulate(newBadge.title);

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

const getConfettiColor = () => {
  const colors = [
    "var(--text)",
    "var(--primary)",
    "var(--secondary)",
    "var(--accent)",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getConfettiIcon = () => {
  const icons = [
    "fluent-emoji:star",
    "fluent-emoji:party-popper",
    "fluent-emoji:sparkles",
    "fluent-emoji:balloon",
  ];
  return icons[Math.floor(Math.random() * icons.length)] as string;
};
</script>

<template>
  <Teleport to="body">
    <Transition name="badge-pop">
      <div
        v-if="show && badge"
        class="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-auto"
          @click="close"
        ></div>

        <div
          class="relative bg-white rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.2)] p-10 max-w-sm w-full text-center border-[8px] border-primary pointer-events-auto animate-bounce-in"
        >
          <!-- Confetti Effect -->
          <div
            class="absolute inset-0 overflow-hidden rounded-[32px] pointer-events-none"
          >
            <div
              v-for="i in 20"
              :key="i"
              class="absolute text-2xl animate-confetti"
              :style="{
                left: Math.random() * 100 + '%',
                top: '-40px',
                animationDelay: Math.random() * 3 + 's',
                color: getConfettiColor(),
              }"
            >
              <Icon :name="getConfettiIcon()" />
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
