<script setup lang="ts">
import mapData from "~/content/history-map.json";

// Metatags for the map page
useHead({
  title: "Bản đồ Tiến trình",
});

useSeoMeta({
  title: "Bản đồ Lịch sử Việt Nam - Hành trình 4000 năm",
  ogTitle: "Bản đồ Lịch sử Việt Nam - Hành trình 4000 năm",
  description:
    "Khám phá hành trình 4000 năm lịch sử Việt Nam qua bản đồ tương tác thú vị và trực quan.",
  ogDescription:
    "Theo dấu chân cha ông qua các thời kỳ lịch sử hào hùng trên bản đồ tri thức.",
  ogImage: "/images/banner/banner.png",
});
</script>

<template>
  <div class="min-h-screen relative bg-background font-sans overflow-x-hidden">
    <div class="relative z-10 max-w-screen-xl mx-auto px-4 pt-12 pb-32">
      <!-- Decorative Floating Blobs -->
      <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          class="absolute top-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse"
        ></div>
        <div
          class="absolute bottom-40 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"
          style="animation-delay: 2s"
        ></div>
        <div class="absolute inset-0 opacity-[0.08] map-grid-pattern"></div>
      </div>

      <!-- Main Content -->
      <div class="relative z-10 max-w-4xl mx-auto">
        <MapHistoryMap :eras="mapData.eras" />
      </div>

      <!-- Navigation Footer -->
      <div class="mt-24 text-center relative z-20">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-3 px-12 py-5 bg-white text-text font-black rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 text-xl border-4 border-text/5 group"
        >
          <Icon
            name="fluent-emoji:house"
            class="text-2xl group-hover:rotate-12 transition-transform"
          />
          QUAY VỀ TRANG CHỦ
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.min-h-screen {
  background: linear-gradient(
    180deg,
    var(--background) 0%,
    theme("colors.green.50") 100%
  );
}

.map-grid-pattern {
  background-image:
    linear-gradient(to right, var(--text-muted) 1px, transparent 1px),
    linear-gradient(to bottom, var(--text-muted) 1px, transparent 1px);
  background-size: 48px 48px;
}
</style>
