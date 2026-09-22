/**
 * A wired box trading with the user - Flash `inventory/wired_trading/WiredTradingView` on
 * `inventory_trading_wired_xml` (478x274): what the user offers on the left, what the box gives
 * on the right (or, for a payment, the payment picture of the requirement's layout type), the
 * lock between them, the info line above and accept / cancel below.
 *
 * Flash drew this as the inventory's "wired_trading" sub page, the `subContentArea` under the tabs
 * (`InventoryMainView.setSubViewToCategory`); here it is a window of its own in the inventory's
 * frame - style 3, `#418db0`, the 4px shadow and `inventory_xml`'s margins around the 478x274 page. Items are offered from the inventory's furni page
 * (`InventoryFurniView`) and the offer changes through the server's `WiredTradeItemsUpdate`.
 * Removing an offered item (a click on it while adding items, `requestRemoveItemFromTrading`)
 * works.
 *
 * - `updateStateUI`: while adding items the lock is open and the info line asks for items;
 *   accept starts a 3 second countdown (`inventory.trading.countdown`, the button disabled),
 *   after which it confirms; once confirmed it stays disabled. Accept needs `canAccept`.
 * - `updateSecondsLeftUI`: under two minutes left of the trade's timeout, "m:ss left" in red.
 * - `updateOfferInfoUI`: item and credit counts under both sides.
 * - The "i" toggles the requirements bubble (`WiredTradeRequirementsView`).
 * - Closing the window cancels the trade (`closingInventoryView` -> `close(true, true)`).
 */
import type { ITradingItemListData } from '@nitrodevco/nitro-packets';
import { Container as PixiContainer } from 'pixi.js';
import { useEffect, useState } from 'react';

import { acceptWiredTrade, closeWiredTrade, confirmWiredTrade, removeWiredTradeItem, wiredTradeCountdownReady } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useWiredTradeActions, useWiredTradingStore, WIRED_TRADE_STATE_ADDING_ITEMS, WIRED_TRADE_STATE_CONFIRMED, WIRED_TRADE_STATE_CONFIRMING, WIRED_TRADE_STATE_COUNTDOWN, WIRED_TRADE_STATE_READY } from '#base/context/wired-trading';
import { useSecondsClock, useWiredChestItemIconUrl } from '#base/hooks';
import { Border, Box, Button, Frame, LayoutImage, Region, ThemeImage, ThemeText, useLayoutEvent, useLayoutSize } from '#base/theme';
import { isWiredTradePaymentOnly } from '#base/utils';
import { getWiredTradingBubbleAnchor, WiredTradingBubbleAnchor } from '#base/views/wired-trading/common/wiredTradingBubbleAnchor';

import { WiredTradeRequirementsView } from './WiredTradeRequirementsView';

const WIDTH = 478;
const HEIGHT = 274;
/** `startConfirmCountdown`: three ticks of a second. */
const COUNTDOWN_SECONDS = 3;
/** The seconds-left line shows under this. */
const SECONDS_LEFT_LIMIT = 120;
const GRID_CELLS = 9;
/** `inventory_xml`'s frame: style 3 in the inventory's blue, content at 6,35 and 6,6 from the far edges. */
const INVENTORY_FRAME_COLOR = '#418db0';
const INVENTORY_MARGINS = [ 6, 35, 6, 6 ] as const;
const TEXT_BLEND = 0.6;
const BORDER_COLOR = '#27556a';
/** `item_grid_*`'s cells. */
const CELL_COLOR = '#cccccc';
/** `GroupItem.updateBackgroundVisual`: 13421772, a seen group. */
const THUMB_COLOR = '#cccccc';
/** `inventory_thumb_xml`: the `number_container` fill and the `number` text colour. */
const COUNT_COLOR = '#2f6982';
/** `GroupItem.getMinimumItemsToShowCounter`. */
const MIN_ITEMS_TO_SHOW_COUNTER = 2;

/** One cell of an offer grid: `TradingView.updateItemsGrid`'s group item. */
interface OfferGroup {
    items: ITradingItemListData[];
    /** The wired side's credits, drawn as one credit furni group. */
    credits?: number;
}

/** Items of one groupable type share a cell, anything else has its own. */
const groupItems = (items: ITradingItemListData[]): OfferGroup[] => {
    const groups: OfferGroup[] = [];
    const byType = new Map<string, OfferGroup>();

    for (const item of items) {
        const key = `${item.isWallItem ? 'I' : 'S'}${item.itemTypeId}`;
        const existing = item.isGroupable ? byType.get(key) : undefined;

        if (existing) {
            existing.items.push(item);

            continue;
        }

        const group = { items: [ item ] };

        groups.push(group);

        if (item.isGroupable) byType.set(key, group);
    }

    return groups;
};

interface OfferCellProps {
    group: OfferGroup | undefined;
    onPress?: () => void;
}

/**
 * One cell of `item_grid_*`: the layout's 40x40 style 102 border, and over it, while the cell
 * holds a group, that group's thumb window as `TradingView.updateItemsGrid` puts it there -
 * `fixItemWindow` sizes the thumb to 40x40 and moves its one child, the style 5 `BG_COLOR`
 * border, to 0,0 40x40. A furni group is `inventory_thumb_xml` (the icon centred unstretched in
 * the 40x40 `bitmap`, the blue `number_container` at 33,2 growing left from two items up,
 * `GroupItem.getMinimumItemsToShowCounter`); the credits are `CreditTradingItem`'s
 * `inventory_thumb_credits_xml` (the icon hanging from 1,18 by its top centre, the value in
 * `u_headline_small` 12px centred over the top 38px, from one up). The border's colour is
 * `updateBackgroundVisual`'s seen grey: nothing offered in a trade is unseen. The item popup
 * `thumbEventProc` opens on hover is not ported.
 */
const OfferCell = ({ group, onPress }: OfferCellProps) => {
    const sample = group?.items[0];
    const isCredits = (group?.credits !== undefined);
    const count = group ? (group.credits ?? group.items.length) : 0;
    // The item's type as a `ChestItemType`: a poster carries its id in the legacy stuff data.
    const iconUrl = useWiredChestItemIconUrl(sample ? { isWallItem: sample.isWallItem, typeId: sample.itemTypeId, legacyPosterId: sample.isWallItem ? sample.stuffData.getLegacyString() : '' } : undefined);

    return (
        <Region
            cursor={(group && onPress) ? 'pointer' : undefined}
            onPointerTap={group ? onPress : undefined}
            layout={{ width: 40, height: 40, flexShrink: 0 }}
        >
            <Border
                variant="102"
                tintColor={CELL_COLOR}
                layout={{ position: 'absolute', left: 0, top: 0, width: 40, height: 40 }}
            />
            {group && (
                <Border
                    variant="5"
                    tintColor={THUMB_COLOR}
                    layout={{ position: 'absolute', left: 0, top: 0, width: 40, height: 40, ...(isCredits && { overflow: 'hidden' }) }}
                >
                    {isCredits && (
                        <>
                            <ThemeImage
                                src={LayoutImage('wired/inventory_furni_icon_credits.png')}
                                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'top center' }}
                                layout={{ position: 'absolute', left: 1, top: 18, width: 38, height: 35 }}
                            />
                            <Region layout={{ position: 'absolute', left: 0, top: 1, width: 38, height: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                                <ThemeText
                                    text={String(count)}
                                    textStyle="u_headline_small"
                                    textOptions={{ fontSize: 12, align: 'center' }}
                                    verticalAlign="top"
                                />
                            </Region>
                        </>
                    )}
                    {!isCredits && (iconUrl !== '') && (
                        <ThemeImage
                            src={iconUrl}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: 0, top: 0, width: 40, height: 40 }}
                        />
                    )}
                    {!isCredits && (count >= MIN_ITEMS_TO_SHOW_COUNTER) && (
                        <Region
                            backgroundColor={COUNT_COLOR}
                            layout={{ position: 'absolute', right: 1, top: 2, minWidth: 6, minHeight: 15, paddingLeft: 1, paddingTop: 1, flexDirection: 'row', alignItems: 'flex-start' }}
                        >
                            <Region backgroundColor="#ffffff">
                                <ThemeText
                                    text={String(count)}
                                    textStyle="regular"
                                    textOptions={{ fill: COUNT_COLOR }}
                                    flashFormat={{ antiAliasType: 'advanced' }}
                                    verticalAlign="top"
                                />
                            </Region>
                        </Region>
                    )}
                </Border>
            )}
        </Region>
    );
};

interface OfferSideProps {
    title: string;
    groups: OfferGroup[];
    itemCount: number;
    credits: number;
    left: number;
    /** `text_list_*`: 52 / 95 wide for `offers_0`, 54 / 90 for `offers_1`. */
    titleLeft: number;
    titleWidth: number;
    /** `item_grid_border_*`: 136 wide for `offers_0`, 180 for `offers_1`. */
    gridBorderWidth: number;
    /** `offers_1` is the one of the two that clips what crosses it. */
    clip?: boolean;
    onPressGroup?: (group: OfferGroup) => void;
}

/**
 * `offers_0` / `offers_1`: the title, a 3x3 grid and the two count lines. The title's
 * `itemlist_horizontal` resizes to its auto-sized text around its own centre
 * (`resize_to_accommodate_children` + `on_accommodate_align_center`). `item_grid_border_*` is a
 * plain container - a container's renderer is null whatever its style - so the grid shows only
 * its cells.
 */
const OfferSide = ({ title, groups, itemCount, credits, left, titleLeft, titleWidth, gridBorderWidth, clip = false, onPressGroup }: OfferSideProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'absolute', left, top: 29, width: 200, height: 200, ...(clip && { overflow: 'hidden' }) }}>
            <Region layout={{ position: 'absolute', left: titleLeft, width: titleWidth, top: 2, height: 16, flexDirection: 'row', justifyContent: 'center' }}>
                <ThemeText
                    text={title}
                    textStyle="u_regular"
                    verticalAlign="top"
                    layout={{ height: 17, flexShrink: 0 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 32, top: 22, width: gridBorderWidth, height: 136 }}>
                <Region layout={{ position: 'absolute', left: 4, top: 4, width: 132, height: 132, flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                    {Array.from({ length: GRID_CELLS }, (_, index) => (
                        <OfferCell
                            key={index}
                            group={groups[index]}
                            onPress={(groups[index] && onPressGroup) ? () => onPressGroup(groups[index]) : undefined}
                        />
                    ))}
                </Region>
            </Region>
            <Region
                alpha={TEXT_BLEND}
                layout={{ position: 'absolute', left: 0, width: 200, top: 162, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={t('inventory.trading.info.itemcount', '', { value: String(itemCount) })}
                    textStyle="u_regular"
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <Region
                alpha={TEXT_BLEND}
                layout={{ position: 'absolute', left: 0, width: 200, top: 180, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={t('inventory.trading.info.creditvalue', '', { value: String(credits) })}
                    textStyle="u_regular"
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};

export const WiredTradeView = () => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const now = useSecondsClock();
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
    const [ countdown, setCountdown ] = useState(0);
    const [ infoNode, setInfoNode ] = useState<PixiContainer | null>(null);
    const [ bubbleNode, setBubbleNode ] = useState<PixiContainer | null>(null);
    const [ anchor, setAnchor ] = useState<WiredTradingBubbleAnchor | undefined>(undefined);
    const bubbleSize = useLayoutSize(bubbleNode);

    // `recenter`: the bubble sits beside the "i"; a bubble shown by the server before any click takes the button's place once it is laid out.
    useLayoutEvent(infoNode, () => {
        if (!infoNode) return;

        const bounds = infoNode.getBounds();

        setAnchor({ x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height });
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

    const isPayment = isWiredTradePaymentOnly(requirement);
    const tradeTypeName = t(isPayment ? 'inventory.wired_trading.payment' : 'inventory.wired_trading.trade');
    const typeLower = tradeTypeName.toLowerCase();

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

    const ownGroups = groupItems(items?.firstUserItemArray ?? []);
    const wiredGroups = groupItems(items?.secondUserItemArray ?? []);

    if (items && (items.secondUserNumCredits > 0)) wiredGroups.unshift({ items: [], credits: items.secondUserNumCredits });

    const onAccept = () => {
        if (tradeState === WIRED_TRADE_STATE_ADDING_ITEMS) {
            if (acceptWiredTrade(send)) setCountdown(COUNTDOWN_SECONDS);
        } else if (tradeState === WIRED_TRADE_STATE_CONFIRMING) {
            confirmWiredTrade(send);
        }
    };

    return (
        <>
            <Frame
                variant="3"
                id="wired-trade"
                caption={tradeTypeName}
                tintColor={INVENTORY_FRAME_COLOR}
                dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
                resizeDirection="none"
                defaultPosition={{ x: 20, y: 380 }}
                onClose={() => closeWiredTrade(send, true)}
                margins={INVENTORY_MARGINS}
                layout={{ position: 'absolute', width: WIDTH + INVENTORY_MARGINS[0] + INVENTORY_MARGINS[2], height: HEIGHT + INVENTORY_MARGINS[1] + INVENTORY_MARGINS[3] }}
            >
                <Box layout={{ position: 'absolute', left: 0, top: 0, width: WIDTH, height: HEIGHT }}>
                    <Border
                        variant="102"
                        tintColor={BORDER_COLOR}
                        layout={{ position: 'absolute', left: 0, top: 0, width: WIDTH, height: 233 }}
                    >
                        <Region
                            alpha={TEXT_BLEND}
                            layout={{ position: 'absolute', left: 38, width: 401, top: 7, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={infoText}
                                textStyle="u_regular"
                                textOptions={{ align: 'center' }}
                            />
                        </Region>
                        <OfferSide
                            title={t('inventory.wired_trading.offering')}
                            groups={ownGroups}
                            itemCount={items?.firstUserNumItems ?? 0}
                            credits={items?.firstUserNumCredits ?? 0}
                            left={17}
                            titleLeft={52}
                            titleWidth={95}
                            gridBorderWidth={136}
                            onPressGroup={group => removeWiredTradeItem(send, group.items[0].itemId)}
                        />
                        <ThemeImage
                            src={LayoutImage(locked ? 'inventory/inventory_trading_trading_locked_icon.png' : 'inventory/inventory_trading_trading_unlocked_icon.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: 223, width: 32, top: 192, height: 34 }}
                        />
                        {/* `updateUI`: a payment hides `offers_1` and shows `offers_1_payment_placeholder`. */}
                        {!isPayment && (
                            <OfferSide
                                title={t('inventory.wired_trading.receiving')}
                                groups={wiredGroups}
                                itemCount={items?.secondUserNumItems ?? 0}
                                credits={items?.secondUserNumCredits ?? 0}
                                left={263}
                                titleLeft={54}
                                titleWidth={90}
                                gridBorderWidth={180}
                                clip
                            />
                        )}
                        {isPayment && (
                            <Region layout={{ position: 'absolute', left: 263, width: 200, top: 29, height: 200 }}>
                                <ThemeImage
                                    src={LayoutImage(`wired/wired_chests_images_${requirement?.layoutType ?? 'generic'}_payments.png`)}
                                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', fitSizeToContents: true }}
                                    layout={{ position: 'absolute', left: 20, width: 170, top: 9, height: 173 }}
                                />
                            </Region>
                        )}
                        <ThemeImage
                            src={LayoutImage(isPayment ? 'inventory/inventory_trading_trading_arrow_icon.png' : 'inventory/inventory_trading_trading_split_icon.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: 212, width: 53, top: 95, height: 42 }}
                        />
                        <Region
                            ref={setInfoNode}
                            cursor="pointer"
                            onPointerTap={(event) => {
                                setAnchor(getWiredTradingBubbleAnchor(event));
                                setTradeRequirementsVisible(!requirementsVisible);
                            }}
                            layout={{ position: 'absolute', left: 453, width: 18, top: 6, height: 18 }}
                        >
                            <ThemeImage
                                src={LayoutImage('shared/icons_info_grey.png')}
                                bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                            />
                        </Region>
                    </Border>
                    <Region layout={{ position: 'absolute', left: 0, width: WIDTH, top: 240, height: 32 }}>
                        <Region layout={{ position: 'absolute', left: 5, top: 0, height: 28, flexDirection: 'row', gap: 6 }}>
                            <Button
                                variant="3"
                                disabled={acceptDisabled}
                                onPointerTap={onAccept}
                                layout={{ width: 157, height: 28, flexShrink: 0 }}
                            >
                                {acceptCaption}
                            </Button>
                            {(secondsLeft >= 0) && (secondsLeft < SECONDS_LEFT_LIMIT) && (
                                <ThemeText
                                    text={t('inventory.wired_trading.seconds_left', '', { seconds: (seconds < 10) ? `0${seconds}` : String(seconds), minutes: String(minutes) })}
                                    textStyle="u_regular"
                                    textOptions={{ fill: '#bf272a' }}
                                    verticalAlign="top"
                                    layout={{ width: 136, height: 17, marginTop: 5, flexShrink: 0 }}
                                />
                            )}
                        </Region>
                        <Button
                            variant="3"
                            onPointerTap={() => closeWiredTrade(send, true)}
                            layout={{ position: 'absolute', left: 415, width: 56, top: 0, height: 28 }}
                        >
                            {t('generic.cancel')}
                        </Button>
                    </Region>
                </Box>
            </Frame>
            {/* `WiredTradeRequirementsView.recenter`: the bubble window 4px right of the "i", centred on it; its pointer hangs 2px out of the window's left edge. */}
            {requirementsVisible && requirement && anchor && (
                <Box
                    ref={setBubbleNode}
                    zIndex={100000}
                    layout={{ position: 'absolute', left: Math.round(anchor.x + anchor.width + 4), top: Math.round(anchor.y + (anchor.height / 2) - (bubbleSize.height / 2)) }}
                >
                    <WiredTradeRequirementsView
                        requirement={requirement}
                        tradeTypeName={tradeTypeName}
                        canAccept={canAccept}
                        extra={extra}
                        highlightCount={highlightCount}
                    />
                </Box>
            )}
        </>
    );
};
