/**
 * Flash's `reflect_resize_to_parent` (and its `reflect_horizontal_` / `reflect_vertical_` halves,
 * params 4194304 / 8388608): `WindowController.update`'s `WE_RESIZED` case adds the difference
 * of a window's new size and its old one to its parent's (`_parent.height += height -
 * previous.height`). Every frame's `_CONTENT` container carries the flag
 * (`habbo_window_layout_frame(_3|_7)_xml`, `illumina_light_frame_xml`), so a text or an item list
 * inside a frame that grows by N pixels - `habbo_window_alert`'s `_alert_summary`
 * (`auto_size`, params 8388624), `simple_alert`'s `list` (8536080) - grows the whole window by N.
 *
 * `ReflectResize` is such a child: it is laid out like a `Box`, sized by what it holds, and
 * reports `measured - template` on each axis it is given a template size for to the nearest
 * `ReflectResizeContext`, which `Frame` provides (`useReflectResizeHost`). A chain of reflecting
 * windows (a text in a list in the content) sums to the same growth at the frame, so only the
 * outermost reflecting child of the frame's content needs wrapping.
 */
import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes, useContext, useEffect, useId, useState } from 'react';

import { Box, BoxLayout } from './Box';
import { ReflectResizeContext, useLayoutSize } from './hooks';

export interface ReflectResizeProps {
    /**
     * The window's width in its layout (`reflect_horizontal_resize_to_parent`): the parent grows
     * by `measured width - width`. Leave it out and the width is not reflected.
     */
    width?: number;
    /** The window's height in its layout (`reflect_vertical_resize_to_parent`), as `width`. */
    height?: number;
    layout?: BoxLayout;
    visible?: boolean;
    children?: ReactNode;
}

export const ReflectResize: ForwardRefExoticComponent<ReflectResizeProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ReflectResizeProps>(
    ({ width, height, layout, visible, children }, ref) => {
        const registry = useContext(ReflectResizeContext);
        const id = useId();
        const [ node, setNode ] = useState<PixiContainer | null>(null);
        const measured = useLayoutSize(node);
        // Nothing is reflected before Yoga has sized the window. Hiding it reflects nothing either:
        // Flash only reflects a `WE_RESIZED`, and Yoga leaves a hidden container's size as it was.
        const laidOut = (measured.width > 0) || (measured.height > 0);
        const deltaWidth = (laidOut && (width !== undefined)) ? Math.round(measured.width - width) : 0;
        const deltaHeight = (laidOut && (height !== undefined)) ? Math.round(measured.height - height) : 0;

        useEffect(() => {
            registry?.report(id, { width: deltaWidth, height: deltaHeight });
        }, [ registry, id, deltaWidth, deltaHeight ]);

        useEffect(() => () => registry?.report(id, null), [ registry, id ]);

        return (
            <Box
                ref={(next: PixiContainer | null) => {
                    setNode(next);

                    if (typeof ref === 'function') ref(next);
                    else if (ref) ref.current = next;
                }}
                visible={visible}
                layout={layout ?? {}}
            >
                {children}
            </Box>
        );
    },
);

ReflectResize.displayName = 'ReflectResize';
