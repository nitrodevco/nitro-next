import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage, WidgetSlot } from '#base/theme';

/** Generated from `114_Achievement_xml` (layout "Achievement", 62x60) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementLayoutProps {
    achievementPicBitmap?: ReactNode;
    bgRegion?: ReactNode;
    layout?: BoxLayout;
    onBgRegion?: () => void;
    srcBgSelectedBitmap?: string;
    srcBgUnselectedBitmap?: string;
    visibleBgSelectedBitmap?: boolean;
}

export const AchievementLayout = ({ achievementPicBitmap, bgRegion, layout, onBgRegion, srcBgSelectedBitmap, srcBgUnselectedBitmap, visibleBgSelectedBitmap }: AchievementLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 62, height: 60, ...layout }}>
            <Region
                name="achievement_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="bg_unselected_bitmap"
                    src={srcBgUnselectedBitmap ?? '${image.library.questing.url}achievement_inactive.png'}
                    layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
                />
                {(visibleBgSelectedBitmap ?? false) && (
                    <ThemeImage
                        name="bg_selected_bitmap"
                        src={srcBgSelectedBitmap ?? '${image.library.questing.url}achievement_active.png'}
                        layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
                    />
                )}
                <WidgetSlot
                    widgetType="badge_image"
                    name="achievement_pic_bitmap"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 11, right: 11, top: 10, bottom: 10 }}
                >
                    {achievementPicBitmap}
                </WidgetSlot>
                <Region
                    name="bg_region"
                    onPointerTap={onBgRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {bgRegion}
                </Region>
            </Region>
        </Region>
    );
};
