import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { SnowwarLobbyPlayerTeam2LayoutPlayerDataContainer, SnowwarLobbyPlayerTeam2LayoutPlayerDataContainerProps } from './SnowwarLobbyPlayerTeam2LayoutPlayerDataContainer';

/** Generated from `421_snowwar_lobby_player_team_2_xml` (layout "snowwar_lobby_player_team_2", 289x62) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarLobbyPlayerTeam2LayoutProps {
    captionPlayerScore?: string;
    captionPlayerScoreStroke?: string;
    layout?: BoxLayout;
    playerDataContainer?: SnowwarLobbyPlayerTeam2LayoutPlayerDataContainerProps;
    srcPlayerImage?: string;
    srcPlayerImageBackground?: string;
    srcPlayerScoreBackground?: string;
    strokeTextColor?: string;
    tintPlayerImage?: string;
    tintPlayerImageBackground?: string;
    tintPlayerScoreBackground?: string;
}

export const SnowwarLobbyPlayerTeam2Layout = ({ captionPlayerScore, captionPlayerScoreStroke, layout, playerDataContainer, srcPlayerImage, srcPlayerImageBackground, srcPlayerScoreBackground, strokeTextColor, tintPlayerImage, tintPlayerImageBackground, tintPlayerScoreBackground }: SnowwarLobbyPlayerTeam2LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 289, height: 62, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row' }}>
                <Region
                    name="playerScoreContainer"
                    layout={{ width: 61, height: 62, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="playerScoreBackground"
                        src={srcPlayerScoreBackground ?? layoutImage('gray_ball.png')}
                        tint={tintPlayerScoreBackground}
                        layout={{ position: 'absolute', left: 0, width: 61, top: 0, height: 62 }}
                    />
                    <Region
                        name="playerScore_stroke"
                        layout={{ position: 'absolute', left: 13, width: 40, top: 17, height: 24, minWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPlayerScoreStroke ?? '102'}
                            textOptions={{ fill: strokeTextColor ?? '#fd6859' }}
                        />
                    </Region>
                    <Region
                        name="playerScore"
                        layout={{ position: 'absolute', left: 13, width: 34, top: 17, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPlayerScore ?? '102'}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <SnowwarLobbyPlayerTeam2LayoutPlayerDataContainer {...playerDataContainer} />
                <Region
                    name="playerImageContainer"
                    layout={{ width: 64, height: 62, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="playerImageBackground"
                        src={srcPlayerImageBackground ?? layoutImage('gray_square.png')}
                        tint={tintPlayerImageBackground}
                        layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 62 }}
                    />
                    <ThemeImage
                        name="playerImage"
                        src={srcPlayerImage}
                        tint={tintPlayerImage}
                        layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 62 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
