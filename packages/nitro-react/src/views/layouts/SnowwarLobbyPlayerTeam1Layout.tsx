import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `347_snowwar_lobby_player_team_1_xml` (layout "snowwar_lobby_player_team_1", 289x62) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarLobbyPlayerTeam1LayoutProps {
    layout?: BoxLayout;
}

export const SnowwarLobbyPlayerTeam1Layout = ({ layout }: SnowwarLobbyPlayerTeam1LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 289, height: 62, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 289, top: 0, height: 62, flexDirection: 'row' }}
            >
                <Region
                    name="playerImageContainer"
                    params={16}
                    layout={{ width: 64, height: 62, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="playerImageBackground"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={layoutImage('gray_square.png')}
                        layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 62 }}
                    />
                    <ThemeImage
                        name="playerImage"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 62 }}
                    />
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
                        src={layoutImage('gray_infobox.png')}
                        layout={{ position: 'absolute', left: 0, width: 162, top: 0, height: 62 }}
                    />
                    <Region
                        name="playerName_stroke"
                        tags={[ 'stroke' ]}
                        params={208}
                        layout={{ position: 'absolute', left: 46, width: 71, top: 3, height: 20, maxWidth: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Painimies"
                            textOptions={{ fill: '#666666' }}
                        />
                    </Region>
                    <Region
                        name="playerName"
                        params={208}
                        layout={{ position: 'absolute', left: 47, width: 68, top: 3, height: 19, maxWidth: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Painimies"
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
                                    text="HITS"
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#1077ac' }}
                                />
                            </Region>
                            <Region
                                name="playerHitsLabel"
                                params={131088}
                                layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 17, minWidth: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="HITS"
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
                                    text="20"
                                    textStyle="text-style-u-bold"
                                    textOptions={{ fill: '#1077ac' }}
                                />
                            </Region>
                            <Region
                                name="playerHits"
                                params={131088}
                                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 17, minWidth: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="20"
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
                                    text="KILLS"
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#1077ac' }}
                                />
                            </Region>
                            <Region
                                name="playerKillsLabel"
                                params={131088}
                                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, minWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="KILLS"
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
                                    text="5"
                                    textStyle="text-style-u-bold"
                                    textOptions={{ fill: '#1077ac' }}
                                />
                            </Region>
                            <Region
                                name="playerKills"
                                params={131088}
                                layout={{ position: 'absolute', left: 0, width: 41, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="5"
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
                                    text={t('snowwar.stats.total_score')}
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
                                    text="20"
                                    textStyle="text-style-u-bold"
                                    textOptions={{ fill: '#1077ac' }}
                                />
                            </Region>
                            <Region
                                name="totalScore"
                                params={131088}
                                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 17, minWidth: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="20"
                                    textStyle="text-style-u-bold"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="scoreTooltip"
                        params={17}
                        visible={false}
                        layout={{ position: 'absolute', left: 7, width: 150, top: 33, height: 13 }}
                    >
                        <ThemeImage
                            name="skillLevel"
                            tags={[ 'bitmap' ]}
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 0, width: 150, top: 0, height: 13 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="playerScoreContainer"
                    params={16}
                    layout={{ width: 61, height: 62, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="playerScoreBackground"
                        tags={[ 'bitmap' ]}
                        params={16400}
                        src={layoutImage('gray_ball.png')}
                        layout={{ position: 'absolute', left: 0, width: 61, top: 0, height: 62 }}
                    />
                    <Region
                        name="playerScore_stroke"
                        tags={[ 'stroke' ]}
                        params={131088}
                        layout={{ position: 'absolute', left: 13, width: 40, top: 17, height: 24, minWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="102"
                            textOptions={{ fill: '#1077ac' }}
                        />
                    </Region>
                    <Region
                        name="playerScore"
                        params={131088}
                        layout={{ position: 'absolute', left: 13, width: 34, top: 17, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="102"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
