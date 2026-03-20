<script setup lang="ts">
import { useArtifactStore } from "~/stores/artifactStore";
import { useMascotStore } from "~/stores/mascotStore";
import confetti from "canvas-confetti";

const { t } = useI18n();
const localePath = useLocalePath();
const artifactStore = useArtifactStore();
const mascotStore = useMascotStore();
const show = computed(() => artifactStore.showUnlockModal);
const artifact = computed(() => artifactStore.lastUnlockedArtifact);

const closeModal = () => {
  artifactStore.showUnlockModal = false;
};

watch(show, (newVal) => {
  if (newVal && artifact.value) {
    // Mascot congratulates
    mascotStore.say(
      t("artifact_unlock.mascot_congrat", { title: artifact.value.title }),
      "happy",
      6000,
    );

    // Play sound or trigger confetti
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#1A535C", "#4ECDC4", "#FFE66D", "#FF6B6B"],
        shapes: ["circle", "square"],
        scalar: 1.2,
      });
    }, 300);
  }
});

const rarityLabel = computed(() => ({
  common: t("badge_gallery.rarity.common"),
  rare: t("badge_gallery.rarity.rare"),
  epic: t("badge_gallery.rarity.epic"),
  legendary: t("badge_gallery.rarity.legendary"),
}));

const rarityClasses = {
  common: "bg-slate-100 text-slate-600",
  rare: "bg-blue-100 text-blue-600",
  epic: "bg-purple-100 text-purple-600",
  legendary: "bg-amber-100 text-amber-600 animate-pulse",
};
</script>

<template>
  <Transition
    enter-active-class="transition duration-500 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="show && artifact"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-text/40 backdrop-blur-md"
    >
      <div
        class="bg-white rounded-[48px] shadow-2xl max-w-lg w-full overflow-hidden relative border-8 border-white"
      >
        <!-- Shine effect -->
        <div
          class="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 pointer-events-none"
        ></div>

        <div class="p-10 text-center relative z-10">
          <div
            class="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6"
            :class="rarityClasses[artifact.rarity]"
          >
            {{ $t("artifact_unlock.title") }}
          </div>

          <div class="relative mb-8 group">
            <div
              class="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 group-hover:scale-110 transition-transform duration-700"
            ></div>
            <div
              class="w-32 h-32 bg-primary/10 rounded-[40px] flex items-center justify-center mx-auto relative transform group-hover:rotate-12 transition-all duration-500 shadow-inner"
            >
              <Icon :name="artifact.icon" class="text-7xl" />
            </div>

            <!-- Sparkles -->
            <Icon
              name="fluent-emoji:sparkles"
              class="absolute -top-2 -right-2 text-3xl animate-bounce"
            />
            <Icon
              name="fluent-emoji:sparkles"
              class="absolute -bottom-4 -left-4 text-2xl animate-pulse"
            />
          </div>

          <h2 class="text-4xl font-black text-text mb-4 leading-tight">
            {{ artifact.title }}
          </h2>

          <p class="text-lg text-text/70 font-bold mb-8 leading-relaxed italic">
            "{{ artifact.description }}"
          </p>

          <div class="flex flex-col gap-4">
            <button
              @click="closeModal"
              class="btn-primary py-5 text-xl w-full shadow-[0_10px_30px_rgba(26,83,92,0.3)] hover:shadow-[0_15px_40px_rgba(26,83,92,0.4)]"
            >
              {{ $t("artifact_unlock.button") }}
            </button>

            <NuxtLink
              :to="localePath('/badges')"
              @click="closeModal"
              class="text-primary font-black text-lg hover:underline underline-offset-8"
            >
              {{ $t("artifact_unlock.view_all") }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
