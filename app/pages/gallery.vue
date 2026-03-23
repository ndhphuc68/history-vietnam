<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: t("gallery.title"),
});

useSeoMeta({
  title: t("gallery.seo_title"),
  ogTitle: t("gallery.seo_title"),
  description: t("gallery.seo_desc"),
  ogDescription: t("gallery.seo_og_desc"),
  ogImage: "/images/banner/banner.png",
});

const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;
</script>

<template>
  <div class="min-h-screen bg-background relative overflow-x-hidden">
    <!-- Decorative background -->
    <div
      class="fixed inset-0 pointer-events-none opacity-[0.18] gallery-paper-pattern"
    ></div>

    <div class="relative z-10 pt-10 pb-32">
      <UiPageHero
        :tag="$t('gallery.page_hero.tag')"
        :titlePrimary="$t('gallery.page_hero.title_primary')"
        :titleHighlight="$t('gallery.page_hero.title_highlight')"
        :subtitle="$t('gallery.page_hero.subtitle')"
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
