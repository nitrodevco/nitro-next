import { BoxLayout, Region, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1689_badgeDisplayWidget_xml` (layout "badgeDisplayNewWidget", 42x42) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgeDisplayWidgetLayoutProps {
    layout?: BoxLayout;
    srcAssetImage?: string;
    srcChatStyle?: string;
}

export const BadgeDisplayWidgetLayout = ({ layout, srcAssetImage, srcChatStyle }: BadgeDisplayWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 42, height: 42, ...layout }}>
            <Region
                name="container"
                layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
            >
                <ThemeImage
                    name="asset_image"
                    src={srcAssetImage ?? layoutImage('catalogue_badge_background.png')}
                    layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                />
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_image"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <ThemeImage
                    name="chat_style"
                    src={srcChatStyle}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </Region>
        </Region>
    );
};
