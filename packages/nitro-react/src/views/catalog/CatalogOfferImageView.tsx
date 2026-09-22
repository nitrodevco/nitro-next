import { AvatarGenderType, FurnitureTypeEnum, IObjectData, IPurchasableOffer, RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { GetChatStyleLibrary } from '#base/chat';
import { habbiconPreviewAssetName } from '#base/commands';
import { PetImageRequest } from '#base/context/catalog';
import { useCatalogOfferProduct } from '#base/hooks';
import { LayoutImage, ThemeImage, useAvatarImageTexture } from '#base/theme';
import { PRODUCT_IMAGES } from '#base/utils';

import { pixelEffectIcon, SUBSCRIPTION_PRODUCT_ICON } from './catalogProductIcons';
import { useFurnitureImageTexture } from './useFurnitureImageTexture';
import { usePetImageTexture } from './usePetImageTexture';

/**
 * The `PRODUCT_IMAGES` pictures the client ships, by picture name. Flash draws a listed offer's
 * picture only when its asset library has it and the product otherwise; the `ctlg_pic_*` pictures
 * are in no bundle of this revision, and `events_confirm_purchase` is a GIF the port's bundles
 * cannot carry, so for every listed offer but the snowwar tokens Flash and the port draw the
 * product.
 */
const SHIPPED_PRODUCT_IMAGES: Record<string, string> = {
    snowwar_tokens_10: LayoutImage('catalog/snowwar_tokens_10.png'),
};

export interface CatalogOfferImageViewProps {
    offer: IPurchasableOffer;
    stuffData?: IObjectData;
    /** `showConfirmationDialog`'s `param2`: the pets widgets' pet picture, rendered here and shown instead of the product's. */
    previewImage?: PetImageRequest;
}

/**
 * The product picture of the purchase confirmation - `PurchaseConfirmationDialog.showConfirmationDialog`
 * into `product_image`, centred in its 126x152 bitmap (`setImage`): the offer's `PRODUCT_IMAGES`
 * picture when one ships, else the picture the caller passed (the pets widgets' pet preview),
 * else - for an offer with a product (a game token offer has none, and shows nothing) - by product type - a floor or wall furni rendered by the room engine
 * facing 90 degrees at 64 (`getFurnitureImage` / `getWallItemImage`), an effect's icon, the club
 * icon, a chat style's selector preview, a bot's figure facing 3, or a habbicon's preview.
 *
 * Not exact: Flash renders the floor furni with the purchase's stuff data and the bot waving
 * (`wave`, `gest sml`); the port's furni texture takes no stuff data and its avatar texture no
 * actions, so the furni shows its default state and the bot stands.
 */
export const CatalogOfferImageView = ({ offer, previewImage }: CatalogOfferImageViewProps) => {
    const product = useCatalogOfferProduct(offer);
    const shippedImage = SHIPPED_PRODUCT_IMAGES[PRODUCT_IMAGES[offer.localizationId] ?? ''];
    const productType = product?.productType;
    const isFurni = !shippedImage && !previewImage && ((productType === FurnitureTypeEnum.Floor) || (productType === FurnitureTypeEnum.Wall));

    const { texture, width, height } = useFurnitureImageTexture(
        product?.furnitureData && isFurni ? product.furnitureData.className : undefined,
        product?.furnitureData && isFurni ? product.furnitureData.colorIndex : undefined,
        2,
        RoomGeometryScaleType.ZoomedIn,
        (isFurni && product) ? parseInt(product.extraParam) : undefined,
    );
    const petTexture = usePetImageTexture(shippedImage ? undefined : previewImage);
    const bot = useAvatarImageTexture((!shippedImage && !previewImage && (productType === FurnitureTypeEnum.Robot)) ? product?.extraParam : undefined, AvatarGenderType.Male, { direction: 3 });

    if (shippedImage) {
        return (
            <ThemeImage
                src={shippedImage}
                bitmap={{ stretchedX: false, stretchedY: false }}
            />
        );
    }

    if (!product) return null;

    if (previewImage) {
        if (!petTexture) return null;

        return (
            <pixiSprite
                texture={petTexture}
                layout={{}}
            />
        );
    }

    switch (product.productType) {
        case FurnitureTypeEnum.Floor:
        case FurnitureTypeEnum.Wall:
            if (!texture) return null;

            return (
                <pixiSprite
                    texture={texture}
                    width={width}
                    height={height}
                    layout={{}}
                />
            );
        case FurnitureTypeEnum.Effect:
            return (
                <ThemeImage
                    src={pixelEffectIcon(product.classId)}
                    bitmap={{ stretchedX: false, stretchedY: false }}
                />
            );
        case FurnitureTypeEnum.HabboClub:
            return (
                <ThemeImage
                    src={SUBSCRIPTION_PRODUCT_ICON}
                    bitmap={{ stretchedX: false, stretchedY: false }}
                />
            );
        case FurnitureTypeEnum.ChatStyle: {
            const preview = GetChatStyleLibrary().getStyle(parseInt(product.extraParam))?.selectorPreviewTexture;

            if (!preview) return null;

            return (
                <pixiSprite
                    texture={preview}
                    layout={{}}
                />
            );
        }
        case FurnitureTypeEnum.Robot:
            if (!bot.texture) return null;

            return (
                <pixiSprite
                    texture={bot.texture}
                    width={bot.width}
                    height={bot.height}
                    layout={{}}
                />
            );
        case FurnitureTypeEnum.Habbicon:
            return (
                <ThemeImage
                    src={habbiconPreviewAssetName(parseInt(product.extraParam))}
                    bitmap={{ stretchedX: false, stretchedY: false }}
                />
            );
    }

    return null;
};
