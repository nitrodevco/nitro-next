import { IPurchasableOffer, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { CatalogWidgetEventEnum, getCatalogPageImage } from '#base/context/catalog';
import { useConfigValue } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { ContainerButton, Icon, Region, ThemeImage } from '#base/theme';
import { getOfferProduct } from '#base/utils';

import { useFurnitureImageTexture } from '../../useFurnitureImageTexture';
import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CatalogProductPriceView } from './CatalogProductPriceView';

/** `TrophyCatalogWidget.gold` / `silver` / `bronze`: the colour grid's three swatches, in the order its index picks the type. */
const TROPHY_COLOURS: readonly number[] = [ 16763904, 13421772, 13395456 ];
/** The trophy type each colour index stands for (`onColourIndex`). */
const TROPHY_TYPES: readonly string[] = [ 'g', 's', 'b' ];
/** `getFurnitureImage(classId, new Vector3d(2, 0, 0), 64, ...)`: the preview's direction and scale. */
const PREVIEW_DIRECTION = 2;

/** `getTrophyTypeFromProduct`: the `g` / `s` / `b` a trophy's localization id ends in after its last `_`, or '' for none (and for every `prizetrophy_2011_`). */
const getTrophyTypeFromProduct = (localizationId: string): string => {
    if (localizationId.indexOf('prizetrophy_2011_') !== -1) return '';

    const start = localizationId.lastIndexOf('_') + 1;

    if (start <= 0) return '';

    const type = localizationId.substring(start);

    if ((type.length > 1) || ((type !== 'g') && (type !== 's') && (type !== 'b'))) return '';

    return type;
};

/** `getBaseNameFromProduct`: the localization id without its `_<type>`. */
const getBaseNameFromProduct = (localizationId: string): string => {
    const type = getTrophyTypeFromProduct(localizationId);

    if (type.length > 0) return localizationId.slice(0, localizationId.length - 1 - type.length);

    return localizationId;
};

/**
 * `init`'s `_trophyOffers`: the page's offers by model (base name), each model's offers by type,
 * both in page order. A `com.sulake.core.utils.Map` keeps the first value added under a key, so a
 * second offer with the same model and type is not one.
 */
const groupTrophyOffers = (offers: IPurchasableOffer[]): Map<string, Map<string, IPurchasableOffer>> => {
    const models = new Map<string, Map<string, IPurchasableOffer>>();

    for (const offer of offers) {
        const baseName = getBaseNameFromProduct(offer.localizationId);
        const type = getTrophyTypeFromProduct(offer.localizationId);

        if (!models.has(baseName)) models.set(baseName, new Map());

        const types = models.get(baseName)!;

        if (!types.has(type)) types.set(type, offer);
    }

    return models;
};

/** The offer of model `modelIndex` in `type`, or that model's first offer (`getWithIndex(0)`). */
const getTrophyOffer = (models: Map<string, Map<string, IPurchasableOffer>>, modelIndex: number, type: string): IPurchasableOffer | undefined => {
    const types = [ ...models.values() ][modelIndex];

    if (!types) return undefined;

    return types.get(type) ?? types.values().next().value;
};

/**
 * The trophy page's model picker, Flash's `TrophyCatalogWidget` - drawn from `layout_trophies`'
 * `EMBEDDED` container (360x135): the `ctlg_teaserimg_1` bitmap with the preview centred in it,
 * and the `ctlg_prevmodel_button` / `ctlg_nextmodel_button` style 3 container buttons with the
 * left and right arrows (icon styles 2 and 3) at 115,101 and 210,101.
 *
 * The page's offers are trophy models in three metals: `init` groups them by the localization id
 * without its `_g` / `_s` / `_b` (`getBaseNameFromProduct`) and by that letter. The buttons step
 * through the models (wrapping round), the colour grid's pick (`COLOUR_INDEX`: gold, silver,
 * bronze) picks the metal, and either selects the model's offer in that metal - or the model's
 * first offer when it has none. `WIDGETS_INITIALIZED` selects the first model in gold and hands
 * the colour grid its three swatches (`CatalogWidgetColoursEvent` with the `ctlg_clr_40x32_*` art).
 * The inscription typed into the text input widget (`TEXT_INPUT`) becomes the purchase's extra
 * parameter.
 *
 * Whatever selects a product, the preview follows it: the offer's furniture drawn at direction 2
 * and scale 64 (`getFurnitureImage`), centred in the bitmap, with the price box
 * (`showPriceOnProduct(offer, window, _, ctlg_teaserimg_1, 0, false, 0)`) in the bitmap's bottom
 * right corner; a builders club page has no price box. A page with one offer hides both buttons;
 * when that offer cannot be coloured the widget also hides the layout's colour grid, which
 * `CatalogLayoutTrophiesView` does from the same test.
 *
 * Until the first preview the bitmap shows the page's second image, which
 * `LocalizationCatalogWidget.setElementImage` copies into it centred; the preview is drawn over it
 * (`setPreviewImage` clears the bitmap first). Flash's catalogue images load in the background, so
 * one that finishes after the first preview would cover it until the next selection - the port
 * does not reproduce that race. `§_-L1t§.PRODUCT_IMAGES` names no trophy, so its branch is not
 * taken here.
 */
export const CatalogTrophyWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ modelIndex, setModelIndex ] = useState(0);
    const [ trophyType, setTrophyType ] = useState('g');
    const [ offer, setOffer ] = useState<IPurchasableOffer | undefined>(undefined);
    const catalogImageUrl = useConfigValue<string>('asset.urls.catalog') ?? '';
    const models = groupTrophyOffers(page.offers);
    const product = offer ? getOfferProduct(offer) : undefined;
    const pageImage = getCatalogPageImage(page, 'ctlg_teaserimg_1');

    const { texture } = useFurnitureImageTexture(
        product?.furnitureData?.className,
        product?.furnitureData?.colorIndex,
        PREVIEW_DIRECTION,
        RoomGeometryScaleType.ZoomedIn,
        product ? parseInt(product.extraParam) : undefined,
    );

    const selectModel = (index: number, type: string) => {
        const next = getTrophyOffer(models, index, type);

        if (next) page.events.dispatchEvent({ type: CatalogWidgetEventEnum.SELECT_PRODUCT, offer: next });
    };

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, event => setOffer(event.offer));

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.COLOUR_INDEX, (event) => {
        const type = TROPHY_TYPES[event.index] ?? trophyType;

        setTrophyType(type);
        selectModel(modelIndex, type);
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.TEXT_INPUT, event => page.events.dispatchEvent({ type: CatalogWidgetEventEnum.SET_EXTRA_PARAMETER, parameter: event.text }));

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.WIDGETS_INITIALIZED, () => {
        selectModel(modelIndex, trophyType);

        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.COLOUR_ARRAY, colours: TROPHY_COLOURS, backgroundAssetName: 'ctlg_clr_40x32_1', colourAssetName: 'ctlg_clr_40x32_2', chosenColourAssetName: 'ctlg_clr_40x32_3', index: 0 });
    });

    const stepModel = (step: number) => {
        let index = modelIndex + step;

        if (index >= models.size) index = 0;
        if (index < 0) index = models.size - 1;

        setModelIndex(index);
        selectModel(index, trophyType);
    };

    const singleOffer = (page.offers.length === 1);

    return (
        <Region layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
            <ThemeImage
                name="ctlg_teaserimg_1"
                texture={offer ? texture : undefined}
                src={(!offer && pageImage) ? catalogImageUrl.replace('%name%', pageImage) : undefined}
                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            {!singleOffer && (
                <>
                    <ContainerButton
                        variant="3"
                        name="ctlg_prevmodel_button"
                        onPointerTap={() => stepModel(-1)}
                        layout={{ position: 'absolute', left: 115, width: 30, top: 101, height: 30, maxWidth: 100 }}
                    >
                        <Icon
                            variant="2"
                            name="icon"
                            tintColor="#000000"
                            layout={{ position: 'absolute', left: 9, width: 13, top: 8, height: 13 }}
                        />
                    </ContainerButton>
                    <ContainerButton
                        variant="3"
                        name="ctlg_nextmodel_button"
                        onPointerTap={() => stepModel(1)}
                        layout={{ position: 'absolute', left: 210, width: 30, top: 101, height: 30, maxWidth: 100 }}
                    >
                        <Icon
                            variant="3"
                            name="icon"
                            tintColor="#000000"
                            layout={{ position: 'absolute', left: 9, width: 13, top: 8, height: 13 }}
                        />
                    </ContainerButton>
                </>
            )}
            {offer && !page.isBuilderPage && (
                <CatalogProductPriceView
                    offer={offer}
                    layout={{ right: 0, bottom: 0 }}
                />
            )}
        </Region>
    );
};
