/**
 * A Flash drop menu (`DropMenuController` / `DropBaseController`): the closed menu shows `caption`,
 * a tap opens the expanded menu view, a pick or a press anywhere outside closes it.
 *
 * - The expanded view is Flash's: a second window of the same skin laid over the menu's own
 *   rectangle and grown round the items (`DropmenuFrame expanded`), so frame and list are one
 *   piece. It floats above every window (`FloatingPopup`) - a window clips its content, and the
 *   list must be hit-testable over its whole area, not just where the closed menu lies.
 * - `placeExpandedDropmenu` keeps it on the screen and cuts it to the desktop's height less 30,
 *   where the list scrolls (`fitToDesktop`).
 * - A menu with no options does not open (`openExpandedMenuView` needs `numMenuItems > 0`).
 * - An option marked `keepOpen` acts without closing the view - the wired dropdown's "show more",
 *   which lists more options in place (Flash `populate(..., true)` + `openMenu`).
 *
 * Options carry their own `onSelect`, so a caller decides what a pick means (an index, an id, a
 * refusal: Flash's `WE_SELECT` + `preventWindowOperation` is simply not acting).
 */
import { Container as PixiContainer } from 'pixi.js';
import { Key, useRef, useState } from 'react';

import { Box, BoxLayout } from './Box';
import { DropmenuFrame } from './DropmenuFrame';
import { DropmenuItem } from './DropmenuItem';
import { FloatingPopup } from './FloatingPopup';
import { placeExpandedDropmenu } from './utils/dropmenuPlacement';
import { getGlobalRect } from './utils/getGlobalRect';
import { TextStyleKey } from './utils/textStyles';

/** `dropmenu_item*` layouts: one item row. */
const DEFAULT_ITEM_HEIGHT = 19;
/** The closed menu's caption keeps clear of the arrow. */
const ARROW_SPACE = 24;
/** How long after an outside press closed the view a tap on the menu is taken as that same press. */
const REOPEN_GUARD_MS = 300;

export interface DropmenuOption {
    key: Key;
    label: string;
    selected?: boolean;
    disabled?: boolean;
    /** Act without closing the view. */
    keepOpen?: boolean;
    onSelect: () => void;
}

export interface DropmenuProps {
    variant?: string;
    defaultVariant?: string;
    tooltip?: string;
    tintColor?: string;
    textStyle?: TextStyleKey;
    textColor?: string;
    /** What the closed menu shows - the selected option's label, or a prompt. */
    caption?: string;
    options?: readonly DropmenuOption[];
    disabled?: boolean;
    /** One option row's height. */
    itemHeight?: number;
    /** The closed menu's box. */
    layout?: BoxLayout;
    visible?: boolean;
    zIndex?: number;
    /** `WE_EXPANDED` / `WE_COLLAPSE`. */
    onOpenChange?: (open: boolean) => void;
}

interface OpenMenu {
    anchor: { x: number; y: number; width: number; height: number };
    desktop: { width: number; height: number };
}

export const Dropmenu = ({
    variant, defaultVariant, tooltip, tintColor, textStyle, textColor, caption = '', options = [], disabled = false,
    itemHeight = DEFAULT_ITEM_HEIGHT, layout, visible, zIndex, onOpenChange,
}: DropmenuProps) => {
    const anchorRef = useRef<PixiContainer>(null);
    // Set while the press that just closed the view from outside may still end as a tap on the menu.
    const closedFromOutsideRef = useRef(false);
    const [ open, setOpen ] = useState<OpenMenu | null>(null);
    // Placed again from the current options, so a `keepOpen` pick that lists more re-fits the view.
    const placement = open ? placeExpandedDropmenu(open.anchor, options.length * itemHeight, open.desktop) : null;

    const close = () => {
        setOpen(null);
        onOpenChange?.(false);
    };

    const closeFromOutside = () => {
        closedFromOutsideRef.current = true;
        setTimeout(() => (closedFromOutsideRef.current = false), REOPEN_GUARD_MS);
        close();
    };

    const toggle = () => {
        if (open) return close();

        // The press that closed the view from outside also taps the menu when it lands on it.
        if (closedFromOutsideRef.current) return;

        const anchor = anchorRef.current;

        if (!anchor || disabled || !options.length) return;

        const rect = getGlobalRect(anchor);

        setOpen({
            anchor: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
            desktop: { width: window.innerWidth, height: window.innerHeight },
        });
        onOpenChange?.(true);
    };

    const pick = (option: DropmenuOption) => {
        if (option.disabled) return;

        if (!option.keepOpen) close();

        option.onSelect();
    };

    return (
        <>
            <Box
                alpha={disabled ? 0.5 : 1}
                visible={visible}
                zIndex={zIndex}
                layout={{ flexShrink: 0, flexGrow: layout?.flexGrow, width: layout?.width, height: layout?.height, flexDirection: 'row' }}
            >
                <DropmenuFrame
                    ref={anchorRef}
                    variant={variant}
                    defaultVariant={defaultVariant}
                    tooltip={tooltip}
                    tintColor={tintColor}
                    textStyle={textStyle}
                    textColor={textColor}
                    onPointerTap={toggle}
                    layout={{ flexGrow: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 4, paddingRight: ARROW_SPACE, ...layout }}
                >
                    {caption}
                </DropmenuFrame>
            </Box>
            {open && placement && (
                <FloatingPopup
                    x={placement.x}
                    y={placement.y}
                    onOutsideClick={closeFromOutside}
                    layout={{ minWidth: open.anchor.width, flexDirection: 'column' }}
                >
                    <DropmenuFrame
                        variant={variant}
                        defaultVariant={defaultVariant}
                        tintColor={tintColor}
                        textStyle={textStyle}
                        textColor={textColor}
                        expanded
                        listHeight={placement.listHeight}
                        layout={{ minWidth: open.anchor.width, height: placement.height }}
                    >
                        {options.map(option => (
                            <DropmenuItem
                                key={option.key}
                                variant={variant}
                                textStyle={textStyle}
                                textColor={textColor}
                                selected={option.selected}
                                onPointerTap={() => pick(option)}
                                layout={{ width: '100%', height: itemHeight, flexShrink: 0, flexDirection: 'row', alignItems: 'center' }}
                            >
                                {option.label}
                            </DropmenuItem>
                        ))}
                    </DropmenuFrame>
                </FloatingPopup>
            )}
        </>
    );
};
