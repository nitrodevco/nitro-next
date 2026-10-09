/**
 * A prize's `product_icon` widget - `ProductIconWidget` over `product_icon_xml`, given the prize as
 * a `RewardTrackRewardDisplayWrapper` (the product type, `rewardTypeId` as the item type, the extra
 * params as the pet or bot figure). `previewImage` switches on the product type:
 *
 * - -1: the `unknown_image` stamp;
 * - 0: the wall item's icon, 1 and 11: the floor item's (`getWallItemIcon` / `getFurnitureIcon`);
 * - 4: the badge in `badge_image_widget`;
 * - 8: the currency's big icon style in `icon` (`getIconStyleFor`), none for a currency without one.
 *
 * The effect (2), bot head (6), chat style (9), pet (10) and habbicon (12) previews are not drawn
 * here: the widget is left empty for them (`clearPreviewer`).
 */
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';

import type { RewardTrackPrize } from '#base/context/reward-track';
import { useConfigData, useInterpolate } from '#base/context/system';
import { TemplateBindings, TemplateWindow } from '#base/theme';
import { getCurrencyIconStyle } from '#base/utils';

const TEMPLATE = 'habbo-window-manager-com/product_icon_xml';

const PRODUCT_UNKNOWN = -1;
const PRODUCT_WALL = 0;
const PRODUCT_FLOOR = 1;
const PRODUCT_BADGE = 4;
const PRODUCT_CURRENCY = 8;
const PRODUCT_FLOOR_ALSO = 11;

export const RewardTrackProductIcon = ({ prize }: { prize: RewardTrackPrize }) => {
    const config = useConfigData();
    const interpolate = useInterpolate();
    const type = prize.productItemTypeId;
    const bindings: TemplateBindings = {};

    switch (type) {
        case PRODUCT_UNKNOWN:
            bindings.unknown_image = { visible: true };
            break;
        case PRODUCT_WALL:
            bindings.bitmap = { asset: GetRoomEngine().getFurnitureWallIconUrl(parseInt(prize.rewardTypeId, 10), undefined) ?? '' };
            break;
        case PRODUCT_FLOOR:
        case PRODUCT_FLOOR_ALSO:
            bindings.bitmap = { asset: GetRoomEngine().getFurnitureFloorIconUrl(parseInt(prize.rewardTypeId, 10)) ?? '' };
            break;
        case PRODUCT_BADGE:
            bindings.badge_image_widget = { visible: true, asset: interpolate('${badge.asset.url}').replace('%badgename%', prize.rewardTypeId) };
            break;
        case PRODUCT_CURRENCY: {
            const style = getCurrencyIconStyle(parseInt(prize.rewardTypeId, 10), config, true);

            bindings.icon = { visible: style > 0, style: String(style) };
            break;
        }
    }

    return (
        <TemplateWindow
            id={TEMPLATE}
            bindings={bindings}
        />
    );
};
