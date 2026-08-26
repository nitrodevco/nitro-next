import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `99_landing_view_default_dynamic_layout_xml` (layout "landing_view_default_dynamic_layout", 1172x822) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LandingViewDefaultDynamicLayoutLayoutProps {
    layout?: BoxLayout;
}

export const LandingViewDefaultDynamicLayoutLayout = ({ layout }: LandingViewDefaultDynamicLayoutLayoutProps) => {
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
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 1172, top: -175, height: 1 }}
                    />
                    <ThemeImage
                        name="background_gradient"
                        params={1168}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 1172, top: -366, height: 1150 }}
                    />
                    <ThemeImage
                        name="background_right"
                        params={1311824}
                        src={undefined}
                        layout={{ position: 'absolute', left: 645, width: 526, top: 377, height: 407 }}
                    />
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 890, width: 2, top: 1, height: 670 }}
                    >
                        <ThemeImage
                            name="left-right_divider"
                            params={16}
                            src={layoutImage('landing_view_reception_horizontal.png')}
                            layout={{ position: 'absolute', left: 890, width: 2, top: 1, height: 670 }}
                        />
                    </Region>
                    <ThemeImage
                        name="background_horizon"
                        params={1049616}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 693, top: 443, height: 341 }}
                    />
                    <Region
                        name="moving_objects_container"
                        params={2192}
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 0, width: 1172, top: 0, height: 822 }}
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
                        src="${image.library.url}reception/reception_backdrop_hotel_top_stretch.png"
                        layout={{ position: 'absolute', left: 0, width: 123, top: 0, height: 1 }}
                    />
                    <ThemeImage
                        name="background_left"
                        params={1049616}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 1006, top: -214, height: 998 }}
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
                        layout={{ position: 'absolute', left: 0, width: 1172, top: 772, height: 50 }}
                    />
                    <ThemeImage
                        name="logo"
                        params={16}
                        src="${image.library.url}reception/reception_logo_drape.png"
                        layout={{ position: 'absolute', left: 100, width: 145, top: 0, height: 200 }}
                    />
                    <Region
                        name="warning"
                        params={16}
                        layout={{ position: 'absolute', left: 263, width: 387, top: 170, height: 101, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Warning! Always edit .original. file, then save it as working and delete background bitmaps!"
                            textOptions={{ wordWrap: true, wordWrapWidth: 387 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
