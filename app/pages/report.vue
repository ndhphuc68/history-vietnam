<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

useHead({
  title: t("report_page.seo_title"),
});

useSeoMeta({
  title: t("report_page.seo_title"),
  ogTitle: t("report_page.seo_title"),
  description: t("report_page.seo_desc"),
  ogDescription: t("report_page.seo_og_desc"),
  ogImage: "/images/banner/banner.png",
});

const route = useRoute();

const subject = computed(() => {
  const path = typeof route.fullPath === "string" ? route.fullPath : "/";
  return t("report_page.email_subject", { path });
});

const body = computed(() => {
  return t("report_page.email_body");
});

const mailtoHref = computed(() => {
  // TODO: thay email của bạn ở đây khi publish
  const to = "phucndh@example.com";
  return `mailto:${to}?subject=${encodeURIComponent(
    subject.value,
  )}&body=${encodeURIComponent(body.value)}`;
});
</script>

<template>
  <div class="min-h-screen bg-background pt-28 pb-20 px-4 md:px-0">
    <div class="max-w-3xl mx-auto space-y-10">
      <div class="text-center space-y-4">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-3xl shadow-lg mb-4 transform rotate-3"
        >
          <Icon name="fluent-emoji:wrench" class="text-4xl" />
        </div>
        <h1 class="text-4xl md:text-5xl font-black text-text tracking-tight">
          {{ $t("report_page.title") }}
          <span class="text-primary">{{
            $t("report_page.title_highlight")
          }}</span>
        </h1>
        <p class="text-lg md:text-xl text-text/70 font-bold">
          {{ $t("report_page.subtitle") }}
        </p>
      </div>

      <div
        class="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border-t-8 border-primary"
      >
        <div class="space-y-6">
          <div class="space-y-2">
            <h2 class="text-2xl font-black text-text">
              {{ $t("report_page.guide_title") }}
            </h2>
            <ul class="list-disc pl-6 text-text/80 font-medium leading-relaxed">
              <li>{{ $t("report_page.tip_1") }}</li>
              <li>{{ $t("report_page.tip_2") }}</li>
              <li>{{ $t("report_page.tip_3") }}</li>
            </ul>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <a
              :href="mailtoHref"
              class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary text-white font-black rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              {{ $t("report_page.button") }}
              <Icon name="fluent-emoji:envelope" class="text-xl" />
            </a>
            <NuxtLink
              :to="localePath('/')"
              class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-text font-black rounded-2xl shadow-lg border-2 border-text/10 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              {{ $t("report_page.back_home") }}
              <Icon name="fluent-emoji:house" class="text-xl" />
            </NuxtLink>
          </div>

          <p class="text-xs text-text/50 font-bold italic">
            {{ $t("report_page.note") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
