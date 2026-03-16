<script setup lang="ts">
import { useProgressStore } from '~/stores/progressStore';

const progressStore = useProgressStore();

// Dynamically load all lessons from the content/lessons directory
const lessonFiles = import.meta.glob('../../content/lessons/*.json', { eager: true });

const lessons = computed(() => {
  return Object.values(lessonFiles).map((file: any) => file.default);
});

// Grouping lessons by historical period for better organization
const groupedLessons = computed(() => {
  const groups: Record<string, any[]> = {};
  lessons.value.forEach(lesson => {
    const period = lesson.period || 'Khác';
    if (!groups[period]) {
      groups[period] = [];
    }
    groups[period].push(lesson);
  });
  return groups;
});
</script>

<template>
  <div class="min-h-screen bg-[#F7FFF7] py-16 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-6xl font-black text-[#1A535C] mb-4">
          Phòng Truyền Thống
        </h1>
        <p class="text-xl text-[#1A535C] opacity-75 max-w-2xl mx-auto">
          Chọn một câu chuyện lịch sử hào hùng để bắt đầu hành trình khám phá 4000 năm dựng nước và giữ nước.
        </p>
      </div>

      <!-- Lessons Grid grouped by period -->
      <div v-for="(periodLessons, period) in groupedLessons" :key="period" class="mb-16">
        <div class="flex items-center gap-4 mb-8">
          <h2 class="text-2xl font-black text-[#FF6B6B] whitespace-nowrap">{{ period }}</h2>
          <div class="h-1 flex-grow bg-gray-200 rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <LessonCard 
            v-for="lesson in periodLessons" 
            :key="lesson.id"
            :id="lesson.id"
            :title="lesson.title"
            :summary="lesson.summary"
            :period="lesson.period"
            :is-completed="progressStore.completedLessons.includes(lesson.id)"
          />
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="lessons.length === 0" class="text-center py-20 bg-white rounded-3xl border-4 border-dashed border-gray-200">
        <p class="text-2xl font-bold text-gray-400 italic">Đang cập nhật thêm bài học mới...</p>
      </div>
    </div>
  </div>
</template>
