<script setup lang="ts">
import { useProgressStore } from "~/stores/progressStore";
import { useHistoryStore } from "~/stores/historyStore";

const { t } = useI18n();
const localePath = useLocalePath();

const progressStore = useProgressStore();
const historyStore = useHistoryStore();

const startJourneyLink = computed(() => {
  if (!historyStore.eras || historyStore.eras.length === 0) {
    return localePath("/lesson");
  }

  // Find first uncompleted era
  for (const era of historyStore.eras) {
    const isCompleted = era.levels.every((l: any) =>
      progressStore.completedLessons.includes(l.lesson),
    );
    if (!isCompleted) {
      return localePath(`/lesson/${era.id}`);
    }
  }

  return localePath("/lesson");
});

// Landing page for the Vietnamese History Learning App
useHead({
  title: t("hero.title_main"),
});

const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;

useSeoMeta({
  title: t("hero.title_main") + " - " + t("hero.title_sub"),
  ogTitle: t("hero.title_main") + " - " + t("hero.title_sub"),
  description: t("hero.description"),
  ogDescription: t("hero.description"),
  ogImage: "/images/banner/banner.png",
  twitterCard: "summary_large_image",
});

const homeStructuredData = computed(() => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Lịch sử Việt Nam cho Bé",
  description: t("hero.description"),
  url: siteUrl,
}));
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- SEO Structured Data -->
    <SeoStructuredData type="WebSite" :data="homeStructuredData" />

    <!-- Hero Section -->
    <section
      class="relative pt-20 pb-32 flex flex-col items-center text-center px-4"
    >
      <div
        class="absolute inset-0 -z-10 bg-gradient-to-b from-background to-white dark:to-slate-950"
      />

      <div
        class="inline-block px-4 py-1 mb-6 bg-accent text-text font-bold rounded-full text-sm uppercase tracking-wider transform -rotate-2"
      >
        <Icon name="fluent-emoji:house" class="mr-2 text-xl" />
        {{ $t("hero.subtitle") }}
      </div>

      <h1
        class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-text leading-[1.1] md:leading-tight mb-8"
      >
        {{ $t("hero.title_main") }} <br />
        <span class="text-primary relative inline-block mt-2">
          {{ $t("hero.title_sub") }}
          <svg
            class="absolute -bottom-2 left-0 w-full"
            viewBox="0 0 300 12"
            fill="none"
          >
            <path
              d="M1 11C60 4 120 1 180 1C240 1 300 11 300 11"
              stroke="var(--primary)"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>
        </span>
      </h1>

      <p
        class="text-base sm:text-lg md:text-2xl text-text opacity-80 max-w-2xl mb-12 px-2"
      >
        {{ $t("hero.description") }}
      </p>

      <div
        class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 sm:px-0"
      >
        <NuxtLink
          :to="startJourneyLink"
          class="btn-primary text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 ring-offset-2 ring-primary focus:ring-4"
        >
          {{ $t("hero.start_journey") }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/gallery')"
          class="bg-white dark:bg-slate-800 border-4 border-secondary text-secondary dark:text-secondary-light text-lg md:text-xl font-bold px-8 md:px-12 py-4 md:py-5 rounded-full hover:bg-secondary hover:text-white transition-all shadow-lg flex items-center justify-center"
        >
          {{ $t("nav.collection") }}
        </NuxtLink>
      </div>

      <!-- Hero Image -->
      <div
        class="mt-16 md:mt-20 w-full max-w-[1600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-[8px] md:border-[16px] border-white dark:border-slate-800 transform hover:scale-[1.005] transition-all duration-700 ease-out cursor-pointer group px-0"
      >
        <UiLazyImage
          src="/images/banner/banner.png"
          :alt="$t('lesson_hero.banner_alt')"
          class="w-full h-auto object-cover group-hover:brightness-105 transition-all duration-700"
          loading="eager"
        />
      </div>
    </section>

    <!-- Daily Fact Section -->
    <UiDailyFactCard />

    <!-- Feature Section -->
    <section class="relative py-32 bg-background/50">
      <!-- Decorative Background Elements -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          class="absolute top-1/2 left-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]"
        ></div>
        <div
          class="absolute bottom-0 right-[-10%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[100px]"
        ></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div class="text-center mb-16 md:mb-20 animate-fade-in px-4">
          <h2 class="text-3xl md:text-5xl font-black text-text mb-4">
            {{ $t("features.title") }}
          </h2>
          <div class="h-2 w-24 bg-primary rounded-full mx-auto"></div>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-16"
        >
          <!-- Card 1 -->
          <div
            class="group bg-white dark:bg-slate-800 rounded-[40px] md:rounded-[50px] p-6 md:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border-b-[12px] border-accent hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] hover:-translate-y-4 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
          >
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"
            ></div>

            <div
              class="w-28 h-28 bg-accent/20 rounded-[35%] flex items-center justify-center mb-6 relative group-hover:rotate-12 transition-transform duration-500"
            >
              <span
                class="absolute inset-0 bg-accent/10 blur-xl rounded-full scale-75 animate-pulse"
              ></span>
              <Icon
                name="fluent-emoji:open-book"
                class="text-6xl animate-float relative z-10"
              />
            </div>

            <h3 class="text-2xl md:text-3xl font-black text-text mb-4">
              {{ $t("features.storytelling.title") }}
            </h3>
            <p class="text-lg text-text/70 font-medium leading-relaxed">
              {{ $t("features.storytelling.desc") }}
            </p>
          </div>

          <!-- Card 2 -->
          <div
            class="group bg-white dark:bg-slate-800 rounded-[40px] md:rounded-[50px] p-6 md:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border-b-[12px] border-secondary hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] hover:-translate-y-4 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
            style="transition-delay: 100ms"
          >
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"
            ></div>

            <div
              class="w-28 h-28 bg-secondary/20 rounded-[35%] flex items-center justify-center mb-6 relative group-hover:-rotate-12 transition-transform duration-500"
            >
              <span
                class="absolute inset-0 bg-secondary/10 blur-xl rounded-full scale-75 animate-pulse"
              ></span>
              <Icon
                name="fluent-emoji:video-game"
                class="text-6xl animate-float-delayed relative z-10"
              />
            </div>

            <h3 class="text-2xl md:text-3xl font-black text-text mb-4">
              {{ $t("features.quiz.title") }}
            </h3>
            <p class="text-lg text-text/70 font-medium leading-relaxed">
              {{ $t("features.quiz.desc") }}
            </p>
          </div>

          <!-- Card 3 -->
          <div
            class="group sm:col-span-2 lg:col-span-1 bg-white dark:bg-slate-800 rounded-[40px] md:rounded-[50px] p-6 md:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border-b-[12px] border-primary hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] hover:-translate-y-4 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
            style="transition-delay: 200ms"
          >
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"
            ></div>

            <div
              class="w-28 h-28 bg-primary/20 rounded-[35%] flex items-center justify-center mb-6 relative group-hover:rotate-12 transition-transform duration-500"
            >
              <span
                class="absolute inset-0 bg-primary/10 blur-xl rounded-full scale-75 animate-pulse"
              ></span>
              <Icon
                name="fluent-emoji:shield"
                class="text-6xl animate-float relative z-10"
              />
            </div>

            <h3 class="text-2xl md:text-3xl font-black text-text mb-4">
              {{ $t("features.heroes.title") }}
            </h3>
            <p class="text-lg text-text/70 font-medium leading-relaxed">
              {{ $t("features.heroes.desc") }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 4s ease-in-out infinite;
  animation-delay: 1s;
}

@keyframes float {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn 1s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
