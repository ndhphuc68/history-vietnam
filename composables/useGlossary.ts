import type { GlossaryItem } from '~/types/history';

export const useGlossary = () => {
  const glossary = ref<GlossaryItem[]>([]);
  const { locale } = useI18n();

  const loadGlossary = async () => {
    try {
      const data = await import(`../content/${locale.value}/glossary.json`);
      glossary.value = data.default as GlossaryItem[];
    } catch (e) {
      console.error('Failed to load localized glossary', e);
      const data = await import(`../content/vi/glossary.json`);
      glossary.value = data.default as GlossaryItem[];
    }
  };

  // Initial load
  onMounted(() => {
    loadGlossary();
  });

  // Reload when locale changes
  watch(locale, () => {
    loadGlossary();
  });

  const getTerm = (termOrId: string) => {
    return glossary.value.find(
      (item) => item.id === termOrId || item.term.toLowerCase() === termOrId.toLowerCase()
    );
  };

  const getTermsByCategory = (category: string) => {
    return glossary.value.filter((item) => item.category === category);
  };

  return {
    glossary,
    getTerm,
    getTermsByCategory,
  };
};
