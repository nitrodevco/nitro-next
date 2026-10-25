import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { CHAT_FONT_SIZE_LABELS } from '@nitrodevco/nitro-theme/chat';
import { useState } from 'react';

import { IChatStyle } from '#base/chat';
import { FloatingPopup, GlobalRect, TemplateItem, TemplateWindow, TemplateWindows, useTemplate } from '#base/theme';

/**
 * The style menu - `ChatStyleGridView` on its `habbo-room-ui-com/styleselector_menu_new_xml`
 * template, filled by `ChatStyleSelector`: one `chatinput_chatstyle_template` clone per pickable
 * style in its `itemgrid`, the styles in last first as `createChatStyleSelectorMenuItems` adds
 * them, each its style's `selector_preview` bitmap centred in it (`center()`). The grid is made 4
 * to 6 columns wide (`gridColumns`) and fills a row before starting the next; it grows the menu
 * with it (`reflect_resize_to_parent`). A cell's `background_color` shows only on the picked cell
 * (`showBackgroundOnlyForItem`), grey while the pointer is over it.
 *
 * Under the grid, `font_size_list` holds a `chatinput_chatfontsize_template` clone per font size -
 * S, M, L, XL, XXL for modes 0-4 (`createFontSizeOptions`) - the current mode's background shown
 * and its label dark (`updateFontSizeSelectionHighlight`). A click on either kind picks it and
 * leaves the menu open; a click anywhere else closes it (`hideIfClickAway`). It floats over the room
 * as a desktop window of its own (`FloatingPopup`), at the selector's x with its bottom 55 above the
 * selector's (`alignToSelector`).
 */
const LIBRARY = 'habbo-room-ui-com';

/** `RoomChatInputView.createChatStyleSelectorMenuItems`: `gridColumns = clamp(count / 6 + 1, 4, 6)`. */
const MIN_COLUMNS = 4;
const MAX_COLUMNS = 6;
/** `ChatStyleSelector.GRID_SPACING`. */
const GRID_SPACING = 1;
/** `ChatStyleGridView.alignToSelector`: the menu's bottom sits 55 above the selector's. */
const MENU_ABOVE_SELECTOR = 55;
/** `gridItemWindowProc` / `fontSizeItemWindowProc`: `background_color` under the pointer (4291875024) and off it. */
const BACKGROUND_HOVER = 0xd0d0d0;
const BACKGROUND = 0xffffff;
/** `updateFontSizeSelectionHighlight`: the picked label 0x333333, the others 0x999999. */
const FONT_SIZE_LABEL_SELECTED = 0x333333;
const FONT_SIZE_LABEL = 0x999999;

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

/** A style's selector preview, registered under a name of its own for the template's bitmap to show. */
const previewAsset = (style: IChatStyle): string | undefined => {
    const texture = style.selectorPreviewTexture;

    if (!texture) return undefined;

    const name = `chat_style_preview_${style.id}_${texture.uid}`;

    if (GetAssetManager().getTexture(name) !== texture) GetAssetManager().setTexture(name, texture);

    return name;
};

export const ChatStyleSelectorView = ({ anchor, styles, selectedStyleId, onSelect, fontSizeMode, onSelectFontSize, onClose }: ChatStyleSelectorViewProps) => {
    const menu = useTemplate(`${LIBRARY}/styleselector_menu_new_xml`);
    const entry = useTemplate(`${LIBRARY}/chatinput_chatstyle_template_xml`);
    const fontSize = useTemplate(`${LIBRARY}/chatinput_chatfontsize_template_xml`);
    const [ hovered, setHovered ] = useState<string | undefined>(undefined);

    if (!menu || !entry || !fontSize) return null;

    const hover = (key: string) => ({
        onPointerOver: () => setHovered(key),
        onPointerOut: () => setHovered(current => ((current === key) ? undefined : current)),
    });

    // `gridColumns`: the grid as wide as its columns of entries, one pixel apart.
    const columns = Math.trunc(Math.min(Math.max((styles.length / 6) + 1, MIN_COLUMNS), MAX_COLUMNS));
    const gridWidth = ((columns - 1) * (entry.width + GRID_SPACING)) + entry.width;
    const rows = Math.max(1, Math.ceil(styles.length / columns));
    // The grid grows the menu by as much as its rows outgrow the layout's grid (`reflect_resize_to_parent`).
    const grid = menu.elements[0]?.children.find(child => child.name === 'itemgrid');
    const gridHeight = (rows * (entry.height + GRID_SPACING)) - GRID_SPACING;
    const menuHeight = menu.height + (gridHeight - (grid?.height ?? gridHeight));
    const menuWidth = menu.width + (gridWidth - (grid?.width ?? gridWidth));

    const styleItems: TemplateItem[] = [ ...styles ].reverse().map((style) => {
        const key = `style_${style.id}`;

        return {
            key,
            from: entry,
            bindings: {
                '': { onPointerTap: () => onSelect(style.id), ...hover(key) },
                background_color: { visible: style.id === selectedStyleId, color: (hovered === key) ? BACKGROUND_HOVER : BACKGROUND },
                bubble_preview: { asset: previewAsset(style) },
            },
            // `bubble_preview.center()`.
            arrange: ({ root, find }: TemplateWindows) => {
                const region = root();
                const preview = find('bubble_preview');

                if (region && preview) {
                    preview.setX(Math.trunc((region.width - preview.width) / 2));
                    preview.setY(Math.trunc((region.height - preview.height) / 2));
                }
            },
        };
    });

    const fontSizeItems: TemplateItem[] = CHAT_FONT_SIZE_LABELS.map((label, mode) => {
        const key = `font_size_${mode}`;
        const selected = mode === fontSizeMode;

        return {
            key,
            from: fontSize,
            bindings: {
                '': { onPointerTap: () => onSelectFontSize(mode), ...hover(key) },
                background_color: { visible: selected, color: (hovered === key) ? BACKGROUND_HOVER : BACKGROUND },
                label: { caption: label, setCaptionAfterBuild: true, color: selected ? FONT_SIZE_LABEL_SELECTED : FONT_SIZE_LABEL },
            },
        };
    });

    return (
        <FloatingPopup
            x={Math.round(anchor.x)}
            y={Math.round(anchor.y + anchor.height) - MENU_ABOVE_SELECTOR - menuHeight}
            onOutsideClick={onClose}
            layout={{ width: menuWidth, height: menuHeight }}
        >
            <TemplateWindow
                id={`${LIBRARY}/styleselector_menu_new_xml`}
                bindings={{
                    itemgrid: { items: styleItems },
                    font_size_list: { items: fontSizeItems },
                }}
                arrange={({ find }) => find('itemgrid')?.setWidth(gridWidth)}
            />
        </FloatingPopup>
    );
};
