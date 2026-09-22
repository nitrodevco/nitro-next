import { useTranslation } from '#base/context/system';
import { Border, Button, Frame, Region, ThemeText } from '#base/theme';
import { FurnitureDimmerSliderView } from '#base/views/room-widgets/furniture/FurnitureDimmerSliderView';

/** `BackgroundColorWidgetSlider`'s min and max: each channel runs the full byte the server stores it in. */
const MIN_VALUE = 0;
const MAX_VALUE = 255;

export interface FurnitureBackgroundColorViewProps {
    hue: number;
    saturation: number;
    lightness: number;
    /** The three channels resolved to one colour, for the swatch beside the sliders. */
    previewColor: string;
    isOn: boolean;
    onChange: (hue: number, saturation: number, lightness: number) => void;
    onApply: () => void;
    onToggle: () => void;
    onClose: () => void;
}

interface ChannelProps {
    label: string;
    /** The row's y in `tab_content`. */
    top: number;
    value: number;
    onChange: (value: number) => void;
}

/**
 * One 251x42 slider row of the layout (`hue_container` and its two siblings): the bold `parameter`
 * label and the `BackgroundColorWidgetSlider` under it, whose `slider_base` is at 2, 12 - see
 * `FurnitureDimmerSliderView`. The value follows the button through the whole drag, and the button
 * stays where it is dropped.
 */
const Channel = ({ label, top, value, onChange }: ChannelProps) => (
    <Region layout={{ position: 'absolute', left: 4, top, width: 251, height: 42 }}>
        <ThemeText
            text={label}
            textStyle="u_small"
            flashFormat={{ bold: true }}
            verticalAlign="top"
            layout={{ position: 'absolute', left: 0, top: 0, height: 15 }}
        />
        <FurnitureDimmerSliderView
            value={value}
            min={MIN_VALUE}
            max={MAX_VALUE}
            reportOnEveryEvent
            onChange={onChange}
            top={12}
        />
    </Region>
);

/**
 * The background toner, on the `background_color_ui` layout (292x255, margins 6, 25, 6, 7) that
 * `BackgroundColorFurniWidget.createWindow` builds and centres: hue, saturation and lightness,
 * with the swatch beside the info text showing what the three currently make
 * (`renderColorPreview`). Nothing previews on the room itself - Flash didn't either - so the colour
 * only reaches the room once Apply has been through the server.
 *
 * `tab_content` (at 2, 2 in the border) stacks `header_container` (29 high, clipping the swatch's
 * border), a 5px spacer and the three 42px slider rows. The buttons fit their captions;
 * `on_off_button` keeps its right edge.
 */
export const FurnitureBackgroundColorView = ({
    hue, saturation, lightness, previewColor, isOn, onChange, onApply, onToggle, onClose,
}: FurnitureBackgroundColorViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="backgroundcolor_ui"
            caption={t('widget.backgroundcolour.title')}
            tintColor="#67a3bf"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 6, 25, 6, 7 ]}
            layout={{ width: 292, height: 255, minHeight: 0 }}
        >
            <Border
                variant="100"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 3, top: 16, width: 275, height: 171 }}
            >
                <Region layout={{ position: 'absolute', left: 2, top: 2, width: 270, height: 166 }}>
                    <Region layout={{ position: 'absolute', left: 0, top: 0, width: 270, height: 29, overflow: 'hidden' }}>
                        <ThemeText
                            text={t('widget.backgroundcolor.info')}
                            textStyle="u_small"
                            textOptions={{ wordWrap: true, wordWrapWidth: 214 }}
                            clip
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 4, top: 0, width: 218, height: 31 }}
                        />
                        <Border
                            variant="100"
                            layout={{ position: 'absolute', left: 239, top: 2, width: 30, height: 28 }}
                        >
                            <Region
                                backgroundColor={previewColor}
                                layout={{ position: 'absolute', left: 1, top: 1, width: 28, height: 26 }}
                            />
                        </Border>
                    </Region>
                    <Channel
                        label={t('widget.backgroundcolor.hue')}
                        top={34}
                        value={hue}
                        onChange={value => onChange(value, saturation, lightness)}
                    />
                    <Channel
                        label={t('widget.backgroundcolor.saturation')}
                        top={76}
                        value={saturation}
                        onChange={value => onChange(hue, value, lightness)}
                    />
                    <Channel
                        label={t('widget.backgroundcolor.lightness')}
                        top={118}
                        value={lightness}
                        onChange={value => onChange(hue, saturation, value)}
                    />
                </Region>
            </Border>
            <Button
                variant="0"
                onPointerTap={onApply}
                layout={{ position: 'absolute', left: 4, top: 193, height: 24 }}
            >
                {t('widget.backgroundcolor.button.apply')}
            </Button>
            <Button
                variant="0"
                onPointerTap={onToggle}
                layout={{ position: 'absolute', right: 1, top: 193, height: 24 }}
            >
                {t(isOn ? 'widget.backgroundcolor.button.off' : 'widget.backgroundcolor.button.on')}
            </Button>
        </Frame>
    );
};
