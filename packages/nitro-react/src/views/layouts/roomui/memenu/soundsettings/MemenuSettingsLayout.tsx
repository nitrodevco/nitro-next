import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `952_memenu_settings_xml` (layout "memenu_effects", 312x170) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuSettingsLayoutProps {
    captionSettingsTitle?: string;
    captionVolumeText?: string;
    furniVolumeContainer?: MemenuSettingsLayoutFurniVolumeContainerProps;
    layout?: BoxLayout;
    line?: MemenuSettingsLayoutLineProps;
    onBackBtn?: () => void;
    traxVolumeContainer?: MemenuSettingsLayoutTraxVolumeContainerProps;
    uiVolumeContainer?: MemenuSettingsLayoutUiVolumeContainerProps;
}

export const MemenuSettingsLayout = ({ captionSettingsTitle, captionVolumeText, furniVolumeContainer, layout, line, onBackBtn, traxVolumeContainer, uiVolumeContainer }: MemenuSettingsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 312, height: 170, ...layout }}>
            <Border
                variant="1"
                name="settings_brdr"
                layout={{ position: 'absolute', left: 1, width: 312, top: 1, height: 170, justifyContent: 'center' }}
            >
                <Region
                    name="settings_title"
                    layout={{ position: 'absolute', width: 126, top: 5, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionSettingsTitle ?? t('widget.memenu.settings.title')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <MemenuSettingsLayoutLine {...line} />
                <Border
                    variant="3"
                    name="volume_grey_area"
                    tintColor="#666666"
                    layout={{ position: 'absolute', left: 10, width: 292, top: 29, height: 108 }}
                />
                <Region
                    name="volume_text"
                    layout={{ position: 'absolute', width: 148, top: 32, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionVolumeText ?? t('widget.memenu.settings.volume')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <MemenuSettingsLayoutUiVolumeContainer {...uiVolumeContainer} />
                <MemenuSettingsLayoutFurniVolumeContainer {...furniVolumeContainer} />
                <MemenuSettingsLayoutTraxVolumeContainer {...traxVolumeContainer} />
                <Button
                    variant="1"
                    name="back_btn"
                    onPointerTap={onBackBtn}
                    layout={{ position: 'absolute', left: 10, width: 60, bottom: 5, height: 22, minWidth: 60, maxWidth: 60 }}
                >
                    {t('widget.memenu.back')}
                </Button>
            </Border>
        </Region>
    );
};

/** Named region `line` of MemenuSettingsLayout - configured through the parent's `line` prop. */
export interface MemenuSettingsLayoutLineProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const MemenuSettingsLayoutLine = ({ layout, tags }: MemenuSettingsLayoutLineProps) => {
    return (
        <Region
            name="line"
            tags={tags}
            backgroundColor="#2f2f2f"
            layout={{ position: 'absolute', width: 292, top: 22, height: 1, ...layout }}
        />
    );
};

/** Named region `slider_button` of MemenuSettingsLayout - configured through the parent's `sliderButton` prop. */
export interface MemenuSettingsLayoutSliderButtonProps {
    layout?: BoxLayout;
    onSliderButton?: () => void;
    srcSliderBitmap?: string;
    tags?: string[];
}

export const MemenuSettingsLayoutSliderButton = ({ layout, onSliderButton, srcSliderBitmap, tags }: MemenuSettingsLayoutSliderButtonProps) => {
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
                src={srcSliderBitmap}
                layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 15 }}
            />
        </Region>
    );
};

/** Named region `slider_movement_area` of MemenuSettingsLayout - configured through the parent's `sliderMovementArea` prop. */
export interface MemenuSettingsLayoutSliderMovementAreaProps {
    layout?: BoxLayout;
    sliderButton?: MemenuSettingsLayoutSliderButtonProps;
    tags?: string[];
}

export const MemenuSettingsLayoutSliderMovementArea = ({ layout, sliderButton, tags }: MemenuSettingsLayoutSliderMovementAreaProps) => {
    return (
        <Region
            name="slider_movement_area"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 144, top: 9, height: 15, ...layout }}
        >
            <MemenuSettingsLayoutSliderButton {...sliderButton} />
        </Region>
    );
};

/** Named region `volume_container` of MemenuSettingsLayout - configured through the parent's `volumeContainer` prop. */
export interface MemenuSettingsLayoutVolumeContainerProps {
    layout?: BoxLayout;
    sliderMovementArea?: MemenuSettingsLayoutSliderMovementAreaProps;
    srcSliderBase?: string;
    tags?: string[];
}

export const MemenuSettingsLayoutVolumeContainer = ({ layout, sliderMovementArea, srcSliderBase, tags }: MemenuSettingsLayoutVolumeContainerProps) => {
    return (
        <Region
            name="volume_container"
            tags={tags}
            layout={{ position: 'absolute', left: 98, width: 144, top: 0, height: 24, ...layout }}
        >
            <ThemeImage
                name="slider_base"
                src={srcSliderBase}
                layout={{ position: 'absolute', left: 2, width: 139, top: 0, height: 20 }}
            />
            <MemenuSettingsLayoutSliderMovementArea {...sliderMovementArea} />
        </Region>
    );
};

/** Named region `sounds_off` of MemenuSettingsLayout - configured through the parent's `soundsOff` prop. */
export interface MemenuSettingsLayoutSoundsOffProps {
    layout?: BoxLayout;
    onSoundsOff?: () => void;
    srcSoundsOffIcon?: string;
    tags?: string[];
}

export const MemenuSettingsLayoutSoundsOff = ({ layout, onSoundsOff, srcSoundsOffIcon, tags }: MemenuSettingsLayoutSoundsOffProps) => {
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
                src={srcSoundsOffIcon}
                layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
            />
        </Region>
    );
};

/** Named region `sounds_on` of MemenuSettingsLayout - configured through the parent's `soundsOn` prop. */
export interface MemenuSettingsLayoutSoundsOnProps {
    layout?: BoxLayout;
    onSoundsOn?: () => void;
    srcSoundsOnIcon?: string;
    tags?: string[];
}

export const MemenuSettingsLayoutSoundsOn = ({ layout, onSoundsOn, srcSoundsOnIcon, tags }: MemenuSettingsLayoutSoundsOnProps) => {
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
                src={srcSoundsOnIcon}
                layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
            />
        </Region>
    );
};

/** Named region `ui_volume_container` of MemenuSettingsLayout - configured through the parent's `uiVolumeContainer` prop. */
export interface MemenuSettingsLayoutUiVolumeContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    soundsOff?: MemenuSettingsLayoutSoundsOffProps;
    soundsOn?: MemenuSettingsLayoutSoundsOnProps;
    tags?: string[];
    volumeContainer?: MemenuSettingsLayoutVolumeContainerProps;
}

export const MemenuSettingsLayoutUiVolumeContainer = ({ captionTitle, layout, soundsOff, soundsOn, tags, volumeContainer }: MemenuSettingsLayoutUiVolumeContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ui_volume_container"
            tags={tags}
            layout={{ position: 'absolute', left: 14, width: 275, top: 48, height: 28, ...layout }}
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
            <MemenuSettingsLayoutVolumeContainer {...volumeContainer} />
            <MemenuSettingsLayoutSoundsOff {...soundsOff} />
            <MemenuSettingsLayoutSoundsOn {...soundsOn} />
        </Region>
    );
};

/** Named region `slider_button` of MemenuSettingsLayout - configured through the parent's `sliderButton` prop. */
export interface MemenuSettingsLayoutSliderButton2Props {
    layout?: BoxLayout;
    onSliderButton?: () => void;
    srcSliderBitmap?: string;
    tags?: string[];
}

export const MemenuSettingsLayoutSliderButton2 = ({ layout, onSliderButton, srcSliderBitmap, tags }: MemenuSettingsLayoutSliderButton2Props) => {
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
                src={srcSliderBitmap}
                layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 15 }}
            />
        </Region>
    );
};

/** Named region `slider_movement_area` of MemenuSettingsLayout - configured through the parent's `sliderMovementArea` prop. */
export interface MemenuSettingsLayoutSliderMovementArea2Props {
    layout?: BoxLayout;
    sliderButton?: MemenuSettingsLayoutSliderButton2Props;
    tags?: string[];
}

export const MemenuSettingsLayoutSliderMovementArea2 = ({ layout, sliderButton, tags }: MemenuSettingsLayoutSliderMovementArea2Props) => {
    return (
        <Region
            name="slider_movement_area"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 144, top: 9, height: 15, ...layout }}
        >
            <MemenuSettingsLayoutSliderButton2 {...sliderButton} />
        </Region>
    );
};

/** Named region `volume_container` of MemenuSettingsLayout - configured through the parent's `volumeContainer` prop. */
export interface MemenuSettingsLayoutVolumeContainer2Props {
    layout?: BoxLayout;
    sliderMovementArea?: MemenuSettingsLayoutSliderMovementArea2Props;
    srcSliderBase?: string;
    tags?: string[];
}

export const MemenuSettingsLayoutVolumeContainer2 = ({ layout, sliderMovementArea, srcSliderBase, tags }: MemenuSettingsLayoutVolumeContainer2Props) => {
    return (
        <Region
            name="volume_container"
            tags={tags}
            layout={{ position: 'absolute', left: 98, width: 144, top: 0, height: 24, ...layout }}
        >
            <ThemeImage
                name="slider_base"
                src={srcSliderBase}
                layout={{ position: 'absolute', left: 2, width: 139, top: 0, height: 20 }}
            />
            <MemenuSettingsLayoutSliderMovementArea2 {...sliderMovementArea} />
        </Region>
    );
};

/** Named region `sounds_off` of MemenuSettingsLayout - configured through the parent's `soundsOff` prop. */
export interface MemenuSettingsLayoutSoundsOff2Props {
    layout?: BoxLayout;
    onSoundsOff?: () => void;
    srcSoundsOffIcon?: string;
    tags?: string[];
}

export const MemenuSettingsLayoutSoundsOff2 = ({ layout, onSoundsOff, srcSoundsOffIcon, tags }: MemenuSettingsLayoutSoundsOff2Props) => {
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
                src={srcSoundsOffIcon}
                layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
            />
        </Region>
    );
};

/** Named region `sounds_on` of MemenuSettingsLayout - configured through the parent's `soundsOn` prop. */
export interface MemenuSettingsLayoutSoundsOn2Props {
    layout?: BoxLayout;
    onSoundsOn?: () => void;
    srcSoundsOnIcon?: string;
    tags?: string[];
}

export const MemenuSettingsLayoutSoundsOn2 = ({ layout, onSoundsOn, srcSoundsOnIcon, tags }: MemenuSettingsLayoutSoundsOn2Props) => {
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
                src={srcSoundsOnIcon}
                layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
            />
        </Region>
    );
};

/** Named region `furni_volume_container` of MemenuSettingsLayout - configured through the parent's `furniVolumeContainer` prop. */
export interface MemenuSettingsLayoutFurniVolumeContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    soundsOff?: MemenuSettingsLayoutSoundsOff2Props;
    soundsOn?: MemenuSettingsLayoutSoundsOn2Props;
    tags?: string[];
    volumeContainer?: MemenuSettingsLayoutVolumeContainer2Props;
}

export const MemenuSettingsLayoutFurniVolumeContainer = ({ captionTitle, layout, soundsOff, soundsOn, tags, volumeContainer }: MemenuSettingsLayoutFurniVolumeContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="furni_volume_container"
            tags={tags}
            layout={{ position: 'absolute', left: 14, width: 275, top: 76, height: 28, ...layout }}
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
            <MemenuSettingsLayoutVolumeContainer2 {...volumeContainer} />
            <MemenuSettingsLayoutSoundsOff2 {...soundsOff} />
            <MemenuSettingsLayoutSoundsOn2 {...soundsOn} />
        </Region>
    );
};

/** Named region `slider_button` of MemenuSettingsLayout - configured through the parent's `sliderButton` prop. */
export interface MemenuSettingsLayoutSliderButton3Props {
    layout?: BoxLayout;
    onSliderButton?: () => void;
    srcSliderBitmap?: string;
    tags?: string[];
}

export const MemenuSettingsLayoutSliderButton3 = ({ layout, onSliderButton, srcSliderBitmap, tags }: MemenuSettingsLayoutSliderButton3Props) => {
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
                src={srcSliderBitmap}
                layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 15 }}
            />
        </Region>
    );
};

/** Named region `slider_movement_area` of MemenuSettingsLayout - configured through the parent's `sliderMovementArea` prop. */
export interface MemenuSettingsLayoutSliderMovementArea3Props {
    layout?: BoxLayout;
    sliderButton?: MemenuSettingsLayoutSliderButton3Props;
    tags?: string[];
}

export const MemenuSettingsLayoutSliderMovementArea3 = ({ layout, sliderButton, tags }: MemenuSettingsLayoutSliderMovementArea3Props) => {
    return (
        <Region
            name="slider_movement_area"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 144, top: 9, height: 15, ...layout }}
        >
            <MemenuSettingsLayoutSliderButton3 {...sliderButton} />
        </Region>
    );
};

/** Named region `volume_container` of MemenuSettingsLayout - configured through the parent's `volumeContainer` prop. */
export interface MemenuSettingsLayoutVolumeContainer3Props {
    layout?: BoxLayout;
    sliderMovementArea?: MemenuSettingsLayoutSliderMovementArea3Props;
    srcSliderBase?: string;
    tags?: string[];
}

export const MemenuSettingsLayoutVolumeContainer3 = ({ layout, sliderMovementArea, srcSliderBase, tags }: MemenuSettingsLayoutVolumeContainer3Props) => {
    return (
        <Region
            name="volume_container"
            tags={tags}
            layout={{ position: 'absolute', left: 98, width: 144, top: 0, height: 24, ...layout }}
        >
            <ThemeImage
                name="slider_base"
                src={srcSliderBase}
                layout={{ position: 'absolute', left: 2, width: 139, top: 0, height: 20 }}
            />
            <MemenuSettingsLayoutSliderMovementArea3 {...sliderMovementArea} />
        </Region>
    );
};

/** Named region `sounds_off` of MemenuSettingsLayout - configured through the parent's `soundsOff` prop. */
export interface MemenuSettingsLayoutSoundsOff3Props {
    layout?: BoxLayout;
    onSoundsOff?: () => void;
    srcSoundsOffIcon?: string;
    tags?: string[];
}

export const MemenuSettingsLayoutSoundsOff3 = ({ layout, onSoundsOff, srcSoundsOffIcon, tags }: MemenuSettingsLayoutSoundsOff3Props) => {
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
                src={srcSoundsOffIcon}
                layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
            />
        </Region>
    );
};

/** Named region `sounds_on` of MemenuSettingsLayout - configured through the parent's `soundsOn` prop. */
export interface MemenuSettingsLayoutSoundsOn3Props {
    layout?: BoxLayout;
    onSoundsOn?: () => void;
    srcSoundsOnIcon?: string;
    tags?: string[];
}

export const MemenuSettingsLayoutSoundsOn3 = ({ layout, onSoundsOn, srcSoundsOnIcon, tags }: MemenuSettingsLayoutSoundsOn3Props) => {
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
                src={srcSoundsOnIcon}
                layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
            />
        </Region>
    );
};

/** Named region `trax_volume_container` of MemenuSettingsLayout - configured through the parent's `traxVolumeContainer` prop. */
export interface MemenuSettingsLayoutTraxVolumeContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    soundsOff?: MemenuSettingsLayoutSoundsOff3Props;
    soundsOn?: MemenuSettingsLayoutSoundsOn3Props;
    tags?: string[];
    volumeContainer?: MemenuSettingsLayoutVolumeContainer3Props;
}

export const MemenuSettingsLayoutTraxVolumeContainer = ({ captionTitle, layout, soundsOff, soundsOn, tags, volumeContainer }: MemenuSettingsLayoutTraxVolumeContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="trax_volume_container"
            tags={tags}
            layout={{ position: 'absolute', left: 14, width: 275, top: 104, height: 28, ...layout }}
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
            <MemenuSettingsLayoutVolumeContainer3 {...volumeContainer} />
            <MemenuSettingsLayoutSoundsOff3 {...soundsOff} />
            <MemenuSettingsLayoutSoundsOn3 {...soundsOn} />
        </Region>
    );
};
