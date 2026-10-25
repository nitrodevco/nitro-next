import { IRoomDimmerPreset } from '@nitrodevco/nitro-packets';

import { LayoutImage, TemplateItem, TemplateWindow, useTemplate } from '#base/theme';
import { useFurnitureSlider } from '#base/views/room-widgets/furniture/useFurnitureSlider';

/** The seven moods the dimmer offers, as `DimmerFurniWidget.AVAILABLE_COLORS` lists them. */
const DIMMER_COLORS: number[] = [ 0x74F5F5, 0x0053F7, 0xE759DE, 0xEA4532, 0xF2F851, 0x82F349, 0x000000 ];

/** `DimmerFurniWidget.minLights` (76 for both effects) and `DimmerViewAlphaSlider`'s default max. */
const MIN_BRIGHTNESS = 76;
const MAX_BRIGHTNESS = 255;

/** `populateColourGrid` sizes each cell to `dimmer_color_frame`. */
const COLOR_CELL_WIDTH = 27;
const COLOR_CELL_HEIGHT = 22;

/** Effect 1 lights the whole room; effect 2 tints the background only. */
const EFFECT_COLOR = 1;
const EFFECT_BACKGROUND_ONLY = 2;

const LIBRARY = 'habbo-room-ui-com';

/** The `tab_context`'s three tab buttons, one per saved mood. */
const TABS = [ 'tab_1', 'tab_2', 'tab_3' ];

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

/**
 * The room dimmer, `DimmerView`, on the `dimmer_ui` layout (277x225), which `createWindow` builds
 * into a container at (100, 100): three saved moods as the tabs of `tab_context`, then the colour
 * grid, the brightness slider and the background-only `type_checkbox` for whichever is selected.
 * While it is open the room previews the mood; Apply is what everyone else sees. `update` shows
 * `tabbedview` only while the dimmer is on and `off_border` only while it is off, enables
 * `apply_button` only while it is on, and captions `on_off_button` by the state. `off_image` is
 * given `dimmer_info`.
 *
 * The colour grid is `DimmerViewColorGrid.populateColourGrid`: a `dimmer_color_chooser_cell` clone
 * per colour in `color_grid`, white-filled and sized to `dimmer_color_frame`; its `BG_BORDER` bitmap
 * is `dimmer_color_frame`, its `COLOR_IMAGE` `dimmer_color_button` put through a `ColorTransform`
 * whose multipliers are the colour's channels over 255 (a multiplying tint, so the black mood is a
 * black button), and its `COLOR_CHOSEN` `dimmer_color_selected`, shown only on the selected cell
 * (`select`). A click on a cell selects its colour. The brightness slider is `DimmerViewAlphaSlider`
 * (see `useFurnitureSlider`), reporting a value only when the button is released.
 */
export const FurnitureDimmerView = ({
    presets, selectedPresetId, isOn, color, brightness, effectId,
    onSelectPreset, onChangeColor, onChangeBrightness, onChangeEffect, onApply, onToggle, onClose,
}: FurnitureDimmerViewProps) => {
    const cell = useTemplate(`${LIBRARY}/dimmer_color_chooser_cell`);
    const slider = useFurnitureSlider({ container: 'brightness_container', value: brightness, min: MIN_BRIGHTNESS, max: MAX_BRIGHTNESS, reportOnEveryEvent: false, onChange: onChangeBrightness });

    const cells: TemplateItem[] = cell
        ? DIMMER_COLORS.map(swatch => ({
                key: String(swatch),
                from: cell,
                bindings: {
                    '': { background: true, color: 0xffffff, onPointerTap: () => onChangeColor(swatch) },
                    '#BG_BORDER': { asset: LayoutImage(`${LIBRARY}/dimmer_color_frame.png`) },
                    '#COLOR_IMAGE': { asset: LayoutImage(`${LIBRARY}/dimmer_color_button.png`), color: swatch },
                    '#COLOR_CHOSEN': { asset: LayoutImage(`${LIBRARY}/dimmer_color_selected.png`), visible: swatch === color },
                },
                arrange: ({ root }) => {
                    root()?.setWidth(COLOR_CELL_WIDTH);
                    root()?.setHeight(COLOR_CELL_HEIGHT);
                },
            }))
        : [];

    return (
        <TemplateWindow
            id={`${LIBRARY}/dimmer_ui`}
            frame={{ id: 'dimmer_ui', defaultPosition: { x: 100, y: 100 }, rememberPosition: false, onClose }}
            bindings={{
                ...slider.bindings,
                off_border: { visible: !isOn },
                off_image: { asset: LayoutImage(`${LIBRARY}/dimmer_info.png`) },
                // Hidden while off, not rebuilt: Turn on shows the same tabs and slider again, the knob
                // where it was let go (`DimmerView.update` only flips `visible`).
                tabbedview: { visible: isOn, keepMounted: true },
                ...Object.fromEntries(TABS.map((tab, index) => [ tab, {
                    visible: index < presets.length,
                    selected: presets[index]?.id === selectedPresetId,
                    onPointerTap: () => {
                        if (presets[index]) onSelectPreset(presets[index].id);
                    },
                } ])),
                color_grid: { items: cells },
                type_checkbox: {
                    selected: effectId === EFFECT_BACKGROUND_ONLY,
                    onPointerTap: () => onChangeEffect(effectId === EFFECT_BACKGROUND_ONLY ? EFFECT_COLOR : EFFECT_BACKGROUND_ONLY),
                },
                apply_button: { disabled: !isOn, onPointerTap: onApply },
                on_off_button: { caption: isOn ? '${widget.dimmer.button.off}' : '${widget.dimmer.button.on}', onPointerTap: onToggle },
            }}
            arrange={(windows) => {
                // The cells are sized before `addGridItem` in Flash; here they are once added, so the
                // grid lays them out again at their size (`rebuildGridStructure`, on its own resize).
                const grid = windows.find('color_grid');

                if (grid) {
                    const width = grid.width;

                    grid.setWidth(width + 1);
                    grid.setWidth(width);
                }

                slider.arrange(windows);
            }}
        />
    );
};
