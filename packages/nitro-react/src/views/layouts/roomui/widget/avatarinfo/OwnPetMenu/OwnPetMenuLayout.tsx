import { BoxLayout, Bubble, Region } from '#base/theme';

import { OwnPetMenuLayoutBorder, OwnPetMenuLayoutBorderProps } from './OwnPetMenuLayoutBorder';

/** Generated from `843_own_pet_menu_xml` (layout "context_menu_widget", 115x600) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OwnPetMenuLayoutProps {
    border?: OwnPetMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const OwnPetMenuLayout = ({ border, layout }: OwnPetMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 600, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: 0, height: 600 }}
            >
                <OwnPetMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};
