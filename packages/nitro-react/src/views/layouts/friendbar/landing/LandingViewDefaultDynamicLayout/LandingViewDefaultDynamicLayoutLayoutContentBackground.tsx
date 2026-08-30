import { ReactNode } from 'react';

import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `content_background` of LandingViewDefaultDynamicLayoutLayout - configured through the parent's `contentBackground` prop. */
export interface LandingViewDefaultDynamicLayoutLayoutContentBackgroundProps {
    captionWarning?: string;
    layout?: BoxLayout;
    movingObjectsContainer?: ReactNode;
    srcBackgroundGradient?: string;
    srcBackgroundGradientTop?: string;
    srcBackgroundHorizon?: string;
    srcBackgroundHotelTop?: string;
    srcBackgroundLeft?: string;
    srcBackgroundRight?: string;
    srcLeftRightDivider?: string;
    srcLogo?: string;
    visibleLeftRightDivider?: boolean;
}

export const LandingViewDefaultDynamicLayoutLayoutContentBackground = ({ captionWarning, layout, movingObjectsContainer, srcBackgroundGradient, srcBackgroundGradientTop, srcBackgroundHorizon, srcBackgroundHotelTop, srcBackgroundLeft, srcBackgroundRight, srcLeftRightDivider, srcLogo, visibleLeftRightDivider }: LandingViewDefaultDynamicLayoutLayoutContentBackgroundProps) => {
    return (
        <Region
            name="content_background"
            backgroundColor="#aae0f0"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ThemeImage
                name="background_gradient_top"
                src={srcBackgroundGradientTop}
                layout={{ position: 'absolute', left: 0, right: 0, top: -175, bottom: 996 }}
            />
            <ThemeImage
                name="background_gradient"
                src={srcBackgroundGradient}
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 38, height: 1150 }}
            />
            <ThemeImage
                name="background_right"
                src={srcBackgroundRight}
                layout={{ position: 'absolute', right: 1, width: 526, bottom: 38, height: 407 }}
            />
            {(visibleLeftRightDivider ?? false) && (
                <ThemeImage
                    name="left-right_divider"
                    src={srcLeftRightDivider ?? layoutImage('landing_view_reception_horizontal.png')}
                    layout={{ position: 'absolute', left: 890, width: 2, top: 1, height: 670 }}
                />
            )}
            <ThemeImage
                name="background_horizon"
                src={srcBackgroundHorizon}
                layout={{ position: 'absolute', left: 0, width: 693, bottom: 38, height: 341 }}
            />
            <Region
                name="moving_objects_container"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                {movingObjectsContainer}
            </Region>
            <Icon
                variant="0"
                name="placeholder_dynamic_widget_slots"
                layout={{ position: 'absolute', left: 180, width: 8, top: 0, height: 11 }}
            />
            <ThemeImage
                name="background_hotel_top"
                src={srcBackgroundHotelTop ?? '${image.library.url}reception/reception_backdrop_hotel_top_stretch.png'}
                layout={{ position: 'absolute', left: 0, width: 123, top: 0, bottom: 821 }}
            />
            <ThemeImage
                name="background_left"
                src={srcBackgroundLeft}
                layout={{ position: 'absolute', left: 0, width: 1006, bottom: 38, height: 998 }}
            />
            <Icon
                variant="4"
                name="widget_placeholder_avatarimage"
                layout={{ position: 'absolute', left: 109, width: 10, bottom: 192, height: 10 }}
            />
            <Icon
                variant="4"
                name="widget_placeholder_bottom_slot"
                layout={{ position: 'absolute', left: 120, width: 10, bottom: 242, height: 10 }}
            />
            <Region
                backgroundColor="#333333"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 50 }}
            />
            <ThemeImage
                name="logo"
                src={srcLogo ?? '${image.library.url}reception/reception_logo_drape.png'}
                layout={{ position: 'absolute', left: 100, width: 145, top: 0, height: 200 }}
            />
            <ThemeText
                text={captionWarning ?? 'Warning! Always edit .original. file, then save it as working and delete background bitmaps!'}
                textOptions={{ wordWrap: true, wordWrapWidth: 387 }}
                name="warning"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 263, width: 387, top: 170, height: 101 }}
            />
        </Region>
    );
};
