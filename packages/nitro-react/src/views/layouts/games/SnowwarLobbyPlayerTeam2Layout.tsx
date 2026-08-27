import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `421_snowwar_lobby_player_team_2_xml` (layout "snowwar_lobby_player_team_2", 289x62) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarLobbyPlayerTeam2LayoutProps {
    captionPlayerHits?: string;
    captionPlayerHitsLabel?: string;
    captionPlayerHitsLabelStroke?: string;
    captionPlayerHitsStroke?: string;
    captionPlayerKills?: string;
    captionPlayerKillsLabel?: string;
    captionPlayerKillsLabelStroke?: string;
    captionPlayerKillsStroke?: string;
    captionPlayerName?: string;
    captionPlayerNameStroke?: string;
    captionPlayerScore?: string;
    captionPlayerScoreStroke?: string;
    captionTotalScore?: string;
    captionTotalScoreLabel?: string;
    captionTotalScoreStroke?: string;
    layout?: BoxLayout;
    onScoreTooltip?: () => void;
    srcPlayerDataBackground?: string;
    srcPlayerImage?: string;
    srcPlayerImageBackground?: string;
    srcPlayerScoreBackground?: string;
    srcSkillLevel?: string;
    visibleScoreTooltip?: boolean;
}

export const SnowwarLobbyPlayerTeam2Layout = ({ captionPlayerHits, captionPlayerHitsLabel, captionPlayerHitsLabelStroke, captionPlayerHitsStroke, captionPlayerKills, captionPlayerKillsLabel, captionPlayerKillsLabelStroke, captionPlayerKillsStroke, captionPlayerName, captionPlayerNameStroke, captionPlayerScore, captionPlayerScoreStroke, captionTotalScore, captionTotalScoreLabel, captionTotalScoreStroke, layout, onScoreTooltip, srcPlayerDataBackground, srcPlayerImage, srcPlayerImageBackground, srcPlayerScoreBackground, srcSkillLevel, visibleScoreTooltip }: SnowwarLobbyPlayerTeam2LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 289, height: 62, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 289, top: 0, height: 62, flexDirection: 'row' }}
            >
                <Region
                    name="playerScoreContainer"
                    params={16}
                    layout={{ width: 61, height: 62, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="playerScoreBackground"
                        tags={[ 'bitmap' ]}
                        params={16400}
                        src={srcPlayerScoreBackground ?? layoutImage('gray_ball.png')}
                        layout={{ position: 'absolute', left: 0, width: 61, top: 0, height: 62 }}
                    />
                    <Region
                        name="playerScore_stroke"
                        tags={[ 'stroke' ]}
                        params={131088}
                        layout={{ position: 'absolute', left: 13, width: 40, top: 17, height: 24, minWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPlayerScoreStroke ?? '102'}
                            textOptions={{ fill: '#fd6859' }}
                        />
                    </Region>
                    <Region
                        name="playerScore"
                        params={131088}
                        layout={{ position: 'absolute', left: 13, width: 34, top: 17, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPlayerScore ?? '102'}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="playerDataContainer"
                    params={16}
                    layout={{ width: 162, height: 62, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="playerDataBackground"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={srcPlayerDataBackground ?? layoutImage('gray_infobox.png')}
                        layout={{ position: 'absolute', left: 0, width: 162, top: 0, height: 62 }}
                    />
                    <Region
                        name="playerName_stroke"
                        tags={[ 'stroke' ]}
                        params={208}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -34, width: 68, top: 3, height: 19, maxWidth: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPlayerNameStroke ?? 'Painimies'}
                            textOptions={{ fill: '#666666' }}
                        />
                    </Region>
                    <Region
                        name="playerName"
                        params={208}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -34, width: 68, top: 3, height: 19, maxWidth: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPlayerName ?? 'Painimies'}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="playerStats"
                        params={16}
                        layout={{ position: 'absolute', left: 13, width: 140, top: 29, height: 20, flexDirection: 'row' }}
                    >
                        <Region
                            params={131088}
                            layout={{ width: 33, height: 17, flexShrink: 0 }}
                        >
                            <Region
                                name="playerHitsLabel_stroke"
                                tags={[ 'stroke' ]}
                                params={131088}
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
                                params={131088}
                                layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 17, minWidth: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionPlayerHitsLabel ?? 'HITS'}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                        </Region>
                        <Region
                            params={131088}
                            layout={{ width: 54, height: 17, flexShrink: 0 }}
                        >
                            <Region
                                name="playerHits_stroke"
                                tags={[ 'stroke' ]}
                                params={131088}
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
                                params={131088}
                                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 17, minWidth: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionPlayerHits ?? '20'}
                                    textStyle="text-style-u-bold"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                        </Region>
                        <Region
                            params={131088}
                            layout={{ width: 40, height: 17, flexShrink: 0 }}
                        >
                            <Region
                                name="playerKillsLabel_stroke"
                                tags={[ 'stroke' ]}
                                params={131088}
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
                                params={131088}
                                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, minWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionPlayerKillsLabel ?? 'KILLS'}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                        </Region>
                        <Region
                            params={131088}
                            layout={{ width: 50, height: 17, flexShrink: 0 }}
                        >
                            <Region
                                name="playerKills_stroke"
                                tags={[ 'stroke' ]}
                                params={131088}
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
                                params={131088}
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
                    <Region
                        name="playerTotalStats"
                        params={16}
                        layout={{ position: 'absolute', left: 13, width: 140, top: 24, height: 35 }}
                    >
                        <Region
                            params={131088}
                            layout={{ position: 'absolute', left: 0, width: 50, top: 9, height: 17 }}
                        >
                            <Region
                                name="totalScoreLabel"
                                params={131088}
                                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 17, minWidth: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
                    <Region
                        name="scoreTooltip"
                        params={17}
                        visible={visibleScoreTooltip ?? false}
                        onPointerTap={onScoreTooltip}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 7, width: 150, top: 33, height: 13 }}
                    >
                        <ThemeImage
                            name="skillLevel"
                            tags={[ 'bitmap' ]}
                            params={16}
                            src={srcSkillLevel}
                            layout={{ position: 'absolute', left: 0, width: 150, top: 0, height: 13 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="playerImageContainer"
                    params={16}
                    layout={{ width: 64, height: 62, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="playerImageBackground"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={srcPlayerImageBackground ?? layoutImage('gray_square.png')}
                        layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 62 }}
                    />
                    <ThemeImage
                        name="playerImage"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={srcPlayerImage}
                        layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 62 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
