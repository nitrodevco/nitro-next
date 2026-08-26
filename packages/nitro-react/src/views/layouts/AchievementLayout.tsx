import { BoxLayout, Region, ThemeImage, WidgetSlot } from '#base/theme';

/** Generated from `114_Achievement_xml` (layout "Achievement", 62x60) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementLayoutProps {
    layout?: BoxLayout;
}

export const AchievementLayout = ({ layout }: AchievementLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 62, height: 60, ...layout }}>
            <Region
                name="achievement_container"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
            >
                <ThemeImage
                    name="bg_unselected_bitmap"
                    params={17}
                    src="${image.library.questing.url}achievement_inactive.png"
                    layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
                >
                    <ThemeImage
                        name="bg_selected_bitmap"
                        params={16}
                        src="${image.library.questing.url}achievement_active.png"
                        layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="badge_image"
                    name="achievement_pic_bitmap"
                    params={16}
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 11, width: 40, top: 10, height: 40 }}
                />
                <Region
                    name="bg_region"
                    tags={[ 'FIT:achievementsSelectSpecific' ]}
                    params={17}
                    layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
                />
            </Region>
        </Region>
    );
};
