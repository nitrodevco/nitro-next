/**
 * Where `SettingsExtension` puts the windows its list opens (`openSoundSettingsWindow` and the rest):
 * on desktop 1, at its top, `desktop.width - window.width - 200` across - and in the window stack
 * like any other window. The window is its Flash template; its border sits at 1,1 of the layout, so
 * the box is a pixel wider and taller than the window.
 *
 * The box is a mouse target in its own right (`interactive`, the layout's `input_event_processor` on
 * its border), so a press on the window's background stops there instead of falling through to the
 * room.
 */
import { Region, TemplateBindings, TemplateWindow, TemplateWindows, useTemplate, useWindowActivation } from '#base/theme';

/** `SettingsExtension.open*Window`: `desktop.width - window.width - 200`. */
const RIGHT_MARGIN = 200;

interface ToolbarSettingsWindowProps {
    /** The window's id in the window stack. */
    windowId: string;
    /** The window's template. */
    templateId: string;
    bindings?: TemplateBindings;
    arrange?: (windows: TemplateWindows) => void;
    /** The window's height as its code sets it; the layout's otherwise. */
    height?: number;
}

export const ToolbarSettingsWindow = ({ windowId, templateId, bindings, arrange, height }: ToolbarSettingsWindowProps) => {
    const { zIndex, onPointerDown } = useWindowActivation(windowId);
    const template = useTemplate(templateId);

    if (!template) return null;

    return (
        <Region
            interactive
            zIndex={zIndex}
            onPointerDown={onPointerDown}
            layout={{ position: 'absolute', top: 0, right: RIGHT_MARGIN, width: template.width + 1, height: (height ?? template.height) + 1 }}
        >
            <TemplateWindow
                id={templateId}
                height={height}
                bindings={bindings}
                arrange={arrange}
            />
        </Region>
    );
};
