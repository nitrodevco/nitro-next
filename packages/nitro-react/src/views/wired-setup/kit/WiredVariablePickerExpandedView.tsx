/**
 * `newvariablepicker/ExpandedVariablePickerView` - the open variable picker (`expanded_view` of
 * the `search_tree_dropdown` layout): the six tab buttons, the search field with its clear
 * button, and the variable tree of the active tab with the sub lists the hovered rows open
 * (`VariableNodeView.initSublist`). It is mounted while the picker is open, so the hover state
 * goes with it, as Flash disposes the lists in `onHide`.
 *
 * The keyboard handling is `NewVariablePicker.onKeyUp`: Enter takes the variable whose name was
 * typed, nothing for an empty field, and otherwise the first hit of the search tab; Escape
 * closes.
 */
import { IWiredVariable } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Border, Box, GlobalRect, LayoutImage, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { canSelectVariableNode, findPickerVariableByDisplayName, VARIABLE_PICKER_TAB_SEARCH, VARIABLE_PICKER_TABS, variableNodeListHeight, variableNodeListScrollbarWidth, variablePickerTabNodes, variablePickerTabWidths, WiredVariableFilter, WiredVariableNode } from '#base/wired';

import { WiredVariablePickerNodeList } from './WiredVariablePickerNodeList';
import { WiredVariablePickerTabButton } from './WiredVariablePickerTabButton';

/** `input_field`'s `max_chars`. */
const MAX_CHARS = 60;

/** A row that is hovered in the list of one level, and where the sub list it opens goes. */
interface OpenNode {
    index: number;
    left: number;
    top: number;
    width: number;
}

export interface WiredVariablePickerExpandedViewProps {
    /** Where the popup sits on screen - sub lists are placed relative to it. */
    x: number;
    y: number;
    width: number;
    borderVariant: string;
    pickerVariables: readonly IWiredVariable[];
    history: readonly string[];
    filter?: WiredVariableFilter;
    query: string;
    tabId: number;
    onQueryChange: (query: string) => void;
    onTabChange: (tabId: number) => void;
    /** `NewVariablePicker.select` - a row, Enter or the clear button chose a variable (or none). */
    onSelect: (variable: IWiredVariable | null, keepOpen: boolean) => void;
    onEscape: () => void;
}

export const WiredVariablePickerExpandedView = ({ x, y, width, borderVariant, pickerVariables, history, filter, query, tabId, onQueryChange, onTabChange, onSelect, onEscape }: WiredVariablePickerExpandedViewProps) => {
    const t = useTranslation();
    const [ openPath, setOpenPath ] = useState<OpenNode[]>([]);

    const tabWidths = variablePickerTabWidths(width);
    const contentWidth = width - 3;
    const rootNodes = variablePickerTabNodes(tabId, pickerVariables, history, query);

    // The list of each level: the tab's rows, then the children of every hovered row that has some.
    const lists: { nodes: readonly WiredVariableNode[]; open: OpenNode | null }[] = [ { nodes: rootNodes, open: null } ];

    for (const open of openPath) {
        const children = lists[lists.length - 1].nodes[open.index]?.children ?? [];

        if (children.length === 0) break;

        lists.push({ nodes: children, open });
    }

    const handleHover = (level: number, index: number, rowRect: GlobalRect) => {
        const nodes = lists[level]?.nodes ?? [];
        const childCount = nodes[index]?.children.length ?? 0;

        let top = rowRect.y - y;

        // `initSublist`: a sub list that would leave the screen at the bottom moves up, but not above the picker.
        const overflow = (y + top + variableNodeListHeight(childCount)) - window.innerHeight;

        if (overflow > 0) top = Math.max(0, top - overflow);

        const next: OpenNode = { index, left: (rowRect.x - x) + rowRect.width + variableNodeListScrollbarWidth(nodes.length), top, width: rowRect.width };

        setOpenPath(path => (path[level]?.index === index) ? path : [ ...path.slice(0, level), next ]);
    };

    const handleEnter = () => {
        const typed = findPickerVariableByDisplayName(pickerVariables, query, filter);

        if (typed) return onSelect(typed, false);

        if (query === '') return onSelect(null, false);

        if (tabId !== VARIABLE_PICKER_TAB_SEARCH) return;

        const first = rootNodes[0];

        if (!first) return onSelect(null, false);

        if (first.variable && canSelectVariableNode(first, filter)) onSelect(first.variable, false);
    };

    return (
        <>
            <Border
                variant={borderVariant}
                layout={{ width, flexDirection: 'column' }}
            >
                {/* `button_list` at x 1 and its buttons at y 1, clear of the border's ring; the search row overlaps their last pixel as it does in the layout. */}
                <Box layout={{ flexDirection: 'row', height: 20, marginLeft: 1, marginTop: 1 }}>
                    {VARIABLE_PICKER_TABS.map((tab, index) => (
                        <WiredVariablePickerTabButton
                            key={tab.tabId}
                            tab={tab}
                            width={tabWidths[index]}
                            active={tab.tabId === tabId}
                            onPress={() => {
                                setOpenPath([]);
                                onTabChange(tab.tabId);
                            }}
                        />
                    ))}
                </Box>
                <Box layout={{ width, height: 20, marginTop: -1 }}>
                    {(query.length === 0) && (
                        <ThemeText
                            text={t('wiredfurni.variable_picker.search', 'wiredfurni.variable_picker.search')}
                            textOptions={{ fill: '#808080' }}
                            flashFormat={{ antiAliasType: 'advanced' }}
                            layout={{ position: 'absolute', left: 7, top: 3 }}
                        />
                    )}
                    <TextInput
                        value={query}
                        onChange={(value) => {
                            setOpenPath([]);
                            onQueryChange(value);
                        }}
                        onEnter={handleEnter}
                        onKeyDown={(event) => {
                            if (event.key !== 'Escape') return false;

                            onEscape();

                            return true;
                        }}
                        focused={true}
                        maxLength={MAX_CHARS}
                        textStyle="regular"
                        // `input_field`: a 190x17 input at (7, 3) of the 197px field - flush with its
                        // right edge, under the cancel button - with no fill of its own.
                        flashPlacement
                        backgroundColor={null}
                        focusedBackgroundColor={null}
                        layout={{ position: 'absolute', left: 7, top: 3, width: width - 7, height: 17 }}
                    />
                    {(query.length > 0) && (
                        <Region
                            cursor="pointer"
                            onPointerTap={() => {
                                setOpenPath([]);
                                onSelect(null, true);
                            }}
                            layout={{ position: 'absolute', right: 8, top: 5, width: 9, height: 9 }}
                        >
                            <ThemeImage
                                src={LayoutImage('shared/var_picker_cancel_search.png')}
                                bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                                layout={{ position: 'absolute', left: 0, top: 0 }}
                            />
                        </Region>
                    )}
                </Box>
                <Box layout={{ width: contentWidth, height: 2, marginLeft: 1 }}>
                    <Region
                        backgroundColor="#dddddd"
                        layout={{ width: contentWidth, height: 1 }}
                    />
                </Box>
                <Box layout={{ width: contentWidth, marginLeft: 1, marginBottom: 2, flexDirection: 'column' }}>
                    {(rootNodes.length === 0)
                        ? (
                                <Box layout={{ width: contentWidth, height: 52, alignItems: 'center', justifyContent: 'center' }}>
                                    <ThemeText
                                        text={t('wiredfurni.variable_picker.empty', 'wiredfurni.variable_picker.empty')}
                                        textOptions={{ fill: '#333333' }}
                                        flashFormat={{ antiAliasType: 'advanced' }}
                                        alpha={0.5}
                                    />
                                </Box>
                            )
                        : (
                                <WiredVariablePickerNodeList
                                    nodes={rootNodes}
                                    width={contentWidth}
                                    isRoot={true}
                                    borderVariant={borderVariant}
                                    hoveredIndex={openPath[0]?.index ?? -1}
                                    filter={filter}
                                    onHover={(index, rowRect) => handleHover(0, index, rowRect)}
                                    onSelect={node => onSelect(node.variable, false)}
                                />
                            )}
                </Box>
            </Border>
            {lists.slice(1).map((list, index) => list.open && (
                <Box
                    key={`${index}:${list.open.index}`}
                    layout={{ position: 'absolute', left: list.open.left, top: list.open.top }}
                >
                    <WiredVariablePickerNodeList
                        nodes={list.nodes}
                        width={list.open.width}
                        isRoot={false}
                        borderVariant={borderVariant}
                        hoveredIndex={openPath[index + 1]?.index ?? -1}
                        filter={filter}
                        onHover={(rowIndex, rowRect) => handleHover(index + 1, rowIndex, rowRect)}
                        onSelect={node => onSelect(node.variable, false)}
                    />
                </Box>
            ))}
        </>
    );
};
