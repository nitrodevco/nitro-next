import { useTranslation } from '#base/context';
import { Border, Box, Button, Frame, Region, ThemeText } from '#base/theme';

/** The three channels run the full byte range the server stores them in. */
const MAX_VALUE = 255;
const STOPS = 16;

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
    value: number;
    onChange: (value: number) => void;
}

/** One 42-high slider row of the layout, as the stops it can actually land on. */
const Channel = ({ label, value, onChange }: ChannelProps) => (
    <Box layout={{ width: 251, height: 42, flexDirection: 'column', flexShrink: 0, justifyContent: 'center', gap: 2 }}>
        <ThemeText
            text={label}
            textStyle="text-style-u-small"
            layout={{ width: 144, height: 15 }}
        />
        <Box layout={{ flexDirection: 'row', gap: 1, width: 206, height: 12 }}>
            {Array.from({ length: STOPS }, (_, index) => {
                const stop = Math.round((MAX_VALUE * index) / (STOPS - 1));

                return (
                    <Region
                        key={stop}
                        backgroundColor={stop <= value ? '#404040' : '#c0c0c0'}
                        cursor="pointer"
                        onPointerTap={() => onChange(stop)}
                        layout={{ flex: 1, height: 12 }}
                    />
                );
            })}
        </Box>
    </Box>
);

/**
 * The background toner, on the `background_color_ui` layout (292x255): hue, saturation and
 * lightness, with the swatch beside them showing what the three currently make. Nothing
 * previews on the room itself - Flash didn't either - so the colour only reaches the room once
 * Apply has been through the server.
 */
export const FurnitureBackgroundColorView = ({
    hue, saturation, lightness, previewColor, isOn, onChange, onApply, onToggle, onClose,
}: FurnitureBackgroundColorViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="furniture-background-color"
            caption={t('widget.backgroundcolour.title')}
            tintColor="#67a3bf"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            defaultPosition={{ x: 100, y: 80 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 292, height: 255 }}
        >
            <Border
                variant="100"
                backgroundColor="#ffffff"
                layout={{ flex: 1, flexDirection: 'column', paddingLeft: 4, paddingRight: 4, paddingTop: 2 }}
            >
                <Box layout={{ flexDirection: 'row', alignItems: 'flex-start', height: 29, flexShrink: 0 }}>
                    <ThemeText
                        text={t('widget.backgroundcolor.info')}
                        textStyle="text-style-u-small"
                        textOptions={{ wordWrap: true, wordWrapWidth: 218 }}
                        verticalAlign="top"
                        layout={{ width: 218, height: 29 }}
                    />
                    <Border
                        variant="100"
                        layout={{ marginLeft: 'auto', marginTop: 2, width: 30, height: 28 }}
                    >
                        <Region
                            backgroundColor={previewColor}
                            layout={{ position: 'absolute', left: 1, width: 28, top: 1, height: 26 }}
                        />
                    </Border>
                </Box>
                <Channel
                    label={t('widget.backgroundcolor.hue')}
                    value={hue}
                    onChange={value => onChange(value, saturation, lightness)}
                />
                <Channel
                    label={t('widget.backgroundcolor.saturation')}
                    value={saturation}
                    onChange={value => onChange(hue, value, lightness)}
                />
                <Channel
                    label={t('widget.backgroundcolor.lightness')}
                    value={lightness}
                    onChange={value => onChange(hue, saturation, value)}
                />
            </Border>
            <Box layout={{ flexDirection: 'row', gap: 4, marginTop: 3, flexShrink: 0 }}>
                <Button
                    variant="0"
                    onPointerTap={onApply}
                    layout={{ flex: 1, height: 24 }}
                >
                    {t('widget.backgroundcolor.button.apply')}
                </Button>
                <Button
                    variant="0"
                    onPointerTap={onToggle}
                    layout={{ width: 100, height: 24 }}
                >
                    {t(isOn ? 'widget.backgroundcolor.button.off' : 'widget.backgroundcolor.button.on')}
                </Button>
            </Box>
        </Frame>
    );
};
