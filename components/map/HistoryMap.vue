<script setup lang="ts">
import { useProgressStore } from "~/stores/progressStore";
import { useQuizStore } from "~/stores/quizStore";
import { useHistoryData } from "~/composables/useHistoryData";
import type { HistoryMapProps } from "~/types/props/map";

const props = defineProps<HistoryMapProps>();

const progressStore = useProgressStore();
const quizStore = useQuizStore();
const { isLessonAvailable } = useHistoryData();

const isEraMastered = (eraId: string) => {
  const era = props.eras.find((e) => e.id === eraId);
  if (!era || !era.levels) return false;
  return era.levels.every((level) =>
    quizStore.masteredQuizzes.includes(level.lesson),
  );
};

const getGlobalIndex = (eraIndex: number, levelIndex: number) => {
  let count = 0;
  for (let i = 0; i < eraIndex; i++) {
    count += props.eras[i]?.levels?.length || 0;
  }
  return count + levelIndex;
};

const totalLessons = computed(() => {
  return props.eras.reduce((acc, era) => acc + (era.levels?.length || 0), 0);
});

const currentEra = computed(() => {
  if (!props.eras || props.eras.length === 0) return { title: "Đang tải..." };
  // Find the first era with an uncompleted lesson
  for (const era of props.eras) {
    if (
      era.levels?.some(
        (l) => !progressStore.completedLessons.includes(l.lesson),
      )
    ) {
      return era;
    }
  }
  return props.eras[props.eras.length - 1]; // Default to last if all done
});

const totalCompletedNodes = computed(() => {
  let count = 0;
  let stop = false;
  for (const era of props.eras) {
    for (const level of era.levels || []) {
      if (progressStore.completedLessons.includes(level.lesson)) {
        count++;
      } else {
        stop = true;
        break;
      }
    }
    if (stop) break;
  }
  return count;
});

const progressLineHeightPercent = computed(() => {
  if (totalLessons.value === 0) return 0;
  // A rough estimate: progress based on the last completed node's position
  // We can also just use completed percentage for simplicity if nodes are evenly spaced
  return (totalCompletedNodes.value / totalLessons.value) * 100;
});
</script>

<template>
  <div
    class="relative py-20 flex flex-col items-center w-full max-w-4xl mx-auto"
  >
    <MapProgressHeader
      v-if="currentEra"
      :total-lessons="totalLessons"
      :current-era-title="currentEra.title"
    />

    <!-- Central Timeline Line (Playful Dashed Line Background) -->
    <div
      class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-2 z-0 border-l-4 border-dashed border-text/10"
    ></div>

    <!-- Active Progress Line Overlay -->
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-2 z-0 border-l-6 border-primary transition-all duration-1000 ease-in-out shadow-[0_0_15px_rgba(26,83,92,0.3)]"
      :style="{ height: `${progressLineHeightPercent}%`, top: '80px' }"
    ></div>

    <!-- Eras Loop -->
    <div
      v-for="(era, eraIndex) in eras"
      :key="era.id"
      class="w-full flex flex-col items-center mb-32 last:mb-0 relative"
    >
      <div
        class="mb-16 md:mb-24 w-full flex justify-start md:justify-center z-20 px-4 md:px-0"
      >
        <div
          class="relative w-full max-w-[calc(100%-1rem)] md:max-w-2xl bg-white p-6 md:p-8 rounded-[30px] md:rounded-[50px] shadow-2xl overflow-hidden border-4 md:border-8 border-white group hover:scale-[1.05] transition-transform duration-500 ml-2 md:ml-0"
        >
          <!-- Decorative Background Blobs -->
          <div
            class="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl group-hover:scale-110 transition-transform"
          ></div>
          <div
            class="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl group-hover:scale-110 transition-transform"
          ></div>

          <div class="relative flex flex-col items-center text-center gap-4">
            <div
              class="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl md:rounded-3xl flex items-center justify-center p-1 shadow-xl group-hover:scale-110 transition-transform duration-500 overflow-hidden border-4 border-background"
            >
              <UiLazyImage
                src="/images/vn-flag-official.png"
                alt="Cờ Việt Nam"
                class="w-full h-full object-cover rounded-xl md:rounded-2xl"
              />
            </div>
            <h2
              class="text-2xl md:text-4xl font-black text-text tracking-tight leading-tight uppercase drop-shadow-sm px-2 flex items-center justify-center gap-3"
            >
              <Icon
                v-if="isEraMastered(era.id)"
                name="fluent-emoji:crown"
                class="text-3xl md:text-5xl animate-bounce"
              />
              {{ era.title }}
              <Icon
                v-if="isEraMastered(era.id)"
                name="fluent-emoji:crown"
                class="text-3xl md:text-5xl animate-bounce"
              />
            </h2>
            <div class="h-2 w-24 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>

      <div
        v-for="(level, levelIndex) in era.levels"
        :key="level.id"
        class="w-full relative z-10 py-16 md:py-24"
      >
        <div class="flex justify-center w-full px-6 md:px-0">
          <MapNode
            :id="level.id"
            :title="level.title"
            :lesson-id="level.lesson"
            :is-completed="
              progressStore.completedLessons.includes(level.lesson)
            "
            :is-unlocked="isLessonAvailable(level.lesson)"
            :is-current="
              !progressStore.completedLessons.includes(level.lesson) &&
              getGlobalIndex(eraIndex, levelIndex) === totalCompletedNodes
            "
            :year="level.year"
            :align="
              getGlobalIndex(eraIndex, levelIndex) % 2 === 0 ? 'right' : 'left'
            "
          />
        </div>

        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white border-[6px] border-primary rounded-full shadow-2xl z-30 transition-all hover:scale-125 flex items-center justify-center p-1"
        >
          <div
            class="w-full h-full bg-primary/20 rounded-full animate-ping"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Individual node sections need to be wide to allow left/right content without overlapping the trunk too much */
.w-full {
  position: relative;
}
</style>
