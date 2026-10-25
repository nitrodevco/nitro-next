/**
 * The collectibles reward box - Flash `CollectiblesRewardBoxView` - and the `nft_opening` bubble.
 * Part of Flash `catalog/collectibles/CollectiblesController` - see `collectiblesCommands`.
 */
import { ICollectibleBaseItem } from '@nitrodevco/nitro-packets';

import { collectiblesStore, getCollectibleRarityColor, wrapBaseItem } from '#base/context/collectibles';
import { notificationStore } from '#base/context/notifications';
import { translate as t } from '#base/context/system';
import { userStore } from '#base/context/user';

import { getCollectibleProductName, notifyCollectibles, previewImage } from './collectiblesCommands';

/** `populateRewardItem`: the reward's image, name and rarity; the window takes the rarity's colour. */
const populateRewardItem = (reward: ICollectibleBaseItem) => {
    const { rewardBoxPreviewEasterEgg, patchCollectiblesRewardBox } = collectiblesStore.getState();
    // `product_image`'s own `ProductImageWidget.previewImage`.
    const { preview, easterEgg } = previewImage(wrapBaseItem(reward), rewardBoxPreviewEasterEgg);

    patchCollectiblesRewardBox({ rewardBoxCurrent: reward, rewardBoxPreview: preview, rewardBoxPreviewEasterEgg: easterEgg });
};

/** `showNextRewardOrClose`. */
export const showNextCollectiblesReward = () => {
    const { rewardBoxQueue, patchCollectiblesRewardBox } = collectiblesStore.getState();

    if (!rewardBoxQueue.length) {
        patchCollectiblesRewardBox({ rewardBoxVisible: false });

        return;
    }

    const [ next, ...rest ] = rewardBoxQueue;

    patchCollectiblesRewardBox({ rewardBoxQueue: rest });
    populateRewardItem(next);
};

/**
 * `showLootBoxReward` / `showReward`: the reward is queued; a box not on the desktop comes up with
 * the next one, and a box built just now shows it at once too (`param2`).
 */
const showLootBoxReward = (reward: ICollectibleBaseItem) => {
    const { rewardBoxVisible, rewardBoxQueue, patchCollectiblesRewardBox } = collectiblesStore.getState();

    patchCollectiblesRewardBox({ rewardBoxQueue: [ ...rewardBoxQueue, reward ] });

    if (!rewardBoxVisible) {
        patchCollectiblesRewardBox({ rewardBoxVisible: true });
        showNextCollectiblesReward();
    }
};

/**
 * `onRedeemLootBoxStateEvent`: a finished opening. The user's own reward comes up in the reward
 * box; someone else's is an `nft_opening` bubble with the product, its rarity and the rarity's
 * colour in the extra data.
 */
export const onRedeemNftLootBoxState = (state: number, openerAvatarId: number, reward: ICollectibleBaseItem) => {
    const isOwn = userStore.getState().userId === openerAvatarId;

    if (state === 0) return;

    if (isOwn) {
        showLootBoxReward(reward);

        return;
    }

    const text = t('collectibles.reward_box.notif.desc', '', { name: t('generic.someone'), item: getCollectibleProductName(wrapBaseItem(reward)) });

    notificationStore.getState().addNotification(text, 'nft_opening', undefined, undefined, { product: wrapBaseItem(reward), rarity: reward.rarity, rarityColor: getCollectibleRarityColor(reward.rarity) });
};

/** `onRedeemLootBoxResultEvent`. */
export const onRedeemNftLootBoxResult = (resultCode: number) => {
    if (resultCode === 1) notifyCollectibles(t('generic.error'));
    if (resultCode === 2) notifyCollectibles(t('collectibles.reward_box.wrong_wallet'));
};
