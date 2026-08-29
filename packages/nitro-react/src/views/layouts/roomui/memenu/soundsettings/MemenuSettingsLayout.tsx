import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `952_memenu_settings_xml` (layout "memenu_effects", 312x170) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuSettingsLayoutProps {
    captionSettingsTitle?: string;
    captionVolumeText?: string;
    furniVolumeContainer?: MemenuSettingsLayoutFurniVolumeContainerProps;
    layout?: BoxLayout;
    onBackBtn?: () => void;
    traxVolumeContainer?: MemenuSettingsLayoutTraxVolumeContainerProps;
    uiVolumeContainer?: MemenuSettingsLayoutUiVolumeContainerProps;
}

export const MemenuSettingsLayout = ({ captionSettingsTitle, captionVolumeText, furniVolumeContainer, layout, onBackBtn, traxVolumeContainer, uiVolumeContainer }: MemenuSettingsLayoutProps) => {
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
                <Region
                    name="line"
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', width: 292, top: 22, height: 1 }}
                />
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

/** Named region `ui_volume_container` of MemenuSettingsLayout - configured through the parent's `uiVolumeContainer` prop. */
export interface MemenuSettingsLayoutUiVolumeContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onSliderButton?: () => void;
    onSoundsOff?: () => void;
    onSoundsOn?: () => void;
    srcSliderBase?: string;
    srcSliderBitmap?: string;
    srcSoundsOffIcon?: string;
    srcSoundsOnIcon?: string;
}

export const MemenuSettingsLayoutUiVolumeContainer = ({ captionTitle, layout, onSliderButton, onSoundsOff, onSoundsOn, srcSliderBase, srcSliderBitmap, srcSoundsOffIcon, srcSoundsOnIcon }: MemenuSettingsLayoutUiVolumeContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ui_volume_container"
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
            <Region
                name="volume_container"
                layout={{ position: 'absolute', left: 98, width: 144, top: 0, height: 24 }}
            >
                <ThemeImage
                    name="slider_base"
                    src={srcSliderBase}
                    layout={{ position: 'absolute', left: 2, width: 139, top: 0, height: 20 }}
                />
                <Region
                    name="slider_movement_area"
                    layout={{ position: 'absolute', left: 0, width: 144, top: 9, height: 15 }}
                >
                    <Region
                        name="slider_button"
                        onPointerTap={onSliderButton}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 132, width: 12, top: 0, height: 15 }}
                    >
                        <ThemeImage
                            name="slider_bitmap"
                            src={srcSliderBitmap}
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
                    src={srcSoundsOffIcon}
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
                    src={srcSoundsOnIcon}
                    layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `furni_volume_container` of MemenuSettingsLayout - configured through the parent's `furniVolumeContainer` prop. */
export interface MemenuSettingsLayoutFurniVolumeContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onSliderButton?: () => void;
    onSoundsOff?: () => void;
    onSoundsOn?: () => void;
    srcSliderBase?: string;
    srcSliderBitmap?: string;
    srcSoundsOffIcon?: string;
    srcSoundsOnIcon?: string;
}

export const MemenuSettingsLayoutFurniVolumeContainer = ({ captionTitle, layout, onSliderButton, onSoundsOff, onSoundsOn, srcSliderBase, srcSliderBitmap, srcSoundsOffIcon, srcSoundsOnIcon }: MemenuSettingsLayoutFurniVolumeContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="furni_volume_container"
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
            <Region
                name="volume_container"
                layout={{ position: 'absolute', left: 98, width: 144, top: 0, height: 24 }}
            >
                <ThemeImage
                    name="slider_base"
                    src={srcSliderBase}
                    layout={{ position: 'absolute', left: 2, width: 139, top: 0, height: 20 }}
                />
                <Region
                    name="slider_movement_area"
                    layout={{ position: 'absolute', left: 0, width: 144, top: 9, height: 15 }}
                >
                    <Region
                        name="slider_button"
                        onPointerTap={onSliderButton}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 132, width: 12, top: 0, height: 15 }}
                    >
                        <ThemeImage
                            name="slider_bitmap"
                            src={srcSliderBitmap}
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
                    src={srcSoundsOffIcon}
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
                    src={srcSoundsOnIcon}
                    layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `trax_volume_container` of MemenuSettingsLayout - configured through the parent's `traxVolumeContainer` prop. */
export interface MemenuSettingsLayoutTraxVolumeContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onSliderButton?: () => void;
    onSoundsOff?: () => void;
    onSoundsOn?: () => void;
    srcSliderBase?: string;
    srcSliderBitmap?: string;
    srcSoundsOffIcon?: string;
    srcSoundsOnIcon?: string;
}

export const MemenuSettingsLayoutTraxVolumeContainer = ({ captionTitle, layout, onSliderButton, onSoundsOff, onSoundsOn, srcSliderBase, srcSliderBitmap, srcSoundsOffIcon, srcSoundsOnIcon }: MemenuSettingsLayoutTraxVolumeContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="trax_volume_container"
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
            <Region
                name="volume_container"
                layout={{ position: 'absolute', left: 98, width: 144, top: 0, height: 24 }}
            >
                <ThemeImage
                    name="slider_base"
                    src={srcSliderBase}
                    layout={{ position: 'absolute', left: 2, width: 139, top: 0, height: 20 }}
                />
                <Region
                    name="slider_movement_area"
                    layout={{ position: 'absolute', left: 0, width: 144, top: 9, height: 15 }}
                >
                    <Region
                        name="slider_button"
                        onPointerTap={onSliderButton}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 132, width: 12, top: 0, height: 15 }}
                    >
                        <ThemeImage
                            name="slider_bitmap"
                            src={srcSliderBitmap}
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
                    src={srcSoundsOffIcon}
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
                    src={srcSoundsOnIcon}
                    layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 22 }}
                />
            </Region>
        </Region>
    );
};
