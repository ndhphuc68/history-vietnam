<script setup lang="ts">
import { useProgressStore } from '~/stores/progressStore';

const route = useRoute();
const router = useRouter();
const progressStore = useProgressStore();

const lessonId = route.params.id as string;
const lessonData = ref<any>(null);
const currentSlideIndex = ref(0);
const quizSuccess = ref(false);

// Fetch lesson data
onMounted(async () => {
  try {
    // Dynamic import of JSON content
    const data = await import(`../../content/lessons/${lessonId}.json`);
    lessonData.value = data.default;
    progressStore.setCurrentLesson(lessonId);
  } catch (error) {
    console.error('Failed to load lesson data:', error);
    // Redirect to home if lesson not found
    router.push('/');
  }
});

const currentSlide = computed(() => {
  if (!lessonData.value) return null;
  return lessonData.value.slides[currentSlideIndex.value];
});

const progressPercent = computed(() => {
  if (!lessonData.value) return 0;
  return ((currentSlideIndex.value + 1) / lessonData.value.slides.length) * 100;
});

const nextSlide = () => {
  if (currentSlideIndex.value < lessonData.value.slides.length - 1) {
    currentSlideIndex.value++;
    quizSuccess.value = false;
  } else {
    // Finished lesson
    progressStore.completeLesson(lessonId);
    router.push('/');
  }
};

const prevSlide = () => {
  if (currentSlideIndex.value > 0) {
    currentSlideIndex.value--;
    quizSuccess.value = false;
  }
};

const handleQuizAnswer = (correct: boolean) => {
  if (correct) {
    quizSuccess.value = true;
  }
};
</script>

<template>
  <div class="min-h-[calc(100vh-80px)] bg-[#F7FFF7] pb-24">
    <div v-if="lessonData" class="max-w-4xl mx-auto px-4 pt-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-black text-[#1A535C]">{{ lessonData.title }}</h1>
          <p class="text-[#4ECDC4] font-bold">{{ lessonData.period }}</p>
        </div>
        <div class="text-[#1A535C] font-bold bg-white px-4 py-2 rounded-full shadow-sm">
           Slide {{ currentSlideIndex + 1 }} / {{ lessonData.slides.length }}
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="w-full h-4 bg-gray-200 rounded-full mb-12 overflow-hidden shadow-inner">
        <div 
          class="h-full bg-[#FF6B6B] transition-all duration-500 ease-out"
          :style="{ width: `${progressPercent}%` }"
        ></div>
      </div>

      <!-- Slide Content -->
      <div class="mb-12">
        <transition name="slide" mode="out-in">
          <div :key="currentSlideIndex">
            <LessonStorySlide 
              v-if="currentSlide?.type === 'story'" 
              :text="currentSlide.text" 
            />
            <LessonQuizSlide 
              v-else-if="currentSlide?.type === 'quiz'" 
              :question="currentSlide.question"
              :options="currentSlide.options"
              :answer="currentSlide.answer"
              @answered="handleQuizAnswer"
            />
          </div>
        </transition>
      </div>

      <!-- Navigation -->
      <div class="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-100 p-4 z-40">
        <div class="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            @click="prevSlide"
            :disabled="currentSlideIndex === 0"
            class="px-8 py-3 rounded-full font-bold border-4 border-[#1A535C] text-[#1A535C] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1A535C] hover:text-white transition-all"
          >
            Quay lại
          </button>

          <button 
            v-if="currentSlide?.type === 'story' || (currentSlide?.type === 'quiz' && quizSuccess)"
            @click="nextSlide"
            class="btn-primary px-12 py-3 text-xl animate-bounce-horizontal"
          >
            {{ currentSlideIndex === lessonData.slides.length - 1 ? 'Hoàn thành' : 'Tiếp theo' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="flex items-center justify-center min-h-[50vh]">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF6B6B]"></div>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

@keyframes bounceHorizontal {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
}

.animate-bounce-horizontal {
  animation: bounceHorizontal 1s infinite;
}
</style>
