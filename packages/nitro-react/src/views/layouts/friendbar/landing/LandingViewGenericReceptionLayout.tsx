import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `8_landing_view_generic_reception_xml` (layout "landing_view", 1172x822) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LandingViewGenericReceptionLayoutProps {
    contentBackground?: LandingViewGenericReceptionLayoutContentBackgroundProps;
    layout?: BoxLayout;
}

export const LandingViewGenericReceptionLayout = ({ contentBackground, layout }: LandingViewGenericReceptionLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1172, height: 822, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 1172, top: 0, height: 822 }}
            >
                <LandingViewGenericReceptionLayoutContentBackground {...contentBackground} />
            </Region>
        </Region>
    );
};

/** Named region `right_pane_dimmer` of LandingViewGenericReceptionLayout - configured through the parent's `rightPaneDimmer` prop. */
export interface LandingViewGenericReceptionLayoutRightPaneDimmerProps {
    layout?: BoxLayout;
}

export const LandingViewGenericReceptionLayoutRightPaneDimmer = ({ layout }: LandingViewGenericReceptionLayoutRightPaneDimmerProps) => {
    return (
        <Region
            name="right_pane_dimmer"
            backgroundColor="#75bfe3"
            layout={{ position: 'absolute', right: 0, width: 289, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Named region `navigator_placer` of LandingViewGenericReceptionLayout - configured through the parent's `navigatorPlacer` prop. */
export interface LandingViewGenericReceptionLayoutNavigatorPlacerProps {
    layout?: BoxLayout;
}

export const LandingViewGenericReceptionLayoutNavigatorPlacer = ({ layout }: LandingViewGenericReceptionLayoutNavigatorPlacerProps) => {
    return (
        <Region
            name="navigator_placer"
            layout={{ position: 'absolute', left: 310, width: 30, top: 99, height: 30, ...layout }}
        />
    );
};

/** Named region `content_background` of LandingViewGenericReceptionLayout - configured through the parent's `contentBackground` prop. */
export interface LandingViewGenericReceptionLayoutContentBackgroundProps {
    captionDailyContent?: string;
    layout?: BoxLayout;
    navigatorPlacer?: LandingViewGenericReceptionLayoutNavigatorPlacerProps;
    rightPaneDimmer?: LandingViewGenericReceptionLayoutRightPaneDimmerProps;
    srcBackgroundBack?: string;
    srcBackgroundFront?: string;
    srcBorderBar?: string;
    srcDive?: string;
    srcReceptionDivider?: string;
}

export const LandingViewGenericReceptionLayoutContentBackground = ({ captionDailyContent, layout, navigatorPlacer, rightPaneDimmer, srcBackgroundBack, srcBackgroundFront, srcBorderBar, srcDive, srcReceptionDivider }: LandingViewGenericReceptionLayoutContentBackgroundProps) => {
    const t = useTranslation();

    return (
        <Region
            name="content_background"
            backgroundColor="#aae0f0"
            layout={{ position: 'absolute', left: 0, width: 1172, top: 0, height: 822, minWidth: 950, maxWidth: 1172, minHeight: 600, maxHeight: 822, ...layout }}
        >
            <ThemeImage
                name="background_back"
                src={srcBackgroundBack ?? '${image.library.url}reception/generic_reception_back.png'}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <LandingViewGenericReceptionLayoutRightPaneDimmer {...rightPaneDimmer} />
            <ThemeImage
                name="reception_divider"
                src={srcReceptionDivider ?? layoutImage('landing_view_reception_horizontal.png')}
                layout={{ position: 'absolute', right: 288, width: 2, top: 0, bottom: 0 }}
            />
            <Region layout={{ position: 'absolute', left: 310, width: 299, top: 74, height: 30, flexDirection: 'row', gap: 5 }}>
                <Region
                    name="daily_content"
                    layout={{ width: 167, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDailyContent ?? t('landing.view.generic.content.title')}
                        textStyle="text-style-il-heading-3"
                    />
                </Region>
                <ThemeImage
                    name="border_bar"
                    src={srcBorderBar ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ width: 240, height: 4, flexShrink: 0 }}
                />
            </Region>
            <LandingViewGenericReceptionLayoutNavigatorPlacer {...navigatorPlacer} />
            <ThemeImage
                name="background_front"
                src={srcBackgroundFront ?? '${image.library.url}reception/generic_reception_front.png'}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Icon
                variant="4"
                name="widget_placeholder_avatarinfo"
                layout={{ position: 'absolute', left: 0, width: 10, bottom: 369, height: 10 }}
            />
            <Icon
                variant="4"
                name="widget_placeholder_avatarimage"
                layout={{ position: 'absolute', left: 154, width: 10, bottom: 224, height: 10 }}
            />
            <ThemeImage
                name="dive"
                src={srcDive ?? '${image.library.url}reception/generic_reception_dive.png'}
                layout={{ position: 'absolute', right: 390, width: 182, top: 0, height: 70 }}
            />
        </Region>
    );
};
