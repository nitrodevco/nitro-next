import { BoxLayout, Bubble, Region } from '#base/theme';

import { GuildFurniMenuLayoutBorder, GuildFurniMenuLayoutBorderProps } from './GuildFurniMenuLayoutBorder';

/** Generated from `837_guild_furni_menu_xml` (layout "context_menu_widget", 115x140) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuildFurniMenuLayoutProps {
    border?: GuildFurniMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const GuildFurniMenuLayout = ({ border, layout }: GuildFurniMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 140, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: 0, height: 140 }}
            >
                <GuildFurniMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};
