<script setup lang="ts">
import { useBadgeStore } from "~/stores/badgeStore";

const badgeStore = useBadgeStore();

const getBadgeStatus = (badgeId: string) => {
  return badgeStore.earnedBadgeIds.includes(badgeId);
};

const rarityConfig = {
  common: {
    label: "Cơ bản",
    classes: "bg-slate-100 text-slate-600 border-slate-200",
  },
  rare: {
    label: "Hiếm",
    classes:
      "bg-blue-50 text-blue-600 border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.1)]",
  },
  epic: {
    label: "Sử thi",
    classes:
      "bg-purple-50 text-purple-600 border-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.1)]",
  },
  legendary: {
    label: "Huyền thoại",
    classes:
      "bg-amber-50 text-amber-600 border-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.2)] animate-pulse-gentle",
  },
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 pb-20">
    <TransitionGroup
      tag="div"
      name="stagger"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-10"
    >
      <div
        v-for="(badge, index) in badgeStore.allBadges"
        :key="badge.id"
        class="group relative"
        :style="{ transitionDelay: `${index * 50}ms` }"
      >
        <!-- Badge Card -->
        <div
          class="aspect-square bg-white rounded-[40px] p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all duration-500 border-4 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:-translate-y-2"
          :class="[
            getBadgeStatus(badge.id)
              ? 'border-primary/20 opacity-100 scale-100'
              : 'border-slate-100 opacity-40 grayscale scale-95 hover:grayscale-0 hover:opacity-100 hover:scale-100',
          ]"
        >
          <!-- Icon Container -->
          <div
            class="w-20 h-20 sm:w-24 sm:h-24 rounded-[32px] flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-inner"
            :class="getBadgeStatus(badge.id) ? 'bg-primary/10' : 'bg-slate-50'"
          >
            <Icon :name="badge.icon" class="text-5xl sm:text-7xl" />
          </div>

          <h3
            class="font-black text-text text-base md:text-xl leading-tight px-2"
          >
            {{ badge.title }}
          </h3>

          <!-- Rarity Tag (only if earned) -->
          <div class="mt-4">
            <div
              v-if="getBadgeStatus(badge.id)"
              class="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 transition-all group-hover:scale-110"
              :class="
                rarityConfig[badge.rarity as keyof typeof rarityConfig]?.classes
              "
            >
              {{
                rarityConfig[badge.rarity as keyof typeof rarityConfig]?.label
              }}
            </div>
            <div
              v-else
              class="text-[10px] font-bold text-text/40 bg-slate-50 px-3 py-1 rounded-full border border-slate-100"
            >
              Chưa đạt được
            </div>
          </div>

          <!-- Stars Decoration (for legendary) -->
          <div
            v-if="badge.rarity === 'legendary' && getBadgeStatus(badge.id)"
            class="absolute top-4 right-4 pointer-events-none"
          >
            <Icon
              name="fluent-emoji:sparkles"
              class="text-2xl animate-spin-slow"
            />
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.stagger-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.stagger-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

@keyframes pulse-gentle {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.02);
  }
}
.animate-pulse-gentle {
  animation: pulse-gentle 2s ease-in-out infinite;
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 12s linear infinite;
}
</style>
