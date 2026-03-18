<template>
  <div class="bg-text pt-24 pb-32 px-4 relative overflow-hidden">
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
      <slot name="title">
        <h1
          class="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg"
        >
          Dòng Máu Lạc Hồng
        </h1>
      </slot>
      <slot name="subtitle">
        <p
          class="text-xl md:text-2xl text-secondary font-bold max-w-3xl mx-auto leading-relaxed"
        >
          Khám phá hành trình 4000 năm lịch sử hào hùng của dân tộc Việt Nam qua
          những câu chuyện kể sinh động.
        </p>
      </slot>
    </div>

    <!-- Wave Divider -->
    <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        class="relative block w-full h-16 fill-background"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105.1,118.44,110.15,178,105.15,237.56,100.15,296.44,85.15,321.39,56.44Z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
