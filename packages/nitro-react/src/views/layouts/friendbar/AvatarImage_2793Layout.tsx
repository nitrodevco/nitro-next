import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `2793_avatar_image_xml` (layout "avatar_image", 30x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarImage_2793LayoutProps {
    layout?: BoxLayout;
    region?: AvatarImage_2793LayoutRegionProps;
    srcBitmap?: string;
}

export const AvatarImage_2793Layout = ({ layout, region, srcBitmap }: AvatarImage_2793LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 30, ...layout }}>
            <Region
                params={2196}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="bitmap"
                    params={2192}
                    src={srcBitmap}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <AvatarImage_2793LayoutRegion {...region} />
            </Region>
        </Region>
    );
};

/** Named region `region` of AvatarImage_2793Layout - configured through the parent's `region` prop. */
export interface AvatarImage_2793LayoutRegionProps {
    layout?: BoxLayout;
    onRegion?: () => void;
    visibleRegion?: boolean;
}

export const AvatarImage_2793LayoutRegion = ({ layout, onRegion, visibleRegion }: AvatarImage_2793LayoutRegionProps) => {
    return (
        <Region
            name="region"
            params={2193}
            visible={visibleRegion ?? false}
            onPointerTap={onRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};
