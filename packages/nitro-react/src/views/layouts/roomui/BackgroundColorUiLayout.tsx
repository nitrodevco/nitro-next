import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `914_background_color_ui_xml` (layout "background_color_ui", 292x255) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BackgroundColorUiLayoutProps {
    layout?: BoxLayout;
    onApplyButton?: () => void;
    onClose?: () => void;
    onOnOffButton?: () => void;
    tabContent?: BackgroundColorUiLayoutTabContentProps;
}

export const BackgroundColorUiLayout = ({ layout, onApplyButton, onClose, onOnOffButton, tabContent }: BackgroundColorUiLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="backgroundcolor_ui"
            name="backgroundcolor_ui"
            params={163841}
            caption={t('widget.backgroundcolour.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 292, height: 255, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="100"
                    params={16}
                    tintColor="#ffffff"
                    layout={{ position: 'absolute', left: 3, width: 275, top: 16, height: 171 }}
                >
                    <BackgroundColorUiLayoutTabContent {...tabContent} />
                </Border>
                <Button
                    variant="0"
                    name="apply_button"
                    params={131089}
                    onPointerTap={onApplyButton}
                    layout={{ position: 'absolute', left: 4, width: 203, top: 193, height: 24 }}
                >
                    {t('widget.backgroundcolor.button.apply')}
                </Button>
                <Button
                    variant="0"
                    name="on_off_button"
                    params={393233}
                    onPointerTap={onOnOffButton}
                    layout={{ position: 'absolute', right: 13, width: 189, top: 193, height: 24 }}
                >
                    {t('widget.backgroundcolor.button.on')}
                </Button>
            </Region>
        </Frame>
    );
};

/** Row template `header_container` of BackgroundColorUiLayout - pass real rows through its `items…` slot. */
export interface BackgroundColorUiLayoutHeaderContainerItemProps {
    captionDimmerInfo?: string;
    layout?: BoxLayout;
    srcColorPreviewBitmap?: string;
}

export const BackgroundColorUiLayoutHeaderContainerItem = ({ captionDimmerInfo, layout, srcColorPreviewBitmap }: BackgroundColorUiLayoutHeaderContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header_container"
            params={16}
            layout={{ width: 270, height: 29, flexShrink: 0, ...layout }}
        >
            <Region
                name="dimmer_info"
                params={16}
                layout={{ position: 'absolute', left: 4, width: 218, top: 0, height: 31, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDimmerInfo ?? t('widget.backgroundcolor.info')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 218 }}
                />
            </Region>
            <Border
                variant="100"
                params={16}
                layout={{ position: 'absolute', left: 239, width: 30, top: 2, height: 28 }}
            >
                <ThemeImage
                    name="color_preview_bitmap"
                    params={16}
                    src={srcColorPreviewBitmap}
                    layout={{ position: 'absolute', left: 1, width: 28, top: 1, height: 26 }}
                />
            </Border>
        </Region>
    );
};

/** Row template `spacer` of BackgroundColorUiLayout - pass real rows through its `items…` slot. */
export interface BackgroundColorUiLayoutSpacerItemProps {
    layout?: BoxLayout;
}

export const BackgroundColorUiLayoutSpacerItem = ({ layout }: BackgroundColorUiLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            params={16}
            layout={{ width: 30, height: 5, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `slider_movement_area` of BackgroundColorUiLayout - configured through the parent's `sliderMovementArea` prop. */
export interface BackgroundColorUiLayoutSliderMovementAreaProps {
    layout?: BoxLayout;
    srcSliderButton?: string;
}

export const BackgroundColorUiLayoutSliderMovementArea = ({ layout, srcSliderButton }: BackgroundColorUiLayoutSliderMovementAreaProps) => {
    return (
        <Region
            name="slider_movement_area"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 206, top: 13, height: 17, ...layout }}
        >
            <ThemeImage
                name="slider_button"
                params={33073}
                src={srcSliderButton}
                layout={{ position: 'absolute', left: 0, width: 12, top: 7, height: 17 }}
            />
        </Region>
    );
};

/** Row template `hue_container` of BackgroundColorUiLayout - pass real rows through its `items…` slot. */
export interface BackgroundColorUiLayoutHueContainerItemProps {
    captionParameter?: string;
    layout?: BoxLayout;
    sliderMovementArea?: BackgroundColorUiLayoutSliderMovementAreaProps;
    srcSliderBase?: string;
}

export const BackgroundColorUiLayoutHueContainerItem = ({ captionParameter, layout, sliderMovementArea, srcSliderBase }: BackgroundColorUiLayoutHueContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="hue_container"
            params={16}
            layout={{ width: 251, height: 42, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                name="parameter"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 144, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionParameter ?? t('widget.backgroundcolor.hue')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <ThemeImage
                name="slider_base"
                params={3932176}
                src={srcSliderBase}
                layout={{ position: 'absolute', marginLeft: -23, marginRight: 23, width: 201, alignSelf: 'center', marginTop: -3, marginBottom: 3, height: 12 }}
            />
            <BackgroundColorUiLayoutSliderMovementArea {...sliderMovementArea} />
        </Region>
    );
};

/** Named region `slider_movement_area` of BackgroundColorUiLayout - configured through the parent's `sliderMovementArea` prop. */
export interface BackgroundColorUiLayoutSliderMovementArea2Props {
    layout?: BoxLayout;
    srcSliderButton?: string;
}

export const BackgroundColorUiLayoutSliderMovementArea2 = ({ layout, srcSliderButton }: BackgroundColorUiLayoutSliderMovementArea2Props) => {
    return (
        <Region
            name="slider_movement_area"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 206, top: 13, height: 17, ...layout }}
        >
            <ThemeImage
                name="slider_button"
                params={33073}
                src={srcSliderButton}
                layout={{ position: 'absolute', left: 0, width: 12, top: 7, height: 17 }}
            />
        </Region>
    );
};

/** Row template `saturation_container` of BackgroundColorUiLayout - pass real rows through its `items…` slot. */
export interface BackgroundColorUiLayoutSaturationContainerItemProps {
    captionParameter?: string;
    layout?: BoxLayout;
    sliderMovementArea?: BackgroundColorUiLayoutSliderMovementArea2Props;
    srcSliderBase?: string;
}

export const BackgroundColorUiLayoutSaturationContainerItem = ({ captionParameter, layout, sliderMovementArea, srcSliderBase }: BackgroundColorUiLayoutSaturationContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="saturation_container"
            params={16}
            layout={{ width: 251, height: 42, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                name="parameter"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionParameter ?? t('widget.backgroundcolor.saturation')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <ThemeImage
                name="slider_base"
                params={3932176}
                src={srcSliderBase}
                layout={{ position: 'absolute', marginLeft: -23, marginRight: 23, width: 201, alignSelf: 'center', marginTop: -3, marginBottom: 3, height: 12 }}
            />
            <BackgroundColorUiLayoutSliderMovementArea2 {...sliderMovementArea} />
        </Region>
    );
};

/** Named region `slider_movement_area` of BackgroundColorUiLayout - configured through the parent's `sliderMovementArea` prop. */
export interface BackgroundColorUiLayoutSliderMovementArea3Props {
    layout?: BoxLayout;
    srcSliderButton?: string;
}

export const BackgroundColorUiLayoutSliderMovementArea3 = ({ layout, srcSliderButton }: BackgroundColorUiLayoutSliderMovementArea3Props) => {
    return (
        <Region
            name="slider_movement_area"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 206, top: 13, height: 17, ...layout }}
        >
            <ThemeImage
                name="slider_button"
                params={33073}
                src={srcSliderButton}
                layout={{ position: 'absolute', left: 0, width: 12, top: 7, height: 17 }}
            />
        </Region>
    );
};

/** Row template `lightness_container` of BackgroundColorUiLayout - pass real rows through its `items…` slot. */
export interface BackgroundColorUiLayoutLightnessContainerItemProps {
    captionParameter?: string;
    layout?: BoxLayout;
    sliderMovementArea?: BackgroundColorUiLayoutSliderMovementArea3Props;
    srcSliderBase?: string;
}

export const BackgroundColorUiLayoutLightnessContainerItem = ({ captionParameter, layout, sliderMovementArea, srcSliderBase }: BackgroundColorUiLayoutLightnessContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="lightness_container"
            params={16}
            layout={{ width: 251, height: 42, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                name="parameter"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionParameter ?? t('widget.backgroundcolor.lightness')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <ThemeImage
                name="slider_base"
                params={3932176}
                src={srcSliderBase}
                layout={{ position: 'absolute', marginLeft: -23, marginRight: 23, width: 201, alignSelf: 'center', marginTop: -3, marginBottom: 3, height: 12 }}
            />
            <BackgroundColorUiLayoutSliderMovementArea3 {...sliderMovementArea} />
        </Region>
    );
};

/** Named region `tab_content` of BackgroundColorUiLayout - configured through the parent's `tabContent` prop. */
export interface BackgroundColorUiLayoutTabContentProps {
    itemsTabContent?: ReactNode;
    layout?: BoxLayout;
}

export const BackgroundColorUiLayoutTabContent = ({ itemsTabContent, layout }: BackgroundColorUiLayoutTabContentProps) => {
    return (
        <Region
            name="tab_content"
            params={16}
            layout={{ position: 'absolute', left: 2, width: 270, top: 2, height: 166, flexDirection: 'column', ...layout }}
        >
            {itemsTabContent ?? (
                <>
                    <BackgroundColorUiLayoutHeaderContainerItem />
                    <BackgroundColorUiLayoutSpacerItem />
                    <BackgroundColorUiLayoutHueContainerItem />
                    <BackgroundColorUiLayoutSaturationContainerItem />
                    <BackgroundColorUiLayoutLightnessContainerItem />
                </>
            )}
        </Region>
    );
};
