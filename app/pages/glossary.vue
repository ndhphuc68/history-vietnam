<script setup lang="ts">
import { useGlossary } from "~/composables/useGlossary";

const { t, locale } = useI18n();
const { glossary } = useGlossary();
const searchQuery = ref("");
const selectedCategory = ref(t("glossary.categories.all"));
const activeLetter = ref("");

useHead({
  title: t("glossary.title"),
});

useSeoMeta({
  title: t("glossary.seo_title"),
  ogTitle: t("glossary.seo_title"),
  description: t("glossary.seo_desc"),
  ogDescription: t("glossary.seo_og_desc"),
  ogImage: "/images/banner/banner.png",
});

const categories = computed(() => [
  t("glossary.categories.all"),
  t("glossary.categories.title"),
  t("glossary.categories.object"),
  t("glossary.categories.concept"),
  t("glossary.categories.location"),
  t("glossary.categories.period"),
]);

// Group filtered glossary by first letter
const groupedGlossary = computed(() => {
  const filtered = glossary.value.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory =
      selectedCategory.value === t("glossary.categories.all") ||
      item.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });

  const groups: Record<string, typeof filtered> = {};
  filtered
    .sort((a, b) => a.term.localeCompare(b.term, locale.value))
    .forEach((item) => {
      const firstLetter = item.term.charAt(0).toUpperCase();
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(item);
    });

  return groups;
});

const availableLetters = computed(() =>
  Object.keys(groupedGlossary.value).sort(),
);

const scrollToLetter = (letter: string) => {
  activeLetter.value = letter;
  const element = document.getElementById(`section-${letter}`);
  if (element) {
    const offset = 120; // Header offset
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

// Intersection Observer to update active letter on scroll
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeLetter.value = entry.target.id.replace("section-", "");
        }
      });
    },
    { threshold: 0.1, rootMargin: "-120px 0px -50% 0px" },
  );

  document.querySelectorAll("[id^='section-']").forEach((section) => {
    observer.observe(section);
  });
});
</script>

<template>
  <div class="min-h-screen pb-32 bg-background relative overflow-x-hidden">
    <!-- Decorative Pattern -->
    <div
      class="fixed inset-0 pointer-events-none opacity-[0.05] parchment-pattern z-0"
    ></div>

    <UiPageHero
      :title-primary="$t('glossary.page_hero.title_primary')"
      :title-highlight="$t('glossary.page_hero.title_highlight')"
      :subtitle="$t('glossary.page_hero.subtitle')"
      :tag="$t('glossary.page_hero.tag')"
      icon="fluent-emoji:books"
      accent-color="secondary"
    />

    <!-- Main Content Container -->
    <div class="max-w-7xl mx-auto px-4 md:px-8 -mt-8 relative z-20">
      <!-- Search & Category Filter (Fixed/Sticky for ease of use) -->
      <div
        class="sticky top-24 z-30 bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl p-4 md:p-6 mb-12 border-2 border-secondary/10 flex flex-col items-center gap-6"
      >
        <div class="flex flex-col md:flex-row w-full gap-4 items-center">
          <div class="relative flex-1 w-full group">
            <Icon
              name="fluent:search-24-filled"
              class="absolute left-5 top-1/2 -translate-y-1/2 text-text/30 text-2xl group-focus-within:text-secondary transition-colors"
            />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('glossary.search_placeholder')"
              class="w-full pl-14 pr-8 py-5 bg-background/50 rounded-2xl border-4 border-transparent focus:border-secondary focus:bg-white transition-all outline-none font-black text-xl text-text placeholder:text-text/20"
            />
          </div>

          <!-- Category Buttons in Search Bar for secondary filtering -->
          <div
            class="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar justify-center"
          >
            <button
              v-for="cat in categories"
              :key="cat"
              @click="selectedCategory = cat"
              class="px-6 py-2 rounded-2xl font-bold whitespace-nowrap transition-all duration-300 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]"
              :class="
                selectedCategory === cat
                  ? 'bg-secondary text-white scale-105'
                  : 'bg-white text-text hover:bg-secondary/5 border-2 border-transparent hover:shadow-md'
              "
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
        <!-- Sidebar: A-Z Index -->
        <GlossaryIndex
          v-if="availableLetters.length > 0"
          :available-letters="availableLetters"
          :active-letter="activeLetter"
          @select="scrollToLetter"
          class="lg:w-16 flex-shrink-0 z-20 sticky top-40"
        />

        <!-- Content Area -->
        <div class="flex-1 w-full space-y-24 lg:pl-8">
          <div v-if="Object.keys(groupedGlossary).length > 0">
            <div
              v-for="(items, letter) in groupedGlossary"
              :key="letter"
              :id="'section-' + letter"
              class="scroll-mt-32 mb-10"
            >
              <!-- Letter Header (Ancient Tablet Style) -->
              <div class="flex items-center gap-6 mb-10 group">
                <div
                  class="w-20 h-20 bg-text text-white rounded-3xl flex items-center justify-center text-5xl font-black shadow-2xl transform transition-transform group-hover:rotate-12"
                >
                  {{ letter }}
                </div>
                <div
                  class="flex-1 h-1 bg-gradient-to-r from-text/20 to-transparent rounded-full"
                ></div>
              </div>

              <!-- Grid of Terms -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <GlossaryCard
                  v-for="item in items"
                  :key="item.id"
                  :item="item"
                />
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-else
            class="text-center py-32 bg-white/50 backdrop-blur-md rounded-[60px] border-4 border-dashed border-text/10"
          >
            <div
              class="inline-flex items-center justify-center w-40 h-40 bg-background rounded-full mb-8 animate-bounce-slow"
            >
              <Icon
                name="fluent-emoji:magnifying-glass-tilted-left"
                class="text-8xl opacity-40"
              />
            </div>
            <h3 class="text-4xl font-black text-text/40 mb-4">
              {{ $t("glossary.empty.title") }}
            </h3>
            <p class="text-xl text-text/30 font-bold">
              {{ $t("glossary.empty.subtitle") }}
            </p>
            <button
              @click="
                searchQuery = '';
                selectedCategory = $t('glossary.categories.all');
              "
              class="mt-10 px-10 py-4 bg-secondary text-white font-black rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-xl"
            >
              {{ $t("glossary.empty.button") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.parchment-pattern {
  background-image: url("https://www.transparenttextures.com/patterns/parchment.png");
}

.animate-bounce-slow {
  animation: bounce 3s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-5%);
  }
  50% {
    transform: none;
  }
}
</style>
