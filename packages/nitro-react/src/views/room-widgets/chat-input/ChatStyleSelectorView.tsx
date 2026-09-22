import { Container as PixiContainer } from 'pixi.js';
import { useState } from 'react';

import { CHAT_FONT_SIZE_LABELS, IChatStyle } from '#base/chat';
import { useTranslation } from '#base/context/system';
import { Border, FloatingPopup, GlobalRect, Region, ThemeImage, ThemeText, useLayoutSize } from '#base/theme';

/** `chatinput_chatstyle_template` - one swatch is 55x34, the grid's columns 1px apart. */
const ENTRY_WIDTH = 55;
const ENTRY_HEIGHT = 34;
const ENTRY_SPACING = 1;
/** `RoomChatInputView.createChatStyleSelectorMenuItems`: `gridColumns = clamp(count / 6 + 1, 4, 6)`. */
const MIN_COLUMNS = 4;
const MAX_COLUMNS = 6;
/**
 * `styleselector_menu_new`: a 67x70 border with the 55x33 `itemgrid` at 6,5. The grid reflects
 * its resize to the border (`reflect_resize_to_parent`), so the border is always the grid plus
 * 12 across and 37 down, and the font size band's children, which `move` with its right and
 * bottom edges (the dark strip also stretches across), keep their distance from them.
 */
const MENU_WIDTH = 67;
const MENU_HEIGHT = 70;
const GRID_LEFT = 6;
const GRID_TOP = 5;
const GRID_WIDTH = 55;
const GRID_HEIGHT = 33;
/** The unnamed `border` behind the font size band: 6,44, 56x26, black at a 0.3 blend. */
const FONT_SIZE_BAND_LEFT = 6;
const FONT_SIZE_BAND_TOP = 44;
const FONT_SIZE_BAND_WIDTH = 56;
const FONT_SIZE_BAND_HEIGHT = 26;
/** `font_size_title` at 15,49. */
const FONT_SIZE_TITLE_LEFT = 15;
const FONT_SIZE_TITLE_TOP = 49;
/**
 * `font_size_list`: an `itemlist_horizontal` at -49,48, 85 wide, 2 between items, that sizes
 * itself to them (`resize_on_item_update`, `scale_to_fit_items`) and keeps its centre while it
 * does (`on_resize_align_center`).
 */
const FONT_SIZE_LIST_LEFT = -49;
const FONT_SIZE_LIST_TOP = 48;
const FONT_SIZE_LIST_WIDTH = 85;
const FONT_SIZE_LIST_SPACING = 2;
/**
 * `chatinput_chatfontsize_template`: an 18x18 region with its `label` at 4,1. The label sizes
 * itself to its caption (`auto_size` left) and reflects that to the region
 * (`reflect_horizontal_resize_to_parent`), whose `background_color` stretches with it - so a
 * cell is 4 before the caption and 5 after it.
 */
const FONT_SIZE_ENTRY_HEIGHT = 18;
const FONT_SIZE_LABEL_LEFT = 4;
const FONT_SIZE_LABEL_TOP = 1;
const FONT_SIZE_LABEL_RIGHT = 5;
/** `ChatStyleSelector.updateFontSizeSelectionHighlight`: the picked label 0x333333, the others 0x999999. */
const FONT_SIZE_LABEL_SELECTED = '#333333';
const FONT_SIZE_LABEL = '#999999';
/** `ChatStyleGridView.alignToSelector`: the menu's bottom sits 55 above the selector's. */
const MENU_ABOVE_SELECTOR = 55;
/** `ChatStyleSelector.gridItemWindowProc` / `fontSizeItemWindowProc`: `background_color` under the pointer (4291875024) and off it. */
const BACKGROUND_HOVER = '#d0d0d0';
const BACKGROUND = '#ffffff';

export interface ChatStyleSelectorViewProps {
    /** The `styles` button on screen: the menu floats over the room, its bottom 55 above the button's. */
    anchor: GlobalRect;
    styles: IChatStyle[];
    /** The style picked in this session, or none: Flash highlights nothing until a pick. */
    selectedStyleId: number;
    onSelect: (styleId: number) => void;
    /** `freeFlowChat.chatFontSizeMode`, 0-4 - the highlighted `font_size_list` entry. */
    fontSizeMode: number;
    onSelectFontSize: (mode: number) => void;
    onClose: () => void;
}

interface ChatStyleEntryProps {
    style: IChatStyle;
    selected: boolean;
    onSelect: () => void;
}

/**
 * One `chatinput_chatstyle_template` cell: the style's `selector_preview` bitmap centred over a
 * `background_color` border that only the picked cell shows (`showBackgroundOnlyForItem`); the
 * pointer turns that border grey rather than showing one on another cell.
 */
const ChatStyleEntry = ({ style, selected, onSelect }: ChatStyleEntryProps) => {
    const [ hovered, setHovered ] = useState(false);

    return (
        <Region
            name="chatstyle_region"
            cursor="pointer"
            onPointerTap={onSelect}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            layout={{ width: ENTRY_WIDTH, height: ENTRY_HEIGHT, flexShrink: 0, justifyContent: 'center', alignItems: 'center' }}
        >
            {selected && (
                <Border
                    variant="2"
                    name="background_color"
                    tintColor={hovered ? BACKGROUND_HOVER : BACKGROUND}
                    layout={{ position: 'absolute', left: 0, width: ENTRY_WIDTH, top: 0, height: ENTRY_HEIGHT }}
                />
            )}
            {style.selectorPreviewTexture && (
                <ThemeImage
                    name="bubble_preview"
                    texture={style.selectorPreviewTexture}
                />
            )}
        </Region>
    );
};

interface ChatFontSizeEntryProps {
    label: string;
    selected: boolean;
    onSelect: () => void;
}

/**
 * One `chatinput_chatfontsize_template` cell (`ChatStyleSelector.getFontSizeItemWindowWrapper`):
 * the caption in Ubuntu 10 bold over a `background_color` border only the current mode shows
 * (`updateFontSizeSelectionHighlight`), which the pointer turns grey.
 */
const ChatFontSizeEntry = ({ label, selected, onSelect }: ChatFontSizeEntryProps) => {
    const [ hovered, setHovered ] = useState(false);

    return (
        <Region
            name="chatfontsize_region"
            cursor="pointer"
            onPointerTap={onSelect}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            layout={{ height: FONT_SIZE_ENTRY_HEIGHT, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', paddingLeft: FONT_SIZE_LABEL_LEFT, paddingTop: FONT_SIZE_LABEL_TOP, paddingRight: FONT_SIZE_LABEL_RIGHT }}
        >
            {selected && (
                <Border
                    variant="2"
                    name="background_color"
                    tintColor={hovered ? BACKGROUND_HOVER : BACKGROUND}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: FONT_SIZE_ENTRY_HEIGHT }}
                />
            )}
            <ThemeText
                name="label"
                text={label}
                textOptions={{ fill: selected ? FONT_SIZE_LABEL_SELECTED : FONT_SIZE_LABEL, fontFamily: 'Ubuntu', fontSize: 10 }}
                flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                verticalAlign="top"
            />
        </Region>
    );
};

/**
 * The Flash `styleselector_menu_new` + `ChatStyleGridView`: a dark translucent panel with the
 * pickable bubble styles in its `itemgrid`, which fills a row before starting the next
 * (`ItemGridController.resolveColumnForNextItem`), four to six columns wide. The styles go in
 * last first, as `createChatStyleSelectorMenuItems` adds them. It floats over the room as a
 * desktop window of its own (`FloatingPopup`), stays open on a pick, and closes on a click
 * anywhere else.
 *
 * Under the grid is the font size band: `font_size_title` and the `font_size_list` of
 * `ChatStyleSelector.createFontSizeOptions` - S, M, L, XL, XXL for modes 0-4, the current
 * `chatFontSizeMode` highlighted. A click sets the mode (`fontSizeItemWindowProc`) and leaves
 * the menu open.
 */
export const ChatStyleSelectorView = ({ anchor, styles, selectedStyleId, onSelect, fontSizeMode, onSelectFontSize, onClose }: ChatStyleSelectorViewProps) => {
    const t = useTranslation();
    const [ fontSizeList, setFontSizeList ] = useState<PixiContainer | null>(null);
    const fontSizeListSize = useLayoutSize(fontSizeList);

    const columns = Math.floor(Math.min(Math.max((styles.length / 6) + 1, MIN_COLUMNS), MAX_COLUMNS));
    const rows = Math.max(1, Math.ceil(styles.length / columns));
    const gridWidth = (columns * (ENTRY_WIDTH + ENTRY_SPACING)) - ENTRY_SPACING;
    const gridHeight = (rows * (ENTRY_HEIGHT + ENTRY_SPACING)) - ENTRY_SPACING;
    const moveX = gridWidth - GRID_WIDTH;
    const moveY = gridHeight - GRID_HEIGHT;
    /*
     * `WindowController.setRectangle`'s centre alignment as the list grows item by item: each
     * step moves it by half the change, truncated, with the remainder carried - which comes to
     * `trunc((85 - width) / 2)` once all five are in. Then the border's growth moves it right.
     */
    const fontSizeListWidth = Math.round(fontSizeListSize.width);
    const fontSizeListLeft = FONT_SIZE_LIST_LEFT + Math.trunc((FONT_SIZE_LIST_WIDTH - fontSizeListWidth) / 2) + moveX;

    const menuHeight = MENU_HEIGHT + moveY;

    // A desktop window of its own, as `ChatStyleGridView` is: it reaches far above the 39px
    // `styles` button, whose box would leave every swatch unclickable.
    return (
        <FloatingPopup
            x={Math.round(anchor.x)}
            y={Math.round(anchor.y + anchor.height) - MENU_ABOVE_SELECTOR - menuHeight}
            onOutsideClick={onClose}
            layout={{ width: MENU_WIDTH + moveX, height: menuHeight }}
        >
            <Region
                name="chatstyles_menu"
                dropShadow={{ distance: 4, alpha: 0.6 }}
                layout={{ position: 'absolute', left: 0, top: 0, width: MENU_WIDTH + moveX, height: menuHeight }}
            >
                <Border
                    variant="2"
                    tintColor="#24231e"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <Region
                    name="itemgrid"
                    layout={{ position: 'absolute', left: GRID_LEFT, top: GRID_TOP, width: gridWidth, height: gridHeight, flexDirection: 'row', flexWrap: 'wrap', gap: ENTRY_SPACING }}
                >
                    {[ ...styles ].reverse().map(style => (
                        <ChatStyleEntry
                            key={style.id}
                            style={style}
                            selected={style.id === selectedStyleId}
                            onSelect={() => onSelect(style.id)}
                        />
                    ))}
                </Region>
                <Border
                    variant="2"
                    tintColor="#000000"
                    blend={0.3}
                    layout={{ position: 'absolute', left: FONT_SIZE_BAND_LEFT, width: FONT_SIZE_BAND_WIDTH + moveX, top: FONT_SIZE_BAND_TOP + moveY, height: FONT_SIZE_BAND_HEIGHT }}
                />
                <ThemeText
                    name="font_size_title"
                    text={t('widgets.chatinput.text_size')}
                    textOptions={{ fill: '#999999', fontFamily: 'Ubuntu', fontSize: 11 }}
                    flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: FONT_SIZE_TITLE_LEFT, top: FONT_SIZE_TITLE_TOP + moveY }}
                />
                <Region
                    ref={setFontSizeList}
                    name="font_size_list"
                    // Drawn once its items have given it a width - until then there is no centre to keep.
                    // (Not `visible`: @pixi/layout leaves an invisible node out of the layout, so it would never get one.)
                    alpha={(fontSizeListWidth > 0) ? 1 : 0}
                    layout={{ position: 'absolute', left: fontSizeListLeft, top: FONT_SIZE_LIST_TOP + moveY, height: FONT_SIZE_ENTRY_HEIGHT, flexDirection: 'row', gap: FONT_SIZE_LIST_SPACING }}
                >
                    {CHAT_FONT_SIZE_LABELS.map((label, mode) => (
                        <ChatFontSizeEntry
                            key={label}
                            label={label}
                            selected={mode === fontSizeMode}
                            onSelect={() => onSelectFontSize(mode)}
                        />
                    ))}
                </Region>
            </Region>
        </FloatingPopup>
    );
};
