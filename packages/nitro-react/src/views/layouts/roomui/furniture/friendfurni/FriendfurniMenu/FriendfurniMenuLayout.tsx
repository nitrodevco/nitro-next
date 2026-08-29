import { BoxLayout, Bubble, Region } from '#base/theme';

import { FriendfurniMenuLayoutBorder, FriendfurniMenuLayoutBorderProps } from './FriendfurniMenuLayoutBorder';

/** Generated from `926_friendfurni_menu_xml` (layout "friendfurni_menu", 115x86) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FriendfurniMenuLayoutProps {
    border?: FriendfurniMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const FriendfurniMenuLayout = ({ border, layout }: FriendfurniMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 86, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: -27, height: 86 }}
            >
                <FriendfurniMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};
