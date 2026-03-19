<script setup lang="ts">
import { useBadgeStore } from '~/stores/badgeStore';

const badgeStore = useBadgeStore();

const rarityIcons = {
  common: 'fluent-emoji:brain',
  rare: 'fluent-emoji:sparkles',
  epic: 'fluent-emoji:crown',
  legendary: 'fluent-emoji:star-struck'
};

const rarityLabels = {
  common: 'Cơ bản',
  rare: 'Hiếm',
  epic: 'Sử thi',
  legendary: 'Huyền thoại'
};

const rarityColors = {
  common: 'text-slate-500 bg-slate-100',
  rare: 'text-blue-500 bg-blue-100',
  epic: 'text-purple-500 bg-purple-100',
  legendary: 'text-amber-500 bg-amber-100'
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 mb-16">
    <div class="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 md:p-12 shadow-2xl border-4 border-primary/10 relative overflow-hidden group">
      <!-- Background Glow -->
      <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-700"></div>
      
      <div class="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
        <!-- Progress Circle/Info -->
        <div class="flex-shrink-0 text-center">
          <div class="relative inline-flex items-center justify-center mb-4">
            <svg class="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                stroke-width="12"
                fill="transparent"
                class="text-slate-100"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                stroke-width="12"
                fill="transparent"
                :stroke-dasharray="364.4"
                :stroke-dashoffset="364.4 * (1 - badgeStore.progressPercent / 100)"
                class="text-primary transition-all duration-1000 ease-out"
              />
            </svg>
            <div class="absolute flex flex-col items-center">
              <span class="text-3xl font-black text-text">{{ badgeStore.progressPercent }}%</span>
            </div>
          </div>
          <p class="text-sm font-black text-text/40 uppercase tracking-widest">Hoàn thành</p>
        </div>

        <!-- Stats Grid -->
        <div class="flex-1 w-full lg:w-auto">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-2xl font-black text-text">Tiến độ Dũng sĩ</h3>
            <div class="text-lg font-black text-primary">
              {{ badgeStore.earnedCount }} / {{ badgeStore.totalBadges }} <span class="text-text/20 ml-1">Huy hiệu</span>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div 
              v-for="(count, rarity) in badgeStore.stats" 
              :key="rarity"
              class="p-4 rounded-3xl bg-background border-2 border-primary/5 hover:border-primary/20 transition-all group/stat"
            >
              <div class="flex items-center gap-3 mb-2">
                <div :class="['w-8 h-8 rounded-xl flex items-center justify-center text-lg', rarityColors[rarity]]">
                  <Icon :name="rarityIcons[rarity]" />
                </div>
                <span class="text-xs font-black text-text/40 uppercase tracking-wider">{{ rarityLabels[rarity] }}</span>
              </div>
              <div class="text-2xl font-black text-text group-hover/stat:text-primary transition-colors">
                {{ count }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
