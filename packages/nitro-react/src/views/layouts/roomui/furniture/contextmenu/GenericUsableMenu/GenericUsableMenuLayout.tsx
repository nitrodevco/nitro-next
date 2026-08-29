import { BoxLayout, Bubble, Region } from '#base/theme';

import { GenericUsableMenuLayoutBorder, GenericUsableMenuLayoutBorderProps } from './GenericUsableMenuLayoutBorder';

/** Generated from `965_generic_usable_menu_xml` (layout "generic_usable_menu", 115x86) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GenericUsableMenuLayoutProps {
    border?: GenericUsableMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const GenericUsableMenuLayout = ({ border, layout }: GenericUsableMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 86, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: -27, height: 86 }}
            >
                <GenericUsableMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};
