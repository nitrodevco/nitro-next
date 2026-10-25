import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { useState } from 'react';

import { CatalogWidgetEventEnum } from '#base/context/catalog';
import { useCatalogWidgetEvent } from '#base/hooks';
import { useTemplateLibrary } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CATALOG_LIBRARY, catalogTemplateId } from '../catalogTemplates';
import { fitWidgetView, useCatalogWidgetView } from '../catalogWidgetView';
import { catalogAsset, colourCellItem, ColourGridState } from './catalogColourCell';

/**
 * The colour picker of a page, `colourGridWidget.xml` - Flash's `ColourGridCatalogWidget`: the
 * view takes the container's size unless it is tagged `FIXED`, and its `colourGrid` holds the
 * swatches.
 *
 * The swatches come with the events: `COLOUR_ARRAY` (one colour each, from the item grid, the
 * trophies and the old pets; the given index is selected) and `MULTI_COLOUR_ARRAY` (two-tone, from
 * the new pets; the first is selected). A click selects the swatch and sends its index
 * (`CatalogWidgetColourIndexEvent`). Each cell is as big as the event's background art.
 */
export const CatalogColourGridWidgetView = ({ page, tags }: CatalogWidgetProps) => {
    const [ state, setState ] = useState<ColourGridState | undefined>(undefined);
    const [ chosenIndex, setChosenIndex ] = useState(-1);
    const templates = useTemplateLibrary(CATALOG_LIBRARY);

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

    const select = (index: number) => {
        setChosenIndex(index);
        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.COLOUR_INDEX, index });
    };

    useCatalogWidgetView(templates && {
        template: 'colourGridWidget',
        bindings: {
            colourGrid: {
                items: (state && (cellWidth > 0))
                    ? cells.map(cell => colourCellItem(templates[catalogTemplateId('color_chooser_cell')], cell.colours, cell.index, state, cellWidth, cellHeight, cell.index === chosenIndex, () => select(cell.index)))
                    : [],
            },
        },
        arrange: isFixed ? undefined : fitWidgetView,
    });

    return null;
};
