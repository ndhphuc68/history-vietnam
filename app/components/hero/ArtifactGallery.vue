<script setup lang="ts">
import { useArtifactStore } from "~/stores/artifactStore";
import type { Artifact } from "~/types/history";

const artifactStore = useArtifactStore();

const isUnlocked = (id: string) =>
  artifactStore.unlockedArtifactIds.includes(id);

const rarityStyles: Record<string, string> = {
  common: "bg-slate-100/50",
  rare: "bg-blue-100/50",
  epic: "bg-purple-100/50",
  legendary: "bg-amber-100/50",
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 pt-12">
    <!-- Section Title -->
    <div class="flex items-center gap-4 mb-10">
      <div
        class="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-white shadow-lg shadow-accent/20"
      >
        <Icon name="fluent-emoji:vase" class="text-2xl" />
      </div>
      <div>
        <h2 class="text-3xl font-black text-text">
          {{ $t("artifact_gallery.title") }}
        </h2>
        <p class="text-text/60 font-bold">
          {{ $t("artifact_gallery.subtitle") }}
        </p>
      </div>
    </div>

    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16"
    >
      <div
        v-for="item in artifactStore.allArtifacts"
        :key="item.id"
        class="group relative"
      >
        <!-- The Pedestal (Historical Treasure Feel) -->
        <div class="relative pt-24">
          <!-- Spotlight Glow (Behind) -->
          <div
            v-if="isUnlocked(item.id)"
            class="absolute top-10 left-1/2 -translate-x-1/2 w-40 h-64 blur-[60px] rounded-full group-hover:blur-[80px] transition-all duration-1000 pointer-events-none"
            :class="[
              item.rarity === 'legendary'
                ? 'bg-amber-400/30'
                : item.rarity === 'epic'
                  ? 'bg-purple-400/20'
                  : item.rarity === 'rare'
                    ? 'bg-blue-400/20'
                    : 'bg-slate-400/10',
            ]"
          ></div>

          <!-- The Artifact Container / Glass Case -->
          <div
            class="bg-white/40 backdrop-blur-xl rounded-[48px] p-8 border-4 transition-all duration-700 text-center relative z-10 flex flex-col items-center justify-center h-full min-h-[340px] shadow-sm hover:shadow-2xl overflow-hidden"
            :class="[
              isUnlocked(item.id)
                ? 'border-white/60 translate-y-0 group-hover:-translate-y-6'
                : 'border-white/20 opacity-90 scale-95',
              item.rarity === 'legendary' && isUnlocked(item.id)
                ? 'ring-4 ring-amber-400/20'
                : '',
            ]"
          >
            <!-- Moving Glint Shine (Rare+) -->
            <div
              v-if="isUnlocked(item.id) && item.rarity !== 'common'"
              class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out pointer-events-none z-20"
            ></div>

            <!-- Floating Sparkles (Legendary only) -->
            <div
              v-if="item.rarity === 'legendary' && isUnlocked(item.id)"
              class="absolute inset-0 pointer-events-none"
            >
              <Icon
                name="fluent-emoji:sparkles"
                class="absolute top-4 left-4 text-xl animate-pulse"
              />
              <Icon
                name="fluent-emoji:sparkles"
                class="absolute bottom-10 right-6 text-2xl animate-bounce-slow"
              />
            </div>

            <!-- Artifact Icon or Chest -->
            <div
              class="w-32 h-32 rounded-[42px] flex items-center justify-center mb-10 transition-all duration-700 group-hover:scale-125 group-hover:-rotate-6 relative"
            >
              <template v-if="isUnlocked(item.id)">
                <!-- Radiance/Aura -->
                <div
                  class="absolute inset-0 rounded-full blur-2xl animate-pulse-slow scale-150"
                  :class="[
                    item.rarity === 'legendary'
                      ? 'bg-amber-300/40'
                      : item.rarity === 'epic'
                        ? 'bg-purple-300/30'
                        : item.rarity === 'rare'
                          ? 'bg-blue-300/30'
                          : 'bg-slate-300/20',
                  ]"
                ></div>
                <Icon
                  :name="item.icon"
                  class="text-8xl relative z-10 drop-shadow-2xl"
                />
              </template>

              <template v-else>
                <div
                  class="relative group-hover:scale-110 transition-transform duration-500"
                >
                  <Icon
                    name="fluent-emoji:treasure-chest"
                    class="text-8xl opacity-30 grayscale"
                  />
                  <div
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <Icon
                      name="fluent:lock-closed-24-filled"
                      class="text-3xl text-white/50"
                    />
                  </div>
                </div>
              </template>
            </div>

            <!-- Title & Info -->
            <h3 class="text-2xl font-black text-text mb-3 px-2 leading-tight">
              {{ isUnlocked(item.id) ? item.title : "???" }}
            </h3>

            <div
              v-if="isUnlocked(item.id)"
              class="px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-12"
            >
              <p
                class="text-xs text-text/60 font-bold italic leading-relaxed line-clamp-2"
              >
                "{{ item.description }}"
              </p>
            </div>
            <div v-else class="h-12 flex items-center justify-center">
              <span
                class="text-[10px] uppercase tracking-widest font-black text-text/20 bg-black/5 px-4 py-1.5 rounded-full"
              >
                {{ $t("artifact_gallery.not_found") }}
              </span>
            </div>
          </div>

          <!-- TIERED PEDESTALS (The Base) -->
          <div
            class="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full px-4 z-0"
          >
            <!-- Top cap -->
            <div
              class="h-4 w-11/12 mx-auto rounded-t-xl shadow-inner border-b border-white/20"
              :class="[
                item.rarity === 'legendary'
                  ? 'bg-gradient-to-b from-amber-300 to-amber-500'
                  : item.rarity === 'epic'
                    ? 'bg-gradient-to-b from-purple-300 to-purple-500'
                    : item.rarity === 'rare'
                      ? 'bg-gradient-to-b from-blue-300 to-blue-500'
                      : 'bg-gradient-to-b from-slate-200 to-slate-400',
              ]"
            ></div>
            <!-- Pillar Body -->
            <div
              class="h-12 w-full rounded-xl shadow-xl relative overflow-hidden"
              :class="[
                item.rarity === 'legendary'
                  ? 'bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600'
                  : item.rarity === 'epic'
                    ? 'bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700'
                    : item.rarity === 'rare'
                      ? 'bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700'
                      : 'bg-stone-300 border-2 border-stone-400/20',
              ]"
            >
              <!-- Engraving detail -->
              <div
                class="absolute inset-0 flex items-center justify-center opacity-20"
              >
                <div class="w-full h-px bg-white/40"></div>
              </div>
            </div>
            <!-- Bottom Base -->
            <div
              class="h-6 w-10/12 mx-auto rounded-b-2xl shadow-2xl mt-1"
              :class="[
                item.rarity === 'legendary'
                  ? 'bg-amber-800'
                  : item.rarity === 'epic'
                    ? 'bg-purple-900'
                    : item.rarity === 'rare'
                      ? 'bg-blue-900'
                      : 'bg-stone-400',
              ]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}
.animate-bounce-slow {
  animation: bounce-slow 4s ease-in-out infinite;
}
</style>
