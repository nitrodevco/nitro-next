/**
 * The Flash client's generic table, `com.sulake.habbo.window.utils.tableview.TableView`, with
 * everything it is built from: `TableColumn`, `TableCell`, `CellTemplate`, `TableCellView`,
 * `TableRowModel`, `TableRowView` and `ITableObject`. Geometry and colours are those of
 * `table_view_xml` (layout `wired_menu_table_view`) and the constants of the `.as` files.
 *
 * It is a controlled component: the rows are data (`rows` + `getRowId` + `getCell` stand in
 * for `setObjects` and `ITableObject.identifier` / `getTableCell`), the selection may be owned
 * by the caller (`selectedId`), and the four Flash callbacks are props.
 *
 * What maps onto what:
 * - `TableView.initialize(columns, showHeader, canSelect)` -> `columns`, `showHeader`, `canSelect`.
 * - `TableView.getCellWidth` / `rowWidth` / `resizeHorizontally` -> widths are `int(rowWidth * widthFactor)`
 *   of the measured contents box, less `SCROLLBAR_OFFSET` while the list scrolls.
 * - `TableView.trySelect`, `onHover`, `onEnterNewCellValue` -> `onRowClicked`, `onRowSelected`,
 *   `onRowHovered`, `onCellEdit`. As in `setObjects` / `clear`, a selected or hovered row that
 *   leaves the data reports `null`.
 * - `TableView.scrollToTop` / `resetScrollingNextUpdate` -> `scrollResetKey`.
 * - `TableView.getGlobalRowRectangle` -> the second argument of `onRowHovered`.
 * - `TableRowView.updateColor` -> zebra rows, grey when selected, blue when selected and the
 *   last press was on a row (`hasFocus`, dropped again by `onClickAway`).
 * - `TableCellView` -> text and link cells, the extra button, the tooltip (the full text when it
 *   was shortened), double click to inspect/edit (`onDoubleClick`, `onInputEdit`,
 *   `onInputFocusOut`) and the highlight flash (`highlight`, `easeInOutCubic`).
 * - A `custom` cell is this port's addition: the subclass windows put buttons into cells, and a
 *   render prop is how a React caller does that.
 *
 * Flash has no sorting in `TableView`; the windows ask the server for a sort order instead.
 *
 * Not carried over, on purpose:
 * - `manageRowViews` and its row pool (`LAZY_CHUNKING`, `SCROLL_BUFFER`, `DeBouncer`). It exists
 *   to avoid building window trees for rows far off screen; every row here is mounted, since
 *   the theme's `ScrollArea` owns its scroll position and a page is 25-50 rows.
 * - `tool_tip_delay="0"` of `table_element`: tooltips use the theme's one delay.
 * - A Volter link is underlined with a 1px rule under the baseline rather than by the text
 *   renderer, which only underlines the anti-aliased styles.
 */
import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Border, Box, BoxLayout, getGlobalRect, GlobalRect, Region, ScrollArea, TextInput, ThemeImage, ThemeText, useLayoutSize, useOutsideClick } from '#base/theme';

import { fitTableText, measureTableText, tableLinkUnderlineY } from './wiredTableText';

/** `TableView.TABLE_MARGIN`: `table_contents` sits 5px inside `table_border` on every side. */
const TABLE_MARGIN = 5;
/** `TableView.SCROLLBAR_OFFSET`: what a visible scrollbar takes off the row width. */
const SCROLLBAR_OFFSET = 21;
/** The theme scrollbar's own width; the rest of `SCROLLBAR_OFFSET` is the gap beside it. */
const SCROLLBAR_WIDTH = 17;
/** `table_titlerow`. */
const TITLE_ROW_HEIGHT = 23;
/** `splitter`: 1px of `0x50000000`. */
const SPLITTER_HEIGHT = 1;
const SPLITTER_ALPHA = 0x50 / 0xFF;
/** `table_row` / `table_element`. */
const ROW_HEIGHT = 20;
/** `element_text`, `column_name`, `link_container`, `highlight_border`. */
const TEXT_HEIGHT = 17;
/** `margin_left` / `margin_right` of `column_name` and `element_text`. */
const TEXT_MARGIN = 4;
/** The 2px `TextField` gutter on each side of a rendered text. */
const TEXT_GUTTER = 2;

/** `TableRowView`'s four colours: selected with focus, selected, even row, odd row. */
const ROW_COLOR_SELECTED_FOCUS = '#b8e2fc';
const ROW_COLOR_SELECTED = '#d1d1d1';
const ROW_COLOR_EVEN = '#eaeaea';
const ROW_COLOR_ODD = '#f9f9f9';

/** `TableCellView.highlight`: 500 ms in 16 ms steps, up to a blend of 0.35. */
const HIGHLIGHT_STEP_MS = 16;
const HIGHLIGHT_STEPS = Math.trunc(500 / HIGHLIGHT_STEP_MS);
const HIGHLIGHT_MAX_BLEND = 0.35;
const HIGHLIGHT_COLOR = '#4fbce3';

const LINK_COLOR = '#0000ee';
const EMPTY_TEXT_COLOR = '#333333';

/** `TableColumn`'s fourth argument. Flash stores `"left"` as `autoSize = "none"`. */
export type WiredTableAlignment = 'left' | 'center' | 'right';

/** `TableColumn`. */
export interface WiredTableColumn {
    id: string;
    /** `columnName`, already translated. */
    title: string;
    /** `widthFactor`: the share of the row width, 0-1. The factors of a table add up to 1. */
    widthFactor: number;
    /** `"center"` when omitted, as in Flash. */
    alignment?: WiredTableAlignment;
}

/** `TableCell.setExtraBtn(assetUri, callback)`: the 20x20 bitmap at the cell's right edge. */
export interface WiredTableExtraButton {
    /** The image, e.g. `LayoutImage('shared/icons_info_grey.png')`. */
    src: string;
    /** Without one the button shows no hand cursor (`interactiveCursorDisabled`). */
    onClick?: () => void;
}

/** `TableCell` of type 0 (text) or 1 (link). */
export interface WiredTableTextCell {
    /** `'text'` when omitted. */
    type?: 'text' | 'link';
    /** `contents`. */
    text: string;
    /** `textColor`, text cells only; black when omitted. */
    textColor?: string;
    /** `isEditable`: double click opens an input, Enter reports the value through `onCellEdit`. */
    editable?: boolean;
    /** `isInspectable`: double click opens the input read-only, to select and copy from. */
    inspectable?: boolean;
    /** `textFieldValue`: what the input opens with; `text` when omitted. */
    textFieldValue?: string;
    /** `linkClickCallback`, link cells only. */
    onLinkClick?: () => void;
    /** `highlightOnChange`: flash the cell when `text` changes while the row stays. */
    highlightOnChange?: boolean;
    /** `tooltipText`. Without one a shortened text cell shows its full text. */
    tooltip?: string;
    extraButton?: WiredTableExtraButton;
}

/** What a `custom` cell's renderer is told about the box it fills. */
export interface WiredTableCellRenderInfo {
    width: number;
    height: number;
    selected: boolean;
}

/** Arbitrary content in a cell. The content lives inside the row, so a press on it selects the row unless it stops the event. */
export interface WiredTableCustomCell {
    type: 'custom';
    render: (info: WiredTableCellRenderInfo) => ReactNode;
    tooltip?: string;
}

export type WiredTableCell = WiredTableTextCell | WiredTableCustomCell;

export interface WiredTableViewProps<T extends object> {
    columns: readonly WiredTableColumn[];
    rows: readonly T[];
    /** `ITableObject.identifier`. */
    getRowId: (row: T) => string;
    /** `ITableObject.getTableCell(columnId)`. */
    getCell: (row: T, columnId: string) => WiredTableCell;
    /** `initialize`'s second argument: the title row and its splitter. On by default. */
    showHeader?: boolean;
    /** `initialize`'s third argument: whether a press selects the row. On by default. */
    canSelect?: boolean;
    /** Pass to own the selection (`null` for none); leave out to let the table keep it. */
    selectedId?: string | null;
    /** `nothing_to_display_text`; `wiredmenu.table.empty` when omitted. */
    emptyText?: string;
    /** `scrollToTop` / `resetScrollingNextUpdate`: the list returns to the top whenever this changes. */
    scrollResetKey?: unknown;
    /** The scrollbar skin; follows the enclosing `Frame` when omitted. */
    scrollVariant?: string;
    /** `onRowClickedCallback`: every press on a row, selected already or not. */
    onRowClicked?: (row: T) => void;
    /** `onRowSelectedCallback`: the selection changed; `null` when the selected row left the data. */
    onRowSelected?: (row: T | null) => void;
    /** `onRowHoveredCallback`, with the row's on-screen box (`getGlobalRowRectangle`). */
    onRowHovered?: (row: T | null, rect: GlobalRect | null) => void;
    /** `onCellEditCallback`. */
    onCellEdit?: (row: T, columnId: string, value: string) => void;
    /** The `table_container` box. Fills its flex parent when omitted; pass `{ width, height }` for a fixed table. */
    layout?: BoxLayout;
}

/** `TableCellView.easeInOutCubic` as `highlight` calls it (start 0, change 0.35). Despite the name it is a parabola that peaks at 40%. */
const highlightBlend = (step: number): number => {
    const t = ((step / HIGHLIGHT_STEPS) * 1.75) - 0.7;

    return Math.max(0, HIGHLIGHT_MAX_BLEND * (1 - (t * t)));
};

/** Keys a read-only (inspectable, not editable) input lets through: moving, selecting, copying, leaving. */
const isReadOnlyKey = (event: KeyboardEvent): boolean => {
    if (event.ctrlKey || event.metaKey) return [ 'a', 'c' ].includes(event.key.toLowerCase());

    return [ 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Shift', 'Enter', 'Escape', 'Tab' ].includes(event.key);
};

interface TitleCellProps {
    column: WiredTableColumn;
    width: number;
}

/** One `column_name` clone of `TableView.initializeColumns`: bold, margins of 4, aligned like its column. */
const TitleCell = ({ column, width }: TitleCellProps) => {
    const alignment = column.alignment ?? 'center';
    const textWidth = Math.max(0, width - (TEXT_MARGIN * 2));
    const clips = (measureTableText(column.title, 'bold') + (TEXT_GUTTER * 2)) > textWidth;

    return (
        <Box layout={{ width, height: TITLE_ROW_HEIGHT, flexShrink: 0, overflow: clips ? 'hidden' : undefined }}>
            <ThemeText
                text={column.title}
                textStyle="bold"
                textOptions={{ align: alignment }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: TEXT_MARGIN, top: 2, width: textWidth, height: TEXT_HEIGHT }}
            />
        </Box>
    );
};

interface CellProps {
    cell: WiredTableTextCell;
    alignment: WiredTableAlignment;
    width: number;
    onEdit: (value: string) => void;
}

/** `TableCellView` for a text or link `TableCell`. */
const TextCell = ({ cell, alignment, width, onEdit }: CellProps) => {
    const { type = 'text', text, textColor, editable = false, inspectable = false, textFieldValue, onLinkClick, highlightOnChange = false, tooltip, extraButton } = cell;
    const [ inputValue, setInputValue ] = useState<string | null>(null);
    const [ shownText, setShownText ] = useState(text);
    const [ highlight, setHighlight ] = useState<number | null>(null);
    const [ highlightRun, setHighlightRun ] = useState(0);

    // TableCellView.update: a changed cell of a row that stays flashes, unless a flash is still running.
    if (shownText !== text) {
        setShownText(text);

        // ...and unless its input is open, where Flash only refreshes the contents.
        if (highlightOnChange && (highlight === null) && (inputValue === null)) {
            setHighlight(0);
            setHighlightRun(run => run + 1);
        }
    }

    // TableCellView.highlight: the timer behind the flash.
    useEffect(() => {
        if (!highlightRun) return;

        let step = 0;

        const timer = setInterval(() => {
            step++;

            if (step >= HIGHLIGHT_STEPS) {
                clearInterval(timer);
                setHighlight(null);

                return;
            }

            setHighlight(highlightBlend(step));
        }, HIGHLIGHT_STEP_MS);

        return () => clearInterval(timer);
    }, [ highlightRun ]);

    const isLink = (type === 'link');
    const textWidth = Math.max(0, width - (TEXT_MARGIN * 2));
    // TextController only replaces an overflow for autoSize "none" (a "left" column) and "right".
    const fitted = useMemo(() => ((isLink || alignment === 'center') ? { text, overflown: false } : fitTableText(text, 'regular', textWidth)), [ isLink, alignment, text, textWidth ]);
    const naturalWidth = useMemo(() => measureTableText(text, 'regular') + (TEXT_GUTTER * 2), [ text ]);
    const clips = isLink ? (naturalWidth > width) : ((alignment === 'center') && (naturalWidth > textWidth));
    const isInspecting = (inputValue !== null);

    // TableCellView.onDoubleClick
    const openInput = (event: FederatedPointerEvent) => {
        if (event.detail < 2) return;

        setInputValue(textFieldValue ?? text);
    };

    return (
        <Region
            tooltip={tooltip ?? (fitted.overflown ? text : undefined)}
            cursor="default"
            onPointerTap={(editable || inspectable) ? openInput : undefined}
            layout={{ width, height: ROW_HEIGHT, flexShrink: 0, overflow: clips ? 'hidden' : undefined }}
        >
            {(highlight !== null) && (
                <Border
                    variant="2"
                    tintColor={HIGHLIGHT_COLOR}
                    blend={highlight}
                    layout={{ position: 'absolute', left: 2, right: 2, top: 1, height: TEXT_HEIGHT }}
                />
            )}
            {!isInspecting && !isLink && (
                <ThemeText
                    text={fitted.text}
                    textStyle="regular"
                    textOptions={{ fill: textColor ?? '#000000', align: alignment }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: TEXT_MARGIN, top: 1, width: textWidth, height: TEXT_HEIGHT }}
                />
            )}
            {!isInspecting && isLink && (
                // CellTemplate.fixAlignmentsAndAdd: centred, or from the left edge when wider than the cell.
                <Box layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: TEXT_HEIGHT, flexDirection: 'row', justifyContent: clips ? 'flex-start' : 'center' }}>
                    <Region
                        cursor="pointer"
                        // `link_container` is a window of its own: its click is not the cell's double click.
                        onPointerTap={(event) => {
                            event.stopPropagation();
                            onLinkClick?.();
                        }}
                        layout={{ height: TEXT_HEIGHT, flexShrink: 0 }}
                    >
                        <ThemeText
                            text={text}
                            textStyle="regular"
                            textOptions={{ fill: LINK_COLOR }}
                            verticalAlign="top"
                            layout={{ height: TEXT_HEIGHT }}
                        />
                        <Region
                            backgroundColor={LINK_COLOR}
                            layout={{ position: 'absolute', left: TEXT_GUTTER, right: TEXT_GUTTER, top: tableLinkUnderlineY('regular'), height: 1 }}
                        />
                    </Region>
                </Box>
            )}
            {isInspecting && (
                // `element_input` does not carry the row's WME_DOWN listener, so a press in it is not a row click.
                <Box
                    onPointerDown={event => event.stopPropagation()}
                    layout={{ position: 'absolute', left: 5, right: 5, top: 1, height: 18 }}
                >
                    <TextInput
                        value={inputValue}
                        onChange={(value) => {
                            if (editable) setInputValue(value);
                        }}
                        // TableCellView.onInputEdit: Enter hands an editable cell's value over and the cell shows its text again; it does nothing in a read-only one.
                        onEnter={() => {
                            if (!editable) return;

                            onEdit(inputValue);
                            setInputValue(null);
                        }}
                        onKeyDown={event => !editable && !isReadOnlyKey(event)}
                        focused={true}
                        // TableCellView.onInputEdit's Escape (it blurs the input) and onInputFocusOut.
                        onFocusChange={(focused) => {
                            if (!focused) setInputValue(null);
                        }}
                        textStyle="regular"
                        focusedBackgroundColor="#ffffff"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Box>
            )}
            {extraButton && (
                // `extra_button` only listens for clicks and hover in Flash, so a press on it does not select the row.
                <Region
                    stopsPropagation
                    cursor={extraButton.onClick ? 'pointer' : 'default'}
                    onPointerTap={(event) => {
                        event.stopPropagation();
                        extraButton.onClick?.();
                    }}
                    layout={{ position: 'absolute', right: 3, top: 0, width: 20, height: ROW_HEIGHT }}
                >
                    <ThemeImage
                        src={extraButton.src}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 20, height: 20 }}
                    />
                </Region>
            )}
        </Region>
    );
};

export const WiredTableView = <T extends object>({ columns, rows, getRowId, getCell, showHeader = true, canSelect = true, selectedId: controlledSelectedId, emptyText, scrollResetKey, scrollVariant, onRowClicked, onRowSelected, onRowHovered, onCellEdit, layout }: WiredTableViewProps<T>) => {
    const t = useTranslation();
    const [ contentsNode, setContentsNode ] = useState<PixiContainer | null>(null);
    const [ ownSelectedId, setOwnSelectedId ] = useState<string | null>(null);
    const [ lostSelectedId, setLostSelectedId ] = useState<string | null>(null);
    const [ selectionLosses, setSelectionLosses ] = useState(0);
    const [ rowHasFocus, setRowHasFocus ] = useState(false);
    const listRef = useRef<PixiContainer | null>(null);
    const rowsRef = useRef<PixiContainer | null>(null);
    const hoveredId = useRef<string | null>(null);
    const onRowSelectedRef = useRef(onRowSelected);
    const onRowHoveredRef = useRef(onRowHovered);
    const contents = useLayoutSize(contentsNode);

    useEffect(() => {
        onRowSelectedRef.current = onRowSelected;
        onRowHoveredRef.current = onRowHovered;
    });

    const isControlled = (controlledSelectedId !== undefined);
    const selectedId = isControlled ? controlledSelectedId : ownSelectedId;
    const rowIds = useMemo(() => new Set(rows.map(getRowId)), [ rows, getRowId ]);
    const selectionLost = (selectedId !== null) && !rowIds.has(selectedId);

    // TableView.setObjects / clear: the selected row is no longer among the objects.
    if (selectionLost && (lostSelectedId !== selectedId)) {
        setLostSelectedId(selectedId);
        setSelectionLosses(count => count + 1);

        if (!isControlled) setOwnSelectedId(null);
    } else if (!selectionLost && (selectedId !== null) && (lostSelectedId !== null)) {
        setLostSelectedId(null);
    }

    useEffect(() => {
        if (selectionLosses) onRowSelectedRef.current?.(null);
    }, [ selectionLosses ]);

    // TableView.setObjects / clear: the hovered row is no longer among the objects.
    useEffect(() => {
        if ((hoveredId.current === null) || rowIds.has(hoveredId.current)) return;

        hoveredId.current = null;
        onRowHoveredRef.current?.(null, null);
    }, [ rowIds ]);

    // TableRowView.onClickAway: a press anywhere but on a row takes the focus colour off the selection.
    useOutsideClick(listRef, () => setRowHasFocus(false), rowHasFocus);
    useOutsideClick(rowsRef, () => setRowHasFocus(false), rowHasFocus);

    // TableRowView.onDown -> TableView.trySelect(object, true)
    const handleRowDown = (row: T) => {
        setRowHasFocus(true);
        onRowClicked?.(row);

        if (!canSelect) return;

        const id = getRowId(row);

        if (selectedId === id) return;

        if (!isControlled) setOwnSelectedId(id);

        onRowSelected?.(row);
    };

    // TableRowView.onHoverOver / onHoverOut -> TableView.onHover
    const handleRowHover = (row: T | null, event: FederatedPointerEvent) => {
        const id = row ? getRowId(row) : null;

        if (hoveredId.current === id) return;

        hoveredId.current = id;
        onRowHovered?.(row, row ? getGlobalRect(event.currentTarget) : null);
    };

    // TableView.updateTableItemsHeight / onScrollBarVisibilityMayHaveChanged / rowWidth / getCellWidth
    const headerHeight = showHeader ? (TITLE_ROW_HEIGHT + SPLITTER_HEIGHT) : 0;
    const listHeight = Math.max(0, contents.height - headerHeight);
    const isScrollBarVisible = (contents.height > 0) && ((rows.length * ROW_HEIGHT) > listHeight);
    const rowWidth = Math.max(0, Math.trunc(contents.width) - (isScrollBarVisible ? SCROLLBAR_OFFSET : 0));
    const cellWidths = columns.map(column => Math.trunc(rowWidth * column.widthFactor));

    return (
        <Border
            variant="0"
            layout={{ flex: 1, minWidth: 0, minHeight: 0, ...layout }}
        >
            <Box
                ref={setContentsNode}
                layout={{ position: 'absolute', left: TABLE_MARGIN, right: TABLE_MARGIN, top: TABLE_MARGIN, bottom: TABLE_MARGIN, flexDirection: 'column' }}
            >
                {showHeader && (
                    <>
                        <Box layout={{ width: rowWidth, height: TITLE_ROW_HEIGHT, flexShrink: 0, flexDirection: 'row' }}>
                            {columns.map((column, index) => (
                                <TitleCell
                                    key={column.id}
                                    column={column}
                                    width={cellWidths[index]}
                                />
                            ))}
                        </Box>
                        <Region
                            backgroundColor="#000000"
                            alpha={SPLITTER_ALPHA}
                            layout={{ width: rowWidth, height: SPLITTER_HEIGHT, flexShrink: 0 }}
                        />
                    </>
                )}
                {(rowWidth > 0) && (
                    <ScrollArea
                        ref={listRef}
                        variant={scrollVariant}
                        scrollResetKey={scrollResetKey}
                        layout={{ flex: 1, gap: SCROLLBAR_OFFSET - SCROLLBAR_WIDTH }}
                        contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column' }}
                    >
                        <Box
                            ref={rowsRef}
                            layout={{ width: rowWidth, flexDirection: 'column', flexShrink: 0 }}
                        >
                            {rows.map((row, index) => {
                                const id = getRowId(row);
                                const isSelected = canSelect && (id === selectedId);
                                // TableRowView.updateColor
                                const color = isSelected
                                    ? (rowHasFocus ? ROW_COLOR_SELECTED_FOCUS : ROW_COLOR_SELECTED)
                                    : ((index % 2 === 0) ? ROW_COLOR_EVEN : ROW_COLOR_ODD);

                                return (
                                    <Region
                                        key={id}
                                        backgroundColor={color}
                                        cursor="default"
                                        onPointerDown={() => handleRowDown(row)}
                                        onPointerOver={event => handleRowHover(row, event)}
                                        onPointerOut={event => handleRowHover(null, event)}
                                        layout={{ width: rowWidth, height: ROW_HEIGHT, flexShrink: 0, flexDirection: 'row' }}
                                    >
                                        {columns.map((column, columnIndex) => {
                                            const cell = getCell(row, column.id);
                                            const width = cellWidths[columnIndex];

                                            if (cell.type === 'custom') {
                                                return (
                                                    <Region
                                                        key={column.id}
                                                        tooltip={cell.tooltip}
                                                        cursor="default"
                                                        layout={{ width, height: ROW_HEIGHT, flexShrink: 0 }}
                                                    >
                                                        {cell.render({ width, height: ROW_HEIGHT, selected: isSelected })}
                                                    </Region>
                                                );
                                            }

                                            return (
                                                <TextCell
                                                    key={column.id}
                                                    cell={cell}
                                                    alignment={column.alignment ?? 'center'}
                                                    width={width}
                                                    onEdit={value => onCellEdit?.(row, column.id, value)}
                                                />
                                            );
                                        })}
                                    </Region>
                                );
                            })}
                        </Box>
                    </ScrollArea>
                )}
            </Box>
            {!rows.length && (
                // TableView.updateEmptyText: `empty_container` starts under the title row and ends with `table_contents`.
                <Box layout={{ position: 'absolute', left: 0, right: 0, top: headerHeight, bottom: TABLE_MARGIN * 2, alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeText
                        text={emptyText ?? t('wiredmenu.table.empty')}
                        textStyle="u_regular"
                        textOptions={{ fill: EMPTY_TEXT_COLOR }}
                    />
                </Box>
            )}
        </Border>
    );
};
