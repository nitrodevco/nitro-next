import { useEffect, useId, useMemo } from 'react';

import { useLatest } from '../hooks/useLatest';
import { PointerHandler } from '../utils/interaction';
import { beginTooltip, endTooltip, TOOLTIP_DELAY_MS, updateTooltipText } from './tooltipStore';

export interface TooltipHandlers {
    onPointerOver?: PointerHandler;
    onPointerOut?: PointerHandler;
}

/**
 * The hover handlers that show a component's `tooltip` (its `tool_tip_caption`): pointer-over
 * begins the client's tooltip agent at the pointer, pointer-out ends it, and a caption that
 * changes while hovered updates the shown text. Empty for a component with no tooltip, so it
 * stays non-interactive. The pointer's `global` position is the stage's coordinates.
 * `delay` is the component's `tool_tip_delay` (`tooltipDelay`), `TOOLTIP_DELAY_MS` when absent.
 */
export const useTooltipHandlers = (text: string | undefined, delay?: number): TooltipHandlers => {
    const owner = useId();
    const textRef = useLatest(text);
    const delayRef = useLatest(delay);
    const hasTooltip = !!text;

    useEffect(() => {
        updateTooltipText(owner, text ?? '');
    }, [ owner, text ]);

    // A hovered component that unmounts takes its tooltip with it.
    useEffect(() => () => endTooltip(owner), [ owner ]);

    return useMemo<TooltipHandlers>(() => (hasTooltip
        ? {
                onPointerOver: event => beginTooltip(owner, textRef.current ?? '', event.global.x, event.global.y, delayRef.current ?? TOOLTIP_DELAY_MS),
                onPointerOut: () => endTooltip(owner),
            }
        : {}), [ owner, hasTooltip ]);
};
