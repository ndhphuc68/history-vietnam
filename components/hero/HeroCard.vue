<script setup lang="ts">
/**
 * Interactive Hero Card component.
 * Displays hero information with premium styling and unlock state.
 * Direct click opens the detailed modal.
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
  hero: Hero;
  isUnlocked: boolean;
}>();

const emit = defineEmits(["show-detail"]);

const handleCardClick = () => {
  if (props.isUnlocked) {
    emit("show-detail", props.hero);
  }
};
</script>

<template>
  <div
    class="relative w-full aspect-[3/4] cursor-pointer group"
    @click="handleCardClick"
  >
    <!-- Card Content -->
    <div
      class="w-full h-full transition-all duration-300 shadow-xl rounded-[40px] overflow-hidden border-8 transform group-hover:-translate-y-3 group-hover:shadow-2xl"
      :class="
        isUnlocked ? 'border-[#FFE66D] bg-white' : 'border-gray-200 bg-gray-50'
      "
    >
      <!-- Locked State -->
      <div
        v-if="!isUnlocked"
        class="w-full h-full flex flex-col items-center justify-center p-8 text-center grayscale opacity-60"
      >
        <div
          class="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-6"
        >
          <Icon name="fluent-emoji:lock" class="text-6xl text-gray-400" />
        </div>
        <p class="text-gray-400 font-black uppercase tracking-widest text-lg">
          Chưa mở khóa
        </p>
      </div>

      <!-- Unlocked State -->
      <template v-else>
        <!-- Image Section: Enlarged to 75% height -->
        <div class="relative h-[72%] overflow-hidden">
          <img
            :src="hero.image"
            :alt="hero.name"
            class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-[#1A535C]/50 via-transparent to-transparent"
          ></div>

          <!-- Era Badge -->
          <div
            class="absolute top-6 right-6 px-4 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-black text-[#1A535C] uppercase tracking-wider shadow-md"
          >
            {{ hero.era }}
          </div>
        </div>

        <!-- Info Section: Refined for larger scale -->
        <div
          class="p-6 flex flex-col items-center text-center justify-center h-[28%] bg-white"
        >
          <h3
            class="text-2xl md:text-3xl font-black text-[#1A535C] leading-tight mb-1 group-hover:text-[#FF6B6B] transition-colors whitespace-nowrap overflow-hidden text-ellipsis w-full"
          >
            {{ hero.name }}
          </h3>
          <p
            class="text-base font-bold text-[#FF6B6B] opacity-90 uppercase tracking-tight"
          >
            {{ hero.title }}
          </p>

          <!-- Interaction Hint -->
          <div
            class="mt-3 text-[#4ECDC4] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2"
          >
            <span class="text-xs font-black uppercase tracking-widest"
              >Khám phá tiểu sử</span
            >
            <Icon name="fluent:chevron-right-24-filled" class="text-lg" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
