/**
 * The toolbar's sound settings window - `toolbar/extensions/settings/SoundSettingsView`, drawn from
 * its `me_menu_sound_settings` template (layout name `memenu_effects`, 312 x 170): the client's own
 * sounds, furni and Trax, each a `*_volume_container` row of a mute button, a 0..1 slider and a
 * full-volume button (`SoundSettingsItem`). Opened from the settings list under the purse.
 *
 * Flash separates previewing a volume from storing it: the slider and the two buttons only preview
 * (`saveVolume(value, false)` -> `HabboSoundManagerFlash10.previewVolume`), and the window stores
 * all three when it is disposed. So Back saves here too, and so does the window going away any
 * other way.
 *
 * A row's two icons swap between the coloured and the white pair as its volume reaches zero
 * (`SoundSettingsItem.updateSoundIcons`), which is the only thing marking a muted row. The slider is
 * `MeMenuSoundSettingsSlider`: `slider_button` is dragged across `slider_movement_area`, whose width
 * less the button's is the whole range, and `setValue` puts it back where the volume says.
 */
import { FederatedPointerEvent } from 'pixi.js';
import { useEffect, useState } from 'react';

import { previewSoundVolumes, saveSoundVolumes } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useUserStore } from '#base/context/user';
import { useSliderKnobDrag } from '#base/hooks';
import { LayoutImage, TemplateBindings, TemplateWindows, useLatest } from '#base/theme';

import { ToolbarSettingsWindow } from './ToolbarSettingsWindow';

/** `slider_movement_area` and the `slider_button` in it - their difference is `_referenceWidth`. */
const REFERENCE_WIDTH = 144 - 12;

/** The three `SoundSettingsItem`s, by container. */
const ROWS = [ 'ui_volume_container', 'furni_volume_container', 'trax_volume_container' ] as const;

type Row = typeof ROWS[number];

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

/** `MeMenuSoundSettingsSlider.getSliderPosition`, with Flash's min 0 and max 1. */
const knobPosition = (volume: number): number => Math.trunc(REFERENCE_WIDTH * clamp01(volume));

const icon = (name: string) => LayoutImage(`habbo-window-manager-com/toolbar_memenu_settings_${name}.png`);

export const ToolbarSoundSettingsView = ({ onClose }: { onClose: () => void }) => {
    const { send } = useWebSocketContext();
    const uiVolume = useUserStore(x => x.uiVolume);
    const furniVolume = useUserStore(x => x.furniVolume);
    const traxVolume = useUserStore(x => x.traxVolume);
    // While a knob is dragged it follows the pointer; otherwise it follows the volume. It is not
    // snapped when let go - only a volume set from elsewhere moves it (Flash's `setValue`).
    const [ dragged, setDragged ] = useState<{ row: Row; x: number } | null>(null);
    const knobDrag = useSliderKnobDrag();

    const volumes: Record<Row, number> = { ui_volume_container: uiVolume, furni_volume_container: furniVolume, trax_volume_container: traxVolume };

    /** `SoundSettingsItem.saveVolume(value, false)`: a preview, never a store. */
    const preview = (row: Row, volume: number) => {
        const next = { ...volumes, [row]: volume };

        previewSoundVolumes(next.ui_volume_container, next.furni_volume_container, next.trax_volume_container);
    };

    const previewRef = useLatest(preview);

    // `SoundSettingsView.dispose` stores the three volumes however the window goes away.
    useEffect(() => () => {
        knobDrag.stop();
        saveSoundVolumes(send);
    }, [ send ]);

    const knobX = (row: Row) => ((dragged?.row === row) ? dragged.x : knobPosition(volumes[row]));

    // The press is left to bubble: the window's box reads it to take the top of the window stack.
    const startDrag = (row: Row, event: FederatedPointerEvent) => {
        knobDrag.start(event, knobX(row), REFERENCE_WIDTH, {
            onMove: (dragX) => {
                const x = Math.round(dragX);

                setDragged({ row, x });
                // `buttonProcedure` on `WE_RELOCATED`: `saveVolume(getValue(x), false)`.
                previewRef.current(row, x / REFERENCE_WIDTH);
            },
            onEnd: () => setDragged(null),
        });
    };

    const setFromButton = (row: Row, volume: number) => {
        knobDrag.stop();
        setDragged(null);
        preview(row, volume);
    };

    const bindings: TemplateBindings = { back_btn: { onPointerTap: onClose } };

    for (const row of ROWS) {
        const muted = volumes[row] === 0;

        bindings[`${row}/sounds_off`] = { onPointerTap: () => setFromButton(row, 0) };
        bindings[`${row}/sounds_on`] = { onPointerTap: () => setFromButton(row, 1) };
        // `updateSoundIcons`.
        bindings[`${row}/sounds_off_icon`] = { asset: icon(muted ? 'sounds_off_color' : 'sounds_off_white') };
        bindings[`${row}/sounds_on_icon`] = { asset: icon(muted ? 'sounds_on_white' : 'sounds_on_color') };
        bindings[`${row}/slider_button`] = { onPointerDown: event => startDrag(row, event) };
    }

    // `MeMenuSoundSettingsSlider.setValue`: the knob's x in its movement area.
    const arrange = ({ find }: TemplateWindows) => {
        for (const row of ROWS) find(`${row}/slider_button`)?.setX(knobX(row));
    };

    return (
        <ToolbarSettingsWindow
            windowId="toolbar_sound_settings"
            templateId="habbo-toolbar-com/me_menu_sound_settings_xml"
            bindings={bindings}
            arrange={arrange}
        />
    );
};
