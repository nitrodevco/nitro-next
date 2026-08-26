import { BoxLayout, Region, ThemeImage, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `133_AchievementSimple_xml` (layout "AchievementSimple", 52x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementSimpleLayoutProps {
    layout?: BoxLayout;
}

export const AchievementSimpleLayout = ({ layout }: AchievementSimpleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 52, height: 50, ...layout }}>
            <Region
                name="achievement_container"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 50 }}
            >
                <ThemeImage
                    name="bg_unselected_bitmap"
                    params={17}
                    src={layoutImage('common_item_unselected.png')}
                    layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 50 }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 50 }}
                >
                    <ThemeImage
                        name="bg_selected_bitmap"
                        params={16}
                        src={layoutImage('common_item_selected.png')}
                        layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 50 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="badge_image"
                    name="achievement_pic_bitmap"
                    params={16}
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 6, width: 40, top: 5, height: 40 }}
                />
                <Region
                    name="bg_region"
                    tags={[ 'FIT:achievementsSelectSpecific' ]}
                    params={17}
                    layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 50 }}
                />
            </Region>
        </Region>
    );
};
