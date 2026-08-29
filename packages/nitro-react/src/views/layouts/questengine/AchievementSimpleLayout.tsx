import { BoxLayout, Region, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `133_AchievementSimple_xml` (layout "AchievementSimple", 52x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementSimpleLayoutProps {
    layout?: BoxLayout;
    onBgRegion?: () => void;
    srcBgSelectedBitmap?: string;
    srcBgUnselectedBitmap?: string;
    visibleBgSelectedBitmap?: boolean;
}

export const AchievementSimpleLayout = ({ layout, onBgRegion, srcBgSelectedBitmap, srcBgUnselectedBitmap, visibleBgSelectedBitmap }: AchievementSimpleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 52, height: 50, ...layout }}>
            <Region
                name="achievement_container"
                layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 50 }}
            >
                <ThemeImage
                    name="bg_unselected_bitmap"
                    src={srcBgUnselectedBitmap ?? layoutImage('common_item_unselected.png')}
                    layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 50 }}
                />
                {(visibleBgSelectedBitmap ?? false) && (
                    <ThemeImage
                        name="bg_selected_bitmap"
                        src={srcBgSelectedBitmap ?? layoutImage('common_item_selected.png')}
                        layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 50 }}
                    />
                )}
                <WidgetSlot
                    widgetType="badge_image"
                    name="achievement_pic_bitmap"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 6, width: 40, top: 5, height: 40 }}
                />
                <Region
                    name="bg_region"
                    onPointerTap={onBgRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 50 }}
                />
            </Region>
        </Region>
    );
};
