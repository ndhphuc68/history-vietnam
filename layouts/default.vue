<script setup lang="ts">
import { useHeroStore } from "~/stores/heroStore";
import { useProgressStore } from "~/stores/progressStore";
import { useBadgeStore } from "~/stores/badgeStore";
import { useArtifactStore } from "~/stores/artifactStore";
import { useQuizStore } from "~/stores/quizStore";
import { useLetterStore } from "~/stores/letterStore";

const route = useRoute();
const heroStore = useHeroStore();
const progressStore = useProgressStore();
const badgeStore = useBadgeStore();
const artifactStore = useArtifactStore();
const quizStore = useQuizStore();
const letterStore = useLetterStore();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Close menu when route changes
watch(
  () => route.path,
  () => {
    isMenuOpen.value = false;
  },
);

onMounted(() => {
  heroStore.initialize();
  progressStore.initialize();
  badgeStore.initialize();
  artifactStore.initialize();
  quizStore.initialize();
  letterStore.initialize();
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background">
    <!-- Navigation Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between"
      >
        <NuxtLink to="/" class="flex items-center space-x-2 flex-shrink-0">
          <div
            class="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-xl flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg"
          >
            VN
          </div>
          <span
            class="hidden xs:block text-xl md:text-2xl font-black tracking-tight text-text"
          >
            Lịch Sử <span class="text-primary">Nhí</span>
          </span>
        </NuxtLink>

        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink
            to="/"
            class="relative text-base lg:text-lg font-bold text-text hover:text-primary transition-all group"
            exact-active-class="text-primary"
          >
            Trang chủ
            <span
              class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-[.router-link-exact-active]:opacity-100 transition-all duration-300 transform group-[.router-link-exact-active]:scale-110"
            ></span>
          </NuxtLink>
          <NuxtLink
            to="/lesson"
            class="relative text-base lg:text-lg font-bold text-text hover:text-primary transition-all group"
            active-class="text-primary"
          >
            Bài học
            <span
              class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-[.router-link-active]:opacity-100 transition-all duration-300 transform group-[.router-link-active]:scale-110"
            ></span>
          </NuxtLink>
          <NuxtLink
            to="/gallery"
            class="relative text-base lg:text-lg font-bold text-text hover:text-primary transition-all group"
            active-class="text-primary"
          >
            Anh hùng
            <span
              class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-[.router-link-active]:opacity-100 transition-all duration-300 transform group-[.router-link-active]:scale-110"
            ></span>
          </NuxtLink>
          <NuxtLink
            to="/badges"
            class="relative text-base lg:text-lg font-bold text-text hover:text-primary transition-all group"
            active-class="text-primary"
          >
            Huy hiệu
            <span
              class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-[.router-link-active]:opacity-100 transition-all duration-300 transform group-[.router-link-active]:scale-110"
            ></span>
          </NuxtLink>
          <NuxtLink
            to="/mailbox"
            class="relative text-base lg:text-lg font-bold text-text hover:text-primary transition-all group"
            active-class="text-primary"
          >
            Hòm thư
            <span
              class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-[.router-link-active]:opacity-100 transition-all duration-300 transform group-[.router-link-active]:scale-110"
            ></span>
          </NuxtLink>
          <NuxtLink
            to="/quiz"
            class="relative text-base lg:text-lg font-bold text-text hover:text-primary transition-all group"
            active-class="text-primary"
          >
            Đố vui
            <span
              class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-[.router-link-active]:opacity-100 transition-all duration-300 transform group-[.router-link-active]:scale-110"
            ></span>
          </NuxtLink>
          <NuxtLink
            to="/glossary"
            class="relative text-base lg:text-lg font-bold text-text hover:text-primary transition-all group"
            active-class="text-primary"
          >
            Từ điển
            <span
              class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-[.router-link-active]:opacity-100 transition-all duration-300 transform group-[.router-link-active]:scale-110"
            ></span>
          </NuxtLink>
        </div>

        <div class="flex items-center space-x-2 md:space-x-4">
          <NuxtLink
            to="/lesson"
            class="btn-primary py-2 px-4 md:px-6 text-sm md:text-base whitespace-nowrap"
            >Bắt đầu ngay</NuxtLink
          >

          <!-- Hamburger Button -->
          <button
            @click="toggleMenu"
            class="md:hidden p-2 text-text hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icon
              :name="
                isMenuOpen
                  ? 'fluent-emoji:cross-mark'
                  : 'fluent-emoji:hamburger'
              "
              class="text-2xl"
            />
          </button>
        </div>
      </nav>

      <!-- Mobile Navigation Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="isMenuOpen"
          class="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
        >
          <div class="px-4 py-6 space-y-4">
            <NuxtLink
              to="/"
              class="block text-lg font-bold text-text hover:text-primary p-2 rounded-lg"
              exact-active-class="bg-primary/5 text-primary"
            >
              Trang chủ
            </NuxtLink>
            <NuxtLink
              to="/lesson"
              class="block text-lg font-bold text-text hover:text-primary p-2 rounded-lg"
              active-class="bg-primary/5 text-primary"
            >
              Bài học
            </NuxtLink>
            <NuxtLink
              to="/gallery"
              class="block text-lg font-bold text-text hover:text-primary p-2 rounded-lg"
              active-class="bg-primary/5 text-primary"
            >
              Anh hùng
            </NuxtLink>
            <NuxtLink
              to="/badges"
              class="block text-lg font-bold text-text hover:text-primary p-2 rounded-lg"
              active-class="bg-primary/5 text-primary"
            >
              Huy hiệu
            </NuxtLink>
            <NuxtLink
              to="/mailbox"
              class="block text-lg font-bold text-text hover:text-primary p-2 rounded-lg"
              active-class="bg-primary/5 text-primary"
            >
              Hòm thư
            </NuxtLink>
            <NuxtLink
              to="/quiz"
              class="block text-lg font-bold text-text hover:text-primary p-2 rounded-lg"
              active-class="bg-primary/5 text-primary"
            >
              Đố vui
            </NuxtLink>
            <NuxtLink
              to="/glossary"
              class="block text-lg font-bold text-text hover:text-primary p-2 rounded-lg"
              active-class="bg-primary/5 text-primary"
            >
              Từ điển
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Global UI Components -->
    <UiBadgeUnlockModal />
    <UiArtifactUnlockModal />
    <UiHeroLetterModal />
    <!-- <UiMascot /> -->
    <!-- Footer -->
    <footer class="bg-text text-white pt-20 pb-10 relative overflow-hidden">
      <!-- Decoration -->
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary"
      ></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center sm:text-left"
        >
          <!-- Brand & Mission -->
          <div class="space-y-6 flex flex-col items-center sm:items-start">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <div
                class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-lg"
              >
                VN
              </div>
              <span class="text-xl font-black tracking-tight">
                Lịch Sử <span class="text-primary">Nhí</span>
              </span>
            </NuxtLink>
            <p class="text-gray-300 font-medium leading-relaxed">
              Khơi dậy lòng tự hào dân tộc qua những câu chuyện lịch sử Việt Nam
              sống động và gần gũi nhất dành cho trẻ em.
            </p>
            <!-- Social icons removed (matches user request) -->
          </div>

          <!-- Quick Links -->
          <div>
            <h4
              class="text-lg font-black mb-6 uppercase tracking-wider text-secondary"
            >
              Khám phá
            </h4>
            <ul
              class="space-y-4 font-bold text-gray-300 flex flex-col items-center sm:items-start"
            >
              <li>
                <NuxtLink
                  to="/lesson"
                  class="hover:text-primary transition-colors flex items-center"
                  ><Icon name="fluent-emoji:open-book" class="mr-2" /> Danh sách
                  Bài học</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/gallery"
                  class="hover:text-primary transition-colors flex items-center"
                  ><Icon name="fluent-emoji:shield" class="mr-2" /> Bộ sưu tập
                  Anh hùng</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/badges"
                  class="hover:text-primary transition-colors flex items-center"
                >
                  <Icon name="fluent-emoji:military-medal" class="mr-2" /> Huy
                  hiệu Dũng sĩ
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/quiz"
                  class="hover:text-primary transition-colors flex items-center"
                >
                  <Icon name="fluent-emoji:bullseye" class="mr-2" /> Thử thách
                  Đố vui
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/about"
                  class="hover:text-primary transition-colors flex items-center"
                  ><Icon name="fluent-emoji:seedling" class="mr-2" /> Về chúng
                  mình</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/glossary"
                  class="hover:text-primary transition-colors flex items-center"
                  ><Icon name="fluent-emoji:books" class="mr-2" /> Từ điển Tình
                  Việt</NuxtLink
                >
              </li>
            </ul>
          </div>

          <!-- Solo Project Info -->
          <div class="flex flex-col items-center sm:items-start">
            <h4
              class="text-lg font-black mb-6 uppercase tracking-wider text-accent"
            >
              Về Dự án
            </h4>
            <div class="space-y-4 w-full">
              <p
                class="text-gray-300 font-medium leading-relaxed italic border-l-0 sm:border-l-4 border-accent sm:pl-4"
              >
                "Dự án tâm huyết được xây dựng bởi PhucNDH với tình yêu dành cho
                lịch sử Việt Nam."
              </p>
              <div
                class="flex items-center justify-center sm:justify-start space-x-3 text-sm font-bold text-secondary"
              >
                <Icon name="fluent-emoji:round-pushpin" class="text-xl" />
                <span>Bình Định - Gia Lai, Việt Nam</span>
              </div>
            </div>
          </div>

          <!-- Disclaimer Block -->
          <div class="flex flex-col items-center sm:items-start">
            <h4
              class="text-lg font-black mb-6 uppercase tracking-wider text-primary"
            >
              Lưu ý
            </h4>
            <div
              class="p-5 bg-white/5 rounded-2xl border border-white/10 w-full"
            >
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
            © {{ new Date().getFullYear() }} Dòng Máu Lạc Hồng. Made with
            <Icon name="fluent-emoji:red-heart" class="inline-block mx-1" /> by
            PhucNDH.
          </p>
          <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <NuxtLink to="/terms" class="hover:text-white transition-colors"
              >Điều khoản</NuxtLink
            >
            <NuxtLink to="/gallery" class="hover:text-white transition-colors">
              Anh hùng
            </NuxtLink>
            <NuxtLink to="/quiz" class="hover:text-white transition-colors">
              Đố vui
            </NuxtLink>
            <NuxtLink to="/badges" class="hover:text-white transition-colors">
              Huy hiệu
            </NuxtLink>
            <NuxtLink to="/report" class="hover:text-white transition-colors">
              Báo lỗi <Icon name="fluent-emoji:wrench" class="ml-1 text-sm" />
            </NuxtLink>
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
