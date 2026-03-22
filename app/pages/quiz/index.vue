<script setup lang="ts">
import { useQuizStore } from "~/stores/quizStore";
import { useProgressStore } from "~/stores/progressStore";

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
const progressStore = useProgressStore();
const localePath = useLocalePath();
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

      <div class="max-w-7xl mx-auto px-6 mb-12">
        <!-- Global Challenge CTA -->
        <div
          class="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 rounded-[48px] p-8 md:p-16 border-8 border-white dark:border-slate-800 shadow-2xl relative overflow-hidden group"
          :class="{
            'opacity-60 grayscale cursor-not-allowed':
              progressStore.completedLessons.length === 0,
          }"
        >
          <!-- Decorative elements -->
          <div
            class="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:scale-110 transition-transform duration-1000"
          ></div>
          <div
            class="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] group-hover:scale-110 transition-transform duration-1000"
          ></div>

          <div
            class="relative z-10 flex flex-col items-center text-center gap-8"
          >
            <div
              class="w-24 h-24 bg-white dark:bg-slate-700 rounded-[32px] shadow-xl flex items-center justify-center text-5xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-500"
            >
              <Icon name="fluent-emoji:glowing-star" />
            </div>

            <div>
              <h2 class="text-4xl md:text-6xl font-black text-text mb-4">
                Thử thách
                <span class="text-primary tracking-tighter">TOÀN THƯ</span>
              </h2>
              <p
                class="text-xl md:text-2xl font-bold text-text/70 max-w-2xl mx-auto leading-relaxed"
              >
                Tất cả kiến thức từ các thời kỳ lịch sử đã học sẽ hội tụ tại
                đây. Bạn có đủ bản lĩnh để trả lời đúng 20 câu hỏi ngẫu nhiên?
              </p>
            </div>

            <NuxtLink
              v-if="progressStore.completedLessons.length > 0"
              :to="localePath('/quiz/total')"
              class="px-12 py-5 bg-primary text-white text-2xl font-black rounded-[24px] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
            >
              CHINH PHỤC NGAY
              <Icon name="fluent-emoji:rocket" class="animate-bounce" />
            </NuxtLink>
            <div v-else class="flex flex-col items-center gap-2">
              <span
                class="text-red-500 font-black uppercase tracking-widest bg-red-50 dark:bg-red-900/20 px-4 py-1 rounded-full text-sm"
              >
                Hãy hoàn thành ít nhất 1 bài học để mở khóa
              </span>
              <NuxtLink
                :to="localePath('/lesson')"
                class="text-primary font-bold hover:underline"
              >
                Đến phòng học ngay
                <Icon name="lucide:arrow-right" class="inline w-4 h-4" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="pb-32">
        <QuizDashboard />
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz-pattern-bg {
  background-image:
    radial-gradient(var(--primary) 0.5px, transparent 0.5px),
    radial-gradient(var(--secondary) 0.5px, transparent 0.5px);
  background-size: 30px 30px;
  background-position:
    0 0,
    15px 15px;
}
</style>
