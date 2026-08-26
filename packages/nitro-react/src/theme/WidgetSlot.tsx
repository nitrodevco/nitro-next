import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ReactNode } from 'react';

import { Box, BoxLayout } from './Box';
import { ThemeLayoutMeta } from './utils';

export interface WidgetSlotProps extends ThemeLayoutMeta {
    /** The Flash `widget_type` variable: `avatar_image`, `badge_image`, `countdown`, `room_previewer`, ... */
    widgetType: string;
    /** The rest of the element's variables, keyed as in the XML (`badge_image:stretched_x`, ...). */
    options?: Record<string, string>;
    layout?: BoxLayout;
    children?: ReactNode;
}

/**
 * Placeholder for the Flash `widget` element - a slot the client filled at runtime with a
 * dynamic view (an avatar render, a badge, a countdown, a room previewer). Ported layouts keep
 * the slot's position/size and type so a real implementation can be dropped in per type
 * later; until then it renders only whatever `children` a caller chooses to put in it.
 */
export const WidgetSlot = forwardRef<PixiContainer, WidgetSlotProps>(({ layout, visible, children }, ref) => (
    <Box
        ref={ref}
        visible={visible}
        layout={layout ?? {}}
    >
        {children}
    </Box>
));

WidgetSlot.displayName = 'WidgetSlot';
