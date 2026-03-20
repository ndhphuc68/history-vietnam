<script setup lang="ts">
import type { Hero } from "~/types/history";
/**
 * Detailed Modal for Hero Information.
 * Shows biography, achievements, and premium hero portrait.
 */
const props = defineProps<{
  hero: Hero | null;
  show: boolean;
}>();

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};

// Handle body scroll locking
watch(
  () => props.show,
  (newVal) => {
    if (typeof document !== "undefined") {
      if (newVal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
  },
);
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="show && hero"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-text/80 backdrop-blur-md"
          @click="close"
        ></div>

        <!-- Modal Content -->
        <div
          class="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-scale-up"
        >
          <!-- Hero Portrait Section -->
          <div
            class="relative w-full md:w-[40%] h-64 md:h-auto bg-background overflow-hidden"
          >
            <img
              :src="hero.image"
              :alt="hero.name"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
            ></div>

            <!-- Decoration -->
            <div class="absolute top-6 left-6 flex flex-col gap-2">
              <div
                class="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg"
              >
                <span
                  class="text-[10px] font-black text-primary uppercase tracking-widest"
                  >{{ hero.era }}</span
                >
              </div>
            </div>

            <div class="absolute bottom-8 left-8 right-8 text-white">
              <p
                class="text-sm font-bold text-accent uppercase tracking-widest mb-1"
              >
                {{ hero.title }}
              </p>
              <h2 class="text-4xl md:text-5xl font-black mb-1 drop-shadow-lg">
                {{ hero.name }}
              </h2>
            </div>
          </div>

          <!-- Details Section -->
          <div class="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
            <!-- Close Button -->
            <button
              @click="close"
              class="absolute top-6 right-6 w-12 h-12 bg-background text-text rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-md group z-10"
            >
              <Icon
                name="fluent:dismiss-24-filled"
                class="text-2xl group-hover:rotate-90 transition-transform duration-300"
              />
            </button>

            <div class="space-y-10">
              <!-- Basic Info Grid -->
              <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-background p-8 rounded-[32px] border-2 border-secondary/20"
              >
                <div class="flex flex-col gap-1">
                  <span
                    class="text-[10px] font-black text-primary uppercase tracking-widest"
                    >{{ $t("hero_detail.real_name") }}</span
                  >
                  <span class="text-text font-bold text-lg">{{
                    hero.realName || "---"
                  }}</span>
                </div>
                <div class="flex flex-col gap-1">
                  <span
                    class="text-[10px] font-black text-primary uppercase tracking-widest"
                    >{{ $t("hero_detail.position") }}</span
                  >
                  <span class="text-text font-bold text-lg">{{
                    hero.position || "---"
                  }}</span>
                </div>
                <div class="flex flex-col gap-1">
                  <span
                    class="text-[10px] font-black text-primary uppercase tracking-widest"
                    >{{ $t("hero_detail.years") }}</span
                  >
                  <span class="text-text font-bold text-lg"
                    >{{ hero.birthDate }} - {{ hero.deathDate }}</span
                  >
                </div>
                <div class="flex flex-col gap-1">
                  <span
                    class="text-[10px] font-black text-primary uppercase tracking-widest"
                    >{{ $t("hero_detail.hometown") }}</span
                  >
                  <span class="text-text font-bold text-lg">{{
                    hero.hometown || "---"
                  }}</span>
                </div>
              </div>

              <!-- Fun Fact Section (Standout Card) -->
              <section
                v-if="hero.funFact"
                class="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-[32px] border-2 border-amber-200 shadow-inner"
              >
                <div
                  class="absolute -top-4 -right-4 w-24 h-24 bg-amber-200/20 rounded-full blur-2xl"
                ></div>
                <div class="flex items-center gap-3 mb-4">
                  <div
                    class="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-white shadow-lg animate-bounce"
                  >
                    <Icon name="fluent-emoji:light-bulb" class="text-2xl" />
                  </div>
                  <h3 class="text-xl font-black text-amber-900">
                    {{ $t("hero_detail.fun_fact_title") }}
                  </h3>
                </div>
                <p
                  class="text-amber-800 text-lg leading-relaxed font-bold italic relative z-10"
                >
                  "{{ hero.funFact }}"
                </p>
              </section>

              <!-- Biography -->
              <section>
                <div class="flex items-center gap-3 mb-4">
                  <div
                    class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg"
                  >
                    <Icon name="fluent-emoji:scroll" class="text-2xl" />
                  </div>
                  <h3 class="text-xl font-black text-text">
                    {{ $t("hero_detail.biography_title") }}
                  </h3>
                </div>
                <p
                  class="text-text/80 text-lg leading-relaxed font-medium text-justify bg-white/50 p-6 rounded-3xl border border-primary/10"
                >
                  {{ hero.description }}
                </p>
              </section>

              <!-- Achievements -->
              <section>
                <div class="flex items-center gap-3 mb-4">
                  <div
                    class="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white shadow-lg"
                  >
                    <Icon name="fluent-emoji:military-medal" class="text-2xl" />
                  </div>
                  <h3 class="text-xl font-black text-text">
                    {{ $t("hero_detail.achievements_title") }}
                  </h3>
                </div>
                <ul class="grid grid-cols-1 gap-4">
                  <li
                    v-for="(achievement, idx) in hero.achievements"
                    :key="idx"
                    class="bg-white p-5 rounded-3xl border-2 border-secondary/10 flex items-start gap-4 transition-all hover:border-secondary/40 hover:bg-secondary/5 group/item"
                  >
                    <div
                      class="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center group-hover/item:scale-125 transition-transform"
                    >
                      <Icon
                        name="fluent-emoji:star"
                        class="text-xl text-secondary"
                      />
                    </div>
                    <span class="text-text font-bold text-lg leading-snug">{{
                      achievement
                    }}</span>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-gray-100;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--secondary);
  border-radius: 10px;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.animate-scale-up {
  animation: scale-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes scale-up {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
