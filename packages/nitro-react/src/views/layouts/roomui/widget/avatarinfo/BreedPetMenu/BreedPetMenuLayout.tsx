import { BoxLayout, Bubble, Region } from '#base/theme';

import { BreedPetMenuLayoutBorder, BreedPetMenuLayoutBorderProps } from './BreedPetMenuLayoutBorder';

/** Generated from `873_breed_pet_menu_xml` (layout "context_menu_widget", 115x221) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BreedPetMenuLayoutProps {
    border?: BreedPetMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const BreedPetMenuLayout = ({ border, layout }: BreedPetMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 221, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 221 }}
            >
                <BreedPetMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};
