<script setup lang="ts">
import { useHeroStore } from "~/stores/heroStore";
import { useProgressStore } from "~/stores/progressStore";
import { useBadgeStore } from "~/stores/badgeStore";
import { useArtifactStore } from "~/stores/artifactStore";
import { useQuizStore } from "~/stores/quizStore";
import { useLetterStore } from "~/stores/letterStore";
import { useHistoryStore } from "~/stores/historyStore";

const route = useRoute();
const heroStore = useHeroStore();
const progressStore = useProgressStore();
const badgeStore = useBadgeStore();
const artifactStore = useArtifactStore();
const quizStore = useQuizStore();
const letterStore = useLetterStore();
const historyStore = useHistoryStore();
const { locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const isMenuOpen = ref(false);

const showRescueModal = ref(false);
const showAvatarModal = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
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
  historyStore.initialize();

  // Show avatar selection if no name set (new user)
  setTimeout(() => {
    if (!progressStore.userName) {
      showAvatarModal.value = true;
    }
  }, 2000);
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background">
    <!-- Navigation Header -->
    <header
      class="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50 transition-colors"
    >
      <nav
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between"
      >
        <NuxtLink
          :to="localePath('/')"
          class="flex items-center space-x-2 flex-shrink-0"
        >
          <div
            class="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-xl flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg"
          >
            VN
          </div>
          <span
            class="hidden xs:block text-xl md:text-2xl font-black tracking-tight text-text"
          >
            {{ $t("layout.brand.first") }}
            <span class="text-primary">{{ $t("layout.brand.second") }}</span>
          </span>
        </NuxtLink>

        <div class="hidden md:flex items-center space-x-4 lg:space-x-6">
          <NuxtLink
            :to="localePath('/')"
            class="relative text-lg lg:text-xl font-black text-text hover:text-primary transition-all group py-2"
            exact-active-class="text-primary"
          >
            {{ $t("nav.home") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/lesson')"
            class="relative text-lg lg:text-xl font-black text-text hover:text-primary transition-all group py-2"
            active-class="text-primary"
          >
            {{ $t("nav.lesson") }}
          </NuxtLink>

          <!-- Collection Dropdown -->
          <div class="relative group">
            <button
              class="flex items-center gap-1 text-lg lg:text-xl font-black text-text hover:text-primary transition-all py-2"
              :class="{
                'text-primary': ['/gallery', '/badges', '/mailbox'].some((p) =>
                  route.path.includes(p),
                ),
              }"
            >
              {{ $t("nav.collection") }}
              <Icon
                name="fluent:chevron-down-24-filled"
                class="text-xs group-hover:rotate-180 transition-transform"
              />
            </button>
            <div
              class="absolute top-full left-0 w-64 bg-white dark:bg-slate-800 border-4 border-primary/5 shadow-2xl rounded-[24px] py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all z-[60]"
            >
              <!-- Arrow handle -->
              <div
                class="absolute -top-2 left-8 w-4 h-4 bg-white dark:bg-slate-800 rotate-45 border-l-4 border-t-4 border-primary/5"
              ></div>

              <NuxtLink
                :to="localePath('/gallery')"
                class="flex items-center gap-4 px-4 py-4 mx-3 rounded-2xl text-lg font-black text-text hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary transition-all active:scale-95"
                active-class="text-primary bg-primary/10 dark:bg-primary/20"
              >
                <div
                  class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-transform group-hover:scale-110"
                >
                  <Icon name="fluent:person-star-24-filled" class="text-2xl" />
                </div>
                {{ $t("nav.heroes") }}
              </NuxtLink>
              <NuxtLink
                :to="localePath('/badges')"
                class="flex items-center gap-4 px-4 py-4 mx-3 rounded-2xl text-lg font-black text-text hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-900/20 dark:hover:text-amber-400 transition-all active:scale-95"
                active-class="text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20"
              >
                <div
                  class="w-12 h-12 rounded-xl bg-amber-100/50 flex items-center justify-center transition-transform group-hover:scale-110"
                >
                  <Icon
                    name="fluent:ribbon-star-24-filled"
                    class="text-2xl text-amber-500"
                  />
                </div>
                {{ $t("nav.badges") }}
              </NuxtLink>
              <NuxtLink
                :to="localePath('/mailbox')"
                class="flex items-center gap-4 px-4 py-4 mx-3 rounded-2xl text-lg font-black text-text hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-all active:scale-95"
                active-class="text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20"
              >
                <div
                  class="w-12 h-12 rounded-xl bg-blue-100/50 flex items-center justify-center transition-transform group-hover:scale-110"
                >
                  <Icon
                    name="fluent:mail-24-filled"
                    class="text-2xl text-blue-500"
                  />
                </div>
                {{ $t("nav.mailbox") }}
              </NuxtLink>
            </div>
          </div>

          <!-- Explore Dropdown -->
          <div class="relative group">
            <button
              class="flex items-center gap-1 text-lg lg:text-xl font-black text-text hover:text-primary transition-all py-2"
              :class="{
                'text-primary': ['/quiz', '/glossary'].some((p) =>
                  route.path.includes(p),
                ),
              }"
            >
              {{ $t("nav.explore") }}
              <Icon
                name="fluent:chevron-down-24-filled"
                class="text-xs group-hover:rotate-180 transition-transform"
              />
            </button>
            <div
              class="absolute top-full left-0 w-64 bg-white dark:bg-slate-800 border-4 border-primary/5 shadow-2xl rounded-[24px] py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all z-[60]"
            >
              <!-- Arrow handle -->
              <div
                class="absolute -top-2 left-8 w-4 h-4 bg-white dark:bg-slate-800 rotate-45 border-l-4 border-t-4 border-primary/5"
              ></div>

              <NuxtLink
                :to="localePath('/quiz')"
                class="flex items-center gap-4 px-4 py-4 mx-3 rounded-2xl text-lg font-black text-text hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900/20 dark:hover:text-purple-400 transition-all active:scale-95"
                active-class="text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20"
              >
                <div
                  class="w-12 h-12 rounded-xl bg-purple-100/50 flex items-center justify-center transition-transform group-hover:scale-110"
                >
                  <Icon
                    name="fluent:quiz-new-24-filled"
                    class="text-2xl text-purple-500"
                  />
                </div>
                {{ $t("nav.quiz") }}
              </NuxtLink>
              <NuxtLink
                :to="localePath('/glossary')"
                class="flex items-center gap-4 px-4 py-4 mx-3 rounded-2xl text-lg font-black text-text hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400 transition-all active:scale-95"
                active-class="text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/20"
              >
                <div
                  class="w-12 h-12 rounded-xl bg-emerald-100/50 flex items-center justify-center transition-transform group-hover:scale-110"
                >
                  <Icon
                    name="fluent:library-24-filled"
                    class="text-2xl text-emerald-500"
                  />
                </div>
                {{ $t("nav.dictionary") }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-2 md:space-x-4">
          <!-- Level Badge -->
          <UiLevelBadge
            @open-rescue="showRescueModal = true"
            @open-avatar="showAvatarModal = true"
          />

          <!-- Theme Toggle (Desktop) -->
          <ClientOnly>
            <button
              @click="toggleTheme"
              aria-label="Toggle Dark Mode"
              class="hidden md:flex w-10 h-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all border border-gray-200 dark:border-slate-700 shadow-sm"
            >
              <Icon
                v-if="$colorMode.value === 'dark'"
                name="fluent-emoji:last-quarter-moon-face"
                class="text-xl"
              />
              <Icon v-else name="fluent-emoji:sun-with-face" class="text-xl" />
            </button>
            <template #fallback>
              <div
                class="hidden md:flex w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
              >
                <Icon
                  name="fluent-emoji:sun-with-face"
                  class="text-xl opacity-50"
                />
              </div>
            </template>
          </ClientOnly>

          <!-- Language Switcher (Desktop) -->
          <div
            class="hidden md:flex items-center bg-gray-100 dark:bg-slate-800 rounded-full p-1 border border-gray-200 dark:border-slate-700"
          >
            <NuxtLink
              v-for="loc in locales"
              :key="loc.code"
              :to="switchLocalePath(loc.code)"
              class="w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold transition-all"
              :class="
                locale === loc.code
                  ? 'bg-white shadow text-primary'
                  : 'text-gray-500 hover:text-text'
              "
            >
              {{ loc.code.toUpperCase() }}
            </NuxtLink>
          </div>

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
          class="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden"
        >
          <div class="px-4 py-6 space-y-4">
            <NuxtLink
              :to="localePath('/')"
              class="block text-lg font-bold text-text hover:text-primary p-2 rounded-lg"
              exact-active-class="bg-primary/5 text-primary"
            >
              {{ $t("layout.mobile.home") }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/lesson')"
              class="block text-lg font-bold text-text hover:text-primary p-2 rounded-lg"
              active-class="bg-primary/5 text-primary"
            >
              {{ $t("layout.mobile.lesson") }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/gallery')"
              class="block text-lg font-bold text-text hover:text-primary p-2 rounded-lg"
              active-class="bg-primary/5 text-primary"
            >
              {{ $t("layout.mobile.heroes") }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/badges')"
              class="block text-lg font-bold text-text hover:text-primary p-2 rounded-lg"
              active-class="bg-primary/5 text-primary"
            >
              {{ $t("layout.mobile.badges") }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/mailbox')"
              class="block text-lg font-bold text-text hover:text-primary p-2 rounded-lg"
              active-class="bg-primary/5 text-primary"
            >
              {{ $t("layout.mobile.mailbox") }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/quiz')"
              class="block text-lg font-bold text-text hover:text-primary p-2 rounded-lg"
              active-class="bg-primary/5 text-primary"
            >
              {{ $t("layout.mobile.quiz") }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/glossary')"
              class="block text-lg font-bold text-text hover:text-primary p-2 rounded-lg"
              active-class="bg-primary/5 text-primary"
            >
              {{ $t("layout.mobile.glossary") }}
            </NuxtLink>

            <!-- Mobile Divider -->
            <div class="h-px bg-gray-100 dark:bg-slate-800 my-4"></div>

            <!-- Mobile Settings -->
            <div class="space-y-4 pt-2">
              <span
                class="text-xs font-black uppercase tracking-widest text-text/40 px-2"
              >
                Cài đặt
              </span>

              <div class="flex items-center justify-between px-2">
                <span class="font-bold text-text">Giao diện</span>
                <button
                  @click="toggleTheme"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 border-2 border-primary/5 shadow-sm active:scale-95 transition-all"
                >
                  <Icon
                    v-if="$colorMode.value === 'dark'"
                    name="fluent-emoji:last-quarter-moon-face"
                    class="text-xl"
                  />
                  <Icon
                    v-else
                    name="fluent-emoji:sun-with-face"
                    class="text-xl"
                  />
                  <span class="font-black text-sm">
                    {{ $colorMode.value === "dark" ? "Tối" : "Sáng" }}
                  </span>
                </button>
              </div>

              <div class="flex items-center justify-between px-2">
                <span class="font-bold text-text">Ngôn ngữ</span>
                <div
                  class="flex bg-gray-100 dark:bg-slate-800 rounded-xl p-1 border-2 border-primary/5 shadow-sm"
                >
                  <NuxtLink
                    v-for="loc in locales"
                    :key="loc.code"
                    :to="switchLocalePath(loc.code)"
                    class="px-4 py-1.5 rounded-lg text-xs font-black transition-all"
                    :class="
                      locale === loc.code
                        ? 'bg-white shadow text-primary'
                        : 'text-gray-500'
                    "
                  >
                    {{ loc.code.toUpperCase() }}
                  </NuxtLink>
                </div>
              </div>
            </div>
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
    <UiRescueCodeModal
      :show="showRescueModal"
      @close="showRescueModal = false"
    />
    <UiAvatarSelectionModal
      :show="showAvatarModal"
      @close="showAvatarModal = false"
    />
    <!-- Footer -->
    <footer
      class="bg-[#1A535C] dark:bg-slate-950 text-white pt-20 pb-10 relative overflow-hidden transition-colors duration-500"
    >
      <!-- Premium Decorative Background -->
      <div
        class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
      >
        <div
          class="absolute inset-0 bg-[url('/images/pattern-dots.png')] bg-repeat"
        ></div>
      </div>
      <div
        class="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
      ></div>
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
            <NuxtLink :to="localePath('/')" class="flex items-center space-x-2">
              <div
                class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-lg"
              >
                VN
              </div>
              <span class="text-xl font-black tracking-tight">
                {{ $t("layout.brand.first") }}
                <span class="text-primary">
                  {{ $t("layout.brand.second") }}
                </span>
              </span>
            </NuxtLink>
            <p class="text-gray-300 font-medium leading-relaxed">
              {{ $t("layout.footer.mission") }}
            </p>
            <!-- Social icons removed (matches user request) -->
          </div>

          <!-- Quick Links -->
          <div>
            <h4
              class="text-lg font-black mb-6 uppercase tracking-wider text-secondary"
            >
              {{ $t("footer.explore") }}
            </h4>
            <ul
              class="space-y-4 font-bold text-gray-300 flex flex-col items-center sm:items-start"
            >
              <li>
                <NuxtLink
                  :to="localePath('/lesson')"
                  class="hover:text-primary transition-colors flex items-center"
                >
                  <Icon name="fluent-emoji:open-book" class="mr-2" />
                  {{ $t("footer.quick_links.lesson_list") }}</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  :to="localePath('/gallery')"
                  class="hover:text-primary transition-colors flex items-center"
                >
                  <Icon name="fluent-emoji:shield" class="mr-2" />
                  {{ $t("footer.quick_links.hero_collection") }}</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  :to="localePath('/badges')"
                  class="hover:text-primary transition-colors flex items-center"
                >
                  <Icon name="fluent-emoji:military-medal" class="mr-2" />
                  {{ $t("footer.quick_links.badges") }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  :to="localePath('/quiz')"
                  class="hover:text-primary transition-colors flex items-center"
                >
                  <Icon name="fluent-emoji:bullseye" class="mr-2" />
                  {{ $t("footer.quick_links.quiz") }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  :to="localePath('/about')"
                  class="hover:text-primary transition-colors flex items-center"
                >
                  <Icon name="fluent-emoji:seedling" class="mr-2" />
                  {{ $t("footer.quick_links.about_us") }}</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  :to="localePath('/glossary')"
                  class="hover:text-primary transition-colors flex items-center"
                >
                  <Icon name="fluent-emoji:books" class="mr-2" />
                  {{ $t("footer.quick_links.glossary") }}</NuxtLink
                >
              </li>
            </ul>
          </div>

          <!-- Solo Project Info -->
          <div class="flex flex-col items-center sm:items-start">
            <h4
              class="text-lg font-black mb-6 uppercase tracking-wider text-accent"
            >
              {{ $t("layout.footer.about_project.title") }}
            </h4>
            <div class="space-y-4 w-full">
              <p
                class="text-gray-300 font-medium leading-relaxed italic border-l-0 sm:border-l-4 border-accent sm:pl-4"
              >
                {{ $t("layout.footer.about_project.description") }}
              </p>
              <div
                class="flex items-center justify-center sm:justify-start space-x-3 text-sm font-bold text-secondary"
              >
                <Icon name="fluent-emoji:round-pushpin" class="text-xl" />
                <span>{{ $t("layout.footer.about_project.location") }}</span>
              </div>
            </div>
          </div>

          <!-- Disclaimer Block -->
          <div class="flex flex-col items-center sm:items-start">
            <h4
              class="text-lg font-black mb-6 uppercase tracking-wider text-primary"
            >
              {{ $t("layout.footer.disclaimer.title") }}
            </h4>
            <div
              class="p-5 bg-white/5 rounded-2xl border border-white/10 w-full"
            >
              <p class="text-xs text-gray-400 font-medium leading-relaxed">
                {{ $t("layout.footer.disclaimer.content") }}
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
            {{
              $t("footer.copyright", {
                year: new Date().getFullYear(),
                heart: "❤️",
              })
            }}
          </p>
          <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <NuxtLink
              :to="localePath('/terms')"
              class="hover:text-white transition-colors"
            >
              {{ $t("layout.footer.links.terms") }}</NuxtLink
            >
            <NuxtLink
              :to="localePath('/gallery')"
              class="hover:text-white transition-colors"
            >
              {{ $t("nav.heroes") }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/quiz')"
              class="hover:text-white transition-colors"
            >
              {{ $t("nav.quiz") }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/badges')"
              class="hover:text-white transition-colors"
            >
              {{ $t("nav.badges") }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/report')"
              class="hover:text-white transition-colors"
            >
              {{ $t("layout.footer.links.report") }}
              <Icon name="fluent-emoji:wrench" class="ml-1 text-sm" />
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
