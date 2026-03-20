// Dynamically loaded

export interface DailyFact {
  id: string;
  title: string;
  content: string;
  category: string;
  icon: string;
}

export const useDailyFact = () => {
  const { locale } = useI18n();
  const facts = ref<DailyFact[]>([]);

  const loadFacts = async () => {
    try {
      const data = await import(`../content/${locale.value}/daily-facts.json`);
      facts.value = data.default;
    } catch (e) {
      console.error("Failed to load daily facts", e);
      const data = await import("../content/vi/daily-facts.json");
      facts.value = data.default;
    }
  };

  onMounted(() => {
    loadFacts();
  });

  watch(locale, () => {
    loadFacts();
  });

  /**
   * Selects a fact based on the current day of the year.
   * This ensures all users see the same fact on the same day,
   * and the fact changes every day.
   */
  const dailyFact = computed(() => {
    if (!facts.value.length) return null;

    const now = new Date();
    // Simple hash for day of year: (Month * 31) + Day
    const dayHash = now.getMonth() * 31 + now.getDate();
    const index = dayHash % facts.value.length;

    return facts.value[index];
  });

  return {
    dailyFact,
    totalFacts: computed(() => facts.value.length),
  };
};
