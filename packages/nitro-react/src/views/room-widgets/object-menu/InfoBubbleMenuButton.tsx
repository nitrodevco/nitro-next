/**
 * One row of a room object menu, as every menu layout builds it (`avatar_menu_widget`,
 * `own_avatar_menu`, `pet_menu`, `own_pet_menu`, and `RentableBotMenuView`, which reuses
 * `avatar_menu_widget`): a `container` the height of the row holding a `container_button` that
 * is deliberately larger than it and offset up and to the left, so the skin's rounded corners
 * fall outside the row and the row reads as a flat bar.
 *
 * - An action row is a 26px `container` over a 35px `container_button` of style 3
 *   (`habbo_skin_button_shiny_thick`) at (-3, -4), tinted `0x2d2a27`, with a `u_regular` white
 *   label at (3, 9) - i.e. 5px down from the row's own top - centred over the row's width.
 * - A grid cell (the sign grid, the relationship grid) is a 25px `container` over a 29px
 *   `container_button` of style 0 (`habbo_skin_button_default`) at (-3, -3) with the same tint,
 *   its content centred in a 17px band at (0, 7).
 *
 * The layouts vary the button's width by a pixel or two either side of the row; since the row
 * clips it, only how far into the nine-slice the cut falls is visible, so both shapes overhang
 * by the same 3px here.
 */
import { ReactNode } from 'react';

import { Box, ContainerButton, ThemeText } from '#base/theme';

/** The `container_button` style each shape draws, and how far it overhangs its row. */
const SHAPES = {
    action: { variant: '3', top: -4, extraHeight: 9, contentTop: 9 },
    grid: { variant: '0', top: -3, extraHeight: 4, contentTop: 7 },
} as const;

export interface InfoBubbleMenuButtonProps {
    /** Which layout shape this row is - the full-width action list, or a cell of a grid. */
    shape?: keyof typeof SHAPES;
    /** The row's own size; the button is drawn larger than this and clipped to it. */
    width?: number | `${number}%`;
    height?: number;
    /** Already translated. Drawn as the layout's `u_regular` (action) / `u_bold` (grid) white label. */
    caption?: string;
    /** Drawn in the caption's place - the sign grid's icons, the relationship grid's bitmaps. */
    children?: ReactNode;
    disabled?: boolean;
    onPress: () => void;
}

export const InfoBubbleMenuButton = ({ shape = 'action', width = '100%', height = 26, caption, children, disabled, onPress }: InfoBubbleMenuButtonProps) => {
    const { variant, top, extraHeight, contentTop } = SHAPES[shape];

    return (
        <Box layout={{ width, height, flexShrink: 0, overflow: 'hidden' }}>
            <ContainerButton
                variant={variant}
                tintColor="#2d2a27"
                disabled={disabled}
                onPointerTap={disabled ? undefined : onPress}
                layout={{ position: 'absolute', left: -3, right: -3, top, height: height + extraHeight }}
            >
                <Box layout={{ position: 'absolute', left: 3, right: 3, top: contentTop, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {caption
                        ? (
                                <ThemeText
                                    text={caption}
                                    textStyle={shape === 'grid' ? 'text-style-u-bold' : 'text-style-u-regular'}
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            )
                        : children}
                </Box>
            </ContainerButton>
        </Box>
    );
};
