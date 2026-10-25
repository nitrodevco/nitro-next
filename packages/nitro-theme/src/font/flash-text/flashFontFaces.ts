/**
 * The Flash client's own font table: each face `theme/font/flash-text` draws, and the captured AIR
 * bundle (`public/assets/fonts/*.air51.json`, shipped in `fonts.nitro`) its outlines come from.
 * `Volter Bold` is both a weight of Volter and a family of its own.
 *
 * A module of its own, with no imports, because two loaders read it: `preloadFlashFonts` registers the
 * faces from the `fonts` bundle at the client's boot, and Nitro Studio's chat bubble builder
 * (`packages/nitro-studio/src/lib/flashText.ts`) registers the same bundles to draw its bubbles
 * in the client's own text.
 */
export interface FlashFontFace {
    family: string;
    weight: '400' | '700';
    style: 'normal' | 'italic';
    bundle: string;
}

export const FLASH_FONT_FACES: readonly FlashFontFace[] = [
    { family: 'Volter', weight: '400', style: 'normal', bundle: 'volter.air51.json' },
    { family: 'Volter', weight: '700', style: 'normal', bundle: 'volter-bold.air51.json' },
    { family: 'Volter Bold', weight: '400', style: 'normal', bundle: 'volter-bold.air51.json' },
    { family: 'Ubuntu', weight: '400', style: 'normal', bundle: 'ubuntu-regular.air51.json' },
    { family: 'Ubuntu', weight: '700', style: 'normal', bundle: 'ubuntu-bold.air51.json' },
    { family: 'Ubuntu', weight: '400', style: 'italic', bundle: 'ubuntu-italic.air51.json' },
    { family: 'Ubuntu', weight: '700', style: 'italic', bundle: 'ubuntu-bold-italic.air51.json' },
    { family: 'UbuntuCondensed', weight: '400', style: 'normal', bundle: 'ubuntu-condensed.air51.json' },
];
