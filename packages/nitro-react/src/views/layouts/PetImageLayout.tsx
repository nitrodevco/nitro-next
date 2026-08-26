import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1886_pet_image_xml` (layout "pet_image", 58x49) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PetImageLayoutProps {
    layout?: BoxLayout;
}

export const PetImageLayout = ({ layout }: PetImageLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 58, height: 49, ...layout }}>
            <Region
                params={2196}
                layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 49 }}
            >
                <ThemeImage
                    name="bitmap"
                    params={2192}
                    src={layoutImage('placeholder_pet.png')}
                    layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 49 }}
                />
                <Region
                    name="region"
                    params={2193}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 49 }}
                />
            </Region>
        </Region>
    );
};
