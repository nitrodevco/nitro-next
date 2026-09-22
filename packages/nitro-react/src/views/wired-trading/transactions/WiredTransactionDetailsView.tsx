/**
 * One transaction in detail - Flash `transactions/details/WiredTransactionDetailsView` on
 * `transaction_details_xml` (a style 3 frame, 400x394, `#418db0`, content margins 0,33,0,0):
 * `key_value_pairs` (380 wide at 10,13, spacing 2) lists type, time, room, chests and user as
 * bold key / value pairs, a `separator` widget, the withdrawn and deposited items side by side
 * (`TransactionOverviewView`), a 5px spacing, a second separator and the definition's extra info
 * with its "i" bubble.
 *
 * `TransactionOverviewView.itemsInitialize`: a coins cell first when coins moved, then one cell
 * per furni type with its amount, then - when the server said the data is incomplete and the
 * listed furni fall short of the transaction's count - a "+N" cell for the rest. An empty side
 * says so (`empty_text`). Each cell's tooltip names what it is (`TransactionItemView.initialize`).
 *
 * `extra_info_bubble`'s text list reflects its height to the bubble (the list plus 32, 179 as
 * laid out); it is measured here and the bubble follows it.
 */
import type { IChestItemType } from '@nitrodevco/nitro-api';
import type { IWiredTransactionDetails, IWiredTransactionFurniAmount } from '@nitrodevco/nitro-packets';
import { Container as PixiContainer } from 'pixi.js';
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { useWiredChestItemName } from '#base/hooks';
import { Border, Box, Frame, LayoutImage, Region, ScrollArea, ThemeImage, ThemeText, useLayoutSize } from '#base/theme';
import { WiredChestItemCell } from '#base/views/wired-trading/common/WiredChestItemCell';
import { getWiredTradingBubbleAnchor, WiredTradingBubbleAnchor } from '#base/views/wired-trading/common/wiredTradingBubbleAnchor';
import { WiredTradingInfoBubble } from '#base/views/wired-trading/common/WiredTradingInfoBubble';

/** `TransactionChestItemWrapper.specialType`: every listed item is drawn as a plain furni. */
const TRANSACTION_ITEM_SPECIAL_TYPE = 1;
const EXTRA_DESCRIPTIONS = [ 1, 2, 3 ];
const PAIRS_WIDTH = 380;
/** `extra_info_bubble`: 325x179 around a 147 high text list at 8,8 of its content area. */
const EXTRA_BUBBLE_WIDTH = 325;
const EXTRA_BUBBLE_HEIGHT = 179;
const EXTRA_BUBBLE_TEXTS_HEIGHT = 147;
const EXTRA_TEXTS_WIDTH = 293;

interface PairProps {
    name: string;
    value: string;
}

/** A `<name>_pair` item list: bold key, value, 2 apart, 20 high; both auto-sized from the left. */
const Pair = ({ name, value }: PairProps) => (
    <Region layout={{ flexDirection: 'row', gap: 2, height: 20, flexShrink: 0 }}>
        <ThemeText
            text={name}
            textStyle="u_regular"
            flashFormat={{ bold: true }}
            verticalAlign="top"
            layout={{ flexShrink: 0 }}
        />
        <ThemeText
            text={value}
            textStyle="u_regular"
            verticalAlign="top"
            layout={{ flexShrink: 0 }}
        />
    </Region>
);

/**
 * The horizontal `separator` widget (`SeparatorWidget.refresh`): `illumina_light_separator_horizontal`
 * tiled along its width at `height / 2 - 1` - 1 for its 5px.
 */
const Separator = () => (
    <Region layout={{ height: 5, width: PAIRS_WIDTH, flexShrink: 0 }}>
        <ThemeImage
            src={LayoutImage('help/illumina_light_separator_horizontal.png')}
            bitmap={{ stretchedX: false, stretchedY: false, wrapX: true }}
            layout={{ position: 'absolute', left: 0, top: 1, width: PAIRS_WIDTH, height: 2 }}
        />
    </Region>
);

/** A furni cell, its tooltip the item's name. */
const FurniCell = ({ itemType, count }: { itemType: IChestItemType; count: number }) => {
    const name = useWiredChestItemName(itemType, TRANSACTION_ITEM_SPECIAL_TYPE);

    return (
        <WiredChestItemCell
            itemType={itemType}
            count={count}
            tooltip={name}
        />
    );
};

interface ItemsOverviewProps {
    title: string;
    coins: number;
    furnis: IWiredTransactionFurniAmount[];
    furniCount: number;
    isIncompleteData: boolean;
    /** `item_grid`'s height: 131 under withdrawals, 132 under deposits. */
    gridHeight: number;
}

/**
 * `withdrawals_container` / `deposits_container` (`TransactionOverviewView`): a 165x161 column,
 * its underlined title centred over a style 4 `#e2e2e2` border with the scrolling grid at 5,5
 * and `empty_text` at y 61.
 */
const ItemsOverview = ({ title, coins, furnis, furniCount, isIncompleteData, gridHeight }: ItemsOverviewProps) => {
    const t = useTranslation();
    const listed = furnis.reduce((sum, furni) => sum + furni.amount, 0);
    const missing = (isIncompleteData && (listed < furniCount)) ? (furniCount - listed) : 0;
    const isEmpty = (coins === 0) && !furnis.length && !missing;

    return (
        <Region layout={{ width: 165, height: 161, flexShrink: 0 }}>
            <Region layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                <ThemeText
                    text={title}
                    textStyle="u_regular"
                    textOptions={{ align: 'center' }}
                    flashFormat={{ underline: true }}
                    verticalAlign="top"
                />
            </Region>
            <Border
                variant="4"
                tintColor="#e2e2e2"
                layout={{ position: 'absolute', left: 0, top: 20, width: 165, height: 141 }}
            >
                <ScrollArea
                    variant="3"
                    layout={{ position: 'absolute', left: 5, top: 5, width: 155, height: gridHeight }}
                    contentLayout={{ position: 'relative', width: '100%', flexDirection: 'row', flexWrap: 'wrap', gap: 3 }}
                >
                    {(coins !== 0) && (
                        <WiredChestItemCell
                            coins
                            count={coins}
                            tooltip={t('wiredcontracts.element.type.0')}
                        />
                    )}
                    {furnis.map((furni, index) => (
                        <FurniCell
                            key={index}
                            itemType={furni.itemType}
                            count={furni.amount}
                        />
                    ))}
                    {(missing > 0) && (
                        <WiredChestItemCell
                            incomplete
                            count={missing}
                            tooltip={t('wiredchests.log_details.incomplete_data')}
                        />
                    )}
                </ScrollArea>
                {isEmpty && (
                    <Region
                        alpha={0.5}
                        layout={{ position: 'absolute', left: 0, width: 165, top: 61, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('wiredchests.log_details.transactions.none_placeholder')}
                            textStyle="u_regular"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                )}
            </Border>
        </Region>
    );
};

export interface WiredTransactionDetailsViewProps {
    details: IWiredTransactionDetails;
    onClose: () => void;
}

export const WiredTransactionDetailsView = ({ details, onClose }: WiredTransactionDetailsViewProps) => {
    const t = useTranslation();
    const [ extraAnchor, setExtraAnchor ] = useState<WiredTransactionDetailsBubbleState>(undefined);
    const [ bubbleFor, setBubbleFor ] = useState(details);
    const [ extraTextsNode, setExtraTextsNode ] = useState<PixiContainer | null>(null);
    const extraTextsHeight = useLayoutSize(extraTextsNode).height;
    const info = details.transactionInfo;

    // `updateUI` hides the bubble for the next transaction.
    if (bubbleFor !== details) {
        setBubbleFor(details);
        setExtraAnchor(undefined);
    }

    const loc = (key: string) => t(key, key);

    return (
        <>
            <Frame
                variant="3"
                id="wired-transaction-details"
                caption={t('wiredchests.log_details.title')}
                tintColor="#418db0"
                dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
                resizeDirection="none"
                rememberPosition={false}
                centered
                onClose={onClose}
                margins={[ 0, 33, 0, 0 ]}
                layout={{ position: 'absolute', width: 400, height: 394 }}
            >
                <Region layout={{ position: 'absolute', left: 10, top: 13, width: PAIRS_WIDTH, flexDirection: 'column', gap: 2 }}>
                    <Pair
                        name={loc('wiredchests.log_details.type')}
                        value={loc(`wired_transactions.type.${info.transactionType}`)}
                    />
                    <Pair
                        name={loc('wiredchests.log_details.timestamp')}
                        value={info.readableTimestamp}
                    />
                    <Pair
                        name={loc('wiredchests.log_details.room_id')}
                        value={String(info.flatId)}
                    />
                    <Pair
                        name={loc('wiredchests.log_details.chest_ids')}
                        value={details.chestIds.join(', ')}
                    />
                    <Pair
                        name={loc('wiredchests.log_details.username')}
                        value={info.userName}
                    />
                    <Separator />
                    {/* `furni_transactions_pair`: its value text is blended to 0. */}
                    <Pair
                        name={loc('wiredchests.log_details.transactions')}
                        value=""
                    />
                    {/* `furni_details`: the two columns 15 apart in an item list at x 18. */}
                    <Region layout={{ width: PAIRS_WIDTH, height: 161, flexShrink: 0 }}>
                        <Region layout={{ position: 'absolute', left: 18, top: 0, height: 161, flexDirection: 'row', gap: 15 }}>
                            <ItemsOverview
                                title={loc('wiredchests.log_details.transactions.withdrawn')}
                                coins={info.withdrawCoinsCount}
                                furnis={details.withdrawnFurnis}
                                furniCount={info.withdrawFurniCount}
                                isIncompleteData={details.isIncompleteData}
                                gridHeight={131}
                            />
                            <ItemsOverview
                                title={loc('wiredchests.log_details.transactions.deposit')}
                                coins={info.depositCoinsCount}
                                furnis={details.depositedFurnis}
                                furniCount={info.depositFurniCount}
                                isIncompleteData={details.isIncompleteData}
                                gridHeight={132}
                            />
                        </Region>
                    </Region>
                    <Region layout={{ width: PAIRS_WIDTH, height: 5, flexShrink: 0 }} />
                    <Separator />
                    <Region layout={{ width: PAIRS_WIDTH, height: 20, flexShrink: 0 }}>
                        <Region layout={{ position: 'absolute', left: 0, top: 0 }}>
                            <Pair
                                name={loc('wiredchests.log_details.extra')}
                                value={(info.transactionDefinitionInfo === '') ? '-' : info.transactionDefinitionInfo}
                            />
                        </Region>
                        <Region
                            cursor="pointer"
                            onPointerTap={event => setExtraAnchor(getWiredTradingBubbleAnchor(event))}
                            layout={{ position: 'absolute', left: 357, top: 0, width: 20, height: 20 }}
                        >
                            <ThemeImage
                                src={LayoutImage('shared/icons_info_grey.png')}
                                bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                                layout={{ position: 'absolute', left: 1, top: 1 }}
                            />
                        </Region>
                    </Region>
                </Region>
            </Frame>
            {extraAnchor && (
                <WiredTradingInfoBubble
                    anchor={extraAnchor}
                    width={EXTRA_BUBBLE_WIDTH}
                    height={(extraTextsHeight > 0) ? (EXTRA_BUBBLE_HEIGHT - EXTRA_BUBBLE_TEXTS_HEIGHT + extraTextsHeight) : EXTRA_BUBBLE_HEIGHT}
                    onClose={() => setExtraAnchor(undefined)}
                >
                    {/* `extra_info_bubble_texts`: title, a 7px spacer, the three descriptions, 1 apart. */}
                    <Box
                        ref={setExtraTextsNode}
                        layout={{ flexDirection: 'column', width: EXTRA_TEXTS_WIDTH, gap: 1 }}
                    >
                        <ThemeText
                            text={loc('wiredchests.log_details.extra.title')}
                            textStyle="u_bold"
                            textOptions={{ fontSize: 14 }}
                            verticalAlign="top"
                            layout={{ flexShrink: 0 }}
                        />
                        <Box layout={{ width: 30, height: 7, flexShrink: 0 }} />
                        {EXTRA_DESCRIPTIONS.map(index => (
                            <ThemeText
                                key={index}
                                text={loc(`wiredchests.log_details.extra.desc.${index}`)}
                                textStyle="u_regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: EXTRA_TEXTS_WIDTH - 4 }}
                                markup
                                verticalAlign="top"
                                layout={{ width: EXTRA_TEXTS_WIDTH, flexShrink: 0 }}
                            />
                        ))}
                    </Box>
                </WiredTradingInfoBubble>
            )}
        </>
    );
};

type WiredTransactionDetailsBubbleState = WiredTradingBubbleAnchor | undefined;
