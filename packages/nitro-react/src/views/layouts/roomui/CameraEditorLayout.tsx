import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Frame, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1104_camera_editor_xml` (layout "camera_editor", 586x517) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CameraEditorLayoutProps {
    captionSaveText?: string;
    captionSliderEffectInfo?: string;
    captionZoomText?: string;
    layout?: BoxLayout;
    onCancelButton?: () => void;
    onClose?: () => void;
    onPurchaseButton?: () => void;
    onSaveButton?: () => void;
    onShaftClickArea?: () => void;
    onSliderContainer?: () => void;
    onZoomButton?: () => void;
    srcDownloadImage?: string;
    srcImage?: string;
    srcMagnifier?: string;
    srcSliderBase?: string;
    srcSliderButton?: string;
    visibleCaptionBg?: boolean;
}

export const CameraEditorLayout = ({ captionSaveText, captionSliderEffectInfo, captionZoomText, layout, onCancelButton, onClose, onPurchaseButton, onSaveButton, onShaftClickArea, onSliderContainer, onZoomButton, srcDownloadImage, srcImage, srcMagnifier, srcSliderBase, srcSliderButton, visibleCaptionBg }: CameraEditorLayoutProps) => {
    const t = useTranslation();
    const [ captionInputValue, setCaptionInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="bgBorder"
            name="bgBorder"
            params={32769}
            caption={t('camera.editor.button.text')}
            tintColor="#555555"
            onClose={onClose}
            layout={{ width: 586, height: 517, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ThemeImage
                    name="image"
                    params={20}
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
                        params={20}
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
                    params={131073}
                    dynamicStyle="brightness_and_shadow_under"
                    tintColor="#009e00"
                    onPointerTap={onPurchaseButton}
                    layout={{ position: 'absolute', left: 413, width: 150, top: 426, height: 28, minWidth: 150, maxWidth: 150 }}
                >
                    {t('camera.preview.button.text')}
                </ButtonThick>
                <Region
                    name="purchase_display_object"
                    layout={{ position: 'absolute', left: 413, width: 150, top: 426, height: 28 }}
                />
                <Border
                    variant="2"
                    name="border_for_itemgrid"
                    params={16}
                    layout={{ position: 'absolute', left: 11, width: 230, top: 51, height: 410 }}
                />
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 16, width: 220, top: 56, height: 400 }}
                >
                    <Region
                        name="item_grid"
                        params={16}
                        layout={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
                    />
                </ScrollArea>
                <Region
                    name="button_separator"
                    params={16}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 249, width: 320, top: 415, height: 1 }}
                />
                <Button
                    variant="3"
                    name="cancel_button"
                    params={131073}
                    dynamicStyle="brightness_and_shadow_under"
                    tintColor="#cccccc"
                    onPointerTap={onCancelButton}
                    layout={{ position: 'absolute', left: 255, width: 150, top: 426, height: 28, minWidth: 150, maxWidth: 150 }}
                >
                    {t('catalog.purchase_confirmation.cancel')}
                </Button>
                <Region
                    name="slider_container"
                    params={17}
                    onPointerTap={onSliderContainer}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 249, width: 320, top: 271, height: 59, justifyContent: 'center' }}
                >
                    <Border
                        variant="3"
                        name="slider_bg_border"
                        params={16}
                        tintColor="#000000"
                        blend={0.5}
                        layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 59 }}
                    />
                    <Border
                        variant="3"
                        name="slider_dark_bottom"
                        params={16}
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 14, width: 292, top: 35, height: 8 }}
                    >
                        <Region
                            name="shaft_click_area"
                            params={17}
                            onPointerTap={onShaftClickArea}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 0, width: 292, top: 0, height: 8 }}
                        />
                    </Border>
                    <ThemeImage
                        name="slider_base"
                        params={16}
                        src={srcSliderBase}
                        layout={{ position: 'absolute', left: 16, width: 288, top: 36, height: 6 }}
                    />
                    <Region
                        name="slider_movement_area"
                        params={16}
                        layout={{ position: 'absolute', left: 4, width: 312, top: 27, height: 24 }}
                    >
                        <ThemeImage
                            name="slider_button"
                            params={33073}
                            src={srcSliderButton}
                            layout={{ position: 'absolute', left: 0, width: 24, top: 0, height: 24 }}
                        />
                    </Region>
                    <Region
                        name="slider_effect_info"
                        params={934096}
                        layout={{ position: 'absolute', width: 110, top: 8, height: 18, maxWidth: 320, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionSliderEffectInfo ?? 'default filter 50%'}
                            textOptions={{ fill: '#eeeeee' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="zoom_button"
                    params={131073}
                    dynamicStyle="brightness_and_shadow_under"
                    onPointerTap={onZoomButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 450, width: 120, top: 333, height: 24, justifyContent: 'center' }}
                >
                    <Border
                        variant="2"
                        name="zoom_bg_border"
                        params={16}
                        tintColor="#c7c6bf"
                        layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 24 }}
                    />
                    <Border
                        variant="2"
                        name="centerizer"
                        params={935938}
                        tintColor="#c7c6bf"
                        layout={{ position: 'absolute', marginLeft: -2, marginRight: 2, width: 106, top: 0, bottom: 1 }}
                    >
                        <ThemeImage
                            name="magnifier"
                            params={16}
                            src={srcMagnifier ?? layoutImage('roomtools_magnifier.png')}
                            layout={{ position: 'absolute', left: 0, width: 13, top: 1, height: 22 }}
                        />
                        <Region
                            name="zoom_text"
                            params={16}
                            layout={{ position: 'absolute', left: 16, width: 90, top: 4, height: 14, maxWidth: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionZoomText ?? t('room.zoom.button.text')}
                                textStyle="text-style-u-button-tab"
                            />
                        </Region>
                    </Border>
                </Region>
                <Region
                    name="save_button"
                    params={131073}
                    dynamicStyle="brightness_and_shadow_under"
                    onPointerTap={onSaveButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 326, width: 120, top: 333, height: 24, justifyContent: 'center' }}
                >
                    <Border
                        variant="2"
                        name="save_bg_border"
                        params={16}
                        tintColor="#c7c6bf"
                        layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 24 }}
                    />
                    <Border
                        variant="2"
                        name="centerizer"
                        params={935938}
                        tintColor="#c7c6bf"
                        layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, width: 109, top: 0, bottom: 4 }}
                    >
                        <ThemeImage
                            name="download_image"
                            params={16}
                            src={srcDownloadImage ?? layoutImage('tools_tools_download_icon.png')}
                            layout={{ position: 'absolute', left: 0, width: 16, top: 4, height: 16 }}
                        />
                        <Region
                            name="save_text"
                            params={16}
                            layout={{ position: 'absolute', left: 19, width: 90, top: 4, height: 14, maxWidth: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionSaveText ?? t('floor.plan.editor.save')}
                                textStyle="text-style-u-button-tab"
                            />
                        </Region>
                    </Border>
                </Region>
                <Region
                    name="save_click_catcher"
                    layout={{ position: 'absolute', left: 326, width: 120, top: 333, height: 24 }}
                />
            </Region>
        </Frame>
    );
};
