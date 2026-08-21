import { useSystemContext } from "../useSystemContext";

/** CoreLocalizationManager.interpolate — resolves ${key} placeholders in server text */
export const useInterpolate = () => useSystemContext(x => x.interpolate);
