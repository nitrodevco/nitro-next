import { BoxLayout, Icon, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `15_landing_view_jetset_xml` (layout "landing_view_jetset", 1172x822) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LandingViewJetsetLayoutProps {
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

export const LandingViewJetsetLayout = ({ layout, srcBackgroundGradientTop, srcBackgroundHorizon, srcBackgroundHorizonStretch, srcBackgroundHotelLeft, srcBackgroundHotelTop, srcBackgroundRight, srcLeftRightDivider, srcLogo }: LandingViewJetsetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1172, height: 822, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 1172, top: 0, height: 822 }}
            >
                <Region
                    name="content_background"
                    params={2192}
                    backgroundColor="#aae0f0"
                    layout={{ position: 'absolute', left: 0, width: 1172, top: 0, height: 822 }}
                >
                    <ThemeImage
                        name="background_gradient_top"
                        params={2192}
                        src={srcBackgroundGradientTop ?? '${image.library.url}reception/js_background_top_pixel.png'}
                        layout={{ position: 'absolute', left: 0, width: 1173, top: -175, height: 997 }}
                    />
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 890, width: 2, top: 1, height: 670 }}
                    >
                        <ThemeImage
                            name="left-right_divider"
                            params={16}
                            src={srcLeftRightDivider ?? layoutImage('landing_view_reception_horizontal.png')}
                            layout={{ position: 'absolute', left: 890, width: 2, top: 1, height: 670 }}
                        />
                    </Region>
                    <ThemeImage
                        name="background_horizon_stretch"
                        params={1168}
                        src={srcBackgroundHorizonStretch ?? '${image.library.url}reception/js_reception_backdrop_BG_left.png'}
                        layout={{ position: 'absolute', left: 0, width: 306, top: 314, height: 470 }}
                    />
                    <ThemeImage
                        name="background_horizon"
                        params={263248}
                        src={srcBackgroundHorizon ?? '${image.library.url}reception/js_reception_BG_right_3.png'}
                        layout={{ position: 'absolute', left: 305, width: 867, top: 314, height: 470 }}
                    />
                    <ThemeImage
                        name="background_right"
                        params={1104}
                        src={srcBackgroundRight ?? '${image.library.url}reception/js_reception_backdrop_left.png'}
                        layout={{ position: 'absolute', left: 868, width: 304, top: 576, height: 208 }}
                    />
                    <Icon
                        variant="0"
                        name="placeholder_dynamic_widget_slots"
                        params={147472}
                        layout={{ position: 'absolute', left: 180, width: 8, top: 0, height: 11 }}
                    />
                    <ThemeImage
                        name="background_hotel_top"
                        params={2064}
                        src={srcBackgroundHotelTop ?? '${image.library.url}reception/js_reception_backdrop_hotel_top_stretch.png'}
                        layout={{ position: 'absolute', left: 0, width: 138, top: 0, height: -44 }}
                    />
                    <ThemeImage
                        name="background_hotel_left"
                        params={1040}
                        src={srcBackgroundHotelLeft ?? '${image.library.url}reception/js_reception_backdrop_right_2.png'}
                        layout={{ position: 'absolute', left: 0, width: 1006, top: -264, height: 1048 }}
                    />
                    <Icon
                        variant="4"
                        name="widget_placeholder_personalmessages"
                        params={1040}
                        layout={{ position: 'absolute', left: 0, width: 10, top: 340, height: 10 }}
                    />
                    <Icon
                        variant="4"
                        name="widget_placeholder_avatarimage"
                        params={1040}
                        layout={{ position: 'absolute', left: 109, width: 10, top: 620, height: 10 }}
                    />
                    <Icon
                        variant="4"
                        name="widget_placeholder_bottom_slot"
                        params={1040}
                        layout={{ position: 'absolute', left: 120, width: 10, top: 570, height: 10 }}
                    />
                    <Region
                        params={1168}
                        backgroundColor="#333333"
                        layout={{ position: 'absolute', left: 0, width: 1172, top: 784, height: 38 }}
                    />
                    <ThemeImage
                        name="logo"
                        params={16}
                        src={srcLogo ?? '${image.library.url}reception/reception_logo_drape.png'}
                        layout={{ position: 'absolute', left: 100, width: 145, top: 0, height: 200 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
