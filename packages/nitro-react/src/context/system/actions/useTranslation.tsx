import { useSystemStore } from '../useSystemStore';

export const useTranslation = () => useSystemStore(x => x.getLocalizationValue);
