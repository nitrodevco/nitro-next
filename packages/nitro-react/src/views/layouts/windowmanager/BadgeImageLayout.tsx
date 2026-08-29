import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `2475_badge_image_xml` (layout "badge_image", 30x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgeImageLayoutProps {
    layout?: BoxLayout;
    region?: BadgeImageLayoutRegionProps;
    srcBitmap?: string;
}

export const BadgeImageLayout = ({ layout, region, srcBitmap }: BadgeImageLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 30, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <ThemeImage
                    name="bitmap"
                    src={srcBitmap}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <BadgeImageLayoutRegion {...region} />
            </Region>
        </Region>
    );
};

/** Named region `region` of BadgeImageLayout - configured through the parent's `region` prop. */
export interface BadgeImageLayoutRegionProps {
    layout?: BoxLayout;
    onRegion?: () => void;
    visibleRegion?: boolean;
}

export const BadgeImageLayoutRegion = ({ layout, onRegion, visibleRegion }: BadgeImageLayoutRegionProps) => {
    return (
        <Region
            name="region"
            visible={visibleRegion ?? false}
            onPointerTap={onRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};
