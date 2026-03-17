<script setup lang="ts">
/**
 * Component to display a quiz slide for children.
 */
interface Props {
  question: string;
  options: string[];
  answer: string;
  canNext?: boolean;
  showPrev?: boolean;
  nextLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  canNext: false,
  showPrev: true,
  nextLabel: "TIẾP THEO",
});

const emit = defineEmits(["answered", "next", "prev"]);

const selectedOption = ref<string | null>(null);
const isCorrect = ref<boolean | null>(null);

const checkAnswer = (option: string) => {
  if (selectedOption.value !== null) return;

  selectedOption.value = option;
  isCorrect.value = option === props.answer;

  if (isCorrect.value) {
    emit("answered", true);
  }
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in"
  >
    <div
      class="max-w-xl w-full bg-white rounded-[40px] shadow-2xl p-10 border-8 border-white relative overflow-hidden"
    >
      <!-- Decorative Background -->
      <div
        class="absolute -top-10 -right-10 w-40 h-40 bg-[#4ECDC4]/10 rounded-full blur-3xl"
      ></div>

      <div class="relative z-10 text-center mb-10">
        <span
          class="inline-block px-6 py-2 bg-[#FFE66D] text-[#1A535C] font-black rounded-full text-sm uppercase mb-6 shadow-sm"
        >
          <Icon name="fluent-emoji:brain" class="mr-2" /> CÂU ĐỐ VUI
        </span>
        <h2
          class="text-3xl md:text-4xl font-black text-[#1A535C] leading-tight"
        >
          {{ question }}
        </h2>
      </div>

      <div class="relative z-10 space-y-4">
        <button
          v-for="option in options"
          :key="option"
          @click="checkAnswer(option)"
          :disabled="selectedOption !== null"
          class="w-full text-center px-8 py-5 rounded-2xl border-4 text-2xl font-black transition-all transform hover:scale-[1.05] active:scale-[0.95]"
          :class="[
            selectedOption === null
              ? 'border-gray-100 text-[#1A535C] hover:border-[#4ECDC4] bg-gray-50'
              : '',
            selectedOption === option && option === answer
              ? 'border-green-500 bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.3)] animate-bounce-correct text-white'
              : '',
            selectedOption === option && option !== answer
              ? 'border-red-500 bg-red-500 text-white animate-shake'
              : '',
            selectedOption !== null &&
            option === answer &&
            selectedOption !== answer
              ? 'border-green-500 text-green-600 bg-green-50'
              : '',
            selectedOption !== null &&
            option !== answer &&
            selectedOption !== option
              ? 'opacity-40 grayscale'
              : '',
          ]"
        >
          {{ option }}
        </button>
      </div>

      <!-- Feedback Overlay & Navigation -->
      <div class="mt-12 text-center relative z-10">
        <transition name="pop" mode="out-in">
          <div v-if="selectedOption !== null" class="mb-8">
            <p
              v-if="isCorrect"
              class="text-3xl font-black text-green-600 drop-shadow-sm"
            >
              Tình yêu ơi! Bạn giỏi quá!
              <Icon name="fluent-emoji:party-popper" class="text-4xl" />
            </p>
            <div v-else class="flex flex-col items-center">
              <p class="text-3xl font-black text-red-500 drop-shadow-sm">
                Ôi, chưa đúng rồi!
                <Icon name="fluent-emoji:lightbulb" class="text-4xl" />
              </p>
              <button
                @click="
                  selectedOption = null;
                  isCorrect = null;
                "
                class="mt-4 px-6 py-2 bg-[#4ECDC4] text-white font-black rounded-full shadow-lg hover:scale-[1.05] active:scale-[0.95] transition-transform"
              >
                Thử lại ngay
              </button>
            </div>
          </div>
        </transition>

        <!-- Navigation inside the card -->
        <div class="flex items-center gap-4 border-t-2 border-gray-50 pt-8">
          <button
            v-if="showPrev"
            @click="$emit('prev')"
            class="px-6 py-3 rounded-2xl font-black text-sm border-4 border-[#1A535C] text-[#1A535C] hover:bg-[#1A535C] hover:text-white hover:scale-[1.05] active:scale-[0.95] transition-all"
          >
            QUAY LẠI
          </button>

          <button
            v-if="canNext"
            @click="$emit('next')"
            class="flex-1 py-4 bg-[#FF6B6B] text-white text-xl font-black rounded-2xl shadow-lg hover:scale-[1.05] active:scale-[0.95] transition-all animate-bounce"
          >
            {{ nextLabel }} <Icon name="lucide:arrow-right" class="ml-2" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

.animate-shake {
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.animate-bounce-correct {
  animation: bounceCorrect 0.8s ease-out both;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

@keyframes bounceCorrect {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.1) translateY(-10px);
  }
  50% {
    transform: scale(0.95) translateY(0);
  }
  70% {
    transform: scale(1.05) translateY(-5px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
}

.pop-enter-active {
  animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
