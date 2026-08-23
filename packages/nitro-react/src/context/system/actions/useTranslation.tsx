import { useSystemContext } from '../useSystemContext';

export const useTranslation = () => useSystemContext(x => x.getLocalizationValue);
