import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Frame, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1104_camera_editor_xml` (layout "camera_editor", 586x517) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CameraEditorLayoutProps {
    buttonSeparator?: CameraEditorLayoutButtonSeparatorProps;
    itemGrid?: CameraEditorLayoutItemGridProps;
    layout?: BoxLayout;
    onCancelButton?: () => void;
    onClose?: () => void;
    onPurchaseButton?: () => void;
    purchaseDisplayObject?: CameraEditorLayoutPurchaseDisplayObjectProps;
    saveButton?: CameraEditorLayoutSaveButtonProps;
    saveClickCatcher?: CameraEditorLayoutSaveClickCatcherProps;
    sliderContainer?: CameraEditorLayoutSliderContainerProps;
    srcImage?: string;
    visibleCaptionBg?: boolean;
    zoomButton?: CameraEditorLayoutZoomButtonProps;
}

export const CameraEditorLayout = ({ buttonSeparator, itemGrid, layout, onCancelButton, onClose, onPurchaseButton, purchaseDisplayObject, saveButton, saveClickCatcher, sliderContainer, srcImage, visibleCaptionBg, zoomButton }: CameraEditorLayoutProps) => {
    const t = useTranslation();
    const [ captionInputValue, setCaptionInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="bgBorder"
            name="bgBorder"
            caption={t('camera.editor.button.text')}
            tintColor="#555555"
            onClose={onClose}
            layout={{ width: 586, height: 517, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ThemeImage
                    name="image"
                    src={srcImage}
                    layout={{ position: 'absolute', left: 249, width: 320, top: 10, height: 320 }}
                />
                <Region
                    visible={visibleCaptionBg ?? false}
                    layout={{ position: 'absolute', left: 249, width: 321, top: 360, height: 51 }}
                >
                    <Border
                        variant="3"
                        name="caption_bg"
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <TextInput
                            value={captionInputValue}
                            onChange={setCaptionInputValue}
                            multiline
                            layout={{ position: 'absolute', left: 5, width: 310, top: 4, height: 47 }}
                        />
                    </Border>
                </Region>
                <ButtonThick
                    variant="6"
                    name="purchase_button"
                    dynamicStyle="brightness_and_shadow_under"
                    tintColor="#009e00"
                    onPointerTap={onPurchaseButton}
                    layout={{ position: 'absolute', left: 413, width: 150, top: 426, height: 28, minWidth: 150, maxWidth: 150 }}
                >
                    {t('camera.preview.button.text')}
                </ButtonThick>
                <CameraEditorLayoutPurchaseDisplayObject {...purchaseDisplayObject} />
                <Border
                    variant="2"
                    name="border_for_itemgrid"
                    layout={{ position: 'absolute', left: 11, width: 230, top: 51, height: 410 }}
                />
                <CameraEditorLayoutItemGrid {...itemGrid} />
                <CameraEditorLayoutButtonSeparator {...buttonSeparator} />
                <Button
                    variant="3"
                    name="cancel_button"
                    dynamicStyle="brightness_and_shadow_under"
                    tintColor="#cccccc"
                    onPointerTap={onCancelButton}
                    layout={{ position: 'absolute', left: 255, width: 150, top: 426, height: 28, minWidth: 150, maxWidth: 150 }}
                >
                    {t('catalog.purchase_confirmation.cancel')}
                </Button>
                <CameraEditorLayoutSliderContainer {...sliderContainer} />
                <CameraEditorLayoutZoomButton {...zoomButton} />
                <CameraEditorLayoutSaveButton {...saveButton} />
                <CameraEditorLayoutSaveClickCatcher {...saveClickCatcher} />
            </Region>
        </Frame>
    );
};

/** Named region `purchase_display_object` of CameraEditorLayout - configured through the parent's `purchaseDisplayObject` prop. */
export interface CameraEditorLayoutPurchaseDisplayObjectProps {
    layout?: BoxLayout;
}

export const CameraEditorLayoutPurchaseDisplayObject = ({ layout }: CameraEditorLayoutPurchaseDisplayObjectProps) => {
    return (
        <Region
            name="purchase_display_object"
            layout={{ position: 'absolute', left: 413, width: 150, top: 426, height: 28, ...layout }}
        />
    );
};

/** Named region `item_grid` of CameraEditorLayout - configured through the parent's `itemGrid` prop. */
export interface CameraEditorLayoutItemGridProps {
    layout?: BoxLayout;
}

export const CameraEditorLayoutItemGrid = ({ layout }: CameraEditorLayoutItemGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 16, width: 220, top: 56, height: 400, ...layout }}
        >
            <Region
                name="item_grid"
                layout={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `button_separator` of CameraEditorLayout - configured through the parent's `buttonSeparator` prop. */
export interface CameraEditorLayoutButtonSeparatorProps {
    layout?: BoxLayout;
}

export const CameraEditorLayoutButtonSeparator = ({ layout }: CameraEditorLayoutButtonSeparatorProps) => {
    return (
        <Region
            name="button_separator"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 249, width: 320, top: 415, height: 1, ...layout }}
        />
    );
};

/** Named region `shaft_click_area` of CameraEditorLayout - configured through the parent's `shaftClickArea` prop. */
export interface CameraEditorLayoutShaftClickAreaProps {
    layout?: BoxLayout;
    onShaftClickArea?: () => void;
}

export const CameraEditorLayoutShaftClickArea = ({ layout, onShaftClickArea }: CameraEditorLayoutShaftClickAreaProps) => {
    return (
        <Region
            name="shaft_click_area"
            onPointerTap={onShaftClickArea}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 292, top: 0, height: 8, ...layout }}
        />
    );
};

/** Named region `slider_movement_area` of CameraEditorLayout - configured through the parent's `sliderMovementArea` prop. */
export interface CameraEditorLayoutSliderMovementAreaProps {
    layout?: BoxLayout;
    srcSliderButton?: string;
}

export const CameraEditorLayoutSliderMovementArea = ({ layout, srcSliderButton }: CameraEditorLayoutSliderMovementAreaProps) => {
    return (
        <Region
            name="slider_movement_area"
            layout={{ position: 'absolute', left: 4, width: 312, top: 27, height: 24, ...layout }}
        >
            <ThemeImage
                name="slider_button"
                src={srcSliderButton}
                layout={{ position: 'absolute', left: 0, width: 24, top: 0, height: 24 }}
            />
        </Region>
    );
};

/** Named region `slider_container` of CameraEditorLayout - configured through the parent's `sliderContainer` prop. */
export interface CameraEditorLayoutSliderContainerProps {
    captionSliderEffectInfo?: string;
    layout?: BoxLayout;
    onSliderContainer?: () => void;
    shaftClickArea?: CameraEditorLayoutShaftClickAreaProps;
    sliderMovementArea?: CameraEditorLayoutSliderMovementAreaProps;
    srcSliderBase?: string;
}

export const CameraEditorLayoutSliderContainer = ({ captionSliderEffectInfo, layout, onSliderContainer, shaftClickArea, sliderMovementArea, srcSliderBase }: CameraEditorLayoutSliderContainerProps) => {
    return (
        <Region
            name="slider_container"
            onPointerTap={onSliderContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 249, width: 320, top: 271, height: 59, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="3"
                name="slider_bg_border"
                tintColor="#000000"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 59 }}
            />
            <Border
                variant="3"
                name="slider_dark_bottom"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 14, width: 292, top: 35, height: 8 }}
            >
                <CameraEditorLayoutShaftClickArea {...shaftClickArea} />
            </Border>
            <ThemeImage
                name="slider_base"
                src={srcSliderBase}
                layout={{ position: 'absolute', left: 16, width: 288, top: 36, height: 6 }}
            />
            <CameraEditorLayoutSliderMovementArea {...sliderMovementArea} />
            <Region
                name="slider_effect_info"
                layout={{ position: 'absolute', width: 110, top: 8, height: 18, maxWidth: 320, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSliderEffectInfo ?? 'default filter 50%'}
                    textOptions={{ fill: '#eeeeee' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `zoom_button` of CameraEditorLayout - configured through the parent's `zoomButton` prop. */
export interface CameraEditorLayoutZoomButtonProps {
    captionZoomText?: string;
    layout?: BoxLayout;
    onZoomButton?: () => void;
    srcMagnifier?: string;
}

export const CameraEditorLayoutZoomButton = ({ captionZoomText, layout, onZoomButton, srcMagnifier }: CameraEditorLayoutZoomButtonProps) => {
    const t = useTranslation();

    return (
        <Region
            name="zoom_button"
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onZoomButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 450, width: 120, top: 333, height: 24, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
                name="zoom_bg_border"
                tintColor="#c7c6bf"
                layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 24 }}
            />
            <Border
                variant="2"
                name="centerizer"
                tintColor="#c7c6bf"
                layout={{ position: 'absolute', marginLeft: -2, marginRight: 2, width: 106, top: 0, bottom: 1 }}
            >
                <ThemeImage
                    name="magnifier"
                    src={srcMagnifier ?? layoutImage('roomtools_magnifier.png')}
                    layout={{ position: 'absolute', left: 0, width: 13, top: 1, height: 22 }}
                />
                <Region
                    name="zoom_text"
                    layout={{ position: 'absolute', left: 16, width: 90, top: 4, height: 14, maxWidth: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionZoomText ?? t('room.zoom.button.text')}
                        textStyle="text-style-u-button-tab"
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `save_button` of CameraEditorLayout - configured through the parent's `saveButton` prop. */
export interface CameraEditorLayoutSaveButtonProps {
    captionSaveText?: string;
    layout?: BoxLayout;
    onSaveButton?: () => void;
    srcDownloadImage?: string;
}

export const CameraEditorLayoutSaveButton = ({ captionSaveText, layout, onSaveButton, srcDownloadImage }: CameraEditorLayoutSaveButtonProps) => {
    const t = useTranslation();

    return (
        <Region
            name="save_button"
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onSaveButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 326, width: 120, top: 333, height: 24, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
                name="save_bg_border"
                tintColor="#c7c6bf"
                layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 24 }}
            />
            <Border
                variant="2"
                name="centerizer"
                tintColor="#c7c6bf"
                layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, width: 109, top: 0, bottom: 4 }}
            >
                <ThemeImage
                    name="download_image"
                    src={srcDownloadImage ?? layoutImage('tools_tools_download_icon.png')}
                    layout={{ position: 'absolute', left: 0, width: 16, top: 4, height: 16 }}
                />
                <Region
                    name="save_text"
                    layout={{ position: 'absolute', left: 19, width: 90, top: 4, height: 14, maxWidth: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSaveText ?? t('floor.plan.editor.save')}
                        textStyle="text-style-u-button-tab"
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `save_click_catcher` of CameraEditorLayout - configured through the parent's `saveClickCatcher` prop. */
export interface CameraEditorLayoutSaveClickCatcherProps {
    layout?: BoxLayout;
}

export const CameraEditorLayoutSaveClickCatcher = ({ layout }: CameraEditorLayoutSaveClickCatcherProps) => {
    return (
        <Region
            name="save_click_catcher"
            layout={{ position: 'absolute', left: 326, width: 120, top: 333, height: 24, ...layout }}
        />
    );
};
