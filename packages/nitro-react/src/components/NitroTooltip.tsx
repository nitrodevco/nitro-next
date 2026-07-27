import { type ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { cn, extractNumber } from '#base/utils';

export type NitroTooltipFollowType = boolean | 'x' | 'y';

export type NitroTooltipPlacementType = 'top' | 'top-left' | 'top-right' | 'left' | 'right' | 'bottom' | 'bottom-left' | 'bottom-right';

type TooltipSideType = 'top' | 'bottom' | 'left' | 'right';

type TooltipAlignType = 'left' | 'right';

interface TooltipBounds {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

interface TooltipSize {
    width: number;
    height: number;
}

export const DEFAULT_TOOLTIP_ID = 'nitro-tooltip';

const PLACEMENTS: NitroTooltipPlacementType[] = ['top', 'top-left', 'top-right', 'left', 'right', 'bottom', 'bottom-left', 'bottom-right'];

export interface NitroTooltipRenderProps {
    anchor: HTMLElement;
    content: string | null;
}

export interface NitroTooltipProps {
    id?: string;
    follow?: NitroTooltipFollowType;
    placement?: NitroTooltipPlacementType;
    delay?: number;
    offset?: number;
    className?: string;
    container?: Element | null;
    render?: (props: NitroTooltipRenderProps) => ReactNode;
}

export const NitroTooltip = ({ id = DEFAULT_TOOLTIP_ID, follow = true, placement = 'bottom-left', delay = 0, offset = 12, className, container, render }: NitroTooltipProps) => {
    const VIEWPORT_MARGIN = 1;
    const VERIFY_INTERVAL = 150;
    const CURSOR_RADIUS = 3;

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const [content, setContent] = useState<string | null>(null);
    const [pinned, setPinned] = useState(false);

    const timerRef = useRef(0);
    const pointRef = useRef({ x: 0, y: 0 });
    const tooltipRef = useRef<HTMLDivElement | null>(null);

    const selector = `[data-tooltip-id="${id}"]`;

    const close = useCallback(() => {
        window.clearTimeout(timerRef.current);

        setAnchor(null);
        setContent(null);
        setPinned(false);
    }, []);

    const show = useCallback((element: HTMLElement) => {
        setAnchor(element);
        setContent(element.dataset.tooltipContent ?? null);
    }, []);

    const anchorAt = useCallback((x: number, y: number) => {
        const element = document.elementFromPoint(x, y);

        return (element instanceof Element) ? element.closest<HTMLElement>(selector) : null;
    }, [selector]);

    const resolveFollowProperty = (value: string | undefined, fallback: NitroTooltipFollowType): NitroTooltipFollowType => {
        if ((value === 'x') || (value === 'y')) return value;
        if (value === 'true') return true;
        if (value === 'false') return false;

        return fallback;
    };

    const resolvePlacementProperty = (value: string | undefined, fallback: NitroTooltipPlacementType): NitroTooltipPlacementType => {
        return PLACEMENTS.includes(value as NitroTooltipPlacementType) ? value as NitroTooltipPlacementType : fallback;
    }

    const clamp = (value: number, size: number, viewport: number) => {
        return Math.min(Math.max(VIEWPORT_MARGIN, value), viewport - size - VIEWPORT_MARGIN);
    }

    const calculateElementPosition = (placement: NitroTooltipPlacementType, reference: TooltipBounds, size: TooltipSize, offset: number, clearance: { x: number, y: number }) => {
        const [side, align] = placement.split('-') as [TooltipSideType, TooltipAlignType?];

        const beforeX = reference.left - clearance.x - size.width - offset;
        const afterX = reference.right + clearance.x + offset;
        const beforeY = reference.top - clearance.y - size.height - offset;
        const afterY = reference.bottom + clearance.y + offset;

        if ((side === 'left') || (side === 'right')) {
            const x = (side === 'left') ? beforeX : afterX;

            const fits = (side === 'left')
                ? (x >= VIEWPORT_MARGIN)
                : ((x + size.width) <= (window.innerWidth - VIEWPORT_MARGIN));

            return {
                x: fits ? x : ((side === 'left') ? afterX : beforeX),
                y: (reference.top + reference.bottom - size.height) / 2
            };
        }

        const y = (side === 'top') ? beforeY : afterY;

        const fits = (side === 'top')
            ? (y >= VIEWPORT_MARGIN)
            : ((y + size.height) <= (window.innerHeight - VIEWPORT_MARGIN));

        let alignedX = reference.left + clearance.x;

        if(align !== 'left') {
            alignedX = align === 'right'
                ? reference.right - clearance.x - size.width
                : (reference.left + reference.right - size.width) / 2;
        }

        return {
            x: alignedX,
            y: fits ? y : ((side === 'top') ? afterY : beforeY)
        };
    };

    const place = useCallback(() => {
        const node = tooltipRef.current;

        if (!anchor || !node) return;

        const rect = anchor.getBoundingClientRect();
        const size = node.getBoundingClientRect();

        const point = pointRef.current;
        const activeFollow = resolveFollowProperty(anchor.dataset.tooltipFollow, follow);
        const activePlacement = resolvePlacementProperty(anchor.dataset.tooltipPlacement, placement);

        const followX = !pinned && ((activeFollow === true) || (activeFollow === 'x'));
        const followY = !pinned && ((activeFollow === true) || (activeFollow === 'y'));

        const reference: TooltipBounds = {
            left: followX ? point.x : rect.left,
            right: followX ? point.x : rect.right,
            top: followY ? point.y : rect.top,
            bottom: followY ? point.y : rect.bottom
        };

        const clearance = {
            x: followX ? CURSOR_RADIUS : 0,
            y: followY ? CURSOR_RADIUS : 0
        };

        const { x, y } = calculateElementPosition(activePlacement, reference, size, offset, clearance);

        node.style.transform = `translate3d(${Math.round(clamp(x, size.width, window.innerWidth))}px, ${Math.round(clamp(y, size.height, window.innerHeight))}px, 0)`;
    }, [anchor, pinned, follow, placement, offset]);

    useEffect(() => {
        const onPointerOver = (event: PointerEvent) => {
            if (pinned) return;

            const target = event.target;
            const element = (target instanceof Element) ? target.closest<HTMLElement>(selector) : null;

            if (!element || (element === anchor)) return;

            pointRef.current = { x: event.clientX, y: event.clientY };

            window.clearTimeout(timerRef.current);

            const wait = anchor ? 0 : extractNumber(element.dataset.tooltipDelay, delay);

            if (wait <= 0)  {
                show(element);
                return;
            }

            timerRef.current = window.setTimeout(() => {
                if (anchorAt(pointRef.current.x, pointRef.current.y) !== element) return;

                show(element);
            }, wait);
        };

        document.addEventListener('pointerover', onPointerOver, true);

        return () => document.removeEventListener('pointerover', onPointerOver, true);
    }, [selector, anchor, pinned, delay, show, anchorAt]);

    useEffect(() => {
        const onPointerDown = (event: PointerEvent) => {
            const target = event.target;
            const element = (target instanceof Element) ? target.closest<HTMLElement>(selector) : null;

            if (pinned) {
                if (tooltipRef.current?.contains(target as Node)) return;
                if (element && (element !== anchor)) return;

                close();

                return;
            }

            if (!element || (element.dataset.tooltipFixed == null)) return;

            pointRef.current = { x: event.clientX, y: event.clientY };

            window.clearTimeout(timerRef.current);

            show(element);
            setPinned(true);
        };

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') close();
        };

        document.addEventListener('pointerdown', onPointerDown, true);
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('pointerdown', onPointerDown, true);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [selector, anchor, pinned, close, show]);

    useEffect(() => {
        const track = (event: PointerEvent) => {
            pointRef.current = { x: event.clientX, y: event.clientY };
        };

        document.addEventListener('pointermove', track, true);

        return () => document.removeEventListener('pointermove', track, true);
    }, []);

    useLayoutEffect(() => {
        if (anchor) place();
    }, [anchor, content, place]);

    useEffect(() => {
        if (!anchor) return;

        const update = () => {
            if (!anchor.isConnected) return close();

            const rect = anchor.getBoundingClientRect();

            if (!rect.width || !rect.height) return close();

            if (!pinned) {
                const { x, y } = pointRef.current;
                const found = anchorAt(x, y);

                if (found !== anchor) {
                    if (found) show(found);
                    else close();

                    return;
                }

                const next = anchor.dataset.tooltipContent ?? null;

                setContent(previous => (previous === next) ? previous : next);
            }

            place();
        };

        const onVisibility = () => {
            if (document.hidden) close();
        };

        const interval = window.setInterval(update, VERIFY_INTERVAL);

        document.addEventListener('pointermove', update, true);
        document.documentElement.addEventListener('pointerleave', close);
        document.addEventListener('visibilitychange', onVisibility);

        window.addEventListener('scroll', update, true);
        window.addEventListener('resize', update);
        window.addEventListener('blur', close);

        return () => {
            window.clearInterval(interval);

            document.removeEventListener('pointermove', update, true);
            document.documentElement.removeEventListener('pointerleave', close);
            document.removeEventListener('visibilitychange', onVisibility);

            window.removeEventListener('scroll', update, true);
            window.removeEventListener('resize', update);
            window.removeEventListener('blur', close);
        };
    }, [anchor, pinned, place, anchorAt, close, show]);

    useEffect(() => () => window.clearTimeout(timerRef.current), []);

    const target = container ?? document.getElementById('ui-container') ?? document.body;
    const body = anchor ? (render ? render({ anchor, content }) : content) : null;

    if (!anchor || !target || (body == null) || (body === '')) return null;

    const tooltip = (
        <div
            ref={tooltipRef}
            className={cn('nitro-tooltip', className, anchor.dataset.tooltipClass)}>
            {body}
        </div>
    );

    return createPortal(tooltip, target);
};
