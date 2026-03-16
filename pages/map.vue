<script setup lang="ts">
import mapData from "~/content/history-map.json";

// Metatags for the map page
useHead({
  title: "Bản đồ Lịch sử Việt Nam - Lịch sử Nhí",
  meta: [
    {
      name: "description",
      content:
        "Khám phá hành trình 4000 năm lịch sử qua bản đồ tương tác thú vị.",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen relative overflow-x-hidden">
    <!-- Premium Historical Background Layer -->
    <div
      class="fixed inset-0 pointer-events-none opacity-40 z-0 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')] bg-repeat"
    />
    <div
      class="fixed inset-0 pointer-events-none opacity-20 z-0 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] bg-repeat"
    />

    <div class="relative z-10 max-w-screen-xl mx-auto px-4 pt-20 pb-40">
      <!-- Map Header -->
      <div class="text-center mb-24 relative">
        <div
          class="inline-block px-8 py-3 bg-[#FFE66D] text-[#1A535C] font-black rounded-full mb-8 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform cursor-default border-4 border-white"
        >
          🗺️ HÀNH TRÌNH KHÁM PHÁ 🇻🇳
        </div>

        <h1
          class="text-5xl md:text-8xl font-black text-[#1A535C] mb-6 drop-shadow-sm"
        >
          Bản Đồ <span class="text-[#FF6B6B]">Lịch Sử</span>
        </h1>

        <p
          class="text-2xl text-[#1A535C] opacity-80 max-w-2xl mx-auto leading-relaxed font-bold"
        >
          Từng bước chinh phục các cột mốc lịch sử hào hùng cùng
          <span
            class="text-[#4ECDC4] underline decoration-wavy underline-offset-8"
            >Lịch Sử Nhí</span
          >
        </p>

        <!-- Decoration elements -->
        <div
          class="absolute -top-10 -left-20 text-9xl opacity-10 animate-pulse hidden lg:block"
        >
          🛶
        </div>
        <div
          class="absolute top-40 -right-20 text-9xl opacity-10 animate-float-slow hidden lg:block"
        >
          🏰
        </div>
      </div>

      <!-- Main Map Container (Soft Scroll Aesthetic) -->
      <div class="relative max-w-6xl mx-auto">
        <!-- Scroll Decorative Top Roller (Playful/Colorful) -->
        <div
          class="absolute -top-16 left-1/2 -translate-x-1/2 w-[105%] h-32 bg-gradient-to-r from-[#FF6B6B] via-[#FFE66D] to-[#FF6B6B] rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.1)] border-b-8 border-white flex items-center justify-between px-12 z-30"
        >
          <div
            class="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-inner"
          >
            <div class="w-12 h-12 rounded-full bg-[#FFE66D] animate-pulse" />
          </div>
          <div
            class="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-inner"
          >
            <div class="w-12 h-12 rounded-full bg-[#FFE66D] animate-pulse" />
          </div>
        </div>

        <!-- Scroll Content Body (Wavy Edges) -->
        <div
          class="relative bg-white overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.05)] z-20 border-x-4 border-dashed border-[#FFE66D]/30 shadow-inner"
        >
          <!-- Wavy Paper Edge Effect using SVG masks or clipped paths would be complex, so we'll use a CSS mask-image or decorative side overlays -->
          <div
            class="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"
          />
          <div
            class="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"
          />

          <div class="relative py-24 px-4 md:px-16 overflow-hidden">
            <!-- Soft texture -->
            <div
              class="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"
            />

            <MapHistoryMap :eras="mapData.eras" />
          </div>
        </div>

        <!-- Scroll Decorative Bottom Roller -->
        <div
          class="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[105%] h-32 bg-gradient-to-r from-[#4ECDC4] via-[#FFE66D] to-[#4ECDC4] rounded-full shadow-[0_-15px_40px_rgba(0,0,0,0.1)] border-t-8 border-white flex items-center justify-between px-12 z-30"
        >
          <div
            class="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-inner"
          >
            <div class="w-12 h-12 rounded-full bg-[#FFE66D] animate-pulse" />
          </div>
          <div
            class="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-inner"
          >
            <div class="w-12 h-12 rounded-full bg-[#FFE66D] animate-pulse" />
          </div>
        </div>
      </div>

      <!-- Scroll Indicator Footer -->
      <div class="mt-48 text-center relative z-10">
        <div class="inline-flex flex-col items-center gap-8">
          <p
            class="text-[#1A535C] font-black text-4xl italic tracking-tight opacity-60"
          >
            Khám phá tiếp nào... ✨
          </p>
          <div class="text-6xl animate-bounce">🛶</div>
        </div>
      </div>
    </div>

    <!-- Floating Background Elements (Pollen/Leaves/Birds) -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        v-for="i in 20"
        :key="i"
        class="absolute text-5xl opacity-30 animate-float-random"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 15 + 's',
          fontSize: 15 + Math.random() * 40 + 'px',
        }"
      >
        {{ ["🌸", "🍃", "✨", "🎋", "🦋", "🕊️"][i % 6] }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.min-h-screen {
  background-color: #fdfcf5; /* Natural cream background */
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0) rotate(5deg);
  }
  50% {
    transform: translateY(-20px) rotate(-5deg);
  }
}

@keyframes float-random {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.3;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translate(100px, -200px) rotate(20deg);
    opacity: 0;
  }
}

.animate-float-random {
  animation: float-random 20s linear infinite;
}
</style>
