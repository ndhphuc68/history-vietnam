import { defineStore } from "pinia";

export type MascotMood = "idle" | "happy" | "thinking" | "talking";

export const useMascotStore = defineStore("mascot", () => {
  const { t, tm, locale } = useI18n();
  const isVisible = ref(true);
  const message = ref("");
  const mood = ref<MascotMood>("idle");
  const isTyping = ref(false);

  const updateWelcome = () => {
    if (mood.value === "idle" && !isTyping.value) {
      message.value = t("mascot.welcome");
    }
  };

  onMounted(() => {
    updateWelcome();
  });

  watch(locale, () => {
    updateWelcome();
  });

  const say = (text: string, newMood: MascotMood = "talking", duration = 5000) => {
    message.value = text;
    mood.value = newMood;
    isTyping.value = true;
    
    // Auto-reset mood to idle after some time
    setTimeout(() => {
      if (message.value === text) {
        mood.value = "idle";
        isTyping.value = false;
        updateWelcome();
      }
    }, duration);
  };

  const showHint = (hint: string) => {
    say(hint, "thinking", 8000);
  };

  const congratulate = (badgeTitle: string) => {
    const congratulations = tm("mascot.congratulations") as string[];
    const randomMsgTemplate = congratulations[
      Math.floor(Math.random() * congratulations.length)
    ] as string;
    
    // Simple replacement since t() with params doesn't work on tm() results easily
    const randomMsg = randomMsgTemplate.replace("{title}", badgeTitle);
    say(randomMsg, "happy", 6000);
  };

  const setMood = (newMood: MascotMood) => {
    mood.value = newMood;
  };

  const toggleVisibility = () => {
    isVisible.value = !isVisible.value;
  };

  return {
    isVisible,
    message,
    mood,
    isTyping,
    say,
    showHint,
    congratulate,
    setMood,
    toggleVisibility,
  };
});
