/**
 * One row of a room object menu, as every menu layout builds it (`avatar_menu_widget`,
 * `own_avatar_menu`, `pet_menu`, `own_pet_menu`, `own_avatar_decorating`, and
 * `RentableBotMenuView`, which reuses `avatar_menu_widget`): a `container` the size of the row
 * holding a `container_button` that is deliberately larger than it and offset up and to the left,
 * so the skin's rounded corners fall outside the row and the row reads as a flat bar.
 *
 * - An action row is a 26px `container` (137 wide in `avatar_menu_widget`, 103 in
 *   `own_avatar_menu`, 101 in the pet menus) over a `container_button` of style 3
 *   (`habbo_skin_button_shiny_thick`) at (-3, -4), 6px wider and 9px taller than the row, tinted
 *   `0x2d2a27`. Its `label` is at (3, 9), the row's width, `u_regular` at `font_size` 11 and
 *   centred - white, or `0xff8133` on the moderation and ambassador rows. A row that opens a
 *   sub-page carries icon style 5 at (row width - 9, 12) - (92, 12) in `own_avatar_menu` - and
 *   the `actions` / `back` row icon style 4 at (10, 12), both in the button's own space.
 * - A grid cell (the sign grid, the relationship grid) is a 25px `container` over a
 *   `container_button` of style 0 (`habbo_skin_button_default`) at (-3, -3), 4px wider and taller
 *   than the cell, with the same tint; its content is centred over the button in a 17px band at
 *   y 7 - a `u_bold` number, or a bitmap.
 */
import { ReactNode } from 'react';

import { Box, ContainerButton, Icon, ThemeText } from '#base/theme';

/** The `container_button` style each shape draws, and how far it overhangs its row. */
const SHAPES = {
    action: { variant: '3', top: -4, extraWidth: 6, extraHeight: 9, contentTop: 9 },
    grid: { variant: '0', top: -3, extraWidth: 4, extraHeight: 4, contentTop: 7 },
} as const;

/** The label colour of the `moderate` and `ambassador` rows. */
export const MENU_MODERATION_COLOR = '#ff8133';

export interface InfoBubbleMenuButtonProps {
    /** Which layout shape this row is - the full-width action list, or a cell of a grid. */
    shape?: keyof typeof SHAPES;
    /** The row's own size; the button is drawn larger than this and clipped to it. A percentage fills the column. */
    width?: number | `${number}%`;
    height?: number;
    /** The `container_button`'s own width, where the layout does not keep it a fixed amount wider than the row (the sign grid's 39 over 33- and 34-wide cells). */
    buttonWidth?: number;
    /** Already translated. Drawn as the layout's `u_regular` 11 (action) / `u_bold` (grid) label. */
    caption?: string;
    /** The label's `text_color`: white, or `MENU_MODERATION_COLOR`. */
    captionColor?: string;
    /** `arrow_right` (icon style 5) on a row that opens a sub-page, `arrow_left` (style 4) on the way back. */
    arrow?: 'right' | 'left';
    /** The right arrow's x in the button: `width - 9` in every layout but `own_avatar_menu`, which puts it at 92. */
    arrowX?: number;
    /** Drawn in the caption's place - the sign grid's icons, the relationship grid's bitmaps. */
    children?: ReactNode;
    /** Laid over the button in its own space - the duckets icon of `replenish_respect`, the VIP icon of an expression. */
    adornment?: ReactNode;
    tooltip?: string;
    disabled?: boolean;
    onPress: () => void;
}

export const InfoBubbleMenuButton = ({ shape = 'action', width = '100%', height = 26, buttonWidth, caption, captionColor = '#ffffff', arrow, arrowX, children, adornment, tooltip, disabled, onPress }: InfoBubbleMenuButtonProps) => {
    const { variant, top, extraWidth, extraHeight, contentTop } = SHAPES[shape];
    // A row of a known width places the button and its label by number; a percentage row by its edges.
    const fixed = (typeof width === 'number');
    const buttonSpan = fixed ? { left: -3, width: buttonWidth ?? (width + extraWidth) } : { left: -3, right: 3 - extraWidth };
    const labelInset = (shape === 'action') ? 3 : 0;
    const labelSpan = fixed ? { left: labelInset, width: (shape === 'action') ? width : (buttonWidth ?? (width + extraWidth)) } : { left: labelInset, right: labelInset };

    return (
        <Box layout={{ width, height, flexShrink: 0, overflow: 'hidden' }}>
            <ContainerButton
                variant={variant}
                tintColor="#2d2a27"
                tooltip={tooltip}
                disabled={disabled}
                onPointerTap={disabled ? undefined : onPress}
                layout={{ position: 'absolute', ...buttonSpan, top, height: height + extraHeight }}
            >
                <Box layout={{
                    position: 'absolute',
                    ...labelSpan,
                    top: contentTop,
                    height: (shape === 'action') ? 16 : 17,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    // A label sits at the band's top; a bitmap is `pivot_point` centre in it.
                    alignItems: caption ? 'flex-start' : 'center',
                }}
                >
                    {caption
                        ? (
                                <ThemeText
                                    text={caption}
                                    textStyle={(shape === 'grid') ? 'u_bold' : 'u_regular'}
                                    textOptions={(shape === 'grid') ? { fill: captionColor } : { fill: captionColor, fontSize: 11 }}
                                    verticalAlign="top"
                                />
                            )
                        : children}
                </Box>
                {(arrow === 'right') && fixed && (
                    <Icon
                        variant={5}
                        layout={{ position: 'absolute', left: arrowX ?? (width - 9), top: 12 }}
                    />
                )}
                {(arrow === 'left') && (
                    <Icon
                        variant={4}
                        layout={{ position: 'absolute', left: 10, top: 12 }}
                    />
                )}
                {adornment}
            </ContainerButton>
        </Box>
    );
};
