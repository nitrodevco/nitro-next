import { useHabbiconsStore } from '../useHabbiconsStore';

/** A habbicon's full-size preview texture, undefined until the habbicon assets are in. */
export const useHabbiconPreview = (habbiconId: number) => useHabbiconsStore(x => x.previews[habbiconId]);
