import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1220_me_menu_sound_settings_xml` (layout "memenu_effects", 312x170) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MeMenuSoundSettingsLayoutProps {
    captionSettingsTitle?: string;
    captionVolumeText?: string;
    furniVolumeContainer?: MeMenuSoundSettingsLayoutFurniVolumeContainerProps;
    layout?: BoxLayout;
    line?: MeMenuSoundSettingsLayoutLineProps;
    onBackBtn?: () => void;
    traxVolumeContainer?: MeMenuSoundSettingsLayoutTraxVolumeContainerProps;
    uiVolumeContainer?: MeMenuSoundSettingsLayoutUiVolumeContainerProps;
    visibleVolumeGreyArea?: boolean;
}

export const MeMenuSoundSettingsLayout = ({ captionSettingsTitle, captionVolumeText, furniVolumeContainer, layout, line, onBackBtn, traxVolumeContainer, uiVolumeContainer, visibleVolumeGreyArea }: MeMenuSoundSettingsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 312, height: 170, ...layout }}>
            <Border
                variant="6"
                name="settings_brdr"
                tintColor="#79756e"
                layout={{ position: 'absolute', left: 1, width: 312, top: 1, height: 170, justifyContent: 'center' }}
            >
                <Region
                    name="settings_title"
                    layout={{ position: 'absolute', width: 126, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionSettingsTitle ?? t('widget.memenu.settings.title')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <MeMenuSoundSettingsLayoutLine {...line} />
                <Region
                    visible={visibleVolumeGreyArea ?? false}
                    layout={{ position: 'absolute', left: 10, width: 292, top: 29, height: 108 }}
                >
                    <Border
                        variant="3"
                        name="volume_grey_area"
                        tintColor="#666666"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    name="volume_text"
                    layout={{ position: 'absolute', width: 148, top: 32, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionVolumeText ?? t('widget.memenu.settings.volume')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <MeMenuSoundSettingsLayoutUiVolumeContainer {...uiVolumeContainer} />
                <MeMenuSoundSettingsLayoutFurniVolumeContainer {...furniVolumeContainer} />
                <MeMenuSoundSettingsLayoutTraxVolumeContainer {...traxVolumeContainer} />
                <Button
                    variant="3"
                    name="back_btn"
                    onPointerTap={onBackBtn}
                    layout={{ position: 'absolute', left: 10, width: 60, bottom: 10, height: 28, minWidth: 60, maxWidth: 60 }}
                >
                    {t('widget.memenu.back')}
                </Button>
            </Border>
        </Region>
    );
};

/** Named region `line` of MeMenuSoundSettingsLayout - configured through the parent's `line` prop. */
export interface MeMenuSoundSettingsLayoutLineProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const MeMenuSoundSettingsLayoutLine = ({ layout, tags }: MeMenuSoundSettingsLayoutLineProps) => {
    return (
        <Region
            name="line"
            tags={tags}
            backgroundColor="#2f2f2f"
            layout={{ position: 'absolute', width: 292, top: 24, height: 1, ...layout }}
        />
    );
};

/** Named region `slider_button` of MeMenuSoundSettingsLayout - configured through the parent's `sliderButton` prop. */
export interface MeMenuSoundSettingsLayoutSliderButtonProps {
    layout?: BoxLayout;
    onSliderButton?: () => void;
    srcSliderBitmap?: string;
    tags?: string[];
}

export const MeMenuSoundSettingsLayoutSliderButton = ({ layout, onSliderButton, srcSliderBitmap, tags }: MeMenuSoundSettingsLayoutSliderButtonProps) => {
    return (
        <Region
            name="slider_button"
            tags={tags}
            onPointerTap={onSliderButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 132, width: 12, top: 0, height: 15, ...layout }}
        >
            <ThemeImage
                name="slider_bitmap"
                src={srcSliderBitmap ?? layoutImage('toolbar_memenu_settings_slider_button.png')}
                layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 15 }}
            />
        </Region>
    );
};

/** Named region `slider_movement_area` of MeMenuSoundSettingsLayout - configured through the parent's `sliderMovementArea` prop. */
export interface MeMenuSoundSettingsLayoutSliderMovementAreaProps {
    layout?: BoxLayout;
    sliderButton?: MeMenuSoundSettingsLayoutSliderButtonProps;
    tags?: string[];
}

export const MeMenuSoundSettingsLayoutSliderMovementArea = ({ layout, sliderButton, tags }: MeMenuSoundSettingsLayoutSliderMovementAreaProps) => {
    return (
        <Region
            name="slider_movement_area"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 144, top: 9, height: 15, ...layout }}
        >
            <MeMenuSoundSettingsLayoutSliderButton {...sliderButton} />
        </Region>
    );
};

/** Named region `volume_container` of MeMenuSoundSettingsLayout - configured through the parent's `volumeContainer` prop. */
export interface MeMenuSoundSettingsLayoutVolumeContainerProps {
    layout?: BoxLayout;
    sliderMovementArea?: MeMenuSoundSettingsLayoutSliderMovementAreaProps;
    srcSliderBase?: string;
    tags?: string[];
}

export const MeMenuSoundSettingsLayoutVolumeContainer = ({ layout, sliderMovementArea, srcSliderBase, tags }: MeMenuSoundSettingsLayoutVolumeContainerProps) => {
    return (
        <Region
            name="volume_container"
            tags={tags}
            layout={{ position: 'absolute', left: 98, width: 144, top: 0, height: 24, ...layout }}
        >
            <ThemeImage
                name="slider_base"
                src={srcSliderBase ?? layoutImage('toolbar_memenu_settings_slider_base.png')}
                layout={{ position: 'absolute', left: 2, width: 139, top: 0, height: 20 }}
            />
            <MeMenuSoundSettingsLayoutSliderMovementArea {...sliderMovementArea} />
        </Region>
    );
};

/** Named region `sounds_off` of MeMenuSoundSettingsLayout - configured through the parent's `soundsOff` prop. */
export interface MeMenuSoundSettingsLayoutSoundsOffProps {
    layout?: BoxLayout;
    onSoundsOff?: () => void;
    srcSoundsOffIcon?: string;
    tags?: string[];
}

export const MeMenuSoundSettingsLayoutSoundsOff = ({ layout, onSoundsOff, srcSoundsOffIcon, tags }: MeMenuSoundSettingsLayoutSoundsOffProps) => {
    return (
        <Region
            name="sounds_off"
            tags={tags}
            onPointerTap={onSoundsOff}
            cursor="pointer"
            layout={{ position: 'absolute', left: 60, width: 29, top: 0, height: 30, ...layout }}
        >
            <ThemeImage
                name="sounds_off_icon"
                src={srcSoundsOffIcon ?? layoutImage('toolbar_memenu_settings_sounds_off_white.png')}
                layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
            />
        </Region>
    );
};

/** Named region `sounds_on` of MeMenuSoundSettingsLayout - configured through the parent's `soundsOn` prop. */
export interface MeMenuSoundSettingsLayoutSoundsOnProps {
    layout?: BoxLayout;
    onSoundsOn?: () => void;
    srcSoundsOnIcon?: string;
    tags?: string[];
}

export const MeMenuSoundSettingsLayoutSoundsOn = ({ layout, onSoundsOn, srcSoundsOnIcon, tags }: MeMenuSoundSettingsLayoutSoundsOnProps) => {
    return (
        <Region
            name="sounds_on"
            tags={tags}
            onPointerTap={onSoundsOn}
            cursor="pointer"
            layout={{ position: 'absolute', left: 251, width: 29, top: 0, height: 30, ...layout }}
        >
            <ThemeImage
                name="sounds_on_icon"
                src={srcSoundsOnIcon ?? layoutImage('toolbar_memenu_settings_sounds_on_white.png')}
                layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
            />
        </Region>
    );
};

/** Named region `ui_volume_container` of MeMenuSoundSettingsLayout - configured through the parent's `uiVolumeContainer` prop. */
export interface MeMenuSoundSettingsLayoutUiVolumeContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onUiVolumeContainer?: () => void;
    soundsOff?: MeMenuSoundSettingsLayoutSoundsOffProps;
    soundsOn?: MeMenuSoundSettingsLayoutSoundsOnProps;
    tags?: string[];
    volumeContainer?: MeMenuSoundSettingsLayoutVolumeContainerProps;
}

export const MeMenuSoundSettingsLayoutUiVolumeContainer = ({ captionTitle, layout, onUiVolumeContainer, soundsOff, soundsOn, tags, volumeContainer }: MeMenuSoundSettingsLayoutUiVolumeContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ui_volume_container"
            tags={tags}
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
            <MeMenuSoundSettingsLayoutVolumeContainer {...volumeContainer} />
            <MeMenuSoundSettingsLayoutSoundsOff {...soundsOff} />
            <MeMenuSoundSettingsLayoutSoundsOn {...soundsOn} />
        </Region>
    );
};

/** Named region `slider_button` of MeMenuSoundSettingsLayout - configured through the parent's `sliderButton` prop. */
export interface MeMenuSoundSettingsLayoutSliderButton2Props {
    layout?: BoxLayout;
    onSliderButton?: () => void;
    srcSliderBitmap?: string;
    tags?: string[];
}

export const MeMenuSoundSettingsLayoutSliderButton2 = ({ layout, onSliderButton, srcSliderBitmap, tags }: MeMenuSoundSettingsLayoutSliderButton2Props) => {
    return (
        <Region
            name="slider_button"
            tags={tags}
            onPointerTap={onSliderButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 132, width: 12, top: 0, height: 15, ...layout }}
        >
            <ThemeImage
                name="slider_bitmap"
                src={srcSliderBitmap ?? layoutImage('toolbar_memenu_settings_slider_button.png')}
                layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 15 }}
            />
        </Region>
    );
};

/** Named region `slider_movement_area` of MeMenuSoundSettingsLayout - configured through the parent's `sliderMovementArea` prop. */
export interface MeMenuSoundSettingsLayoutSliderMovementArea2Props {
    layout?: BoxLayout;
    sliderButton?: MeMenuSoundSettingsLayoutSliderButton2Props;
    tags?: string[];
}

export const MeMenuSoundSettingsLayoutSliderMovementArea2 = ({ layout, sliderButton, tags }: MeMenuSoundSettingsLayoutSliderMovementArea2Props) => {
    return (
        <Region
            name="slider_movement_area"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 144, top: 9, height: 15, ...layout }}
        >
            <MeMenuSoundSettingsLayoutSliderButton2 {...sliderButton} />
        </Region>
    );
};

/** Named region `volume_container` of MeMenuSoundSettingsLayout - configured through the parent's `volumeContainer` prop. */
export interface MeMenuSoundSettingsLayoutVolumeContainer2Props {
    layout?: BoxLayout;
    sliderMovementArea?: MeMenuSoundSettingsLayoutSliderMovementArea2Props;
    srcSliderBase?: string;
    tags?: string[];
}

export const MeMenuSoundSettingsLayoutVolumeContainer2 = ({ layout, sliderMovementArea, srcSliderBase, tags }: MeMenuSoundSettingsLayoutVolumeContainer2Props) => {
    return (
        <Region
            name="volume_container"
            tags={tags}
            layout={{ position: 'absolute', left: 98, width: 144, top: 0, height: 24, ...layout }}
        >
            <ThemeImage
                name="slider_base"
                src={srcSliderBase ?? layoutImage('toolbar_memenu_settings_slider_base.png')}
                layout={{ position: 'absolute', left: 2, width: 139, top: 0, height: 20 }}
            />
            <MeMenuSoundSettingsLayoutSliderMovementArea2 {...sliderMovementArea} />
        </Region>
    );
};

/** Named region `sounds_off` of MeMenuSoundSettingsLayout - configured through the parent's `soundsOff` prop. */
export interface MeMenuSoundSettingsLayoutSoundsOff2Props {
    layout?: BoxLayout;
    onSoundsOff?: () => void;
    srcSoundsOffIcon?: string;
    tags?: string[];
}

export const MeMenuSoundSettingsLayoutSoundsOff2 = ({ layout, onSoundsOff, srcSoundsOffIcon, tags }: MeMenuSoundSettingsLayoutSoundsOff2Props) => {
    return (
        <Region
            name="sounds_off"
            tags={tags}
            onPointerTap={onSoundsOff}
            cursor="pointer"
            layout={{ position: 'absolute', left: 60, width: 29, top: 0, height: 30, ...layout }}
        >
            <ThemeImage
                name="sounds_off_icon"
                src={srcSoundsOffIcon ?? layoutImage('toolbar_memenu_settings_sounds_off_white.png')}
                layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
            />
        </Region>
    );
};

/** Named region `sounds_on` of MeMenuSoundSettingsLayout - configured through the parent's `soundsOn` prop. */
export interface MeMenuSoundSettingsLayoutSoundsOn2Props {
    layout?: BoxLayout;
    onSoundsOn?: () => void;
    srcSoundsOnIcon?: string;
    tags?: string[];
}

export const MeMenuSoundSettingsLayoutSoundsOn2 = ({ layout, onSoundsOn, srcSoundsOnIcon, tags }: MeMenuSoundSettingsLayoutSoundsOn2Props) => {
    return (
        <Region
            name="sounds_on"
            tags={tags}
            onPointerTap={onSoundsOn}
            cursor="pointer"
            layout={{ position: 'absolute', left: 251, width: 29, top: 0, height: 30, ...layout }}
        >
            <ThemeImage
                name="sounds_on_icon"
                src={srcSoundsOnIcon ?? layoutImage('toolbar_memenu_settings_sounds_on_white.png')}
                layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
            />
        </Region>
    );
};

/** Named region `furni_volume_container` of MeMenuSoundSettingsLayout - configured through the parent's `furniVolumeContainer` prop. */
export interface MeMenuSoundSettingsLayoutFurniVolumeContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    soundsOff?: MeMenuSoundSettingsLayoutSoundsOff2Props;
    soundsOn?: MeMenuSoundSettingsLayoutSoundsOn2Props;
    tags?: string[];
    volumeContainer?: MeMenuSoundSettingsLayoutVolumeContainer2Props;
}

export const MeMenuSoundSettingsLayoutFurniVolumeContainer = ({ captionTitle, layout, soundsOff, soundsOn, tags, volumeContainer }: MeMenuSoundSettingsLayoutFurniVolumeContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="furni_volume_container"
            tags={tags}
            layout={{ position: 'absolute', left: 14, width: 285, top: 76, height: 28, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 60, top: 6, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTitle ?? t('widget.memenu.settings.volume.furni')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <MeMenuSoundSettingsLayoutVolumeContainer2 {...volumeContainer} />
            <MeMenuSoundSettingsLayoutSoundsOff2 {...soundsOff} />
            <MeMenuSoundSettingsLayoutSoundsOn2 {...soundsOn} />
        </Region>
    );
};

/** Named region `slider_button` of MeMenuSoundSettingsLayout - configured through the parent's `sliderButton` prop. */
export interface MeMenuSoundSettingsLayoutSliderButton3Props {
    layout?: BoxLayout;
    onSliderButton?: () => void;
    srcSliderBitmap?: string;
    tags?: string[];
}

export const MeMenuSoundSettingsLayoutSliderButton3 = ({ layout, onSliderButton, srcSliderBitmap, tags }: MeMenuSoundSettingsLayoutSliderButton3Props) => {
    return (
        <Region
            name="slider_button"
            tags={tags}
            onPointerTap={onSliderButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 132, width: 12, top: 0, height: 15, ...layout }}
        >
            <ThemeImage
                name="slider_bitmap"
                src={srcSliderBitmap ?? layoutImage('toolbar_memenu_settings_slider_button.png')}
                layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 15 }}
            />
        </Region>
    );
};

/** Named region `slider_movement_area` of MeMenuSoundSettingsLayout - configured through the parent's `sliderMovementArea` prop. */
export interface MeMenuSoundSettingsLayoutSliderMovementArea3Props {
    layout?: BoxLayout;
    sliderButton?: MeMenuSoundSettingsLayoutSliderButton3Props;
    tags?: string[];
}

export const MeMenuSoundSettingsLayoutSliderMovementArea3 = ({ layout, sliderButton, tags }: MeMenuSoundSettingsLayoutSliderMovementArea3Props) => {
    return (
        <Region
            name="slider_movement_area"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 144, top: 9, height: 15, ...layout }}
        >
            <MeMenuSoundSettingsLayoutSliderButton3 {...sliderButton} />
        </Region>
    );
};

/** Named region `volume_container` of MeMenuSoundSettingsLayout - configured through the parent's `volumeContainer` prop. */
export interface MeMenuSoundSettingsLayoutVolumeContainer3Props {
    layout?: BoxLayout;
    sliderMovementArea?: MeMenuSoundSettingsLayoutSliderMovementArea3Props;
    srcSliderBase?: string;
    tags?: string[];
}

export const MeMenuSoundSettingsLayoutVolumeContainer3 = ({ layout, sliderMovementArea, srcSliderBase, tags }: MeMenuSoundSettingsLayoutVolumeContainer3Props) => {
    return (
        <Region
            name="volume_container"
            tags={tags}
            layout={{ position: 'absolute', left: 98, width: 144, top: 0, height: 24, ...layout }}
        >
            <ThemeImage
                name="slider_base"
                src={srcSliderBase ?? layoutImage('toolbar_memenu_settings_slider_base.png')}
                layout={{ position: 'absolute', left: 2, width: 139, top: 0, height: 20 }}
            />
            <MeMenuSoundSettingsLayoutSliderMovementArea3 {...sliderMovementArea} />
        </Region>
    );
};

/** Named region `sounds_off` of MeMenuSoundSettingsLayout - configured through the parent's `soundsOff` prop. */
export interface MeMenuSoundSettingsLayoutSoundsOff3Props {
    layout?: BoxLayout;
    onSoundsOff?: () => void;
    srcSoundsOffIcon?: string;
    tags?: string[];
}

export const MeMenuSoundSettingsLayoutSoundsOff3 = ({ layout, onSoundsOff, srcSoundsOffIcon, tags }: MeMenuSoundSettingsLayoutSoundsOff3Props) => {
    return (
        <Region
            name="sounds_off"
            tags={tags}
            onPointerTap={onSoundsOff}
            cursor="pointer"
            layout={{ position: 'absolute', left: 60, width: 29, top: 0, height: 30, ...layout }}
        >
            <ThemeImage
                name="sounds_off_icon"
                src={srcSoundsOffIcon ?? layoutImage('toolbar_memenu_settings_sounds_off_white.png')}
                layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
            />
        </Region>
    );
};

/** Named region `sounds_on` of MeMenuSoundSettingsLayout - configured through the parent's `soundsOn` prop. */
export interface MeMenuSoundSettingsLayoutSoundsOn3Props {
    layout?: BoxLayout;
    onSoundsOn?: () => void;
    srcSoundsOnIcon?: string;
    tags?: string[];
}

export const MeMenuSoundSettingsLayoutSoundsOn3 = ({ layout, onSoundsOn, srcSoundsOnIcon, tags }: MeMenuSoundSettingsLayoutSoundsOn3Props) => {
    return (
        <Region
            name="sounds_on"
            tags={tags}
            onPointerTap={onSoundsOn}
            cursor="pointer"
            layout={{ position: 'absolute', left: 251, width: 29, top: 0, height: 30, ...layout }}
        >
            <ThemeImage
                name="sounds_on_icon"
                src={srcSoundsOnIcon ?? layoutImage('toolbar_memenu_settings_sounds_on_white.png')}
                layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
            />
        </Region>
    );
};

/** Named region `trax_volume_container` of MeMenuSoundSettingsLayout - configured through the parent's `traxVolumeContainer` prop. */
export interface MeMenuSoundSettingsLayoutTraxVolumeContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    soundsOff?: MeMenuSoundSettingsLayoutSoundsOff3Props;
    soundsOn?: MeMenuSoundSettingsLayoutSoundsOn3Props;
    tags?: string[];
    volumeContainer?: MeMenuSoundSettingsLayoutVolumeContainer3Props;
}

export const MeMenuSoundSettingsLayoutTraxVolumeContainer = ({ captionTitle, layout, soundsOff, soundsOn, tags, volumeContainer }: MeMenuSoundSettingsLayoutTraxVolumeContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="trax_volume_container"
            tags={tags}
            layout={{ position: 'absolute', left: 14, width: 285, top: 104, height: 28, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 60, top: 6, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTitle ?? t('widget.memenu.settings.volume.trax')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <MeMenuSoundSettingsLayoutVolumeContainer3 {...volumeContainer} />
            <MeMenuSoundSettingsLayoutSoundsOff3 {...soundsOff} />
            <MeMenuSoundSettingsLayoutSoundsOn3 {...soundsOn} />
        </Region>
    );
};
