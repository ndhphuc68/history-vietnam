<script setup lang="ts">
import heroesData from "~/content/heroes.json";
import { useHeroStore } from "~/stores/heroStore";
import { useHistoryData } from "~/composables/useHistoryData";

const heroStore = useHeroStore();
const historyData = useHistoryData();
const selectedHero = ref<any>(null);
const showModal = ref(false);

const enabledEraIds = computed(() => historyData.eras.value.map((e) => e.id));

const heroes = computed(() => {
  return (heroesData as any[]).filter((hero) =>
    enabledEraIds.value.includes(hero.era),
  );
});

const openDetail = (hero: any) => {
  selectedHero.value = hero;
  showModal.value = true;
};
</script>

<template>
  <div class="w-full max-w-7xl mx-auto px-4">
    <!-- Stats Header (Keep for motivation) -->
    <div
      class="flex items-center justify-center gap-12 mb-16 px-4 py-8 bg-white/40 backdrop-blur-sm rounded-[40px] border-2 border-dashed border-primary/20 max-w-2xl mx-auto"
    >
      <div class="flex flex-col items-center">
        <span class="text-4xl font-black text-primary">
          {{ heroStore.totalUnlocked }}
        </span>
        <span
          class="text-xs font-black text-text/60 uppercase tracking-widest mt-1"
        >
          Lệnh bài đã mở
        </span>
      </div>
      <div class="h-12 w-px bg-primary/10"></div>
      <div class="flex flex-col items-center">
        <span class="text-4xl font-black text-secondary/30">
          {{ heroes.length }}
        </span>
        <span
          class="text-xs font-black text-text/60 uppercase tracking-widest mt-1"
        >
          Tổng số thần tướng
        </span>
      </div>
    </div>

    <!-- Grid: Reduced columns to make cards larger -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16"
    >
      <HeroCard
        v-for="hero in heroes"
        :key="hero.id"
        :hero="hero"
        :is-unlocked="heroStore.isUnlocked(hero.id)"
        @show-detail="openDetail"
      />
    </div>

    <!-- Hero Detail Modal -->
    <HeroDetailModal
      :hero="selectedHero"
      :show="showModal"
      @close="showModal = false"
    />

    <!-- Empty State / Motivation -->
    <div
      v-if="heroStore.totalUnlocked < heroes.length"
      class="mt-20 p-10 bg-white rounded-[40px] border-4 border-dashed border-accent text-center"
    >
      <Icon
        name="fluent-emoji:magnifying-glass-tilted-left"
        class="text-5xl mb-4 animate-pulse"
      />
      <h3 class="text-2xl font-black text-text mb-2">
        Vẫn còn nhiều anh hùng đang chờ bé!
      </h3>
      <p class="text-text/70 font-medium">
        Hãy học thêm các bài học mới để hoàn thành bộ sưu tập nhé.
      </p>
      <NuxtLink
        to="/lesson"
        class="mt-8 inline-block px-10 py-4 bg-secondary text-white font-black rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-lg uppercase"
      >
        Quay lại Bài học
      </NuxtLink>
    </div>
  </div>
</template>
