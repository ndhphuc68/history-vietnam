<script setup lang="ts">
import { useArtifactStore } from "~/stores/artifactStore";

const artifactStore = useArtifactStore();

const isUnlocked = (id: string) =>
  artifactStore.unlockedArtifactIds.includes(id);

const rarityStyles = {
  common: "border-slate-200 bg-slate-50",
  rare: "border-blue-200 bg-blue-50",
  epic: "border-purple-200 bg-purple-50",
  legendary:
    "border-amber-200 bg-amber-50 shadow-[0_0_20px_rgba(245,158,11,0.1)]",
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 pt-12">
    <div class="flex items-center space-x-4 mb-10">
      <div
        class="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-2xl shadow-lg"
      >
        🏺
      </div>
      <div>
        <h2 class="text-3xl font-black text-text">Bảo tàng Báu vật</h2>
        <p class="text-text/60 font-bold">
          Những kỷ vật quý giá trên hành trình lịch sử của bé.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
      <div
        v-for="item in artifactStore.allArtifacts"
        :key="item.id"
        class="group relative"
      >
        <div
          class="bg-white rounded-[40px] p-8 border-4 transition-all duration-500 text-center relative overflow-hidden h-full flex flex-col items-center justify-center"
          :class="[
            isUnlocked(item.id)
              ? 'border-accent/30 opacity-100 scale-100 shadow-xl'
              : 'border-slate-100 opacity-40 grayscale scale-95',
          ]"
        >
          <!-- Locked Overlay -->
          <div
            v-if="!isUnlocked(item.id)"
            class="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[2px] z-10"
          >
            <Icon
              name="fluent:lock-closed-24-filled"
              class="text-3xl text-text/20"
            />
          </div>

          <div
            class="w-24 h-24 rounded-[32px] flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-inner"
            :class="isUnlocked(item.id) ? 'bg-accent/10' : 'bg-slate-50'"
          >
            <Icon :name="item.icon" class="text-6xl" />
          </div>

          <h3 class="text-xl font-black text-text mb-2 px-2 leading-tight">
            {{ item.title }}
          </h3>

          <p
            v-if="isUnlocked(item.id)"
            class="text-xs text-text/60 font-bold italic line-clamp-2"
          >
            {{ item.description }}
          </p>
          <p v-else class="text-xs text-text/30 font-bold">Chưa khám phá</p>

          <!-- Reflection effect -->
          <div
            class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
