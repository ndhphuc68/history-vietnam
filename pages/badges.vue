<script setup lang="ts">
// Badges page for achievements
useHead({
  title: "Huy Hiệu Dũng Sĩ - Lịch sử Nhí",
  meta: [
    {
      name: "description",
      content:
        "Xem các huy hiệu danh giá mà bé đã đạt được trong hành trình khám phá lịch sử.",
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

    <div class="relative z-10 pt-10 pb-32">
      <UiPageHero
        tag="Thành tựu danh giá"
        titlePrimary="Hồ Sơ"
        titleHighlight="Dũng Sĩ"
        subtitle="Mỗi huy hiệu và báu vật là một minh chứng cho sự chăm chỉ và lòng yêu nước của bé trên hành trình khám phá 4000 năm lịch sử."
        icon="fluent-emoji:military-medal"
        accentColor="primary"
      />
      <HeroBadgeGallery />
      <HeroArtifactGallery />
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
