import { BoxLayout, Bubble, Region } from '#base/theme';

import { PetMenuLayoutBorder, PetMenuLayoutBorderProps } from './PetMenuLayoutBorder';

/** Generated from `1043_pet_menu_xml` (layout "context_menu_widget", 115x275) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PetMenuLayoutProps {
    border?: PetMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const PetMenuLayout = ({ border, layout }: PetMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 275, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: -28, height: 275 }}
            >
                <PetMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};
