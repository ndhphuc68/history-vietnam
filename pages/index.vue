<script setup lang="ts">
// Landing page for the Vietnamese History Learning App
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- Hero Section -->
    <section
      class="relative pt-20 pb-32 flex flex-col items-center text-center px-4"
    >
      <div
        class="absolute inset-0 -z-10 bg-gradient-to-b from-[#F7FFF7] to-white"
      />

      <div
        class="inline-block px-4 py-1 mb-6 bg-[#FFE66D] text-[#1A535C] font-bold rounded-full text-sm uppercase tracking-wider transform -rotate-2"
      >
        <Icon name="fluent-emoji:house" class="mr-2 text-xl" /> Khám phá 4000
        năm Lịch Sử
      </div>

      <h1
        class="text-5xl md:text-7xl font-black text-[#1A535C] leading-tight mb-8"
      >
        Hành trình ngược thời gian <br />
        <span class="text-[#FF6B6B] relative">
          cùng Bé yêu!
          <svg
            class="absolute -bottom-2 left-0 w-full"
            viewBox="0 0 300 12"
            fill="none"
          >
            <path
              d="M1 11C60 4 120 1 180 1C240 1 300 11 300 11"
              stroke="#FF6B6B"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>
        </span>
      </h1>

      <p class="text-xl md:text-2xl text-[#1A535C] opacity-80 max-w-2xl mb-12">
        Học lịch sử Việt Nam qua những câu chuyện thú vị, hình ảnh sinh động và
        các trò chơi đố vui hấp dẫn.
      </p>

      <div class="flex flex-col sm:flex-row gap-4">
        <NuxtLink
          to="/map"
          class="btn-primary text-xl px-12 py-5 ring-offset-2 ring-primary focus:ring-4"
        >
          Bắt đầu Hành Trình
        </NuxtLink>
        <NuxtLink
          to="/lesson"
          class="bg-white border-4 border-[#4ECDC4] text-[#4ECDC4] text-xl font-bold px-12 py-5 rounded-full hover:bg-[#4ECDC4] hover:text-white transition-all shadow-lg flex items-center justify-center"
        >
          Danh sách Bài học
        </NuxtLink>
      </div>

      <!-- Hero Image -->
      <div
        class="mt-20 w-full max-w-[1600px] rounded-[3rem] overflow-hidden shadow-2xl border-[16px] border-white transform hover:scale-[1.005] transition-all duration-700 ease-out cursor-pointer group px-4 md:px-0"
      >
        <UiLazyImage
          src="/images/banner/banner.png"
          alt="Bản đồ các anh hùng dân tộc Việt Nam"
          class="w-full h-auto object-cover group-hover:brightness-105 transition-all duration-700"
          loading="eager"
        />
      </div>
    </section>

    <!-- Feature Section -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
        <div class="card flex flex-col items-center text-center">
          <div
            class="w-20 h-20 bg-[#FFE66D] rounded-2xl flex items-center justify-center mb-6 text-4xl"
          >
            <Icon name="fluent-emoji:open-book" class="text-5xl" />
          </div>
          <h3 class="text-2xl font-bold mb-4">Câu chuyện hấp dẫn</h3>
          <p>
            Tìm hiểu về các đời vua Hùng, Thánh Gióng, Hai Bà Trưng qua những
            mẩu truyện tranh sinh động.
          </p>
        </div>

        <div class="card flex flex-col items-center text-center">
          <div
            class="w-20 h-20 bg-[#4ECDC4] rounded-2xl flex items-center justify-center mb-6 text-4xl"
          >
            <Icon name="fluent-emoji:video-game" class="text-5xl" />
          </div>
          <h3 class="text-2xl font-bold mb-4">Trò chơi đố vui</h3>
          <p>
            Thử thách bản thân với các câu hỏi lý thú để nhận được huy hiệu dũng
            sĩ lịch sử.
          </p>
        </div>

        <div class="card flex flex-col items-center text-center">
          <div
            class="w-20 h-20 bg-[#FF6B6B] rounded-2xl flex items-center justify-center mb-6 text-4xl"
          >
            <Icon name="fluent-emoji:map" class="text-5xl" />
          </div>
          <h3 class="text-2xl font-bold mb-4">Khám phá bản đồ</h3>
          <p>
            Theo dõi sự thay đổi của đất nước qua các thời kỳ lịch sử hào hùng.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
