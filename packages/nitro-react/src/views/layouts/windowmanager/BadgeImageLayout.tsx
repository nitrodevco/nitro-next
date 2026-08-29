import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `2475_badge_image_xml` (layout "badge_image", 30x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgeImageLayoutProps {
    layout?: BoxLayout;
    onRegion?: () => void;
    srcBitmap?: string;
    visibleRegion?: boolean;
}

export const BadgeImageLayout = ({ layout, onRegion, srcBitmap, visibleRegion }: BadgeImageLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 30, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <ThemeImage
                    name="bitmap"
                    src={srcBitmap}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                {(visibleRegion ?? false) && (
                    <Region
                        name="region"
                        onPointerTap={onRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                )}
            </Region>
        </Region>
    );
};
