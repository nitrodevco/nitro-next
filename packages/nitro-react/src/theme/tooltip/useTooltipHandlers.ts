import { useEffect, useId, useMemo, useRef } from 'react';

import { PointerHandler } from '../utils/interaction';
import { beginTooltip, endTooltip, updateTooltipText } from './tooltipStore';

export interface TooltipHandlers {
    onPointerOver?: PointerHandler;
    onPointerOut?: PointerHandler;
}

/**
 * The hover handlers that show a component's `tooltip` (its `tool_tip_caption`): pointer-over
 * begins the client's tooltip agent at the pointer, pointer-out ends it, and a caption that
 * changes while hovered updates the shown text. Empty for a component with no tooltip, so it
 * stays non-interactive. Both render targets' pointer events carry `clientX`/`clientY`.
 */
export const useTooltipHandlers = (text: string | undefined): TooltipHandlers => {
    const owner = useId();
    const textRef = useRef(text);
    const hasTooltip = !!text;

    useEffect(() => {
        textRef.current = text;
        updateTooltipText(owner, text ?? '');
    }, [ owner, text ]);

    // A hovered component that unmounts takes its tooltip with it.
    useEffect(() => () => endTooltip(owner), [ owner ]);

    return useMemo<TooltipHandlers>(() => (hasTooltip
        ? {
                onPointerOver: event => beginTooltip(owner, textRef.current ?? '', event.clientX, event.clientY),
                onPointerOut: () => endTooltip(owner),
            }
        : {}), [ owner, hasTooltip ]);
};
