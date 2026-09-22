/**
 * `newvariablepicker/overview/VariableNodeListView` + `VariableNodeView` - one list of the
 * variable tree (`variable_overview_template` and `node_template` of the `search_tree_dropdown`
 * layout): 20px rows on alternating greys, a triangle on a row that opens a sub list, at most
 * 300px before the list scrolls.
 *
 * A row stays hovered until another row of the same list is (`setHover` - there is no "out"),
 * which is what keeps a sub list open while the pointer travels to it. The hovered row and the
 * sub lists it opens are the expanded view's state; this component reports the hover with the
 * row's place on screen so the sub list can be put beside it.
 */
import { FederatedPointerEvent } from 'pixi.js';

import { useTranslation } from '#base/context/system';
import { Border, Box, getGlobalRect, GlobalRect, Icon, Region, ScrollArea, ThemeText } from '#base/theme';
import { canSelectVariableNode, isVariableNodeDisabled, VARIABLE_NODE_LIST_MAX_HEIGHT, VARIABLE_NODE_LIST_PADDING, VARIABLE_NODE_ROW_HEIGHT, variableNodeListScrollbarWidth, WiredVariableFilter, WiredVariableNode } from '#base/wired';

/** `VariableNodeView.HOVER_BG` / `MODE1_BG` / `MODE2_BG`. */
const HOVER_BG = '#e0e0e0';
const EVEN_BG = '#efefef';
const ODD_BG = '#fafafa';

/** A greyed-out row: `nodeName.blend` / `icon.blend`. */
const DISABLED_BLEND = 0.55;

/** `node_template`'s `tool_tip_delay`. */
const NODE_TOOLTIP_DELAY = 1000;

export interface WiredVariablePickerNodeListProps {
    nodes: readonly WiredVariableNode[];
    width: number;
    /** The top level list of a tab; a sub list is drawn inside a border, its rows inset by it. */
    isRoot: boolean;
    /** The wired style's border skin for a sub list. */
    borderVariant: string;
    hoveredIndex: number;
    filter?: WiredVariableFilter;
    onHover: (index: number, rowRect: GlobalRect) => void;
    onSelect: (node: WiredVariableNode) => void;
}

export const WiredVariablePickerNodeList = ({ nodes, width, isRoot, borderVariant, hoveredIndex, filter, onHover, onSelect }: WiredVariablePickerNodeListProps) => {
    const t = useTranslation();
    const rowWidth = width - variableNodeListScrollbarWidth(nodes.length) - (isRoot ? 0 : 3);
    const listHeight = Math.min(nodes.length * VARIABLE_NODE_ROW_HEIGHT, VARIABLE_NODE_LIST_MAX_HEIGHT);

    const rows = nodes.map((node, index) => {
        const selectable = canSelectVariableNode(node, filter);
        const disabled = isVariableNodeDisabled(node, filter);
        const blend = disabled ? DISABLED_BLEND : 1;
        const tooltip = disabled
            ? t('wiredfurni.variable_picker.tooltip_disabled', 'wiredfurni.variable_picker.tooltip_disabled')
            : (selectable ? undefined : t('wiredfurni.variable_picker.tooltip_not_selectable', 'wiredfurni.variable_picker.tooltip_not_selectable'));

        return (
            <Region
                key={node.name}
                tooltip={tooltip}
                tooltipDelay={NODE_TOOLTIP_DELAY}
                backgroundColor={(index === hoveredIndex) ? HOVER_BG : (((index % 2) === 0) ? EVEN_BG : ODD_BG)}
                cursor={selectable ? 'pointer' : 'default'}
                onPointerOver={(event: FederatedPointerEvent) => onHover(index, getGlobalRect(event.currentTarget))}
                onPointerTap={() => selectable && onSelect(node)}
                layout={{ width: rowWidth, height: VARIABLE_NODE_ROW_HEIGHT, flexShrink: 0, marginLeft: isRoot ? 0 : 1 }}
            >
                <ThemeText
                    text={node.name}
                    textStyle="regular"
                    textOptions={{ fill: '#555555' }}
                    flashFormat={{ antiAliasType: 'advanced' }}
                    alpha={blend}
                    layout={{ position: 'absolute', left: 7, top: 3 }}
                />
                {(node.children.length > 0) && (
                    <Icon
                        variant={5}
                        tintColor="#777777"
                        alpha={blend}
                        layout={{ position: 'absolute', right: 6, top: 5 }}
                    />
                )}
            </Region>
        );
    });

    const list = (
        <Box layout={{ width, flexDirection: 'column', paddingTop: VARIABLE_NODE_LIST_PADDING, paddingBottom: VARIABLE_NODE_LIST_PADDING }}>
            {/* `nodes_list` is a `scrollable_itemlist_vertical` of style 100: the thin illumina bar the rows leave room for. */}
            <ScrollArea
                variant="100"
                layout={{ flex: 0, width, height: listHeight, gap: 0 }}
                contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column' }}
            >
                {rows}
            </ScrollArea>
        </Box>
    );

    if (isRoot) return list;

    return (
        <Border
            variant={borderVariant}
            layout={{ width, flexDirection: 'column' }}
        >
            {list}
        </Border>
    );
};
