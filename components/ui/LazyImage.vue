<script setup lang="ts">
import type { LazyImageProps } from "~/types/props/ui";
/**
 * A robust lazy-loading image component using Intersection Observer.
 */
const props = withDefaults(defineProps<LazyImageProps>(), {
  alt: "Illustration",
  loading: "lazy",
});

const isVisible = ref(false);
const imgRef = ref<HTMLDivElement | null>(null);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (props.loading === "eager") {
    isVisible.value = true;
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        isVisible.value = true;
        if (imgRef.value) observer?.unobserve(imgRef.value);
      }
    },
    {
      rootMargin: "100px", // Preload when within 100px of viewport
    },
  );

  if (imgRef.value) {
    observer.observe(imgRef.value);
  }
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <div ref="imgRef" class="lazy-image-container relative">
    <transition name="fade">
      <img
        v-if="isVisible"
        :src="props.src"
        :alt="props.alt"
        class="w-full h-full"
        loading="lazy"
        v-bind="$attrs"
      />
      <div
        v-else
        class="absolute inset-0 bg-gray-100/50 animate-pulse flex items-center justify-center"
      >
        <!-- Optional: Add a small icon or loading state -->
        <span class="text-2xl opacity-20">🖼️</span>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.lazy-image-container {
  width: 100%;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
