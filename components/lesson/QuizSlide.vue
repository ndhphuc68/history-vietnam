<script setup lang="ts">
import type { QuizSlideProps } from "~/types/props/lesson";
/**
 * Component to display a quiz slide for children.
 */
const props = withDefaults(defineProps<QuizSlideProps>(), {
  canNext: false,
  showPrev: true,
  nextLabel: "TIẾP THEO",
  nextIcon: "lucide:arrow-right",
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
  <div class="flex flex-col items-center justify-center p-4 md:p-8">
    <div
      class="max-w-xl w-full bg-white rounded-[32px] md:rounded-[40px] shadow-[rgba(0,0,0,0.16)_0px_1px_4px] p-6 md:p-10 border-4 md:border-8 border-white relative overflow-hidden h-full min-h-[500px] md:min-h-[550px] flex flex-col"
    >
      <!-- Decorative Background -->
      <div
        class="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"
      ></div>

      <div class="relative z-10 text-center mb-8 md:mb-10">
        <span
          class="inline-flex items-center justify-center px-4 md:px-6 py-1.5 md:py-2 bg-accent text-text font-black rounded-full text-xs md:text-sm uppercase mb-6 shadow-sm"
        >
          <Icon name="fluent-emoji:brain" class="mr-2" size="20" /> CÂU ĐỐ VUI
        </span>
        <h2
          class="text-2xl md:text-3xl lg:text-4xl font-black text-text leading-tight px-2"
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
          class="w-full text-center px-6 md:px-8 py-4 md:py-5 rounded-2xl border-4 text-lg md:text-2xl font-black transition-all transform hover:scale-[1.05] active:scale-[0.95] shadow-[rgba(0,0,0,0.16)_0px_1px_4px]"
          :class="[
            selectedOption === null
              ? 'border-gray-100 text-text hover:border-secondary bg-gray-50'
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
              class="text-2xl md:text-3xl font-black text-green-600 drop-shadow-sm"
            >
              Tình yêu ơi! Bạn giỏi quá!
              <Icon
                name="fluent-emoji:party-popper"
                class="text-3xl md:text-4xl"
              />
            </p>
            <div v-else class="flex flex-col items-center">
              <p
                class="text-2xl md:text-3xl font-black text-red-500 drop-shadow-sm"
              >
                Ôi, chưa đúng rồi!
                <Icon
                  name="fluent-emoji:lightbulb"
                  class="text-3xl md:text-4xl"
                />
              </p>
              <button
                @click="
                  selectedOption = null;
                  isCorrect = null;
                "
                class="mt-4 px-6 py-2 bg-secondary text-white font-black rounded-full shadow-lg hover:scale-[1.05] active:scale-[0.95] transition-transform"
              >
                Thử lại ngay
              </button>
            </div>
          </div>
        </transition>

        <!-- Navigation inside the card -->
        <div
          class="flex items-center justify-between gap-6 pt-8 border-t-2 border-gray-50 mt-auto"
        >
          <button
            v-if="showPrev"
            @click="$emit('prev')"
            class="flex-1 max-w-[140px] md:max-w-[180px] px-4 md:px-6 py-3 md:py-4 rounded-2xl font-black text-sm md:text-xl border-4 border-text text-text hover:bg-text hover:text-white hover:scale-[1.05] active:scale-[0.95] transition-all shadow-md uppercase"
          >
            Quay lại
          </button>
          <div v-else class="flex-1 max-w-[180px]"></div>

          <LessonNextButton
            v-if="canNext"
            :label="nextLabel"
            @click="$emit('next')"
            class="flex-1 max-w-[350px] animate-bounce"
          >
            <template #icon>
              <Icon v-if="props.nextIcon" :name="props.nextIcon" />
            </template>
          </LessonNextButton>
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
