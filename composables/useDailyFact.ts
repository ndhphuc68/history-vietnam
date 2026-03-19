import dailyFacts from "~/content/daily-facts.json";

export interface DailyFact {
  id: string;
  title: string;
  content: string;
  category: string;
  icon: string;
}

export const useDailyFact = () => {
  const facts = dailyFacts as DailyFact[];

  /**
   * Selects a fact based on the current day of the year.
   * This ensures all users see the same fact on the same day,
   * and the fact changes every day.
   */
  const dailyFact = computed(() => {
    if (!facts.length) return null;

    const now = new Date();
    // Simple hash for day of year: (Month * 31) + Day
    const dayHash = now.getMonth() * 31 + now.getDate();
    const index = dayHash % facts.length;

    return facts[index];
  });

  return {
    dailyFact,
    totalFacts: facts.length,
  };
};
