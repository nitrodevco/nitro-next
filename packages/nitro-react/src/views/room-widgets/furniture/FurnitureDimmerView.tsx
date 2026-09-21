import { IRoomDimmerPreset } from '@nitrodevco/nitro-packets';

import { useTranslation } from '#base/context/system';
import { Border, Box, Button, CheckBox, Frame, Region, ThemeText } from '#base/theme';

/** The seven moods the dimmer offers, as `DimmerFurniWidget.AVAILABLE_COLORS` lists them. */
const DIMMER_COLORS: number[] = [ 0x74F5F5, 0x0053F7, 0xE759DE, 0xEA4532, 0xF2F851, 0x82F349, 0x000000 ];

const MIN_BRIGHTNESS = 76;
const MAX_BRIGHTNESS = 255;

/** Effect 1 lights the whole room; effect 2 tints the background only. */
const EFFECT_COLOR = 1;
const EFFECT_BACKGROUND_ONLY = 2;

export interface FurnitureDimmerViewProps {
    presets: IRoomDimmerPreset[];
    selectedPresetId: number;
    isOn: boolean;
    color: number;
    brightness: number;
    effectId: number;
    onSelectPreset: (presetId: number) => void;
    onChangeColor: (color: number) => void;
    onChangeBrightness: (brightness: number) => void;
    onChangeEffect: (effectId: number) => void;
    onApply: () => void;
    onToggle: () => void;
    onClose: () => void;
}

const cssColor = (color: number) => `#${color.toString(16).padStart(6, '0')}`;

/**
 * The room dimmer, on the `dimmer_ui` layout (277x225): three saved moods across the top, then
 * the colour grid, the brightness slider and the background-only toggle for whichever is
 * selected. While it is open the room previews the mood; Apply is what everyone else sees.
 */
export const FurnitureDimmerView = ({
    presets, selectedPresetId, isOn, color, brightness, effectId,
    onSelectPreset, onChangeColor, onChangeBrightness, onChangeEffect, onApply, onToggle, onClose,
}: FurnitureDimmerViewProps) => {
    const t = useTranslation();
    const steps = 10;

    return (
        <Frame
            variant="0"
            id="furniture-dimmer"
            caption={t('widget.dimmer.title')}
            onClose={onClose}
            defaultPosition={{ x: 80, y: 80 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 277, height: 225 }}
        >
            <Box layout={{ flexDirection: 'row', gap: 2, marginBottom: 4 }}>
                {presets.map(preset => (
                    <Button
                        key={preset.id}
                        variant="0"
                        selected={preset.id === selectedPresetId}
                        onPointerTap={() => onSelectPreset(preset.id)}
                        layout={{ flex: 1, height: 22 }}
                    >
                        {preset.id.toString()}
                    </Button>
                ))}
            </Box>
            {!isOn && (
                <Border
                    variant="0"
                    layout={{ flex: 1, padding: 8 }}
                >
                    <ThemeText
                        text={t('widget.dimmer.info.off')}
                        textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 219, fontFamily: 'Volter', fontSize: 9 }}
                        verticalAlign="top"
                        layout={{ width: 219, height: 60 }}
                    />
                </Border>
            )}
            {isOn && (
                <Box layout={{ flexDirection: 'column', flex: 1, gap: 6 }}>
                    <Box layout={{ flexDirection: 'row', gap: 2, height: 30, alignItems: 'center' }}>
                        {DIMMER_COLORS.map(swatch => (
                            <Region
                                key={swatch}
                                backgroundColor={cssColor(swatch)}
                                cursor="pointer"
                                onPointerTap={() => onChangeColor(swatch)}
                                layout={{ width: 28, height: 24, borderWidth: swatch === color ? 2 : 0 }}
                            />
                        ))}
                    </Box>
                    {/* The layout's slider is a dragged handle; these are its stops, which land on
                        the same brightness values without a drag surface of their own. */}
                    <Box layout={{ flexDirection: 'row', gap: 1, height: 18, alignItems: 'center' }}>
                        {Array.from({ length: steps }, (_, index) => {
                            const value = Math.round(MIN_BRIGHTNESS + (((MAX_BRIGHTNESS - MIN_BRIGHTNESS) * index) / (steps - 1)));

                            return (
                                <Region
                                    key={value}
                                    backgroundColor={value <= brightness ? '#404040' : '#c0c0c0'}
                                    cursor="pointer"
                                    onPointerTap={() => onChangeBrightness(value)}
                                    layout={{ flex: 1, height: 12 }}
                                />
                            );
                        })}
                    </Box>
                    <Box layout={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                        <CheckBox
                            variant="0"
                            selected={effectId === EFFECT_BACKGROUND_ONLY}
                            onPointerTap={() => onChangeEffect(effectId === EFFECT_BACKGROUND_ONLY ? EFFECT_COLOR : EFFECT_BACKGROUND_ONLY)}
                            layout={{ width: 18, height: 18 }}
                        />
                        <ThemeText
                            text={t('widget.dimmer.type.checkbox')}
                            textOptions={{ fill: '#000000', fontFamily: 'Volter', fontSize: 9 }}
                        />
                    </Box>
                    <ThemeText
                        text={t('widget.dimmer.info')}
                        textOptions={{ fill: '#999999', wordWrap: true, wordWrapWidth: 222, fontFamily: 'Volter', fontSize: 9 }}
                        verticalAlign="top"
                        layout={{ width: 222, flex: 1 }}
                    />
                </Box>
            )}
            <Box layout={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
                <Button
                    variant="0"
                    onPointerTap={onApply}
                    layout={{ width: 89, height: 24 }}
                >
                    {t('widget.dimmer.button.apply')}
                </Button>
                <Button
                    variant="0"
                    onPointerTap={onToggle}
                    layout={{ width: 58, height: 22 }}
                >
                    {t(isOn ? 'widget.dimmer.button.off' : 'widget.dimmer.button.on')}
                </Button>
            </Box>
        </Frame>
    );
};
