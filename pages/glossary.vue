<script setup lang="ts">
import { useGlossary } from "~/composables/useGlossary";

const { glossary } = useGlossary();
const searchQuery = ref("");
const selectedCategory = ref("Tất cả");

const categories = [
  "Tất cả",
  "Chức danh",
  "Sự vật",
  "Khái niệm",
  "Địa danh",
  "Thời kỳ",
];

const filteredGlossary = computed(() => {
  return glossary.value.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory =
      selectedCategory.value === "Tất cả" ||
      item.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});
</script>

<template>
  <div class="min-h-screen pb-20">
    <UiPageHero
      title-primary="Từ điển"
      title-highlight="Tình Việt"
      subtitle="Giải mã những từ ngữ cổ xưa để hiểu hơn về dòng máu Lạc Hồng."
      tag="KHO KIẾN THỨC"
      icon="fluent-emoji:books"
      accent-color="secondary"
    />

    <div class="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
      <!-- Search & Filter Bar -->
      <div
        class="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-12 border-2 border-secondary/10 flex flex-col md:flex-row gap-6 items-center"
      >
        <div class="relative flex-1 w-full">
          <Icon
            name="fluent:search-24-filled"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-text/30 text-xl"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm từ khóa..."
            class="w-full pl-12 pr-6 py-4 bg-background rounded-2xl border-2 border-transparent focus:border-secondary focus:bg-white transition-all outline-none font-bold text-text"
          />
        </div>

        <div
          class="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar"
        >
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            class="px-5 py-2.5 rounded-full text-sm font-black transition-all whitespace-nowrap"
            :class="
              selectedCategory === cat
                ? 'bg-secondary text-white shadow-lg'
                : 'bg-background text-text/60 hover:bg-secondary/10 hover:text-secondary'
            "
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Glossary Grid -->
      <div
        v-if="filteredGlossary.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <div
          v-for="item in filteredGlossary"
          :key="item.id"
          class="bg-white rounded-[32px] p-8 shadow-md border-b-8 border-secondary/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
        >
          <div class="flex items-center justify-between mb-4">
            <span
              class="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-black rounded-full uppercase tracking-wider"
            >
              {{ item.category || "Chung" }}
            </span>
          </div>
          <h3
            class="text-2xl font-black text-text mb-3 group-hover:text-secondary transition-colors"
          >
            {{ item.term }}
          </h3>
          <p class="text-text/70 font-bold leading-relaxed">
            {{ item.definition }}
          </p>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="text-center py-20 bg-white rounded-[40px] border-4 border-dashed border-text/10"
      >
        <Icon
          name="fluent-emoji:magnifying-glass-tilted-left"
          class="text-8xl mb-6 opacity-20"
        />
        <h3 class="text-2xl font-black text-text/40">
          Không tìm thấy từ này bạn ơi!
        </h3>
        <p class="text-text/30 font-bold mt-2">Hãy thử tìm một từ khác nhé.</p>
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
</style>
