import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `ui_volume_container` of MeMenuSoundSettingsLayout - configured through the parent's `uiVolumeContainer` prop. */
export interface MeMenuSoundSettingsLayoutUiVolumeContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onSliderButton?: () => void;
    onSoundsOff?: () => void;
    onSoundsOn?: () => void;
    onUiVolumeContainer?: () => void;
    srcSliderBase?: string;
    srcSliderBitmap?: string;
    srcSoundsOffIcon?: string;
    srcSoundsOnIcon?: string;
}

export const MeMenuSoundSettingsLayoutUiVolumeContainer = ({ captionTitle, layout, onSliderButton, onSoundsOff, onSoundsOn, onUiVolumeContainer, srcSliderBase, srcSliderBitmap, srcSoundsOffIcon, srcSoundsOnIcon }: MeMenuSoundSettingsLayoutUiVolumeContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ui_volume_container"
            onPointerTap={onUiVolumeContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 14, width: 285, top: 48, height: 28, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 60, top: 6, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTitle ?? t('widget.memenu.settings.volume.ui')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="volume_container"
                layout={{ position: 'absolute', left: 98, width: 144, top: 0, height: 24 }}
            >
                <ThemeImage
                    name="slider_base"
                    src={srcSliderBase ?? layoutImage('toolbar_memenu_settings_slider_base.png')}
                    layout={{ position: 'absolute', left: 2, width: 139, top: 0, height: 20 }}
                />
                <Region
                    name="slider_movement_area"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 9, height: 15 }}
                >
                    <Region
                        name="slider_button"
                        onPointerTap={onSliderButton}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 132, width: 12, top: 0, bottom: 0 }}
                    >
                        <ThemeImage
                            name="slider_bitmap"
                            src={srcSliderBitmap ?? layoutImage('toolbar_memenu_settings_slider_button.png')}
                            layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 15 }}
                        />
                    </Region>
                </Region>
            </Region>
            <Region
                name="sounds_off"
                onPointerTap={onSoundsOff}
                cursor="pointer"
                layout={{ position: 'absolute', left: 60, width: 29, top: 0, height: 30 }}
            >
                <ThemeImage
                    name="sounds_off_icon"
                    src={srcSoundsOffIcon ?? layoutImage('toolbar_memenu_settings_sounds_off_white.png')}
                    layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
                />
            </Region>
            <Region
                name="sounds_on"
                onPointerTap={onSoundsOn}
                cursor="pointer"
                layout={{ position: 'absolute', left: 251, width: 29, top: 0, height: 30 }}
            >
                <ThemeImage
                    name="sounds_on_icon"
                    src={srcSoundsOnIcon ?? layoutImage('toolbar_memenu_settings_sounds_on_white.png')}
                    layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
                />
            </Region>
        </Region>
    );
};
