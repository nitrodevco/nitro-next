import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `838_badge_entity_xml` (layout "badge_entity", 50x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgeEntityLayoutProps {
    layout?: BoxLayout;
    srcBadgeImage?: string;
    tintBadgeImage?: string;
}

export const BadgeEntityLayout = ({ layout, srcBadgeImage, tintBadgeImage }: BadgeEntityLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 50, height: 50, ...layout }}>
            <Border
                variant="0"
                name="border.entity"
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
            >
                <ThemeImage
                    name="badge.image"
                    src={srcBadgeImage}
                    tint={tintBadgeImage}
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                />
            </Border>
        </Region>
    );
};
