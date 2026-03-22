<script setup lang="ts">
import { useBadgeStore } from "~/stores/badgeStore";
import type { Badge } from "~/types/history";

const props = defineProps<{
  status: "all" | "earned" | "locked";
  rarity: Badge["rarity"] | "all";
}>();

const badgeStore = useBadgeStore();

const getBadgeStatus = (badgeId: string) => {
  return badgeStore.earnedBadgeIds.includes(badgeId);
};

const filteredBadges = computed(() => {
  return badgeStore.allBadges.filter((badge) => {
    // Status filter
    const earned = getBadgeStatus(badge.id);
    if (props.status === "earned" && !earned) return false;
    if (props.status === "locked" && earned) return false;

    // Rarity filter
    if (props.rarity !== "all" && badge.rarity !== props.rarity) return false;

    return true;
  });
});

const itemsPerPage = 10;
const visibleCount = ref(itemsPerPage);

const visibleBadges = computed(() => {
  return filteredBadges.value.slice(0, visibleCount.value);
});

const loadMore = () => {
  visibleCount.value += itemsPerPage;
};

// Reset count when filters change
watch(
  () => [props.status, props.rarity],
  () => {
    visibleCount.value = itemsPerPage;
  },
);

const rarityConfig = {
  common: {
    classes: "bg-slate-100 text-slate-600 border-slate-200",
    glow: "group-hover:shadow-[0_0_20px_rgba(148,163,184,0.3)]",
  },
  rare: {
    classes:
      "bg-blue-50 text-blue-600 border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.1)]",
    glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]",
  },
  epic: {
    classes:
      "bg-purple-50 text-purple-600 border-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.1)]",
    glow: "group-hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]",
  },
  legendary: {
    classes:
      "bg-amber-50 text-amber-600 border-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.2)]",
    glow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.6)]",
  },
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 pb-20">
    <div class="flex items-center gap-4 mb-10">
      <div
        class="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20"
      >
        <Icon name="fluent-emoji:military-medal" class="text-2xl" />
      </div>
      <div>
        <h2 class="text-3xl font-black text-text">
          {{ $t("badge_gallery.title") }}
        </h2>
        <p class="text-text/60 font-bold">
          {{ $t("badge_gallery.subtitle") }}
        </p>
      </div>
    </div>

    <div
      v-if="filteredBadges.length === 0"
      class="text-center py-20 bg-white/30 dark:bg-slate-800/30 backdrop-blur-md rounded-[40px] border-4 border-dashed border-primary/10 dark:border-slate-700"
    >
      <Icon
        name="fluent-emoji:magnifying-glass-tilted-left"
        class="text-8xl opacity-20 mb-6"
      />
      <p class="text-2xl font-black text-text/30">
        {{ $t("badge_gallery.no_results") }}
      </p>
    </div>

    <TransitionGroup
      v-else
      tag="div"
      name="stagger"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8"
    >
      <div
        v-for="(badge, index) in visibleBadges"
        :key="badge.id"
        class="group relative"
        :style="{ transitionDelay: `${index * 30}ms` }"
      >
        <!-- Badge Card Wrapper -->
        <div
          class="aspect-[4/5] bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-[48px] p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center transition-all duration-500 border-4 relative overflow-hidden h-full group-hover:shadow-2xl group-hover:-translate-y-2"
          :class="[
            getBadgeStatus(badge.id)
              ? `border-white dark:border-slate-700 shadow-xl ${rarityConfig[badge.rarity]?.glow} scale-100`
              : 'border-slate-100 dark:border-slate-800 opacity-60 grayscale scale-95 hover:grayscale-0 hover:opacity-100 hover:scale-100',
          ]"
        >
          <!-- Shiny Glint Effect for Rare+ -->
          <div
            v-if="getBadgeStatus(badge.id) && badge.rarity !== 'common'"
            class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-10"
          ></div>

          <!-- Icon Container -->
          <div
            class="w-20 h-20 sm:w-24 sm:h-24 rounded-[36px] flex items-center justify-center mb-6 transition-all duration-700 group-hover:rotate-12 group-hover:scale-125 shadow-inner relative z-0"
            :class="
              getBadgeStatus(badge.id)
                ? 'bg-background shadow-lg shadow-primary/5'
                : 'bg-slate-100/50 dark:bg-slate-700/50'
            "
          >
            <Icon
              :name="badge.icon"
              class="text-5xl sm:text-7xl relative z-10 drop-shadow-lg"
            />

            <!-- Radiance for legendary -->
            <div
              v-if="badge.rarity === 'legendary' && getBadgeStatus(badge.id)"
              class="absolute inset-0 bg-amber-400/30 blur-2xl rounded-full scale-150 animate-pulse"
            ></div>
          </div>

          <h3
            class="font-black text-text text-sm sm:text-base md:text-xl leading-tight px-2 mb-4"
          >
            {{ badge.title }}
          </h3>

          <!-- Rarity Tag -->
          <div
            v-if="getBadgeStatus(badge.id)"
            class="px-5 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all group-hover:bg-opacity-100"
            :class="rarityConfig[badge.rarity]?.classes"
          >
            {{ $t(`common.rarity.${badge.rarity}`) }}
          </div>
          <div
            v-else
            class="flex items-center gap-2 text-[10px] font-black text-text/30 bg-black/5 px-4 py-1.5 rounded-full"
          >
            <Icon name="fluent:lock-closed-24-filled" />
            {{ $t("badge_gallery.locked") }}
          </div>

          <!-- Stars Decoration (for legendary) -->
          <div
            v-if="badge.rarity === 'legendary' && getBadgeStatus(badge.id)"
            class="absolute top-6 right-6 pointer-events-none"
          >
            <Icon
              name="fluent-emoji:sparkles"
              class="text-2xl animate-spin-slow"
            />
          </div>
        </div>
      </div>
    </TransitionGroup>

    <div
      v-if="visibleCount < filteredBadges.length"
      class="flex justify-center mt-12"
    >
      <button
        @click="loadMore"
        class="px-8 py-3 bg-white/80 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-secondary font-bold rounded-full border-2 border-secondary/20 dark:border-slate-700 transition-all shadow-sm"
      >
        Xem thêm Huy hiệu
      </button>
    </div>
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
