/**
 * The NFT reward box - `CollectiblesRewardBoxView`, drawn from its template `collectible_reward_xml`:
 * "contains", the reward's name, the reward in the `product_image` widget over the turning
 * `rotating_star` (20 degrees a second, `BG_STAR_ROTATE_SPEED`), the rarity flag with the rarity
 * upper-cased, the info text and the OK button. The close button and OK both show the next reward
 * waiting, or take the box down (`showNextRewardOrClose`).
 *
 * `setWindowColors` tints the frame and its `background` border with the rarity's colour
 * (`getRarityColor`, which finds none and always answers grey - see `getCollectibleRarityColor`).
 *
 * The `product_image` widget is `product_image.xml` stretched over its 300 x 300 box: every window
 * but the avatar and the effect previewer fills it, those two are centred (`centerWindow`), the
 * effect 50 lower.
 */
import { getCollectibleProductName, showNextCollectiblesReward } from '#base/commands';
import { getCollectibleRarityColor, useCollectiblesStore, wrapBaseItem } from '#base/context/collectibles';
import { LayoutImage, TemplateWindow, useTemplateFrame } from '#base/theme';
import { CollectiblesPreviewSlots, CollectiblesProductPreview } from '#base/views/shared/CollectiblesProductPreview';

import { COLLECTIBLES_BG_STAR_ROTATE_SPEED, rotatingBitmapBinding } from './collectiblesTemplate';

/** The effect previewer's temporary room for the reward box's `product_image`. */
const REWARD_BOX_PREVIEW_ROOM_ID = 1002;

/** `product_image.xml` in a 300 x 300 widget. */
const REWARD_PRODUCT_IMAGE_SLOTS: CollectiblesPreviewSlots = {
    productPreview: { left: 0, top: 0, width: 300, height: 300 },
    placeholder: { left: 0, top: 0, width: 300, height: 300, src: LayoutImage('habbo-window-manager-com/collectables_collection_default.png'), centered: true },
    unknown: { left: 0, top: 0, width: 300, height: 300, src: LayoutImage('habbo-window-manager-com/collectables_icon_curator_stamp_large.png'), stretched: false },
    badge: { left: 0, top: 0, width: 300, height: 300, zoom: 2 },
    pet: { left: 0, top: 0, width: 300, height: 300, zoom: 1, shrinkOnOverflow: false },
    avatar: { left: 105, top: 85, width: 90, height: 130 },
    effect: { left: 100, top: 70, width: 100, height: 260, roomId: REWARD_BOX_PREVIEW_ROOM_ID },
};

export const CollectiblesRewardBoxView = () => {
    const reward = useCollectiblesStore(x => x.rewardBoxCurrent);
    const preview = useCollectiblesStore(x => x.rewardBoxPreview);
    // Built at layer 2 and added to the desktop where the layout puts it.
    const frame = useTemplateFrame({ id: 'CollectibleReward', defaultPosition: { x: 59, y: 79 }, onClose: showNextCollectiblesReward });
    const color = reward ? getCollectibleRarityColor(reward.rarity) : undefined;

    return (
        <TemplateWindow
            id="habbo-catalog-com/collectible_reward_xml"
            frame={frame}
            bindings={{
                '': { color },
                background: { color },
                // `update`: the star turns while the box is up.
                rotating_star: rotatingBitmapBinding(LayoutImage('habbo-window-manager-com/bg_star_300x300.png'), 300, COLLECTIBLES_BG_STAR_ROTATE_SPEED, true, true, 0.75),
                product_image: {
                    children: (
                        <CollectiblesProductPreview
                            preview={preview}
                            slots={REWARD_PRODUCT_IMAGE_SLOTS}
                        />
                    ),
                },
                ...(reward && {
                    product_name: { caption: getCollectibleProductName(wrapBaseItem(reward)) },
                    rarity_text: { caption: reward.rarity.toUpperCase() },
                }),
                ok_button: { onPointerTap: showNextCollectiblesReward },
            }}
        />
    );
};
