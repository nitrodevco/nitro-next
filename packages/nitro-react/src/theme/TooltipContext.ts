import { createContext, type PointerEvent as ReactPointerEvent, useContext } from 'react';

export type TooltipHandlers = {
    onPointerEnter: (event: ReactPointerEvent) => void;
    onPointerMove: (event: ReactPointerEvent) => void;
    onPointerLeave: (event: ReactPointerEvent) => void;
};

export type TooltipFactory = (caption: string, delay?: number) => TooltipHandlers;

export const TooltipContext = createContext<TooltipFactory | undefined>(undefined);

/**
 * useTooltip()(caption, delay?) returns pointer handlers to spread on any element —
 * the themed replacement for a native `title` attribute.
 */
export const useTooltip = () => {
    const tooltip = useContext(TooltipContext);

    if (!tooltip) throw new Error('useTooltip must be used within a TooltipProvider');

    return tooltip;
};
