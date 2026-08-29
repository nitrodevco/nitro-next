import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `347_snowwar_lobby_player_team_1_xml` (layout "snowwar_lobby_player_team_1", 289x62) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarLobbyPlayerTeam1LayoutProps {
    layout?: BoxLayout;
    playerDataContainer?: SnowwarLobbyPlayerTeam1LayoutPlayerDataContainerProps;
    playerImageContainer?: SnowwarLobbyPlayerTeam1LayoutPlayerImageContainerProps;
    playerScoreContainer?: SnowwarLobbyPlayerTeam1LayoutPlayerScoreContainerProps;
}

export const SnowwarLobbyPlayerTeam1Layout = ({ layout, playerDataContainer, playerImageContainer, playerScoreContainer }: SnowwarLobbyPlayerTeam1LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 289, height: 62, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 289, top: 0, height: 62, flexDirection: 'row' }}>
                <SnowwarLobbyPlayerTeam1LayoutPlayerImageContainer {...playerImageContainer} />
                <SnowwarLobbyPlayerTeam1LayoutPlayerDataContainer {...playerDataContainer} />
                <SnowwarLobbyPlayerTeam1LayoutPlayerScoreContainer {...playerScoreContainer} />
            </Region>
        </Region>
    );
};

/** Named region `playerImageContainer` of SnowwarLobbyPlayerTeam1Layout - configured through the parent's `playerImageContainer` prop. */
export interface SnowwarLobbyPlayerTeam1LayoutPlayerImageContainerProps {
    layout?: BoxLayout;
    srcPlayerImage?: string;
    srcPlayerImageBackground?: string;
}

export const SnowwarLobbyPlayerTeam1LayoutPlayerImageContainer = ({ layout, srcPlayerImage, srcPlayerImageBackground }: SnowwarLobbyPlayerTeam1LayoutPlayerImageContainerProps) => {
    return (
        <Region
            name="playerImageContainer"
            layout={{ width: 64, height: 62, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="playerImageBackground"
                src={srcPlayerImageBackground ?? layoutImage('gray_square.png')}
                layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 62 }}
            />
            <ThemeImage
                name="playerImage"
                src={srcPlayerImage}
                layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 62 }}
            />
        </Region>
    );
};

/** Named region `playerStats` of SnowwarLobbyPlayerTeam1Layout - configured through the parent's `playerStats` prop. */
export interface SnowwarLobbyPlayerTeam1LayoutPlayerStatsProps {
    captionPlayerHits?: string;
    captionPlayerHitsLabel?: string;
    captionPlayerHitsLabelStroke?: string;
    captionPlayerHitsStroke?: string;
    captionPlayerKills?: string;
    captionPlayerKillsLabel?: string;
    captionPlayerKillsLabelStroke?: string;
    captionPlayerKillsStroke?: string;
    layout?: BoxLayout;
    strokeTextColor?: string;
}

export const SnowwarLobbyPlayerTeam1LayoutPlayerStats = ({ captionPlayerHits, captionPlayerHitsLabel, captionPlayerHitsLabelStroke, captionPlayerHitsStroke, captionPlayerKills, captionPlayerKillsLabel, captionPlayerKillsLabelStroke, captionPlayerKillsStroke, layout, strokeTextColor }: SnowwarLobbyPlayerTeam1LayoutPlayerStatsProps) => {
    return (
        <Region
            name="playerStats"
            layout={{ position: 'absolute', left: 13, width: 140, top: 29, height: 20, flexDirection: 'row', ...layout }}
        >
            <Region layout={{ width: 33, height: 17, flexShrink: 0 }}>
                <Region
                    name="playerHitsLabel_stroke"
                    layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 17, minWidth: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayerHitsLabelStroke ?? 'HITS'}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: strokeTextColor ?? '#1077ac' }}
                    />
                </Region>
                <Region
                    name="playerHitsLabel"
                    layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 17, minWidth: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayerHitsLabel ?? 'HITS'}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region layout={{ width: 54, height: 17, flexShrink: 0 }}>
                <Region
                    name="playerHits_stroke"
                    layout={{ position: 'absolute', left: 0, width: 54, top: 0, height: 17, minWidth: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayerHitsStroke ?? '20'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: strokeTextColor ?? '#1077ac' }}
                    />
                </Region>
                <Region
                    name="playerHits"
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 17, minWidth: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayerHits ?? '20'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region layout={{ width: 40, height: 17, flexShrink: 0 }}>
                <Region
                    name="playerKillsLabel_stroke"
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, minWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayerKillsLabelStroke ?? 'KILLS'}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: strokeTextColor ?? '#1077ac' }}
                    />
                </Region>
                <Region
                    name="playerKillsLabel"
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, minWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayerKillsLabel ?? 'KILLS'}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region layout={{ width: 50, height: 17, flexShrink: 0 }}>
                <Region
                    name="playerKills_stroke"
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 17, minWidth: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayerKillsStroke ?? '5'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: strokeTextColor ?? '#1077ac' }}
                    />
                </Region>
                <Region
                    name="playerKills"
                    layout={{ position: 'absolute', left: 0, width: 41, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayerKills ?? '5'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `playerTotalStats` of SnowwarLobbyPlayerTeam1Layout - configured through the parent's `playerTotalStats` prop. */
export interface SnowwarLobbyPlayerTeam1LayoutPlayerTotalStatsProps {
    captionTotalScore?: string;
    captionTotalScoreLabel?: string;
    captionTotalScoreStroke?: string;
    layout?: BoxLayout;
    strokeTextColor?: string;
}

export const SnowwarLobbyPlayerTeam1LayoutPlayerTotalStats = ({ captionTotalScore, captionTotalScoreLabel, captionTotalScoreStroke, layout, strokeTextColor }: SnowwarLobbyPlayerTeam1LayoutPlayerTotalStatsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="playerTotalStats"
            layout={{ position: 'absolute', left: 13, width: 140, top: 24, height: 35, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 50, top: 9, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={captionTotalScoreLabel ?? t('snowwar.stats.total_score')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 100, width: 54, top: 9, height: 17 }}>
                <Region
                    name="totalScore_stroke"
                    layout={{ position: 'absolute', left: 0, width: 54, top: 0, height: 17, minWidth: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTotalScoreStroke ?? '20'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: strokeTextColor ?? '#1077ac' }}
                    />
                </Region>
                <Region
                    name="totalScore"
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 17, minWidth: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTotalScore ?? '20'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `scoreTooltip` of SnowwarLobbyPlayerTeam1Layout - configured through the parent's `scoreTooltip` prop. */
export interface SnowwarLobbyPlayerTeam1LayoutScoreTooltipProps {
    layout?: BoxLayout;
    onScoreTooltip?: () => void;
    srcSkillLevel?: string;
    visibleScoreTooltip?: boolean;
}

export const SnowwarLobbyPlayerTeam1LayoutScoreTooltip = ({ layout, onScoreTooltip, srcSkillLevel, visibleScoreTooltip }: SnowwarLobbyPlayerTeam1LayoutScoreTooltipProps) => {
    return (
        <Region
            name="scoreTooltip"
            visible={visibleScoreTooltip ?? false}
            onPointerTap={onScoreTooltip}
            cursor="pointer"
            layout={{ position: 'absolute', left: 7, width: 150, top: 33, height: 13, ...layout }}
        >
            <ThemeImage
                name="skillLevel"
                src={srcSkillLevel}
                layout={{ position: 'absolute', left: 0, width: 150, top: 0, height: 13 }}
            />
        </Region>
    );
};

/** Named region `playerDataContainer` of SnowwarLobbyPlayerTeam1Layout - configured through the parent's `playerDataContainer` prop. */
export interface SnowwarLobbyPlayerTeam1LayoutPlayerDataContainerProps {
    captionPlayerName?: string;
    captionPlayerNameStroke?: string;
    layout?: BoxLayout;
    playerStats?: SnowwarLobbyPlayerTeam1LayoutPlayerStatsProps;
    playerTotalStats?: SnowwarLobbyPlayerTeam1LayoutPlayerTotalStatsProps;
    scoreTooltip?: SnowwarLobbyPlayerTeam1LayoutScoreTooltipProps;
    srcPlayerDataBackground?: string;
    strokeTextColor?: string;
}

export const SnowwarLobbyPlayerTeam1LayoutPlayerDataContainer = ({ captionPlayerName, captionPlayerNameStroke, layout, playerStats, playerTotalStats, scoreTooltip, srcPlayerDataBackground, strokeTextColor }: SnowwarLobbyPlayerTeam1LayoutPlayerDataContainerProps) => {
    return (
        <Region
            name="playerDataContainer"
            layout={{ width: 162, height: 62, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="playerDataBackground"
                src={srcPlayerDataBackground ?? layoutImage('gray_infobox.png')}
                layout={{ position: 'absolute', left: 0, width: 162, top: 0, height: 62 }}
            />
            <Region
                name="playerName_stroke"
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 71, top: 3, height: 20, maxWidth: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPlayerNameStroke ?? 'Painimies'}
                    textOptions={{ fill: strokeTextColor ?? '#666666' }}
                />
            </Region>
            <Region
                name="playerName"
                layout={{ position: 'absolute', width: 68, top: 3, height: 19, maxWidth: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPlayerName ?? 'Painimies'}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <SnowwarLobbyPlayerTeam1LayoutPlayerStats {...playerStats} />
            <SnowwarLobbyPlayerTeam1LayoutPlayerTotalStats {...playerTotalStats} />
            <SnowwarLobbyPlayerTeam1LayoutScoreTooltip {...scoreTooltip} />
        </Region>
    );
};

/** Named region `playerScoreContainer` of SnowwarLobbyPlayerTeam1Layout - configured through the parent's `playerScoreContainer` prop. */
export interface SnowwarLobbyPlayerTeam1LayoutPlayerScoreContainerProps {
    captionPlayerScore?: string;
    captionPlayerScoreStroke?: string;
    layout?: BoxLayout;
    srcPlayerScoreBackground?: string;
    strokeTextColor?: string;
}

export const SnowwarLobbyPlayerTeam1LayoutPlayerScoreContainer = ({ captionPlayerScore, captionPlayerScoreStroke, layout, srcPlayerScoreBackground, strokeTextColor }: SnowwarLobbyPlayerTeam1LayoutPlayerScoreContainerProps) => {
    return (
        <Region
            name="playerScoreContainer"
            layout={{ width: 61, height: 62, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="playerScoreBackground"
                src={srcPlayerScoreBackground ?? layoutImage('gray_ball.png')}
                layout={{ position: 'absolute', left: 0, width: 61, top: 0, height: 62 }}
            />
            <Region
                name="playerScore_stroke"
                layout={{ position: 'absolute', left: 13, width: 40, top: 17, height: 24, minWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPlayerScoreStroke ?? '102'}
                    textOptions={{ fill: strokeTextColor ?? '#1077ac' }}
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
    );
};
