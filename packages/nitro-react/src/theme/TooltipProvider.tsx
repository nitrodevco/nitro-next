import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Tooltip } from './Tooltip';
import { TooltipContext, type TooltipFactory } from './TooltipContext';

/**
 * WindowToolTipAgent — hovering an interactive window arms a one-shot timer
 * (tool_tip_delay, default 500ms); when it fires the tooltip window is shown at the
 * cursor plus a (20,20) offset and follows the cursor until hover ends destroys it.
 * Only non-empty captions are shown.
 */
const TOOLTIP_DEFAULT_DELAY = 500;
const TOOLTIP_OFFSET_X = 20;
const TOOLTIP_OFFSET_Y = 20;

export const TooltipProvider = ({ children }: { children: ReactNode }) => {
    const [caption, setCaption] = useState<string | null>(null);
    const nodeRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<number | undefined>(undefined);
    const positionRef = useRef({ x: 0, y: 0 });
    const triggerRef = useRef<Element | null>(null);

    const place = () => {
        const node = nodeRef.current;

        if (!node) return;

        node.style.left = `${positionRef.current.x + TOOLTIP_OFFSET_X}px`;
        node.style.top = `${positionRef.current.y + TOOLTIP_OFFSET_Y}px`;
    };

    // the node only exists after the caption renders, so position it then
    useEffect(() => {
        if (caption !== null) place();
    }, [caption]);

    /*
     * WindowToolTipAgent guards on _window.disposed — a tooltip dies with its window.
     * If the hovered element unmounts (e.g. entering a room closes the navigator) no
     * pointerleave ever fires, so poll the trigger and hide once it leaves the DOM.
     */
    useEffect(() => {
        if (caption === null) return;

        const watcher = window.setInterval(() => {
            if (!triggerRef.current?.isConnected) setCaption(null);
        }, 200);

        return () => window.clearInterval(watcher);
    }, [caption]);

    useEffect(() => () => window.clearTimeout(timerRef.current), []);

    const tooltip = useCallback<TooltipFactory>((tipCaption, delay = TOOLTIP_DEFAULT_DELAY) => ({
        onPointerEnter: event => {
            positionRef.current = { x: event.clientX, y: event.clientY };
            triggerRef.current = event.currentTarget;

            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => setCaption(tipCaption.length > 0 ? tipCaption : null), delay);
        },
        onPointerMove: event => {
            positionRef.current = { x: event.clientX, y: event.clientY };

            place();
        },
        onPointerLeave: () => {
            window.clearTimeout(timerRef.current);

            setCaption(null);
        }
    }), []);

    return (
        <TooltipContext.Provider value={tooltip}>
            {children}
            {caption !== null && createPortal(
                <Tooltip ref={nodeRef} className="fixed z-[99999] pointer-events-none flex items-center whitespace-nowrap">
                    {caption}
                </Tooltip>,
                document.body
            )}
        </TooltipContext.Provider>
    );
};
