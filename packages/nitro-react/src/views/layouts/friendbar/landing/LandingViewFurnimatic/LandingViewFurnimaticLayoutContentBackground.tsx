import { ReactNode } from 'react';

import { BoxLayout, Icon, Region, ThemeImage } from '#base/theme';

/** Named region `content_background` of LandingViewFurnimaticLayout - configured through the parent's `contentBackground` prop. */
export interface LandingViewFurnimaticLayoutContentBackgroundProps {
    layout?: BoxLayout;
    movingObjectsContainer?: ReactNode;
    srcBackgroundHorizon?: string;
    srcBackgroundLeft?: string;
    srcBackgroundRight?: string;
    srcLogo?: string;
}

export const LandingViewFurnimaticLayoutContentBackground = ({ layout, movingObjectsContainer, srcBackgroundHorizon, srcBackgroundLeft, srcBackgroundRight, srcLogo }: LandingViewFurnimaticLayoutContentBackgroundProps) => {
    return (
        <Region
            name="content_background"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="background_horizon"
                src={srcBackgroundHorizon ?? '${image.library.url}reception/furnimatic_backdrop_bg.png'}
                layout={{ position: 'absolute', marginLeft: -81.5, marginRight: 81.5, width: 1019, alignSelf: 'center', marginTop: 15, marginBottom: -15, height: 852 }}
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
                name="background_right"
                src={srcBackgroundRight ?? '${image.library.url}reception/furnimatic_backdrop_right.png'}
                layout={{ position: 'absolute', right: 0, width: 431, bottom: 38, height: 367 }}
            />
            <ThemeImage
                name="background_left"
                src={srcBackgroundLeft ?? '${image.library.url}reception/furnimatic_backdrop_left.png'}
                layout={{ position: 'absolute', left: 0, width: 798, bottom: 38, height: 219 }}
            />
            <Icon
                variant="4"
                name="widget_placeholder_avatarimage"
                layout={{ position: 'absolute', left: 69, width: 10, bottom: 289, height: 10 }}
            />
            <Icon
                variant="4"
                name="widget_placeholder_personalmessages"
                layout={{ position: 'absolute', left: 0, width: 10, bottom: 472, height: 10 }}
            />
            <Icon
                variant="4"
                name="widget_placeholder_bottom_slot"
                layout={{ position: 'absolute', left: 120, width: 10, bottom: 242, height: 10 }}
            />
            <Region
                backgroundColor="#333333"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 38 }}
            />
            <ThemeImage
                name="logo"
                src={srcLogo ?? '${image.library.url}reception/reception_logo_drape.png'}
                layout={{ position: 'absolute', left: 85, width: 145, top: 0, height: 200 }}
            />
        </Region>
    );
};
