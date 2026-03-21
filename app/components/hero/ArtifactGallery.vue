<script setup lang="ts">
import { useArtifactStore } from "~/stores/artifactStore";
import type { Artifact } from "~/types/history";

const artifactStore = useArtifactStore();

const isUnlocked = (id: string) => true; // Temporary unlock for preview

// Colors for the pedestal levels based on rarity
const rarityPedestal: Record<
  string,
  { top: string; body: string; base: string; shadow: string; glow: string }
> = {
  common: {
    top: "bg-gradient-to-b from-stone-200 to-stone-300",
    body: "bg-gradient-to-r from-stone-400 via-stone-300 to-stone-400 border-stone-400",
    base: "bg-stone-500",
    shadow: "shadow-stone-500/30",
    glow: "bg-stone-200/20",
  },
  rare: {
    top: "bg-gradient-to-b from-blue-300 to-blue-400",
    body: "bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 border-blue-500",
    base: "bg-blue-800",
    shadow: "shadow-blue-600/40",
    glow: "bg-blue-300/30",
  },
  epic: {
    top: "bg-gradient-to-b from-purple-300 to-purple-400",
    body: "bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 border-purple-500",
    base: "bg-purple-800",
    shadow: "shadow-purple-600/40",
    glow: "bg-purple-300/30",
  },
  legendary: {
    top: "bg-gradient-to-b from-amber-300 to-amber-400",
    body: "bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 border-amber-500",
    base: "bg-amber-800",
    shadow: "shadow-amber-600/50",
    glow: "bg-amber-300/40",
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
        <Icon name="fluent-emoji:vase" class="text-3xl" />
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
        v-for="item in artifactStore.allArtifacts"
        :key="item.id"
        class="group relative flex flex-col items-center"
      >
        <!-- The Glass Display Case -->
        <div
          class="w-full relative z-10 rounded-[40px] p-6 lg:p-8 flex flex-col items-center justify-center min-h-[280px] lg:min-h-[320px] shadow-sm backdrop-blur-2xl transition-all duration-300 group-hover:-translate-y-4 group-hover:shadow-xl border-[3px]"
          :class="[
            isUnlocked(item.id)
              ? 'bg-white/70 border-white/80 cursor-pointer pointer-events-auto'
              : 'bg-slate-100/50 grayscale border-white/40 pointer-events-none',
            item.rarity === 'legendary' && isUnlocked(item.id)
              ? 'ring-4 ring-amber-400/30'
              : '',
          ]"
        >
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
            class="w-24 h-24 lg:w-32 lg:h-32 mb-6 flex items-center justify-center relative transition-transform duration-500 group-hover:scale-110"
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
                  class="bg-black/10 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20"
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
              class="text-[10px] uppercase tracking-widest font-black text-text/30 bg-black/5 px-4 py-2 rounded-full border border-black/5 shadow-inner"
            >
              {{ $t("artifact_gallery.not_found") }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
