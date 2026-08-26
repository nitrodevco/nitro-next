import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `8_landing_view_generic_reception_xml` (layout "landing_view", 1172x822) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LandingViewGenericReceptionLayoutProps {
    layout?: BoxLayout;
}

export const LandingViewGenericReceptionLayout = ({ layout }: LandingViewGenericReceptionLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 1172, height: 822, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 1172, top: 0, height: 822 }}
            >
                <Region
                    name="content_background"
                    params={16}
                    backgroundColor="#aae0f0"
                    layout={{ position: 'absolute', left: 0, width: 1172, top: 0, height: 822, minWidth: 950, maxWidth: 1172, minHeight: 600, maxHeight: 822 }}
                >
                    <ThemeImage
                        name="background_back"
                        params={2192}
                        src="${image.library.url}reception/generic_reception_back.png"
                        layout={{ position: 'absolute', left: 0, width: 1172, top: 0, height: 822 }}
                    />
                    <Region
                        name="right_pane_dimmer"
                        params={2128}
                        backgroundColor="#75bfe3"
                        layout={{ position: 'absolute', left: 883, width: 289, top: 0, height: 822 }}
                    />
                    <ThemeImage
                        name="reception_divider"
                        params={2128}
                        src={layoutImage('landing_view_reception_horizontal.png')}
                        layout={{ position: 'absolute', left: 882, width: 2, top: 0, height: 822 }}
                    />
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 310, width: 299, top: 74, height: 30, flexDirection: 'row', gap: 5 }}
                    >
                        <Region
                            name="daily_content"
                            params={16}
                            layout={{ width: 167, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('landing.view.generic.content.title')}
                                textStyle="text-style-il-heading-3"
                            />
                        </Region>
                        <ThemeImage
                            name="border_bar"
                            params={16}
                            src={layoutImage('illumina_light_border_top_center.png')}
                            layout={{ width: 240, height: 4, flexShrink: 0 }}
                        />
                    </Region>
                    <Region
                        name="navigator_placer"
                        params={16}
                        layout={{ position: 'absolute', left: 310, width: 30, top: 99, height: 30 }}
                    />
                    <ThemeImage
                        name="background_front"
                        params={2192}
                        src="${image.library.url}reception/generic_reception_front.png"
                        layout={{ position: 'absolute', left: 0, width: 1172, top: 0, height: 822 }}
                    />
                    <Icon
                        variant="4"
                        name="widget_placeholder_avatarinfo"
                        params={1024}
                        layout={{ position: 'absolute', left: 0, width: 10, top: 443, height: 10 }}
                    />
                    <Icon
                        variant="4"
                        name="widget_placeholder_avatarimage"
                        params={1024}
                        layout={{ position: 'absolute', left: 154, width: 10, top: 588, height: 10 }}
                    />
                    <ThemeImage
                        name="dive"
                        params={80}
                        src="${image.library.url}reception/generic_reception_dive.png"
                        layout={{ position: 'absolute', left: 600, width: 182, top: 0, height: 70 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
