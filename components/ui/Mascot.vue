<script setup lang="ts">
import { useMascotStore } from "~/stores/mascotStore";

const mascotStore = useMascotStore();
const showBubble = ref(true);
const mascotRef = ref<HTMLElement | null>(null);
const tilt = ref({ x: 0, y: 0 });

// Handle 3D tilt effect
const handleMouseMove = (e: MouseEvent) => {
  if (!mascotRef.value) return;
  const { left, top, width, height } = mascotRef.value.getBoundingClientRect();
  const centerX = left + width / 2;
  const centerY = top + height / 2;

  // Calculate relative mouse position (-1 to 1)
  const x = (e.clientX - centerX) / (window.innerWidth / 2);
  const y = (e.clientY - centerY) / (window.innerHeight / 2);

  tilt.value = {
    x: x * 20, // max 20 degrees
    y: -y * 20,
  };
};

const resetTilt = () => {
  tilt.value = { x: 0, y: 0 };
};

// Random idle messages
const idleMessages = [
  "Bạn có biết Việt Nam có hơn 4000 năm văn hiến không?",
  "Hãy đọc kỹ từng slide để tìm báu vật bí mật nhé!",
  "Đừng quên tra từ điển nếu gặp từ khó nhé!",
  "Học lịch sử thật là thú vị đúng không nào?",
  "Mình luôn ở đây để giúp đỡ bạn!",
];

const getRandomIdleMessage = () => {
  const msg = idleMessages[
    Math.floor(Math.random() * idleMessages.length)
  ] as string;
  mascotStore.say(msg, "idle", 6000);
};

// Auto-hide bubble after a long time of idle
let idleTimer: any = null;
watch(
  () => mascotStore.message,
  () => {
    showBubble.value = true;
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (mascotStore.mood === "idle") {
        showBubble.value = false;
      }
    }, 10000);
  },
);

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
  // Initial greeting
  setTimeout(() => {
    showBubble.value = true;
  }, 1000);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<template>
  <div
    v-if="mascotStore.isVisible"
    class="fixed bottom-4 right-4 z-[100] flex flex-col items-end pointer-events-none"
  >
    <!-- Speech Bubble -->
    <transition name="fade-pop">
      <div
        v-if="showBubble && mascotStore.message"
        class="mb-4 max-w-[200px] md:max-w-xs bg-white p-4 rounded-3xl shadow-2xl border-4 border-primary/20 relative pointer-events-auto cursor-pointer group"
        @click="showBubble = false"
      >
        <p class="text-sm md:text-base font-bold text-text leading-tight">
          {{ mascotStore.message }}
        </p>
        <!-- Triangle tail -->
        <div
          class="absolute bottom-[-16px] right-8 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-white"
        ></div>

        <!-- Close hint -->
        <div
          class="absolute -top-2 -right-2 bg-gray-200 text-gray-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Icon name="lucide:x" size="12" />
        </div>
      </div>
    </transition>

    <!-- Mascot Image / SVG -->
    <div
      ref="mascotRef"
      class="relative pointer-events-auto cursor-pointer transition-transform duration-300 ease-out"
      :style="{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${mascotStore.mood === 'happy' ? 1.1 : 1})`,
      }"
      @click="getRandomIdleMessage"
      @mouseleave="resetTilt"
    >
      <div
        class="w-24 h-24 md:w-40 md:h-40 drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative"
        :class="{
          'animate-bounce-subtle': mascotStore.mood === 'happy',
        }"
      >
        <!-- Animated SVG Mascot: Thần Kim Quy -->
        <svg
          viewBox="0 0 200 200"
          class="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Shadow for Turtle -->
          <ellipse cx="100" cy="170" rx="60" ry="15" fill="rgba(0,0,0,0.1)" />

          <!-- Body/Shell -->
          <g class="animate-breath origin-center">
            <path
              d="M40,120 Q100,20 160,120 L160,140 Q100,160 40,140 Z"
              fill="#D4AF37"
              stroke="#B8860B"
              stroke-width="5"
            />
            <!-- Shell Patterns -->
            <path
              d="M70,80 Q100,60 130,80 M60,105 Q100,90 140,105 M80,55 Q100,45 120,55"
              fill="none"
              stroke="#B8860B"
              stroke-width="3"
              opacity="0.4"
            />
          </g>

          <!-- Head Group -->
          <g class="animate-head origin-[140px_110px]">
            <!-- Neck -->
            <path
              d="M140,110 Q160,110 165,90"
              fill="#FFD700"
              stroke="#B8860B"
              stroke-width="3"
            />

            <!-- Head -->
            <circle
              cx="165"
              cy="80"
              r="28"
              fill="#FFD700"
              stroke="#B8860B"
              stroke-width="4"
            />

            <!-- Eyes -->
            <g class="animate-blink origin-center">
              <circle cx="155" cy="75" r="5" fill="#333" />
              <circle cx="175" cy="75" r="5" fill="#333" />
              <!-- Shine -->
              <circle cx="157" cy="72" r="1.5" fill="white" />
              <circle cx="177" cy="72" r="1.5" fill="white" />
            </g>

            <!-- Mouth -->
            <path
              d="M155,90 Q165,98 175,90"
              fill="none"
              stroke="#B8860B"
              stroke-width="3"
              stroke-linecap="round"
            />

            <!-- Scholars Hat (Legendary Figure) -->
            <rect x="150" y="52" width="30" height="8" rx="2" fill="#333" />
            <rect x="157" y="44" width="16" height="10" rx="1" fill="#333" />
            <circle cx="165" cy="44" r="2.5" fill="#FFD700" />
          </g>

          <!-- Legs -->
          <ellipse
            cx="60"
            cy="150"
            rx="15"
            ry="12"
            fill="#FFD700"
            stroke="#B8860B"
            stroke-width="3"
          />
          <ellipse
            cx="140"
            cy="150"
            rx="15"
            ry="12"
            fill="#FFD700"
            stroke="#B8860B"
            stroke-width="3"
          />
        </svg>
      </div>

      <!-- Dynamic Ground Shadow -->
      <div
        class="absolute -bottom-2 left-1/2 -track-shadow w-3/4 h-4 bg-black/10 blur-xl rounded-full -z-10 transition-transform duration-300"
        :style="{
          transform: `translateX(calc(-50% + ${-tilt.x}px)) scale(${1 + tilt.y / 100})`,
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
/* Animations */
.animate-breath {
  animation: breath 4s ease-in-out infinite;
}

.animate-head {
  animation: headMove 6s ease-in-out infinite;
}

.animate-blink {
  animation: blink 5s step-end infinite;
}

.animate-bounce-subtle {
  animation: bounceSubtle 1.5s ease-in-out infinite;
}

@keyframes breath {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02, 0.98);
  }
}

@keyframes headMove {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-3deg);
  }
}

@keyframes blink {
  0%,
  95%,
  100% {
    transform: scaleY(1);
  }
  97.5% {
    transform: scaleY(0.1);
  }
}

@keyframes bounceSubtle {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-15px) scale(1.05);
  }
}

/* Transitions */
.fade-pop-enter-active {
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.fade-pop-leave-active {
  animation: popOut 0.3s ease-in forwards;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.5) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes popOut {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.8) translateY(10px);
  }
}
</style>
