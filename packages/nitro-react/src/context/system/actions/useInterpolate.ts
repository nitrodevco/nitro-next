import { useSystemStore } from '../useSystemStore';

/** CoreLocalizationManager.interpolate — resolves ${key} placeholders in server text */
export const useInterpolate = () => useSystemStore(x => x.interpolate);
