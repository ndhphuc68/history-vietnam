<script setup lang="ts">
// Gallery page for collecting hero cards
useHead({
  title: "Sổ tay Anh hùng",
});

useSeoMeta({
  title: "Sổ tay Anh hùng - Danh tướng Việt Nam",
  ogTitle: "Sổ tay Anh hùng - Danh tướng Việt Nam",
  description:
    "Gặp gỡ và tri ân những vị anh hùng dân tộc hào hùng trong lịch sử Việt Nam qua bộ sưu tập thẻ tướng sinh động.",
  ogDescription:
    "Bé đã mở khóa được bao nhiêu vị Anh hùng rồi? Khám phá ngay bộ sưu tập cá nhân!",
  ogImage: "/images/banner/banner.png",
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
        tag="Bộ sưu tập cá nhân"
        titlePrimary="Sổ Tay"
        titleHighlight="Anh Hùng"
        subtitle="Gặp gỡ những vị tướng tài ba và những anh hùng kiệt xuất đã viết nên những trang sử vàng chói lọi của dân tộc Việt Nam."
        icon="fluent-emoji:shield"
        accentColor="secondary"
      />
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
