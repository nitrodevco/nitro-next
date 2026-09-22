import { useEffect, useId, useMemo, useRef } from 'react';

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
 * stays non-interactive. Both render targets' pointer events carry `clientX`/`clientY`.
 * `delay` is the component's `tool_tip_delay` (`tooltipDelay`), `TOOLTIP_DELAY_MS` when absent.
 */
export const useTooltipHandlers = (text: string | undefined, delay?: number): TooltipHandlers => {
    const owner = useId();
    const textRef = useRef(text);
    const delayRef = useRef(delay);
    const hasTooltip = !!text;

    useEffect(() => {
        textRef.current = text;
        delayRef.current = delay;
        updateTooltipText(owner, text ?? '');
    }, [ owner, text, delay ]);

    // A hovered component that unmounts takes its tooltip with it.
    useEffect(() => () => endTooltip(owner), [ owner ]);

    return useMemo<TooltipHandlers>(() => (hasTooltip
        ? {
                onPointerOver: event => beginTooltip(owner, textRef.current ?? '', event.clientX, event.clientY, delayRef.current ?? TOOLTIP_DELAY_MS),
                onPointerOut: () => endTooltip(owner),
            }
        : {}), [ owner, hasTooltip ]);
};
