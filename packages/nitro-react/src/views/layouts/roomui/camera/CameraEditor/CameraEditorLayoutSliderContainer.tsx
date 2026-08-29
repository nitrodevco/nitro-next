import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `slider_container` of CameraEditorLayout - configured through the parent's `sliderContainer` prop. */
export interface CameraEditorLayoutSliderContainerProps {
    captionSliderEffectInfo?: string;
    layout?: BoxLayout;
    onShaftClickArea?: () => void;
    onSliderContainer?: () => void;
    shaftClickArea?: ReactNode;
    srcSliderBase?: string;
    srcSliderButton?: string;
    tintSliderBase?: string;
    tintSliderButton?: string;
}

export const CameraEditorLayoutSliderContainer = ({ captionSliderEffectInfo, layout, onShaftClickArea, onSliderContainer, shaftClickArea, srcSliderBase, srcSliderButton, tintSliderBase, tintSliderButton }: CameraEditorLayoutSliderContainerProps) => {
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
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Border
                variant="3"
                name="slider_dark_bottom"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 14, width: 292, top: 35, height: 8 }}
            >
                <Region
                    name="shaft_click_area"
                    onPointerTap={onShaftClickArea}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {shaftClickArea}
                </Region>
            </Border>
            <ThemeImage
                name="slider_base"
                src={srcSliderBase}
                tint={tintSliderBase}
                layout={{ position: 'absolute', left: 16, width: 288, top: 36, height: 6 }}
            />
            <Region
                name="slider_movement_area"
                layout={{ position: 'absolute', left: 4, width: 312, top: 27, height: 24 }}
            >
                <ThemeImage
                    name="slider_button"
                    src={srcSliderButton}
                    tint={tintSliderButton}
                    layout={{ position: 'absolute', left: 0, width: 24, top: 0, height: 24 }}
                />
            </Region>
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
