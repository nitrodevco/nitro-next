import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `312_snowwar_lobby_player_xml` (layout "snowwar_lobby_player", 62x63) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarLobbyPlayerLayoutProps {
    layout?: BoxLayout;
}

export const SnowwarLobbyPlayerLayout = ({ layout }: SnowwarLobbyPlayerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 62, height: 63, ...layout }}>
            <Region
                name="region"
                params={17}
                layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 63 }}
            >
                <ThemeImage
                    name="bg_image"
                    tags={[ 'bitmap' ]}
                    params={16}
                    src={layoutImage('blue_square.png')}
                    layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 63 }}
                />
                <ThemeImage
                    name="image"
                    tags={[ 'bitmap' ]}
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 62, top: 0, height: 63 }}
                />
            </Region>
        </Region>
    );
};
