<script setup lang="ts">
const { t } = useI18n();

const selectedStatus = ref<"all" | "earned" | "locked">("all");
const selectedRarity = ref<"all" | "common" | "rare" | "epic" | "legendary">(
  "all",
);

useHead({
  title: t("badges.title"),
});

useSeoMeta({
  title: t("badges.seo_title"),
  ogTitle: t("badges.seo_title"),
  description: t("badges.seo_desc"),
  ogDescription: t("badges.seo_og_desc"),
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
        :tag="$t('badges.page_hero.tag')"
        :titlePrimary="$t('badges.page_hero.title_primary')"
        :titleHighlight="$t('badges.page_hero.title_highlight')"
        :subtitle="$t('badges.page_hero.subtitle')"
        icon="fluent-emoji:military-medal"
        accentColor="primary"
      />

      <HeroAchievementStats />

      <HeroAchievementFilter
        v-model:status="selectedStatus"
        v-model:rarity="selectedRarity"
      />

      <HeroBadgeGallery :status="selectedStatus" :rarity="selectedRarity" />

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
