/**
 * The furniture context menu bubble, drawn from its Flash template: `generic_usable_menu`
 * (`GenericUsableFurnitureContextMenuView.updateWindow`) or `guild_furni_menu`
 * (`GuildFurnitureContextMenuView.updateWindow`) - the same window, a title over the `buttons` list
 * and the `minimize` region, differing in their rows. The list sizes itself to its shown rows
 * (`resize_on_item_update`) and the `border` and bubble follow it, as the layout says.
 *
 * What the code does to it is `ButtonMenuView`'s, through `useButtonMenu`: each row the menu offers
 * is shown and pressable (`showButton(key, true)`), every other row of the layout hidden
 * (`showButton(key, false)` - the guild menu's `join` for a member, `open_forum` without a forum),
 * and a row's `button` turns blue under the pointer (`buttonEventProc`). The title is set once the
 * window is built (`furni_name` / `name`'s caption). On the guild menu `profile_link` has
 * `infostand.profile.link.tooltip` at a 100 ms delay, its `name` turns 0x91C2FF under the pointer
 * (`buttonEventProc`) and a press on it opens the group. Minimizing swaps the window for
 * `minimized_menu` (`ContextInfoView.getMinimizedView`, `useMinimizedMenu`).
 *
 * The tooltip delay is not carried: a template binding has no delay, so the theme's default applies.
 */
import { useState } from 'react';

import { TemplateBindings, TemplateWindow } from '#base/theme';

import { useButtonMenu, useMinimizedMenu } from '../object-menu/useButtonMenu';

/** One row of the menu's `buttons` list, by its name in the layout. */
export interface FurnitureMenuButton {
    key: string;
    label: string;
    onPointerTap: () => void;
}

/** The layouts the furniture menus are built from. */
export type FurnitureMenuLayout = 'generic_usable_menu' | 'guild_furni_menu';

export interface FurnitureMenuBubbleProps {
    menu: FurnitureMenuLayout;
    /** The title's caption (`furni_name`, or `name` on the guild menu), already translated. */
    title: string;
    /** `profile_link`'s tooltip on the guild menu. */
    titleTooltip?: string;
    /** `profile_link` on the guild menu opens the group; the generic menu's title is not clickable. */
    onTitleTap?: () => void;
    /** The rows offered, each with its label already translated; the layout's other rows are hidden. */
    buttons: FurnitureMenuButton[];
}

/** Each layout's rows, in its `buttons` list. */
const MENU_ROWS: Record<FurnitureMenuLayout, readonly string[]> = {
    generic_usable_menu: [ 'use' ],
    guild_furni_menu: [ 'join', 'home_room', 'open_forum' ],
};

/** Each layout's title text. */
const TITLE_TEXT: Record<FurnitureMenuLayout, string> = {
    generic_usable_menu: 'furni_name',
    guild_furni_menu: 'name',
};

/** `buttonEventProc`: `profile_link`'s `name` is 0x91C2FF (9552639) under the pointer, white otherwise. */
const PROFILE_LINK_HOVER_COLOR = 0x91c2ff;
const PROFILE_LINK_COLOR = 0xffffff;

export const FurnitureMenuBubble = ({ menu, title, titleTooltip, onTitleTap, buttons }: FurnitureMenuBubbleProps) => {
    const { showButton } = useButtonMenu();
    const { minimizedView, bindings: minimizeBindings } = useMinimizedMenu();
    const [ titleHovered, setTitleHovered ] = useState(false);

    if (minimizedView) return minimizedView;

    const isGuild = (menu === 'guild_furni_menu');

    const bindings: TemplateBindings = {
        ...minimizeBindings,
        [TITLE_TEXT[menu]]: {
            caption: title,
            setCaptionAfterBuild: true,
            ...(isGuild && { color: titleHovered ? PROFILE_LINK_HOVER_COLOR : PROFILE_LINK_COLOR }),
        },
    };

    if (isGuild) {
        bindings.profile_link = {
            tooltip: titleTooltip,
            onPointerTap: onTitleTap,
            onPointerOver: () => setTitleHovered(true),
            onPointerOut: () => setTitleHovered(false),
        };
    }

    for (const row of MENU_ROWS[menu]) {
        const button = buttons.find(each => each.key === row);

        if (button) showButton(bindings, row, button.onPointerTap, { caption: button.label });
        else bindings[row] = { visible: false };
    }

    return (
        <TemplateWindow
            id={`habbo-room-ui-com/${menu}`}
            bindings={bindings}
        />
    );
};
