/**
 * The user-to-user trade docked under the inventory's pages - Flash `inventory/trading/TradingView`
 * over `inventory_trading_xml`, which Flash puts in `inventory_xml`'s `subContentArea` and grows the
 * window to fit (`getWindowContainer`).
 *
 * - `resizeWindow` (the `arrange`): `Util.moveAllChildrenToColumn(window, 7)` stacks the window's
 *   four parts - `trade_container`, `silver_container`, `info_border_highlighted`,
 *   `button_container` - 7px apart, skipping a hidden one, and the window takes the height of the
 *   lowest (`getLowestPoint`). `inventoryTradingLayout` gives the inventory the same height.
 * - `updateItemList` / `updateItemsGrid`: each side's `item_grid_N` keeps its nine cells, and each
 *   filled one holds its item's thumb (`GroupItem.window`, `inventory_thumb_xml`; a collectible's
 *   `inventory_thumb_nft_xml`) cut to 40x40 by `fixItemWindow`. The furni groups fill the grid
 *   first, the collectibles after them.
 * - `thumbEventProc`: pressing one of your own filled cells takes that stack back out
 *   (`requestRemoveItemFromTrading`); hovering a filled cell on either side opens the item popup
 *   (`ItemPopupCtrl`, see `InventoryTradingItemPopup`), leaving it hides the popup after a moment.
 * - `updateUserInterface`: the other side's name (`OTHER_USER_NAME`) and both lock icons
 *   (`OWN_USER_LOCK` / `OTHER_USER_LOCK`), closed once that side accepts.
 * - `showOwnUserNotification` / `showOtherUserNotification`: a side that may not trade shows its
 *   `info_text_N` notice instead of its grid - set up by `setup`, and raised mid-trade by
 *   `TradingYouAreNotAllowed` / `TradingOtherNotAllowed`.
 * - `updateActionState`: `button_accept`'s caption and enabling, and `help_text`, by the state;
 *   `button_cancel` dead while a web3 trade is being confirmed; with `trading.warning.enabled` the
 *   two sides' counts (`showOfferInfo`) and the credit furni warning (`showHighlightInfo`).
 * - `showSilverFeeInfo`: `silver_container` only for a web3 trade - both silver counts, the
 *   progress towards the fee (red until it is met) and the plus and minus buttons, live only while
 *   the trade is being put together and within what the user has and the fee still needs.
 * - `windowEventProc`: accept (accept, take back or confirm), cancel (cancel or decline) and the two
 *   silver buttons.
 *
 * Not ported: a trax song's name in the popup (`getTraxSongFurniName` asks the sound manager for
 * the song) and a category 10 furni's creation date after its name; both show the furni's name.
 * `CreditTradingItem`'s popup for the other side's credits is not reached - the trade's offers
 * carry no credit items. A thumb's rarity plaque (`rarity_item_overlay_grid`) is not drawn.
 */
import { ITradeNftAsset } from '@nitrodevco/nitro-packets';
import { FederatedPointerEvent } from 'pixi.js';

import { addTradingSilverFee, getCollectibleProductName, onTradingAcceptPressed, onTradingCancelPressed, productImageWidgetPreview, requestRemoveItemFromTrading } from '#base/commands';
import { COLLECTIBLE_PREVIEW_EASTER_EGG_INITIAL, wrapBaseItem } from '#base/context/collectibles';
import { useWebSocketContext } from '#base/context/communication';
import { getTradingItemsTotal, hasTradingOffer,
    INVENTORY_FURNI_CATEGORY_POSTER, INVENTORY_TRADING_MAX_ITEMS, INVENTORY_TRADING_STATE_CONFIRMED, INVENTORY_TRADING_STATE_CONFIRMING,
    INVENTORY_TRADING_STATE_COUNTDOWN, INVENTORY_TRADING_STATE_READY, INVENTORY_TRADING_STATE_RUNNING, InventoryFurniGroup, InventoryTradingUser, isInventoryFurniGroupWallItem,
    isTradingFeeReached, peekInventoryFurni, useInventoryStore,
} from '#base/context/inventory';
import { useSystemStore, useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { Template, TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows, useTemplateLibrary } from '#base/theme';
import { getFurnitureData } from '#base/utils';

import { INVENTORY_LIBRARY, inventoryTemplateId } from '../inventoryPage';
import { fixTradeItemWindow, getInventoryFurniIconUrl, inventoryFurniThumbBindings, inventoryNftThumbBindings } from '../inventoryThumbs';
import { InventoryTradingItemPopup, InventoryTradingItemPopupContent } from './InventoryTradingItemPopup';
import { INVENTORY_TRADING_SECTION_GAP, useInventoryTradingSections } from './inventoryTradingLayout';
import { useInventoryTradingItemPopup } from './useInventoryTradingItemPopup';

/** `GroupItem.THUMB_WINDOW_LAYOUT` and `CollectibleGroupedItem`'s thumb. */
const THUMB_TEMPLATE = inventoryTemplateId('inventory_thumb_xml');
const NFT_THUMB_TEMPLATE = inventoryTemplateId('inventory_thumb_nft_xml');

/** `updateUserInterface`'s two lock icons. */
const LOCKED_ICON = 'habbo-window-manager-com-inventory_trading_trading_locked_icon';
const UNLOCKED_ICON = 'habbo-window-manager-com-inventory_trading_trading_unlocked_icon';

/** `showSilverFeeInfo`: the running total is black once the fee is met, red while it is not. */
const SILVER_MET_COLOR = '000000';
const SILVER_SHORT_COLOR = 'AC232A';

/** What a cell holds: a stack of furni or one collectible (`updateItemsGrid` fills them in that order). */
type TradingSlotContent
    = | { kind: 'furni'; group: InventoryFurniGroup }
        | { kind: 'nft'; asset: ITradeNftAsset };

/**
 * A furni group's thumb - `GroupItem.window` (`inventory_thumb_xml`) as `updateAllThumbDataVisuals`
 * leaves it: the seen grey ground and no selection outline.
 */
const furniThumb = (group: InventoryFurniGroup, template: Template): TemplateItem => ({
    key: `group-${group.id}`,
    from: template,
    bindings: inventoryFurniThumbBindings(group, { selected: false, unseen: false, showRecyclable: false }),
    arrange: fixTradeItemWindow,
});

/** A collectible's thumb - `CollectibleGroupedItem.window` (`inventory_thumb_nft_xml`), one copy, unselected. */
const nftThumb = (asset: ITradeNftAsset, template: Template): TemplateItem => ({
    key: `nft-${asset.assetId}`,
    from: template,
    bindings: inventoryNftThumbBindings(asset, 1, false),
    arrange: fixTradeItemWindow,
});

/** A side's offer in `updateItemsGrid`'s order: the furni groups, then the collectibles. */
const offeredContents = (user: InventoryTradingUser): TradingSlotContent[] => [
    ...user.groups.map((group): TradingSlotContent => ({ kind: 'furni', group })),
    ...user.nftItems.map((asset): TradingSlotContent => ({ kind: 'nft', asset })),
];

export const InventoryTradingView = () => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const state = useInventoryStore(x => x.tradingState);
    const ownUser = useInventoryStore(x => x.tradingOwnUser);
    const otherUser = useInventoryStore(x => x.tradingOtherUser);
    const countdown = useInventoryStore(x => x.tradingCountdown);
    const requiredSilverFee = useInventoryStore(x => x.tradingRequiredSilverFee);
    const playerSilver = useInventoryStore(x => x.tradingPlayerSilver);
    const otherPlayerSilver = useInventoryStore(x => x.tradingOtherPlayerSilver);
    const ownSilverBalance = useUserStore(x => x.silver);
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);
    const templates = useTemplateLibrary(INVENTORY_LIBRARY);
    const { showSilver, showHighlight, warningsEnabled } = useInventoryTradingSections();
    const popup = useInventoryTradingItemPopup<TradingSlotContent>();

    const thumbTemplate = templates?.[THUMB_TEMPLATE];
    const nftThumbTemplate = templates?.[NFT_THUMB_TEMPLATE];

    if (!thumbTemplate || !nftThumbTemplate) return null;

    /** `thumbEventProc`'s popup name: the furni's own name (a poster's by its id), or the collectible's product name. */
    const getSlotName = (content: TradingSlotContent): string => {
        if (content.kind === 'nft') return getCollectibleProductName(wrapBaseItem(content.asset));

        const { group } = content;

        if (group.category === INVENTORY_FURNI_CATEGORY_POSTER) return t(`poster_${peekInventoryFurni(group)?.stuffData.getLegacyString() ?? ''}_name`);

        return getFurnitureData({ floorItems, wallItems }, group.typeId, isInventoryFurniGroupWallItem(group))?.localizedName ?? '';
    };

    /** `thumbEventProc`'s `updateContent`: a furni's picture and limited edition, or a collectible's product (`nft_image`'s `previewImage`). */
    const getSlotPopupContent = (content: TradingSlotContent): InventoryTradingItemPopupContent => {
        if (content.kind === 'nft') return { kind: 'nft', preview: productImageWidgetPreview(wrapBaseItem(content.asset), COLLECTIBLE_PREVIEW_EASTER_EGG_INITIAL).preview };

        const stuffData = peekInventoryFurni(content.group)?.stuffData ?? content.group.stuffData;

        return { kind: 'furni', imageUrl: getInventoryFurniIconUrl(content.group), uniqueSerialNumber: stuffData.uniqueNumber, uniqueSeriesSize: stuffData.uniqueSeries };
    };

    /** `updateItemsGrid`: the grid's nine cells, each filled one holding its thumb; `thumbEventProc` on each. */
    const gridItems = (user: InventoryTradingUser, own: boolean): TemplateItem[] => {
        const offered = offeredContents(user);

        return Array.from({ length: INVENTORY_TRADING_MAX_ITEMS }, (unused, index): TemplateItem => {
            const content = offered[index];

            return {
                key: `cell-${index}`,
                from: own ? '#OWN_USER_ITEM' : '#OTHER_USER_ITEM',
                bindings: {
                    '': {
                        added: content ? [ (content.kind === 'furni') ? furniThumb(content.group, thumbTemplate) : nftThumb(content.asset, nftThumbTemplate) ] : undefined,
                        // `WME_CLICK` on the own side: the cell's id is the group's index.
                        onPointerTap: (own && content) ? () => requestRemoveItemFromTrading(send, index) : undefined,
                        onPointerOver: content ? (event: FederatedPointerEvent) => popup.show(content, event.currentTarget) : undefined,
                        onPointerOut: popup.hideDelayed,
                    },
                },
            };
        });
    };

    const feeReached = isTradingFeeReached(requiredSilverFee, playerSilver, otherPlayerSilver);
    const anyOffer = hasTradingOffer(ownUser) || hasTradingOffer(otherUser);

    /** `updateActionState`'s switch: the accept button's caption, whether it is live, and the help text. */
    const acceptEnabled = ((state === INVENTORY_TRADING_STATE_READY) || (state === INVENTORY_TRADING_STATE_RUNNING))
        ? (anyOffer && feeReached)
        : (state === INVENTORY_TRADING_STATE_CONFIRMING);

    const acceptCaption = (() => {
        switch (state) {
            case INVENTORY_TRADING_STATE_RUNNING:
                return ownUser.accepts ? t('inventory.trading.modify') : t('inventory.trading.accept');
            case INVENTORY_TRADING_STATE_COUNTDOWN:
                return t('inventory.trading.countdown', '', { counter: String(Math.max(0, countdown)) });
            // The confirmed state leaves the caption confirming set.
            case INVENTORY_TRADING_STATE_CONFIRMING:
            case INVENTORY_TRADING_STATE_CONFIRMED:
                return t('inventory.trading.confirm');
            default:
                return t('inventory.trading.accept');
        }
    })();

    const helpText = (() => {
        switch (state) {
            case INVENTORY_TRADING_STATE_RUNNING:
                // `setup`: with neither side able to trade the help text says so instead.
                if (!ownUser.canTrade && !otherUser.canTrade) return t('inventory.trading.warning.both_accounts_disabled');

                return t('inventory.trading.info.add');
            case INVENTORY_TRADING_STATE_COUNTDOWN:
            case INVENTORY_TRADING_STATE_CONFIRMING:
                return t('inventory.trading.info.confirm');
            case INVENTORY_TRADING_STATE_CONFIRMED:
                return t('inventory.trading.info.waiting');
            default:
                return '';
        }
    })();

    // `showSilverFeeInfo`: the buttons work only while the trade is still being put together.
    const silverEditable = (state === INVENTORY_TRADING_STATE_READY) || (state === INVENTORY_TRADING_STATE_RUNNING);
    const totalSilver = playerSilver + otherPlayerSilver;

    const bindings: TemplateBindings = {
        help_text: { caption: helpText, visible: true },

        // `updateUserInterface`.
        '#OTHER_USER_NAME': { caption: otherUser.userName },
        '#OWN_USER_LOCK': { asset: ownUser.accepts ? LOCKED_ICON : UNLOCKED_ICON },
        '#OTHER_USER_LOCK': { asset: otherUser.accepts ? LOCKED_ICON : UNLOCKED_ICON },

        // `showOwnUserNotification` / `showOtherUserNotification` and their `hide` twins.
        info_text_0: { visible: ownUser.notice !== undefined, caption: ownUser.notice ? t(ownUser.notice) : '' },
        item_grid_0: { visible: ownUser.notice === undefined, items: gridItems(ownUser, true) },
        info_text_1: { visible: otherUser.notice !== undefined, caption: otherUser.notice ? t(otherUser.notice) : '' },
        item_grid_1: { visible: otherUser.notice === undefined, items: gridItems(otherUser, false) },

        // `showSilverFeeInfo`.
        silver_container: { visible: showSilver },
        your_silver: { caption: String(playerSilver) },
        other_silver: { caption: String(otherPlayerSilver) },
        silver_progress_html: { caption: `<font color="#${feeReached ? SILVER_MET_COLOR : SILVER_SHORT_COLOR}">${totalSilver}</font>/${requiredSilverFee}` },
        silver_minus_button: { disabled: (playerSilver <= 0) || !silverEditable, onPointerTap: () => addTradingSilverFee(send, false) },
        silver_plus_button: { disabled: (totalSilver >= requiredSilverFee) || (playerSilver >= ownSilverBalance) || !silverEditable, onPointerTap: () => addTradingSilverFee(send, true) },

        // `showHighlightInfo`, from `updateActionState` while `trading.warning.enabled`.
        info_border_highlighted: { visible: showHighlight },
        info_text_highlighted: { visible: showHighlight, caption: showHighlight ? t('inventory.trading.warning.credits') : '' },

        button_accept: { caption: acceptCaption, disabled: !acceptEnabled, onPointerTap: () => onTradingAcceptPressed(send) },
        button_cancel: { disabled: showSilver && (state === INVENTORY_TRADING_STATE_CONFIRMED), onPointerTap: () => onTradingCancelPressed(send) },

        ...(showSilver && {
            silver_fee_info_text: { caption: t((requiredSilverFee <= 0) ? 'inventory.trading.note_silver_fee_free_temporarily' : 'inventory.trading.note_silver_fee') },
        }),

        // `showOfferInfo`: the counts only with `trading.warning.enabled`.
        ...(warningsEnabled && {
            content_text_1_a: { caption: t('inventory.trading.info.itemcount', '', { value: String(getTradingItemsTotal(ownUser)) }) },
            content_text_1_b: { caption: t('inventory.trading.info.creditvalue', '', { value: String(ownUser.numCredits) }) },
            content_text_2_a: { caption: t('inventory.trading.info.itemcount', '', { value: String(getTradingItemsTotal(otherUser)) }) },
            content_text_2_b: { caption: t('inventory.trading.info.creditvalue', '', { value: String(otherUser.numCredits) }) },
        }),
    };

    /** `resizeWindow`: `Util.moveAllChildrenToColumn(window, 7)`, then the window as tall as `getLowestPoint`. */
    const arrange = ({ root }: TemplateWindows) => {
        const window = root();

        if (!window) return;

        let y = 0;
        let lowest = 0;

        for (const child of window.children) {
            if (!child.visible || (child.height <= 0)) continue;

            child.setY(y);
            y += child.height + INVENTORY_TRADING_SECTION_GAP;
            lowest = Math.max(lowest, child.y + child.height);
        }

        window.setHeight(lowest);
    };

    return (
        <>
            <TemplateWindow
                id={inventoryTemplateId('inventory_trading_xml')}
                bindings={bindings}
                arrange={arrange}
            />
            {popup.target && (
                <InventoryTradingItemPopup
                    anchor={popup.target.anchor}
                    name={getSlotName(popup.target.item)}
                    content={getSlotPopupContent(popup.target.item)}
                    onDismiss={popup.hide}
                />
            )}
        </>
    );
};
