<script setup lang="ts">
// Placeholder for the Quiz section
</script>

<template>
  <div
    class="min-h-screen bg-[#F7FFF7] flex flex-col items-center justify-center p-4"
  >
    <div
      class="text-center max-w-2xl bg-white p-12 rounded-[3rem] border-8 border-[#FFE66D] shadow-2xl transform rotate-1"
    >
      <Icon
        name="fluent-emoji:thinking-face"
        class="text-8xl mb-6 animate-bounce"
      />
      <h1 class="text-4xl md:text-6xl font-black text-[#1A535C] mb-4">
        Góc Đố Vui
      </h1>
      <p class="text-xl text-[#1A535C] opacity-75 mb-8">
        Tính năng Đố Vui đang được các bác sử gia chuẩn bị nội dung thật hấp
        dẫn. Bé quay lại sau nhé!
      </p>
      <NuxtLink
        to="/map"
        class="btn-primary text-xl px-12 py-4 inline-block transform -rotate-1 hover:rotate-0 transition-transform"
      >
        Quay lại Bản đồ
      </NuxtLink>
    </div>
  </div>
</template>
