<script setup lang="ts">
import { useArtifactStore } from "~/stores/artifactStore";
import type { Artifact } from "~/types/history";

const artifactStore = useArtifactStore();

const isUnlocked = (id: string) => true; // Temporary unlock for preview

const itemsPerPage = 8;
const visibleCount = ref(itemsPerPage);

const visibleArtifacts = computed(() => {
  return artifactStore.allArtifacts.slice(0, visibleCount.value);
});

const loadMore = () => {
  visibleCount.value += itemsPerPage;
};

// Colors and styles for the display case based on level/rarity
const rarityConfig: Record<
  Artifact["rarity"],
  { label: string; bg: string; text: string; border: string; glow: string }
> = {
  common: {
    label: "Thường",
    bg: "bg-stone-200",
    text: "text-stone-700",
    border: "border-stone-300",
    glow: "",
  },
  rare: {
    label: "Hiếm",
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-300",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.2)]",
  },
  epic: {
    label: "Cực Hiếm",
    bg: "bg-purple-100",
    text: "text-purple-700",
    border: "border-purple-300",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.3)]",
  },
  legendary: {
    label: "Huyền Thoại",
    bg: "bg-gradient-to-r from-amber-300 to-yellow-400",
    text: "text-amber-900",
    border: "border-amber-400",
    glow: "shadow-[0_0_30px_rgba(251,191,36,0.4)] ring-4 ring-amber-400/30",
  },
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 pt-12 pb-24">
    <!-- Section Title -->
    <div class="flex items-center gap-4 mb-16">
      <div
        class="w-14 h-14 bg-accent rounded-[20px] flex items-center justify-center text-white shadow-xl shadow-accent/20"
      >
        <Icon name="fluent-emoji:crown" class="text-3xl" />
      </div>
      <div>
        <h2 class="text-3xl md:text-4xl font-black text-text font-heading">
          {{ $t("artifact_gallery.title") }}
        </h2>
        <p class="text-text/60 font-medium text-lg mt-1">
          {{ $t("artifact_gallery.subtitle") }}
        </p>
      </div>
    </div>

    <!-- Gallery Grid -->
    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-20 lg:gap-x-10 lg:gap-y-24"
    >
      <div
        v-for="item in visibleArtifacts"
        :key="item.id"
        class="group relative flex flex-col items-center"
      >
        <!-- The Glass Display Case -->
        <div
          class="w-full relative z-10 rounded-[40px] p-6 lg:p-8 flex flex-col items-center justify-center min-h-[300px] lg:min-h-[340px] shadow-sm backdrop-blur-2xl transition-all duration-300 group-hover:-translate-y-4 group-hover:shadow-xl border-[3px] mt-4"
          :class="[
            isUnlocked(item.id)
              ? 'bg-white/70 dark:bg-slate-800/70 cursor-pointer pointer-events-auto'
              : 'bg-slate-100/50 dark:bg-slate-900/50 grayscale border-white/40 dark:border-slate-800 pointer-events-none',
            isUnlocked(item.id)
              ? `${rarityConfig[item.rarity].border} ${rarityConfig[item.rarity].glow}`
              : 'border-white/80 dark:border-slate-800',
          ]"
        >
          <!-- Level/Rarity Badge -->
          <div
            v-if="isUnlocked(item.id)"
            class="absolute -top-4 inset-x-0 mx-auto w-max px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-md z-30 flex items-center gap-1.5 border-[2px] border-white/80 dark:border-slate-700 backdrop-blur-md"
            :class="[
              rarityConfig[item.rarity].bg,
              rarityConfig[item.rarity].text,
            ]"
          >
            <Icon
              v-if="item.rarity === 'legendary'"
              name="fluent-emoji:star"
              class="text-sm"
            />
            <Icon
              v-else-if="item.rarity === 'epic'"
              name="fluent-emoji:sparkles"
              class="text-sm"
            />
            <Icon
              v-else-if="item.rarity === 'rare'"
              name="fluent-emoji:gem-stone"
              class="text-sm"
            />
            {{ rarityConfig[item.rarity].label }}
          </div>

          <!-- Floating Sparkles (Legendary only) -->
          <div
            v-if="item.rarity === 'legendary' && isUnlocked(item.id)"
            class="absolute inset-0 pointer-events-none z-20"
          >
            <Icon
              name="fluent-emoji:sparkles"
              class="absolute top-6 left-6 text-xl"
            />
            <Icon
              name="fluent-emoji:sparkles"
              class="absolute bottom-16 right-6 text-2xl"
            />
          </div>

          <!-- Artifact Icon or Chest -->
          <div
            class="w-24 h-24 lg:w-32 lg:h-32 mb-6 mt-2 flex items-center justify-center relative transition-transform duration-500 group-hover:scale-110"
            :class="isUnlocked(item.id) ? 'group-hover:-rotate-6' : ''"
          >
            <template v-if="isUnlocked(item.id)">
              <Icon
                :name="item.icon"
                class="text-7xl lg:text-8xl relative z-10"
              />
            </template>
            <template v-else>
              <Icon
                name="fluent-emoji:treasure-chest"
                class="text-7xl lg:text-8xl opacity-30 drop-shadow-sm"
              />
              <div
                class="absolute inset-0 flex items-center justify-center z-10"
              >
                <div
                  class="bg-black/10 dark:bg-white/10 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 dark:border-white/10"
                >
                  <Icon
                    name="ph:lock-key-fill"
                    class="text-2xl text-text/50 shadow-sm"
                  />
                </div>
              </div>
            </template>
          </div>

          <!-- Title -->
          <h3
            class="text-xl lg:text-2xl font-black text-center mb-2 px-1 leading-tight"
            :class="isUnlocked(item.id) ? 'text-text' : 'text-text/40'"
          >
            {{ isUnlocked(item.id) ? item.title : "???" }}
          </h3>

          <!-- Info / Description -->
          <div
            v-if="isUnlocked(item.id)"
            class="w-full text-center mt-2 px-2 overflow-hidden h-10"
          >
            <p
              class="text-xs text-text/70 font-medium italic leading-snug line-clamp-2"
            >
              "{{ item.description }}"
            </p>
          </div>
          <div v-else class="mt-4 flex items-center justify-center h-10">
            <span
              class="text-[10px] uppercase tracking-widest font-black text-text/30 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-full border border-black/5 dark:border-white/5 shadow-inner"
            >
              {{ $t("artifact_gallery.not_found") }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="visibleCount < artifactStore.allArtifacts.length"
      class="flex justify-center mt-20"
    >
      <button
        @click="loadMore"
        class="px-8 py-3 bg-white/80 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-secondary font-bold rounded-full border-2 border-secondary/20 dark:border-slate-700 transition-all shadow-sm"
      >
        Xem thêm Báu vật
      </button>
    </div>
  </div>
</template>

<style scoped></style>
