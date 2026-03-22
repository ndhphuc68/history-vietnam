<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const historyData = useHistoryData();

const mapData = computed(() => ({
  eras: historyData.allEras.value,
}));

useHead({
  title: t("map.title"),
});

useSeoMeta({
  title: t("map.seo_title"),
  ogTitle: t("map.seo_title"),
  description: t("map.seo_desc"),
  ogDescription: t("map.seo_og_desc"),
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
      <h3 class="text-2xl font-black text-text mb-2">
        {{ $t("hero_gallery.motivation.title") }}
      </h3>
      <p class="text-text/70 font-medium">
        {{ $t("hero_gallery.motivation.subtitle") }}
      </p>
      <NuxtLink
        :to="localePath('/lesson')"
        class="mt-8 inline-block px-6 sm:px-10 py-3 sm:py-4 bg-secondary text-white font-black rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-base sm:text-lg uppercase"
      >
        {{ $t("hero_gallery.motivation.button") }}
      </NuxtLink>
      <div class="relative z-10 max-w-4xl mx-auto">
        <MapHistoryMap :eras="mapData.eras" />
      </div>

      <!-- Navigation Footer -->
      <div class="mt-24 text-center relative z-20">
        <NuxtLink
          :to="localePath('/')"
          class="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-12 py-3 sm:py-5 bg-white dark:bg-slate-800 text-text dark:text-gray-100 font-black rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 text-lg sm:text-xl border-4 border-text/5 dark:border-slate-700 group"
        >
          <Icon
            name="fluent-emoji:house"
            class="text-2xl group-hover:rotate-12 transition-transform"
          />
          {{ $t("map.back_home") }}
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
