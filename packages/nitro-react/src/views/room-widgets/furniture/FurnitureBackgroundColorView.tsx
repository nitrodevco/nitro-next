import { Region, TemplateWindow } from '#base/theme';
import { useFurnitureSlider } from '#base/views/room-widgets/furniture/useFurnitureSlider';

/** `BackgroundColorWidgetSlider`'s min and max: each channel runs the full byte the server stores it in. */
const MIN_VALUE = 0;
const MAX_VALUE = 255;

export interface FurnitureBackgroundColorViewProps {
    hue: number;
    saturation: number;
    lightness: number;
    /** The three channels resolved to one colour, for the swatch beside the sliders. */
    previewColor: string;
    onChange: (hue: number, saturation: number, lightness: number) => void;
    onApply: () => void;
    onToggle: () => void;
    onClose: () => void;
}

/**
 * The background toner, on the `background_color_ui` layout (292x255) that
 * `BackgroundColorFurniWidget.createWindow` builds and centres: hue, saturation and lightness, one
 * `BackgroundColorWidgetSlider` in each of `hue_container`, `saturation_container` and
 * `lightness_container` (see `useFurnitureSlider`), with `color_preview_bitmap` filled with what
 * the three currently make (`renderColorPreview`). The value follows the button through the whole
 * drag, and the button stays where it is dropped. Nothing previews on the room itself - Flash
 * didn't either - so the colour only reaches the room once Apply has been through the server.
 *
 * `windowProcedure`: `apply_button` sends the colour, `on_off_button` uses the furni, the close
 * button closes. `on_off_button` keeps the layout's one caption whatever the state: the client has
 * no "off" text for it.
 */
export const FurnitureBackgroundColorView = ({
    hue, saturation, lightness, previewColor, onChange, onApply, onToggle, onClose,
}: FurnitureBackgroundColorViewProps) => {
    const hueSlider = useFurnitureSlider({ container: 'hue_container', value: hue, min: MIN_VALUE, max: MAX_VALUE, reportOnEveryEvent: true, onChange: value => onChange(value, saturation, lightness) });
    const saturationSlider = useFurnitureSlider({ container: 'saturation_container', value: saturation, min: MIN_VALUE, max: MAX_VALUE, reportOnEveryEvent: true, onChange: value => onChange(hue, value, lightness) });
    const lightnessSlider = useFurnitureSlider({ container: 'lightness_container', value: lightness, min: MIN_VALUE, max: MAX_VALUE, reportOnEveryEvent: true, onChange: value => onChange(hue, saturation, value) });
    const sliders = [ hueSlider, saturationSlider, lightnessSlider ];

    return (
        <TemplateWindow
            id="habbo-room-ui-com/background_color_ui_xml"
            frame={{ id: 'backgroundcolor_ui', centered: true, rememberPosition: false, onClose }}
            bindings={{
                ...hueSlider.bindings,
                ...saturationSlider.bindings,
                ...lightnessSlider.bindings,
                color_preview_bitmap: {
                    children: (
                        <Region
                            backgroundColor={previewColor}
                            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                        />
                    ),
                },
                apply_button: { onPointerTap: onApply },
                on_off_button: { onPointerTap: onToggle },
            }}
            arrange={(windows) => {
                for (const slider of sliders) slider.arrange(windows);
            }}
        />
    );
};
