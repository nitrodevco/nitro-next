/**
 * The me menu and progression menu over the bottom bar - `toolbar/abstractsubmenu/AbstractSubMenuController`,
 * drawn from the `me_menu_new_view` / `prog_menu_view` templates: a row of regions, each with its
 * `<name>_icon_color` and `<name>_icon_grey` bitmaps and its `field_text`. `windowProcedure` shows the
 * colour icon and turns the caption `0x21cff4` while the pointer is over a region, and puts the grey
 * icon and white back when it leaves; a click hides the menu and runs the region's item
 * (`onSubMenuItemClick`), whatever the item does. A region's unseen count is the window manager's
 * counter, 5 in from the region's right and top (`getUnseenItemCounter`).
 *
 * A region the code adds (`ProgMenuController.onRewardTracks`: one per reward track) is a clone of a
 * layout's region with its own name and caption, put in the menu's list before its last window
 * (`menu_items.addChildAt(clone, numChildren - 1)`, the spacer); the window grows with the list.
 *
 * The window sits at x 3 with its bottom on the bottom bar's top (`reposition`). It is built in window
 * context 2 (`buildFromXML(xml, 2)`), whose desktop is over context 1's windows - the chat input
 * among them, which the menu covers where they meet.
 */
import { useState } from 'react';

import { Box, findTemplateChild, TemplateBinding, TemplateBindings, TemplateElement, TemplateItem, TemplateWindow, useTemplate } from '#base/theme';
import { UnseenItemCounterView } from '#base/views/shared/UnseenItemCounterView';

/** `BottomBarLeft`'s window height: the menu's bottom sits on its top. */
const BAR_HEIGHT = 46;

/** `windowProcedure`'s caption colours. */
const TEXT_COLOR_HOVER = 0x21cff4;
const TEXT_COLOR = 0xffffff;

/** Context 2: over every frame (from 100), under the floating popups (90000) and the modal layer (95000). */
const SUB_MENU_Z_INDEX = 80000;

/** `getUnseenItemCounter`: the counter's right and top inset in its region. */
const COUNTER_INSET = 5;

/** The list by name, or by an `@N/@N` path from the root for an unnamed one (the me menu's). */
const findList = (elements: readonly TemplateElement[], listName: string): TemplateElement | undefined => {
    if (!listName.startsWith('@')) return findTemplateChild(elements, listName);

    return listName.split('/').reduce<TemplateElement | undefined>((element, part) => element?.children[Number(part.slice(1))], elements[0]);
};

export interface ToolbarExtendedMenuItem {
    /** The region's name in the layout. */
    name: string;
    /** Every region the layout has is listed; the ones the menu's code hides are `false`. */
    visible: boolean;
    action?: () => void;
    unseenCount?: number;
    /** A clone the code adds: the layout's region it is cloned from, whose `<from>_icon_*` bitmaps it keeps. */
    from?: string;
    /** The clone's `field_text`. */
    caption?: string;
}

interface ToolbarExtendedMenuProps {
    templateId: string;
    items: ToolbarExtendedMenuItem[];
    /** The list the clones are added to (`menu_items`, or `@N/@N` for an unnamed one). */
    listName?: string;
    /** The window's height as its code sets it (`setGuideToolVisibility`). */
    height?: number;
    onClose: () => void;
}

export const ToolbarExtendedMenu = ({ templateId, items, listName, height, onClose }: ToolbarExtendedMenuProps) => {
    const [ hovered, setHovered ] = useState<string | undefined>(undefined);
    const template = useTemplate(templateId);
    const clones = items.filter(item => item.from !== undefined);
    const list = (listName !== undefined) && template ? findList(template.elements, listName) : undefined;

    /** A region's bindings, found in the region itself (`''`): its own, or a clone's. */
    const regionBindings = ({ name, visible, action, unseenCount, from = name, caption }: ToolbarExtendedMenuItem): TemplateBindings => {
        const over = (hovered === name);
        const region: TemplateBinding = {
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

        return {
            '': region,
            [`${from}_icon_color`]: { visible: over },
            [`${from}_icon_grey`]: { visible: !over },
            field_text: { color: over ? TEXT_COLOR_HOVER : TEXT_COLOR, ...(caption !== undefined && { caption }) },
        };
    };
    const bindings: TemplateBindings = {};

    if (list && clones.length) {
        // The list's windows as clones, in its order, the code's before its last one.
        const own = items.filter(item => item.from === undefined);
        const item = (element: TemplateElement, index: number): TemplateItem => {
            const region = own.find(item => item.name === element.name);

            return { key: element.name ?? `@${index}`, from: element, bindings: region && regionBindings(region) };
        };
        const children = list.children.map(item);

        bindings[listName as string] = {
            items: [
                ...children.slice(0, -1),
                ...clones.map(clone => ({ key: clone.name, from: clone.from as string, bindings: regionBindings(clone) })),
                ...children.slice(-1),
            ],
        };
    } else {
        for (const item of items) {
            if (item.from !== undefined) continue;

            for (const [ key, binding ] of Object.entries(regionBindings(item))) bindings[key ? `${item.name}/${key}` : item.name] = binding;
        }
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
