import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2575_furniture_image_xml` (layout "furniture_image", 108x130) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FurnitureImageLayoutProps {
    layout?: BoxLayout;
    onRegion?: () => void;
    region?: ReactNode;
    srcBitmap?: string;
    tintBitmap?: string;
    visibleRegion?: boolean;
}

export const FurnitureImageLayout = ({ layout, onRegion, region, srcBitmap, tintBitmap, visibleRegion }: FurnitureImageLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 108, height: 130, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <ThemeImage
                    name="bitmap"
                    src={srcBitmap ?? layoutImage('placeholder_furni.png')}
                    tint={tintBitmap}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                {(visibleRegion ?? false) && (
                    <Region
                        name="region"
                        onPointerTap={onRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        {region}
                    </Region>
                )}
            </Region>
        </Region>
    );
};
