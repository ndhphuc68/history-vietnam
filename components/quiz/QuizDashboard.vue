<script setup lang="ts">
import { useHistoryData } from "~/composables/useHistoryData";
import { useQuizStore } from "~/stores/quizStore";
import { useProgressStore } from "~/stores/progressStore";

const historyData = useHistoryData();
const quizStore = useQuizStore();
const progressStore = useProgressStore();

const isEraReadyForMastery = (eraId: string) => {
  const era = historyData.eras.value.find((e) => e.id === eraId);
  if (!era) return false;
  return era.levels.every((level: any) =>
    progressStore.completedLessons.includes(level.lesson),
  );
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-12">
    <div v-for="era in historyData.eras.value" :key="era.id" class="mb-20">
      <!-- Era Header -->
      <div
        class="flex items-end justify-between mb-10 border-b-4 border-gray-100 pb-6"
      >
        <div class="flex items-center gap-6">
          <div
            class="w-20 h-20 rounded-[32px] bg-white shadow-xl flex items-center justify-center border-4 border-white overflow-hidden transform rotate-3"
          >
            <img
              :src="historyData.getEraThumbnail(era.id)"
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2
              class="text-3xl md:text-5xl font-black text-text uppercase tracking-tight"
            >
              {{ era.title }}
            </h2>
            <p class="text-text/60 font-bold text-lg">
              Khám phá kiến thức thời kỳ {{ era.title }}
            </p>
          </div>
        </div>

        <!-- Era Progress Badge -->
        <div class="hidden md:flex flex-col items-end">
          <div class="flex items-center gap-2 mb-1">
            <Icon
              v-if="isEraReadyForMastery(era.id)"
              name="fluent-emoji:crown"
              class="text-amber-400 text-3xl animate-bounce"
            />
            <span class="text-3xl font-black text-primary">
              {{
                era.levels.filter((l: any) =>
                  progressStore.completedLessons.includes(l.lesson),
                ).length
              }}/{{ era.levels.length }}
            </span>
          </div>
          <span
            class="text-xs font-black text-text/40 uppercase tracking-widest"
          >
            Bài học hoàn thành
          </span>
        </div>
      </div>

      <!-- Lessons Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <NuxtLink
          v-for="level in era.levels"
          :key="level.id"
          :to="`/lesson/${level.lesson}`"
          class="bg-white rounded-[32px] p-6 border-4 transition-all hover:scale-[1.03] active:scale-[0.97] group"
          :class="[
            progressStore.completedLessons.includes(level.lesson)
              ? 'border-primary/20 shadow-lg'
              : 'border-gray-50 opacity-60 grayscale',
          ]"
        >
          <div class="flex flex-col h-full">
            <div class="flex items-start justify-between mb-4">
              <div
                class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner bg-gray-50"
              >
                <Icon
                  v-if="quizStore.isMastered(level.lesson)"
                  name="fluent-emoji:check-mark-button"
                  class="text-green-500"
                />
                <Icon
                  v-else
                  name="fluent-emoji:closed-book"
                  class="text-gray-300"
                />
              </div>

              <div
                v-if="quizStore.quizScores[level.lesson]"
                class="text-sm font-black text-primary bg-primary/10 px-3 py-1 rounded-full"
              >
                {{ quizStore.quizScores[level.lesson] }}%
              </div>
            </div>

            <h3
              class="font-black text-text text-xl leading-tight mb-2 group-hover:text-primary transition-colors"
            >
              {{ level.title }}
            </h3>

            <div
              class="mt-auto pt-4 flex items-center text-sm font-bold opacity-60"
            >
              <span
                v-if="progressStore.completedLessons.includes(level.lesson)"
              >
                Xem lại bài học
              </span>
              <span v-else>Cần hoàn thành bài học</span>
              <Icon
                name="lucide:arrow-right"
                class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
              />
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Mastery Quiz CTA -->
      <div
        class="bg-gradient-to-r from-secondary/5 to-primary/5 rounded-[40px] p-8 md:p-12 border-4 border-dashed border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8"
        :class="{
          'opacity-50 grayscale pointer-events-none': !isEraReadyForMastery(
            era.id,
          ),
        }"
      >
        <div class="text-center md:text-left">
          <div
            class="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary text-white rounded-full text-xs font-black uppercase mb-4"
          >
            <Icon name="fluent-emoji:shield" /> Thử thách tối thượng
          </div>
          <h3 class="text-3xl font-black text-text mb-2">
            Đấu trường {{ era.title }}
          </h3>
          <p class="text-text/60 font-medium text-lg max-w-xl">
            Sẵn sàng để trở thành **Bậc thầy Lịch sử** thời kỳ này? Hoàn thành
            ngay 10 câu hỏi ngẫu nhiên và nhận huy hiệu danh giá!
          </p>
        </div>

        <NuxtLink
          :to="`/quiz/mastery/${era.id}`"
          class="px-12 py-5 bg-secondary text-white text-2xl font-black rounded-[24px] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group"
        >
          BẮT ĐẦU THÁCH ĐỨC
          <Icon
            name="fluent-emoji:crossed-swords"
            class="group-hover:rotate-12 transition-transform"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
