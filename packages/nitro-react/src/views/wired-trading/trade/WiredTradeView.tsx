/**
 * A wired box trading with the user - Flash `inventory/wired_trading/WiredTradingView` over
 * `inventory_trading_wired_xml`: what the user offers in `offers_0`, what the box gives in
 * `offers_1` (or, for a payment, `offers_1_payment_placeholder`), the lock between them, the info
 * line above and accept / cancel below.
 *
 * It is the inventory's "wired_trading" sub page, docked in the `subContentArea` under the tabs
 * (`InventoryMainView.setSubViewToCategory`, `InventoryTradingDock`) as the user trade is: the
 * trade opens the inventory on its furni page (`toggleInventorySubPage("wired_trading")`), and
 * closing the inventory cancels it (`closingInventoryView`). Items are offered from the inventory's
 * furni page (`useInventoryFurniPage`) and the offer changes through the server's `WiredTradeItemsUpdate`.
 *
 * - `updateUI`: accept needs `canAccept`; a payment swaps the split icon for the arrow and
 *   `offers_1` for the payment picture of the requirement's layout type.
 * - `updateStateUI`: while adding items the lock is open and the info line asks for items;
 *   accept starts a 3 second countdown (`inventory.trading.countdown`, the button disabled),
 *   after which it confirms; once confirmed it stays disabled.
 * - `updateSecondsLeftUI`: under two minutes left of the trade's timeout, "m:ss left" in red.
 * - `updateItemList` (`TradingView.updateItemsGrid`): each side's nine cells, a filled one holding
 *   its group's thumb (`inventory_thumb_xml`; the box's credits first, as `CreditTradingItem`'s
 *   `inventory_thumb_credits_xml`), grouped as `IncomingMessages.populateItemGroups` groups them.
 * - `updateOfferInfoUI`: item and credit counts under both sides.
 * - `ownThumbEventProc` / `othersThumbEventProc` (`TradingView.thumbEventProc`): a click on an own
 *   cell takes that group back out (`requestRemoveItemFromTrading`, its `peek()`'s id); hovering a
 *   filled cell on either side opens the item popup (`ItemPopupCtrl` on `item_popup_xml`, see
 *   `InventoryTradingItemPopup`) - the credits' with `${purse_coins}` and their icon.
 * - The "i" toggles the requirements bubble (`WiredTradeRequirementsView`).
 *
 * `trade_requirements_bubble` is a child of `trade_container` in Flash, put beside the "i" by
 * `recenter` and reaching out of the window; here it floats over the window layer at that place.
 *
 * Not ported, as in the user trade: a trax song's name and a category 10 furni's date in the popup.
 */
import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useEffect, useMemo, useState } from 'react';

import { acceptWiredTrade, closeWiredTrade, confirmWiredTrade, removeWiredTradeItem, wiredTradeCountdownReady } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { groupTradingItems, INVENTORY_FURNI_CATEGORY_POSTER, INVENTORY_TRADING_MAX_ITEMS, InventoryFurniGroup, isInventoryFurniGroupWallItem, peekInventoryFurni } from '#base/context/inventory';
import { useSystemStore, useTranslation } from '#base/context/system';
import { useWiredTradeActions, useWiredTradingStore, WIRED_TRADE_STATE_ADDING_ITEMS, WIRED_TRADE_STATE_CONFIRMED, WIRED_TRADE_STATE_CONFIRMING, WIRED_TRADE_STATE_COUNTDOWN, WIRED_TRADE_STATE_READY } from '#base/context/wired-trading';
import { useSecondsClock } from '#base/hooks';
import { Box, findTemplateChild, FloatingPopup, LayoutImage, Template, TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows, useLayoutSize, useTemplateLibrary } from '#base/theme';
import { isWiredTradePaymentOnly } from '#base/utils';
import { INVENTORY_LIBRARY, inventoryTemplateId, inventoryThumbLook } from '#base/views/inventory/inventoryPage';
import { getInventoryFurniIconUrl, inventoryFurniThumbBindings } from '#base/views/inventory/inventoryThumbs';
import { InventoryTradingItemPopup, InventoryTradingItemPopupContent } from '#base/views/inventory/trading/InventoryTradingItemPopup';
import { useInventoryTradingItemPopup } from '#base/views/inventory/trading/useInventoryTradingItemPopup';
import { getWiredTradingBubbleAnchor, WiredTradingBubbleAnchor } from '#base/views/wired-trading/common/wiredTradingBubbleAnchor';

import { WiredTradeRequirementsView } from './WiredTradeRequirementsView';

const TEMPLATE = inventoryTemplateId('inventory_trading_wired_xml');
/** `GroupItem.THUMB_WINDOW_LAYOUT` and `CreditTradingItem.THUMB_WINDOW_LAYOUT`. */
const THUMB_TEMPLATE = inventoryTemplateId('inventory_thumb_xml');
const CREDITS_THUMB_TEMPLATE = inventoryTemplateId('inventory_thumb_credits_xml');

/** `startConfirmCountdown`: three ticks of a second. */
const COUNTDOWN_SECONDS = 3;
/** `updateSecondsLeftUI`: the line shows under this. */
const SECONDS_LEFT_LIMIT = 120;
/** `recenter`: the bubble this far right of the "i". */
const BUBBLE_GAP = 4;

/** `fixItemWindow`: a thumb in a trade cell, and each of its windows, is 40x40. */
const SLOT_SIZE = 40;

/** `updateStateUI`'s lock icons, `updateUI`'s trade type icons. */
const LOCKED_ICON = LayoutImage('habbo-window-manager-com/inventory_trading_trading_locked_icon.png');
const UNLOCKED_ICON = LayoutImage('habbo-window-manager-com/inventory_trading_trading_unlocked_icon.png');
const ARROW_ICON = LayoutImage('habbo-window-manager-com/inventory_trading_trading_arrow_icon.png');
const SPLIT_ICON = LayoutImage('habbo-window-manager-com/inventory_trading_trading_split_icon.png');
/** `CreditTradingItem.getItemIcon`. */
const CREDITS_ICON = LayoutImage('habbo-window-manager-com/inventory_furni_icon_credits.png');

/** What a cell holds: a group of furni, or the box's credits (`CreditTradingItem`). */
type WiredTradeSlotContent
    = | { kind: 'furni'; group: InventoryFurniGroup }
        | { kind: 'credits'; credits: number };

/** `fixItemWindow`: the thumb 40x40, and every window directly in it moved to 0,0 and made 40x40. */
const fixItemWindow = ({ root }: TemplateWindows) => {
    const thumb = root();

    if (!thumb) return;

    thumb.setWidth(SLOT_SIZE);
    thumb.setHeight(SLOT_SIZE);

    for (const child of thumb.children) child.setRectangle(0, 0, SLOT_SIZE, SLOT_SIZE);
};

/**
 * A cell's thumb: a furni group's `inventory_thumb_xml` as the user trade shows it, or the
 * credits' `inventory_thumb_credits_xml` - the credits icon and the value, shown from 1 up
 * (`CreditTradingItem.getMinimumItemsToShowCounter`).
 */
const slotThumb = (content: WiredTradeSlotContent, thumbTemplate: Template, creditsTemplate: Template): TemplateItem => ((content.kind === 'furni')
    ? { key: `group-${content.group.id}`, from: thumbTemplate, bindings: inventoryFurniThumbBindings(content.group, { selected: false, unseen: false, showRecyclable: false }), arrange: fixItemWindow }
    : {
            key: 'credits',
            from: creditsTemplate,
            bindings: {
                ...inventoryThumbLook(false, false),
                bitmap: { asset: CREDITS_ICON },
                number_container: { visible: content.credits >= 1 },
                number: { caption: String(content.credits) },
            },
            arrange: fixItemWindow,
        });

export const WiredTradeView = () => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const now = useSecondsClock();
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);
    const tradeState = useWiredTradingStore(x => x.tradeState);
    const requirement = useWiredTradingStore(x => x.tradeRequirement);
    const requirementsVisible = useWiredTradingStore(x => x.tradeRequirementsVisible);
    const highlightCount = useWiredTradingStore(x => x.tradeHighlightCount);
    const items = useWiredTradingStore(x => x.tradeItems);
    const canAccept = useWiredTradingStore(x => x.tradeCanAccept);
    const extra = useWiredTradingStore(x => x.tradeExtra);
    const timeoutSeconds = useWiredTradingStore(x => x.tradeTimeoutSeconds);
    const startTime = useWiredTradingStore(x => x.tradeStartTime);
    const { setTradeRequirementsVisible } = useWiredTradeActions();
    const templates = useTemplateLibrary(INVENTORY_LIBRARY);
    const popup = useInventoryTradingItemPopup<WiredTradeSlotContent>();
    const [ countdown, setCountdown ] = useState(0);
    const [ windowNode, setWindowNode ] = useState<PixiContainer | null>(null);
    const [ bubbleNode, setBubbleNode ] = useState<PixiContainer | null>(null);
    const [ anchor, setAnchor ] = useState<WiredTradingBubbleAnchor | undefined>(undefined);
    const bubbleSize = useLayoutSize(bubbleNode);

    // `onWiredTradeItemsUpdate`'s `populateItemGroups`, and the box's credits as one group before its furni.
    const [ ownSlots, wiredSlots ] = useMemo(() => {
        // `isFurniExternalImage`: such an item never stacks with another.
        const isExternalImage = (typeId: number) => wallItems[typeId]?.isExternalImage === true;
        const toSlots = (list: Parameters<typeof groupTradingItems>[0]) => groupTradingItems(list, isExternalImage).map((group): WiredTradeSlotContent => ({ kind: 'furni', group }));
        const wired = toSlots(items?.secondUserItemArray ?? []);

        if (items && (items.secondUserNumCredits > 0)) wired.unshift({ kind: 'credits', credits: items.secondUserNumCredits });

        return [ toSlots(items?.firstUserItemArray ?? []), wired ];
    }, [ items, wallItems ]);

    // `recenter` for a bubble the server shows before any click: the "i"'s place in the laid-out window.
    const template = templates?.[TEMPLATE];
    const tradeContainer = template && findTemplateChild(template.elements, 'trade_container');
    const requirementsButton = tradeContainer && findTemplateChild(tradeContainer.children, 'requirements_button');

    const placeAtRequirementsButton = () => {
        if (!windowNode || !tradeContainer || !requirementsButton) return;

        const bounds = windowNode.getBounds();

        setAnchor({ x: bounds.x + tradeContainer.x + requirementsButton.x, y: bounds.y + tradeContainer.y + requirementsButton.y, width: requirementsButton.width, height: requirementsButton.height });
    };

    // The window's wrapper is outside the layout and sends no layout events: measure it a frame after the
    // bubble is asked for without a click, once the window is placed and its template in.
    useEffect(() => {
        if (!requirementsVisible || anchor || !windowNode || !requirementsButton) return;

        const frame = requestAnimationFrame(placeAtRequirementsButton);

        return () => cancelAnimationFrame(frame);
    });

    // `timerEventHandler`: the countdown ticks down, and at 0 the trade may be confirmed.
    useEffect(() => {
        if (tradeState !== WIRED_TRADE_STATE_COUNTDOWN) return;

        const interval = setInterval(() => setCountdown(value => value - 1), 1000);

        return () => clearInterval(interval);
    }, [ tradeState ]);

    useEffect(() => {
        if ((tradeState === WIRED_TRADE_STATE_COUNTDOWN) && (countdown <= 0)) wiredTradeCountdownReady();
    }, [ tradeState, countdown ]);

    const thumbTemplate = templates?.[THUMB_TEMPLATE];
    const creditsTemplate = templates?.[CREDITS_THUMB_TEMPLATE];

    if (!thumbTemplate || !creditsTemplate) return null;

    // `isPayment` / `tradeTypeLocalization`.
    const isPayment = isWiredTradePaymentOnly(requirement);
    const tradeTypeName = t(isPayment ? 'inventory.wired_trading.payment' : 'inventory.wired_trading.trade');
    const typeLower = tradeTypeName.toLowerCase();

    /** `updateUI`'s `disableButton`, then `updateStateUI`'s caption and enabling. */
    let infoText = '';
    let acceptCaption = t('inventory.trading.accept');
    let acceptDisabled = !canAccept;

    if (tradeState === WIRED_TRADE_STATE_ADDING_ITEMS) {
        infoText = t('inventory.wired_trading.note.add_items', '', { type: typeLower });
    } else if (tradeState === WIRED_TRADE_STATE_COUNTDOWN) {
        infoText = t('inventory.wired_trading.note.countdown');
        acceptCaption = t('inventory.trading.countdown', '', { counter: String(Math.max(0, countdown)) });
        acceptDisabled = true;
    } else if ((tradeState === WIRED_TRADE_STATE_CONFIRMING) || (tradeState === WIRED_TRADE_STATE_CONFIRMED)) {
        infoText = t('inventory.wired_trading.note.verify', '', { type: typeLower });
        acceptCaption = t('inventory.trading.confirm');
        acceptDisabled = (tradeState === WIRED_TRADE_STATE_CONFIRMED);
    }

    const locked = !((tradeState === WIRED_TRADE_STATE_ADDING_ITEMS) || (tradeState === WIRED_TRADE_STATE_READY));

    // `secondsLeft`.
    const elapsed = Math.trunc((now - startTime) / 1000);
    const secondsLeft = ((timeoutSeconds <= 0) || (startTime <= 0)) ? -1 : Math.max(0, timeoutSeconds - elapsed);
    const minutes = Math.trunc(secondsLeft / 60);
    const seconds = secondsLeft - (minutes * 60);
    const showSecondsLeft = (secondsLeft >= 0) && (secondsLeft < SECONDS_LEFT_LIMIT);

    /** `thumbEventProc`'s popup name: `${purse_coins}` for the credits, else the furni's name (a poster's by its id). */
    const getSlotName = (content: WiredTradeSlotContent): string => {
        if (content.kind === 'credits') return t('purse_coins');

        const { group } = content;

        if (group.category === INVENTORY_FURNI_CATEGORY_POSTER) return t(`poster_${peekInventoryFurni(group)?.stuffData.getLegacyString() ?? ''}_name`);

        return (isInventoryFurniGroupWallItem(group) ? wallItems : floorItems)[group.typeId]?.localizedName ?? '';
    };

    /** `thumbEventProc`'s `updateContent`: the credits' icon, or the furni's picture and limited edition. */
    const getSlotPopupContent = (content: WiredTradeSlotContent): InventoryTradingItemPopupContent => {
        if (content.kind === 'credits') return { kind: 'furni', imageUrl: CREDITS_ICON, uniqueSerialNumber: 0, uniqueSeriesSize: 0 };

        const stuffData = peekInventoryFurni(content.group)?.stuffData ?? content.group.stuffData;

        return { kind: 'furni', imageUrl: getInventoryFurniIconUrl(content.group), uniqueSerialNumber: stuffData.uniqueNumber, uniqueSeriesSize: stuffData.uniqueSeries };
    };

    /** `updateItemsGrid`: the grid's nine cells, each filled one holding its thumb; `thumbEventProc` on each. */
    const gridItems = (slots: WiredTradeSlotContent[], own: boolean): TemplateItem[] => Array.from({ length: INVENTORY_TRADING_MAX_ITEMS }, (unused, index): TemplateItem => {
        const content = slots[index];

        return {
            key: `cell-${index}`,
            from: own ? '#OWN_USER_ITEM' : '#OTHER_USER_ITEM',
            bindings: {
                '': {
                    added: content ? [ slotThumb(content, thumbTemplate, creditsTemplate) ] : undefined,
                    // `WME_CLICK` on the own side: `requestRemoveItemFromTrading` by the group's `peek()`.
                    onPointerTap: (own && (content?.kind === 'furni'))
                        ? () => {
                                const item = peekInventoryFurni(content.group);

                                if (item) removeWiredTradeItem(send, item.id);
                            }
                        : undefined,
                    onPointerOver: content ? (event: FederatedPointerEvent) => popup.show(content, event.currentTarget) : undefined,
                    onPointerOut: popup.hideDelayed,
                },
            },
        };
    });

    /** `onAcceptClick`. */
    const onAccept = () => {
        if (tradeState === WIRED_TRADE_STATE_ADDING_ITEMS) {
            if (acceptWiredTrade(send)) setCountdown(COUNTDOWN_SECONDS);
        } else if (tradeState === WIRED_TRADE_STATE_CONFIRMING) {
            confirmWiredTrade(send);
        }
    };

    const bindings: TemplateBindings = {
        info_text: { caption: infoText },
        lock_0: { asset: locked ? LOCKED_ICON : UNLOCKED_ICON },
        trade_type_splitter: { asset: isPayment ? ARROW_ICON : SPLIT_ICON },
        offers_1: { visible: !isPayment },
        offers_1_payment_placeholder: { visible: isPayment },
        ...(isPayment && requirement && { payment_layout_image: { asset: LayoutImage(`habbo-window-manager-com/wired_chests_images_${requirement.layoutType}_payments.png`) } }),
        item_grid_0: { items: gridItems(ownSlots, true) },
        item_grid_1: { items: gridItems(wiredSlots, false) },
        content_text_1_a: { caption: t('inventory.trading.info.itemcount', '', { value: String(items?.firstUserNumItems ?? 0) }) },
        content_text_1_b: { caption: t('inventory.trading.info.creditvalue', '', { value: String(items?.firstUserNumCredits ?? 0) }) },
        content_text_2_a: { caption: t('inventory.trading.info.itemcount', '', { value: String(items?.secondUserNumItems ?? 0) }) },
        content_text_2_b: { caption: t('inventory.trading.info.creditvalue', '', { value: String(items?.secondUserNumCredits ?? 0) }) },
        requirements_button: {
            onPointerTap: (event) => {
                setAnchor(getWiredTradingBubbleAnchor(event));
                setTradeRequirementsVisible(!requirementsVisible);
            },
        },
        // Drawn on its own over the window layer, below.
        trade_requirements_bubble: { visible: false },
        button_accept: { caption: acceptCaption, disabled: acceptDisabled, onPointerTap: onAccept },
        seconds_left_text: {
            visible: showSecondsLeft,
            caption: showSecondsLeft ? t('inventory.wired_trading.seconds_left', '', { seconds: (seconds < 10) ? `0${seconds}` : String(seconds), minutes: String(minutes) }) : '',
        },
        button_cancel: { onPointerTap: () => closeWiredTrade(send, true) },
    };

    return (
        <>
            <Box ref={setWindowNode}>
                <TemplateWindow
                    id={TEMPLATE}
                    bindings={bindings}
                />
            </Box>
            {/* `recenter`: the bubble 4px right of the "i", centred on it. */}
            {requirementsVisible && requirement && anchor && (
                <FloatingPopup
                    x={Math.round(anchor.x + anchor.width + BUBBLE_GAP)}
                    y={Math.round(anchor.y + (anchor.height / 2) - (bubbleSize.height / 2))}
                    onOutsideClick={() => undefined}
                >
                    <Box ref={setBubbleNode}>
                        <WiredTradeRequirementsView
                            requirement={requirement}
                            tradeTypeName={tradeTypeName}
                            canAccept={canAccept}
                            extra={extra}
                            highlightCount={highlightCount}
                        />
                    </Box>
                </FloatingPopup>
            )}
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
