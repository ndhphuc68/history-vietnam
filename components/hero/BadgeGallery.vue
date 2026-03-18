<script setup lang="ts">
import { useBadgeStore } from "~/stores/badgeStore";

const badgeStore = useBadgeStore();

const getBadgeStatus = (badgeId: string) => {
  return badgeStore.earnedBadgeIds.includes(badgeId);
};

const rarityColors = {
  common: "bg-slate-100 text-slate-600 border-slate-200",
  rare: "bg-blue-50 text-blue-600 border-blue-200",
  epic: "bg-purple-50 text-purple-600 border-purple-200",
  legendary: "bg-amber-50 text-amber-600 border-amber-200",
};
</script>
<template>
  <div class="max-w-7xl mx-auto px-6 pb-20">
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
    >
      <div
        v-for="badge in badgeStore.allBadges"
        :key="badge.id"
        class="group relative"
      >
        <!-- Badge Card -->
        <div
          class="aspect-square bg-white rounded-[40px] p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all duration-500 border-4 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-xl"
          :class="[
            getBadgeStatus(badge.id)
              ? 'border-primary/20 opacity-100 scale-100'
              : 'border-slate-100 opacity-40 grayscale scale-95 hover:grayscale-0 hover:opacity-100 hover:scale-100',
          ]"
        >
          <!-- Icon Container -->
          <div
            class="w-24 h-24 rounded-[32px] flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-12"
            :class="getBadgeStatus(badge.id) ? 'bg-primary/10' : 'bg-slate-50'"
          >
            <Icon :name="badge.icon" class="text-6xl sm:text-7xl" />
          </div>

          <h3
            class="font-black text-text text-lg md:text-2xl leading-tight px-2"
          >
            {{ badge.title }}
          </h3>

          <!-- Rarity Tag (only if earned) -->
          <div class="mt-4">
            <span
              v-if="getBadgeStatus(badge.id)"
              class="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border-2"
              :class="rarityColors[badge.rarity]"
            >
              {{ badge.rarity }}
            </span>
            <span
              v-else
              class="text-xs font-bold text-text/40 bg-slate-50 px-3 py-1 rounded-full border border-slate-100"
            >
              Chưa đạt được
            </span>
          </div>
        </div>

        <!-- Tooltip / Hover Info -->
        <div
          class="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        >
          <div
            class="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-64 bg-text text-white p-6 rounded-[32px] text-sm shadow-2xl"
          >
            <p class="font-black mb-2 text-primary text-lg">
              {{ badge.title }}
            </p>
            <p class="opacity-90 leading-relaxed font-medium">
              {{ badge.description }}
            </p>
            <div
              class="absolute top-full left-1/2 -translate-x-1/2 border-[12px] border-transparent border-t-text"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
