/**
 * One trade rule - Flash `wired_setup/uibuilder/presets/contracts/TradeRuleEditorPreset` with its
 * node cells (`TradeRuleNodeView`), on the ubuntu wired style's `requirement_rule` template: a
 * `#dadada` style 5 border as wide as it is given, the rule's title at 6,3, and its nodes as
 * 42x42 cells 6 apart from 6,21, followed by the "+" that adds one.
 *
 * - A node cell (`element_entry_template`): the furni's icon in an `#eeeeee` style 4 border, or
 *   the coins icon; the amount in a small badge unless it is a single furni; a close "x" at its
 *   top right while hovered (not in overview mode). A click edits the node. The template is
 *   `dynamic_style="brightness_and_shadow_under_gentle"` with the border as its `#icon`, so a
 *   pressed cell sinks a pixel and darkens.
 * - The rule (`isOneLineMode`): up to `MAX_NODES_IN_RULE` (5) nodes on one line; the "+" hides at 5.
 *   With `onRemove` a close "x" shows at the rule's top right while it is hovered.
 * - Overview mode is `NodeOverviewPreset` (the reward popup): no "+", no close buttons, the
 *   nodes wrap, a click reports the node.
 *
 * Controlled: the caller keeps the nodes (see `WiredContractSlice`) and answers the callbacks.
 */
import type { ITradeRequirementNode } from '@nitrodevco/nitro-packets';
import { TradeRequirementNodeType } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { WIRED_TRADE_RULE_MAX_NODES } from '#base/context/wired-trading';
import { useWiredChestItemIconUrl } from '#base/hooks';
import { Border, Box, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';
import { useWiredCaption } from '#base/views/wired-setup/kit/useWiredCaption';
import { useWiredDisabled, wiredDisabledAlpha } from '#base/views/wired-setup/kit/useWiredDisabled';
import { useWiredFillLayout } from '#base/views/wired-setup/kit/useWiredFillLayout';

import { WiredTradingPlusButton } from './WiredTradingPlusButton';

const CELL_SIZE = 42;
const CELL_SPACING = 6;

/** `close_rule_region` / `close_region`: a 15x15 style 12 border with the grey "x". */
const CloseButton = ({ onPress, layout }: { onPress: () => void; layout: { left?: number; right?: number; top: number } }) => (
    <Region
        cursor="pointer"
        onPointerTap={(event) => {
            event.stopPropagation();
            onPress();
        }}
        layout={{ position: 'absolute', width: 15, height: 15, ...layout }}
    >
        <Border
            variant="12"
            tintColor="#dddddd"
            layout={{ width: 15, height: 15 }}
        >
            <ThemeImage
                src={LayoutImage('shared/common_close_x.png')}
                tint="#777777"
                layout={{ position: 'absolute', left: 3, top: 3 }}
            />
        </Border>
    </Region>
);

interface NodeCellProps {
    node: ITradeRequirementNode;
    closable: boolean;
    onPress?: () => void;
    onClose?: () => void;
}

/** `TradeRuleNodeView.updateUI`. */
const NodeCell = ({ node, closable, onPress, onClose }: NodeCellProps) => {
    const [ hovered, setHovered ] = useState(false);
    const isFurni = (Number(node.type) === Number(TradeRequirementNodeType.Furni));
    const iconUrl = useWiredChestItemIconUrl(isFurni ? node.itemType : undefined);
    const showQuantity = (node.amount !== 1) || !isFurni;

    return (
        <Region
            dynamicStyle="brightness_and_shadow_under_gentle"
            cursor={onPress ? 'pointer' : undefined}
            onPointerTap={onPress}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            layout={{ position: 'relative', width: CELL_SIZE, height: CELL_SIZE, flexShrink: 0 }}
        >
            <Border
                variant="4"
                tintColor="#eeeeee"
                dynamicRole="icon"
                layout={{ position: 'absolute', left: 0, top: 0, width: CELL_SIZE, height: CELL_SIZE }}
            >
                {isFurni && (iconUrl !== '') && (
                    <Box layout={{ position: 'absolute', left: 1, top: 1, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <ThemeImage src={iconUrl} />
                    </Box>
                )}
                {!isFurni && (
                    <ThemeImage
                        src={LayoutImage('wired/inventory_furni_icon_credits.png')}
                        layout={{ position: 'absolute', left: 8, top: 12 }}
                    />
                )}
                {showQuantity && (
                    <Box
                        alpha={0.8}
                        layout={{ position: 'absolute', right: 3, top: 27, minWidth: 16, height: 13 }}
                    >
                        <Border
                            variant="4"
                            tintColor="#cccccc"
                            layout={{ minWidth: 16, height: 13, paddingLeft: 3, paddingRight: 3, alignItems: 'center' }}
                        >
                            <ThemeText
                                text={String(node.amount)}
                                textStyle="u_bold"
                                textOptions={{ fontSize: 10, fill: '#222222' }}
                                layout={{ marginTop: -1 }}
                            />
                        </Border>
                    </Box>
                )}
                {closable && hovered && onClose && (
                    <CloseButton
                        onPress={onClose}
                        layout={{ left: 27, top: 0 }}
                    />
                )}
            </Border>
        </Region>
    );
};

export interface WiredTradeRuleEditorProps {
    /** `updateTitle` - a literal or `${key}`. */
    title: string;
    nodes: ITradeRequirementNode[];
    /** `NodeOverviewPreset`: read only, the nodes wrap, a click reports the node through `onEditNode`. */
    overview?: boolean;
    /** The "+" (`onAddMoreClicked`). */
    onAddNode?: () => void;
    /** A node was clicked (`editNode`), by index. */
    onEditNode?: (index: number) => void;
    /** A node's close "x" (`removeNode`), by index. */
    onRemoveNode?: (index: number) => void;
    /** The rule's close "x" (`onCloseClick`); without it the rule cannot be removed. */
    onRemove?: () => void;
}

export const WiredTradeRuleEditor = ({ title, nodes, overview = false, onAddNode, onEditNode, onRemoveNode, onRemove }: WiredTradeRuleEditorProps) => {
    const caption = useWiredCaption();
    const disabled = useWiredDisabled();
    const fillLayout = useWiredFillLayout();
    const [ hovered, setHovered ] = useState(false);
    const canAdd = !overview && !disabled && (nodes.length < WIRED_TRADE_RULE_MAX_NODES);

    return (
        <Region
            alpha={wiredDisabledAlpha(disabled)}
            disabled={disabled}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            layout={{ position: 'relative', flexDirection: 'column', flexShrink: 0, ...fillLayout }}
        >
            <Border
                variant="5"
                tintColor="#dadada"
                layout={{ alignSelf: 'stretch', flexDirection: 'column', paddingLeft: 6, paddingRight: 6, paddingTop: 3, paddingBottom: 5, minHeight: 68 }}
            >
                <ThemeText
                    text={caption(title)}
                    textStyle="u_regular"
                    layout={{ height: 18 }}
                />
                <Box layout={{ flexDirection: 'row', flexWrap: overview ? 'wrap' : 'nowrap', gap: CELL_SPACING, minHeight: CELL_SIZE }}>
                    {nodes.map((node, index) => (
                        <NodeCell
                            key={index}
                            node={node}
                            closable={!overview}
                            onPress={onEditNode ? () => onEditNode(index) : undefined}
                            onClose={onRemoveNode ? () => onRemoveNode(index) : undefined}
                        />
                    ))}
                    {!overview && (nodes.length < WIRED_TRADE_RULE_MAX_NODES) && (
                        <Box layout={{ width: 26, height: CELL_SIZE, paddingLeft: 2, paddingTop: 10, flexShrink: 0 }}>
                            <WiredTradingPlusButton
                                disabled={!canAdd}
                                onPress={() => onAddNode?.()}
                            />
                        </Box>
                    )}
                </Box>
            </Border>
            {!overview && hovered && onRemove && (
                <CloseButton
                    onPress={onRemove}
                    layout={{ right: 4, top: 3 }}
                />
            )}
        </Region>
    );
};
