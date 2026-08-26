import { BoxLayout, Icon, Region, ThemeImage } from '#base/theme';

/** Generated from `95_landing_view_furnimatic_xml` (layout "landing_view_furnimatic", 1182x822) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LandingViewFurnimaticLayoutProps {
    layout?: BoxLayout;
}

export const LandingViewFurnimaticLayout = ({ layout }: LandingViewFurnimaticLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1182, height: 822, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 1182, top: 0, height: 822 }}
            >
                <Region
                    name="content_background"
                    params={2192}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, width: 1182, top: 0, height: 822 }}
                >
                    <ThemeImage
                        name="background_horizon"
                        params={3932176}
                        src="${image.library.url}reception/furnimatic_backdrop_bg.png"
                        layout={{ position: 'absolute', left: 0, width: 1019, top: 0, height: 852 }}
                    />
                    <Region
                        name="moving_objects_container"
                        params={2192}
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 0, width: 1182, top: 0, height: 822 }}
                    />
                    <Icon
                        variant="0"
                        name="placeholder_dynamic_widget_slots"
                        params={147472}
                        layout={{ position: 'absolute', left: 180, width: 8, top: 0, height: 11 }}
                    />
                    <ThemeImage
                        name="background_right"
                        params={1311824}
                        src="${image.library.url}reception/furnimatic_backdrop_right.png"
                        layout={{ position: 'absolute', left: 751, width: 431, top: 417, height: 367 }}
                    />
                    <ThemeImage
                        name="background_left"
                        params={3146768}
                        src="${image.library.url}reception/furnimatic_backdrop_left.png"
                        layout={{ position: 'absolute', left: 0, width: 798, top: 565, height: 219 }}
                    />
                    <Icon
                        variant="4"
                        name="widget_placeholder_avatarimage"
                        params={1040}
                        layout={{ position: 'absolute', left: 69, width: 10, top: 523, height: 10 }}
                    />
                    <Icon
                        variant="4"
                        name="widget_placeholder_personalmessages"
                        params={1040}
                        layout={{ position: 'absolute', left: 0, width: 10, top: 340, height: 10 }}
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
                        layout={{ position: 'absolute', left: 0, width: 1182, top: 784, height: 38 }}
                    />
                    <ThemeImage
                        name="logo"
                        params={16}
                        src="${image.library.url}reception/reception_logo_drape.png"
                        layout={{ position: 'absolute', left: 85, width: 145, top: 0, height: 200 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
