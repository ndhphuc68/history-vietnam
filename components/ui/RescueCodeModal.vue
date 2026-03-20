<script setup lang="ts">
import { useProgressStore } from "~/stores/progressStore";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const { t } = useI18n();
const progressStore = useProgressStore();
const rescueCode = ref("");
const importCode = ref("");
const status = ref<"idle" | "success" | "error">("idle");
const message = ref("");

// Generate code when modal opens
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      rescueCode.value = progressStore.generateRescueCode() || "";
      status.value = "idle";
      importCode.value = "";
    }
  },
);

const handleCopy = () => {
  navigator.clipboard.writeText(rescueCode.value);
  // Optional: show a toast/feedback
};

const handleImport = () => {
  if (!importCode.value.trim()) return;

  const success = progressStore.importRescueCode(importCode.value.trim());
  if (success) {
    status.value = "success";
    message.value = t("rescue_modal.success");
    setTimeout(() => {
      emit("close");
    }, 2000);
  } else {
    status.value = "error";
    message.value = t("rescue_modal.error");
  }
};
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
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <div
        class="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden border-8 border-white animate-pop-in"
      >
        <!-- Header -->
        <div class="bg-primary p-8 text-center relative overflow-hidden">
          <div
            class="absolute inset-0 opacity-10 bg-[url('/images/pattern-dots.png')] bg-repeat"
          ></div>
          <Icon
            name="fluent-emoji:rocket"
            class="text-6xl mb-4 relative z-10 animate-bounce-slow"
          />
          <h2 class="text-3xl font-black text-white relative z-10">
            {{ $t("rescue_modal.title") }}
          </h2>
          <p class="text-white/80 font-bold relative z-10">
            {{ $t("rescue_modal.description") }}
          </p>

          <button
            @click="emit('close')"
            class="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          >
            <Icon name="fluent:dismiss-24-filled" class="text-2xl" />
          </button>
        </div>

        <div class="p-8 space-y-8">
          <!-- Export Section -->
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <div
                class="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent"
              >
                <Icon name="fluent:share-24-filled" />
              </div>
              <h3
                class="font-black text-text uppercase tracking-widest text-sm"
              >
                {{ $t("rescue_modal.export_title") }}
              </h3>
            </div>

            <div class="flex flex-col sm:flex-row gap-2">
              <div
                class="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 font-mono font-bold text-sm sm:text-base text-primary select-all break-all leading-relaxed"
              >
                {{ rescueCode }}
              </div>
              <button
                @click="handleCopy"
                class="bg-accent hover:bg-accent/90 text-white py-3 sm:py-0 px-6 rounded-2xl font-black transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0"
              >
                <Icon name="fluent:copy-24-filled" />
                {{ $t("rescue_modal.copy") }}
              </button>
            </div>
            <p class="text-xs font-bold text-text/40 italic">
              {{ $t("rescue_modal.note") }}
            </p>
          </div>

          <!-- Divider -->
          <div class="flex items-center gap-4 py-2">
            <div class="flex-1 h-px bg-slate-100"></div>
            <span
              class="text-[10px] font-black text-text/20 uppercase tracking-[0.2em]"
              >{{ $t("rescue_modal.or") }}</span
            >
            <div class="flex-1 h-px bg-slate-100"></div>
          </div>

          <!-- Import Section -->
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <div
                class="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center text-secondary"
              >
                <Icon name="fluent:arrow-download-24-filled" />
              </div>
              <h3
                class="font-black text-text uppercase tracking-widest text-sm"
              >
                {{ $t("rescue_modal.import_title") }}
              </h3>
            </div>

            <div class="space-y-3">
              <input
                v-model="importCode"
                type="text"
                :placeholder="$t('rescue_modal.input_placeholder')"
                class="w-full bg-white border-4 border-slate-100 rounded-2xl px-6 py-4 font-bold text-text focus:border-secondary outline-none transition-all"
                :class="{
                  'border-red-200': status === 'error',
                  'border-green-200': status === 'success',
                }"
              />

              <button
                @click="handleImport"
                class="w-full bg-secondary hover:bg-secondary/90 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-secondary/20 transition-all active:scale-[0.98]"
              >
                {{ $t("rescue_modal.button") }}
              </button>
            </div>

            <!-- Feedback Message -->
            <Transition
              enter-active-class="animate-bounce-in"
              leave-active-class="transition duration-200 opacity-0"
            >
              <div
                v-if="status !== 'idle'"
                class="flex items-center gap-3 p-4 rounded-2xl font-bold text-sm"
                :class="
                  status === 'success'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-red-50 text-red-600'
                "
              >
                <Icon
                  :name="
                    status === 'success'
                      ? 'fluent-emoji:party-popper'
                      : 'fluent-emoji:thinking-face'
                  "
                  class="text-2xl"
                />
                {{ message }}
              </div>
            </Transition>
          </div>
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

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  70% {
    transform: scale(1.1);
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
