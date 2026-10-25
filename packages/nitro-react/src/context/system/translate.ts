/**
 * `HabboLocalizationManager.getLocalization` / `getLocalizationWithParams` for code that runs
 * outside React - commands and packet handlers: the text of a key as it is when the call is made,
 * with its parameters and `${key}` placeholders filled; `defaultValue` (`''` unless given) for a
 * missing key. A view takes the same function from `useTranslation`.
 *
 * Import it as `t` (`import { translate as t }`), so `scripts/drift/localization_keys.py` sees the
 * keys a call names.
 */
import { systemStore } from './store';

export const translate = (key: string, defaultValue?: string, replacements?: Record<string, string>): string => systemStore.getState().getLocalizationValue(key, defaultValue, replacements);
