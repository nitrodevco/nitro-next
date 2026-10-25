/**
 * What every room object menu's code does to its Flash template - `ButtonMenuView` and the
 * `ContextInfoView` under it: `showButton` over a row of the `buttons` list, the hover colour of a
 * row's `button`, and the `minimize` region with the `minimized_menu` it collapses to.
 */
import { useState } from 'react';

import { TemplateBinding, TemplateBindings, TemplateWindow } from '#base/theme';

/** `ContextInfoView.BUTTON_COLOR_DEFAULT` (`0xff2d2a27`) and `BUTTON_COLOR_HOVER` (`0xff48a4cd`). */
const BUTTON_COLOR = 0x2d2a27;
const BUTTON_HOVER_COLOR = 0x48a4cd;

/** `showButton`'s label colours: an enabled row's, and a disabled row's or a VIP advert's. */
const LABEL_COLOR = 0xffffff;
const LABEL_DISABLED_COLOR = 0x585553;

/** `ICON_COLOR_ENABLED` and `ICON_COLOR_DISABLED`. */
const ICON_COLOR = 0xd4d0cd;
const ICON_DISABLED_COLOR = 0x585553;

/** `ContextInfoView.onMinimizeHover`: the icon blue under the pointer, white otherwise. */
const MINIMIZE_COLOR = 0xffffff;
const MINIMIZE_HOVER_COLOR = 0x48a4cd;

export interface ShowButtonOptions {
    /** Over the row's `${key}` caption (a parameter the layout's text has none of). */
    caption?: string;
    /** `showButton`'s third argument: the button enabled. */
    enabled?: boolean;
    /** The fourth: a VIP feature offered to a user without VIP - pressable, its label grey. */
    vipAdvert?: boolean;
    /** The fifth: the row's ducket icon shown. */
    ducket?: boolean;
    /** The row's button holds an `icon` - its `arrow_left` or `arrow_right`. */
    hasIcon?: boolean;
    tooltip?: string;
}

/**
 * `ButtonMenuView.showButton` and `buttonEventProc` over a menu's rows, as bindings.
 *
 * `showButton` enables the row's `button` (or a VIP advert's), colours its `label`, and shows its
 * `icon` only for a VIP advert or a ducket row - so a sub-page's arrow, which no menu passes either
 * for, is hidden. `buttonEventProc` colours a `button` blue while the pointer is over it; a menu
 * whose own procedure keeps `WME_OVER` from it (`AvatarMenuView`) passes `recolorsOnHover` false. A
 * disabled window takes no mouse events, so a disabled row never turns blue.
 */
export const useButtonMenu = (recolorsOnHover = true) => {
    const [ hovered, setHovered ] = useState<string | undefined>(undefined);

    /** A `button`'s binding, by its path in the template: its press, and its colour under the pointer. */
    const button = (path: string, onPress: () => void, enabled = true, tooltip?: string): TemplateBinding => ({
        disabled: !enabled,
        tooltip,
        onPointerTap: enabled ? onPress : undefined,
        ...(recolorsOnHover && {
            color: (enabled && (hovered === path)) ? BUTTON_HOVER_COLOR : BUTTON_COLOR,
            onPointerOver: () => setHovered(path),
            onPointerOut: () => setHovered(current => ((current === path) ? undefined : current)),
        }),
    });

    /** `showButton(key, true, enabled, vipAdvert, ducket)` for a shown row, with what its press does. */
    const showButton = (bindings: TemplateBindings, key: string, onPress: () => void, options: ShowButtonOptions = {}) => {
        const { caption, enabled = true, vipAdvert = false, ducket = false, hasIcon = false, tooltip } = options;
        const active = enabled || vipAdvert;

        bindings[`${key}/button`] = button(`${key}/button`, onPress, active, tooltip);
        bindings[`${key}/button/label`] = { caption, color: (active && !vipAdvert) ? LABEL_COLOR : LABEL_DISABLED_COLOR };

        if (hasIcon) bindings[`${key}/button/icon`] = { visible: vipAdvert || ducket, color: active ? ICON_COLOR : ICON_DISABLED_COLOR };
    };

    return { button, showButton };
};

/**
 * `ContextInfoView`'s `minimize` region: `onMinimize` collapses the menu to `minimized_menu`
 * (`getMinimizedView`), whose own `minimize` brings it back (`onMaximize`); either icon turns blue
 * under the pointer (`onMinimizeHover`). `bindings` go on the menu's template; while `minimized`,
 * `minimizedView` is drawn in its place.
 */
export const useMinimizedMenu = () => {
    const [ minimized, setMinimized ] = useState(false);
    const [ hovered, setHovered ] = useState(false);

    const toggle = () => {
        setMinimized(!minimized);
        setHovered(false);
    };

    const bindings: TemplateBindings = {
        minimize: { onPointerTap: toggle, onPointerOver: () => setHovered(true), onPointerOut: () => setHovered(false) },
        'minimize/icon': { color: hovered ? MINIMIZE_HOVER_COLOR : MINIMIZE_COLOR },
    };

    const minimizedView = minimized
        ? (
                <TemplateWindow
                    id="habbo-room-ui-com/minimized_menu"
                    bindings={bindings}
                />
            )
        : null;

    return { minimized, minimizedView, bindings };
};
