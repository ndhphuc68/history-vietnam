<script setup lang="ts">
import { useProgressStore } from "~/stores/progressStore";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const progressStore = useProgressStore();
const nameInput = ref(progressStore.userName);
const selectedId = ref(progressStore.selectedAvatar || "lac-long");

const avatars = [
  {
    id: "lac-long",
    name: "Lạc Long",
    icon: "fluent-emoji:dragon",
    color: "bg-blue-500",
  },
  {
    id: "au-co",
    name: "Âu Cơ",
    icon: "fluent-emoji:cherry-blossom",
    color: "bg-pink-500",
  },
  {
    id: "warrior",
    name: "Dũng Sĩ",
    icon: "fluent-emoji:crossed-swords",
    color: "bg-red-500",
  },
  {
    id: "scholar",
    name: "Học Giả",
    icon: "fluent-emoji:scroll",
    color: "bg-amber-500",
  },
];

const handleSave = () => {
  if (!nameInput.value.trim()) return;

  progressStore.userName = nameInput.value.trim();
  progressStore.selectedAvatar = selectedId.value;
  progressStore.saveToStorage();
  emit("close");
};

// Reset state when opening
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      nameInput.value = progressStore.userName;
      selectedId.value = progressStore.selectedAvatar || "lac-long";
    }
  },
);
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <div
        class="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden border-8 border-white animate-pop-in"
      >
        <!-- Header -->
        <div class="bg-accent p-8 text-center relative overflow-hidden">
          <Icon
            name="fluent-emoji:sparkles"
            class="text-6xl mb-4 relative z-10 animate-pulse"
          />
          <h2 class="text-3xl font-black text-white relative z-10">
            {{ $t("avatar_selection.header") }}
          </h2>
          <p class="text-white/80 font-bold relative z-10">
            {{ $t("avatar_selection.subtitle") }}
          </p>
        </div>

        <div class="p-8 space-y-8">
          <!-- Name Input -->
          <div class="space-y-3">
            <label
              class="block text-xs font-black text-text/40 uppercase tracking-widest pl-2"
            >
              {{ $t("avatar_selection.nickname_label") }}
            </label>
            <input
              v-model="nameInput"
              type="text"
              :placeholder="$t('avatar_selection.nickname_placeholder')"
              maxlength="15"
              class="w-full bg-slate-50 border-4 border-slate-100 rounded-2xl px-6 py-4 font-black text-text text-xl focus:border-accent outline-none transition-all placeholder:text-text/20"
            />
          </div>

          <!-- Avatar Grid -->
          <div class="space-y-4">
            <label
              class="block text-xs font-black text-text/40 uppercase tracking-widest pl-2"
            >
              {{ $t("avatar_selection.avatar_label") }}
            </label>
            <div class="grid grid-cols-2 gap-4">
              <button
                v-for="avatar in avatars"
                :key="avatar.id"
                @click="selectedId = avatar.id"
                class="relative p-4 rounded-3xl border-4 transition-all duration-300 group"
                :class="
                  selectedId === avatar.id
                    ? 'border-accent bg-accent/5'
                    : 'border-slate-100 hover:border-slate-200 bg-white'
                "
              >
                <!-- Selection Indicator -->
                <div
                  v-if="selectedId === avatar.id"
                  class="absolute -top-3 -right-3 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center shadow-lg animate-bounce-in"
                >
                  <Icon name="fluent:checkmark-12-filled" class="text-xl" />
                </div>

                <div
                  class="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center text-4xl shadow-inner transition-transform group-hover:scale-110"
                  :class="[
                    avatar.color,
                    selectedId === avatar.id
                      ? 'opacity-100'
                      : 'opacity-40 grayscale-[0.5]',
                  ]"
                >
                  <Icon :name="avatar.icon" />
                </div>
                <div
                  class="font-black text-sm"
                  :class="
                    selectedId === avatar.id ? 'text-accent' : 'text-text/60'
                  "
                >
                  {{ $t(`avatar_selection.avatars.${avatar.id}`) }}
                </div>
              </button>
            </div>
          </div>

          <!-- Save Button -->
          <button
            @click="handleSave"
            :disabled="!nameInput.trim()"
            class="w-full bg-accent hover:bg-accent/90 disabled:bg-slate-200 disabled:shadow-none text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-accent/20 transition-all active:scale-[0.98]"
          >
            {{ $t("avatar_selection.submit_button") }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@keyframes pop-in {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  70% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-pop-in {
  animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-bounce-in {
  animation: bounce-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
</style>
