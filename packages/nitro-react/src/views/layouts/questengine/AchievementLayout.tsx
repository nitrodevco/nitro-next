import { BoxLayout, Region, ThemeImage, WidgetSlot } from '#base/theme';

/** Generated from `114_Achievement_xml` (layout "Achievement", 62x60) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementLayoutProps {
    achievementContainer?: AchievementLayoutAchievementContainerProps;
    layout?: BoxLayout;
}

export const AchievementLayout = ({ achievementContainer, layout }: AchievementLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 62, height: 60, ...layout }}>
            <AchievementLayoutAchievementContainer {...achievementContainer} />
        </Region>
    );
};

/** Named region `bg_region` of AchievementLayout - configured through the parent's `bgRegion` prop. */
export interface AchievementLayoutBgRegionProps {
    layout?: BoxLayout;
    onBgRegion?: () => void;
}

export const AchievementLayoutBgRegion = ({ layout, onBgRegion }: AchievementLayoutBgRegionProps) => {
    return (
        <Region
            name="bg_region"
            onPointerTap={onBgRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60, ...layout }}
        />
    );
};

/** Named region `achievement_container` of AchievementLayout - configured through the parent's `achievementContainer` prop. */
export interface AchievementLayoutAchievementContainerProps {
    bgRegion?: AchievementLayoutBgRegionProps;
    layout?: BoxLayout;
    srcBgSelectedBitmap?: string;
    srcBgUnselectedBitmap?: string;
}

export const AchievementLayoutAchievementContainer = ({ bgRegion, layout, srcBgSelectedBitmap, srcBgUnselectedBitmap }: AchievementLayoutAchievementContainerProps) => {
    return (
        <Region
            name="achievement_container"
            layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60, ...layout }}
        >
            <ThemeImage
                name="bg_unselected_bitmap"
                src={srcBgUnselectedBitmap ?? '${image.library.questing.url}achievement_inactive.png'}
                layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
            />
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
            >
                <ThemeImage
                    name="bg_selected_bitmap"
                    src={srcBgSelectedBitmap ?? '${image.library.questing.url}achievement_active.png'}
                    layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 60 }}
                />
            </Region>
            <WidgetSlot
                widgetType="badge_image"
                name="achievement_pic_bitmap"
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 11, width: 40, top: 10, height: 40 }}
            />
            <AchievementLayoutBgRegion {...bgRegion} />
        </Region>
    );
};
