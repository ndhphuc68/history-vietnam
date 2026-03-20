<script setup lang="ts">
import type { Badge } from "~/types/history";

const props = defineProps<{
  badge: Badge | null;
  show: boolean;
}>();

const emit = defineEmits(["close"]);

const { t } = useI18n();

const rarityConfig = {
  common: {
    bg: "from-slate-400 to-slate-600",
    glow: "shadow-slate-400/50",
  },
  rare: {
    bg: "from-blue-400 to-blue-600",
    glow: "shadow-blue-400/50",
  },
  epic: {
    bg: "from-purple-500 to-purple-700",
    glow: "shadow-purple-500/50",
  },
  legendary: {
    bg: "from-amber-400 to-orange-600",
    glow: "shadow-amber-400/50",
  },
};

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
      "#FFD700", // Gold
      "#FF69B4", // Pink
      "#00CED1", // Turquoise
      "#9370DB", // Purple
      "#FF4500", // Orange
    ];
    confettiPieces.value = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: "-20px",
      backgroundColor: colors[Math.floor(Math.random() * colors.length)]!,
      animationDelay: `${Math.random() * 2.5}s`,
      transform: `rotate(${Math.random() * 360}deg)`,
    }));
  },
  { immediate: true },
);
</script>

<template>
  <Transition name="bounce">
    <div
      v-if="show"
      class="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
    >
      <!-- Close area -->
      <div class="absolute inset-0" @click="close"></div>

      <!-- Popup Content -->
      <div
        class="relative w-full max-w-sm bg-white rounded-[50px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] border-8 border-white animate-pop-up"
      >
        <!-- Header with rarity gradient -->
        <div
          class="p-8 text-center bg-gradient-to-br"
          :class="
            badge ? rarityConfig[badge.rarity].bg : 'from-primary to-secondary'
          "
        >
          <div class="relative inline-block mb-4">
            <div
              class="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-[32px] flex items-center justify-center shadow-xl animate-float"
            >
              <Icon
                v-if="badge"
                :name="badge.icon"
                class="text-7xl text-white drop-shadow-lg"
              />
            </div>
            <!-- Sparkles -->
            <Icon
              name="fluent-emoji:sparkles"
              class="absolute -top-4 -right-4 text-4xl animate-pulse"
            />
          </div>

          <h2
            class="text-2xl font-black text-white tracking-widest uppercase mb-1 drop-shadow-md"
          >
            {{
              badge
                ? $t(`badge_unlock.rarity.${badge.rarity}`)
                : $t("badge_unlock.default_title")
            }}
          </h2>
          <h3
            class="text-4xl font-black text-white leading-tight drop-shadow-lg"
          >
            {{ $t("badge_unlock.new_badge") }}
          </h3>
        </div>

        <!-- Badge Details -->
        <div class="p-10 text-center flex flex-col items-center">
          <h4 class="text-3xl font-black text-text mb-4">
            {{ badge?.title }}
          </h4>
          <p
            class="text-lg font-bold text-text/60 italic mb-10 leading-relaxed"
          >
            "{{ badge?.description }}"
          </p>

          <button
            @click="close"
            class="w-full py-5 bg-text text-white text-2xl font-black rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
          >
            {{ $t("badge_unlock.got_it") }}
          </button>
        </div>

        <!-- Confetti -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            v-for="(piece, idx) in confettiPieces"
            :key="idx"
            class="absolute w-3 h-3 rounded-sm opacity-0 animate-confetti-fall"
            :style="piece"
          ></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.animate-pop-up {
  animation: popUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1.2) forwards;
}

@keyframes popUp {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-confetti-fall {
  animation: fall 3s linear infinite;
}

@keyframes fall {
  0% {
    transform: translateY(-50px) rotate(0deg);
    opacity: 1;
  }
  25% {
    transform: translateX(20px) rotate(90deg);
  }
  50% {
    transform: translateX(-20px) rotate(180deg);
  }
  75% {
    transform: translateX(10px) rotate(270deg);
  }
  100% {
    transform: translateY(600px) rotate(360deg);
    opacity: 0;
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-10px) rotate(3deg);
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
