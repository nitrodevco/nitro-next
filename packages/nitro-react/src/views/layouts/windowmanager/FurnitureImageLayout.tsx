import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2575_furniture_image_xml` (layout "furniture_image", 108x130) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FurnitureImageLayoutProps {
    layout?: BoxLayout;
    region?: FurnitureImageLayoutRegionProps;
    srcBitmap?: string;
}

export const FurnitureImageLayout = ({ layout, region, srcBitmap }: FurnitureImageLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 108, height: 130, ...layout }}>
            <Region
                params={2196}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="bitmap"
                    params={2192}
                    src={srcBitmap ?? layoutImage('placeholder_furni.png')}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <FurnitureImageLayoutRegion {...region} />
            </Region>
        </Region>
    );
};

/** Named region `region` of FurnitureImageLayout - configured through the parent's `region` prop. */
export interface FurnitureImageLayoutRegionProps {
    layout?: BoxLayout;
    onRegion?: () => void;
    visibleRegion?: boolean;
}

export const FurnitureImageLayoutRegion = ({ layout, onRegion, visibleRegion }: FurnitureImageLayoutRegionProps) => {
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
