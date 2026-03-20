<script setup lang="ts">
import { useLetterStore } from "~/stores/letterStore";

const letterStore = useLetterStore();
const show = ref(false);
const letter = ref<any>(null);

// Watch for new letters
watch(
  () => letterStore.lastUnlockedLetter,
  (newLetter) => {
    if (newLetter) {
      letter.value = newLetter;
      show.value = true;
    }
  },
);

const close = () => {
  show.value = false;
  letterStore.lastUnlockedLetter = null;
};
</script>

<template>
  <Teleport to="body">
    <Transition name="letter-fade">
      <div
        v-if="show && letter"
        class="fixed inset-0 z-[10001] flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-md"
          @click="close"
        ></div>

        <!-- Letter Content -->
        <div
          class="relative w-full max-w-2xl bg-[#fdf5e6] rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 md:p-12 overflow-hidden border-[16px] border-[#e6dcc8] animate-letter-unroll"
        >
          <!-- Decorative Texture -->
          <div
            class="absolute inset-0 opacity-10 pointer-events-none parchment-texture"
          ></div>

          <!-- Wax Seal -->
          <div
            class="absolute top-8 right-8 w-20 h-20 bg-primary rounded-full shadow-lg flex items-center justify-center border-4 border-primary/20 transform rotate-12 z-20"
          >
            <Icon :name="letter.icon" class="text-4xl text-white/80" />
          </div>

          <div class="relative z-10 font-serif text-text">
            <h2
              class="text-3xl md:text-4xl font-black mb-8 border-b-2 border-primary/20 pb-4 text-center tracking-tight"
            >
              {{ letter.title }}
            </h2>

            <div
              class="text-xl md:text-2xl leading-relaxed mb-10 italic first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-primary"
            >
              {{ letter.content }}
            </div>

            <div
              class="flex flex-col items-end mt-12 pt-8 border-t-2 border-primary/10"
            >
              <span class="text-2xl font-black text-primary mb-1">
                {{ letter.signature }}
              </span>
              <span
                class="text-sm font-bold opacity-60 tracking-widest uppercase"
              >
                {{ letter.date }}
              </span>
            </div>

            <button
              @click="close"
              class="mt-12 w-full py-4 bg-primary text-white font-black rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl uppercase tracking-[0.2em]"
            >
              {{ $t("hero_letter_modal.button") }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.parchment-texture {
  background-image: url("https://www.transparenttextures.com/patterns/parchment.png");
}

.letter-fade-enter-active,
.letter-fade-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.letter-fade-enter-from,
.letter-fade-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(40px);
}

@keyframes letter-unroll {
  0% {
    max-height: 0;
    opacity: 0;
    transform: rotateX(-90deg);
  }
  100% {
    max-height: 1000px;
    opacity: 1;
    transform: rotateX(0deg);
  }
}

.animate-letter-unroll {
  transform-origin: top;
  animation: letter-unroll 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

h2,
.font-serif {
  font-family: "Times New Roman", Times, serif;
}
</style>
