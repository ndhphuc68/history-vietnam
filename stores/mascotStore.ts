import { defineStore } from "pinia";

export type MascotMood = "idle" | "happy" | "thinking" | "talking";

export const useMascotStore = defineStore("mascot", () => {
  const isVisible = ref(true);
  const message = ref("Chào bạn nhỏ! Mình là Thần Kim Quy, rất vui được đồng hành cùng bạn trên con đường tìm hiểu lịch sử Việt Nam!");
  const mood = ref<MascotMood>("idle");
  const isTyping = ref(false);

  const say = (text: string, newMood: MascotMood = "talking", duration = 5000) => {
    message.value = text;
    mood.value = newMood;
    isTyping.value = true;
    
    // Auto-reset mood to idle after some time
    setTimeout(() => {
      if (message.value === text) {
        mood.value = "idle";
        isTyping.value = false;
      }
    }, duration);
  };

  const showHint = (hint: string) => {
    say(hint, "thinking", 8000);
  };

  const congratulate = (badgeTitle: string) => {
    const congratulations = [
      `Tuyệt vời! Bạn đã nhận được huy hiệu "${badgeTitle}" rồi đấy!`,
      `Gút chóp! Huy hiệu "${badgeTitle}" đã thuộc về bạn!`,
      `Bạn đúng là một sử gia nhí tài ba! Huy hiệu "${badgeTitle}" rất xứng đáng với bạn.`,
    ];
    const randomMsg = congratulations[
      Math.floor(Math.random() * congratulations.length)
    ] as string;
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
