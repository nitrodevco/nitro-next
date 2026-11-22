/**
 * Not Flash's, development builds only: what a theme author's `asset.overlays` entries of the theme
 * sheet (`habbo-window-manager-com/theme-...`) re-skin, said on the console once the windows settle -
 * five seconds after the last window drew a sprite it had not drawn before:
 *
 * - one that names a sprite no skin draws is warned about;
 * - one no window drawn since the page loaded draws is warned about, with the skins it is the art of,
 *   the windows that draw them (`skins.json`) and the sprites the windows drawn so far draw of that
 *   kind instead - the frame the author looked at;
 * - one that is drawn is noted with every window it re-skins: an overlay replaces the sprite for every
 *   skin cut from it, so every window drawing that skin, not only the one the author looked at;
 * - a skin's `-plain` twin opaque over much of its tinted art is warned about (`warnPlainOverTint`).
 *
 * Said on the console whatever `log.warn` is, as the text fallback report is: it is for the author at
 * the development server. An overlay of another size than its sprite is warned about as it loads
 * (`utils/assetOverlays.ts`). A production build compiles all of this out: nothing watches what is
 * drawn (`watchThemeDraws`).
 */
import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { getTextureAlpha, plainCoverOfTint, skinSpriteOf, THEME_SKIN_LIBRARY, themeSheetFrames, themeSkinSprites, themeSpriteSkins, themeTextureAliases, themeVariantsData, watchThemeDraws } from '@nitrodevco/nitro-theme';

import { loadSkinMap, skinWindowsLine } from './skinMap';

/** How long the windows draw nothing new before the overlays are checked. */
const SETTLE_MS = 5000;

const LOG = '[AssetOverlays]';

/** A skin id as a line names it: `frame 3`. */
const skinName = (id: string) => id.replace(':', ' ');

/** How much of a skin's tinted art an overlaid `-plain` twin may cover before it is warned about. */
const PLAIN_COVER_WARNED = 0.25;

/**
 * Warns when `sprite`, overlaid, is the `plain` twin of a skin (`skins`) and opaque over much of the
 * skin's tinted `layer`: the plain pieces are drawn over the tint, so the window's colour does not show
 * there - S3's opaque copy of the frame, reported applied while the colour stayed hidden.
 */
const warnPlainOverTint = (theme: ReturnType<typeof themeVariantsData>, sprite: string, skins: readonly string[]) => {
    const assets = GetAssetManager();
    // The skins it is the plain twin of, by their tinted sprite: skins cut from the same pair are said once.
    const byLayer = new Map<string, string[]>();

    for (const id of skins) {
        const at = id.indexOf(':');
        const sprites = themeSkinSprites(theme, id.slice(0, at), id.slice(at + 1));
        const layer = sprites.find(each => each.part === 'layer')?.sprite;

        if (layer && sprites.some(each => (each.part === 'plain') && (each.sprite === sprite))) byLayer.set(layer, [ ...(byLayer.get(layer) ?? []), id ]);
    }

    for (const [ layer, ids ] of byLayer) {
        const layerTexture = assets.getTexture(layer);
        const plainTexture = assets.getTexture(sprite);
        const layerAlpha = layerTexture && getTextureAlpha(layerTexture);
        const plainAlpha = plainTexture && getTextureAlpha(plainTexture);

        if (!layerAlpha || !plainAlpha) continue;

        const cover = plainCoverOfTint(layerAlpha, plainAlpha);

        if (cover > PLAIN_COVER_WARNED) console.warn(LOG, `${THEME_SKIN_LIBRARY}/${sprite} is opaque over ${Math.round(cover * 100)}% of ${layer}, the tinted art of ${ids.map(skinName).join(', ')}: the -plain twin is drawn over the tint, so the window's colour does not show there. Leave it transparent wherever the colour should show.`);
    }
};

/**
 * Starts the check for the theme sheet sprites `assets` (the window manager library's `asset.overlays`
 * entries, by asset name). Development builds only; once.
 */
export const checkThemeOverlays = (assets: Iterable<string>): void => {
    if (!import.meta.env.DEV) return;

    const overlays = new Set([ ...assets ].filter(asset => asset.startsWith('theme-')));

    if (!overlays.size) return;

    // Texture keys drawn so far, and the sprites they are.
    const drawnKeys = new Set<string>();
    const drawn = new Set<string>();
    const warned = new Set<string>();
    // The overlays checked for a -plain twin drawn over the tint.
    const plainChecked = new Set<string>();
    let timer: ReturnType<typeof setTimeout> | undefined;

    const check = async () => {
        const theme = themeVariantsData();
        const frames = themeSheetFrames();
        const bySprite = themeSpriteSkins(theme);
        const map = await loadSkinMap();
        const windowsOf = (skins: readonly string[]) => skinWindowsLine(Object.assign({}, ...skins.map(id => map?.skins[id]?.windows ?? {})) as Record<string, string[]>);
        const size = (sprite: string) => {
            const frame = frames?.[sprite]?.frame;

            return frame ? ` ${frame.w}x${frame.h}` : '';
        };

        for (const sprite of overlays) {
            const key = `${THEME_SKIN_LIBRARY}/${sprite}`;
            const skins = bySprite.get(sprite) ?? [];

            if (!plainChecked.has(sprite)) {
                plainChecked.add(sprite);
                warnPlainOverTint(theme, sprite, skins);
            }

            if (!skins.length) {
                console.warn(LOG, `${key}: no skin of the theme draws that sprite, so the overlay shows nowhere.`);
                overlays.delete(sprite);
            } else if (drawn.has(sprite)) {
                console.info(LOG, `${key} re-skins every window drawing ${skins.map(skinName).join(', ')} - ${map ? windowsOf(skins) : 'skins.json lists them'} - and the windows Nitro draws itself with it.`);
                overlays.delete(sprite);
            } else if (!warned.has(sprite)) {
                const components = new Set(skins.map(id => id.slice(0, id.indexOf(':'))));
                // The sprites of that kind the windows do draw, by the skins they are the art of.
                const instead = new Map<string, string[]>();

                for (const other of drawn) {
                    const of = bySprite.get(other) ?? [];

                    if (!of.some(id => components.has(id.slice(0, id.indexOf(':'))))) continue;

                    const group = of.map(skinName).join(', ');

                    instead.set(group, [ ...(instead.get(group) ?? []), `${other}${size(other)}` ]);
                }

                const insteadLine = [ ...instead ].map(([ group, sprites ]) => `${group} (${sprites.slice(0, 2).join(', ')}${(sprites.length > 2) ? ` and ${sprites.length - 2} more` : ''})`).join('; ');

                console.warn(LOG, `${key}: no window drawn since the page loaded draws it. It is the art of ${skins.map(skinName).join(', ')} (${map ? windowsOf(skins) : 'see skins.json'}).${insteadLine ? ` The windows drawn so far draw ${insteadLine}.` : ''}`);
                warned.add(sprite);
            }
        }

        if (!overlays.size) watchThemeDraws(undefined);
    };

    watchThemeDraws((themeKey) => {
        if (drawnKeys.has(themeKey)) return;

        drawnKeys.add(themeKey);

        const sprite = skinSpriteOf(themeKey, themeTextureAliases());

        if (sprite) drawn.add(sprite);

        clearTimeout(timer);
        timer = setTimeout(() => void check(), SETTLE_MS);
    });
};
