import { Container as PixiContainer } from 'pixi.js';
import { useEffect, useState } from 'react';

import { Box } from '../Box';
import { useLayoutSize } from '../hooks/useLayoutEvent';
import { useViewportSize } from '../hooks/useViewportSize';
import { ThemeText } from '../ThemeText';
import { Tooltip } from '../Tooltip';
import { clamp } from '../utils/clamp';
import { ClientToStage } from '../utils/GetPixelRatio';
import { moveTooltip, useTooltipState } from './tooltipStore';

/** `WindowToolTipAgent`'s offset from the pointer. */
const POINTER_OFFSET = 20;
/** Above every window (the host's `useWindowZIndex` hands those out from 100 up). */
const TOOLTIP_Z_INDEX = 100000;

/**
 * The single tooltip window - mount once at the UI root, after everything it should cover.
 * Shows the hovered component's caption (`habbo_window_layout_tooltip`: the `tooltip` skin
 * with a `u_tool_tip` label) 20px right and below the pointer once the delay has passed,
 * follows the pointer while hovered, and stays on screen the way the `bound_to_parent_rect`
 * param (`0x20`) `WindowToolTipAgent` creates it with kept it inside the stage - the stage as it is
 * now (`useViewportSize`), not as it was when the tooltip first showed. The canvas fills the
 * viewport, so client coordinates are stage coordinates once scaled (`ClientToStage`).
 */
export const TooltipLayer = () => {
    const { owner, text, x, y, visible } = useTooltipState();
    const [ node, setNode ] = useState<PixiContainer | null>(null);
    const { width, height } = useLayoutSize(node);
    const desktop = useViewportSize();

    useEffect(() => {
        if (owner === null) return;

        const onMove = (event: PointerEvent) => moveTooltip(ClientToStage(event.clientX), ClientToStage(event.clientY));

        window.addEventListener('pointermove', onMove);

        return () => window.removeEventListener('pointermove', onMove);
    }, [ owner ]);

    if (!visible || !text.length) return null;

    const left = clamp(x + POINTER_OFFSET, 0, Math.max(0, desktop.width - width));
    const top = clamp(y + POINTER_OFFSET, 0, Math.max(0, desktop.height - height));

    return (
        <Box
            ref={setNode}
            zIndex={TOOLTIP_Z_INDEX}
            eventMode="none"
            layout={{ position: 'absolute', left, top }}
        >
            <Tooltip>
                <ThemeText
                    text={text}
                    textStyle="u_tool_tip"
                />
            </Tooltip>
        </Box>
    );
};
