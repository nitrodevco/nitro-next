/**
 * The toolbar's sound settings window - `toolbar/extensions/settings/SoundSettingsView` on the
 * `me_menu_sound_settings` layout (layout name `memenu_effects`, 312 x 170): the client's own
 * sounds, furni and Trax, each a row of a mute button, a 0..1 slider and a full-volume button
 * (`SoundSettingsItem`). Opened from the settings list under the purse, placed as Flash places it -
 * at the top of the desktop, 200 pixels from its right edge.
 *
 * Flash separates previewing a volume from storing it: the slider and the two buttons only preview
 * (`saveVolume(value, false)` -> `HabboSoundManagerFlash10.previewVolume`), and the window stores
 * all three when it is disposed. So Back saves here too, and so does the window going away any
 * other way.
 *
 * A row's two icons swap between the coloured and the white pair as its volume reaches zero
 * (`updateSoundIcons`), which is the only thing marking a muted row - the layout's
 * `volume_grey_area` is `visible="false"` and is left out, as is `SoundSettingsItem`'s
 * `updateUnseenItemCount`, which Flash leaves empty.
 */
import { FederatedPointerEvent } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { previewSoundVolumes, saveSoundVolumes } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { Border, Box, Button, LayoutImage, Region, ThemeImage, ThemeText, useWindowActivation } from '#base/theme';

/** `me_menu_sound_settings` - the window's own box. */
const WINDOW_WIDTH = 312;
const WINDOW_HEIGHT = 170;
/** `SettingsExtension.openSoundSettingsWindow`: `desktop.width - window.width - 200`. */
const RIGHT_MARGIN = 200;
/** `slider_movement_area` and the `slider_button` in it - their difference is `_referenceWidth`. */
const MOVEMENT_AREA_WIDTH = 144;
const KNOB_WIDTH = 12;
const REFERENCE_WIDTH = MOVEMENT_AREA_WIDTH - KNOB_WIDTH;

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

/** `MeMenuSoundSettingsSlider.getSliderPosition`, with Flash's min 0 and max 1. */
const knobPosition = (volume: number): number => Math.trunc(REFERENCE_WIDTH * clamp01(volume));

interface VolumeRowProps {
    /** `widget.memenu.settings.volume.*`. */
    label: string;
    /** The row's `y` in the window - the layout puts the three 28 apart. */
    top: number;
    volume: number;
    /** `SoundSettingsItem.saveVolume(value, false)`: a preview, never a store. */
    onPreview: (volume: number) => void;
}

/**
 * One `*_volume_container` (285 x 28). The knob is not snapped when it is let go - it stays where
 * the drag left it, and only a volume set from elsewhere moves it (Flash's `setValue`).
 */
const VolumeRow = ({ label, top, volume, onPreview }: VolumeRowProps) => {
    const [ draggedX, setDraggedX ] = useState<number | null>(null);
    const dragOriginRef = useRef<{ pointerX: number; knobX: number } | null>(null);
    const listenersRef = useRef<{ move: (event: PointerEvent) => void; up: () => void } | null>(null);
    const onPreviewRef = useRef(onPreview);

    useEffect(() => {
        onPreviewRef.current = onPreview;
    });

    const stopDragging = () => {
        const listeners = listenersRef.current;

        if (listeners) {
            window.removeEventListener('pointermove', listeners.move);
            window.removeEventListener('pointerup', listeners.up);
            listenersRef.current = null;
        }

        dragOriginRef.current = null;
    };

    useEffect(() => () => {
        const listeners = listenersRef.current;

        if (!listeners) return;

        window.removeEventListener('pointermove', listeners.move);
        window.removeEventListener('pointerup', listeners.up);
    }, []);

    // While a drag runs the knob follows the pointer; otherwise it follows the volume.
    const knobX = draggedX ?? knobPosition(volume);
    const muted = volume === 0;

    const setVolumeFromButton = (next: number) => {
        stopDragging();
        setDraggedX(null);
        onPreview(next);
    };

    // The press is deliberately left to bubble: the window's root reads it to take the top of
    // the window stack, and there is nothing between the two that a drag would disturb.
    const onKnobPointerDown = (event: FederatedPointerEvent) => {
        stopDragging();

        dragOriginRef.current = { pointerX: event.clientX, knobX };

        const move = (moveEvent: PointerEvent) => {
            const origin = dragOriginRef.current;

            if (!origin) return;

            const x = Math.min(REFERENCE_WIDTH, Math.max(0, Math.round(origin.knobX + (moveEvent.clientX - origin.pointerX))));

            setDraggedX(x);
            onPreviewRef.current(x / REFERENCE_WIDTH);
        };

        const up = () => {
            stopDragging();
            setDraggedX(null);
        };

        listenersRef.current = { move, up };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
    };

    return (
        <Region layout={{ position: 'absolute', left: 14, top, width: 285, height: 28 }}>
            <ThemeText
                text={label}
                textStyle="il_regular"
                textOptions={{ fill: '#ffffff' }}
                // The layout clears the illumina style's etch rather than smearing it under white text.
                flashFormat={{ etchingColor: 0x00000000 }}
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, top: 6, width: 60, height: 18 }}
            />
            <Region
                cursor="pointer"
                onPointerTap={() => setVolumeFromButton(0)}
                layout={{ position: 'absolute', left: 60, top: 0, width: 29, height: 30 }}
            >
                <ThemeImage
                    src={LayoutImage(muted ? 'toolbar/toolbar_memenu_settings_sounds_off_color.png' : 'toolbar/toolbar_memenu_settings_sounds_off_white.png')}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 0, top: 4, width: 29, height: 22 }}
                />
            </Region>
            <Box layout={{ position: 'absolute', left: 98, top: 0, width: MOVEMENT_AREA_WIDTH, height: 24 }}>
                <ThemeImage
                    src={LayoutImage('toolbar/toolbar_memenu_settings_slider_base.png')}
                    bitmap={{}}
                    eventMode="none"
                    layout={{ position: 'absolute', left: 2, top: 0, width: 139, height: 20 }}
                />
                <Box layout={{ position: 'absolute', left: 0, top: 9, width: MOVEMENT_AREA_WIDTH, height: 15 }}>
                    <ThemeImage
                        src={LayoutImage('toolbar/toolbar_memenu_settings_slider_button.png')}
                        bitmap={{ stretchedX: false, stretchedY: false }}
                        cursor="pointer"
                        onPointerDown={onKnobPointerDown}
                        layout={{ position: 'absolute', left: knobX, top: 0, width: KNOB_WIDTH, height: 15 }}
                    />
                </Box>
            </Box>
            <Region
                cursor="pointer"
                onPointerTap={() => setVolumeFromButton(1)}
                layout={{ position: 'absolute', left: 251, top: 0, width: 29, height: 30 }}
            >
                <ThemeImage
                    src={LayoutImage(muted ? 'toolbar/toolbar_memenu_settings_sounds_on_white.png' : 'toolbar/toolbar_memenu_settings_sounds_on_color.png')}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 0, top: 4, width: 29, height: 22 }}
                />
            </Region>
        </Region>
    );
};

export const ToolbarSoundSettingsView = ({ onClose }: { onClose: () => void }) => {
    const t = useTranslation();
    const { zIndex, onPointerDown } = useWindowActivation('toolbar_sound_settings');
    const { send } = useWebSocketContext();
    const uiVolume = useUserStore(x => x.uiVolume);
    const furniVolume = useUserStore(x => x.furniVolume);
    const traxVolume = useUserStore(x => x.traxVolume);

    // `SoundSettingsView.dispose` stores the three volumes however the window goes away.
    useEffect(() => () => saveSoundVolumes(send), [ send ]);

    return (
        <Region
            interactive
            zIndex={zIndex}
            onPointerDown={onPointerDown}
            layout={{ position: 'absolute', top: 0, right: RIGHT_MARGIN, width: WINDOW_WIDTH + 1, height: WINDOW_HEIGHT + 1 }}
        >
            <Border
                variant="6"
                tintColor="#79756e"
                layout={{ position: 'absolute', left: 1, top: 1, width: WINDOW_WIDTH, height: WINDOW_HEIGHT }}
            >
                <ThemeText
                    text={t('widget.memenu.settings.title')}
                    textStyle="u_regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 93, top: 5, width: 126, height: 17 }}
                />
                <Region
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', left: 10, top: 24, width: 292, height: 1 }}
                />
                <ThemeText
                    text={t('widget.memenu.settings.volume')}
                    textStyle="u_regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 82, top: 32, width: 148, height: 17 }}
                />
                <VolumeRow
                    label={t('widget.memenu.settings.volume.ui')}
                    top={48}
                    volume={uiVolume}
                    onPreview={volume => previewSoundVolumes(volume, furniVolume, traxVolume)}
                />
                <VolumeRow
                    label={t('widget.memenu.settings.volume.furni')}
                    top={76}
                    volume={furniVolume}
                    onPreview={volume => previewSoundVolumes(uiVolume, volume, traxVolume)}
                />
                <VolumeRow
                    label={t('widget.memenu.settings.volume.trax')}
                    top={104}
                    volume={traxVolume}
                    onPreview={volume => previewSoundVolumes(uiVolume, furniVolume, volume)}
                />
                <Button
                    variant="3"
                    textStyle="button_shiny_regular"
                    onPointerTap={onClose}
                    layout={{ position: 'absolute', left: 10, top: 132, width: 60, height: 28 }}
                >
                    {t('widget.memenu.back')}
                </Button>
            </Border>
        </Region>
    );
};
