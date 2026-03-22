<script setup lang="ts">
interface Props {
  titlePrimary: string;
  titleHighlight: string;
  subtitle: string;
  tag: string;
  icon: string;
  accentColor?: "primary" | "secondary" | "accent";
}

const props = withDefaults(defineProps<Props>(), {
  accentColor: "primary",
});

const colorClasses: Record<string, string> = {
  primary: "bg-primary text-white border-primary/20",
  secondary: "bg-secondary text-white border-secondary/20",
  accent: "bg-accent text-text border-accent/20",
};
</script>

<template>
  <section class="relative pt-32 pb-16 px-4 text-center overflow-hidden">
    <!-- Decorative Background Shapes -->
    <div class="absolute inset-0 pointer-events-none opacity-20">
      <div
        class="absolute top-[10%] right-[10%] w-96 h-96 rounded-full blur-3xl animate-pulse"
        :class="
          accentColor === 'primary'
            ? 'bg-primary'
            : accentColor === 'secondary'
              ? 'bg-secondary'
              : 'bg-accent'
        "
      ></div>
      <div
        class="absolute bottom-[20%] left-[5%] w-72 h-72 rounded-full blur-3xl"
        :class="accentColor === 'secondary' ? 'bg-primary' : 'bg-secondary'"
      ></div>
    </div>

    <!-- Content -->
    <div
      class="max-w-5xl mx-auto relative z-10 animate-fade-in flex flex-col items-center"
    >
      <div
        class="inline-block px-6 py-2 mb-8 font-black rounded-full text-lg shadow-md border-2 border-white dark:border-slate-800 transform -rotate-1"
        :class="colorClasses[accentColor]"
      >
        <Icon :name="icon" class="mr-2" /> {{ tag }}
      </div>

      <h1
        class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-text leading-[1.1] md:leading-tight mb-8"
      >
        {{ titlePrimary }} <br v-if="titleHighlight" />
        <span
          v-if="titleHighlight"
          :class="'text-' + accentColor"
          class="relative inline-block mt-2"
        >
          {{ titleHighlight }}
          <!-- Decorative Underline -->
          <svg
            class="absolute -bottom-2 left-0 w-full"
            viewBox="0 0 300 12"
            fill="none"
          >
            <path
              d="M1 11C60 4 120 1 180 1C240 1 300 11 300 11"
              :stroke="'var(--' + accentColor + ')'"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
        </span>
      </h1>

      <p
        class="text-base sm:text-xl md:text-2xl text-text font-medium leading-relaxed max-w-3xl mx-auto opacity-90 mt-4 px-2"
      >
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
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
