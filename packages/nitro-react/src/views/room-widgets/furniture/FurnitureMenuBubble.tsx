import { useState } from 'react';

import { Bubble, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** One `action` row of the menu's `buttons` list. */
export interface FurnitureMenuButton {
    key: string;
    label: string;
    onPointerTap: () => void;
}

export interface FurnitureMenuBubbleProps {
    /** The caption of the menu's title text (`furni_name`, or `name` on the guild menu). */
    title: string;
    /** `profile_link`'s tooltip on the guild menu; the other menus' title region has none. */
    titleTooltip?: string;
    buttons: FurnitureMenuButton[];
    /**
     * How far below the list's foot the layout puts `minimize`: 1 in `generic_usable_menu`
     * (list 28-54, `minimize` at 55), 0 in `guild_furni_menu` (list 28-108, `minimize` at 108).
     */
    minimizeGap: number;
}

/** `ContextInfoView.onMinimizeHover`: the icon is 0xFF48A4CD under the pointer, white otherwise. */
const MINIMIZE_HOVER_TINT = '#48a4cd';
const MINIMIZE_TINT = '#ffffff';

/** A `buttons` row: 26 high, 1px apart (`spacing`). */
const ROW_HEIGHT = 26;
const ROW_SPACING = 1;

/**
 * The furniture context menu bubble of `generic_usable_menu` and `guild_furni_menu` - the two
 * layouts are the same window (115 wide, a 107 wide `border` container 4px in) and differ only in
 * their rows. The `buttons` item list (at 2, 28) sizes itself to its visible rows
 * (`resize_on_item_update`), and the `border` and the bubble follow it
 * (`reflect_resize_to_parent`), with `minimize` moving down with the list's foot: with the list at
 * `26n + (n - 1)`, the border is `list + 50` high, the bubble `list + 60` and `minimize` sits
 * `minimizeGap` below the list.
 *
 * The title is an `auto_size="left"` text centred in its 107px region (`relative_horizontal_scale_center`).
 * Each row is a 101x26 container clipping its 107x35 `container_button` drawn at (-3, -4), whose
 * label is centred at (3, 9).
 *
 * Minimizing swaps the whole window for `minimized_menu` (`ContextInfoView.getMinimizedView`): a
 * 45x35 bubble whose `minimize` region carries the icon set's style 6 arrow; the arrow of either
 * view is tinted while the pointer is over its region (`onMinimizeHover`).
 */
export const FurnitureMenuBubble = ({ title, titleTooltip, buttons, minimizeGap }: FurnitureMenuBubbleProps) => {
    const [ minimized, setMinimized ] = useState<boolean>(false);
    const [ hovered, setHovered ] = useState<boolean>(false);

    const minimizeTint = hovered ? MINIMIZE_HOVER_TINT : MINIMIZE_TINT;

    const toggle = () => {
        setHovered(false);
        setMinimized(!minimized);
    };

    if (minimized) {
        return (
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                margins={[ 4, 4, 4, 4 ]}
                layout={{ width: 45, height: 35 }}
            >
                <Region
                    cursor="pointer"
                    onPointerTap={toggle}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    layout={{ position: 'absolute', left: 0, top: 0, width: 38, height: 30 }}
                >
                    <Icon
                        variant="6"
                        tintColor={minimizeTint}
                        layout={{ position: 'absolute', left: 14, top: 11, width: 15, height: 15 }}
                    />
                </Region>
            </Bubble>
        );
    }

    const listHeight = buttons.length ? ((buttons.length * ROW_HEIGHT) + ((buttons.length - 1) * ROW_SPACING)) : 0;

    return (
        <Bubble
            variant="0"
            tintColor="#6e6b67"
            margins={[ 4, 4, 4, 4 ]}
            layout={{ width: 115, height: listHeight + 60 }}
        >
            <Region layout={{ position: 'absolute', left: 0, top: 0, width: 107, height: listHeight + 50 }}>
                <Region
                    tooltip={titleTooltip}
                    tooltipDelay={titleTooltip ? 100 : undefined}
                    layout={{ position: 'absolute', left: 0, top: 7, width: 107, height: 16, flexDirection: 'row', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={title}
                        textStyle="u_bold"
                        textOptions={{ fill: '#ffffff', fontSize: 11 }}
                        verticalAlign="top"
                        layout={{ height: 16 }}
                    />
                </Region>
                <Region
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 2, top: 27, width: 103, height: 1 }}
                />
                <Region layout={{ position: 'absolute', left: 2, top: 28, width: 103, height: listHeight, flexDirection: 'column', gap: ROW_SPACING }}>
                    {buttons.map(button => (
                        <Region
                            key={button.key}
                            layout={{ width: 101, height: ROW_HEIGHT, marginLeft: 1, flexShrink: 0, overflow: 'hidden' }}
                        >
                            <ContainerButton
                                variant="3"
                                tintColor="#2d2a27"
                                onPointerTap={button.onPointerTap}
                                layout={{ position: 'absolute', left: -3, top: -4, width: 107, height: 35 }}
                            >
                                <ThemeText
                                    text={button.label}
                                    textStyle="u_regular"
                                    textOptions={{ fill: '#ffffff', fontSize: 11, align: 'center' }}
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 3, top: 9, width: 101, height: 16 }}
                                />
                            </ContainerButton>
                        </Region>
                    ))}
                </Region>
                <Region
                    cursor="pointer"
                    onPointerTap={toggle}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    layout={{ position: 'absolute', left: 4, top: 28 + listHeight + minimizeGap, width: 100, height: 18 }}
                >
                    <Icon
                        variant="7"
                        tintColor={minimizeTint}
                        layout={{ position: 'absolute', left: 45, top: 7, width: 13, height: 10 }}
                    />
                </Region>
            </Region>
        </Bubble>
    );
};
