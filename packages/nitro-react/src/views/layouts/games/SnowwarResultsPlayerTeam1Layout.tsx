import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `305_snowwar_results_player_team_1_xml` (layout "snowwar_results_player_team_1", 289x62) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarResultsPlayerTeam1LayoutProps {
    layout?: BoxLayout;
    playerDataContainer?: SnowwarResultsPlayerTeam1LayoutPlayerDataContainerProps;
    playerImageContainer?: SnowwarResultsPlayerTeam1LayoutPlayerImageContainerProps;
    playerScoreContainer?: SnowwarResultsPlayerTeam1LayoutPlayerScoreContainerProps;
}

export const SnowwarResultsPlayerTeam1Layout = ({ layout, playerDataContainer, playerImageContainer, playerScoreContainer }: SnowwarResultsPlayerTeam1LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 289, height: 62, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 289, top: 0, height: 62, flexDirection: 'row' }}>
                <SnowwarResultsPlayerTeam1LayoutPlayerImageContainer {...playerImageContainer} />
                <SnowwarResultsPlayerTeam1LayoutPlayerDataContainer {...playerDataContainer} />
                <SnowwarResultsPlayerTeam1LayoutPlayerScoreContainer {...playerScoreContainer} />
            </Region>
        </Region>
    );
};

/** Named region `addFriend` of SnowwarResultsPlayerTeam1Layout - configured through the parent's `addFriend` prop. */
export interface SnowwarResultsPlayerTeam1LayoutAddFriendProps {
    layout?: BoxLayout;
    onAddFriend?: () => void;
    visibleAddFriend?: boolean;
}

export const SnowwarResultsPlayerTeam1LayoutAddFriend = ({ layout, onAddFriend, visibleAddFriend }: SnowwarResultsPlayerTeam1LayoutAddFriendProps) => {
    const t = useTranslation();

    return (
        <Region
            name="addFriend"
            tooltip={t('snowwar.add_friend.tooltip')}
            visible={visibleAddFriend ?? false}
            onPointerTap={onAddFriend}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 62, ...layout }}
        >
            <ThemeImage
                src={layoutImage('add_friend_icon_blue.png')}
                layout={{ position: 'absolute', left: 3, width: 20, top: 3, height: 20 }}
            />
        </Region>
    );
};

/** Named region `playerImageContainer` of SnowwarResultsPlayerTeam1Layout - configured through the parent's `playerImageContainer` prop. */
export interface SnowwarResultsPlayerTeam1LayoutPlayerImageContainerProps {
    addFriend?: SnowwarResultsPlayerTeam1LayoutAddFriendProps;
    layout?: BoxLayout;
    srcPlayerImage?: string;
    srcPlayerImageBackground?: string;
}

export const SnowwarResultsPlayerTeam1LayoutPlayerImageContainer = ({ addFriend, layout, srcPlayerImage, srcPlayerImageBackground }: SnowwarResultsPlayerTeam1LayoutPlayerImageContainerProps) => {
    return (
        <Region
            name="playerImageContainer"
            layout={{ width: 64, height: 62, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="playerImageBackground"
                src={srcPlayerImageBackground ?? layoutImage('blue_square.png')}
                layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 62 }}
            />
            <ThemeImage
                name="playerImage"
                src={srcPlayerImage}
                layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 62 }}
            />
            <SnowwarResultsPlayerTeam1LayoutAddFriend {...addFriend} />
        </Region>
    );
};

/** Named region `playerStats` of SnowwarResultsPlayerTeam1Layout - configured through the parent's `playerStats` prop. */
export interface SnowwarResultsPlayerTeam1LayoutPlayerStatsProps {
    captionPlayerHits?: string;
    captionPlayerHitsLabel?: string;
    captionPlayerHitsStroke?: string;
    captionPlayerKills?: string;
    captionPlayerKillsLabel?: string;
    captionPlayerKillsStroke?: string;
    layout?: BoxLayout;
    strokeTextColor?: string;
}

export const SnowwarResultsPlayerTeam1LayoutPlayerStats = ({ captionPlayerHits, captionPlayerHitsLabel, captionPlayerHitsStroke, captionPlayerKills, captionPlayerKillsLabel, captionPlayerKillsStroke, layout, strokeTextColor }: SnowwarResultsPlayerTeam1LayoutPlayerStatsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="playerStats"
            layout={{ position: 'absolute', left: 20, width: 135, top: 26, height: 35, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 17 }}>
                <Region
                    name="playerHitsLabel"
                    layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 16, minWidth: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayerHitsLabel ?? t('snowwar.results.hits')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region layout={{ position: 'absolute', left: 62, width: 60, top: 0, height: 17 }}>
                <Region
                    name="playerHits_stroke"
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 17, minWidth: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionPlayerHitsStroke ?? '20'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: strokeTextColor ?? '#6699cc', align: 'right' }}
                    />
                </Region>
                <Region
                    name="playerHits"
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 17, minWidth: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionPlayerHits ?? '20'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'right' }}
                    />
                </Region>
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 114, top: 14, height: 17 }}>
                <Region
                    name="playerKillsLabel"
                    layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 16, minWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayerKillsLabel ?? t('snowwar.results.kills')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region layout={{ position: 'absolute', left: 62, width: 60, top: 14, height: 17 }}>
                <Region
                    name="playerKills_stroke"
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 17, minWidth: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionPlayerKillsStroke ?? '5'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: strokeTextColor ?? '#6699cc', align: 'right' }}
                    />
                </Region>
                <Region
                    name="playerKills"
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 17, minWidth: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionPlayerKills ?? '5'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'right' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `playerTotalStats` of SnowwarResultsPlayerTeam1Layout - configured through the parent's `playerTotalStats` prop. */
export interface SnowwarResultsPlayerTeam1LayoutPlayerTotalStatsProps {
    captionTotalScore?: string;
    captionTotalScoreLabel?: string;
    captionTotalScoreStroke?: string;
    layout?: BoxLayout;
    strokeTextColor?: string;
}

export const SnowwarResultsPlayerTeam1LayoutPlayerTotalStats = ({ captionTotalScore, captionTotalScoreLabel, captionTotalScoreStroke, layout, strokeTextColor }: SnowwarResultsPlayerTeam1LayoutPlayerTotalStatsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="playerTotalStats"
            layout={{ position: 'absolute', left: 13, width: 140, top: 24, height: 35, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 148, top: 9, height: 17 }}>
                <Region
                    name="totalScoreLabel"
                    layout={{ position: 'absolute', left: 0, width: 148, top: 0, height: 17, minWidth: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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

/** Named region `scoreTooltip` of SnowwarResultsPlayerTeam1Layout - configured through the parent's `scoreTooltip` prop. */
export interface SnowwarResultsPlayerTeam1LayoutScoreTooltipProps {
    layout?: BoxLayout;
    onScoreTooltip?: () => void;
    srcSkillLevel?: string;
    visibleScoreTooltip?: boolean;
}

export const SnowwarResultsPlayerTeam1LayoutScoreTooltip = ({ layout, onScoreTooltip, srcSkillLevel, visibleScoreTooltip }: SnowwarResultsPlayerTeam1LayoutScoreTooltipProps) => {
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

/** Named region `playerDataContainer` of SnowwarResultsPlayerTeam1Layout - configured through the parent's `playerDataContainer` prop. */
export interface SnowwarResultsPlayerTeam1LayoutPlayerDataContainerProps {
    captionPlayerName?: string;
    captionPlayerNameStroke?: string;
    layout?: BoxLayout;
    playerStats?: SnowwarResultsPlayerTeam1LayoutPlayerStatsProps;
    playerTotalStats?: SnowwarResultsPlayerTeam1LayoutPlayerTotalStatsProps;
    scoreTooltip?: SnowwarResultsPlayerTeam1LayoutScoreTooltipProps;
    srcPlayerDataBackground?: string;
    strokeTextColor?: string;
}

export const SnowwarResultsPlayerTeam1LayoutPlayerDataContainer = ({ captionPlayerName, captionPlayerNameStroke, layout, playerStats, playerTotalStats, scoreTooltip, srcPlayerDataBackground, strokeTextColor }: SnowwarResultsPlayerTeam1LayoutPlayerDataContainerProps) => {
    return (
        <Region
            name="playerDataContainer"
            layout={{ width: 162, height: 62, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="playerDataBackground"
                src={srcPlayerDataBackground ?? layoutImage('blue_infobox.png')}
                layout={{ position: 'absolute', left: 0, width: 162, top: 0, height: 62 }}
            />
            <Region
                name="playerName_stroke"
                layout={{ position: 'absolute', width: 68, top: 3, height: 19, maxWidth: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPlayerNameStroke ?? 'Painimies'}
                    textOptions={{ fill: strokeTextColor ?? '#336699' }}
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
            <SnowwarResultsPlayerTeam1LayoutPlayerStats {...playerStats} />
            <SnowwarResultsPlayerTeam1LayoutPlayerTotalStats {...playerTotalStats} />
            <SnowwarResultsPlayerTeam1LayoutScoreTooltip {...scoreTooltip} />
        </Region>
    );
};

/** Named region `playerScoreContainer` of SnowwarResultsPlayerTeam1Layout - configured through the parent's `playerScoreContainer` prop. */
export interface SnowwarResultsPlayerTeam1LayoutPlayerScoreContainerProps {
    captionPlayerScore?: string;
    captionPlayerScoreStroke?: string;
    layout?: BoxLayout;
    srcLoadingIcon?: string;
    srcPlayerScoreBackground?: string;
    srcPlayerScoreGlow?: string;
    strokeTextColor?: string;
}

export const SnowwarResultsPlayerTeam1LayoutPlayerScoreContainer = ({ captionPlayerScore, captionPlayerScoreStroke, layout, srcLoadingIcon, srcPlayerScoreBackground, srcPlayerScoreGlow, strokeTextColor }: SnowwarResultsPlayerTeam1LayoutPlayerScoreContainerProps) => {
    return (
        <Region
            name="playerScoreContainer"
            layout={{ width: 61, height: 62, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="playerScoreBackground"
                src={srcPlayerScoreBackground ?? layoutImage('blue_ball.png')}
                layout={{ position: 'absolute', left: 0, width: 59, top: 0, height: 59 }}
            />
            <ThemeImage
                name="playerScoreGlow"
                src={srcPlayerScoreGlow}
                layout={{ position: 'absolute', left: 0, width: 61, top: 0, height: 62 }}
            />
            <Region
                name="playerScore_stroke"
                layout={{ position: 'absolute', left: 0, width: 60, top: 17, height: 24, minWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionPlayerScoreStroke ?? '102'}
                    textOptions={{ fill: strokeTextColor ?? '#1077ac', align: 'center' }}
                />
            </Region>
            <Region
                name="playerScore"
                layout={{ position: 'absolute', left: 0, width: 60, top: 17, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionPlayerScore ?? '102'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
            <Region
                visible={false}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 50, top: 5, height: 50 }}
            >
                <ThemeImage
                    name="loadingIcon"
                    src={srcLoadingIcon}
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 50, top: 5, height: 50 }}
                />
            </Region>
        </Region>
    );
};
