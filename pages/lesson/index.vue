<script setup lang="ts">
import { useProgressStore } from "~/stores/progressStore";
import historyMap from "~/content/history-map.json";

const progressStore = useProgressStore();

// Dynamically check all available lesson content from the content/lessons directory
const lessonFiles = import.meta.glob("../../content/lessons/**/*.json", {
  eager: true,
});

const availableLessonIds = computed(() => {
  return Object.keys(lessonFiles).map((path) => {
    const filename = path.split("/").pop() || "";
    return filename.replace(".json", "");
  });
});

const eras = computed(() => historyMap.eras);

const getEraThumbnail = (eraId: string) => {
  return `/images/eras/${eraId}.webp`;
};

const getLessonThumbnail = (lessonId: string) => {
  const fileKey = Object.keys(lessonFiles).find((path) =>
    path.endsWith(`/${lessonId}.json`),
  );
  if (fileKey) {
    const module = (lessonFiles as any)[fileKey];
    const data = module.default || module;
    return data.image;
  }
  return null;
};
</script>

<template>
  <div class="min-h-screen bg-[#F7FFF7] pb-24">
    <!-- Hero Header -->
    <div class="bg-[#1A535C] pt-24 pb-32 px-4 relative overflow-hidden">
      <!-- Decorative Elements -->
      <div
        class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
      >
        <div
          class="absolute top-10 left-10 w-32 h-32 border-8 border-white rounded-full"
        ></div>
        <div
          class="absolute bottom-10 right-10 w-64 h-64 border-8 border-white rounded-full"
        ></div>
      </div>

      <div class="max-w-5xl mx-auto text-center relative z-10 animate-fade-in">
        <h1
          class="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg"
        >
          Dòng Máu Lạc Hồng
        </h1>
        <p
          class="text-xl md:text-2xl text-[#4ECDC4] font-bold max-w-3xl mx-auto leading-relaxed"
        >
          Khám phá hành trình 4000 năm lịch sử hào hùng của dân tộc Việt Nam qua
          những câu chuyện kể sinh động.
        </p>
      </div>

      <!-- Wave Divider -->
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          class="relative block w-full h-16 fill-[#F7FFF7]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105.1,118.44,110.15,178,105.15,237.56,100.15,296.44,85.15,321.39,56.44Z"
          ></path>
        </svg>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
      <!-- Eras Navigation (Optional/Mini Map) -->
      <div class="overflow-x-auto pb-8 mb-8 no-scrollbar">
        <div class="flex gap-4 min-w-max px-2">
          <a
            v-for="era in eras"
            :key="era.id"
            :href="`#${era.id}`"
            class="px-6 py-3 bg-white rounded-full shadow-md font-black text-[#1A535C] hover:bg-[#FF6B6B] hover:text-white transition-all whitespace-nowrap border-2 border-white hover:border-[#FF6B6B]"
          >
            {{ era.title }}
          </a>
        </div>
      </div>

      <!-- Eras Sections -->
      <div
        v-for="(era, index) in eras"
        :id="era.id"
        :key="era.id"
        class="mb-24 scroll-mt-24"
      >
        <!-- Era Header -->
        <div
          class="flex flex-col md:flex-row items-center gap-10 mb-12 animate-slide-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div
            class="w-full md:w-[40%] aspect-video rounded-[40px] overflow-hidden shadow-2xl border-8 border-white bg-white/50 relative group"
          >
            <UiLazyImage
              :src="getEraThumbnail(era.id)"
              class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              :alt="era.title"
              @error="
                (e: Event) =>
                  ((e.target as HTMLImageElement).src =
                    '/images/history/default-era.png')
              "
            />
            <!-- Overlay for better depth -->
            <div
              class="absolute inset-0 shadow-[inset_0_2px_15px_rgba(0,0,0,0.05)] pointer-events-none"
            ></div>
          </div>
          <div class="flex-1 text-center md:text-left">
            <h2
              class="text-3xl md:text-5xl font-black text-[#1A535C] mb-6 drop-shadow-sm"
            >
              {{ era.title }}
            </h2>
            <div
              class="h-3 w-40 bg-[#FF6B6B] rounded-full mx-auto md:mx-0 shadow-sm"
            ></div>
          </div>
        </div>

        <!-- Lessons Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <LessonCard
            v-for="level in era.levels"
            :key="level.id"
            :id="level.lesson"
            :title="level.title"
            :period="era.title"
            :thumbnail="getLessonThumbnail(level.lesson)"
            :era-thumbnail="getEraThumbnail(era.id)"
            :is-locked="!availableLessonIds.includes(level.lesson)"
            :is-completed="
              progressStore.completedLessons.includes(level.lesson)
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slideUp 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
</style>
