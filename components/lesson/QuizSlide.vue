<script setup lang="ts">
/**
 * Component to display a quiz slide for children.
 */
interface Props {
  question: string;
  options: string[];
  answer: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['answered']);

const selectedOption = ref<string | null>(null);
const isCorrect = ref<boolean | null>(null);

const checkAnswer = (option: string) => {
  if (selectedOption.value !== null) return; // Prevent multiple clicks
  
  selectedOption.value = option;
  isCorrect.value = option === props.answer;
  
  if (isCorrect.value) {
    emit('answered', true);
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[500px] p-6 animate-fade-in">
    <div class="card max-w-2xl w-full bg-white border-t-8 border-[#4ECDC4]">
      <div class="mb-6 text-center">
        <span class="inline-block px-4 py-1 bg-[#FFE66D] text-[#1A535C] font-bold rounded-full text-sm uppercase mb-4">
          🧠 Câu đố vui
        </span>
        <h2 class="text-3xl font-black text-[#1A535C] leading-tight">{{ question }}</h2>
      </div>

      <div class="space-y-4">
        <button
          v-for="option in options"
          :key="option"
          @click="checkAnswer(option)"
          :disabled="selectedOption !== null"
          class="w-full text-left px-6 py-4 rounded-2xl border-4 text-xl font-bold transition-all transform"
          :class="[
            selectedOption === null 
              ? 'border-gray-100 hover:border-[#4ECDC4] hover:bg-[#F7FFF7] hover:-translate-y-1' 
              : '',
            selectedOption === option && option === answer
              ? 'border-green-400 bg-green-50 text-green-700'
              : '',
            selectedOption === option && option !== answer
              ? 'border-red-400 bg-red-50 text-red-700'
              : '',
            selectedOption !== null && option === answer && selectedOption !== answer
              ? 'border-green-400 bg-green-50'
              : ''
          ]"
        >
          <div class="flex items-center justify-between">
            <span>{{ option }}</span>
            <span v-if="selectedOption === option && option === answer" class="text-2xl">✅</span>
            <span v-if="selectedOption === option && option !== answer" class="text-2xl">❌</span>
          </div>
        </button>
      </div>

      <!-- Feedback -->
      <div v-if="selectedOption !== null" class="mt-8 text-center animate-bounce-in">
        <p v-if="isCorrect" class="text-2xl font-black text-green-600">
          Tuyệt vời! Bạn giỏi quá! 🎉
        </p>
        <p v-else class="text-2xl font-black text-red-500">
          Ôi, chưa chính xác rồi. Hãy thử lại xem nhé! 💡
        </p>
        <button 
          v-if="!isCorrect" 
          @click="selectedOption = null; isCorrect = null"
          class="mt-4 text-[#4ECDC4] font-bold underline"
        >
          Thử lại
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-bounce-in {
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounceIn {
  0% { opacity: 0; transform: scale(0.3); }
  50% { opacity: 1; transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); }
}
</style>
