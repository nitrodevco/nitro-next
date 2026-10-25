import { useEffect, useState } from 'react';

import { getSellablePetPalettes } from '#base/commands';
import { CatalogSellablePetPalette, CatalogWidgetEventEnum, getCatalogPageText, PetImageRequest, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigData, useTranslation, useWindowActions } from '#base/context/system';
import { useCatalogWidgetEvent, usePetImageTexture } from '#base/hooks';
import { ThemeImage, useTemplateLibrary } from '#base/theme';
import { CATALOG_NEW_PETS_FIRST_TYPE, getPetPurchaseParameter, getPetRaceLocalizationKey, getPetTypeIndexFromProduct, parseSellablePetPalettes, PET_AVAILABLE_COLORS } from '#base/utils';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CATALOG_LIBRARY } from '../catalogTemplates';
import { useCatalogWidgetView } from '../catalogWidgetView';
import { priceBoxItem } from './catalogPrice';
import { usePetNamePurchase } from './usePetNamePurchase';

/** `getPetImage(type, palette, colour, new Vector3d(90, 0, 0), 64, this)`. */
const PET_IMAGE_DIRECTION = 90;

/** `getPetImage`'s colour when the colour index is past the table: white. */
const DEFAULT_PET_COLOR = 0xffffff;

/**
 * The old pet page's widget, the embedded `petsWidget` of `layout_pets.xml` - Flash's
 * `PetsCatalogWidget`, for pet types 0-7. A page whose first offer is a newer pet is
 * `NewPetsCatalogWidget`'s: this one's `init()` fails and `removeWidgets` takes its container off
 * the page with the widgets inside it (`removed`).
 *
 * The page sells one pet (the first offer): the user picks a breed in `type_drop_menu` (the
 * product's sellable palettes, asked for through `getSellablePetPalettes` and kept by the
 * catalogue, listed only when there is more than one), a colour in the colour grid (this widget's
 * fixed per-type table, `PET_AVAILABLE_COLORS`, sent as `CatalogWidgetColoursEvent` - the grid's
 * container is `blend="0"`, which draws into its parent's context, so only its own face is faded
 * and the swatches show), and types a name into
 * `name_input_text`. `ctlg_teaserimg_1` shows the pet at double size, centred, redrawn on every
 * pick (`updateImage`), with the offer's price box against its bottom right corner
 * (`showPriceOnProduct(offer, _window, box, ctlg_teaserimg_1, -6, false, 6)`).
 *
 * The widget takes the buy button over (`CatalogWidgetPurchaseOverrideEvent`): buying first sends
 * the name for approval (`approveName(name, 1)`), and the answer (`CWE_APPROVE_RESULT`) either
 * alerts why the name was refused or opens the purchase confirmation with the extra parameter
 * `name \n paletteId \n RRGGBB`. When the pet's library finishes loading, the widget runs its
 * `WIDGETS_INITIALIZED` again (`imageReady`), as Flash does.
 *
 * `ctlg_teaserimg_1` is also a page image slot, which `LocalizationCatalogWidget` fills with the
 * page's catalogue picture; `setPreviewImage` clears the bitmap before drawing the pet, so once the
 * pet is drawn the picture is not. The texts are the page's (`LocalizationCatalogWidget`), set here
 * too because the layout has a second set in `newPetsWidget`.
 */
export const CatalogPetsWidgetView = ({ page }: CatalogWidgetProps) => {
    const firstOffer = page.offers[0];
    const productCode = firstOffer?.localizationId ?? '';
    const petType = firstOffer ? getPetTypeIndexFromProduct(productCode) : -1;
    const initialised = !!firstOffer && (petType < CATALOG_NEW_PETS_FIRST_TYPE);
    const cachedPalettes = useCatalogStore(x => x.sellablePetPalettes[productCode]);
    const [ availablePalettes, setAvailablePalettes ] = useState<CatalogSellablePetPalette[] | undefined>(() => parseSellablePetPalettes(cachedPalettes, petType));
    const [ paletteIndex, setPaletteIndex ] = useState(0);
    const [ colourIndex, setColourIndex ] = useState(0);
    const [ name, setName ] = useState('');
    const [ imageRequest, setImageRequest ] = useState<PetImageRequest | undefined>(undefined);
    const [ priceShown, setPriceShown ] = useState(false);
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const { showAlert } = useWindowActions();
    const t = useTranslation();
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
    const config = useConfigData();
    const availableColors = PET_AVAILABLE_COLORS[petType] ?? [];

    /** `getPetImage`'s request for these picks, or `undefined` when there is no palette to draw. */
    const getPetImageRequest = (palettes: CatalogSellablePetPalette[] | undefined, palette: number, colour: number): PetImageRequest | undefined => {
        if (!palettes || (palette >= palettes.length)) return undefined;

        const color = ((colour >= 0) && (colour < availableColors.length)) ? availableColors[colour] : DEFAULT_PET_COLOR;

        return { typeId: petType, paletteId: palettes[palette].paletteId, color, direction: PET_IMAGE_DIRECTION };
    };

    /** `updateImage`: redraw the pet (a failed render keeps the last one) and show the price box. */
    const updateImage = (palettes: CatalogSellablePetPalette[] | undefined, palette: number, colour: number) => {
        if (!firstOffer || (palette < 0)) return;

        const request = getPetImageRequest(palettes, palette, colour);

        if (request) setImageRequest(request);

        setPriceShown(true);
    };

    /** `getPurchaseParameters`: the extra parameter, or '' - with the empty name alert when there is no name. */
    const getPurchaseParameters = (): string => {
        if (!name.length) {
            showAlert(t('catalog.alert.purchaseerror.title'), t('catalog.alert.petname.empty'));

            return '';
        }

        if (!availablePalettes || (paletteIndex >= availablePalettes.length)) return '';

        if (colourIndex >= availableColors.length) return '';

        return getPetPurchaseParameter(name, availablePalettes[paletteIndex].paletteId, availableColors[colourIndex]);
    };

    const { overridePurchase } = usePetNamePurchase(page, {
        initialised,
        name,
        offer: firstOffer,
        getPurchaseParameters,
        getPetImageRequest: () => getPetImageRequest(availablePalettes, paletteIndex, colourIndex),
    });

    /** `onWidgetsInitialized`: take the buy button, select the page's pet, send the colours. */
    const onWidgetsInitialized = () => {
        overridePurchase();

        if (firstOffer) page.events.dispatchEvent({ type: CatalogWidgetEventEnum.SELECT_PRODUCT, offer: firstOffer });

        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.COLOUR_ARRAY, colours: availableColors.slice(), backgroundAssetName: 'ctlg_clr_27x22_1', colourAssetName: 'ctlg_clr_27x22_2', chosenColourAssetName: 'ctlg_clr_27x22_3', index: 0 });
    };

    const petTexture = usePetImageTexture(imageRequest, () => onWidgetsInitialized());

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, () => {
        if (initialised) updateImage(availablePalettes, paletteIndex, colourIndex);
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.COLOUR_INDEX, (event) => {
        if (!initialised) return;

        let index = event.index;

        if ((index < 0) || (index > availableColors.length)) index = 0;

        setColourIndex(index);
        updateImage(availablePalettes, paletteIndex, index);
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.WIDGETS_INITIALIZED, () => {
        if (initialised) onWidgetsInitialized();
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELLABLE_PET_PALETTES, (event) => {
        if (!initialised || (event.productCode !== productCode)) return;

        const palettes = parseSellablePetPalettes(event.sellablePalettes, petType);

        setAvailablePalettes(palettes);
        setPaletteIndex(0);
        updateImage(palettes, 0, colourIndex);
    });

    // `init()` -> `updateAvailablePalettes`: a product the catalogue has no palettes for is asked about.
    useEffect(() => {
        if (initialised && !cachedPalettes) getSellablePetPalettes(send, store, productCode);
    }, [ page ]);

    // `updatePaletteSelections`: the breeds by name, listed only when there is a choice.
    const breeds = (availablePalettes ?? []).map(palette => t(getPetRaceLocalizationKey(petType, palette.breedId), getPetRaceLocalizationKey(petType, palette.breedId)));

    const selectBreed = (index: number) => {
        if (!availablePalettes || (index >= availablePalettes.length)) return;

        setPaletteIndex(index);
        updateImage(availablePalettes, index, colourIndex);
    };

    const priceBox = (templates && priceShown && firstOffer)
        ? priceBoxItem(templates, firstOffer, { config, builder: page.isBuilderPage, placement: { reference: 'ctlg_teaserimg_1', dx: -6, top: false, dy: 6 } })
        : undefined;
    const pageText = (elementName: string) => {
        const text = getCatalogPageText(page, elementName);

        return (text === undefined) ? {} : { caption: text };
    };

    useCatalogWidgetView(initialised
        ? {
                bindings: {
                    '': { added: priceBox ? [ priceBox ] : [] },
                    ctlg_teaserimg_1: petTexture
                        ? {
                                asset: '',
                                children: (
                                    <ThemeImage
                                        texture={petTexture}
                                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', zoomX: 2, zoomY: 2 }}
                                        layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                                    />
                                ),
                            }
                        : {},
                    ctlg_text_1: pageText('ctlg_text_1'),
                    ctlg_text_2: pageText('ctlg_text_2'),
                    ctlg_text_3: pageText('ctlg_text_3'),
                    type_drop_menu: {
                        visible: !availablePalettes || (breeds.length > 1),
                        options: breeds,
                        selection: paletteIndex,
                        onSelect: selectBreed,
                    },
                    name_input_text: { caption: name, onChange: setName },
                },
            }
        : { bindings: {}, removed: true });

    return null;
};
