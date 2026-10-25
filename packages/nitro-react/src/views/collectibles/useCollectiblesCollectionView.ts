/**
 * The open set of the collections tab - `tabs/subviews/CollectionView` on `collection_content` of
 * `collectible_view.xml`:
 *
 * - `collection_header_container`: the set's name (`collectibles.set.<id>`, its own name without
 *   one) and `collected/total` on the set's progress colour (`initHeader`);
 * - `preview_container`: the turning star, the previewer (`CollectibleProductPreviewer` with every
 *   window), and over it either the set's view - the completion box of its bonus or reward item
 *   (`bonus_or_reward_container`, with its claim button and, for a bonus with a claim period, the
 *   time bar) and its XP texts (`collection_progress_container`) - or the selected item's
 *   (`product_name_container`, whose hover shows `product_info_container`'s type / rarity / XP
 *   rows, and `product_progress_container`);
 * - `item_container`: the set's items, one `CollectibleItemRenderer` each; picking one previews
 *   it, picking it again goes back to the set.
 *
 * The time bar follows `updateBonusProgressBar`, redrawn once a second: while the claim period
 * runs it is filled by the time left, in colours with no alpha byte - so it shows empty - under
 * `collectibles.preview.time_left` and the friendly time; once it has passed, full red under
 * `collectibles.preview.bonus_claim_ended` with the snapshot's date. `completion_header_container`
 * is 60 high with the bar, 38 without.
 */
import { claimCollectionItem, hasCollectionBonusClaimWindow, selectCollectionItem, setCollectionProductInfoVisible } from '#base/commands';
import { CollectiblesCollectionView, COLLECTION_PREVIEW_STATUS_BONUS, COLLECTION_PREVIEW_STATUS_ITEM, formatCollectiblesDate, getCollectionProgressColor, useCollectiblesStore, wrapCollectionItem } from '#base/context/collectibles';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useSecondsClock } from '#base/hooks';
import { TemplateBindings, TemplateWindows } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';

import { arrangeCollectiblesTimeBar, collectibleGridItem, collectiblesHubPreviewer, collectiblesPreviewerBindings, collectiblesStarBinding, CollectiblesTimeBar, collectiblesTimeBarBindings, useCollectiblesHover } from './collectiblesTemplate';

/** `CollectionView.BONUS_PROGRESS_*`. */
const BONUS_PROGRESS_ACTIVE_TOP_COLOR = 37130;
const BONUS_PROGRESS_ACTIVE_BOTTOM_COLOR = 228352;
const BONUS_PROGRESS_EXPIRED_TOP_COLOR = 4294913325;
const BONUS_PROGRESS_EXPIRED_BOTTOM_COLOR = 4289724416;
/** `progress_padded_bar`'s width in `padded_cont`. */
const COMPLETION_BAR_WIDTH = 280;
/** `initRewardItem` / `updateBonusProgressBar`: `completion_header_container`'s height with the bar and without. */
const COMPLETION_HEADER_HEIGHT_BAR = 60;
const COMPLETION_HEADER_HEIGHT = 38;

const PREVIEWER = collectiblesHubPreviewer();

export interface CollectiblesCollectionViewWindow {
    bindings: TemplateBindings;
    arrange: (windows: TemplateWindows) => void;
}

/** The set's view in the tab's container, `view` the set the tab opened (`§_-GQ§`). */
export const useCollectiblesCollectionView = (view: CollectiblesCollectionView | null): CollectiblesCollectionViewWindow => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const ready = useCollectiblesStore(x => x.collectionsReady);
    const collection = useCollectiblesStore(x => (view ? x.collections.find(entry => entry.data.collectionId === view.collectionId) : undefined));
    const clock = useSecondsClock();
    const hover = useCollectiblesHover();

    if (!view || !collection) return { bindings: {}, arrange: () => undefined };

    const { data } = collection;
    const collected = collection.collectedItemCount;
    const total = data.items.length;
    const complete = collected === total;
    const isItemPreview = view.previewStatus === COLLECTION_PREVIEW_STATUS_ITEM;
    const selectedItem = isItemPreview ? data.items[view.selectedItemIndex] : undefined;

    // `updateBonusProgressBar`.
    const now = performance.timeOrigin + clock;
    const isBonus = view.previewStatus === COLLECTION_PREVIEW_STATUS_BONUS;
    const claimWindow = isBonus && hasCollectionBonusClaimWindow(data.releasedTime, data.snapshotTime);
    const expired = claimWindow && (now >= data.snapshotTime);
    const timeLeft = Math.max(0, data.snapshotTime - now);
    const duration = data.snapshotTime - data.releasedTime;
    const fraction = (duration <= 0) ? 1 : Math.min(1, Math.max(0, timeLeft / duration));
    const bar: CollectiblesTimeBar = expired
        ? {
                fill: COMPLETION_BAR_WIDTH,
                topColor: BONUS_PROGRESS_EXPIRED_TOP_COLOR,
                bottomColor: BONUS_PROGRESS_EXPIRED_BOTTOM_COLOR,
                text: t('collectibles.preview.bonus_claim_ended', 'Bonus item claim period ended - %date%', { date: formatCollectiblesDate(data.snapshotTime) }),
            }
        : {
                fill: Math.trunc(COMPLETION_BAR_WIDTH * fraction),
                topColor: BONUS_PROGRESS_ACTIVE_TOP_COLOR,
                bottomColor: BONUS_PROGRESS_ACTIVE_BOTTOM_COLOR,
                text: `${t('collectibles.preview.time_left', '')}: ${GetFriendlyTime(t, timeLeft / 1000)}`,
            };

    return {
        bindings: {
            // `initHeader`.
            collection_name: { caption: t(`collectibles.set.${data.collectionId}`, data.collectionName) },
            'progress_header_container/progress_color': { color: getCollectionProgressColor(collected, total) },
            'progress_header_container/progress_text': { caption: `${collected}/${total}` },
            bg_star: collectiblesStarBinding(ready),
            ...collectiblesPreviewerBindings(PREVIEWER, view.preview),
            // `initRewardClaim` / `initRewardItem`.
            bonus_or_reward_container: { visible: !!view.completionItem },
            reward_furni_name: { caption: view.completionItemName },
            'padded_cont/progress_bar': { visible: claimWindow },
            ...(claimWindow && collectiblesTimeBarBindings(bar)),
            claim_button: { visible: view.claimVisible, disabled: !view.claimEnabled, onPointerTap: () => claimCollectionItem(send) },
            // `initCollectionPreview`.
            collection_progress_container: { visible: !isItemPreview },
            preview_score_text: { caption: t('collectibles.preview.score', '', { progress: `<font color="#00FF12">${data.collectionScore}</font>`, goal: String(data.collectionTotalScore) }) },
            preview_reward_text: { caption: t(complete ? 'collectibles.preview.reward_collected' : 'collectibles.preview.reward', '', { amount: `<font color="#FFC800">${data.collectionBoostScore}</font>` }) },
            // `initMintedItemPreview`.
            product_name_container: {
                visible: isItemPreview,
                onPointerOver: () => setCollectionProductInfoVisible(true),
                onPointerOut: () => setCollectionProductInfoVisible(false),
            },
            preview_furni_name: { caption: view.productName },
            product_info_container: { visible: view.productInfoVisible },
            product_info_list: {
                items: view.productInfoEntries.map((entry, index) => ({
                    key: String(index),
                    from: 'product_info_list/product_info_entry_template',
                    bindings: { product_info_key: { caption: entry.key }, product_info_value: { caption: entry.value } },
                })),
            },
            product_progress_container: { visible: !!selectedItem },
            ...(selectedItem && { procuct_score_text: { caption: t((selectedItem.amount > 0) ? 'collectibles.preview.product.complete' : 'collectibles.preview.product.incomplete', '', { amount: `<font color="#FFC800">${selectedItem.score}</font>` }) } }),
            // `populateGridItems`.
            itemgrid_collection: {
                items: data.items.map((item, index) => collectibleGridItem({
                    key: String(index),
                    from: 'itemgrid_collection/item_template',
                    kind: 'collection',
                    info: wrapCollectionItem(item),
                    active: view.selectedItemIndex === index,
                    hover,
                    onSelect: () => selectCollectionItem(send, index),
                })),
            },
        },
        arrange: (windows) => {
            windows.find('completion_header_container')?.setHeight(claimWindow ? COMPLETION_HEADER_HEIGHT_BAR : COMPLETION_HEADER_HEIGHT);

            if (claimWindow) arrangeCollectiblesTimeBar(windows, bar);
        },
    };
};
