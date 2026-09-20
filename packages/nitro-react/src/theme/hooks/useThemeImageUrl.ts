import { getThemeSliceUrl, ThemeSliceEffect } from '../utils/themeSprites';

/**
 * A theme sprite as a standalone image URL for CSS - plain, tinted (`multiply` + alpha clip,
 * the DOM stand-in for a sprite `tint`), as a solid-colour silhouette (the sprite's alpha shape
 * in one colour) or as its drop shadow.
 *
 * Sliced out of the decoded sheet the `theme` bundle carries and cached once per key + effect,
 * so this is synchronous: the first render already has it, and there is no per-file URL behind
 * it to await (the loose PNGs are the bundle builder's input and are not served). For untinted
 * sprites that fill or size to a box, prefer drawing straight from the sheet with
 * `themeSpriteFillStyle`/`themeSpriteNativeStyle` - no standalone copy at all.
 */
export const useThemeImageUrl = (textureKey: string | undefined, effect: ThemeSliceEffect = { kind: 'plain' }): string | undefined => (textureKey
    ? getThemeSliceUrl(textureKey, effect)
    : undefined);
