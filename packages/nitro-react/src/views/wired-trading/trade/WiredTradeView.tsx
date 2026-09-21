/**
 * A wired box trading with the user - Flash `inventory/wired_trading/WiredTradingView` on
 * `inventory_trading_wired_xml` (478x274): what the user offers on the left, what the box gives
 * on the right (or, for a payment, the payment picture of the requirement's layout type), the
 * lock between them, the info line above and accept / cancel below.
 *
 * Flash drew this as the inventory's "wired_trading" sub page; here it is a window of its own (the
 * inventory frame's width). Items are offered from the inventory's furni page
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
const TEXT_BLEND = 0.6;
const BORDER_COLOR = '#27556a';

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

/** A 40x40 `OWN_USER_ITEM` / `OTHER_USER_ITEM` border with the group's icon and count. */
const OfferCell = ({ group, onPress }: OfferCellProps) => {
    const sample = group?.items[0];
    const count = group ? (group.credits ?? group.items.length) : 0;
    // The item's type as a `ChestItemType`: a poster carries its id in the legacy stuff data.
    const iconUrl = useWiredChestItemIconUrl(sample ? { isWallItem: sample.isWallItem, typeId: sample.itemTypeId, legacyPosterId: sample.isWallItem ? sample.stuffData.getLegacyString() : '' } : undefined);

    return (
        <Region
            cursor={(group && onPress) ? 'pointer' : undefined}
            onPointerTap={group ? onPress : undefined}
            layout={{ width: 40, height: 40 }}
        >
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
            >
                {group && (group.credits !== undefined) && <ThemeImage src={LayoutImage('wired/inventory_furni_icon_credits.png')} />}
                {sample && (iconUrl !== '') && <ThemeImage src={iconUrl} />}
                {(count > 1) && (
                    <ThemeText
                        text={String(count)}
                        textStyle="regular"
                        layout={{ position: 'absolute', right: 3, top: 2 }}
                    />
                )}
            </Border>
        </Region>
    );
};

interface OfferSideProps {
    title: string;
    groups: OfferGroup[];
    itemCount: number;
    credits: number;
    left: number;
    onPressGroup?: (group: OfferGroup) => void;
}

/** `offers_0` / `offers_1`: the title, a 3x3 grid and the two count lines. */
const OfferSide = ({ title, groups, itemCount, credits, left, onPressGroup }: OfferSideProps) => {
    const t = useTranslation();

    return (
        <Box layout={{ position: 'absolute', left, top: 29, width: 200, height: 200 }}>
            <ThemeText
                text={title}
                textStyle="u_regular"
                textOptions={{ align: 'center' }}
                layout={{ position: 'absolute', left: 0, top: 2, width: 200 }}
            />
            <Border
                variant="102"
                tintColor={BORDER_COLOR}
                layout={{ position: 'absolute', left: 32, top: 22, width: 136, height: 136, flexDirection: 'row', flexWrap: 'wrap', gap: 4, paddingLeft: 4, paddingTop: 4 }}
            >
                {Array.from({ length: GRID_CELLS }, (_, index) => (
                    <OfferCell
                        key={index}
                        group={groups[index]}
                        onPress={(groups[index] && onPressGroup) ? () => onPressGroup(groups[index]) : undefined}
                    />
                ))}
            </Border>
            <ThemeText
                text={t('inventory.trading.info.itemcount', '', { value: String(itemCount) })}
                textStyle="u_regular"
                alpha={TEXT_BLEND}
                textOptions={{ align: 'center' }}
                layout={{ position: 'absolute', left: 0, top: 162, width: 200 }}
            />
            <ThemeText
                text={t('inventory.trading.info.creditvalue', '', { value: String(credits) })}
                textStyle="u_regular"
                alpha={TEXT_BLEND}
                textOptions={{ align: 'center' }}
                layout={{ position: 'absolute', left: 0, top: 180, width: 200 }}
            />
        </Box>
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
                variant="0"
                id="wired-trade"
                caption={tradeTypeName}
                resizeDirection="none"
                defaultPosition={{ x: 20, y: 380 }}
                onClose={() => closeWiredTrade(send, true)}
                contentLayout={{ paddingLeft: 6, paddingRight: 6 }}
                layout={{ position: 'absolute', width: WIDTH + 12, height: HEIGHT + 36 }}
            >
                <Box layout={{ position: 'relative', width: WIDTH, height: HEIGHT }}>
                    <Border
                        variant="102"
                        tintColor={BORDER_COLOR}
                        layout={{ position: 'absolute', left: 0, top: 0, width: WIDTH, height: 233 }}
                    >
                        <ThemeText
                            text={infoText}
                            textStyle="u_regular"
                            alpha={TEXT_BLEND}
                            textOptions={{ align: 'center' }}
                            layout={{ position: 'absolute', left: 38, top: 7, width: 401 }}
                        />
                        <OfferSide
                            title={t('inventory.wired_trading.offering')}
                            groups={ownGroups}
                            itemCount={items?.firstUserNumItems ?? 0}
                            credits={items?.firstUserNumCredits ?? 0}
                            left={17}
                            onPressGroup={group => removeWiredTradeItem(send, group.items[0].itemId)}
                        />
                        <Box layout={{ position: 'absolute', left: 212, top: 95, width: 53, height: 42, alignItems: 'center', justifyContent: 'center' }}>
                            <ThemeImage src={LayoutImage(isPayment ? 'inventory/inventory_trading_trading_arrow_icon.png' : 'inventory/inventory_trading_trading_split_icon.png')} />
                        </Box>
                        <Box layout={{ position: 'absolute', left: 223, top: 192, width: 32, height: 34, alignItems: 'center', justifyContent: 'center' }}>
                            <ThemeImage src={LayoutImage(locked ? 'inventory/inventory_trading_trading_locked_icon.png' : 'inventory/inventory_trading_trading_unlocked_icon.png')} />
                        </Box>
                        {isPayment
                            ? (
                                    <Box layout={{ position: 'absolute', left: 263 + 20, top: 29 + 9, width: 170, height: 173, alignItems: 'center', justifyContent: 'center' }}>
                                        <ThemeImage src={LayoutImage(`wired/wired_chests_images_${requirement?.layoutType ?? 'generic'}_payments.png`)} />
                                    </Box>
                                )
                            : (
                                    <OfferSide
                                        title={t('inventory.wired_trading.receiving')}
                                        groups={wiredGroups}
                                        itemCount={items?.secondUserNumItems ?? 0}
                                        credits={items?.secondUserNumCredits ?? 0}
                                        left={263}
                                    />
                                )}
                        <Region
                            ref={setInfoNode}
                            cursor="pointer"
                            onPointerTap={(event) => {
                                setAnchor(getWiredTradingBubbleAnchor(event));
                                setTradeRequirementsVisible(!requirementsVisible);
                            }}
                            layout={{ position: 'absolute', left: 453, top: 6, width: 18, height: 18 }}
                        >
                            <ThemeImage src={LayoutImage('shared/icons_info_grey.png')} />
                        </Region>
                    </Border>
                    <Box layout={{ position: 'absolute', left: 5, top: 240, height: 28, flexDirection: 'row', gap: 6 }}>
                        <Button
                            variant="3"
                            disabled={acceptDisabled}
                            onPointerTap={onAccept}
                            layout={{ width: 157, height: 28 }}
                        >
                            {acceptCaption}
                        </Button>
                        {(secondsLeft >= 0) && (secondsLeft < SECONDS_LEFT_LIMIT) && (
                            <ThemeText
                                text={t('inventory.wired_trading.seconds_left', '', { seconds: (seconds < 10) ? `0${seconds}` : String(seconds), minutes: String(minutes) })}
                                textStyle="u_regular"
                                textOptions={{ fill: '#bf272a' }}
                                layout={{ marginTop: 5 }}
                            />
                        )}
                    </Box>
                    <Button
                        variant="3"
                        onPointerTap={() => closeWiredTrade(send, true)}
                        layout={{ position: 'absolute', left: 415, top: 240, width: 56, height: 28 }}
                    >
                        {t('generic.cancel')}
                    </Button>
                </Box>
            </Frame>
            {/* `WiredTradeRequirementsView`: the bubble window 4px right of the "i"; its pointer hangs 2px further left. */}
            {requirementsVisible && requirement && anchor && (
                <Box
                    ref={setBubbleNode}
                    zIndex={100000}
                    layout={{ position: 'absolute', left: Math.round(anchor.x + anchor.width + 4) - 2, top: Math.round(anchor.y + (anchor.height / 2) - (bubbleSize.height / 2)) }}
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
