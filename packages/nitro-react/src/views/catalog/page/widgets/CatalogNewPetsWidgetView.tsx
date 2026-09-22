import { IPetCustomPart } from '@nitrodevco/nitro-api';
import { GetRoomContentLoader } from '@nitrodevco/nitro-renderer';
import { useEffect, useRef, useState } from 'react';

import { APPROVE_NAME_TYPE_PET, approveName, getSellablePetPalettes, purchaseWillBeGift, showPurchaseConfirmation } from '#base/commands';
import { CatalogSellablePetPalette, CatalogWidgetEventEnum, getCatalogPageText, PetImageRequest, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation, useWindowActions } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { Border, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { getPetPurchaseParameter, getPetRaceLocalizationKey, getPetTypeIndexFromProduct, parseSellablePetPalettes, PET_NAME_ERRORS } from '#base/utils';

import { usePetImageTexture } from '../../usePetImageTexture';
import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CatalogProductPriceView } from './CatalogProductPriceView';

/** The first pet type this page sells; `petsWidget` has the ones below. */
const NEW_PETS_FIRST_TYPE = 8;

/** `MAX_PALETTES`: the colour grid gets at most this many palettes' swatches. */
const MAX_PALETTES = 20;

/** `NORMAL_SIZE_PETS`: pets drawn at their own size, facing 90 degrees, where the rest are doubled and face 135. */
const NORMAL_SIZE_PETS: readonly number[] = [ 15 ];

/** `name_input_text`'s `max_chars`. */
const NAME_MAX_CHARS = 16;

/** The colour the newer pets are drawn and bought in - they take theirs from the palette. */
const PET_COLOR = 0xffffff;

/** The horse (type 15), whose mane and tail `getPetImage` draws in their master palettes. */
const PET_TYPE_HORSE = 15;

/**
 * The newer pets' page widget, the embedded `newPetsWidget` of `layout_pets.xml` - Flash's
 * `NewPetsCatalogWidget`, for pet types 8 and up (a page whose first offer is an older pet is
 * `PetsCatalogWidget`'s, and this one's `init()` fails, taking the widgets nested in it along).
 *
 * The page sells its first offer. The breeds are the product's sellable palettes (asked for
 * through `getSellablePetPalettes`, kept by the catalogue); the colour grid shows one swatch per
 * palette - up to 20, the palette's primary colour, or primary and secondary when they differ
 * (`CatalogWidgetMultiColoursEvent`, from the room engine's `getPetColor`, which only knows a pet
 * once its library has loaded) - and picking one picks the breed, named in `pet_breed_text`.
 * `ctlg_teaserimg_1` shows the pet at the 64 scale (doubled, facing 135, unless it is the horse,
 * which also wears its default mane and tail), with the offer's price box over its bottom right
 * corner.
 *
 * Buying goes through the name approval exactly as `PetsCatalogWidget`'s does: the buy button is
 * taken over, `approveName(name, 1)` is sent, and `CWE_APPROVE_RESULT` alerts the refusal or
 * opens the purchase confirmation with `name \n paletteId \n FFFFFF`. When the pet's library has
 * loaded (`imageReady`) the widget runs its `WIDGETS_INITIALIZED` again, which is what fills the
 * colour grid on a first visit.
 *
 * As on the old pet page, the page picture `LocalizationCatalogWidget` would put into
 * `ctlg_teaserimg_1` is drawn over by the pet and not drawn, and the confirmation shows the offer's
 * own image rather than the pet preview Flash passes it.
 */
export const CatalogNewPetsWidgetView = ({ page, children }: CatalogWidgetProps) => {
    const firstOffer = page.offers[0];
    const productCode = firstOffer?.localizationId ?? '';
    const petType = firstOffer ? getPetTypeIndexFromProduct(productCode) : -1;
    const initialised = !!firstOffer && (petType >= NEW_PETS_FIRST_TYPE);
    const cachedPalettes = useCatalogStore(x => x.sellablePetPalettes[productCode]);
    const [ availablePalettes, setAvailablePalettes ] = useState<CatalogSellablePetPalette[] | undefined>(() => parseSellablePetPalettes(cachedPalettes, petType));
    const [ paletteIndex, setPaletteIndex ] = useState(() => ((availablePalettes && availablePalettes.length) ? 0 : -1));
    const [ name, setName ] = useState('');
    const [ imageRequest, setImageRequest ] = useState<PetImageRequest | undefined>(undefined);
    const [ breedText, setBreedText ] = useState<string | undefined>(undefined);
    const [ priceShown, setPriceShown ] = useState(false);
    const waitingForApproval = useRef(false);
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const { showAlert } = useWindowActions();
    const t = useTranslation();
    const normalSize = NORMAL_SIZE_PETS.includes(petType);

    /** `getPetImage`: the palette's pet, the horse with its default mane and tail. */
    const getPetImageRequest = (palettes: CatalogSellablePetPalette[] | undefined, palette: number): PetImageRequest | undefined => {
        if (!palettes || (palette < 0) || (palette >= palettes.length)) return undefined;

        const loader = GetRoomContentLoader();
        const customParts: IPetCustomPart[] = [];

        if (petType === PET_TYPE_HORSE) {
            const hair = loader.getPetDefaultPalette(petType, 'hair');
            const tail = loader.getPetDefaultPalette(petType, 'tail');

            customParts.push({ layerId: loader.getPetLayerIdForTag(petType, 'hair'), partId: -1, paletteId: hair ? hair.id : -1 });
            customParts.push({ layerId: loader.getPetLayerIdForTag(petType, 'tail'), partId: -1, paletteId: tail ? tail.id : -1 });
        }

        return { typeId: petType, paletteId: palettes[palette].paletteId, color: PET_COLOR, direction: normalSize ? 90 : 135, customParts };
    };

    /** `getPetLocalization`: the palette's breed name. */
    const getPetLocalization = (palettes: CatalogSellablePetPalette[] | undefined, palette: number) => {
        if (!palettes || (palette < 0) || (palette >= palettes.length)) return '';

        const key = getPetRaceLocalizationKey(petType, palettes[palette].breedId);

        return t(key, key);
    };

    /** `updateImage`: redraw the pet (a failed render keeps the last one), the price box and the breed name. */
    const updateImage = (palettes: CatalogSellablePetPalette[] | undefined, palette: number) => {
        if (!firstOffer || (palette < 0)) return;

        const request = getPetImageRequest(palettes, palette);

        if (request) setImageRequest(request);

        setPriceShown(true);
        setBreedText(getPetLocalization(palettes, palette));
    };

    /** `initializePaletteSelection`: one swatch per palette the engine knows the colours of. */
    const initializePaletteSelection = (palettes: CatalogSellablePetPalette[] | undefined) => {
        if (!palettes) return;

        const colours: number[][] = [];

        for (const palette of palettes.slice(0, MAX_PALETTES)) {
            const color = GetRoomContentLoader().getPetColorResult(petType, palette.paletteId);

            if (!color) continue;

            colours.push((color.primaryColor === color.secondaryColor) ? [ color.primaryColor ] : [ color.primaryColor, color.secondaryColor ]);
        }

        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.MULTI_COLOUR_ARRAY, colours, backgroundAssetName: 'ctlg_clr_27x22_1', colourAssetName: 'ctlg_clr_27x22_2', chosenColourAssetName: 'ctlg_clr_27x22_3' });
    };

    /** `selectedPalette`: an index past the list is the first palette. */
    const selectedPalette = (palettes: CatalogSellablePetPalette[] | undefined, index: number) => {
        if (!palettes || !palettes.length) return;

        const palette = ((index < 0) || (index > palettes.length)) ? 0 : index;

        setPaletteIndex(palette);
        updateImage(palettes, palette);
    };

    /** `getPurchaseParameters`: the extra parameter, or '' - with the empty name alert when there is no name. */
    const getPurchaseParameters = (): string => {
        if (!name.length) {
            showAlert(t('catalog.alert.purchaseerror.title'), t('catalog.alert.petname.empty'));

            return '';
        }

        if (!availablePalettes || (paletteIndex < 0) || (paletteIndex >= availablePalettes.length)) return '';

        return getPetPurchaseParameter(name, availablePalettes[paletteIndex].paletteId, PET_COLOR);
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

    /** `onWidgetsInitialized`: take the buy button, select the page's pet, send the palettes' swatches. */
    const onWidgetsInitialized = () => {
        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.PURCHASE_OVERRIDE, callback: () => onPurchaseRef.current() });

        if (firstOffer) page.events.dispatchEvent({ type: CatalogWidgetEventEnum.SELECT_PRODUCT, offer: firstOffer });

        initializePaletteSelection(availablePalettes);
    };

    const petTexture = usePetImageTexture(imageRequest, () => onWidgetsInitialized());

    /** `constructErrorMessage`: the reason's text, or its `.additionalInfo` text when the server said more. */
    const constructErrorMessage = (reason: string, nameValidationInfo: string) => {
        const key = `catalog.alert.petname.${reason}`;
        const additionalInfo = t(`${key}.additionalInfo`, '', { additional_info: nameValidationInfo });

        return (nameValidationInfo.length && additionalInfo.length) ? additionalInfo : t(key);
    };

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, () => {
        if (initialised) updateImage(availablePalettes, paletteIndex);
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.COLOUR_INDEX, (event) => {
        if (initialised) selectedPalette(availablePalettes, event.index);
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
        showPurchaseConfirmation(store, firstOffer, page.pageId, extraParameter, 1, undefined, undefined, getPetImageRequest(availablePalettes, paletteIndex));
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.WIDGETS_INITIALIZED, () => {
        if (initialised) onWidgetsInitialized();
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELLABLE_PET_PALETTES, (event) => {
        if (!initialised || (event.productCode !== productCode)) return;

        const palettes = parseSellablePetPalettes(event.sellablePalettes, petType);

        setAvailablePalettes(palettes);
        initializePaletteSelection(palettes);
        selectedPalette(palettes, 0);
        updateImage(palettes, (palettes && palettes.length) ? 0 : paletteIndex);
    });

    // `init()` -> `updateAvailablePalettes`: a product the catalogue has no palettes for is asked about.
    useEffect(() => {
        if (initialised && !cachedPalettes) getSellablePetPalettes(send, store, productCode);
    }, [ page ]);

    if (!initialised) return null;

    return (
        <Region layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
            <Region
                name="ctlg_teaserimg_1"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
            >
                {petTexture && (
                    <ThemeImage
                        texture={petTexture}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', zoomX: normalSize ? 1 : 2, zoomY: normalSize ? 1 : 2 }}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                    />
                )}
            </Region>
            <ThemeText
                name="pet_breed_text"
                text={breedText ?? t('lorem.title')}
                textStyle="u_bold"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, top: 16 }}
            />
            <ThemeText
                name="ctlg_text_3"
                text={getCatalogPageText(page, 'ctlg_text_3') ?? t('lorem.title')}
                textStyle="u_small"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 12, top: 326 }}
            />
            {children}
            <ThemeText
                name="ctlg_text_2"
                text={getCatalogPageText(page, 'ctlg_text_2') ?? t('lorem.title')}
                textStyle="u_small"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 12, top: 363 }}
            />
            <Border
                variant="4"
                layout={{ position: 'absolute', left: 10, width: 340, top: 385, height: 25 }}
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
