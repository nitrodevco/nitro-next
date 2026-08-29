import { BoxLayout, Bubble, Region } from '#base/theme';

import { MysteryboxMenuLayoutBorder, MysteryboxMenuLayoutBorderProps } from './MysteryboxMenuLayoutBorder';

/** Generated from `1068_mysterybox_menu_xml` (layout "mysterybox_menu", 115x86) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MysteryboxMenuLayoutProps {
    border?: MysteryboxMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const MysteryboxMenuLayout = ({ border, layout }: MysteryboxMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 86, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: -27, height: 86 }}
            >
                <MysteryboxMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};
