<script setup lang="ts">
import { useLetterStore } from "~/stores/letterStore";
import type { HeroLetter } from "~/types/history";

const letterStore = useLetterStore();
const selectedLetter = ref<HeroLetter | null>(null);
const isModalOpen = ref(false);

const { t } = useI18n();
const localePath = useLocalePath();

useHead({
  title: t("mailbox.title"),
});

useSeoMeta({
  title: t("mailbox.seo_title"),
  ogTitle: t("mailbox.seo_title"),
  description: t("mailbox.seo_desc"),
  ogDescription: t("mailbox.seo_desc"),
  ogImage: "/images/banner/banner.png",
});

const openLetter = (letter: HeroLetter) => {
  selectedLetter.value = letter;
  isModalOpen.value = true;
};

const closeLetter = () => {
  isModalOpen.value = false;
};

const collectedLetters = computed(() => {
  return letterStore.allLetters.filter((l) => letterStore.isCollected(l.id));
});

const uncollectedLetters = computed(() => {
  return letterStore.allLetters.filter((l) => !letterStore.isCollected(l.id));
});
</script>

<template>
  <div
    class="min-h-screen bg-background pt-10 pb-32 px-4 relative overflow-hidden"
  >
    <!-- Decorative background -->
    <div
      class="fixed inset-0 pointer-events-none opacity-[0.05] parchment-pattern"
    ></div>

    <div class="max-w-6xl mx-auto relative z-10">
      <UiPageHero
        :tag="$t('mailbox.page_hero.tag')"
        :titlePrimary="$t('mailbox.page_hero.title_primary')"
        :titleHighlight="$t('mailbox.page_hero.title_highlight')"
        :subtitle="$t('mailbox.page_hero.subtitle')"
        icon="fluent-emoji:envelope-with-arrow"
        accentColor="primary"
      />

      <!-- Empty State -->
      <div
        v-if="collectedLetters.length === 0"
        class="text-center py-20 bg-white/50 dark:bg-slate-800/50 rounded-[40px] border-4 border-dashed border-primary/20"
      >
        <Icon
          name="fluent-emoji:empty-mailbox"
          class="text-9xl mb-6 opacity-20"
        />
        <h3 class="text-2xl font-black text-text/40">
          {{ $t("mailbox.empty.title") }}
        </h3>
        <p class="text-text/30 font-bold mt-2">
          {{ $t("mailbox.empty.subtitle") }}
        </p>
        <NuxtLink
          :to="localePath('/lesson')"
          class="inline-block mt-8 btn-primary px-8 py-4"
          >{{ $t("mailbox.empty.button") }}</NuxtLink
        >
      </div>

      <!-- Collected Letters Grid -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
      >
        <div
          v-for="letter in collectedLetters"
          :key="letter.id"
          @click="openLetter(letter)"
          class="bg-[#fdf5e6] p-8 rounded-2xl shadow-xl border-t-8 border-primary hover:scale-105 transition-all cursor-pointer group relative overflow-hidden"
        >
          <div
            class="absolute top-4 right-4 text-4xl opacity-20 group-hover:scale-110 transition-transform"
          >
            <Icon :name="letter.icon" />
          </div>
          <h3 class="text-xl font-black text-text mb-4 font-serif italic">
            {{ letter.title }}
          </h3>
          <p class="text-text/70 line-clamp-3 font-serif italic mb-6">
            "{{ letter.content }}"
          </p>
          <div class="flex justify-between items-center mt-auto">
            <span
              class="text-xs font-black text-primary uppercase tracking-widest"
              >{{ letter.signature }}</span
            >
            <span class="text-[10px] font-bold opacity-40 italic">{{
              letter.date
            }}</span>
          </div>
        </div>
      </div>

      <!-- Uncollected Section -->
      <div v-if="uncollectedLetters.length > 0" class="mt-24">
        <h3 class="text-2xl font-black text-text/40 mb-8 flex items-center">
          <Icon name="fluent-emoji:lock" class="mr-3" />
          {{
            $t("mailbox.locked_header", { count: uncollectedLetters.length })
          }}
        </h3>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 opacity-40 grayscale"
        >
          <div
            v-for="letter in uncollectedLetters"
            :key="letter.id"
            class="aspect-[3/4] bg-white/20 dark:bg-slate-800/20 rounded-xl border-2 border-dashed border-text/10 dark:border-slate-700 flex flex-col items-center justify-center p-4 text-center group"
          >
            <Icon
              name="fluent-emoji:closed-mailbox-with-lowered-flag"
              class="text-4xl mb-2"
            />
            <span class="text-[10px] font-bold uppercase tracking-tighter">{{
              $t("mailbox.uncollected_from", { name: letter.signature })
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Re-reading Letter Modal -->
    <Transition name="letter-fade">
      <div
        v-if="isModalOpen && selectedLetter"
        class="fixed inset-0 z-[10001] flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-md"
          @click="closeLetter"
        ></div>

        <!-- Letter Content (Simplified version of the unlock modal) -->
        <div
          class="relative w-full max-w-2xl bg-[#fdf5e6] rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 md:p-12 overflow-hidden border-[16px] border-[#e6dcc8]"
        >
          <div
            class="absolute inset-0 opacity-10 pointer-events-none parchment-texture"
          ></div>

          <div
            class="absolute top-8 right-8 w-20 h-20 bg-primary rounded-full shadow-lg flex items-center justify-center border-4 border-primary/20 transform rotate-12 z-20"
          >
            <Icon :name="selectedLetter.icon" class="text-4xl text-white/80" />
          </div>

          <div class="relative z-10 font-serif text-text">
            <h2
              class="text-3xl font-black mb-8 border-b-2 border-primary/20 pb-4 text-center"
            >
              {{ selectedLetter.title }}
            </h2>

            <div class="text-xl leading-relaxed mb-10 italic">
              {{ selectedLetter.content }}
            </div>

            <div
              class="flex flex-col items-end mt-12 pt-8 border-t-2 border-primary/10"
            >
              <span class="text-2xl font-black text-primary mb-1">{{
                selectedLetter.signature
              }}</span>
              <span
                class="text-sm font-bold opacity-60 tracking-widest uppercase"
                >{{ selectedLetter.date }}</span
              >
            </div>

            <button
              @click="closeLetter"
              class="mt-12 w-full py-4 bg-primary text-white font-black rounded-xl hover:scale-[1.02] transition-all uppercase tracking-[0.2em]"
            >
              {{ $t("mailbox.close_button") }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.parchment-pattern {
  background-image: url("https://www.transparenttextures.com/patterns/parchment.png");
}
.parchment-texture {
  background-image: url("https://www.transparenttextures.com/patterns/parchment.png");
}

.letter-fade-enter-active,
.letter-fade-leave-active {
  transition: all 0.5s ease;
}
.letter-fade-enter-from,
.letter-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

h2,
h3,
.font-serif {
  font-family: "Times New Roman", Times, serif;
}
</style>
