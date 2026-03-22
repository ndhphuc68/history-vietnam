<script setup lang="ts">
/**
 * Privacy Policy page.
 * Transparency for parents, safety for kids.
 */
const { t } = useI18n();

useHead({
  title: t("privacy_page.seo_title"),
});

useSeoMeta({
  title: t("privacy_page.seo_title"),
  ogTitle: t("privacy_page.seo_title"),
  description: t("privacy_page.seo_desc"),
  ogDescription: t("privacy_page.seo_og_desc"),
  ogImage: "/images/banner/banner.png",
});
</script>

<template>
  <div class="min-h-screen bg-background pt-28 pb-20 px-4 md:px-0">
    <div class="max-w-4xl mx-auto space-y-12">
      <!-- Header -->
      <div class="text-center space-y-4">
        <div
          class="inline-flex items-center justify-center w-24 h-24 bg-secondary rounded-3xl shadow-lg mb-4 transform rotate-6"
        >
          <Icon name="fluent-emoji:locked-with-key" class="text-5xl" />
        </div>
        <h1 class="text-4xl md:text-5xl font-black text-text tracking-tight">
          {{ $t("privacy_page.title") }}
          <span class="text-secondary">{{
            $t("privacy_page.title_highlight")
          }}</span>
        </h1>
        <p class="text-lg md:text-xl text-text/70 font-bold max-w-2xl mx-auto">
          {{ $t("privacy_page.subtitle") }}
        </p>
      </div>

      <!-- Content Sections -->
      <div class="grid grid-cols-1 gap-8">
        <!-- Safety Badge -->
        <div
          class="bg-gradient-to-r from-secondary to-text p-1 rounded-[40px] shadow-2xl"
        >
          <div
            class="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[38px] flex flex-col md:flex-row items-center gap-8"
          >
            <div
              class="w-32 h-32 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 animate-bounce-slow"
            >
              <Icon name="fluent-emoji:shield" class="text-6xl" />
            </div>
            <div class="space-y-4 text-center md:text-left">
              <h2 class="text-2xl font-black text-text">
                {{ $t("privacy_page.commitment") }}
              </h2>
              <p class="text-text/80 font-bold leading-relaxed italic">
                {{ $t("privacy_page.commitment_quote") }}
              </p>
            </div>
          </div>
        </div>

        <!-- Section 1 -->
        <div
          class="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[40px] shadow-xl border-t-8 border-secondary"
        >
          <div class="flex items-start gap-6">
            <div
              class="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center flex-shrink-0"
            >
              <Icon name="fluent-emoji:no-entry" class="text-3xl text-text" />
            </div>
            <div class="space-y-4">
              <h2 class="text-2xl font-black text-text">
                {{ $t("privacy_page.section_1_title") }}
              </h2>
              <p
                class="text-text/80 font-medium leading-relaxed"
                v-html="$t('privacy_page.section_1_desc')"
              ></p>
            </div>
          </div>
        </div>

        <!-- Section 2 -->
        <div
          class="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[40px] shadow-xl border-t-8 border-accent"
        >
          <div class="flex items-start gap-6">
            <div
              class="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0"
            >
              <Icon
                name="fluent-emoji:magnifying-glass-tilted-left"
                class="text-3xl text-amber-900"
              />
            </div>
            <div class="space-y-4">
              <h2 class="text-2xl font-black text-text">
                {{ $t("privacy_page.section_2_title") }}
              </h2>
              <p
                class="text-text/80 font-medium leading-relaxed"
                v-html="$t('privacy_page.section_2_desc')"
              ></p>
            </div>
          </div>
        </div>

        <!-- New Section: Rescue Code -->
        <div
          class="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[40px] shadow-xl border-t-8 border-blue-500"
        >
          <div class="flex items-start gap-6">
            <div
              class="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center flex-shrink-0"
            >
              <Icon name="fluent-emoji:key" class="text-3xl" />
            </div>
            <div class="space-y-4">
              <h2 class="text-2xl font-black text-text">
                {{ $t("privacy_page.section_3_title") }}
              </h2>
              <p
                class="text-text/80 font-medium leading-relaxed"
                v-html="$t('privacy_page.section_3_desc')"
              ></p>
            </div>
          </div>
        </div>

        <!-- Section 4 -->
        <div
          class="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[40px] shadow-xl border-t-8 border-primary"
        >
          <div class="flex items-start gap-6">
            <div
              class="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0"
            >
              <Icon name="fluent-emoji:link" class="text-3xl text-primary" />
            </div>
            <div class="space-y-4">
              <h2 class="text-2xl font-black text-text">
                {{ $t("privacy_page.section_4_title") }}
              </h2>
              <p
                class="text-text/80 font-medium leading-relaxed"
                v-html="$t('privacy_page.section_4_desc')"
              ></p>
            </div>
          </div>
        </div>

        <!-- Section 5 -->
        <div
          class="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[40px] shadow-xl border-t-8 border-text"
        >
          <div class="flex items-start gap-6">
            <div
              class="w-14 h-14 bg-text/20 rounded-2xl flex items-center justify-center flex-shrink-0"
            >
              <Icon
                name="fluent-emoji:family-man-woman-girl-boy"
                class="text-3xl text-text"
              />
            </div>
            <div class="space-y-4">
              <h2 class="text-2xl font-black text-text">
                {{ $t("privacy_page.section_5_title") }}
              </h2>
              <p
                class="text-text/80 font-medium leading-relaxed"
                v-html="$t('privacy_page.section_5_desc')"
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-bounce-slow {
  animation: bounce 3s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>
