/**
 * The icon of one catalogue product - Flash's `Product.initIcon`, drawn centred in the grid item's
 * `image` bitmap (`pivot_point` centre, not stretched). By product type:
 *
 * - `s`: the room engine's furniture icon (`getFurnitureIcon`), rendered with the guild's stuff
 *   data when the page sells guild furni (`ItemGridCatalogWidget.loadGraphics`).
 * - `i`: for the `floor`, `wallpaper` and `landscape` products the catalogue's `th_*` picture
 *   (`setImageFromAsset` with `th_<class>_<extra>`, `th_wall_<extra>`, `th_landscape_<extra>_001`),
 *   any other wall item its engine icon (`getWallItemIcon`).
 * - `e`: the effect's `fx_icon_<id>` (`getPixelEffectIcon`, the inventory's library - here the
 *   `effect-icons` bundle).
 * - `h`: the catalogue's `icon_hc` (`getSubscriptionProductIcon`).
 * - `b`: the badge image (`getBadgeImage`), from `badge.asset.url`.
 * - `r`: the bot's head, rendered large and cropped at half size (`ProductGridItem.renderAvatarImage`:
 *   `createAvatarImage(figure, "h")`, `getCroppedImage("head", 0.5)`).
 * - `chat_style`: the style's selector preview.
 * - `habbicon`: the habbicon's preview, or Flash's grey 40x40 square (`0x8f8f8f`) until the
 *   habbicon assets have loaded.
 *
 * Any other type draws nothing, as Flash only logs it.
 */
import { AvatarGenderType, FurnitureTypeEnum, IProduct, RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { GetChatStyleLibrary } from '#base/chat';
import { useHabbiconsStore } from '#base/context/habbicons';
import { useConfigValue } from '#base/context/system';
import { Region, ThemeImage, useAvatarImageTexture } from '#base/theme';

import { getFurniProductIconUrl, pixelEffectIcon, SUBSCRIPTION_PRODUCT_ICON } from './catalogProductIcons';
import { useFurnitureImageTexture } from './useFurnitureImageTexture';

export interface CatalogProductIconViewProps {
    product: IProduct;
    /** The box the icon is centred in - the template's `image` (36x36) or `image_wide` (60x36). */
    width?: number;
    height?: number;
    /** `loadGraphics`'s `StringArrayStuffData` for the guild the page's furni are bought for. */
    guildStuffData?: readonly string[];
}

interface IconBox { position: 'absolute'; left: number; width: number; top: number; height: number }

const RobotIcon = ({ figure, box }: { figure: string; box: IconBox }) => {
    const { texture } = useAvatarImageTexture(figure, AvatarGenderType.Male, { headOnly: true, direction: 2, scale: 0.5 });

    if (!texture) return null;

    return (
        <ThemeImage
            name="image"
            texture={texture}
            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
            layout={box}
        />
    );
};

const GuildFloorIcon = ({ product, guildStuffData, box }: { product: IProduct; guildStuffData: readonly string[]; box: IconBox }) => {
    const { texture } = useFurnitureImageTexture(product.furnitureData?.className, product.furnitureData?.colorIndex ?? 0, 0, RoomGeometryScaleType.Icon, 0, guildStuffData);

    if (!texture) return null;

    return (
        <ThemeImage
            name="image"
            texture={texture}
            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
            layout={box}
        />
    );
};

const HabbiconIcon = ({ habbiconId, box }: { habbiconId: number; box: IconBox }) => {
    const preview = useHabbiconsStore(state => state.previews[habbiconId]);

    if (!preview) {
        return (
            <Region
                name="image"
                backgroundColor="#8f8f8f"
                layout={{ position: 'absolute', left: Math.floor((box.width - 40) / 2), width: 40, top: Math.floor((box.height - 40) / 2), height: 40 }}
            />
        );
    }

    return (
        <ThemeImage
            name="image"
            texture={preview}
            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
            layout={box}
        />
    );
};

export const CatalogProductIconView = ({ product, width = 36, height = 36, guildStuffData }: CatalogProductIconViewProps) => {
    const catalogAssetUrl = useConfigValue<string>('catalog.asset.url') ?? '';
    const badgeUrl = useConfigValue<string>('badge.asset.url') ?? '';
    const box: IconBox = { position: 'absolute', left: 0, width, top: 0, height };

    const icon = () => {
        switch (product.productType) {
            case FurnitureTypeEnum.Floor:
                if (guildStuffData && product.furnitureData) {
                    return (
                        <GuildFloorIcon
                            product={product}
                            guildStuffData={guildStuffData}
                            box={box}
                        />
                    );
                }

                return getFurniProductIconUrl(product, catalogAssetUrl);
            case FurnitureTypeEnum.Wall:
                return getFurniProductIconUrl(product, catalogAssetUrl);
            case FurnitureTypeEnum.Effect:
                return pixelEffectIcon(product.classId);
            case FurnitureTypeEnum.HabboClub:
                return SUBSCRIPTION_PRODUCT_ICON;
            case FurnitureTypeEnum.Badge:
                return badgeUrl.replace('%badgename%', product.extraParam);
            case FurnitureTypeEnum.Robot:
                return (
                    <RobotIcon
                        figure={product.extraParam}
                        box={box}
                    />
                );
            case FurnitureTypeEnum.ChatStyle: {
                const preview = GetChatStyleLibrary().getStyle(parseInt(product.extraParam))?.selectorPreviewTexture;

                if (!preview) return null;

                return (
                    <ThemeImage
                        name="image"
                        texture={preview}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={box}
                    />
                );
            }
            case FurnitureTypeEnum.Habbicon:
                return (
                    <HabbiconIcon
                        habbiconId={parseInt(product.extraParam)}
                        box={box}
                    />
                );
        }

        return null;
    };

    const content = icon();

    return (
        <Region layout={box}>
            {(typeof content === 'string')
                ? (content.length > 0) && (
                        <ThemeImage
                            name="image"
                            src={content}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            showLoadingPlaceholder
                            layout={box}
                        />
                    )
                : content}
        </Region>
    );
};
