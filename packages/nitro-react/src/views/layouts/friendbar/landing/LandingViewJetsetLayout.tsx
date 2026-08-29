import { BoxLayout, Icon, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `15_landing_view_jetset_xml` (layout "landing_view_jetset", 1172x822) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LandingViewJetsetLayoutProps {
    contentBackground?: LandingViewJetsetLayoutContentBackgroundProps;
    layout?: BoxLayout;
}

export const LandingViewJetsetLayout = ({ contentBackground, layout }: LandingViewJetsetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1172, height: 822, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 1172, top: 0, height: 822 }}
            >
                <LandingViewJetsetLayoutContentBackground {...contentBackground} />
            </Region>
        </Region>
    );
};

/** Named region `content_background` of LandingViewJetsetLayout - configured through the parent's `contentBackground` prop. */
export interface LandingViewJetsetLayoutContentBackgroundProps {
    layout?: BoxLayout;
    srcBackgroundGradientTop?: string;
    srcBackgroundHorizon?: string;
    srcBackgroundHorizonStretch?: string;
    srcBackgroundHotelLeft?: string;
    srcBackgroundHotelTop?: string;
    srcBackgroundRight?: string;
    srcLeftRightDivider?: string;
    srcLogo?: string;
}

export const LandingViewJetsetLayoutContentBackground = ({ layout, srcBackgroundGradientTop, srcBackgroundHorizon, srcBackgroundHorizonStretch, srcBackgroundHotelLeft, srcBackgroundHotelTop, srcBackgroundRight, srcLeftRightDivider, srcLogo }: LandingViewJetsetLayoutContentBackgroundProps) => {
    return (
        <Region
            name="content_background"
            backgroundColor="#aae0f0"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ThemeImage
                name="background_gradient_top"
                src={srcBackgroundGradientTop ?? '${image.library.url}reception/js_background_top_pixel.png'}
                layout={{ position: 'absolute', left: 0, right: -1, top: -175, bottom: 0 }}
            />
            <ThemeImage
                name="left-right_divider"
                src={srcLeftRightDivider ?? layoutImage('landing_view_reception_horizontal.png')}
                layout={{ position: 'absolute', left: 890, width: 2, top: 1, height: 670 }}
                visible={false}
            />
            <ThemeImage
                name="background_horizon_stretch"
                src={srcBackgroundHorizonStretch ?? '${image.library.url}reception/js_reception_backdrop_BG_left.png'}
                layout={{ position: 'absolute', left: 0, right: 866, bottom: 38, height: 470 }}
            />
            <ThemeImage
                name="background_horizon"
                src={srcBackgroundHorizon ?? '${image.library.url}reception/js_reception_BG_right_3.png'}
                layout={{ position: 'absolute', right: 0, width: 867, bottom: 38, height: 470 }}
            />
            <ThemeImage
                name="background_right"
                src={srcBackgroundRight ?? '${image.library.url}reception/js_reception_backdrop_left.png'}
                layout={{ position: 'absolute', right: 0, width: 304, bottom: 38, height: 208 }}
            />
            <Icon
                variant="0"
                name="placeholder_dynamic_widget_slots"
                layout={{ position: 'absolute', left: 180, width: 8, top: 0, height: 11 }}
            />
            <ThemeImage
                name="background_hotel_top"
                src={srcBackgroundHotelTop ?? '${image.library.url}reception/js_reception_backdrop_hotel_top_stretch.png'}
                layout={{ position: 'absolute', left: 0, width: 138, top: 0, bottom: 866 }}
            />
            <ThemeImage
                name="background_hotel_left"
                src={srcBackgroundHotelLeft ?? '${image.library.url}reception/js_reception_backdrop_right_2.png'}
                layout={{ position: 'absolute', left: 0, width: 1006, bottom: 38, height: 1048 }}
            />
            <Icon
                variant="4"
                name="widget_placeholder_personalmessages"
                layout={{ position: 'absolute', left: 0, width: 10, bottom: 472, height: 10 }}
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
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 38 }}
            />
            <ThemeImage
                name="logo"
                src={srcLogo ?? '${image.library.url}reception/reception_logo_drape.png'}
                layout={{ position: 'absolute', left: 100, width: 145, top: 0, height: 200 }}
            />
        </Region>
    );
};
