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
  <div class="min-h-screen relative bg-[#F7FFF7] font-sans overflow-x-hidden">
    <!-- Soft Decorative Background Texture -->
    <div
      class="fixed inset-0 pointer-events-none opacity-20 z-0 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] bg-repeat"
    />
    <!-- Subtle Dot Grid -->
    <div
      class="fixed inset-0 pointer-events-none opacity-10 z-0 bg-[url('https://www.transparenttextures.com/patterns/p6.png')] bg-repeat"
    />

    <div class="relative z-10 max-w-screen-xl mx-auto px-4 pt-12 pb-32">
      <!-- Main Content -->
      <div class="max-w-4xl mx-auto">
        <MapHistoryMap :eras="mapData.eras" />
      </div>

      <!-- Navigation Footer -->
      <div class="mt-24 text-center">
        <button
          class="inline-flex items-center gap-2 px-10 py-4 bg-[#FF6B6B] text-white font-black rounded-full shadow-xl hover:scale-[1.05] active:scale-[0.95] transition-transform duration-300 text-xl"
        >
          TIẾP TỤC HÀNH TRÌNH
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.min-h-screen {
  background: linear-gradient(180deg, #f7fff7 0%, #edf7ed 100%);
}
</style>
