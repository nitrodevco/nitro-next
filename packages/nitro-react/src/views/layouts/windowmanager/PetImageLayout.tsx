import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1886_pet_image_xml` (layout "pet_image", 58x49) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PetImageLayoutProps {
    layout?: BoxLayout;
    onRegion?: () => void;
    srcBitmap?: string;
    visibleRegion?: boolean;
}

export const PetImageLayout = ({ layout, onRegion, srcBitmap, visibleRegion }: PetImageLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 58, height: 49, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <ThemeImage
                    name="bitmap"
                    src={srcBitmap ?? layoutImage('placeholder_pet.png')}
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
