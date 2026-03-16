<script setup lang="ts">
/**
 * Component to display story-based content for children.
 */
interface Props {
  text: string;
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[400px] p-6 text-center animate-fade-in">
    <div class="card max-w-2xl w-full bg-white border-t-8 border-[#FF6B6B] transform transition-all hover:scale-[1.01]">
      <div class="mb-8 text-6xl">✨</div>
      <p class="text-3xl md:text-4xl font-black text-[#1A535C] leading-relaxed mb-4">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
