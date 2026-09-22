/**
 * The colours the collectibles windows set by code: the renderers' border palettes
 * (`AbstractCollectibleItemRenderer`) and a colour turned into what the theme takes.
 */

/**
 * A Flash window colour (`0xRRGGBB`, an alpha byte ignored) as the `#rrggbb` a theme component's
 * `tintColor` / `backgroundColor` takes - for the colours the collectibles windows set by code
 * (the renderers' palettes, the progress colours, the rarity colour).
 */
export const toCollectiblesCssColor = (color: number): string => `#${(color & 0xffffff).toString(16).padStart(6, '0')}`;

/** `AbstractCollectibleItemRenderer.incompleteColoring` / `completeColoring`: `[ background, outline ]`. */
const COLLECTIBLE_ITEM_COLORING = {
    incomplete: { active: [ 15132390, 16777215 ], hovered: [ 14409183, 16119544 ], normal: [ 13159891, 9412017 ] },
    complete: { active: [ 14872032, 16777215 ], hovered: [ 14346200, 16119544 ], normal: [ 13820623, 8823170 ] },
} as const;

/** `updateColoring`. */
export const getCollectibleItemColoring = (complete: boolean, hovered: boolean, active: boolean): readonly [ number, number ] => {
    const coloring = complete ? COLLECTIBLE_ITEM_COLORING.complete : COLLECTIBLE_ITEM_COLORING.incomplete;

    return hovered ? coloring.hovered : (active ? coloring.active : coloring.normal);
};
