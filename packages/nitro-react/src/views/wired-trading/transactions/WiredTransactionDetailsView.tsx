/**
 * One transaction in detail - Flash `transactions/details/WiredTransactionDetailsView` on
 * `transaction_details_xml` (400x394): type, time, room, chests and user as bold key / value
 * pairs, the withdrawn and deposited items side by side (`TransactionOverviewView`), and the
 * definition's extra info with its "i" bubble.
 *
 * `TransactionOverviewView.itemsInitialize`: a coins cell first when coins moved, then one cell
 * per furni type with its amount, then - when the server said the data is incomplete and the
 * listed furni fall short of the transaction's count - a "+N" cell for the rest. An empty side
 * says so (`empty_text`). Each cell's tooltip names what it is (`TransactionItemView.initialize`).
 */
import type { IChestItemType } from '@nitrodevco/nitro-api';
import type { IWiredTransactionDetails, IWiredTransactionFurniAmount } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { useWiredChestItemName } from '#base/hooks';
import { Border, Box, Frame, LayoutImage, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { WiredChestItemCell } from '#base/views/wired-trading/common/WiredChestItemCell';
import { getWiredTradingBubbleAnchor, WiredTradingBubbleAnchor } from '#base/views/wired-trading/common/wiredTradingBubbleAnchor';
import { WiredTradingInfoBubble } from '#base/views/wired-trading/common/WiredTradingInfoBubble';

/** `TransactionChestItemWrapper.specialType`: every listed item is drawn as a plain furni. */
const TRANSACTION_ITEM_SPECIAL_TYPE = 1;
const EXTRA_DESCRIPTIONS = [ 1, 2, 3 ];

interface PairProps {
    name: string;
    value: string;
}

/** A `<name>_pair` item list: bold key, value, 2 apart, 20 high. */
const Pair = ({ name, value }: PairProps) => (
    <Box layout={{ flexDirection: 'row', gap: 2, height: 20, flexShrink: 0 }}>
        <ThemeText
            text={name}
            textStyle="text-style-u-bold"
        />
        <ThemeText
            text={value}
            textStyle="text-style-u-regular"
        />
    </Box>
);

/** The `separator` widget: an etched line in the middle of its 5px. */
const Separator = () => (
    <Box layout={{ height: 5, width: 380, flexShrink: 0, flexDirection: 'column', paddingTop: 2 }}>
        <Region
            backgroundColor="#b5b5b5"
            layout={{ height: 1 }}
        />
        <Region
            backgroundColor="#ffffff"
            layout={{ height: 1 }}
        />
    </Box>
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
}

/** `TransactionOverviewView`: a 165 wide column, its title underlined over a style 4 border with the grid. */
const ItemsOverview = ({ title, coins, furnis, furniCount, isIncompleteData }: ItemsOverviewProps) => {
    const t = useTranslation();
    const listed = furnis.reduce((sum, furni) => sum + furni.amount, 0);
    const missing = (isIncompleteData && (listed < furniCount)) ? (furniCount - listed) : 0;
    const isEmpty = (coins === 0) && !furnis.length && !missing;

    return (
        <Box layout={{ position: 'relative', width: 165, height: 161 }}>
            <ThemeText
                text={title}
                textStyle="text-style-u-regular"
                textOptions={{ align: 'center' }}
                layout={{ position: 'absolute', left: 0, top: 0, width: 165 }}
            />
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 40, right: 40, top: 15, height: 1 }}
            />
            <Border
                variant="4"
                tintColor="#e2e2e2"
                layout={{ position: 'absolute', left: 0, top: 20, width: 165, height: 141 }}
            >
                <ScrollArea
                    variant="3"
                    layout={{ position: 'absolute', left: 5, top: 5, width: 155, height: 131 }}
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
                    <ThemeText
                        text={t('wiredchests.log_details.transactions.none_placeholder')}
                        textStyle="text-style-u-regular"
                        alpha={0.5}
                        textOptions={{ align: 'center' }}
                        layout={{ position: 'absolute', left: 0, top: 41, width: 165 }}
                    />
                )}
            </Border>
        </Box>
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
                dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
                resizeDirection="none"
                rememberPosition={false}
                centered
                onClose={onClose}
                contentLayout={{ paddingLeft: 0, paddingRight: 0, marginBottom: 0 }}
                layout={{ position: 'absolute', width: 400, height: 394 }}
            >
                <Box layout={{ position: 'relative', width: 400, height: 361 }}>
                    <Box layout={{ position: 'absolute', left: 10, top: 13, width: 380, flexDirection: 'column', gap: 2 }}>
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
                        <Pair
                            name={loc('wiredchests.log_details.transactions')}
                            value=""
                        />
                        <Box layout={{ width: 380, height: 161, flexDirection: 'row', gap: 15, paddingLeft: 18, flexShrink: 0 }}>
                            <ItemsOverview
                                title={loc('wiredchests.log_details.transactions.withdrawn')}
                                coins={info.withdrawCoinsCount}
                                furnis={details.withdrawnFurnis}
                                furniCount={info.withdrawFurniCount}
                                isIncompleteData={details.isIncompleteData}
                            />
                            <ItemsOverview
                                title={loc('wiredchests.log_details.transactions.deposit')}
                                coins={info.depositCoinsCount}
                                furnis={details.depositedFurnis}
                                furniCount={info.depositFurniCount}
                                isIncompleteData={details.isIncompleteData}
                            />
                        </Box>
                        <Box layout={{ height: 5, flexShrink: 0 }} />
                        <Separator />
                        <Box layout={{ position: 'relative', width: 380, height: 20, flexShrink: 0 }}>
                            <Pair
                                name={loc('wiredchests.log_details.extra')}
                                value={(info.transactionDefinitionInfo === '') ? '-' : info.transactionDefinitionInfo}
                            />
                            <Region
                                cursor="pointer"
                                onPointerTap={event => setExtraAnchor(getWiredTradingBubbleAnchor(event))}
                                layout={{ position: 'absolute', left: 357, top: 0, width: 20, height: 20 }}
                            >
                                <ThemeImage
                                    src={LayoutImage('shared/icons_info_grey.png')}
                                    layout={{ position: 'absolute', left: 1, top: 1 }}
                                />
                            </Region>
                        </Box>
                    </Box>
                </Box>
            </Frame>
            {extraAnchor && (
                <WiredTradingInfoBubble
                    anchor={extraAnchor}
                    width={325}
                    height={179}
                    onClose={() => setExtraAnchor(undefined)}
                >
                    <Box layout={{ flexDirection: 'column', width: 293, gap: 1 }}>
                        <ThemeText
                            text={loc('wiredchests.log_details.extra.title')}
                            textStyle="text-style-u-headline-small"
                        />
                        <Box layout={{ height: 7 }} />
                        {EXTRA_DESCRIPTIONS.map(index => (
                            <ThemeText
                                key={index}
                                text={loc(`wiredchests.log_details.extra.desc.${index}`)}
                                textStyle="text-style-u-regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 293 }}
                            />
                        ))}
                    </Box>
                </WiredTradingInfoBubble>
            )}
        </>
    );
};

type WiredTransactionDetailsBubbleState = WiredTradingBubbleAnchor | undefined;
