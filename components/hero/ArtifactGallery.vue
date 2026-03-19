<script setup lang="ts">
import { useArtifactStore } from "~/stores/artifactStore";

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
      <div class="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-white shadow-lg shadow-accent/20">
        <Icon name="fluent-emoji:vase" class="text-2xl" />
      </div>
      <div>
        <h2 class="text-3xl font-black text-text">Bảo tàng Báu vật</h2>
        <p class="text-text/60 font-bold">Những cổ vật vô giá bé đã tìm thấy trên hành trình xuyên không.</p>
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12">
      <div
        v-for="item in artifactStore.allArtifacts"
        :key="item.id"
        class="group relative"
      >
        <!-- The Pedestal (Museum Feel) -->
        <div class="relative pt-16">
          <!-- Spotlight Glow -->
          <div 
            v-if="isUnlocked(item.id)"
            class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-64 bg-accent/10 blur-[40px] rounded-full group-hover:bg-accent/20 transition-all duration-700"
          ></div>

          <!-- The Artifact Container -->
          <div
            class="bg-white/40 backdrop-blur-md rounded-[40px] p-8 border-4 border-white transition-all duration-500 text-center relative z-10 flex flex-col items-center justify-center h-full min-h-[300px]"
            :class="[
              isUnlocked(item.id)
                ? 'shadow-2xl translate-y-0 group-hover:-translate-y-4'
                : 'opacity-40 grayscale scale-95',
            ]"
          >
            <!-- Platform/Base inside -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/5 blur-md rounded-full"></div>

            <!-- Icon -->
            <div
              class="w-28 h-28 rounded-[36px] flex items-center justify-center mb-8 transition-all duration-700 group-hover:scale-125 group-hover:-rotate-6 relative"
            >
              <div 
                v-if="isUnlocked(item.id)"
                class="absolute inset-0 rounded-full animate-pulse-slow"
                :class="rarityStyles[item.rarity] || 'bg-slate-100'"
              ></div>
              <Icon :name="item.icon" class="text-7xl relative z-10" />
            </div>

            <h3 class="text-2xl font-black text-text mb-3 px-2 leading-tight">
              {{ item.title }}
            </h3>

            <div v-if="isUnlocked(item.id)" class="px-4">
              <p class="text-sm text-text/60 font-medium italic leading-relaxed line-clamp-2">
                "{{ item.description }}"
              </p>
            </div>
            <div v-else class="flex items-center gap-2 bg-slate-200/50 px-4 py-1.5 rounded-full text-xs font-black text-text/40">
              <Icon name="fluent:lock-closed-16-filled" />
              Báu vật Bí ẩn
            </div>
          </div>

          <!-- Base Stone (Visual Pedestal) -->
          <div class="h-6 mx-4 bg-slate-200/80 rounded-b-[20px] shadow-sm relative z-0"></div>
          <div class="h-4 mx-8 bg-slate-300/60 rounded-b-[15px] shadow-sm relative z-0"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}
.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}
</style>
