import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `421_snowwar_lobby_player_team_2_xml` (layout "snowwar_lobby_player_team_2", 289x62) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarLobbyPlayerTeam2LayoutProps {
    layout?: BoxLayout;
    playerDataContainer?: SnowwarLobbyPlayerTeam2LayoutPlayerDataContainerProps;
    playerImageContainer?: SnowwarLobbyPlayerTeam2LayoutPlayerImageContainerProps;
    playerScoreContainer?: SnowwarLobbyPlayerTeam2LayoutPlayerScoreContainerProps;
}

export const SnowwarLobbyPlayerTeam2Layout = ({ layout, playerDataContainer, playerImageContainer, playerScoreContainer }: SnowwarLobbyPlayerTeam2LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 289, height: 62, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 289, top: 0, height: 62, flexDirection: 'row' }}>
                <SnowwarLobbyPlayerTeam2LayoutPlayerScoreContainer {...playerScoreContainer} />
                <SnowwarLobbyPlayerTeam2LayoutPlayerDataContainer {...playerDataContainer} />
                <SnowwarLobbyPlayerTeam2LayoutPlayerImageContainer {...playerImageContainer} />
            </Region>
        </Region>
    );
};

/** Named region `playerScoreContainer` of SnowwarLobbyPlayerTeam2Layout - configured through the parent's `playerScoreContainer` prop. */
export interface SnowwarLobbyPlayerTeam2LayoutPlayerScoreContainerProps {
    captionPlayerScore?: string;
    captionPlayerScoreStroke?: string;
    layout?: BoxLayout;
    srcPlayerScoreBackground?: string;
    tags?: string[];
}

export const SnowwarLobbyPlayerTeam2LayoutPlayerScoreContainer = ({ captionPlayerScore, captionPlayerScoreStroke, layout, srcPlayerScoreBackground, tags }: SnowwarLobbyPlayerTeam2LayoutPlayerScoreContainerProps) => {
    return (
        <Region
            name="playerScoreContainer"
            tags={tags}
            layout={{ width: 61, height: 62, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="playerScoreBackground"
                tags={[ 'bitmap' ]}
                src={srcPlayerScoreBackground ?? layoutImage('gray_ball.png')}
                layout={{ position: 'absolute', left: 0, width: 61, top: 0, height: 62 }}
            />
            <Region
                name="playerScore_stroke"
                tags={[ 'stroke' ]}
                layout={{ position: 'absolute', left: 13, width: 40, top: 17, height: 24, minWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPlayerScoreStroke ?? '102'}
                    textOptions={{ fill: '#fd6859' }}
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

/** Named region `playerStats` of SnowwarLobbyPlayerTeam2Layout - configured through the parent's `playerStats` prop. */
export interface SnowwarLobbyPlayerTeam2LayoutPlayerStatsProps {
    captionPlayerHits?: string;
    captionPlayerHitsLabel?: string;
    captionPlayerHitsLabelStroke?: string;
    captionPlayerHitsStroke?: string;
    captionPlayerKills?: string;
    captionPlayerKillsLabel?: string;
    captionPlayerKillsLabelStroke?: string;
    captionPlayerKillsStroke?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const SnowwarLobbyPlayerTeam2LayoutPlayerStats = ({ captionPlayerHits, captionPlayerHitsLabel, captionPlayerHitsLabelStroke, captionPlayerHitsStroke, captionPlayerKills, captionPlayerKillsLabel, captionPlayerKillsLabelStroke, captionPlayerKillsStroke, layout, tags }: SnowwarLobbyPlayerTeam2LayoutPlayerStatsProps) => {
    return (
        <Region
            name="playerStats"
            tags={tags}
            layout={{ position: 'absolute', left: 13, width: 140, top: 29, height: 20, flexDirection: 'row', ...layout }}
        >
            <Region layout={{ width: 33, height: 17, flexShrink: 0 }}>
                <Region
                    name="playerHitsLabel_stroke"
                    tags={[ 'stroke' ]}
                    layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 17, minWidth: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayerHitsLabelStroke ?? 'HITS'}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#fd6859' }}
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
                    tags={[ 'stroke' ]}
                    layout={{ position: 'absolute', left: 0, width: 54, top: 0, height: 17, minWidth: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayerHitsStroke ?? '20'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#fd6859' }}
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
                    tags={[ 'stroke' ]}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, minWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayerKillsLabelStroke ?? 'KILLS'}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#fd6859' }}
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
                    tags={[ 'stroke' ]}
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 17, minWidth: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayerKillsStroke ?? '5'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#fd6859' }}
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

/** Named region `playerTotalStats` of SnowwarLobbyPlayerTeam2Layout - configured through the parent's `playerTotalStats` prop. */
export interface SnowwarLobbyPlayerTeam2LayoutPlayerTotalStatsProps {
    captionTotalScore?: string;
    captionTotalScoreLabel?: string;
    captionTotalScoreStroke?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const SnowwarLobbyPlayerTeam2LayoutPlayerTotalStats = ({ captionTotalScore, captionTotalScoreLabel, captionTotalScoreStroke, layout, tags }: SnowwarLobbyPlayerTeam2LayoutPlayerTotalStatsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="playerTotalStats"
            tags={tags}
            layout={{ position: 'absolute', left: 13, width: 140, top: 24, height: 35, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 50, top: 9, height: 17 }}>
                <Region
                    name="totalScoreLabel"
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 17, minWidth: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTotalScoreLabel ?? t('snowwar.stats.total_score')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region layout={{ position: 'absolute', left: 100, width: 54, top: 9, height: 17 }}>
                <Region
                    name="totalScore_stroke"
                    tags={[ 'stroke' ]}
                    layout={{ position: 'absolute', left: 0, width: 54, top: 0, height: 17, minWidth: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTotalScoreStroke ?? '20'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#cc6666' }}
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

/** Named region `scoreTooltip` of SnowwarLobbyPlayerTeam2Layout - configured through the parent's `scoreTooltip` prop. */
export interface SnowwarLobbyPlayerTeam2LayoutScoreTooltipProps {
    layout?: BoxLayout;
    onScoreTooltip?: () => void;
    srcSkillLevel?: string;
    tags?: string[];
    visibleScoreTooltip?: boolean;
}

export const SnowwarLobbyPlayerTeam2LayoutScoreTooltip = ({ layout, onScoreTooltip, srcSkillLevel, tags, visibleScoreTooltip }: SnowwarLobbyPlayerTeam2LayoutScoreTooltipProps) => {
    return (
        <Region
            name="scoreTooltip"
            tags={tags}
            visible={visibleScoreTooltip ?? false}
            onPointerTap={onScoreTooltip}
            cursor="pointer"
            layout={{ position: 'absolute', left: 7, width: 150, top: 33, height: 13, ...layout }}
        >
            <ThemeImage
                name="skillLevel"
                tags={[ 'bitmap' ]}
                src={srcSkillLevel}
                layout={{ position: 'absolute', left: 0, width: 150, top: 0, height: 13 }}
            />
        </Region>
    );
};

/** Named region `playerDataContainer` of SnowwarLobbyPlayerTeam2Layout - configured through the parent's `playerDataContainer` prop. */
export interface SnowwarLobbyPlayerTeam2LayoutPlayerDataContainerProps {
    captionPlayerName?: string;
    captionPlayerNameStroke?: string;
    layout?: BoxLayout;
    playerStats?: SnowwarLobbyPlayerTeam2LayoutPlayerStatsProps;
    playerTotalStats?: SnowwarLobbyPlayerTeam2LayoutPlayerTotalStatsProps;
    scoreTooltip?: SnowwarLobbyPlayerTeam2LayoutScoreTooltipProps;
    srcPlayerDataBackground?: string;
    tags?: string[];
}

export const SnowwarLobbyPlayerTeam2LayoutPlayerDataContainer = ({ captionPlayerName, captionPlayerNameStroke, layout, playerStats, playerTotalStats, scoreTooltip, srcPlayerDataBackground, tags }: SnowwarLobbyPlayerTeam2LayoutPlayerDataContainerProps) => {
    return (
        <Region
            name="playerDataContainer"
            tags={tags}
            layout={{ width: 162, height: 62, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="playerDataBackground"
                tags={[ 'bitmap' ]}
                src={srcPlayerDataBackground ?? layoutImage('gray_infobox.png')}
                layout={{ position: 'absolute', left: 0, width: 162, top: 0, height: 62 }}
            />
            <Region
                name="playerName_stroke"
                tags={[ 'stroke' ]}
                layout={{ position: 'absolute', width: 68, top: 3, height: 19, maxWidth: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPlayerNameStroke ?? 'Painimies'}
                    textOptions={{ fill: '#666666' }}
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
            <SnowwarLobbyPlayerTeam2LayoutPlayerStats {...playerStats} />
            <SnowwarLobbyPlayerTeam2LayoutPlayerTotalStats {...playerTotalStats} />
            <SnowwarLobbyPlayerTeam2LayoutScoreTooltip {...scoreTooltip} />
        </Region>
    );
};

/** Named region `playerImageContainer` of SnowwarLobbyPlayerTeam2Layout - configured through the parent's `playerImageContainer` prop. */
export interface SnowwarLobbyPlayerTeam2LayoutPlayerImageContainerProps {
    layout?: BoxLayout;
    srcPlayerImage?: string;
    srcPlayerImageBackground?: string;
    tags?: string[];
}

export const SnowwarLobbyPlayerTeam2LayoutPlayerImageContainer = ({ layout, srcPlayerImage, srcPlayerImageBackground, tags }: SnowwarLobbyPlayerTeam2LayoutPlayerImageContainerProps) => {
    return (
        <Region
            name="playerImageContainer"
            tags={tags}
            layout={{ width: 64, height: 62, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="playerImageBackground"
                tags={[ 'bitmap' ]}
                src={srcPlayerImageBackground ?? layoutImage('gray_square.png')}
                layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 62 }}
            />
            <ThemeImage
                name="playerImage"
                tags={[ 'bitmap' ]}
                src={srcPlayerImage}
                layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 62 }}
            />
        </Region>
    );
};
