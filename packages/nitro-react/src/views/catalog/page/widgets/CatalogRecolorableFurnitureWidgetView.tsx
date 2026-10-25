import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { useState } from 'react';

import { CatalogWidgetEventEnum } from '#base/context/catalog';
import { useConfigData } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { useTemplateLibrary } from '#base/theme';
import { configReader, createRecolorableStuffData, getOfferProduct, getRecolorableColors, recolorableExtraParam } from '#base/utils';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CATALOG_LIBRARY, catalogTemplateId } from '../catalogTemplates';
import { useCatalogWidgetView } from '../catalogWidgetView';
import { catalogAsset, colourCellItem, ColourGridState } from './catalogColourCell';

/** The art `onOfferSelected` hands its colour grid (`CatalogWidgetColoursEvent`). */
const PALETTE_ART: Omit<ColourGridState, 'colours'> = { backgroundAssetName: 'ctlg_clr_27x22_1', colourAssetName: 'ctlg_clr_27x22_2', chosenColourAssetName: 'ctlg_clr_27x22_3' };

/**
 * The recolorable furniture page's palette (WIN63-202610121624 `RecolorableFurnitureCatalogWidget`,
 * page layout `recolorable_furniture`, container `recolorableFurnitureWidget` with its
 * `palette/colourGrid`). The page selects its first offer once its widgets are in. On each selected
 * offer the palette is the furni class's (`getRecolorableColors`), keeping the colour picked when the
 * new palette has it, else its first; a picked colour becomes every page offer's `r,g,b` extra
 * parameter (each clamped to its own palette), which placement sends, and the preview's map data.
 */
export const CatalogRecolorableFurnitureWidgetView = ({ page }: CatalogWidgetProps) => {
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
    const { configString } = configReader(useConfigData());
    const [ colors, setColors ] = useState<number[]>([]);
    const [ color, setColor ] = useState(0xffffff);

    const colorsOf = (className: string | undefined) => (className ? getRecolorableColors(configString, className) : []);

    const applyColor = (picked: number) => {
        setColor(picked);

        for (const offer of page.offers) {
            const allowed = colorsOf(getOfferProduct(offer)?.furnitureData?.className);

            if (allowed.length) page.setProductExtraParam(offer, recolorableExtraParam(allowed.includes(picked) ? picked : allowed[0]));
        }

        page.dispatchWidgetEvent({ type: CatalogWidgetEventEnum.SET_PREVIEWER_STUFFDATA, stuffData: createRecolorableStuffData(recolorableExtraParam(picked)) });
    };

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.WIDGETS_INITIALIZED, () => {
        if (page.offers.length) page.selectOffer(page.offers[0].offerId);
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, (event) => {
        const allowed = colorsOf(getOfferProduct(event.offer)?.furnitureData?.className);

        setColors(allowed);

        // Flash hands the previewer null here; the product's own data then stands.
        if (!allowed.length) return;

        applyColor(allowed.includes(color) ? color : allowed[0]);
    });

    const background = GetAssetManager().getTexture(catalogAsset(PALETTE_ART.backgroundAssetName));
    const state: ColourGridState = { colours: colors.map(c => [ c ]), ...PALETTE_ART };

    useCatalogWidgetView(templates && {
        bindings: {
            'palette/colourGrid': {
                items: background
                    ? colors.map((swatch, index) => colourCellItem(templates[catalogTemplateId('color_chooser_cell')], [ swatch ], index, state, background.width, background.height, swatch === color, () => applyColor(swatch)))
                    : [],
            },
        },
    });

    return null;
};
