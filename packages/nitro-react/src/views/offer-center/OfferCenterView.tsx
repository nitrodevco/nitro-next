/**
 * The offer centre's reward list - `catalog/offers/OfferCenter.showRewards` on `offer_center_xml`:
 * built and centred each time it opens, the prototype row taken out of `reward_list` and one clone
 * of it per delivered reward, newest first (`populateRewardList` / `createRewardItem`): the row's
 * build time in `reward_date` (`new Date().toLocaleString()`, the store's `rowDate`), the reward's
 * name in `reward_name`, and its product icon in `reward_icon`.
 *
 * The icon is `HabboCatalogUtils.displayProductIcon(contentType, classId)`: a floor (`s`) or wall
 * (`i`) item's icon, an effect's `fx_icon_<id>` (`e`), or the catalogue's `icon_hc` for a club
 * product (`h`); any other type draws nothing.
 */
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';

import { OfferReward, useOfferCenterStore } from '#base/context/offer-center';
import { LayoutImage, TemplateItem, TemplateWindow, useTemplateFrame } from '#base/theme';

/** `displayProductIcon`'s bitmap for a reward, as an asset; `undefined` for none. */
const rewardIconAsset = (reward: OfferReward): string | undefined => {
    switch (reward.contentType) {
        case 's':
            return GetRoomEngine().getFurnitureFloorIconUrl(reward.classId);
        case 'i':
            return GetRoomEngine().getFurnitureWallIconUrl(reward.classId, undefined);
        case 'e':
            return LayoutImage(`habbo-inventory-com/fx_icon_${reward.classId}.png`);
        case 'h':
            return LayoutImage('habbo-catalog-com/icon_hc.png');
    }

    return undefined;
};

export interface OfferCenterViewProps {
    onClose: () => void;
}

export const OfferCenterView = ({ onClose }: OfferCenterViewProps) => {
    const rewards = useOfferCenterStore(x => x.rewards);
    // `showRewards`: a new window each time, `center()`ed. Its frame is a scaling target held to 377 wide.
    const frame = useTemplateFrame({ id: 'offer_center', centered: true, rememberPosition: false, resizeDirection: 'y', onClose });

    // `createRewardItem`: a clone of the list's first item per reward.
    const rows: TemplateItem[] = rewards.map((reward, index) => {
        const icon = rewardIconAsset(reward);

        return {
            key: `${rewards.length - index}`,
            from: 'reward_list/@0',
            bindings: {
                reward_date: { caption: reward.rowDate },
                reward_name: { caption: reward.name },
                reward_icon: icon ? { asset: icon } : {},
            },
        };
    });

    return (
        <TemplateWindow
            id="habbo-catalog-com/offer_center_xml"
            frame={frame}
            bindings={{
                reward_list: { items: rows },
            }}
        />
    );
};
