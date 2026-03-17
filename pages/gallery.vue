<script setup lang="ts">
// Gallery page for collecting hero cards
useHead({
  title: "Bộ sưu tập Anh Hùng - Lịch sử Nhí",
  meta: [
    {
      name: "description",
      content: "Xem bộ sưu tập các vị anh hùng dân tộc mà bé đã thu thập được.",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-[#F7FFF7] relative overflow-x-hidden">
    <!-- Decorative background -->
    <div
      class="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"
    ></div>

    <div class="relative z-10 pt-20 pb-32">
      <HeroGalleryView />
    </div>
  </div>
</template>
