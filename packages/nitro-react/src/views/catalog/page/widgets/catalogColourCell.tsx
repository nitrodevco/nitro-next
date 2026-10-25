/**
 * A colour grid's swatch, as `ColourGridCatalogWidget.createColorContainer` builds it - shared by
 * the colour grid widget and the recolorable furniture page's palette.
 */
import { Template, TemplateItem } from '@nitrodevco/nitro-theme';

import { LayoutImage, ThemeImage } from '#base/theme';
import { toCssHexColor } from '#base/utils';

/** The swatches on show and the art they are drawn with - what `onAvailableColours` / `onAvailableMultiColours` keep. */
export interface ColourGridState {
    /** One entry per swatch: one colour, or two for a two-tone swatch. */
    colours: readonly (readonly number[])[];
    backgroundAssetName: string;
    colourAssetName: string;
    chosenColourAssetName: string;
}

/** The catalogue art a colour event names (`ctlg_clr_27x22_*`, `ctlg_clr_40x32_*`), as its bundled asset. */
export const catalogAsset = (name: string) => LayoutImage(`habbo-catalog-com/${name}.png`);

/** The same, as a template's asset name. */
const catalogAssetName = (name: string) => `habbo-catalog-com-${name}`;

/** A swatch's tint: `createColorContainer`'s multiply, none for a negative colour (its 255s). */
const toTint = (colour: number) => ((colour < 0) ? undefined : (colour & 0xFFFFFF));

/**
 * One swatch - `color_chooser_cell` built by `createColorContainer`: white-filled and the size of
 * the background art, the background (`BG_BORDER`), the colour art multiplied by the colour
 * (`COLOR_IMAGE`) - its right half by the second colour of a two-tone swatch, which keeps the first
 * colour when the second is negative - and the chosen art (`COLOR_CHOSEN`) on the selected one.
 */
export const colourCellItem = (from: Template, colours: readonly number[], index: number, state: ColourGridState, width: number, height: number, chosen: boolean, onPress: () => void): TemplateItem => {
    const half = Math.floor(width / 2);
    const first = colours[0];
    const second = (colours.length > 1) ? ((colours[1] >= 0) ? colours[1] : first) : undefined;
    const secondTint = (second === undefined) ? undefined : toTint(second);

    return {
        key: String(index),
        from,
        bindings: {
            '': { background: true, color: 0xFFFFFFFF, onPointerTap: onPress },
            '#BG_BORDER': { asset: catalogAssetName(state.backgroundAssetName) },
            '#COLOR_IMAGE': {
                asset: catalogAssetName(state.colourAssetName),
                color: toTint(first),
                children: (second !== undefined) && (
                    <ThemeImage
                        src={catalogAsset(state.colourAssetName)}
                        frame={{ x: half, y: 0, width: width - half, height }}
                        tint={(secondTint === undefined) ? undefined : toCssHexColor(secondTint)}
                        layout={{ position: 'absolute', left: half, top: 0 }}
                    />
                ),
            },
            '#COLOR_CHOSEN': { visible: chosen, asset: catalogAssetName(state.chosenColourAssetName) },
        },
        arrange: ({ root }) => root()?.setRectangle(0, 0, width, height),
    };
};
