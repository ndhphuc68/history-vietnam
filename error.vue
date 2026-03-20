<script setup lang="ts">
/**
 * Custom error page for Nuxt 3.
 * Handles 404 and other application errors with a premium, child-friendly design.
 */
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();
const localePath = useLocalePath();
const handleError = () => clearError({ redirect: localePath("/") });
</script>

<template>
  <div
    class="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden"
  >
    <!-- Decorative Background -->
    <div class="absolute inset-0 pointer-events-none opacity-20">
      <div
        class="absolute top-[15%] left-[10%] w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-[10%] right-[15%] w-80 h-80 bg-secondary rounded-full blur-3xl"
      ></div>
    </div>

    <div class="max-w-2xl w-full text-center relative z-10">
      <!-- Illustration Area -->
      <div class="mb-12 relative inline-block group">
        <div
          class="absolute inset-0 bg-accent rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"
        ></div>
        <Icon
          name="fluent-emoji:hourglass-done"
          class="text-[120px] md:text-[180px] animate-float relative z-10 select-none"
        />
        <div
          class="absolute -bottom-4 left-1/2 -translate-x-1/2 text-9xl opacity-10 font-black"
        >
          404
        </div>
      </div>

      <h1
        class="text-4xl md:text-6xl font-black text-text mb-6 leading-tight"
        v-html="$t('error_page.title')"
      ></h1>

      <p
        class="text-xl text-text/70 font-medium mb-12 max-w-md mx-auto leading-relaxed"
      >
        {{ $t("error_page.description") }}
      </p>

      <div class="flex flex-col sm:flex-row gap-6 justify-center">
        <button
          @click="handleError"
          class="px-10 py-4 bg-primary text-white font-black text-xl rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <Icon name="fluent-emoji:house" /> {{ $t("error_page.back_home") }}
        </button>
        <NuxtLink
          :to="localePath('/map')"
          @click="clearError()"
          class="px-10 py-4 bg-white text-text font-black text-xl rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 border-2 border-text/5"
        >
          <Icon name="fluent-emoji:world-map" /> {{ $t("error_page.view_map") }}
        </NuxtLink>
      </div>

      <!-- Secret Historical Fact -->
      <div
        class="mt-20 p-6 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-text/10 max-w-sm mx-auto"
      >
        <p class="text-sm font-bold text-text/60 italic">
          "{{ $t("error_page.did_you_know") }}"
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-float {
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

/* Base fade-in for the whole page */
.max-w-2xl {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
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
