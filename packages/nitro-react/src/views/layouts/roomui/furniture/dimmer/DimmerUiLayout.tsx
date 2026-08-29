import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, Frame, Region, TabButton, TabContext, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `848_dimmer_ui_xml` (layout "dimmer_ui", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DimmerUiLayoutProps {
    captionOffText?: string;
    layout?: BoxLayout;
    onApplyButton?: () => void;
    onClose?: () => void;
    onOnOffButton?: () => void;
    srcOffImage?: string;
    tabbedview?: DimmerUiLayoutTabbedviewProps;
}

export const DimmerUiLayout = ({ captionOffText, layout, onApplyButton, onClose, onOnOffButton, srcOffImage, tabbedview }: DimmerUiLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="dimmer_ui"
            name="dimmer_ui"
            params={163841}
            caption={t('widget.dimmer.title')}
            onClose={onClose}
            layout={{ width: 277, height: 225, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="0"
                    name="off_border"
                    params={16}
                    layout={{ position: 'absolute', left: 6, width: 254, top: 27, height: 133 }}
                >
                    <Region
                        name="off_text"
                        params={16}
                        layout={{ position: 'absolute', left: 19, width: 219, top: 93, height: 34, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionOffText ?? t('widget.dimmer.info.off')}
                            textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 219 }}
                        />
                    </Region>
                    <ThemeImage
                        name="off_image"
                        params={16}
                        src={srcOffImage}
                        layout={{ position: 'absolute', left: 96, width: 56, top: 11, height: 79 }}
                    />
                </Border>
                <DimmerUiLayoutTabbedview {...tabbedview} />
                <Button
                    variant="0"
                    name="apply_button"
                    params={131089}
                    onPointerTap={onApplyButton}
                    layout={{ position: 'absolute', left: 4, width: 89, top: 166, height: 24 }}
                >
                    {t('widget.dimmer.button.apply')}
                </Button>
                <Button
                    variant="0"
                    name="on_off_button"
                    params={393233}
                    onPointerTap={onOnOffButton}
                    layout={{ position: 'absolute', right: 16, width: 58, top: 167, height: 22 }}
                >
                    {t('widget.dimmer.button.on')}
                </Button>
            </Region>
        </Frame>
    );
};

/** Named region `color_grid` of DimmerUiLayout - configured through the parent's `colorGrid` prop. */
export interface DimmerUiLayoutColorGridProps {
    layout?: BoxLayout;
}

export const DimmerUiLayoutColorGrid = ({ layout }: DimmerUiLayoutColorGridProps) => {
    return (
        <Region
            name="color_grid"
            params={17}
            layout={{ position: 'absolute', left: 0, width: 210, top: 0, height: 30, flexDirection: 'row', flexWrap: 'wrap', gap: 2, ...layout }}
        />
    );
};

/** Named region `color_grid_container` of DimmerUiLayout - configured through the parent's `colorGridContainer` prop. */
export interface DimmerUiLayoutColorGridContainerProps {
    colorGrid?: DimmerUiLayoutColorGridProps;
    layout?: BoxLayout;
    onColorGridContainer?: () => void;
}

export const DimmerUiLayoutColorGridContainer = ({ colorGrid, layout, onColorGridContainer }: DimmerUiLayoutColorGridContainerProps) => {
    return (
        <Region
            name="color_grid_container"
            params={17}
            onPointerTap={onColorGridContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 2, width: 210, top: 1, height: 30, ...layout }}
        >
            <DimmerUiLayoutColorGrid {...colorGrid} />
        </Region>
    );
};

/** Named region `slider_movement_area` of DimmerUiLayout - configured through the parent's `sliderMovementArea` prop. */
export interface DimmerUiLayoutSliderMovementAreaProps {
    layout?: BoxLayout;
    srcSliderButton?: string;
}

export const DimmerUiLayoutSliderMovementArea = ({ layout, srcSliderButton }: DimmerUiLayoutSliderMovementAreaProps) => {
    return (
        <Region
            name="slider_movement_area"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 206, top: 1, height: 17, ...layout }}
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

/** Named region `brightness_container` of DimmerUiLayout - configured through the parent's `brightnessContainer` prop. */
export interface DimmerUiLayoutBrightnessContainerProps {
    layout?: BoxLayout;
    sliderMovementArea?: DimmerUiLayoutSliderMovementAreaProps;
    srcSliderBase?: string;
}

export const DimmerUiLayoutBrightnessContainer = ({ layout, sliderMovementArea, srcSliderBase }: DimmerUiLayoutBrightnessContainerProps) => {
    return (
        <Region
            name="brightness_container"
            params={16}
            layout={{ position: 'absolute', left: 4, width: 206, top: 35, height: 18, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="slider_base"
                params={3932176}
                src={srcSliderBase}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 201, alignSelf: 'center', marginTop: -3, marginBottom: 3, height: 12 }}
            />
            <DimmerUiLayoutSliderMovementArea {...sliderMovementArea} />
        </Region>
    );
};

/** Named region `tab_content` of DimmerUiLayout - configured through the parent's `tabContent` prop. */
export interface DimmerUiLayoutTabContentProps {
    brightnessContainer?: DimmerUiLayoutBrightnessContainerProps;
    captionDimmerInfo?: string;
    captionTypeText?: string;
    colorGridContainer?: DimmerUiLayoutColorGridContainerProps;
    layout?: BoxLayout;
    onTypeCheckbox?: () => void;
}

export const DimmerUiLayoutTabContent = ({ brightnessContainer, captionDimmerInfo, captionTypeText, colorGridContainer, layout, onTypeCheckbox }: DimmerUiLayoutTabContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="tab_content"
            params={16}
            layout={{ position: 'absolute', left: 17, width: 228, top: 34, height: 118, ...layout }}
        >
            <DimmerUiLayoutColorGridContainer {...colorGridContainer} />
            <DimmerUiLayoutBrightnessContainer {...brightnessContainer} />
            <CheckBox
                variant="0"
                name="type_checkbox"
                params={17}
                onPointerTap={onTypeCheckbox}
                layout={{ position: 'absolute', left: 3, width: 18, top: 60, height: 18 }}
            >
                {t('widget.dimmer.title')}
            </CheckBox>
            <Region
                name="type_text"
                params={16}
                layout={{ position: 'absolute', left: 22, width: 200, top: 61, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTypeText ?? t('widget.dimmer.type.checkbox')}
                    textOptions={{ fill: '#000000' }}
                />
            </Region>
            <Region
                name="dimmer_info"
                params={16}
                layout={{ position: 'absolute', left: 4, width: 222, top: 80, height: 46, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDimmerInfo ?? t('widget.dimmer.info')}
                    textOptions={{ fill: '#999999', wordWrap: true, wordWrapWidth: 222 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `tabbedview` of DimmerUiLayout - configured through the parent's `tabbedview` prop. */
export interface DimmerUiLayoutTabbedviewProps {
    layout?: BoxLayout;
    onTab1?: () => void;
    onTab2?: () => void;
    onTab3?: () => void;
    onTabbedview?: () => void;
    tabContent?: DimmerUiLayoutTabContentProps;
}

export const DimmerUiLayoutTabbedview = ({ layout, onTab1, onTab2, onTab3, onTabbedview, tabContent }: DimmerUiLayoutTabbedviewProps) => {
    const t = useTranslation();

    return (
        <Region
            name="tabbedview"
            params={17}
            onPointerTap={onTabbedview}
            cursor="pointer"
            layout={{ position: 'absolute', left: 2, width: 266, top: -1, height: 166, ...layout }}
        >
            <TabContext
                variant="0"
                name="tab_context"
                params={17}
                layout={{ position: 'absolute', left: 2, width: 258, top: 1, height: 163 }}
            >
                <TabButton
                    variant="0"
                    name="tab_1"
                    params={131089}
                    onPointerTap={onTab1}
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 21, maxWidth: 100 }}
                >
                    {t('widget.dimmer.tab.1')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="tab_2"
                    params={131089}
                    onPointerTap={onTab2}
                    layout={{ position: 'absolute', left: 60, width: 63, top: 0, height: 21, maxWidth: 100 }}
                >
                    {t('widget.dimmer.tab.2')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="tab_3"
                    params={131089}
                    onPointerTap={onTab3}
                    layout={{ position: 'absolute', left: 123, width: 63, top: 0, height: 21, maxWidth: 100 }}
                >
                    {t('widget.dimmer.tab.3')}
                </TabButton>
            </TabContext>
            <DimmerUiLayoutTabContent {...tabContent} />
        </Region>
    );
};
