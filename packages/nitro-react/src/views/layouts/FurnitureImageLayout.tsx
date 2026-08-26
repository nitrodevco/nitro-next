import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2575_furniture_image_xml` (layout "furniture_image", 108x130) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FurnitureImageLayoutProps {
    layout?: BoxLayout;
}

export const FurnitureImageLayout = ({ layout }: FurnitureImageLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 108, height: 130, ...layout }}>
            <Region
                params={2196}
                layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 130 }}
            >
                <ThemeImage
                    name="bitmap"
                    params={2192}
                    src={layoutImage('placeholder_furni.png')}
                    layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 130 }}
                />
                <Region
                    name="region"
                    params={2193}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 108, top: 0, height: 130 }}
                />
            </Region>
        </Region>
    );
};
