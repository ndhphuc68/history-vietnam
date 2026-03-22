<script setup lang="ts">
/**
 * GlossaryTerm component that highlights a historical term
 * and shows its definition in a popover when clicked.
 */
interface Props {
  term: string;
  id?: string;
}

import { useGlossary } from "~/composables/useGlossary";
import { useBadgeStore } from "~/stores/badgeStore";

const props = defineProps<Props>();
const { getTerm } = useGlossary();
const badgeStore = useBadgeStore();

const termData = computed(() => getTerm(props.id || props.term));
const isOpen = ref(false);
const termRef = ref<HTMLElement | null>(null);

const toggle = (e: Event) => {
  e.stopPropagation();
  if (termData.value) {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      badgeStore.trackGlossaryView();
    }
  }
};

// Close when clicking outside
onMounted(() => {
  if (typeof window !== "undefined") {
    window.addEventListener("click", () => {
      isOpen.value = false;
    });
  }
});
</script>

<template>
  <span class="inline-block relative group/term">
    <button
      ref="termRef"
      type="button"
      @click="toggle"
      class="inline font-bold text-secondary border-b-2 border-dashed border-secondary/40 hover:border-secondary transition-colors cursor-help"
      :class="{ 'border-secondary bg-secondary/5': isOpen }"
    >
      <slot>{{ term }}</slot>
    </button>

    <!-- Popover -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0 -translate-y-2"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 -translate-y-2"
    >
      <div
        v-if="isOpen && termData"
        class="absolute z-[100] bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 md:w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-5 border-2 border-secondary/20 animate-float"
        @click.stop
      >
        <!-- Arrow -->
        <div
          class="absolute top-full left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-800 border-r-2 border-b-2 border-secondary/20 rotate-45 -mt-2"
        ></div>

        <div class="relative">
          <div class="flex items-center gap-2 mb-2">
            <div
              class="w-6 h-6 bg-secondary/20 rounded-lg flex items-center justify-center text-secondary"
            >
              <Icon name="fluent-emoji:light-bulb" size="14" />
            </div>
            <span
              class="text-[10px] font-black text-secondary uppercase tracking-widest"
            >
              {{ termData.category || $t("glossary_ui.category_default") }}
            </span>
          </div>

          <h4 class="text-xl font-black text-text dark:text-white mb-2">
            {{ termData.term }}
          </h4>
          <p
            class="text-text/80 dark:text-slate-300 text-sm font-bold leading-relaxed"
          >
            {{ termData.definition }}
          </p>

          <div class="mt-4 flex justify-end">
            <button
              @click="isOpen = false"
              class="text-[10px] font-black text-text/40 dark:text-slate-500 hover:text-primary dark:hover:text-primary uppercase"
            >
              {{ $t("glossary_ui.got_it") }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </span>
</template>

<style scoped>
.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translate(-50%, 0px);
  }
  50% {
    transform: translate(-50%, -5px);
  }
}
</style>
