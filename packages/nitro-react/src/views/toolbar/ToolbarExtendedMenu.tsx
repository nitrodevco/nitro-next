/**
 * The me menu and progression menu over the bottom bar - `toolbar/abstractsubmenu/AbstractSubMenuController`,
 * drawn from the `me_menu_new_view` / `prog_menu_view` templates: a row of regions, each with its
 * `<name>_icon_color` and `<name>_icon_grey` bitmaps and its `field_text`. `windowProcedure` shows the
 * colour icon and turns the caption `0x21cff4` while the pointer is over a region, and puts the grey
 * icon and white back when it leaves; a click hides the menu and runs the region's item
 * (`onSubMenuItemClick`), whatever the item does. A region's unseen count is the window manager's
 * counter, 5 in from the region's right and top (`getUnseenItemCounter`).
 *
 * The window sits at x 3 with its bottom on the bottom bar's top (`reposition`). It is built in window
 * context 2 (`buildFromXML(xml, 2)`), whose desktop is over context 1's windows - the chat input
 * among them, which the menu covers where they meet.
 */
import { useState } from 'react';

import { Box, TemplateBindings, TemplateWindow } from '#base/theme';
import { UnseenItemCounterView } from '#base/views/system/UnseenItemCounterView';

/** `BottomBarLeft`'s window height: the menu's bottom sits on its top. */
const BAR_HEIGHT = 46;

/** `windowProcedure`'s caption colours. */
const TEXT_COLOR_HOVER = 0x21cff4;
const TEXT_COLOR = 0xffffff;

/** Context 2: over every frame (from 100), under the floating popups (90000) and the modal layer (95000). */
const SUB_MENU_Z_INDEX = 80000;

/** `getUnseenItemCounter`: the counter's right and top inset in its region. */
const COUNTER_INSET = 5;

export interface ToolbarExtendedMenuItem {
    /** The region's name in the layout. */
    name: string;
    /** Every region the layout has is listed; the ones the menu's code hides are `false`. */
    visible: boolean;
    action?: () => void;
    unseenCount?: number;
}

interface ToolbarExtendedMenuProps {
    templateId: string;
    items: ToolbarExtendedMenuItem[];
    /** The window's height as its code sets it (`setGuideToolVisibility`). */
    height?: number;
    onClose: () => void;
}

export const ToolbarExtendedMenu = ({ templateId, items, height, onClose }: ToolbarExtendedMenuProps) => {
    const [ hovered, setHovered ] = useState<string | undefined>(undefined);
    const bindings: TemplateBindings = {};

    for (const { name, visible, action, unseenCount } of items) {
        const over = (hovered === name);

        bindings[name] = {
            visible,
            onPointerOver: () => setHovered(name),
            onPointerOut: () => setHovered(current => ((current === name) ? undefined : current)),
            onPointerTap: () => {
                onClose();
                action?.();
            },
            children: unseenCount
                ? (
                        <UnseenItemCounterView
                            count={unseenCount}
                            layout={{ position: 'absolute', right: COUNTER_INSET, top: COUNTER_INSET }}
                        />
                    )
                : undefined,
        };
        bindings[`${name}_icon_color`] = { visible: over };
        bindings[`${name}_icon_grey`] = { visible: !over };
        bindings[`${name}/field_text`] = { color: over ? TEXT_COLOR_HOVER : TEXT_COLOR };
    }

    return (
        <Box
            zIndex={SUB_MENU_Z_INDEX}
            layout={{ position: 'absolute', left: 3, bottom: BAR_HEIGHT }}
        >
            <TemplateWindow
                id={templateId}
                bindings={bindings}
                // `window.height = ...` sets the height alone; the window keeps the width its items give it.
                arrange={(height !== undefined) ? ({ root }) => root()?.setHeight(height) : undefined}
            />
        </Box>
    );
};
