import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `335_snowwar_results_player_team_2_xml` (layout "snowwar_results_player_team_2", 289x62) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarResultsPlayerTeam2LayoutProps {
    layout?: BoxLayout;
    playerDataContainer?: SnowwarResultsPlayerTeam2LayoutPlayerDataContainerProps;
    playerImageContainer?: SnowwarResultsPlayerTeam2LayoutPlayerImageContainerProps;
    playerScoreContainer?: SnowwarResultsPlayerTeam2LayoutPlayerScoreContainerProps;
}

export const SnowwarResultsPlayerTeam2Layout = ({ layout, playerDataContainer, playerImageContainer, playerScoreContainer }: SnowwarResultsPlayerTeam2LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 289, height: 62, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 289, top: 0, height: 62, flexDirection: 'row' }}
            >
                <SnowwarResultsPlayerTeam2LayoutPlayerScoreContainer {...playerScoreContainer} />
                <SnowwarResultsPlayerTeam2LayoutPlayerDataContainer {...playerDataContainer} />
                <SnowwarResultsPlayerTeam2LayoutPlayerImageContainer {...playerImageContainer} />
            </Region>
        </Region>
    );
};

/** Named region `playerScoreContainer` of SnowwarResultsPlayerTeam2Layout - configured through the parent's `playerScoreContainer` prop. */
export interface SnowwarResultsPlayerTeam2LayoutPlayerScoreContainerProps {
    captionPlayerScore?: string;
    captionPlayerScoreStroke?: string;
    layout?: BoxLayout;
    srcLoadingIcon?: string;
    srcPlayerScoreBackground?: string;
    srcPlayerScoreGlow?: string;
}

export const SnowwarResultsPlayerTeam2LayoutPlayerScoreContainer = ({ captionPlayerScore, captionPlayerScoreStroke, layout, srcLoadingIcon, srcPlayerScoreBackground, srcPlayerScoreGlow }: SnowwarResultsPlayerTeam2LayoutPlayerScoreContainerProps) => {
    return (
        <Region
            name="playerScoreContainer"
            params={16}
            layout={{ width: 61, height: 62, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="playerScoreBackground"
                tags={[ 'bitmap' ]}
                params={16400}
                src={srcPlayerScoreBackground ?? layoutImage('red_ball.png')}
                layout={{ position: 'absolute', left: 0, width: 59, top: 0, height: 59 }}
            />
            <ThemeImage
                name="playerScoreGlow"
                tags={[ 'bitmap' ]}
                params={16400}
                src={srcPlayerScoreGlow}
                layout={{ position: 'absolute', left: 0, width: 61, top: 0, height: 62 }}
            />
            <Region
                name="playerScore_stroke"
                tags={[ 'stroke' ]}
                params={131088}
                layout={{ position: 'absolute', left: 0, width: 60, top: 17, height: 24, minWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionPlayerScoreStroke ?? '102'}
                    textOptions={{ fill: '#fd6859', align: 'center' }}
                />
            </Region>
            <Region
                name="playerScore"
                params={131088}
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
                    tags={[ 'bitmap' ]}
                    params={208}
                    src={srcLoadingIcon}
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 50, top: 5, height: 50 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `playerStats` of SnowwarResultsPlayerTeam2Layout - configured through the parent's `playerStats` prop. */
export interface SnowwarResultsPlayerTeam2LayoutPlayerStatsProps {
    captionPlayerHits?: string;
    captionPlayerHitsLabel?: string;
    captionPlayerHitsStroke?: string;
    captionPlayerKills?: string;
    captionPlayerKillsLabel?: string;
    captionPlayerKillsStroke?: string;
    layout?: BoxLayout;
}

export const SnowwarResultsPlayerTeam2LayoutPlayerStats = ({ captionPlayerHits, captionPlayerHitsLabel, captionPlayerHitsStroke, captionPlayerKills, captionPlayerKillsLabel, captionPlayerKillsStroke, layout }: SnowwarResultsPlayerTeam2LayoutPlayerStatsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="playerStats"
            params={16}
            layout={{ position: 'absolute', left: 20, width: 135, top: 26, height: 35, ...layout }}
        >
            <Region
                params={131088}
                layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 17 }}
            >
                <Region
                    name="playerHitsLabel"
                    params={131088}
                    layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 16, minWidth: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayerHitsLabel ?? t('snowwar.results.hits')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region
                params={131088}
                layout={{ position: 'absolute', left: 62, width: 60, top: 0, height: 17 }}
            >
                <Region
                    name="playerHits_stroke"
                    tags={[ 'stroke' ]}
                    params={131088}
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 17, minWidth: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionPlayerHitsStroke ?? '20'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#cc6666', align: 'right' }}
                    />
                </Region>
                <Region
                    name="playerHits"
                    params={131088}
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 17, minWidth: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionPlayerHits ?? '20'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'right' }}
                    />
                </Region>
            </Region>
            <Region
                params={131088}
                layout={{ position: 'absolute', left: 0, width: 114, top: 14, height: 17 }}
            >
                <Region
                    name="playerKillsLabel"
                    params={131088}
                    layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 16, minWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayerKillsLabel ?? t('snowwar.results.kills')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region
                params={131088}
                layout={{ position: 'absolute', left: 62, width: 60, top: 14, height: 17 }}
            >
                <Region
                    name="playerKills_stroke"
                    tags={[ 'stroke' ]}
                    params={131088}
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 17, minWidth: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionPlayerKillsStroke ?? '5'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#cc6666', align: 'right' }}
                    />
                </Region>
                <Region
                    name="playerKills"
                    params={131088}
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

/** Named region `playerTotalStats` of SnowwarResultsPlayerTeam2Layout - configured through the parent's `playerTotalStats` prop. */
export interface SnowwarResultsPlayerTeam2LayoutPlayerTotalStatsProps {
    captionTotalScore?: string;
    captionTotalScoreLabel?: string;
    captionTotalScoreStroke?: string;
    layout?: BoxLayout;
}

export const SnowwarResultsPlayerTeam2LayoutPlayerTotalStats = ({ captionTotalScore, captionTotalScoreLabel, captionTotalScoreStroke, layout }: SnowwarResultsPlayerTeam2LayoutPlayerTotalStatsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="playerTotalStats"
            params={16}
            layout={{ position: 'absolute', left: 13, width: 140, top: 24, height: 35, ...layout }}
        >
            <Region
                params={131088}
                layout={{ position: 'absolute', left: 0, width: 148, top: 9, height: 17 }}
            >
                <Region
                    name="totalScoreLabel"
                    params={131088}
                    layout={{ position: 'absolute', left: 0, width: 148, top: 0, height: 17, minWidth: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTotalScoreLabel ?? t('snowwar.stats.total_score')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region
                params={131088}
                layout={{ position: 'absolute', left: 100, width: 54, top: 9, height: 17 }}
            >
                <Region
                    name="totalScore_stroke"
                    tags={[ 'stroke' ]}
                    params={131088}
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
                    params={131088}
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

/** Named region `scoreTooltip` of SnowwarResultsPlayerTeam2Layout - configured through the parent's `scoreTooltip` prop. */
export interface SnowwarResultsPlayerTeam2LayoutScoreTooltipProps {
    layout?: BoxLayout;
    onScoreTooltip?: () => void;
    srcSkillLevel?: string;
    visibleScoreTooltip?: boolean;
}

export const SnowwarResultsPlayerTeam2LayoutScoreTooltip = ({ layout, onScoreTooltip, srcSkillLevel, visibleScoreTooltip }: SnowwarResultsPlayerTeam2LayoutScoreTooltipProps) => {
    return (
        <Region
            name="scoreTooltip"
            params={17}
            visible={visibleScoreTooltip ?? false}
            onPointerTap={onScoreTooltip}
            cursor="pointer"
            layout={{ position: 'absolute', left: 7, width: 150, top: 33, height: 13, ...layout }}
        >
            <ThemeImage
                name="skillLevel"
                tags={[ 'bitmap' ]}
                params={16}
                src={srcSkillLevel}
                layout={{ position: 'absolute', left: 0, width: 150, top: 0, height: 13 }}
            />
        </Region>
    );
};

/** Named region `playerDataContainer` of SnowwarResultsPlayerTeam2Layout - configured through the parent's `playerDataContainer` prop. */
export interface SnowwarResultsPlayerTeam2LayoutPlayerDataContainerProps {
    captionPlayerName?: string;
    captionPlayerNameStroke?: string;
    layout?: BoxLayout;
    playerStats?: SnowwarResultsPlayerTeam2LayoutPlayerStatsProps;
    playerTotalStats?: SnowwarResultsPlayerTeam2LayoutPlayerTotalStatsProps;
    scoreTooltip?: SnowwarResultsPlayerTeam2LayoutScoreTooltipProps;
    srcPlayerDataBackground?: string;
}

export const SnowwarResultsPlayerTeam2LayoutPlayerDataContainer = ({ captionPlayerName, captionPlayerNameStroke, layout, playerStats, playerTotalStats, scoreTooltip, srcPlayerDataBackground }: SnowwarResultsPlayerTeam2LayoutPlayerDataContainerProps) => {
    return (
        <Region
            name="playerDataContainer"
            params={16}
            layout={{ width: 162, height: 62, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="playerDataBackground"
                tags={[ 'bitmap' ]}
                params={16}
                src={srcPlayerDataBackground ?? layoutImage('red_infobox.png')}
                layout={{ position: 'absolute', left: 0, width: 162, top: 0, height: 62 }}
            />
            <Region
                name="playerName_stroke"
                tags={[ 'stroke' ]}
                params={208}
                layout={{ position: 'absolute', width: 68, top: 3, height: 19, maxWidth: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPlayerNameStroke ?? 'Painimies'}
                    textOptions={{ fill: '#993333' }}
                />
            </Region>
            <Region
                name="playerName"
                params={208}
                layout={{ position: 'absolute', width: 68, top: 3, height: 19, maxWidth: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPlayerName ?? 'Painimies'}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <SnowwarResultsPlayerTeam2LayoutPlayerStats {...playerStats} />
            <SnowwarResultsPlayerTeam2LayoutPlayerTotalStats {...playerTotalStats} />
            <SnowwarResultsPlayerTeam2LayoutScoreTooltip {...scoreTooltip} />
        </Region>
    );
};

/** Named region `addFriend` of SnowwarResultsPlayerTeam2Layout - configured through the parent's `addFriend` prop. */
export interface SnowwarResultsPlayerTeam2LayoutAddFriendProps {
    layout?: BoxLayout;
    onAddFriend?: () => void;
    visibleAddFriend?: boolean;
}

export const SnowwarResultsPlayerTeam2LayoutAddFriend = ({ layout, onAddFriend, visibleAddFriend }: SnowwarResultsPlayerTeam2LayoutAddFriendProps) => {
    const t = useTranslation();

    return (
        <Region
            name="addFriend"
            tooltip={t('snowwar.add_friend.tooltip')}
            params={17}
            visible={visibleAddFriend ?? false}
            onPointerTap={onAddFriend}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 62, ...layout }}
        >
            <ThemeImage
                tags={[ 'bitmap' ]}
                params={16}
                src={layoutImage('add_friend_icon_red.png')}
                layout={{ position: 'absolute', left: 41, width: 20, top: 3, height: 20 }}
            />
        </Region>
    );
};

/** Named region `playerImageContainer` of SnowwarResultsPlayerTeam2Layout - configured through the parent's `playerImageContainer` prop. */
export interface SnowwarResultsPlayerTeam2LayoutPlayerImageContainerProps {
    addFriend?: SnowwarResultsPlayerTeam2LayoutAddFriendProps;
    layout?: BoxLayout;
    srcPlayerImage?: string;
    srcPlayerImageBackground?: string;
}

export const SnowwarResultsPlayerTeam2LayoutPlayerImageContainer = ({ addFriend, layout, srcPlayerImage, srcPlayerImageBackground }: SnowwarResultsPlayerTeam2LayoutPlayerImageContainerProps) => {
    return (
        <Region
            name="playerImageContainer"
            params={16}
            layout={{ width: 64, height: 62, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="playerImageBackground"
                tags={[ 'bitmap' ]}
                params={16}
                src={srcPlayerImageBackground ?? layoutImage('red_square.png')}
                layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 62 }}
            />
            <ThemeImage
                name="playerImage"
                tags={[ 'bitmap' ]}
                params={16}
                src={srcPlayerImage}
                layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 62 }}
            />
            <SnowwarResultsPlayerTeam2LayoutAddFriend {...addFriend} />
        </Region>
    );
};
