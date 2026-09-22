import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { useState } from 'react';

import { CatalogWidgetEventEnum } from '#base/context/catalog';
import { useCatalogWidgetEvent } from '#base/hooks';
import { Border, InfiniteGrid, LayoutImage, Region, ThemeImage } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';

/** The swatches on show and the art they are drawn with - what `onAvailableColours` / `onAvailableMultiColours` keep. */
interface ColourGridState {
    /** One entry per swatch: one colour, or two for a two-tone swatch. */
    colours: readonly (readonly number[])[];
    backgroundAssetName: string;
    colourAssetName: string;
    chosenColourAssetName: string;
}

/** The catalogue art a colour event names (`ctlg_clr_27x22_*`, `ctlg_clr_40x32_*`), as its bundled asset. */
const catalogAsset = (name: string) => LayoutImage(`catalog/${name}.png`);

/** `0xRRGGBB` as a tint, white (no change) for a negative colour - `createColorContainer`'s 255s. */
const toTint = (colour: number) => ((colour < 0) ? '#ffffff' : `#${(colour & 0xFFFFFF).toString(16).padStart(6, '0')}`);

interface ColourCellViewProps {
    colours: readonly number[];
    state: ColourGridState;
    width: number;
    height: number;
    chosen: boolean;
    onPress: () => void;
}

/**
 * One swatch - `color_chooser_cell.xml` built by `createColorContainer`: a white-filled cell the
 * size of the background art, the background (`BG_BORDER`), the colour art multiplied by the
 * colour (`COLOR_IMAGE`) - its right half by the second colour of a two-tone swatch, which keeps
 * the first colour when the second is negative - and the chosen art (`COLOR_CHOSEN`) on the
 * selected one.
 */
const ColourCellView = ({ colours, state, width, height, chosen, onPress }: ColourCellViewProps) => {
    const half = Math.floor(width / 2);
    const first = colours[0];
    const second = (colours.length > 1) ? ((colours[1] >= 0) ? colours[1] : first) : undefined;

    return (
        <Region
            name="color_chooser_cell"
            backgroundColor="#ffffff"
            backgroundAlpha={1}
            cursor="pointer"
            onPointerTap={onPress}
            layout={{ position: 'absolute', left: 0, width, top: 0, height }}
        >
            <ThemeImage
                name="border"
                src={catalogAsset(state.backgroundAssetName)}
                layout={{ position: 'absolute', left: 0, top: 0 }}
            />
            <ThemeImage
                name="color"
                src={catalogAsset(state.colourAssetName)}
                tint={toTint(first)}
                layout={{ position: 'absolute', left: 0, top: 0 }}
            />
            {(second !== undefined) && (
                <ThemeImage
                    src={catalogAsset(state.colourAssetName)}
                    frame={{ x: half, y: 0, width: width - half, height }}
                    tint={toTint(second)}
                    layout={{ position: 'absolute', left: half, top: 0 }}
                />
            )}
            {chosen && (
                <ThemeImage
                    name="chosen"
                    src={catalogAsset(state.chosenColourAssetName)}
                    layout={{ position: 'absolute', left: 0, top: 0 }}
                />
            )}
        </Region>
    );
};

/**
 * The colour picker of a page, `colourGridWidget.xml` - Flash's `ColourGridCatalogWidget`: a
 * half-blended style 6 border filling the container (the view takes the container's size unless
 * it is tagged `FIXED`) and the `colourGrid` 2px in, 6px smaller than the container, its swatches
 * 2px apart.
 *
 * The swatches come with the events: `COLOUR_ARRAY` (one colour each, from the item grid, the
 * trophies and the old pets; the given index is selected) and `MULTI_COLOUR_ARRAY` (two-tone, from
 * the new pets; the first is selected). A click selects the swatch and sends its index
 * (`CatalogWidgetColourIndexEvent`). Each cell is as big as the event's background art.
 */
export const CatalogColourGridWidgetView = ({ page, tags }: CatalogWidgetProps) => {
    const [ state, setState ] = useState<ColourGridState | undefined>(undefined);
    const [ chosenIndex, setChosenIndex ] = useState(-1);

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.COLOUR_ARRAY, (event) => {
        setState({ colours: event.colours.map(colour => [ colour ]), backgroundAssetName: event.backgroundAssetName, colourAssetName: event.colourAssetName, chosenColourAssetName: event.chosenColourAssetName });
        setChosenIndex(event.index);
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.MULTI_COLOUR_ARRAY, (event) => {
        setState({ colours: event.colours.map(colour => colour.slice()), backgroundAssetName: event.backgroundAssetName, colourAssetName: event.colourAssetName, chosenColourAssetName: event.chosenColourAssetName });
        setChosenIndex(0);
    });

    const isFixed = tags.includes('FIXED');
    const background = state ? GetAssetManager().getTexture(catalogAsset(state.backgroundAssetName)) : undefined;
    const cellWidth = background?.width ?? 0;
    const cellHeight = background?.height ?? 0;
    // `populateColourGrid` skips an empty entry, and the index a click sends is the cell's place in the grid.
    const cells = state ? state.colours.filter(colours => (colours.length > 0)).map((colours, index) => ({ colours, index })) : [];

    return (
        <Region layout={isFixed ? { position: 'absolute', left: 0, width: 115, top: 0, height: 100 } : { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
            <Border
                variant="6"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Region
                name="colourGrid"
                layout={{ position: 'absolute', left: 2, right: 4, top: 2, bottom: 4, flexDirection: 'column' }}
            >
                {state && (cellWidth > 0) && (
                    <InfiniteGrid
                        items={cells}
                        itemGrid={{ width: cellWidth, height: cellHeight, spacing: 2 }}
                        scrollResetKey={state}
                        getKey={cell => cell.index}
                        itemRender={cell => (
                            <ColourCellView
                                colours={cell.colours}
                                state={state}
                                width={cellWidth}
                                height={cellHeight}
                                chosen={cell.index === chosenIndex}
                                onPress={() => {
                                    setChosenIndex(cell.index);
                                    page.events.dispatchEvent({ type: CatalogWidgetEventEnum.COLOUR_INDEX, index: cell.index });
                                }}
                            />
                        )}
                    />
                )}
            </Region>
        </Region>
    );
};
