<script setup lang="ts">
/**
 * Terms of Service page.
 * Friendly, clear rules for children and parents.
 */
const { t } = useI18n();

useHead({
  title: t("terms_page.seo_title"),
});

useSeoMeta({
  title: t("terms_page.seo_title"),
  ogTitle: t("terms_page.seo_title"),
  description: t("terms_page.seo_desc"),
  ogDescription: t("terms_page.seo_og_desc"),
  ogImage: "/images/banner/banner.png",
});
</script>

<template>
  <div class="min-h-screen bg-background pt-28 pb-20 px-4 md:px-0">
    <div class="max-w-4xl mx-auto space-y-12">
      <!-- Header -->
      <div class="text-center space-y-4">
        <div
          class="inline-flex items-center justify-center w-24 h-24 bg-accent rounded-3xl shadow-lg mb-4 transform -rotate-6"
        >
          <Icon name="fluent-emoji:scroll" class="text-5xl" />
        </div>
        <h1 class="text-4xl md:text-5xl font-black text-text tracking-tight">
          {{ $t("terms_page.title") }}
          <span class="text-primary">{{
            $t("terms_page.title_highlight")
          }}</span>
        </h1>
        <p class="text-lg md:text-xl text-text/70 font-bold max-w-2xl mx-auto">
          {{ $t("terms_page.subtitle") }}
        </p>
      </div>

      <!-- Content Sections -->
      <div class="grid grid-cols-1 gap-8">
        <!-- Section 1 -->
        <div
          class="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[40px] shadow-xl border-b-8 border-accent transform hover:scale-[1.01] transition-transform"
        >
          <div class="flex items-start gap-6">
            <div
              class="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0"
            >
              <Icon
                name="fluent-emoji:sparkles"
                class="text-3xl text-amber-900"
              />
            </div>
            <div class="space-y-4">
              <h2 class="text-2xl font-black text-text">
                {{ $t("terms_page.section_1_title") }}
              </h2>
              <p
                class="text-text/80 font-medium leading-relaxed"
                v-html="$t('terms_page.section_1_desc')"
              ></p>
            </div>
          </div>
        </div>

        <!-- Section 2 -->
        <div
          class="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[40px] shadow-xl border-b-8 border-secondary transform hover:scale-[1.01] transition-transform"
        >
          <div class="flex items-start gap-6">
            <div
              class="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center flex-shrink-0"
            >
              <Icon name="fluent-emoji:shield" class="text-3xl text-text" />
            </div>
            <div class="space-y-4">
              <h2 class="text-2xl font-black text-text">
                {{ $t("terms_page.section_2_title") }}
              </h2>
              <p
                class="text-text/80 font-medium leading-relaxed"
                v-html="$t('terms_page.section_2_desc')"
              ></p>
            </div>
          </div>
        </div>

        <!-- Section 3 -->
        <div
          class="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[40px] shadow-xl border-b-8 border-primary transform hover:scale-[1.01] transition-transform"
        >
          <div class="flex items-start gap-6">
            <div
              class="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0"
            >
              <Icon name="fluent-emoji:key" class="text-3xl" />
            </div>
            <div class="space-y-4">
              <h2 class="text-2xl font-black text-text">
                {{ $t("terms_page.section_3_title") }}
              </h2>
              <p
                class="text-text/80 font-medium leading-relaxed"
                v-html="$t('terms_page.section_3_desc')"
              ></p>
            </div>
          </div>
        </div>

        <!-- Section 4 -->
        <div
          class="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[40px] shadow-xl border-b-8 border-text transform hover:scale-[1.01] transition-transform"
        >
          <div class="flex items-start gap-6">
            <div
              class="w-14 h-14 bg-text/20 rounded-2xl flex items-center justify-center flex-shrink-0"
            >
              <Icon name="fluent-emoji:rocket" class="text-3xl text-text" />
            </div>
            <div class="space-y-4">
              <h2 class="text-2xl font-black text-text">
                {{ $t("terms_page.section_4_title") }}
              </h2>
              <p
                class="text-text/80 font-medium leading-relaxed"
                v-html="$t('terms_page.section_4_desc')"
              ></p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Note -->
      <div
        class="text-center p-8 bg-text/5 rounded-[30px] border-2 border-dashed border-text/20"
      >
        <p class="text-text/60 font-bold italic">
          {{ $t("terms_page.footer_note") }}
        </p>
      </div>
    </div>
  </div>
</template>
