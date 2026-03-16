<script setup lang="ts">
// Main layout for the app
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#F7FFF7]">
    <!-- Navigation Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between"
      >
        <NuxtLink to="/" class="flex items-center space-x-2">
          <div
            class="w-12 h-12 bg-[#FF6B6B] rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
          >
            VN
          </div>
          <span class="text-2xl font-black tracking-tight text-[#1A535C]">
            Lịch Sử <span class="text-[#FF6B6B]">Nhí</span>
          </span>
        </NuxtLink>

        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink
            to="/"
            class="text-lg font-bold text-[#1A535C] hover:text-[#FF6B6B] transition-colors"
            >Trang chủ</NuxtLink
          >
          <NuxtLink
            to="/map"
            class="text-lg font-bold text-[#1A535C] hover:text-[#FF6B6B] transition-colors"
            >Bản đồ</NuxtLink
          >
          <NuxtLink
            to="/lesson"
            class="text-lg font-bold text-[#1A535C] hover:text-[#FF6B6B] transition-colors"
            >Bài học</NuxtLink
          >
          <NuxtLink
            to="/quiz"
            class="text-lg font-bold text-[#1A535C] hover:text-[#FF6B6B] transition-colors"
            >Đố vui</NuxtLink
          >
        </div>

        <div class="flex items-center space-x-4">
          <NuxtLink to="/lesson" class="btn-primary py-2 px-6"
            >Bắt đầu ngay</NuxtLink
          >
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-[#1A535C] text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-xl font-bold mb-4">Học Lịch Sử thật là vui! 🇻🇳</p>
        <p class="opacity-75 tracking-wide">
          © {{ new Date().getFullYear() }} Lịch Sử Việt Nam cho Bé.
          <span class="block mt-2 sm:inline sm:mt-0"
            >Thiết kế bởi
            <span class="font-bold text-[#FFE66D]">PhucNDH</span>.</span
          >
          Tất cả quyền được bảo lưu.
        </p>
      </div>
    </footer>
  </div>
</template>

<style>
/* Global transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
