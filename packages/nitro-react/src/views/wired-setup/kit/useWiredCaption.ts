/**
 * Captions the way Flash windows take them: a literal, or `${localization.key}` (anywhere in the
 * text), which the window system resolved on assignment. Element ports keep Flash's caption
 * strings verbatim and the kit resolves them here, through the same
 * `CoreLocalizationManager.interpolate` port the rest of the client uses.
 */
import { useInterpolate } from '#base/context/system';

/** Returns the resolver; call it on every caption, tooltip and option label a component shows. */
export const useWiredCaption = (): ((caption: string | null | undefined) => string) => {
    const interpolate = useInterpolate();

    return caption => (caption ? interpolate(caption) : '');
};
