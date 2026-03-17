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
            to="/about"
            class="text-lg font-bold text-[#1A535C] hover:text-[#FF6B6B] transition-colors"
            >Về chúng mình</NuxtLink
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
    <footer
      class="bg-[#1A535C] text-white pt-20 pb-10 relative overflow-hidden"
    >
      <!-- Decoration -->
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B6B] via-[#FFE66D] to-[#4ECDC4]"
      ></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
        >
          <!-- Brand & Mission -->
          <div class="space-y-6">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <div
                class="w-10 h-10 bg-[#FF6B6B] rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-lg"
              >
                VN
              </div>
              <span class="text-xl font-black tracking-tight">
                Lịch Sử <span class="text-[#FF6B6B]">Nhí</span>
              </span>
            </NuxtLink>
            <p class="text-gray-300 font-medium leading-relaxed">
              Khơi dậy lòng tự hào dân tộc qua những câu chuyện lịch sử Việt Nam
              sống động và gần gũi nhất dành cho trẻ em.
            </p>
            <div class="flex space-x-4">
              <a
                href="#"
                class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF6B6B] transition-all transform hover:scale-110"
              >
                <Icon name="fluent-emoji:blue-book" class="text-2xl" />
              </a>
              <a
                href="#"
                class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF6B6B] transition-all transform hover:scale-110"
              >
                <Icon name="fluent-emoji:camera-with-flash" class="text-2xl" />
              </a>
              <a
                href="#"
                class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF6B6B] transition-all transform hover:scale-110"
              >
                <Icon name="fluent-emoji:envelope" class="text-2xl" />
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4
              class="text-lg font-black mb-6 uppercase tracking-wider text-[#4ECDC4]"
            >
              Khám phá
            </h4>
            <ul class="space-y-4 font-bold text-gray-300">
              <li>
                <NuxtLink
                  to="/map"
                  class="hover:text-[#FF6B6B] transition-colors"
                  ><Icon name="fluent-emoji:map" class="mr-2" /> Bản đồ Lịch
                  sử</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/lesson"
                  class="hover:text-[#FF6B6B] transition-colors"
                  ><Icon name="fluent-emoji:open-book" class="mr-2" /> Danh sách
                  Bài học</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/quiz"
                  class="hover:text-[#FF6B6B] transition-colors"
                  ><Icon name="fluent-emoji:direct-hit" class="mr-2" /> Thử
                  thách Đố vui</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/about"
                  class="hover:text-[#FF6B6B] transition-colors"
                  ><Icon name="fluent-emoji:seedling" class="mr-2" /> Về chúng
                  mình</NuxtLink
                >
              </li>
            </ul>
          </div>

          <!-- Solo Project Info -->
          <div>
            <h4
              class="text-lg font-black mb-6 uppercase tracking-wider text-[#FFE66D]"
            >
              Về Dự án
            </h4>
            <div class="space-y-4">
              <p
                class="text-gray-300 font-medium leading-relaxed italic border-l-4 border-[#FFE66D] pl-4"
              >
                "Dự án tâm huyết được xây dựng bởi PhucNDH với tình yêu dành cho
                lịch sử Việt Nam."
              </p>
              <div
                class="flex items-center space-x-3 text-sm font-bold text-[#4ECDC4]"
              >
                <Icon name="fluent-emoji:round-pushpin" class="text-xl" />
                <span>Bình Định - Gia Lai, Việt Nam</span>
              </div>
            </div>
          </div>

          <!-- Disclaimer Header -->
          <div>
            <h4
              class="text-lg font-black mb-6 uppercase tracking-wider text-[#FF6B6B]"
            >
              Lưu ý
            </h4>
            <div class="p-5 bg-white/5 rounded-2xl border border-white/10">
              <p class="text-xs text-gray-400 font-medium leading-relaxed">
                Nội dung và hình ảnh được hỗ trợ bởi công nghệ AI và có sự rà
                soát của cá nhân. Mọi ý kiến đóng góp về sai sót xin vui lòng
                gửi về cho chúng mình.
              </p>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="w-full h-px bg-white/10 mb-10"></div>

        <!-- Bottom Footer -->
        <div
          class="flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-bold text-gray-400"
        >
          <p>
            © {{ new Date().getFullYear() }} Dòng Máu Lạc Hồng. Made with ❤️ by
            PhucNDH.
          </p>
          <div class="flex space-x-8">
            <a href="#" class="hover:text-white transition-colors"
              >Điều khoản</a
            >
            <a href="#" class="hover:text-white transition-colors">Bảo mật</a>
            <a href="#" class="hover:text-white transition-colors"
              >Báo lỗi <Icon name="fluent-emoji:wrench" class="ml-1 text-sm"
            /></a>
          </div>
        </div>
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
