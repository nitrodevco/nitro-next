import { BoxLayout, Region, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `133_AchievementSimple_xml` (layout "AchievementSimple", 52x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementSimpleLayoutProps {
    achievementContainer?: AchievementSimpleLayoutAchievementContainerProps;
    layout?: BoxLayout;
}

export const AchievementSimpleLayout = ({ achievementContainer, layout }: AchievementSimpleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 52, height: 50, ...layout }}>
            <AchievementSimpleLayoutAchievementContainer {...achievementContainer} />
        </Region>
    );
};

/** Named region `bg_region` of AchievementSimpleLayout - configured through the parent's `bgRegion` prop. */
export interface AchievementSimpleLayoutBgRegionProps {
    layout?: BoxLayout;
    onBgRegion?: () => void;
}

export const AchievementSimpleLayoutBgRegion = ({ layout, onBgRegion }: AchievementSimpleLayoutBgRegionProps) => {
    return (
        <Region
            name="bg_region"
            onPointerTap={onBgRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 50, ...layout }}
        />
    );
};

/** Named region `achievement_container` of AchievementSimpleLayout - configured through the parent's `achievementContainer` prop. */
export interface AchievementSimpleLayoutAchievementContainerProps {
    bgRegion?: AchievementSimpleLayoutBgRegionProps;
    layout?: BoxLayout;
    srcBgSelectedBitmap?: string;
    srcBgUnselectedBitmap?: string;
}

export const AchievementSimpleLayoutAchievementContainer = ({ bgRegion, layout, srcBgSelectedBitmap, srcBgUnselectedBitmap }: AchievementSimpleLayoutAchievementContainerProps) => {
    return (
        <Region
            name="achievement_container"
            layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 50, ...layout }}
        >
            <ThemeImage
                name="bg_unselected_bitmap"
                src={srcBgUnselectedBitmap ?? layoutImage('common_item_unselected.png')}
                layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 50 }}
            />
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 50 }}
            >
                <ThemeImage
                    name="bg_selected_bitmap"
                    src={srcBgSelectedBitmap ?? layoutImage('common_item_selected.png')}
                    layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 50 }}
                />
            </Region>
            <WidgetSlot
                widgetType="badge_image"
                name="achievement_pic_bitmap"
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 6, width: 40, top: 5, height: 40 }}
            />
            <AchievementSimpleLayoutBgRegion {...bgRegion} />
        </Region>
    );
};
