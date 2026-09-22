/**
 * The me menu and progression menu over the bottom bar - `toolbar/abstractsubmenu/AbstractSubMenuController`
 * on the `me_menu_new_view` / `prog_menu_view` layouts: a style 6 border tinted `0x3b3933`, and in
 * it a boxsizer at 3, 3 (`spacing` 8, `padding_horizontal` 12, `padding_vertical` 2) of 60 x 48
 * regions closed by the 7-wide `spacer`. Each region draws its icon grey until the pointer is over
 * it (`<name>_icon_color` / `<name>_icon_grey` swapped on `WME_OVER` / `WME_OUT`) and its
 * `field_text` - `u_regular` at 9 px, auto-sized and centred at y 32 - white, or `0x21cff4` while
 * hovered. The window sits at x 3 with its bottom on the bottom bar's top (`reposition`).
 */
import { useState } from 'react';

import { Border, Box, ImageProps, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

/** `me_menu_new_view`'s height after `MeMenuNewController.setGuideToolVisibility`: `profile.bottom + 5`. */
export const ME_MENU_HEIGHT = 55;
/** `prog_menu_view`'s height. */
export const PROG_MENU_HEIGHT = 53;

/** `BottomBarLeft`'s window height: the menu's bottom sits on its top. */
const BAR_HEIGHT = 46;
const ITEM_WIDTH = 60;
const ITEM_HEIGHT = 48;

/** `AbstractSubMenuController.windowProcedure`: the caption colour on `WME_OVER` / `WME_OUT`. */
const TEXT_COLOR_HOVER = '#21cff4';
const TEXT_COLOR = '#ffffff';

interface IconPlacement {
    rect: [ number, number, number, number ];
    /** `pivot_point`; none means the layout left the bitmap stretched. */
    pivot?: NonNullable<ImageProps['bitmap']>['pivot'];
}

/** Each `<name>_icon_color` bitmap of the two layouts, by asset. */
const ICONS: Record<string, IconPlacement> = {
    me_menu_me_profile: { rect: [ 14, 0, 32, 30 ], pivot: 'center' },
    me_menu_me_rooms: { rect: [ 14, 0, 32, 30 ] },
    me_menu_me_clothing: { rect: [ 14, 0, 32, 30 ], pivot: 'top center' },
    me_menu_me_forums: { rect: [ 14, 0, 32, 30 ], pivot: 'center' },
    me_menu_me_cabinet: { rect: [ 14, 0, 32, 30 ], pivot: 'center' },
    prog_menu_daily_tasks: { rect: [ 14, 0, 32, 30 ], pivot: 'center' },
    prog_menu_quests: { rect: [ 14, 0, 32, 30 ], pivot: 'center' },
    me_menu_me_achv: { rect: [ 14, 0, 32, 30 ], pivot: 'center' },
    prog_menu_leaderboards: { rect: [ 17, 4, 25, 25 ], pivot: 'center' },
    prog_menu_introduction: { rect: [ 14, 0, 33, 32 ], pivot: 'center' },
};

interface ToolbarExtendedMenuButton {
    icon: string;
    caption: string;
    tooltip?: string;
    action?: () => void;
}

interface ToolbarExtendedMenuProps {
    buttons: ToolbarExtendedMenuButton[];
    /** The window's height: `ME_MENU_HEIGHT` or `PROG_MENU_HEIGHT`. */
    height: number;
    onSelect?: () => void;
}

const ToolbarExtendedMenuItem = ({ button, onSelect }: { button: ToolbarExtendedMenuButton; onSelect?: () => void }) => {
    const [ hovering, setHovering ] = useState(false);
    const { rect: [ x, y, width, height ], pivot } = ICONS[button.icon] ?? { rect: [ 14, 0, 32, 30 ] };

    return (
        <Region
            onPointerOver={() => setHovering(true)}
            onPointerOut={() => setHovering(false)}
            onPointerTap={onSelect}
            layout={{ width: ITEM_WIDTH, height: ITEM_HEIGHT, flexShrink: 0 }}
            tooltip={button.tooltip?.length ? button.tooltip : undefined}
        >
            <ThemeImage
                src={LayoutImage(`toolbar/${button.icon}.png`)}
                bitmap={pivot ? { stretchedX: false, stretchedY: false, pivot } : {}}
                greyscale={!hovering}
                layout={{ position: 'absolute', left: x, top: y, width, height }}
            />
            <Box layout={{ position: 'absolute', left: 0, top: 32, width: ITEM_WIDTH, height: 14, flexDirection: 'row', justifyContent: 'center' }}>
                <ThemeText
                    text={button.caption}
                    textStyle="u_regular"
                    textOptions={{ fill: hovering ? TEXT_COLOR_HOVER : TEXT_COLOR, fontSize: 9 }}
                    verticalAlign="top"
                    layout={{ maxWidth: ITEM_WIDTH }}
                />
            </Box>
        </Region>
    );
};

export const ToolbarExtendedMenu = ({ buttons, height, onSelect }: ToolbarExtendedMenuProps) => {
    const choose = (action: () => void) => () => {
        action?.();
        onSelect?.();
    };

    return (
        <Border
            variant="6"
            tintColor="#3b3933"
            layout={{ position: 'absolute', left: 3, bottom: BAR_HEIGHT, height, flexDirection: 'row', alignItems: 'flex-start', gap: 8, paddingLeft: 3 + 12, paddingTop: 3 + 2 }}
        >
            {buttons.map(button => (
                <ToolbarExtendedMenuItem
                    key={button.icon}
                    button={button}
                    onSelect={button.action ? choose(button.action) : undefined}
                />
            ))}
            <Box layout={{ width: 7, height: 30, flexShrink: 0 }} />
        </Border>
    );
};
