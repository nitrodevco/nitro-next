import { Border, BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1570_activityPointDisplayWidget_xml` (layout "activityPointDisplayWidget", 175x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ActivityPointDisplayWidgetLayoutProps {
    captionActivityPointsTxt?: string;
    layout?: BoxLayout;
}

export const ActivityPointDisplayWidgetLayout = ({ captionActivityPointsTxt, layout }: ActivityPointDisplayWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 175, height: 25, ...layout }}>
            <Border
                variant="3"
                name="activityPointDisplayWidget"
                tintColor="#e0e0e0"
                blend={0.8}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Icon
                    variant="27"
                    name="activity_point_icon"
                    layout={{ position: 'absolute', left: 6, width: 23, bottom: -1, height: 23 }}
                />
                <Region
                    name="activity_points_txt"
                    layout={{ position: 'absolute', left: 26, width: 60, top: 4, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionActivityPointsTxt ?? 'lorem ipsum'}
                        textStyle="text-style-u-small"
                    />
                </Region>
            </Border>
        </Region>
    );
};
