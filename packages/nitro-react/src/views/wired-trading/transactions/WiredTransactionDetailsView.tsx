/**
 * One transaction in detail - Flash `transactions/details/WiredTransactionDetailsView`, drawn from
 * its template `transaction_details_xml` (400x394).
 *
 * - `updateUI` fills the value of each `<property>_pair` - the pair's second item
 *   (`getValueWindow`: `getListItemAt(1)`): the transaction type, its readable time, the room id,
 *   the chest ids joined by ", ", the user and the definition's extra info ("-" when empty).
 * - `TransactionOverviewView.itemsInitialize`, once per side (`withdrawals_container`,
 *   `deposits_container`): `item_grid` gets a clone of `furni_template` per cell - a coins cell
 *   first when coins moved, then one per furni type with its amount, then, when the server says
 *   the data is incomplete and the listed furni fall short of the transaction's count, a "+N" cell
 *   for the rest; `empty_text` shows on an empty side.
 * - `TransactionItemView`: the cell's tooltip names it (the furni, `wiredcontracts.element.type.0`
 *   for coins, `wiredchests.log_details.incomplete_data`), the border follows the pointer, the
 *   count shows from two up; the coins icon and the "+N" text show on their own cells.
 * - `extra_info_button` opens the "i" bubble. Flash moves the template's `extra_info_bubble` onto
 *   the desktop beside the button (`relocateBubbleFocus`); here the wired trading bubble does that,
 *   so the template's own bubble stays hidden.
 *
 * The cells never show the `limited_item_overlay_grid` / `rarity_item_overlay_grid` widgets:
 * `TransactionChestItemWrapper` gives `initChestBasedIconUI` empty stuff data and special type 1.
 *
 * Not drawn: the "+N" text's 12px size from 1000 up (the template binding has no font size).
 */
import type { IWiredTransactionDetails, IWiredTransactionFurniAmount } from '@nitrodevco/nitro-packets';
import { Container as PixiContainer } from 'pixi.js';
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { useWiredChestItemNameResolver } from '#base/hooks';
import { Box, TemplateBindings, TemplateItem, TemplateWindow, ThemeText, useLayoutSize } from '#base/theme';
import { ChestItemIcon } from '#base/views/wired-trading/chests/WiredChestFurniContentsView';
import { getWiredTradingBubbleAnchor, WiredTradingBubbleAnchor } from '#base/views/wired-trading/common/wiredTradingBubbleAnchor';
import { WiredTradingInfoBubble } from '#base/views/wired-trading/common/WiredTradingInfoBubble';

/** `TransactionChestItemWrapper.specialType`: every listed item is named as a plain furni. */
const TRANSACTION_ITEM_SPECIAL_TYPE = 1;
/** `FurniChestItemView.NOT_HOVERED_COLOR` / `§_-KJ§`. */
const NOT_HOVERED_COLOR = 13355979;
const HOVERED_COLOR = 14079702;
const EXTRA_DESCRIPTIONS = [ 1, 2, 3 ];
/** `extra_info_bubble`: 325x179 around a 147 high text list at 8,8 of its content area. */
const EXTRA_BUBBLE_WIDTH = 325;
const EXTRA_BUBBLE_HEIGHT = 179;
const EXTRA_BUBBLE_TEXTS_HEIGHT = 147;
const EXTRA_TEXTS_WIDTH = 293;

/** `TransactionItemView`'s three kinds. */
type TransactionCell
    = | { kind: 'coins'; count: number }
        | { kind: 'furni'; count: number; furni: IWiredTransactionFurniAmount }
        | { kind: 'incomplete'; count: number };

/** `TransactionOverviewView.itemsInitialize`. */
const cellsOf = (coins: number, furnis: IWiredTransactionFurniAmount[], furniCount: number, isIncompleteData: boolean): TransactionCell[] => {
    const cells: TransactionCell[] = [];

    if (coins !== 0) cells.push({ kind: 'coins', count: coins });

    let listed = 0;

    for (const furni of furnis) {
        listed += furni.amount;
        cells.push({ kind: 'furni', count: furni.amount, furni });
    }

    if (isIncompleteData && (listed < furniCount)) cells.push({ kind: 'incomplete', count: furniCount - listed });

    return cells;
};

export interface WiredTransactionDetailsViewProps {
    details: IWiredTransactionDetails;
    onClose: () => void;
}

export const WiredTransactionDetailsView = ({ details, onClose }: WiredTransactionDetailsViewProps) => {
    const t = useTranslation();
    const nameOf = useWiredChestItemNameResolver();
    const [ hovered, setHovered ] = useState<string | undefined>(undefined);
    const [ extraAnchor, setExtraAnchor ] = useState<WiredTradingBubbleAnchor | undefined>(undefined);
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

    /** `TransactionItemView.initialize` / `updateUI` / `updateColoring`, on a clone of `furni_template`. */
    const cellItem = (side: string, cell: TransactionCell, index: number): TemplateItem => {
        const key = `${side}-${index}`;
        let tooltip: string;

        if (cell.kind === 'coins') tooltip = loc('wiredcontracts.element.type.0');
        else if (cell.kind === 'incomplete') tooltip = loc('wiredchests.log_details.incomplete_data');
        else tooltip = nameOf(cell.furni.itemType, TRANSACTION_ITEM_SPECIAL_TYPE);

        return {
            key,
            from: 'furni_template',
            bindings: {
                '': {
                    tooltip,
                    onPointerOver: () => setHovered(key),
                    onPointerOut: () => setHovered(current => ((current === key) ? undefined : current)),
                },
                border: { color: (hovered === key) ? HOVERED_COLOR : NOT_HOVERED_COLOR },
                coins_icon: { visible: cell.kind === 'coins' },
                furni_icon: { children: (cell.kind === 'furni') && <ChestItemIcon itemType={cell.furni.itemType} /> },
                number_container: { visible: (cell.kind !== 'incomplete') && (cell.count > 1) },
                furni_quantity: { caption: String(cell.count), setCaptionAfterBuild: true },
                incomplete_text: { visible: cell.kind === 'incomplete', caption: `+${cell.count}` },
                outline_focus: { visible: false },
            },
        };
    };

    const sideBindings = (side: 'withdrawals_container' | 'deposits_container', cells: TransactionCell[]): TemplateBindings => ({
        [`${side}/item_grid`]: { items: cells.map((cell, index) => cellItem(side, cell, index)) },
        [`${side}/empty_text`]: { visible: !cells.length },
    });

    return (
        <>
            <TemplateWindow
                id="habbo-user-defined-room-events-com/transaction_details_xml"
                frame={{ id: 'wired-transaction-details', centered: true, rememberPosition: false, onClose }}
                bindings={{
                    'transaction_type_pair/@1': { caption: loc(`wired_transactions.type.${info.transactionType}`) },
                    'timestamp_pair/@1': { caption: info.readableTimestamp },
                    'room_id_pair/@1': { caption: String(info.flatId) },
                    'chest_ids_pair/@1': { caption: details.chestIds.join(', ') },
                    'username_pair/@1': { caption: info.userName },
                    'extra_pair/@1': { caption: (info.transactionDefinitionInfo === '') ? '-' : info.transactionDefinitionInfo },
                    ...sideBindings('withdrawals_container', cellsOf(info.withdrawCoinsCount, details.withdrawnFurnis, info.withdrawFurniCount, details.isIncompleteData)),
                    ...sideBindings('deposits_container', cellsOf(info.depositCoinsCount, details.depositedFurnis, info.depositFurniCount, details.isIncompleteData)),
                    extra_info_button: { onPointerTap: event => setExtraAnchor(getWiredTradingBubbleAnchor(event)) },
                    extra_info_bubble: { visible: false },
                }}
            />
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
