import { Container as PixiContainer } from 'pixi.js';
import { useEffect, useState } from 'react';

import { Box } from '../Box';
import { useLayoutSize } from '../hooks/useLayoutEvent';
import { ThemeText } from '../ThemeText';
import { Tooltip } from '../Tooltip';
import { moveTooltip, useTooltipState } from './tooltipStore';

/** `WindowToolTipAgent`'s offset from the pointer. */
const POINTER_OFFSET = 20;
/** Above every window (`useWindowZIndex` hands those out from 100 up). */
const TOOLTIP_Z_INDEX = 100000;

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

/**
 * The single tooltip window - mount once at the UI root, after everything it should cover.
 * Shows the hovered component's caption (`habbo_window_layout_tooltip`: the `tooltip` skin
 * with a `u_tool_tip` label) 20px right and below the pointer once the delay has passed,
 * follows the pointer while hovered, and stays on screen the way the client's
 * `WINDOW_PARAM_BOUND_TO_PARENT_RECT` kept it inside the stage. The canvas fills the viewport
 * on both render targets, so client coordinates are stage coordinates.
 */
export const TooltipLayer = () => {
    const { owner, text, x, y, visible } = useTooltipState();
    const [ node, setNode ] = useState<PixiContainer | null>(null);
    const { width, height } = useLayoutSize(node);

    useEffect(() => {
        if (owner === null) return;

        const onMove = (event: PointerEvent) => moveTooltip(event.clientX, event.clientY);

        window.addEventListener('pointermove', onMove);

        return () => window.removeEventListener('pointermove', onMove);
    }, [ owner ]);

    if (!visible || !text.length) return null;

    const left = clamp(x + POINTER_OFFSET, 0, Math.max(0, window.innerWidth - width));
    const top = clamp(y + POINTER_OFFSET, 0, Math.max(0, window.innerHeight - height));

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
                    textStyle="text-style-u-tool-tip"
                />
            </Tooltip>
        </Box>
    );
};
