<script setup lang="ts">
import { useProgressStore } from "~/stores/progressStore";

const progressStore = useProgressStore();
const emit = defineEmits<{
  (e: "open-rescue"): void;
  (e: "open-avatar"): void;
}>();

const containerRef = ref<HTMLElement | null>(null);
const isHovered = ref(false);

const avatars = [
  { id: "lac-long", icon: "fluent-emoji:dragon", color: "bg-blue-500" },
  { id: "au-co", icon: "fluent-emoji:cherry-blossom", color: "bg-pink-500" },
  { id: "warrior", icon: "fluent-emoji:crossed-swords", color: "bg-red-500" },
  { id: "scholar", icon: "fluent-emoji:scroll", color: "bg-amber-500" },
];

const currentAvatar = computed(() => {
  return (
    avatars.find((a) => a.id === progressStore.selectedAvatar) || avatars[0]
  );
});

const progressWidth = computed(() => `${progressStore.levelProgress}%`);
</script>

<template>
  <div
    ref="containerRef"
    class="relative group"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Main Badge -->
    <div
      class="flex items-center gap-3 bg-white/80 backdrop-blur-md border-2 border-slate-100 p-1.5 pr-4 rounded-full shadow-sm hover:shadow-md transition-all"
    >
      <div
        class="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden shrink-0 cursor-pointer active:scale-95 transition-transform"
        @click="emit('open-rescue')"
      >
        <!-- Avatar Background -->
        <div
          class="absolute inset-0 transition-colors duration-500"
          :class="currentAvatar?.color"
        ></div>

        <!-- Avatar Icon -->
        <Icon
          :name="currentAvatar?.icon"
          class="text-2xl relative z-10 drop-shadow-sm"
        />

        <!-- Progress Ring -->
        <svg class="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            class="transition-colors duration-500"
            :class="{
              'text-slate-200': progressStore.avatarFrame === 'slate',
              'text-blue-200': progressStore.avatarFrame === 'blue',
              'text-purple-200': progressStore.avatarFrame === 'purple',
              'text-amber-200': progressStore.avatarFrame === 'amber',
            }"
          />
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-dasharray="113.1"
            :stroke-dashoffset="
              113.1 - (113.1 * progressStore.levelProgress) / 100
            "
            class="transition-all duration-1000 ease-out"
            :class="{
              'text-slate-500': progressStore.avatarFrame === 'slate',
              'text-blue-500': progressStore.avatarFrame === 'blue',
              'text-purple-500': progressStore.avatarFrame === 'purple',
              'text-amber-500': progressStore.avatarFrame === 'amber',
            }"
          />
        </svg>
      </div>

      <!-- Info -->
      <div
        class="hidden sm:block cursor-pointer hover:bg-slate-50/50 px-2 py-1 rounded-xl transition-colors active:scale-95"
        @click="emit('open-avatar')"
      >
        <div
          class="text-[10px] font-black text-text/40 uppercase tracking-widest leading-none mb-1"
        >
          {{ $t(progressStore.userTitle) }}
        </div>
        <div
          class="text-sm font-black text-text leading-none flex items-center gap-1"
        >
          {{ progressStore.userName || $t("user_titles.default_name") }}
          <span class="text-[10px] font-bold text-primary ml-1">
            {{ $t("level_badge.level", { level: progressStore.currentLevel }) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Expansion/Tooltip on Hover -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-2 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="translate-y-2 opacity-0 scale-95"
    >
      <div
        v-if="isHovered"
        class="absolute top-full right-0 mt-3 w-64 bg-white rounded-[24px] shadow-2xl p-5 border-4 border-primary/5 z-50 overflow-hidden"
      >
        <div class="relative z-10">
          <div class="flex justify-between items-end mb-4">
            <div>
              <div
                class="text-[10px] font-black text-primary uppercase tracking-widest"
              >
                {{ $t("level_badge.level_progress") }}
              </div>
              <div
                class="text-xs font-black text-text/50 uppercase tracking-tighter"
              >
                {{
                  $t("level_badge.level", { level: progressStore.currentLevel })
                }}
              </div>
            </div>
            <div class="text-right">
              <div
                class="text-[10px] font-black text-text/30 px-2 py-0.5 bg-black/5 rounded-full mb-1"
              >
                {{ $t("level_badge.rank_master") }}
              </div>
              <div class="text-sm font-black text-primary">
                {{ progressStore.xpInCurrentLevel }}/{{
                  progressStore.xpRequiredForNextLevel
                }}
              </div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div
            class="h-4 bg-primary/10 rounded-full overflow-hidden mb-4 p-1 shadow-inner"
          >
            <div
              class="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out shadow-lg"
              :style="{ width: progressWidth }"
            >
              <div class="w-full h-full bg-white/20 animate-pulse"></div>
            </div>
          </div>

          <div class="text-xs font-bold text-text/60 leading-relaxed">
            {{
              $t("level_badge.next_level_needed", {
                xp:
                  progressStore.xpRequiredForNextLevel -
                  progressStore.xpInCurrentLevel,
              })
            }}
          </div>
        </div>

        <!-- Decorative background in tooltip -->
        <div
          class="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
        ></div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.5;
  }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
