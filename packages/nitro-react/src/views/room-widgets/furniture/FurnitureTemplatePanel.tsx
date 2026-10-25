/**
 * A furni widget's window that is no frame - a card, a plaque, a note - drawn from its Flash template
 * on the desktop where the widget's code puts it: `window.center()`, or the `Rectangle` of the
 * container it builds the layout into. It drags the way its layout says (`mouse_dragging_target` /
 * `_trigger`), which the template does itself: a root with `draggable_with_mouse` by any press on it
 * that nothing inside claims, the stickie by its `bg`.
 */
import { useViewportSize } from '#base/hooks';
import { Box, TemplateWindow, TemplateWindowProps, useTemplate } from '#base/theme';

export interface FurnitureTemplatePanelProps extends Omit<TemplateWindowProps, 'frame' | 'part'> {
    /** `center()` on the desktop, or the desktop point the code builds the window at. */
    position: 'center' | { x: number; y: number };
    /**
     * The window's size once its code has sized it in `arrange` (`drawImage`), for placing and
     * holding it; the layout's otherwise. The template itself is built at its layout size.
     */
    size?: { width: number; height: number };
}

export const FurnitureTemplatePanel = ({ position, size, ...props }: FurnitureTemplatePanelProps) => {
    const template = useTemplate(props.id);
    const viewport = useViewportSize();

    if (!template) return null;

    const width = size?.width ?? props.width ?? template.width;
    const height = size?.height ?? props.height ?? template.height;
    // `WindowController.center`: the middle of the desktop, never off its top left.
    const left = (position === 'center') ? Math.max(0, Math.floor((viewport.width - width) / 2)) : position.x;
    const top = (position === 'center') ? Math.max(0, Math.floor((viewport.height - height) / 2)) : position.y;

    return (
        <Box layout={{ position: 'absolute', left, top, width, height }}>
            <TemplateWindow {...props} />
        </Box>
    );
};
