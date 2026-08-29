import { BoxLayout, Icon, Region, ThemeImage } from '#base/theme';

/** Generated from `95_landing_view_furnimatic_xml` (layout "landing_view_furnimatic", 1182x822) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LandingViewFurnimaticLayoutProps {
    contentBackground?: LandingViewFurnimaticLayoutContentBackgroundProps;
    layout?: BoxLayout;
}

export const LandingViewFurnimaticLayout = ({ contentBackground, layout }: LandingViewFurnimaticLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1182, height: 822, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 1182, top: 0, height: 822 }}
            >
                <LandingViewFurnimaticLayoutContentBackground {...contentBackground} />
            </Region>
        </Region>
    );
};

/** Named region `moving_objects_container` of LandingViewFurnimaticLayout - configured through the parent's `movingObjectsContainer` prop. */
export interface LandingViewFurnimaticLayoutMovingObjectsContainerProps {
    layout?: BoxLayout;
}

export const LandingViewFurnimaticLayoutMovingObjectsContainer = ({ layout }: LandingViewFurnimaticLayoutMovingObjectsContainerProps) => {
    return (
        <Region
            name="moving_objects_container"
            params={2192}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Named region `content_background` of LandingViewFurnimaticLayout - configured through the parent's `contentBackground` prop. */
export interface LandingViewFurnimaticLayoutContentBackgroundProps {
    layout?: BoxLayout;
    movingObjectsContainer?: LandingViewFurnimaticLayoutMovingObjectsContainerProps;
    srcBackgroundHorizon?: string;
    srcBackgroundLeft?: string;
    srcBackgroundRight?: string;
    srcLogo?: string;
}

export const LandingViewFurnimaticLayoutContentBackground = ({ layout, movingObjectsContainer, srcBackgroundHorizon, srcBackgroundLeft, srcBackgroundRight, srcLogo }: LandingViewFurnimaticLayoutContentBackgroundProps) => {
    return (
        <Region
            name="content_background"
            params={2192}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="background_horizon"
                params={3932176}
                src={srcBackgroundHorizon ?? '${image.library.url}reception/furnimatic_backdrop_bg.png'}
                layout={{ position: 'absolute', marginLeft: -81.5, marginRight: 81.5, width: 1019, alignSelf: 'center', marginTop: 15, marginBottom: -15, height: 852 }}
            />
            <LandingViewFurnimaticLayoutMovingObjectsContainer {...movingObjectsContainer} />
            <Icon
                variant="0"
                name="placeholder_dynamic_widget_slots"
                params={147472}
                layout={{ position: 'absolute', left: 180, width: 8, top: 0, height: 11 }}
            />
            <ThemeImage
                name="background_right"
                params={1311824}
                src={srcBackgroundRight ?? '${image.library.url}reception/furnimatic_backdrop_right.png'}
                layout={{ position: 'absolute', right: 0, width: 431, bottom: 38, height: 367 }}
            />
            <ThemeImage
                name="background_left"
                params={3146768}
                src={srcBackgroundLeft ?? '${image.library.url}reception/furnimatic_backdrop_left.png'}
                layout={{ position: 'absolute', left: 0, width: 798, bottom: 38, height: 219 }}
            />
            <Icon
                variant="4"
                name="widget_placeholder_avatarimage"
                params={1040}
                layout={{ position: 'absolute', left: 69, width: 10, bottom: 289, height: 10 }}
            />
            <Icon
                variant="4"
                name="widget_placeholder_personalmessages"
                params={1040}
                layout={{ position: 'absolute', left: 0, width: 10, bottom: 472, height: 10 }}
            />
            <Icon
                variant="4"
                name="widget_placeholder_bottom_slot"
                params={1040}
                layout={{ position: 'absolute', left: 120, width: 10, bottom: 242, height: 10 }}
            />
            <Region
                params={1168}
                backgroundColor="#333333"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 38 }}
            />
            <ThemeImage
                name="logo"
                params={16}
                src={srcLogo ?? '${image.library.url}reception/reception_logo_drape.png'}
                layout={{ position: 'absolute', left: 85, width: 145, top: 0, height: 200 }}
            />
        </Region>
    );
};
