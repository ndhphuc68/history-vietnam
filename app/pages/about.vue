<script setup lang="ts">
/**
 * About page explaining the mission and meaning of the project.
 */
const { t } = useI18n();
const localePath = useLocalePath();

useHead({
  title: t("about.title"),
});

useSeoMeta({
  title: t("about.seo_title"),
  ogTitle: t("about.seo_title"),
  description: t("about.seo_desc"),
  ogDescription: t("about.seo_og_desc"),
  ogImage: "/images/about/mission.png",
});

const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;
</script>

<template>
  <div class="min-h-screen bg-background relative overflow-hidden">
    <!-- Decorative Background Shapes -->
    <div class="absolute inset-0 pointer-events-none opacity-20">
      <div
        class="absolute top-[10%] right-[10%] w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-[20%] left-[5%] w-72 h-72 bg-secondary rounded-full blur-3xl"
      ></div>
    </div>

    <!-- Hero Section -->
    <section class="relative pt-32 pb-20 px-4 text-center">
      <div class="max-w-4xl mx-auto animate-fade-in">
        <div
          class="inline-block px-6 py-2 mb-8 bg-accent text-text font-black rounded-full text-lg shadow-sm border-2 border-white transform -rotate-1"
        >
          <Icon name="fluent-emoji:seedling" class="mr-2" />
          {{ $t("about.hero.tag") }}
        </div>
        <h1
          class="text-5xl md:text-7xl font-black text-text mb-8 leading-tight drop-shadow-sm"
        >
          {{ $t("about.hero.title_primary") }} <br />
          <span class="text-primary">{{
            $t("about.hero.title_highlight")
          }}</span>
        </h1>
        <p
          class="text-xl md:text-2xl text-text font-medium leading-relaxed max-w-3xl mx-auto opacity-90"
        >
          {{ $t("about.hero.subtitle") }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="max-w-6xl mx-auto px-4 pb-32">
      <div class="grid md:grid-cols-2 gap-16 items-center mb-32">
        <div class="animate-slide-up">
          <h2 class="text-4xl font-black text-text mb-6">
            {{ $t("about.mission.title") }}
          </h2>
          <div
            class="space-y-6 text-lg text-gray-700 leading-relaxed font-medium"
          >
            <p>
              {{ $t("about.mission.p1") }}
            </p>
            <p>
              {{ $t("about.mission.p2") }}
            </p>
          </div>
        </div>
        <div
          class="relative group animate-fade-in"
          style="animation-delay: 200ms"
        >
          <div
            class="absolute inset-0 bg-primary rounded-[50px] rotate-3 group-hover:rotate-1 transition-transform duration-500"
          ></div>
          <div
            class="relative bg-white dark:bg-slate-800 p-2 rounded-[50px] shadow-2xl border-8 border-white dark:border-slate-800 overflow-hidden aspect-square flex items-center justify-center"
          >
            <UiLazyImage
              src="/images/about/mission.png"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Vietnamese Pride & History Illustration"
            />
          </div>
        </div>
      </div>

      <!-- Values Grid -->
      <div class="grid md:grid-cols-3 gap-8">
        <div
          class="bg-white dark:bg-slate-800 p-10 rounded-[40px] shadow-xl border-t-8 border-secondary hover:scale-[1.02] transition-all"
        >
          <div class="text-5xl mb-6">
            <Icon name="fluent-emoji:open-book" />
          </div>
          <h3 class="text-2xl font-black text-text mb-4">
            {{ $t("about.values.storytelling.title") }}
          </h3>
          <p class="font-medium text-gray-600">
            {{ $t("about.values.storytelling.desc") }}
          </p>
        </div>

        <div
          class="bg-white dark:bg-slate-800 p-10 rounded-[40px] shadow-xl border-t-8 border-accent hover:scale-[1.02] transition-all"
        >
          <div class="text-5xl mb-6">
            <Icon name="fluent-emoji:artist-palette" />
          </div>
          <h3 class="text-2xl font-black text-text mb-4">
            {{ $t("about.values.visuals.title") }}
          </h3>
          <p class="font-medium text-gray-600">
            {{ $t("about.values.visuals.desc") }}
          </p>
        </div>

        <div
          class="bg-white dark:bg-slate-800 p-10 rounded-[40px] shadow-xl border-t-8 border-primary hover:scale-[1.02] transition-all"
        >
          <div class="text-5xl mb-6">
            <Icon name="fluent-emoji:shield" />
          </div>
          <h3 class="text-2xl font-black text-text mb-4">
            {{ $t("about.values.truth.title") }}
          </h3>
          <p class="font-medium text-gray-600">
            {{ $t("about.values.truth.desc") }}
          </p>
        </div>
      </div>

      <!-- Proverbs Section -->
      <div class="mt-24 mb-12 text-center animate-fade-in">
        <h2
          class="text-3xl md:text-4xl font-black text-text mb-12 relative inline-block"
        >
          {{ $t("about.proverbs.title") }}
          <div
            class="absolute -bottom-4 left-0 w-full h-2 bg-accent rounded-full opacity-50"
          ></div>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <!-- Quote 1 -->
          <div
            class="bg-orange-50/50 dark:bg-orange-950/20 p-8 rounded-[30px] border-l-8 border-primary shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            <span class="text-4xl opacity-50">“</span>
            <p
              class="text-xl font-bold text-text leading-relaxed italic whitespace-pre-line"
            >
              {{ $t("about.proverbs.q1") }}
            </p>
          </div>

          <!-- Quote 2 -->
          <div
            class="bg-teal-50 dark:bg-teal-950/20 p-8 rounded-[30px] border-l-8 border-secondary shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            <span class="text-4xl opacity-50">“</span>
            <p
              class="text-xl font-bold text-text leading-relaxed italic whitespace-pre-line"
            >
              {{ $t("about.proverbs.q2") }}
            </p>
          </div>

          <!-- Quote 3 -->
          <div
            class="bg-yellow-50 dark:bg-yellow-950/20 p-8 rounded-[30px] border-l-8 border-accent shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            <span class="text-4xl opacity-50">“</span>
            <p
              class="text-xl font-bold text-text leading-relaxed italic whitespace-pre-line"
            >
              {{ $t("about.proverbs.q3") }}
            </p>
          </div>

          <!-- Quote 4 -->
          <div
            class="bg-pink-50 dark:bg-pink-950/20 p-8 rounded-[30px] border-l-8 border-pink-500 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            <span class="text-4xl opacity-50">“</span>
            <p
              class="text-xl font-bold text-text leading-relaxed italic whitespace-pre-line"
            >
              {{ $t("about.proverbs.q4") }}
            </p>
          </div>
        </div>
      </div>

      <!-- Developer Section -->
      <div
        class="mt-24 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-[50px] p-8 md:p-12 border-4 border-dashed border-text/10 animate-slide-up"
      >
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="flex-1">
            <h2
              class="text-3xl font-black text-text mb-6 flex items-center gap-3"
            >
              <Icon name="fluent-emoji:rocket" />
              {{ $t("about.developer.title") }}
            </h2>
            <div class="space-y-4 text-gray-700 font-medium leading-relaxed">
              <p>
                {{ $t("about.developer.p1") }}
              </p>
              <p>
                {{ $t("about.developer.p2") }}
              </p>
              <div
                class="p-6 bg-primary/10 rounded-3xl border-2 border-primary/20"
              >
                <p class="text-primary font-black italic">
                  "{{ $t("about.developer.quote") }}"
                </p>
              </div>
            </div>
          </div>
          <div
            class="w-32 h-32 md:w-48 md:h-48 bg-secondary rounded-full flex items-center justify-center shadow-inner animate-pulse overflow-hidden border-4 border-white dark:border-slate-800"
          >
            <UiLazyImage
              src="https://avatars.githubusercontent.com/u/56473628?s=400&u=2dcf6cce3f2b30203a1dbf669dd7c4175bbecb77&v=4"
              alt="PhucNDH Avatar"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <!-- Final Message -->
      <div
        class="mt-32 bg-slate-900 dark:bg-slate-950 rounded-[60px] p-12 md:p-20 text-center text-white relative overflow-hidden group"
      >
        <!-- Decoration -->
        <div
          class="absolute -top-20 -right-20 w-64 h-64 bg-white opacity-5 rounded-full group-hover:scale-110 transition-transform duration-700"
        ></div>
        <div
          class="absolute -bottom-20 -left-20 w-64 h-64 bg-primary opacity-10 rounded-full group-hover:scale-110 transition-transform duration-700"
        ></div>

        <h2 class="text-4xl md:text-5xl font-black mb-8 relative z-10">
          {{ $t("about.final.title") }}
        </h2>
        <div
          class="flex flex-col sm:flex-row gap-6 justify-center relative z-10"
        >
          <NuxtLink
            :to="localePath('/map')"
            class="px-12 py-5 bg-primary text-white font-black text-xl rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            {{ $t("about.final.explore_map") }}
            <Icon name="fluent-emoji:world-map" class="ml-2" />
          </NuxtLink>
          <NuxtLink
            :to="localePath('/lesson')"
            class="px-12 py-5 bg-white dark:bg-slate-800 text-text dark:text-gray-100 font-black text-xl rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            {{ $t("about.final.lesson_list") }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slideUp 0.8s ease-out forwards;
  animation-delay: 300ms;
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

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
