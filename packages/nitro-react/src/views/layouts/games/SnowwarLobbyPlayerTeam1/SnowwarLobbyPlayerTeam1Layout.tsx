import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { SnowwarLobbyPlayerTeam1LayoutPlayerDataContainer, SnowwarLobbyPlayerTeam1LayoutPlayerDataContainerProps } from './SnowwarLobbyPlayerTeam1LayoutPlayerDataContainer';

/** Generated from `347_snowwar_lobby_player_team_1_xml` (layout "snowwar_lobby_player_team_1", 289x62) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarLobbyPlayerTeam1LayoutProps {
    captionPlayerScore?: string;
    captionPlayerScoreStroke?: string;
    layout?: BoxLayout;
    playerDataContainer?: SnowwarLobbyPlayerTeam1LayoutPlayerDataContainerProps;
    srcPlayerImage?: string;
    srcPlayerImageBackground?: string;
    srcPlayerScoreBackground?: string;
    strokeTextColor?: string;
    tintPlayerImage?: string;
    tintPlayerImageBackground?: string;
    tintPlayerScoreBackground?: string;
}

export const SnowwarLobbyPlayerTeam1Layout = ({ captionPlayerScore, captionPlayerScoreStroke, layout, playerDataContainer, srcPlayerImage, srcPlayerImageBackground, srcPlayerScoreBackground, strokeTextColor, tintPlayerImage, tintPlayerImageBackground, tintPlayerScoreBackground }: SnowwarLobbyPlayerTeam1LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 289, height: 62, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row' }}>
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
                <SnowwarLobbyPlayerTeam1LayoutPlayerDataContainer {...playerDataContainer} />
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
                    <ThemeText
                        text={captionPlayerScoreStroke ?? '102'}
                        textOptions={{ fill: strokeTextColor ?? '#1077ac' }}
                        name="playerScore_stroke"
                        layout={{ position: 'absolute', left: 13, width: 40, top: 17, height: 24, minWidth: 40 }}
                    />
                    <ThemeText
                        text={captionPlayerScore ?? '102'}
                        textOptions={{ fill: '#ffffff' }}
                        name="playerScore"
                        layout={{ position: 'absolute', left: 13, width: 34, top: 17, height: 24 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
