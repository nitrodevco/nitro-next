import { TemplateWindow } from '#base/theme';

/**
 * The stand-in for furniture whose real dialog was never built: `PlaceholderView`, drawn from the
 * `habbo-room-ui-com/placeholder` layout (`ph_frame`, 250x150). Its two lines are written into the
 * Flash layout in English rather than localised (`ph_frame` and `ph_msg` captions, no `${...}`
 * key), so the port shows the same literal text - there is no key for a hotel to translate.
 *
 * `PlaceholderView.createWindow` builds it into a container at (-300, 300), and `showWindow` moves
 * that to x 200; the frame's `close`-tagged button hides it (`onWindowClose`).
 */
export interface FurniturePlaceholderViewProps {
    onClose: () => void;
}

export const FurniturePlaceholderView = ({ onClose }: FurniturePlaceholderViewProps) => (
    <TemplateWindow
        id="habbo-room-ui-com/placeholder"
        frame={{ id: 'ph_frame', defaultPosition: { x: 200, y: 300 }, rememberPosition: false, onClose }}
    />
);
