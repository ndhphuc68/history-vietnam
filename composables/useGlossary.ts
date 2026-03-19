import glossaryData from '~/content/glossary.json';
import type { GlossaryItem } from '~/types/history';

export const useGlossary = () => {
  const glossary = ref<GlossaryItem[]>(glossaryData as GlossaryItem[]);

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
