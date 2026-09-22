import { CatalogPricingModelEnum, FurnitureSpecialType, IPetCustomPart, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { GetRoomContentLoader } from '@nitrodevco/nitro-renderer';
import { useState } from 'react';

import { CatalogWidgetEventEnum, PetImageRequest } from '#base/context/catalog';
import { useTranslation } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { Region, ThemeImage, ThemeText } from '#base/theme';
import { getOfferProduct } from '#base/utils';

import { usePetImageTexture } from '../../usePetImageTexture';
import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CatalogProductPriceView } from './CatalogProductPriceView';

/** `PET_TYPE_ID`, `BREED`, `COLOR`, `PALETTE_ID` and `PART_ID`: the horse `init()` draws, and the defaults a product fills in. */
const PET_TYPE_ID = 15;
const BREED = 1;
const COLOR = 0xffffff;
const PALETTE_ID = 2;
const PART_ID = -1;

/** The horse's mane and tail layers, which a shampoo draws in their master palettes. */
const HORSE_HAIR_LAYER = 2;
const HORSE_TAIL_LAYER = 3;

/** `getPetImage(..., new Vector3d(90), 64, ...)`. */
const PET_IMAGE_DIRECTION = 90;

/** What `onPreviewProduct` draws for an offer: its pet with the product on, or nothing it can draw. */
const getProductPetImage = (offer: IPurchasableOffer): PetImageRequest | undefined => {
    if ((offer.pricingModel !== CatalogPricingModelEnum.Single) && (offer.pricingModel !== CatalogPricingModelEnum.Multi)) return undefined;

    const furnitureData = getOfferProduct(offer)?.furnitureData;

    if (!furnitureData) return undefined;

    const params = furnitureData.customParams.split(' ');
    const petType = parseInt(params[0]) || 0;
    const loader = GetRoomContentLoader();
    const customParts: IPetCustomPart[] = [];
    const request = (paletteId: number): PetImageRequest => ({ typeId: petType, paletteId, color: COLOR, direction: PET_IMAGE_DIRECTION, customParts });

    switch (furnitureData.specialType) {
        case FurnitureSpecialType.PetShampoo: {
            if (params.length < 2) return undefined;

            const colour = loader.getPetColorResultsForTag(petType, params[1]).find(result => (result.breed === BREED));

            if (petType === PET_TYPE_ID) {
                const hair = loader.getPetDefaultPalette(petType, 'hair');
                const tail = loader.getPetDefaultPalette(petType, 'tail');

                customParts.push({ layerId: HORSE_HAIR_LAYER, partId: -1, paletteId: hair ? hair.id : -1 });
                customParts.push({ layerId: HORSE_TAIL_LAYER, partId: -1, paletteId: tail ? tail.id : -1 });
            }

            return request(colour ? colour.id : 0);
        }
        case FurnitureSpecialType.PetCustomPart: {
            if (params.length < 4) return undefined;

            const layers = params[1].split(',');
            const parts = params[2].split(',');
            const palettes = params[3].split(',');

            for (let index = 0; index < layers.length; index++) customParts.push({ layerId: parseInt(layers[index]) || 0, partId: parseInt(parts[index]) || 0, paletteId: parseInt(palettes[index]) || 0 });

            return request(PALETTE_ID);
        }
        case FurnitureSpecialType.PetCustomPartShampoo: {
            if (params.length < 3) return undefined;

            const layers = params[1].split(',');
            const palettes = params[2].split(',');

            for (let index = 0; index < layers.length; index++) customParts.push({ layerId: parseInt(layers[index]) || 0, partId: PART_ID, paletteId: parseInt(palettes[index]) || 0 });

            return request(PALETTE_ID);
        }
        case FurnitureSpecialType.PetSaddle:
            // Flash logs a short parameter list here and draws the saddle regardless.
            customParts.push({ layerId: parseInt(params[1]) || 0, partId: parseInt(params[2]) || 0, paletteId: parseInt(params[3]) || 0 });

            return request(PALETTE_ID);
        default:
            return undefined;
    }
};

/** The white horse `init()` draws before an offer is picked - no custom parts. */
const INITIAL_PET_IMAGE: PetImageRequest = { typeId: PET_TYPE_ID, paletteId: PALETTE_ID, color: COLOR, direction: PET_IMAGE_DIRECTION };

/**
 * The pet customisation page's preview, the `petPreviewWidget` container of
 * `layout_petcustomization.xml` - Flash's `PetPreviewCatalogWidget`, whose view is the container's
 * own children: `ctlg_teaserimg_1` (the pet, centred and unscaled at the 64 scale), the offer's
 * name in `ctlg_product_name` and its description 5px under it in `ctlg_description`, and the
 * offer's price box hanging 6px into the picture's top right corner.
 *
 * It starts on a white horse and redraws on every `SELECT_PRODUCT`: the product's
 * `customParams` (`<pet type> ...`) say what the pet wears - a shampoo (`PetShampoo`) is the
 * palette of the tagged colour for breed 1, and on the horse also its master mane and tail; a
 * custom part, a part shampoo or a saddle are custom parts laid over palette 2. An offer it cannot
 * draw leaves the picture empty.
 *
 * The container's `petPreviewBackground` border is `visible="false"` and nothing shows it, so it is
 * not drawn.
 */
export const CatalogPetPreviewWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ offer, setOffer ] = useState<IPurchasableOffer | undefined>(undefined);
    const [ imageRequest, setImageRequest ] = useState<PetImageRequest | undefined>(INITIAL_PET_IMAGE);
    const petTexture = usePetImageTexture(imageRequest);
    const t = useTranslation();

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, (event) => {
        setOffer(event.offer);
        setImageRequest(getProductPetImage(event.offer));
    });

    const productData = offer ? getOfferProduct(offer)?.productData : undefined;
    const name = offer ? (productData ? t(productData.name, productData.name) : t(offer.localizationId, offer.localizationId)) : '';
    const description = offer ? (productData ? t(productData.description, productData.description) : t(offer.localizationId, offer.localizationId)) : '';

    return (
        <Region layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
            <Region
                name="ctlg_teaserimg_1"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
            >
                {imageRequest && petTexture && (
                    <ThemeImage
                        texture={petTexture}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                    />
                )}
            </Region>
            <Region layout={{ position: 'absolute', left: 8, top: 12, flexDirection: 'column', gap: 5 }}>
                <ThemeText
                    name="ctlg_product_name"
                    text={name}
                    textStyle="u_bold"
                    markup
                    verticalAlign="top"
                    layout={{ flexShrink: 0 }}
                />
                <ThemeText
                    name="ctlg_description"
                    text={description}
                    textStyle="u_regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 158 }}
                    markup
                    verticalAlign="top"
                    layout={{ width: 162, flexShrink: 0 }}
                />
            </Region>
            {offer && !page.isBuilderPage && (
                <Region layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}>
                    <CatalogProductPriceView
                        offer={offer}
                        layout={{ right: 6, top: 6 }}
                    />
                </Region>
            )}
        </Region>
    );
};
