<script setup lang="ts">
import mapData from '~/content/history-map.json';

// Metatags for the map page
useHead({
  title: 'Bản đồ Lịch sử Việt Nam - Lịch sử Nhí',
  meta: [
    { name: 'description', content: 'Khám phá hành trình 4000 năm lịch sử qua bản đồ tương tác thú vị.' }
  ]
});
</script>

<template>
  <div class="min-h-screen bg-[#F7FFF7] overflow-hidden">
    <div class="max-w-4xl mx-auto px-4 pt-16 pb-32">
      <!-- Map Header -->
      <div class="text-center mb-20 relative">
        <div class="inline-block px-6 py-2 bg-[#FFE66D] text-[#1A535C] font-black rounded-full mb-6 shadow-md transform -rotate-1">
          🗺️ HÀNH TRÌNH KHÁM PHÁ
        </div>
        <h1 class="text-4xl md:text-6xl font-black text-[#1A535C] mb-4">
          Bản Đồ Lịch Sử
        </h1>
        <p class="text-xl text-[#1A535C] opacity-75 max-w-lg mx-auto leading-relaxed">
          Từng bước chinh phục các cột mốc lịch sử hào hùng của dân tộc Việt Nam!
        </p>
        
        <!-- Decoration icons -->
        <span class="absolute top-0 left-0 text-6xl opacity-20 hidden md:block select-none">🕊️</span>
        <span class="absolute bottom-0 right-0 text-6xl opacity-20 hidden md:block select-none">🛶</span>
      </div>

      <!-- Interactive Map Section -->
      <div class="bg-white/50 rounded-[4rem] border-8 border-white shadow-inner p-8">
        <MapHistoryMap :eras="mapData.eras" />
      </div>

      <!-- Footer Help -->
      <div class="mt-20 text-center animate-bounce">
        <p class="text-[#1A535C] font-black text-xl italic opacity-60">
          Cuộn chuột để xem tiếp hành trình...
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Sky background effect */
.min-h-screen {
  background: 
    radial-gradient(circle at 10% 20%, rgba(78, 205, 196, 0.05) 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(255, 107, 107, 0.05) 0%, transparent 40%),
    #F7FFF7;
}
</style>
