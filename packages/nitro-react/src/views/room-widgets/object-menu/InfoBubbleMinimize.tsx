/**
 * The `minimize` region at the foot of an avatar / bot menu (`avatar_menu_widget` and the other
 * menu layouts): the icon set's style 7 arrow while the menu is open, style 6 in the minimized
 * view (`minimized_menu`). `ContextInfoView.onMinimizeHover` tints the icon 0x48A4CD while the
 * pointer is over the region, white otherwise.
 */
import { useState } from 'react';

import { Box, Icon } from '#base/theme';

/** `onMinimizeHover`: `4282950861` over, `16777215` out. */
const HOVER_TINT = '#48a4cd';
const TINT = '#ffffff';

export interface InfoBubbleMinimizeProps {
    collapsed: boolean;
    /** `onMinimize` / `onMaximize`; without it the region only shows the arrow. */
    onToggle?: () => void;
}

export const InfoBubbleMinimize = ({ collapsed, onToggle }: InfoBubbleMinimizeProps) => {
    const [ hovered, setHovered ] = useState(false);

    return (
        <Box
            cursor={onToggle ? 'pointer' : undefined}
            onPointerTap={onToggle}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minHeight: 18, maxHeight: 18, padding: 8, width: '100%' }}
        >
            <Icon
                variant={collapsed ? 6 : 7}
                tintColor={hovered ? HOVER_TINT : TINT}
            />
        </Box>
    );
};
