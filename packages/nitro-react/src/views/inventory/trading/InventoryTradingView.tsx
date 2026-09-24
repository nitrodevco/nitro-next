/**
 * The user-to-user trade docked under the inventory's pages - Flash `inventory/trading/TradingView`
 * over `inventory_trading_xml` (478x371), which Flash puts in `inventory_xml`'s `subContentArea`
 * (0,301) and grows the window to fit.
 *
 * `resizeWindow` lays the view's four parts out as a column 7px apart and takes the window's height
 * from the lowest of them, so a part that is hidden closes its gap rather than leaving a hole -
 * which is why this is a column and not the layout's absolute offsets. With everything showing the
 * column reproduces the layout exactly (233 + 7 + 59 + 7 + 28 + 7 + 32).
 *
 * - `trade_container` (style 102, 478x233) holds the `help_text` the state writes
 *   (`showInfoMessage`) and the two `offers_N` regions (17,29 and 263,29, 200x200): the side's name
 *   over a 3x3 grid of 40x40 slots (`item_grid_N` inside `item_grid_border_N` at 32,22), the item
 *   and credit counts under it (`content_text_N_a` / `_b`), and the lock icon that closes when
 *   that side accepts (`updateUserInterface`'s `OWN_USER_LOCK` / `OTHER_USER_LOCK`).
 * - A side that may not trade shows a notice over its grid instead of the grid itself
 *   (`showOwnUserNotification` / `showOtherUserNotification`), which is also what
 *   `TradingYouAreNotAllowed` and `TradingOtherNotAllowed` raise mid-trade.
 * - Pressing one of your own slots takes that stack back out (`thumbEventProc`'s click on the own
 *   side -> `requestRemoveItemFromTrading`); the other side's slots do nothing.
 * - `silver_container` (style 3, 478x59) is the web3 trade's fee row and shows only for one
 *   (`isWeb3Trade`): the two silver counts, the progress towards the fee - red until it is met -
 *   and the plus and minus buttons, which are live only while the trade is still being put
 *   together and within what the user has and what the fee still needs (`showSilverFeeInfo`).
 * - `info_border_highlighted` (style 2) carries the credit-furni warning behind
 *   `trading.warning.enabled` (`updateActionState`).
 * - `button_accept`'s caption and enabling follow the state, as does what pressing it means
 *   (accept, take back, confirm); `button_cancel` cancels or declines, and is dead while a web3
 *   trade is being confirmed.
 *
 * A side's nine slots hold its furni groups first and its NFTs after, which is the order
 * `updateItemsGrid` fills them in; an NFT draws with the product preview the collectibles hub uses.
 * Hovering a filled slot names what is in it (`ItemPopupCtrl`, see `InventoryTradingItemPopup`).
 */
import { ITradeNftAsset } from '@nitrodevco/nitro-packets';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { Container as PixiContainer } from 'pixi.js';
import { useRef } from 'react';

import { addTradingSilverFee, getCollectiblePreviewIcon, getCollectibleProductName, onTradingAcceptPressed, onTradingCancelPressed, requestRemoveItemFromTrading } from '#base/commands';
import { wrapBaseItem } from '#base/context/collectibles';
import { useWebSocketContext } from '#base/context/communication';
import {
    getTradingItemsTotal, hasTradingOffer, INVENTORY_TRADING_MAX_ITEMS, INVENTORY_TRADING_STATE_CONFIRMED, INVENTORY_TRADING_STATE_CONFIRMING, INVENTORY_TRADING_STATE_COUNTDOWN,
    INVENTORY_TRADING_STATE_READY, INVENTORY_TRADING_STATE_RUNNING, InventoryFurniGroup, InventoryTradingUser, isInventoryFurniGroupWallItem,
    isTradingFeeReached, peekInventoryFurni, useInventoryStore,
} from '#base/context/inventory';
import { useSystemStore, useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { Border, Box, Button, IconButton, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';
import { CollectiblesProductPreview } from '#base/views/collectibles/CollectiblesProductPreview';

import { InventoryTradingItemPopup } from './InventoryTradingItemPopup';
import {
    INVENTORY_TRADING_BUTTONS_HEIGHT, INVENTORY_TRADING_CONTAINER_HEIGHT, INVENTORY_TRADING_HIGHLIGHT_HEIGHT, INVENTORY_TRADING_SECTION_GAP,
    INVENTORY_TRADING_SILVER_HEIGHT, INVENTORY_TRADING_WIDTH, useInventoryTradingSections,
} from './inventoryTradingLayout';
import { useInventoryTradingItemPopup } from './useInventoryTradingItemPopup';

/** `trade_container`'s and `silver_container`'s tints. */
const TRADE_CONTAINER_TINT = '#27556a';
const SILVER_CONTAINER_TINT = '#a0ccd8';
const HIGHLIGHT_TINT = '#fc9228';

/** `showSilverFeeInfo`: the running total is black once the fee is met, red while it is not. */
const SILVER_MET_COLOR = '#000000';
const SILVER_SHORT_COLOR = '#AC232A';

/** `TradingView.fixItemWindow`: a group's thumb in a trade slot is always 40x40. */
const SLOT_SIZE = 40;

/** `item_popup_xml`'s `item_image` is 55 high; the picture is drawn square inside it. */
const POPUP_IMAGE_SIZE = 55;

/** A poster is named by its poster id, not by its furni data (`GroupItem.getFurniItemName`). */
const TRADING_CATEGORY_POSTER = 6;

/** What a slot holds: a stack of furni, one NFT, or nothing (`updateItemsGrid` fills it in that order). */
type TradingSlotContent
    = | { kind: 'furni'; group: InventoryFurniGroup }
        | { kind: 'nft'; asset: ITradeNftAsset };

/** The slot's own picture, which the hover popup draws again at its own size. */
const TradingSlotImage = ({ content, size }: { content: TradingSlotContent; size: number }) => {
    const engine = GetRoomEngine();

    if (content.kind === 'nft') {
        return (
            <CollectiblesProductPreview
                preview={getCollectiblePreviewIcon(wrapBaseItem(content.asset))}
                slots={{
                    productPreview: { left: 0, top: 0, width: size, height: size },
                    badge: { left: 0, top: 0, width: size, height: size, zoom: 1 },
                    unknown: { left: (size - 18) / 2, top: (size - 18) / 2, width: 18, height: 18, src: LayoutImage('shared/collectables_icon_curator_stamp_small.png'), stretched: true },
                    pet: { left: 0, top: 0, width: size, height: size, zoom: 1, shrinkOnOverflow: true },
                }}
            />
        );
    }

    const { group } = content;
    const iconUrl = (isInventoryFurniGroupWallItem(group) ? engine.getFurnitureWallIconUrl(group.typeId, group.stuffData.getLegacyString() || undefined) : engine.getFurnitureFloorIconUrl(group.typeId)) ?? '';

    if (iconUrl === '') return null;

    return (
        <ThemeImage
            src={iconUrl}
            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
            layout={{ position: 'absolute', left: 0, top: 0, width: size, height: size }}
        />
    );
};

interface TradingSlotProps {
    content: TradingSlotContent | undefined;
    /** Only your own slots answer a press (`thumbEventProc`). */
    onPress?: () => void;
    /** `thumbEventProc`'s `WME_OVER` / `WME_OUT`, which run the popup's two timers. */
    onHoverStart?: (content: TradingSlotContent, node: PixiContainer | null) => void;
    onHoverEnd?: () => void;
}

/**
 * One of the nine `item_grid_N` slots: the style 102 grey frame with the offer's icon in it - the
 * furni's own icon, or the NFT's product preview (`CollectiblesController.previewIcon`).
 */
const TradingSlot = ({ content, onPress, onHoverStart, onHoverEnd }: TradingSlotProps) => {
    const nodeRef = useRef<PixiContainer | null>(null);
    const pressable = !!content && !!onPress;

    return (
        <Region
            ref={nodeRef}
            cursor={pressable ? 'pointer' : undefined}
            onPointerTap={pressable ? onPress : undefined}
            onPointerOver={content ? () => onHoverStart?.(content, nodeRef.current) : undefined}
            onPointerOut={content ? onHoverEnd : undefined}
            layout={{ position: 'relative', width: SLOT_SIZE, height: SLOT_SIZE, flexShrink: 0, minWidth: SLOT_SIZE, maxWidth: SLOT_SIZE, minHeight: SLOT_SIZE, maxHeight: SLOT_SIZE }}
        >
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
            >
                {content && (
                    <TradingSlotImage
                        content={content}
                        size={SLOT_SIZE}
                    />
                )}
            </Border>
        </Region>
    );
};

interface TradingOfferProps {
    user: InventoryTradingUser;
    /** The own side is drawn at 17, the other at 263, and only the own side's slots answer a press. */
    own: boolean;
    /** `trading.warning.enabled`: without it the two count lines are left empty. */
    showCounts: boolean;
    onRemove?: (groupIndex: number) => void;
    onHoverStart: (content: TradingSlotContent, node: PixiContainer | null) => void;
    onHoverEnd: () => void;
}

/** One `offers_N` region (200x200). */
const TradingOffer = ({ user, own, showCounts, onRemove, onHoverStart, onHoverEnd }: TradingOfferProps) => {
    const t = useTranslation();
    // `updateItemsGrid`: the furni groups fill the grid first, the NFTs after them.
    const offered: TradingSlotContent[] = [
        ...user.groups.map((group): TradingSlotContent => ({ kind: 'furni', group })),
        ...user.nftItems.map((asset): TradingSlotContent => ({ kind: 'nft', asset })),
    ];
    const slots = Array.from({ length: INVENTORY_TRADING_MAX_ITEMS }, (unused, index) => offered[index]);

    return (
        <Region layout={{ position: 'absolute', left: own ? 17 : 263, top: 29, width: 200, height: 200, overflow: 'hidden' }}>
            <Region layout={{ position: 'absolute', left: 0, top: 2, maxWidth: 200, overflow: 'hidden', flexDirection: 'row' }}>
                <ThemeText
                    text={own ? t('inventory.trading.you') : user.userName}
                    textStyle="u_regular"
                    flashFormat={{ bold: true }}
                    verticalAlign="top"
                    layout={{ flexShrink: 0 }}
                />
                <ThemeText
                    text={own ? t('inventory.trading.areoffering') : t('inventory.trading.isoffering')}
                    textStyle="u_regular"
                    verticalAlign="top"
                    layout={{ flexShrink: 0 }}
                />
            </Region>
            {(user.notice === undefined)
                ? (
                        <Region layout={{ position: 'absolute', left: 32, top: 22, width: 136, height: 136 }}>
                            <Region layout={{ position: 'absolute', left: 4, top: 4, width: 132, height: 132, flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                                {slots.map((content, index) => (
                                    <TradingSlot
                                        key={!content ? `slot-${index}` : ((content.kind === 'furni') ? `group-${content.group.id}` : `nft-${content.asset.assetId}`)}
                                        content={content}
                                        onPress={(own && onRemove) ? () => onRemove(index) : undefined}
                                        onHoverStart={onHoverStart}
                                        onHoverEnd={onHoverEnd}
                                    />
                                ))}
                            </Region>
                        </Region>
                    )
                : (
                        <ThemeText
                            text={user.notice ? t(user.notice) : ''}
                            textStyle={own ? 'il_regular' : 'u_regular'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 128 }}
                            clip
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 34, top: 23, width: 132, height: 132 }}
                        />
                    )}
            {showCounts && (
                <>
                    <ThemeText
                        text={t('inventory.trading.info.itemcount', '', { value: String(getTradingItemsTotal(user)) })}
                        textStyle="u_regular"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 80, top: 162 }}
                    />
                    <ThemeText
                        text={t('inventory.trading.info.creditvalue', '', { value: String(user.numCredits) })}
                        textStyle="u_regular"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 80, top: 180 }}
                    />
                </>
            )}
            <ThemeImage
                src={LayoutImage(user.accepts ? 'inventory/inventory_trading_trading_locked_icon.png' : 'inventory/inventory_trading_trading_unlocked_icon.png')}
                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                layout={{ position: 'absolute', left: 45, top: 164, width: 32, height: 34 }}
            />
        </Region>
    );
};

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
    const { showSilver, showHighlight, warningsEnabled } = useInventoryTradingSections();
    const popup = useInventoryTradingItemPopup<TradingSlotContent>();

    /** `thumbEventProc`'s tooltip text: the furni's own name, or the collectible's product name. */
    const getSlotName = (content: TradingSlotContent): string => {
        if (content.kind === 'nft') return getCollectibleProductName(wrapBaseItem(content.asset));

        const { group } = content;

        if (group.category === TRADING_CATEGORY_POSTER) return t(`poster_${peekInventoryFurni(group)?.stuffData.getLegacyString() ?? ''}_name`);

        return (isInventoryFurniGroupWallItem(group) ? wallItems : floorItems)[group.typeId]?.localizedName ?? '';
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
            case INVENTORY_TRADING_STATE_CONFIRMING:
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

    return (
        <Region layout={{ position: 'relative', width: INVENTORY_TRADING_WIDTH, flexDirection: 'column', gap: INVENTORY_TRADING_SECTION_GAP }}>
            <Border
                variant="102"
                name="trade_container"
                tintColor={TRADE_CONTAINER_TINT}
                layout={{ width: INVENTORY_TRADING_WIDTH, height: INVENTORY_TRADING_CONTAINER_HEIGHT, flexShrink: 0 }}
            >
                <Region
                    alpha={0.6}
                    layout={{ position: 'absolute', left: 8, top: 7, width: 461, maxWidth: 461, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={helpText}
                        textStyle="u_regular"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <TradingOffer
                    user={ownUser}
                    own
                    showCounts={warningsEnabled}
                    onRemove={index => requestRemoveItemFromTrading(send, index)}
                    onHoverStart={popup.showDelayed}
                    onHoverEnd={popup.hideDelayed}
                />
                <TradingOffer
                    user={otherUser}
                    own={false}
                    showCounts={warningsEnabled}
                    onHoverStart={popup.showDelayed}
                    onHoverEnd={popup.hideDelayed}
                />
                <ThemeImage
                    src={LayoutImage('inventory/inventory_trading_trading_arrow_icon.png')}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 224, top: 40, width: 30, height: 160 }}
                />
            </Border>
            {popup.target && (
                <InventoryTradingItemPopup
                    anchor={popup.target.anchor}
                    name={getSlotName(popup.target.item)}
                    image={(
                        <TradingSlotImage
                            content={popup.target.item}
                            size={POPUP_IMAGE_SIZE}
                        />
                    )}
                    onDismiss={popup.hide}
                />
            )}
            {showSilver && (
                <Border
                    variant="3"
                    name="silver_container"
                    tintColor={SILVER_CONTAINER_TINT}
                    layout={{ width: INVENTORY_TRADING_WIDTH, height: INVENTORY_TRADING_SILVER_HEIGHT, flexShrink: 0 }}
                >
                    <ThemeText
                        text={(requiredSilverFee <= 0) ? t('inventory.trading.note_silver_fee_free_temporarily') : t('inventory.trading.note_silver_fee')}
                        textStyle="u_regular"
                        textOptions={{ fontSize: 11, align: 'center' }}
                        flashFormat={{ bold: true }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, top: 5, width: INVENTORY_TRADING_WIDTH, minWidth: INVENTORY_TRADING_WIDTH, maxWidth: INVENTORY_TRADING_WIDTH }}
                    />
                    <IconButton
                        variant="4"
                        name="silver_minus_button"
                        disabled={(playerSilver <= 0) || !silverEditable}
                        onPointerTap={() => addTradingSilverFee(send, false)}
                        layout={{ position: 'absolute', left: 11, top: 30, width: 22, height: 22 }}
                    />
                    <IconButton
                        variant="3"
                        name="silver_plus_button"
                        disabled={(totalSilver >= requiredSilverFee) || (playerSilver >= ownSilverBalance) || !silverEditable}
                        onPointerTap={() => addTradingSilverFee(send, true)}
                        layout={{ position: 'absolute', left: 39, top: 30, width: 22, height: 22 }}
                    />
                    <ThemeImage
                        src={LayoutImage('inventory/inventory_trading_trading_silver_arrow_right.png')}
                        bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                        alpha={0.45}
                        layout={{ position: 'absolute', left: 30, top: 27 }}
                    />
                    <ThemeImage
                        src={LayoutImage('inventory/inventory_trading_trading_silver_arrow_left.png')}
                        bitmap={{ fitSizeToContents: true }}
                        alpha={0.45}
                        layout={{ position: 'absolute', left: 292, top: 27 }}
                    />
                    <ThemeText
                        text={String(playerSilver)}
                        textStyle="u_regular"
                        textOptions={{ fill: '#ffffff', fontSize: 18, align: 'center' }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 97, top: 29, width: 40, minWidth: 40, maxWidth: 40 }}
                    />
                    <Region layout={{ position: 'absolute', left: 212, right: 205, top: 29, minHeight: 25, maxHeight: 25, flexDirection: 'row', gap: 5 }}>
                        <ThemeText
                            text={`<font color="${feeReached ? SILVER_MET_COLOR : SILVER_SHORT_COLOR}">${totalSilver}</font>/${requiredSilverFee}`}
                            textStyle="u_regular"
                            textOptions={{ fontSize: 14 }}
                            markup
                            verticalAlign="top"
                            layout={{ marginTop: 2, flexShrink: 0 }}
                        />
                        <ThemeImage
                            src={LayoutImage('shared/pursearea_mid_silver_icon.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                            layout={{ flexShrink: 0 }}
                        />
                    </Region>
                    <ThemeText
                        text={String(otherPlayerSilver)}
                        textStyle="u_regular"
                        textOptions={{ fill: '#ffffff', fontSize: 18, align: 'center' }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 342, top: 29, width: 40, minWidth: 40, maxWidth: 40 }}
                    />
                </Border>
            )}
            {showHighlight && (
                <Border
                    variant="2"
                    name="info_border_highlighted"
                    tintColor={HIGHLIGHT_TINT}
                    layout={{ marginLeft: 5, width: 466, height: INVENTORY_TRADING_HIGHLIGHT_HEIGHT, flexShrink: 0 }}
                >
                    <ThemeText
                        text={t('inventory.trading.warning.credits')}
                        textStyle="u_regular"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 5, top: 5, maxWidth: 453 }}
                    />
                </Border>
            )}
            <Box layout={{ width: INVENTORY_TRADING_WIDTH, height: INVENTORY_TRADING_BUTTONS_HEIGHT, flexShrink: 0 }}>
                <Button
                    variant="3"
                    name="button_accept"
                    disabled={!acceptEnabled}
                    onPointerTap={() => onTradingAcceptPressed(send)}
                    layout={{ position: 'absolute', left: 5, top: 0, width: 157, height: 28 }}
                >
                    {acceptCaption}
                </Button>
                <Button
                    variant="3"
                    name="button_cancel"
                    disabled={showSilver && (state === INVENTORY_TRADING_STATE_CONFIRMED)}
                    onPointerTap={() => onTradingCancelPressed(send)}
                    layout={{ position: 'absolute', left: 415, top: 0, width: 56, height: 28 }}
                >
                    {t('generic.cancel')}
                </Button>
            </Box>
        </Region>
    );
};
