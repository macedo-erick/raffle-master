import { defineStore } from 'pinia';
import { enUS, ptBR } from 'date-fns/locale';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export const useLocaleStore = defineStore('locale', () => {
  const { locale } = useI18n();

  const localesMap = ref({
    pt: { key: 'pt-BR', fns: ptBR, js: 'pt-BR', currency: 'BRL' },
    en: { key: 'en', fns: enUS, js: 'en', currency: 'USD' }
  });

  const currentLocale = computed(() => {
    return (
      Object.values(localesMap.value).find((l) => l.key == locale.value) ||
      localesMap.value.en
    );
  });

  return { currentLocale };
});
