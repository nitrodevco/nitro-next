/**
 * The `product_icon` window widget - `ProductIconWidget` over `product_icon_xml`, given a product
 * as an `IProductDisplayInfo` (the daily tasks' `RewardDisplayWrapper`, the reward track's
 * `RewardTrackRewardDisplayWrapper`): the product type, the item type id and, for a pet, the
 * figure in the extra params. `previewImage` switches on the product type:
 *
 * - -1: the `unknown_image` stamp;
 * - 0: the wall item's icon, 1 and 11: the floor item's (`getWallItemIcon` / `getFurnitureIcon`);
 * - 2: the effect's icon (`getPixelEffectIcon`);
 * - 4: the badge in `badge_image_widget`;
 * - 8: the currency's big icon style in `icon` (`getIconStyleFor`), fitted to its own size
 *   (`iconResult` -> `fitToSize`), none for a currency without one;
 * - 9: the chat style's selector preview;
 * - 10: the pet in `pet_image_widget`;
 * - 12: the habbicon (`habbiconResult`), a grey square until its assets are in.
 *
 * The bot head (6) is not drawn here: the widget is left empty for it (`clearPreviewer`).
 */
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';

import { useHabbiconsStore } from '#base/context/habbicons';
import { useConfigData, useInterpolate } from '#base/context/system';
import { Region, TemplateBindings, TemplateWindow, TemplateWindows, themeIconFrame, ThemeImage } from '#base/theme';
import { getCurrencyIconStyle } from '#base/utils';

import { CollectiblesPreviewSlots, CollectiblesProductPreview } from './CollectiblesProductPreview';

const TEMPLATE = 'habbo-window-manager-com/product_icon_xml';

/** `ProductIconWidget.previewImage`'s product types. */
const PRODUCT_UNKNOWN = -1;
const PRODUCT_WALL = 0;
const PRODUCT_FLOOR = 1;
const PRODUCT_EFFECT = 2;
const PRODUCT_BADGE = 4;
const PRODUCT_CURRENCY = 8;
const PRODUCT_CHAT_STYLE = 9;
const PRODUCT_PET = 10;
const PRODUCT_CLOTHING = 11;
const PRODUCT_HABBICON = 12;

/** `product_icon_xml`'s windows: the 46x40 `bitmap` at -3,0, the 48x48 `pet_image_widget` at -4,-2 facing south. */
const PRODUCT_ICON_SLOTS: CollectiblesPreviewSlots = {
    productPreview: { left: -3, top: 0, width: 46, height: 40 },
    pet: { left: -4, top: -2, width: 48, height: 48, zoom: 1, shrinkOnOverflow: true, direction: 135 },
};

/** `habbiconResult`: the habbicon's preview, or a grey 40x40 square until the habbicon assets are in. */
const HabbiconPreview = ({ habbiconId }: { habbiconId: number }) => {
    const preview = useHabbiconsStore(state => state.previews[habbiconId]);

    if (!preview) {
        return (
            <Region
                backgroundColor="#8f8f8f"
                layout={{ position: 'absolute', left: 0, top: 0, width: 40, height: 40 }}
            />
        );
    }

    return (
        <ThemeImage
            texture={preview}
            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
            layout={{ position: 'absolute', left: -3, top: 0, width: 46, height: 40 }}
        />
    );
};

/** The previews the template's own windows do not draw here: an effect's icon, a chat style, a pet, a habbicon. */
const productPreview = (productTypeId: number, id: number, extraParams: string) => {
    switch (productTypeId) {
        case PRODUCT_EFFECT:
            return (
                <CollectiblesProductPreview
                    preview={{ kind: 'effect_icon', effectId: id }}
                    slots={PRODUCT_ICON_SLOTS}
                />
            );
        case PRODUCT_CHAT_STYLE:
            return (
                <CollectiblesProductPreview
                    preview={{ kind: 'chat_style_selector', styleId: id }}
                    slots={PRODUCT_ICON_SLOTS}
                />
            );
        case PRODUCT_PET:
            return (
                <CollectiblesProductPreview
                    preview={{ kind: 'pet', figure: extraParams }}
                    slots={PRODUCT_ICON_SLOTS}
                />
            );
        case PRODUCT_HABBICON:
            return <HabbiconPreview habbiconId={id} />;
        default:
            return undefined;
    }
};

export interface ProductIconViewProps {
    /** `IProductDisplayInfo.productTypeId`. */
    productTypeId: number;
    /** `itemTypeId`: the furni type, badge code, currency type, effect, chat style or habbicon id. */
    itemTypeId: string;
    /** The pet's figure (`petFigureString`). */
    extraParams: string;
}

export const ProductIconView = ({ productTypeId, itemTypeId, extraParams }: ProductIconViewProps) => {
    const config = useConfigData();
    const interpolate = useInterpolate();
    const id = parseInt(itemTypeId, 10);
    const iconStyle = (productTypeId === PRODUCT_CURRENCY) ? getCurrencyIconStyle(id, config, true) : 0;
    const bindings: TemplateBindings = {};

    switch (productTypeId) {
        case PRODUCT_UNKNOWN:
            bindings.unknown_image = { visible: true };
            break;
        case PRODUCT_WALL:
            bindings.bitmap = { asset: GetRoomEngine().getFurnitureWallIconUrl(id, undefined) ?? '' };
            break;
        case PRODUCT_FLOOR:
        case PRODUCT_CLOTHING:
            bindings.bitmap = { asset: GetRoomEngine().getFurnitureFloorIconUrl(id) ?? '' };
            break;
        case PRODUCT_BADGE:
            bindings.badge_image_widget = { visible: true, asset: interpolate('${badge.asset.url}').replace('%badgename%', itemTypeId) };
            break;
        case PRODUCT_CURRENCY:
            bindings.icon = { visible: iconStyle > 0, style: String(iconStyle) };
            break;
        default:
            bindings[''] = { children: productPreview(productTypeId, id, extraParams) };
    }

    // `iconResult` -> `fitToSize`: the icon takes its own size, kept centred by its `align` params.
    const arrange = ({ find }: TemplateWindows) => {
        const icon = find('icon');
        const frame = (iconStyle > 0) ? themeIconFrame(String(iconStyle)) : undefined;

        if (!icon || !frame) return;

        icon.setWidth(frame.width);
        icon.setHeight(frame.height);
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            bindings={bindings}
            arrange={arrange}
        />
    );
};
