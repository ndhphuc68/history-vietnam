<script setup lang="ts">
/**
 * Detailed Modal for Hero Information.
 * Shows biography, achievements, and premium hero portrait.
 */
interface Hero {
  id: string;
  name: string;
  realName: string;
  birthDate: string;
  deathDate: string;
  hometown: string;
  position: string;
  title: string;
  era: string;
  image: string;
  description: string;
  achievements: string[];
}

const props = defineProps<{
  hero: Hero | null;
  show: boolean;
}>();

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};

// Handle body scroll locking
watch(
  () => props.show,
  (newVal) => {
    if (typeof document !== "undefined") {
      if (newVal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
  },
);
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="show && hero"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-[#1A535C]/80 backdrop-blur-md"
          @click="close"
        ></div>

        <!-- Modal Content -->
        <div
          class="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-scale-up"
        >
          <!-- Hero Portrait Section -->
          <div
            class="relative w-full md:w-[40%] h-64 md:h-auto bg-[#F7FFF7] overflow-hidden"
          >
            <img
              :src="hero.image"
              :alt="hero.name"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
            ></div>

            <!-- Decoration -->
            <div class="absolute top-6 left-6 flex flex-col gap-2">
              <div
                class="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg"
              >
                <span
                  class="text-[10px] font-black text-[#FF6B6B] uppercase tracking-widest"
                  >{{ hero.era }}</span
                >
              </div>
            </div>

            <div class="absolute bottom-8 left-8 right-8 text-white">
              <p
                class="text-sm font-bold text-[#FFE66D] uppercase tracking-widest mb-1"
              >
                {{ hero.title }}
              </p>
              <h2 class="text-4xl md:text-5xl font-black mb-1 drop-shadow-lg">
                {{ hero.name }}
              </h2>
            </div>
          </div>

          <!-- Details Section -->
          <div class="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
            <!-- Close Button -->
            <button
              @click="close"
              class="absolute top-6 right-6 w-12 h-12 bg-[#F7FFF7] text-[#1A535C] rounded-full flex items-center justify-center hover:bg-[#FF6B6B] hover:text-white transition-all shadow-md group z-10"
            >
              <Icon
                name="fluent:dismiss-24-filled"
                class="text-2xl group-hover:rotate-90 transition-transform duration-300"
              />
            </button>

            <div class="space-y-10">
              <!-- Basic Info Grid -->
              <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#F7FFF7] p-8 rounded-[32px] border-2 border-[#4ECDC4]/20"
              >
                <div class="flex flex-col gap-1">
                  <span
                    class="text-[10px] font-black text-[#FF6B6B] uppercase tracking-widest"
                    >Tên thật</span
                  >
                  <span class="text-[#1A535C] font-bold text-lg">{{
                    hero.realName || "---"
                  }}</span>
                </div>
                <div class="flex flex-col gap-1">
                  <span
                    class="text-[10px] font-black text-[#FF6B6B] uppercase tracking-widest"
                    >Chức vụ</span
                  >
                  <span class="text-[#1A535C] font-bold text-lg">{{
                    hero.position || "---"
                  }}</span>
                </div>
                <div class="flex flex-col gap-1">
                  <span
                    class="text-[10px] font-black text-[#FF6B6B] uppercase tracking-widest"
                    >Năm sinh - Năm mất</span
                  >
                  <span class="text-[#1A535C] font-bold text-lg"
                    >{{ hero.birthDate }} - {{ hero.deathDate }}</span
                  >
                </div>
                <div class="flex flex-col gap-1">
                  <span
                    class="text-[10px] font-black text-[#FF6B6B] uppercase tracking-widest"
                    >Quê quán</span
                  >
                  <span class="text-[#1A535C] font-bold text-lg">{{
                    hero.hometown || "---"
                  }}</span>
                </div>
              </div>

              <!-- Biography -->
              <section>
                <div class="flex items-center gap-3 mb-4">
                  <div
                    class="w-10 h-10 bg-[#FF6B6B]/10 rounded-xl flex items-center justify-center"
                  >
                    <Icon name="fluent-emoji:scroll" class="text-2xl" />
                  </div>
                  <h3 class="text-xl font-black text-[#1A535C]">
                    Câu chuyện lịch sử
                  </h3>
                </div>
                <p
                  class="text-[#1A535C]/80 text-lg leading-relaxed font-medium text-justify"
                >
                  {{ hero.description }}
                </p>
              </section>

              <!-- Achievements -->
              <section>
                <div class="flex items-center gap-3 mb-4">
                  <div
                    class="w-10 h-10 bg-[#4ECDC4]/10 rounded-xl flex items-center justify-center"
                  >
                    <Icon name="fluent-emoji:medal" class="text-2xl" />
                  </div>
                  <h3 class="text-xl font-black text-[#1A535C]">
                    Thành tựu rạng danh
                  </h3>
                </div>
                <ul class="grid grid-cols-1 gap-4">
                  <li
                    v-for="(achievement, idx) in hero.achievements"
                    :key="idx"
                    class="bg-[#F7FFF7] p-5 rounded-3xl border-2 border-dashed border-[#4ECDC4]/30 flex items-start gap-4 transform hover:-translate-y-1 transition-transform"
                  >
                    <Icon
                      name="fluent-emoji:star"
                      class="text-2xl flex-shrink-0 mt-1"
                    />
                    <span
                      class="text-[#1A535C] font-bold text-lg leading-snug"
                      >{{ achievement }}</span
                    >
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #4ecdc4;
  border-radius: 10px;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.animate-scale-up {
  animation: scale-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes scale-up {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
