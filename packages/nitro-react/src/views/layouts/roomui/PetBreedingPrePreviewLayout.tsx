import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `875_pet_breeding_pre_preview_xml` (layout "pet_breeding_pre_preview", 29x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PetBreedingPrePreviewLayoutProps {
    layout?: BoxLayout;
}

export const PetBreedingPrePreviewLayout = ({ layout }: PetBreedingPrePreviewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 29, height: 25, ...layout }}>
            <ThemeImage
                src={undefined}
                layout={{ position: 'absolute', left: 0, width: 29, top: 0, height: 25 }}
            />
        </Region>
    );
};
