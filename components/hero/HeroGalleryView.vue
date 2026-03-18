<script setup lang="ts">
import heroesData from "~/content/heroes.json";
import { useHeroStore } from "~/stores/heroStore";

const heroStore = useHeroStore();
const selectedHero = ref<any>(null);
const showModal = ref(false);

const heroes = computed(() => heroesData);

const openDetail = (hero: any) => {
  selectedHero.value = hero;
  showModal.value = true;
};
</script>

<template>
  <div class="w-full max-w-7xl mx-auto px-4 py-12">
    <!-- Header -->
    <div class="text-center mb-16">
      <div
        class="inline-block px-4 py-1 mb-4 bg-accent text-text font-bold rounded-full text-sm uppercase tracking-2 transform -rotate-2"
      >
        Bộ sưu tập của Bé
      </div>
      <h2 class="text-4xl md:text-5xl font-black text-text mb-6">
        Sổ Tay Anh Hùng 🇻🇳
      </h2>
      <div class="flex items-center justify-center gap-6">
        <div class="flex flex-col items-center">
          <span class="text-3xl font-black text-primary">{{
            heroStore.totalUnlocked
          }}</span>
          <span class="text-xs font-bold text-text/60 uppercase tracking-widest"
            >Đã mở khóa</span
          >
        </div>
        <div class="h-10 w-px bg-gray-200"></div>
        <div class="flex flex-col items-center">
          <span class="text-3xl font-black text-gray-300">{{
            heroes.length
          }}</span>
          <span class="text-xs font-bold text-text/60 uppercase tracking-widest"
            >Tổng số tướng</span
          >
        </div>
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
        to="/map"
        class="mt-8 inline-block px-10 py-4 bg-secondary text-white font-black rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-lg uppercase"
      >
        Quay lại Bản đồ
      </NuxtLink>
    </div>
  </div>
</template>
