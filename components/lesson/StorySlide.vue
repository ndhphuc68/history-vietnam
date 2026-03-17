<script setup lang="ts">
/**
 * Component to display story-based content for children.
 */
interface Props {
  text: string;
  image?: string;
  canNext?: boolean;
  showPrev?: boolean;
  nextLabel?: string;
  nextIcon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  canNext: true,
  showPrev: true,
  nextLabel: "TIẾP THEO",
  nextIcon: "lucide:arrow-right",
});

defineEmits(["next", "prev"]);
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4 md:p-8 h-full">
    <!-- Storybook Frame -->
    <div
      class="max-w-5xl w-full bg-white rounded-[40px] shadow-[rgba(0,0,0,0.16)_0px_1px_4px] overflow-hidden border-8 border-white p-6 md:p-10 flex flex-col gap-8 transition-all duration-500 h-full min-h-[550px]"
    >
      <!-- Top Content Section (Horizontal) -->
      <div class="flex flex-col md:flex-row gap-8 flex-1 min-h-0 items-center">
        <!-- Image Section -->
        <div
          v-if="image"
          class="group w-full md:w-[60%] h-64 md:h-full bg-[#fdfaf5] rounded-[35px] overflow-hidden relative border-4 border-[#E9D5CA] shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:scale-[1.02]"
        >
          <UiLazyImage
            :src="image"
            class="w-full h-full object-cover rounded-[30px] p-2 transition-transform duration-700 group-hover:scale-110"
            alt="Illustration"
          />
          <!-- Inner shadow for depth -->
          <div
            class="absolute inset-0 shadow-[inset_0_2px_15px_rgba(0,0,0,0.08)] pointer-events-none rounded-[30px]"
          ></div>

          <!-- Decorative corners -->
          <div
            class="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#1A535C]/20 rounded-tl-lg"
          ></div>
          <div
            class="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#1A535C]/20 rounded-br-lg"
          ></div>
        </div>

        <!-- Placeholder if no image -->
        <div
          v-else
          class="w-full md:w-[60%] aspect-square md:aspect-auto md:h-full flex flex-col items-center justify-center bg-[#F7FFF7] rounded-[35px] border-4 border-dashed border-[#1A535C]/10"
        >
          <Icon name="fluent-emoji:scroll" class="text-8xl animate-bounce" />
        </div>

        <!-- Story Text Section -->
        <div
          class="w-full md:w-[40%] flex items-center justify-center px-4 text-center"
        >
          <p
            class="text-xl md:text-2xl font-black text-[#1A535C] italic leading-relaxed drop-shadow-sm px-4"
          >
            "{{ text }}"
          </p>
        </div>
      </div>

      <!-- Navigation Row (Bottom) -->
      <div
        class="flex items-center justify-between gap-6 pt-6 border-t-2 border-dashed border-gray-100 mt-auto"
      >
        <button
          v-if="showPrev"
          @click="$emit('prev')"
          class="flex-1 max-w-[200px] px-8 py-5 rounded-2xl font-black text-xl border-4 border-[#1A535C] text-[#1A535C] hover:bg-[#1A535C] hover:text-white hover:scale-[1.05] active:scale-[0.95] transition-all whitespace-nowrap shadow-md"
        >
          QUAY LẠI
        </button>
        <div v-else class="flex-1 max-w-[200px]"></div>

        <LessonNextButton
          v-if="canNext"
          :label="nextLabel"
          @click="$emit('next')"
          class="flex-1 max-w-[400px]"
        >
          <template #icon>
            <Icon v-if="nextIcon" :name="nextIcon" />
          </template>
        </LessonNextButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
