import { useSystemStore } from '../useSystemStore';

/**
 * `SystemStore`'s localization lookup - `HabboLocalizationManager.getLocalization` and
 * `getLocalizationWithParams`: the text of a key, with its parameters and `${key}` placeholders
 * filled.
 */
export const useTranslation = () => useSystemStore(x => x.getLocalizationValue);
