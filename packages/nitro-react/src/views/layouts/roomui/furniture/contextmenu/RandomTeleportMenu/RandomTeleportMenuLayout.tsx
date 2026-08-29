import { BoxLayout, Bubble, Region } from '#base/theme';

import { RandomTeleportMenuLayoutBorder, RandomTeleportMenuLayoutBorderProps } from './RandomTeleportMenuLayoutBorder';

/** Generated from `987_random_teleport_menu_xml` (layout "context_menu_widget", 115x86) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RandomTeleportMenuLayoutProps {
    border?: RandomTeleportMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const RandomTeleportMenuLayout = ({ border, layout }: RandomTeleportMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 86, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: -27, height: 86 }}
            >
                <RandomTeleportMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};
