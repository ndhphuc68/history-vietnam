<script setup lang="ts">
import { useDailyFact } from "~/composables/useDailyFact";
import { useMascotStore } from "~/stores/mascotStore";

const { dailyFact } = useDailyFact();
const mascotStore = useMascotStore();

const tellFact = () => {
  if (dailyFact.value) {
    mascotStore.say(
      dailyFact.value.content,
      "talking",
      Math.max(8000, dailyFact.value.content.length * 100),
    );
  }
};
</script>

<template>
  <div v-if="dailyFact" class="w-full max-w-4xl mx-auto px-4 py-8">
    <div
      class="bg-white dark:bg-slate-800 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border-4 border-accent/20 overflow-hidden group hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] transition-all duration-500 relative"
    >
      <!-- Background highlights -->
      <div
        class="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-700"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16 group-hover:scale-110 transition-transform duration-700"
      ></div>

      <div
        class="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative z-10"
      >
        <!-- Icon/Visual Section -->
        <div
          class="w-24 h-24 md:w-32 md:h-32 bg-accent/20 rounded-[35%] flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform duration-500 shadow-inner"
        >
          <Icon
            :name="dailyFact.icon"
            class="text-6xl md:text-7xl animate-float"
          />
        </div>

        <!-- Content Section -->
        <div class="flex-1 text-center md:text-left">
          <div
            class="inline-block px-4 py-1 mb-4 bg-accent/30 text-text font-bold rounded-full text-xs md:text-sm uppercase tracking-widest"
          >
            {{ $t("daily_fact.tag") }}
          </div>
          <h3
            class="text-2xl md:text-4xl font-black text-text mb-4 leading-tight"
          >
            {{ dailyFact.title }}
          </h3>
          <p
            class="text-lg md:text-xl text-text/80 font-medium leading-relaxed italic border-l-4 border-primary/20 pl-4 md:pl-6 my-6"
          >
            "{{ dailyFact.content }}"
          </p>

          <div
            class="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6"
          >
            <span class="flex items-center text-sm font-bold text-primary/60">
              <Icon name="fluent-emoji:bookmark-tabs" class="mr-2" />
              {{ $t("daily_fact.category", { category: dailyFact.category }) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-float {
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
}
</style>
