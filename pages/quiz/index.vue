<script setup lang="ts">
import { useQuizStore } from "~/stores/quizStore";

useHead({
  title: "Đấu trường Trí tuệ - Lịch sử Nhí",
  meta: [
    {
      name: "description",
      content:
        "Thử thách kiến thức lịch sử Việt Nam qua các câu đố vui nhộn và nhận những huy hiệu danh giá.",
    },
  ],
});

const quizStore = useQuizStore();
</script>

<template>
  <div class="min-h-screen bg-background relative overflow-x-hidden">
    <!-- Decorative background -->
    <div
      class="fixed inset-0 pointer-events-none opacity-[0.15] quiz-pattern-bg"
    ></div>

    <div class="relative z-10">
      <UiPageHero
        tag="Thử thách kiến thức"
        titlePrimary="Đấu trường"
        titleHighlight="Trí Tuệ"
        subtitle="Rèn luyện trí nhớ và tinh thần ham học hỏi qua những câu đố lịch sử 4000 năm của dân tộc."
        icon="fluent-emoji:brain"
        accentColor="accent"
      />

      <div class="pb-32">
        <QuizDashboard />
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz-pattern-bg {
  background-image:
    radial-gradient(#ff6b6b 0.5px, transparent 0.5px),
    radial-gradient(#4ecdc4 0.5px, transparent 0.5px);
  background-size: 30px 30px;
  background-position:
    0 0,
    15px 15px;
}
</style>
