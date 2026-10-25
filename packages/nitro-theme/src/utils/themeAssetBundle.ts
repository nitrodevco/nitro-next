/**
 * Loads the theme out of the window manager library's bundle (`habbo-window-manager-com`, the library
 * the Habbo client draws its window skins from) and hands it to the registries the chrome reads, once
 * at boot.
 *
 * Nitro Studio builds the theme from the client release (`server/theme/clientTheme.ts` there) into that
 * bundle beside the library's templates and bitmaps: the sprites the theme draws packed into one sheet
 * (`theme.png`) plus a Pixi `SpritesheetData` manifest (`theme_spritesheet.json`), and
 * `theme-variants.json` - every variant, the cascade and the icon set (`themeRegistry.ts`).
 * `AssetManager` has already made the sheet one GPU upload and cut a `Texture` per sprite out of it
 * by the time this runs. What is left is naming them the way the theme does - a sprite `theme-<x>` is
 * the texture key `<x>-src`, and the file's `textures` name the keys drawn from another sprite:
 *
 * - the variants go into `themeRegistry`, which every theme component reads its variant from;
 * - each sprite's `Texture` goes into `usePixiTexture`'s cache under its theme key, so a lookup
 *   during render is a synchronous `Map` read and no component ever builds a texture;
 * - the decoded sheet and its rects go to `themeSprites.ts`, which cuts the standalone copies a
 *   tiling sprite or a shadow needs out of it on demand, once per key;
 * - `text-styles.json`, when the bundle has one, sets the text styles it changes
 *   (`setTextStyleOverrides`) - the Habbo client reads its text styles out of that library too
 *   (`TextSkinRenderer.parse`), so a theme pack's skin can set its texts in another face;
 * - `text-faces.json`, when the bundle has one, sets the faces a layout's text names itself
 *   (`font_face`), which no style reaches (`setFontFaceOverrides`).
 *
 * The client ships no theme of its own: the hotel serves the bundle as it does any library's, from
 * `asset.bundles.templates` (`assetBundleUrl`), or a theme pack from its own url - and a pack's url
 * that does not load falls back to the hotel's, with the failure on the console (`DownloadTemplateBundle`).
 * If the hotel's own fails, the chrome is missing and the error is on the console - which is the intent,
 * an asset silently taking the slow path is how a regression hides.
 */
import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { SpritesheetData, Texture } from 'pixi.js';

import { registerThemeTexture, resetThemeTextures } from '../hooks/usePixiTexture';
import { themeHost } from '../host';
import { setFontFaceOverrides, setTextStyleOverrides } from './textStyles';
import { registerThemeVariants, themeTextureAliases, ThemeVariantsData } from './themeRegistry';
import { registerThemeAtlas, resetThemeSprites, themeTextureKeys } from './themeSprites';

/** What the theme's sheet and its manifest are named after, in whichever bundle carries them. */
const THEME_NAME = 'theme';

/** The bundle that carries the theme: the window manager library's. */
const BUNDLE_NAME = 'habbo-window-manager-com';

/** `theme-variants.json`, by the name `getBundleFile` knows a bundle's JSON by. */
const THEME_VARIANTS_FILE = 'theme-variants';

/** `text-styles.json`: the text styles the theme sets in place of the client's (`TextStyleOverrides`). */
const TEXT_STYLES_FILE = 'text-styles';

/** `text-faces.json`: the faces the theme draws in place of those a layout names itself (`FontFaceOverrides`). */
const TEXT_FACES_FILE = 'text-faces';

/**
 * Loads the theme from its bundle - the window manager's, or another the host serves a theme under:
 * art that changed is a bundle of its own, a bundle once fetched being kept by its name
 * (`resetThemeArtCaches` first, so nothing cut from the old art is drawn again).
 */
export const preloadThemeAssets = async (bundle: string = BUNDLE_NAME): Promise<void> => {
    if (!await themeHost().loadAssetBundle(bundle)) return;

    const assetManager = GetAssetManager();
    // The sheet and its manifest are named after the theme, whatever bundle carries them.
    const manifest = assetManager.getBundleFile<SpritesheetData>(bundle, `${THEME_NAME}_spritesheet`);
    // `processNitroBundle` registers the sheet itself under the manifest's own name.
    const sheet = assetManager.getTexture(`${THEME_NAME}_spritesheet`);

    const variants = assetManager.getBundleFile<ThemeVariantsData>(bundle, THEME_VARIANTS_FILE);

    if (!manifest?.frames || !sheet) return;

    if (variants) registerThemeVariants(variants);

    setTextStyleOverrides('theme', assetManager.getBundleFile(bundle, TEXT_STYLES_FILE));
    setFontFaceOverrides('theme', assetManager.getBundleFile(bundle, TEXT_FACES_FILE));

    // A sprite the hotel replaced (`asset.overlays`, put in the asset manager as the bundle loaded) is a
    // texture of its own: drawn as it is, and sliced from its own bitmap.
    const overlays = new Map<string, { x: number; y: number; width: number; height: number; image: CanvasImageSource }>();

    for (const [ key, asset ] of themeTextureKeys(Object.keys(manifest.frames), themeTextureAliases())) {
        const texture: Texture | undefined = assetManager.getTexture(asset);

        if (!texture) continue;

        registerThemeTexture(key, texture);

        if (texture.source !== sheet.source && texture.source.resource) overlays.set(asset, { x: texture.frame.x, y: texture.frame.y, width: texture.frame.width, height: texture.frame.height, image: texture.source.resource as CanvasImageSource });
    }

    // The `ImageBitmap` the bundle decoded to: a `CanvasImageSource`, which is all a slice needs.
    const image: CanvasImageSource | undefined = sheet.source.resource;

    if (!image) return;

    registerThemeAtlas({ image }, manifest.frames, themeTextureAliases(), overlays);

    // The bundle's data is kept: the window manager's carries the library's templates too, which
    // `useTemplate` reads as they are drawn.
};

/** Forgets the theme's art - its textures, its sheet and all cut from them - before new art is loaded (`preloadThemeAssets`). */
export const resetThemeArtCaches = (): void => {
    resetThemeTextures();
    resetThemeSprites();
};
