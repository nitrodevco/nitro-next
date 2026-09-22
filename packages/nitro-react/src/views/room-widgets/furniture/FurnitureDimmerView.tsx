import { IRoomDimmerPreset } from '@nitrodevco/nitro-packets';

import { useTranslation } from '#base/context/system';
import { Border, Button, CheckBox, Frame, LayoutImage, Region, TabButton, TabContext, ThemeImage, ThemeText } from '#base/theme';
import { FurnitureDimmerSliderView } from '#base/views/room-widgets/furniture/FurnitureDimmerSliderView';

/** The seven moods the dimmer offers, as `DimmerFurniWidget.AVAILABLE_COLORS` lists them. */
const DIMMER_COLORS: number[] = [ 0x74F5F5, 0x0053F7, 0xE759DE, 0xEA4532, 0xF2F851, 0x82F349, 0x000000 ];

/** `DimmerFurniWidget.minLights` (76 for both effects) and `DimmerViewAlphaSlider`'s default max. */
const MIN_BRIGHTNESS = 76;
const MAX_BRIGHTNESS = 255;

/**
 * A `color_chooser_cell` is resized to `dimmer_color_frame` (27x22), and `color_grid`'s rows are
 * item lists with its `spacing` of 2, so the seven cells sit 29px apart on one row.
 */
const COLOR_CELL_WIDTH = 27;
const COLOR_CELL_HEIGHT = 22;
const COLOR_GRID_SPACING = 2;

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

/** The `tab_1` .. `tab_3` buttons' x in `tab_context`. */
const TAB_LEFTS = [ 0, 60, 123 ];

const cssColor = (color: number) => `#${color.toString(16).padStart(6, '0')}`;

/**
 * The room dimmer, on the `dimmer_ui` layout (277x225, frame style 0 with margins 6, 25, 6, 7) -
 * `DimmerView`, which the widget builds at (100, 100): three saved moods as the tabs of
 * `tab_context`, then the colour grid, the brightness slider and the background-only toggle for
 * whichever is selected. While it is open the room previews the mood; Apply is what everyone else
 * sees. `DimmerView.update` shows `tabbedview` only while the dimmer is on and `off_border` only
 * while it is off, enables Apply only while it is on, and captions `on_off_button` by the state;
 * both buttons fit their captions, the on/off one keeping its right edge.
 *
 * The colour grid is `DimmerViewColorGrid.populateColourGrid`: each cell is a white-filled
 * `color_chooser_cell` holding `dimmer_color_frame`, then `dimmer_color_button` put through a
 * `ColorTransform` whose multipliers are the colour's channels over 255 (a multiplying tint, so
 * the black mood is a black button), then `dimmer_color_selected`, shown only on the selected
 * cell (`select`). A click on a cell selects its colour. The brightness slider is
 * `DimmerViewAlphaSlider` (see `FurnitureDimmerSliderView`), reporting a value only when the
 * button is released. `off_image` is `dimmer_info`.
 */
export const FurnitureDimmerView = ({
    presets, selectedPresetId, isOn, color, brightness, effectId,
    onSelectPreset, onChangeColor, onChangeBrightness, onChangeEffect, onApply, onToggle, onClose,
}: FurnitureDimmerViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="dimmer_ui"
            caption={t('widget.dimmer.title')}
            dropShadow={false}
            onClose={onClose}
            defaultPosition={{ x: 100, y: 100 }}
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 6, 25, 6, 7 ]}
            layout={{ position: 'absolute', width: 277, height: 225, minHeight: 0 }}
        >
            {!isOn && (
                <Border
                    variant="0"
                    layout={{ position: 'absolute', left: 6, top: 27, width: 254, height: 133 }}
                >
                    <ThemeText
                        text={t('widget.dimmer.info.off')}
                        textOptions={{ fontFamily: 'Volter', fontSize: 9, wordWrap: true, wordWrapWidth: 215 }}
                        clip
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 19, top: 93, width: 219, height: 34 }}
                    />
                    <ThemeImage
                        src={LayoutImage('room-ui/dimmer_info.png')}
                        bitmap={{}}
                        layout={{ position: 'absolute', left: 96, top: 11, width: 56, height: 79 }}
                    />
                </Border>
            )}
            {isOn && (
                <Region layout={{ position: 'absolute', left: 2, top: -1, width: 266, height: 166 }}>
                    <TabContext
                        variant="0"
                        layout={{ position: 'absolute', left: 2, top: 1, width: 258, height: 163 }}
                    >
                        {presets.map((preset, index) => (
                            <TabButton
                                key={preset.id}
                                variant="0"
                                selected={preset.id === selectedPresetId}
                                onPointerTap={() => onSelectPreset(preset.id)}
                                layout={{ position: 'absolute', left: TAB_LEFTS[index] ?? 0, top: 0, height: 21, maxWidth: 100 }}
                            >
                                {t(`widget.dimmer.tab.${index + 1}`)}
                            </TabButton>
                        ))}
                    </TabContext>
                    <Region layout={{ position: 'absolute', left: 17, top: 34, width: 228, height: 118, overflow: 'hidden' }}>
                        <Region layout={{ position: 'absolute', left: 2, top: 1, width: 210, height: 30 }}>
                            {DIMMER_COLORS.map((swatch, index) => (
                                <Region
                                    key={swatch}
                                    backgroundColor="#ffffff"
                                    cursor="pointer"
                                    onPointerTap={() => onChangeColor(swatch)}
                                    layout={{ position: 'absolute', left: index * (COLOR_CELL_WIDTH + COLOR_GRID_SPACING), top: 0, width: COLOR_CELL_WIDTH, height: COLOR_CELL_HEIGHT }}
                                >
                                    <ThemeImage
                                        src={LayoutImage('room-ui/dimmer_color_frame.png')}
                                        bitmap={{}}
                                        layout={{ position: 'absolute', left: 0, top: 0, width: COLOR_CELL_WIDTH, height: COLOR_CELL_HEIGHT }}
                                    />
                                    <ThemeImage
                                        src={LayoutImage('room-ui/dimmer_color_button.png')}
                                        bitmap={{}}
                                        tint={cssColor(swatch)}
                                        layout={{ position: 'absolute', left: 0, top: 0, width: COLOR_CELL_WIDTH, height: COLOR_CELL_HEIGHT }}
                                    />
                                    <ThemeImage
                                        src={LayoutImage('room-ui/dimmer_color_selected.png')}
                                        bitmap={{}}
                                        visible={swatch === color}
                                        layout={{ position: 'absolute', left: 0, top: 0, width: COLOR_CELL_WIDTH, height: COLOR_CELL_HEIGHT }}
                                    />
                                </Region>
                            ))}
                        </Region>
                        <Region layout={{ position: 'absolute', left: 4, top: 35, width: 206, height: 18 }}>
                            <FurnitureDimmerSliderView
                                value={brightness}
                                min={MIN_BRIGHTNESS}
                                max={MAX_BRIGHTNESS}
                                reportOnEveryEvent={false}
                                onChange={onChangeBrightness}
                                top={0}
                            />
                        </Region>
                        <CheckBox
                            variant="0"
                            selected={effectId === EFFECT_BACKGROUND_ONLY}
                            onPointerTap={() => onChangeEffect(effectId === EFFECT_BACKGROUND_ONLY ? EFFECT_COLOR : EFFECT_BACKGROUND_ONLY)}
                            layout={{ position: 'absolute', left: 3, top: 60, width: 18, height: 18 }}
                        />
                        <ThemeText
                            text={t('widget.dimmer.type.checkbox')}
                            textOptions={{ fontFamily: 'Volter', fontSize: 9 }}
                            clip
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 22, top: 61, width: 200, height: 14 }}
                        />
                        <ThemeText
                            text={t('widget.dimmer.info')}
                            textOptions={{ fill: '#999999', fontFamily: 'Volter', fontSize: 9, wordWrap: true, wordWrapWidth: 218 }}
                            clip
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 4, top: 80, width: 222, height: 46 }}
                        />
                    </Region>
                </Region>
            )}
            <Button
                variant="0"
                disabled={!isOn}
                onPointerTap={onApply}
                layout={{ position: 'absolute', left: 4, top: 166, height: 24 }}
            >
                {t('widget.dimmer.button.apply')}
            </Button>
            <Button
                variant="0"
                onPointerTap={onToggle}
                layout={{ position: 'absolute', right: 4, top: 167, height: 22 }}
            >
                {t(isOn ? 'widget.dimmer.button.off' : 'widget.dimmer.button.on')}
            </Button>
        </Frame>
    );
};
