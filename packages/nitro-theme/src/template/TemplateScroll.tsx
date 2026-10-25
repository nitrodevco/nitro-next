/**
 * A layout's own scrollbar and the list it scrolls (`ScrollBarController` and its `IScrollableWindow`):
 * two windows of a template, drawn wherever the layout put each, sharing one scroll position.
 *
 * The list owns the scroll, as an `IScrollableWindow` owns its `scrollV` / `scrollH`: it holds a
 * `useScrollController` per axis and draws its items in a masked viewport at its own rect, offset by
 * the scroll. It publishes its controllers to the `TemplateView`'s `TemplateScrollStore`, which each
 * linked scrollbar reads to draw its lift and to scroll the list from its arrows, track and lift.
 *
 * A layout's scrollbar stays when the items fit, disabled (`ScrollBarController.updateLiftSizeAndPosition`)
 * - unless the window's code hides it.
 */
import { Container as PixiContainer, Graphics as PixiGraphics } from 'pixi.js';
import { ReactNode, useCallback, useEffect, useLayoutEffect, useState, useSyncExternalStore } from 'react';

import { Box, BoxLayout } from '../Box';
import { ScrollController, useScrollController } from '../hooks/useScrollController';
import { ScrollbarHorizontal } from '../ScrollbarHorizontal';
import { ScrollbarVertical } from '../ScrollbarVertical';
import type { TemplateElement } from './templateData';
import type { TemplateRect } from './templateLayout';
import { TemplateScrollAxis, TemplateScrollStore } from './templateScrollStore';

interface TemplateScrollTargetProps {
    element: TemplateElement;
    rect: TemplateRect;
    content: { width: number; height: number };
    /** The axes its scrollbars scroll. */
    axes: ReadonlySet<TemplateScrollAxis>;
    store: TemplateScrollStore;
    layout: BoxLayout;
    alpha: number;
    /** What the element draws of its own, under its items. */
    face: ReactNode;
    /** Where its code puts the scroll, 0 to 1 of each axis' range (`scrollV` / `scrollH`), applied each time it changes. */
    scrollV?: number;
    scrollH?: number;
    children: ReactNode;
}

/**
 * Scrolls to `ratio` of the range each time it changes, two frames on - once the items bound with it
 * are laid out, as `ScrollArea`'s `scrollV` waits.
 */
const useScrollRatio = (scrollToRatio: (ratio: number) => void, ratio: number | undefined) => {
    useEffect(() => {
        if (ratio === undefined) return;

        let second = 0;
        const first = requestAnimationFrame(() => {
            second = requestAnimationFrame(() => scrollToRatio(ratio));
        });

        return () => {
            cancelAnimationFrame(first);
            cancelAnimationFrame(second);
        };
    }, [ ratio, scrollToRatio ]);
};

/** The scrolled list: its items in a viewport the size of its rect, offset by its scroll. */
export const TemplateScrollTarget = ({ element, rect, content, axes, store, layout, alpha, face, scrollV, scrollH, children }: TemplateScrollTargetProps) => {
    const vertical = useScrollController({ orientation: 'vertical' });
    const horizontal = useScrollController({ orientation: 'horizontal' });
    const [ maskNode, setMaskNode ] = useState<PixiGraphics | null>(null);
    const scrollsVertically = axes.has('vertical');
    const scrollsHorizontally = axes.has('horizontal');

    useScrollRatio(vertical.scrollToRatio, scrollsVertically ? scrollV : undefined);
    useScrollRatio(horizontal.scrollToRatio, scrollsHorizontally ? scrollH : undefined);

    useLayoutEffect(() => {
        store.publish(element, {
            vertical: scrollsVertically ? vertical : undefined,
            horizontal: scrollsHorizontally ? horizontal : undefined,
        });
    });

    useEffect(() => () => store.publish(element, undefined), [ store, element ]);

    const viewportRef = (node: PixiContainer | null) => {
        vertical.viewportRef(node);
        horizontal.viewportRef(node);
    };
    const contentRef = (node: PixiContainer | null) => {
        vertical.contentRef(node);
        horizontal.contentRef(node);
    };

    return (
        <Box
            layout={layout}
            alpha={alpha}
        >
            {face}
            <pixiContainer
                ref={viewportRef}
                eventMode="static"
                // The wheel scrolls the list along its vertical scrollbar, or its horizontal one alone.
                onWheel={scrollsVertically ? vertical.onWheel : horizontal.onWheel}
                mask={maskNode ?? undefined}
                layout={{ position: 'absolute', left: 0, top: 0, width: rect.width, height: rect.height }}
            >
                <pixiGraphics
                    ref={setMaskNode}
                    eventMode="none"
                    roundPixels
                    layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                    draw={(g) => { g.clear().rect(0, 0, 1, 1).fill(0xFFFFFF); }}
                />
                <pixiContainer
                    ref={contentRef}
                    roundPixels
                    x={scrollsHorizontally ? -horizontal.scrollOffset : 0}
                    y={scrollsVertically ? -vertical.scrollOffset : 0}
                    // Not shrunk to the viewport along its row: content wider than the list is what scrolls horizontally.
                    layout={{ position: 'relative', width: content.width, height: content.height, flexShrink: 0 }}
                >
                    {children}
                </pixiContainer>
            </pixiContainer>
        </Box>
    );
};

/** The scroll a text field shares with its layout's scrollbars, one controller per axis they scroll. */
export interface TemplateFieldScroll {
    vertical?: ScrollController;
    horizontal?: ScrollController;
}

interface TemplateScrollFieldProps {
    element: TemplateElement;
    axes: ReadonlySet<TemplateScrollAxis>;
    store: TemplateScrollStore;
    scrollV?: number;
    scrollH?: number;
    /** The field, drawn with the scroll it is to follow. */
    children: (scroll: TemplateFieldScroll) => ReactNode;
}

/**
 * A text field a layout's scrollbar scrolls (`TextController` as the scrollbar's `IScrollableWindow`):
 * the field scrolls its own text - its viewport is its box, its content its text - by the controllers
 * this holds and publishes, so the scrollbar and the field move one scroll.
 */
export const TemplateScrollField = ({ element, axes, store, scrollV, scrollH, children }: TemplateScrollFieldProps) => {
    const vertical = useScrollController({ orientation: 'vertical' });
    const horizontal = useScrollController({ orientation: 'horizontal' });
    const scrollsVertically = axes.has('vertical');
    const scrollsHorizontally = axes.has('horizontal');

    useScrollRatio(vertical.scrollToRatio, scrollsVertically ? scrollV : undefined);
    useScrollRatio(horizontal.scrollToRatio, scrollsHorizontally ? scrollH : undefined);

    useLayoutEffect(() => {
        store.publish(element, {
            vertical: scrollsVertically ? vertical : undefined,
            horizontal: scrollsHorizontally ? horizontal : undefined,
        });
    });

    useEffect(() => () => store.publish(element, undefined), [ store, element ]);

    return children({
        vertical: scrollsVertically ? vertical : undefined,
        horizontal: scrollsHorizontally ? horizontal : undefined,
    });
};

interface TemplateScrollbarProps {
    element: TemplateElement;
    target: TemplateElement;
    axis: TemplateScrollAxis;
    store: TemplateScrollStore;
    layout: BoxLayout;
    alpha: number;
}

/** A layout's scrollbar, drawn from its target's scroll at its own rect in its own style. */
export const TemplateScrollbar = ({ element, target, axis, store, layout, alpha }: TemplateScrollbarProps) => {
    const subscribe = useCallback((listener: () => void) => store.subscribe(target, listener), [ store, target ]);
    const controller = useSyncExternalStore(subscribe, () => store.get(target, axis));

    if (!controller) return null;

    const Scrollbar = axis === 'horizontal' ? ScrollbarHorizontal : ScrollbarVertical;

    return (
        <Box
            layout={layout}
            alpha={alpha}
        >
            <Scrollbar
                trackRef={node => controller.trackRef(node)}
                thumbSize={controller.thumbSize}
                thumbOffset={controller.thumbOffset}
                scrollable={controller.scrollable}
                onTrackPointerDown={controller.onTrackPointerDown}
                onThumbPointerDown={controller.onThumbPointerDown}
                stepBackward={controller.stepBackward}
                stepForward={controller.stepForward}
                variant={element.style}
                hideWhenDisabled={false}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Box>
    );
};
