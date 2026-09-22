import { useEffect, useRef, useState } from 'react';

import { APPROVE_NAME_TYPE_PET, approveName, getSellablePetPalettes, purchaseWillBeGift, showPurchaseConfirmation } from '#base/commands';
import { CatalogSellablePetPalette, CatalogWidgetEventEnum, getCatalogPageText, PetImageRequest, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation, useWindowActions } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { Border, Dropmenu, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { getPetPurchaseParameter, getPetRaceLocalizationKey, getPetTypeIndexFromProduct, parseSellablePetPalettes, PET_AVAILABLE_COLORS, PET_NAME_ERRORS } from '#base/utils';

import { usePetImageTexture } from '../../usePetImageTexture';
import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CatalogProductPriceView } from './CatalogProductPriceView';

/** `petsWidget` is the page for pet types below this; `newPetsWidget` takes the rest. */
const NEW_PETS_FIRST_TYPE = 8;

/** `name_input_text`'s `max_chars`. */
const NAME_MAX_CHARS = 15;

/** `getPetImage(type, palette, colour, new Vector3d(90, 0, 0), 64, this)`. */
const PET_IMAGE_DIRECTION = 90;

/** `getPetImage`'s colour when the colour index is past the table: white. */
const DEFAULT_PET_COLOR = 0xffffff;

/**
 * The old pet page's widget, the embedded `petsWidget` of `layout_pets.xml` - Flash's
 * `PetsCatalogWidget`, for pet types 0-7 (a page whose first offer is a newer pet is
 * `NewPetsCatalogWidget`'s, and this one's `init()` fails, taking the widgets nested in it along).
 *
 * The page sells one pet (the first offer): the user picks a breed in `type_drop_menu` (the
 * product's sellable palettes, asked for through `getSellablePetPalettes` and kept by the
 * catalogue, listed only when there is more than one), a colour in the colour grid (this widget's
 * fixed per-type table, `PET_AVAILABLE_COLORS`, sent as `CatalogWidgetColoursEvent` - the grid's
 * container is `blend="0"`, so the swatches are there to click but not seen), and types a name.
 * `ctlg_teaserimg_1` shows the pet at double size, redrawn on every pick (`updateImage`), with the
 * offer's price box over its bottom right corner.
 *
 * The widget takes the buy button over (`CatalogWidgetPurchaseOverrideEvent`): buying first sends
 * the name for approval (`approveName(name, 1)`), and the answer (`CWE_APPROVE_RESULT`) either
 * alerts why the name was refused or opens the purchase confirmation with the extra parameter
 * `name \n paletteId \n RRGGBB`. When the pet's library finishes loading, the widget runs its
 * `WIDGETS_INITIALIZED` again (`imageReady`), as Flash does.
 *
 * `ctlg_teaserimg_1` is also a page image slot, which `LocalizationCatalogWidget` fills with the
 * page's catalogue picture when it loads; the pet drawn over it is what the page shows, so the
 * picture is not drawn. The pet preview Flash hands the purchase confirmation
 * (`showPurchaseConfirmation`'s eighth argument) has no counterpart in the port's confirmation,
 * which draws the offer's own image.
 */
export const CatalogPetsWidgetView = ({ page, children }: CatalogWidgetProps) => {
    const firstOffer = page.offers[0];
    const productCode = firstOffer?.localizationId ?? '';
    const petType = firstOffer ? getPetTypeIndexFromProduct(productCode) : -1;
    const initialised = !!firstOffer && (petType < NEW_PETS_FIRST_TYPE);
    const cachedPalettes = useCatalogStore(x => x.sellablePetPalettes[productCode]);
    const [ availablePalettes, setAvailablePalettes ] = useState<CatalogSellablePetPalette[] | undefined>(() => parseSellablePetPalettes(cachedPalettes, petType));
    const [ paletteIndex, setPaletteIndex ] = useState(0);
    const [ colourIndex, setColourIndex ] = useState(0);
    const [ name, setName ] = useState('');
    const [ imageRequest, setImageRequest ] = useState<PetImageRequest | undefined>(undefined);
    const [ priceShown, setPriceShown ] = useState(false);
    const waitingForApproval = useRef(false);
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const { showAlert } = useWindowActions();
    const t = useTranslation();
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

    /** `onPurchase`: the buy button asks for the name's approval first. */
    const onPurchase = () => {
        if (getPurchaseParameters() === '') return;

        waitingForApproval.current = true;

        approveName(send, name, APPROVE_NAME_TYPE_PET);
    };

    const onPurchaseRef = useRef(onPurchase);

    useEffect(() => {
        onPurchaseRef.current = onPurchase;
    });

    /** `onWidgetsInitialized`: take the buy button, select the page's pet, send the colours. */
    const onWidgetsInitialized = () => {
        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.PURCHASE_OVERRIDE, callback: () => onPurchaseRef.current() });

        if (firstOffer) page.events.dispatchEvent({ type: CatalogWidgetEventEnum.SELECT_PRODUCT, offer: firstOffer });

        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.COLOUR_ARRAY, colours: availableColors.slice(), backgroundAssetName: 'ctlg_clr_27x22_1', colourAssetName: 'ctlg_clr_27x22_2', chosenColourAssetName: 'ctlg_clr_27x22_3', index: 0 });
    };

    const petTexture = usePetImageTexture(imageRequest, () => onWidgetsInitialized());

    /** `constructErrorMessage`: the reason's text, or its `.additionalInfo` text when the server said more. */
    const constructErrorMessage = (reason: string, nameValidationInfo: string) => {
        const key = `catalog.alert.petname.${reason}`;
        const additionalInfo = t(`${key}.additionalInfo`, '', { additional_info: nameValidationInfo });

        return (nameValidationInfo.length && additionalInfo.length) ? additionalInfo : t(key);
    };

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

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.APPROVE_NAME_RESULT, (event) => {
        if (!initialised || !waitingForApproval.current) return;

        waitingForApproval.current = false;

        if (event.result !== 0) purchaseWillBeGift(store, false);

        const reason = PET_NAME_ERRORS[event.result];

        if (reason) {
            showAlert(t('catalog.alert.purchaseerror.title'), constructErrorMessage(reason, event.nameValidationInfo));

            return;
        }

        const extraParameter = getPurchaseParameters();

        if ((extraParameter === '') || !firstOffer) return;

        // Flash passes `getPetImage()` as the eighth argument: the dialog shows the pet as picked.
        showPurchaseConfirmation(store, firstOffer, page.pageId, extraParameter, 1, undefined, undefined, getPetImageRequest(availablePalettes, paletteIndex, colourIndex));
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

    if (!initialised) return null;

    // `updatePaletteSelections`: the breeds by name, listed only when there is a choice.
    const breeds = (availablePalettes ?? []).map(palette => t(getPetRaceLocalizationKey(petType, palette.breedId), getPetRaceLocalizationKey(petType, palette.breedId)));

    const selectBreed = (index: number) => {
        if (!availablePalettes || (index >= availablePalettes.length)) return;

        setPaletteIndex(index);
        updateImage(availablePalettes, index, colourIndex);
    };

    return (
        <Region layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
            <Region
                name="ctlg_teaserimg_1"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
            >
                {petTexture && (
                    <ThemeImage
                        texture={petTexture}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', zoomX: 2, zoomY: 2 }}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                    />
                )}
            </Region>
            {children}
            <ThemeText
                name="ctlg_text_1"
                text={getCatalogPageText(page, 'ctlg_text_1') ?? t('lorem.title')}
                textStyle="u_small"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, top: 380 }}
            />
            <ThemeText
                name="ctlg_text_2"
                text={getCatalogPageText(page, 'ctlg_text_2') ?? t('lorem.title')}
                textStyle="u_small"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, top: 225 }}
            />
            <ThemeText
                name="ctlg_text_3"
                text={getCatalogPageText(page, 'ctlg_text_3') ?? t('lorem.title')}
                textStyle="u_small"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, top: 326 }}
            />
            <Region layout={{ position: 'absolute', left: 10, width: 340, top: 344, height: 25 }}>
                <Dropmenu
                    variant="3"
                    visible={!availablePalettes || (breeds.length > 1)}
                    caption={breeds[paletteIndex] ?? ''}
                    options={breeds.map((breed, index) => ({ key: index, label: breed, selected: (index === paletteIndex), onSelect: () => selectBreed(index) }))}
                    layout={{ width: 340, height: 25 }}
                />
            </Region>
            <Border
                variant="4"
                layout={{ position: 'absolute', left: 10, width: 340, top: 398, height: 25 }}
            >
                <TextInput
                    value={name}
                    onChange={setName}
                    maxLength={NAME_MAX_CHARS}
                    textStyle="u_regular"
                    flashPlacement
                    alwaysShowSelection
                    backgroundColor={null}
                    focusedBackgroundColor={null}
                    layout={{ position: 'absolute', left: 4, width: 325, top: 4, height: 17 }}
                />
            </Border>
            {priceShown && firstOffer && !page.isBuilderPage && (
                <Region layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}>
                    <CatalogProductPriceView
                        offer={firstOffer}
                        layout={{ right: 6, bottom: 6 }}
                    />
                </Region>
            )}
        </Region>
    );
};
