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
  <div class="min-h-screen bg-background relative overflow-x-hidden">
    <!-- Decorative background -->
    <div
      class="fixed inset-0 pointer-events-none opacity-[0.18] gallery-paper-pattern"
    ></div>

    <div class="relative z-10 pt-20 pb-32">
      <HeroGalleryView />
    </div>
  </div>
</template>

<style scoped>
.gallery-paper-pattern {
  background-image:
    radial-gradient(rgba(26, 83, 92, 0.12) 1px, transparent 1px),
    radial-gradient(rgba(78, 205, 196, 0.12) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position:
    0 0,
    20px 20px;
}
</style>
