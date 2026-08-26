import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `420_snowwar_ending_xml` (layout "snowwar_ending", 882x510) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarEndingLayoutProps {
    layout?: BoxLayout;
    onButtonBuyGames?: () => void;
    onButtonPlayAgain?: () => void;
    onButtonRematch?: () => void;
}

export const SnowwarEndingLayout = ({ layout, onButtonBuyGames, onButtonPlayAgain, onButtonRematch }: SnowwarEndingLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 882, height: 510, ...layout }}>
            <Region
                params={192}
                backgroundColor="#eeeeff"
                layout={{ position: 'absolute', left: -25, width: 882, top: 0, height: 510, minWidth: 455 }}
            >
                <ThemeImage
                    name="snowwar_logo"
                    tags={[ 'bitmap' ]}
                    params={208}
                    src={layoutImage('snowstorm_logo.png')}
                    layout={{ position: 'absolute', left: 287, width: 308, top: 0, height: 83 }}
                />
                <Region
                    name="team1PlayersList"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 289, top: 115, height: 318, flexDirection: 'column', gap: 2 }}
                />
                <Region
                    name="team2PlayersList"
                    params={80}
                    layout={{ position: 'absolute', left: 593, width: 289, top: 115, height: 318, flexDirection: 'column', gap: 2 }}
                />
                <Region
                    name="statusContainer"
                    params={17}
                    layout={{ position: 'absolute', left: 293, width: 297, top: 321, height: 61 }}
                >
                    <Region
                        params={147664}
                        layout={{ position: 'absolute', left: 75, width: 147, top: 0, height: 30, flexDirection: 'row', gap: 5 }}
                    >
                        <Region
                            params={16}
                            layout={{ width: 127, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('snowwar.games_left')} />
                        </Region>
                        <Region
                            params={147472}
                            layout={{ width: 15, height: 26, flexShrink: 0 }}
                        >
                            <Region
                                name="games_left_stroke"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="3"
                                    textOptions={{ fill: '#1077ac' }}
                                />
                            </Region>
                            <Region
                                name="games_left"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="3"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="status.text_get_vip"
                        params={786448}
                        layout={{ position: 'absolute', left: 0, width: 297, top: 27, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('snowwar.get_more_games')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="status.text_get_more_games"
                        params={786448}
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 297, top: 27, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('snowwar.buy_x_games')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="buttonsContainer"
                    params={208}
                    visible={false}
                    layout={{ position: 'absolute', left: 351, width: 180, top: 430, height: 50 }}
                >
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 50, minWidth: 180, minHeight: 50 }}
                    >
                        <ButtonThick
                            variant="5"
                            name="button_play_again"
                            params={131281}
                            tintColor="#00ff00"
                            onPointerTap={onButtonPlayAgain}
                            layout={{ width: '100%', height: '100%' }}
                        >
                            {t('snowwar.new_game')}
                        </ButtonThick>
                    </Region>
                    <ButtonThick
                        variant="5"
                        name="button_rematch"
                        params={131281}
                        tintColor="#00ff00"
                        onPointerTap={onButtonRematch}
                        layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 50, minWidth: 180, minHeight: 50 }}
                    >
                        Rematch
                    </ButtonThick>
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 50, minWidth: 180, minHeight: 50 }}
                    >
                        <ButtonThick
                            variant="5"
                            name="button_buy_games"
                            params={131281}
                            tintColor="#00ff00"
                            onPointerTap={onButtonBuyGames}
                            layout={{ width: '100%', height: '100%' }}
                        >
                            {t('snowwar.buy_x_games')}
                        </ButtonThick>
                    </Region>
                </Region>
                <Region
                    name="leave_link_region"
                    params={934097}
                    layout={{ position: 'absolute', left: 378, width: 127, top: 405, height: 17 }}
                >
                    <Icon
                        variant="4"
                        params={16}
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 0, width: 10, top: 5, height: 10 }}
                    />
                    <Region
                        name="leave_link"
                        params={4194320}
                        layout={{ position: 'absolute', left: 5, width: 122, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('snowwar.leave_game')}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                </Region>
                <Region
                    name="mostKillsContainer"
                    params={16}
                    layout={{ position: 'absolute', left: 300, width: 130, top: 180, height: 117 }}
                >
                    <ThemeImage
                        name="backgroundImage"
                        tags={[ 'bitmap' ]}
                        params={208}
                        src={layoutImage('blue_square.png')}
                        layout={{ position: 'absolute', left: 30, width: 70, top: 26, height: 70 }}
                    />
                    <Region
                        name="mostKillsLabel_stroke"
                        tags={[ 'stroke' ]}
                        params={208}
                        layout={{ position: 'absolute', left: 8, width: 115, top: 2, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('snowwar.most_kills')}
                            textStyle="text-style-u-bold"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="mostKillsLabel"
                        params={208}
                        layout={{ position: 'absolute', left: 8, width: 115, top: 2, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('snowwar.most_kills')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="playerName"
                        tags={[ 'stroke' ]}
                        params={786640}
                        layout={{ position: 'absolute', left: 0, width: 130, top: 92, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="yyyy yyyyyy"
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <ThemeImage
                        name="playerImage"
                        tags={[ 'bitmap' ]}
                        params={208}
                        src={undefined}
                        layout={{ position: 'absolute', left: 30, width: 70, top: 26, height: 70 }}
                    />
                </Region>
                <Region
                    name="mostHitsContainer"
                    params={16}
                    layout={{ position: 'absolute', left: 450, width: 130, top: 180, height: 117 }}
                >
                    <ThemeImage
                        name="backgroundImage"
                        tags={[ 'bitmap' ]}
                        params={208}
                        src={layoutImage('red_square.png')}
                        layout={{ position: 'absolute', left: 30, width: 70, top: 26, height: 70 }}
                    />
                    <Region
                        name="mostHitsLabel_stroke"
                        tags={[ 'stroke' ]}
                        params={208}
                        layout={{ position: 'absolute', left: 8, width: 115, top: 2, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('snowwar.most_hits')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="mostHitsLabel"
                        params={208}
                        layout={{ position: 'absolute', left: 8, width: 115, top: 2, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('snowwar.most_hits')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="playerName"
                        tags={[ 'stroke' ]}
                        params={786640}
                        layout={{ position: 'absolute', left: 0, width: 130, top: 92, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="xxxxx xxxxx"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <ThemeImage
                        name="playerImage"
                        params={208}
                        src={undefined}
                        layout={{ position: 'absolute', left: 30, width: 70, top: 26, height: 70 }}
                    />
                </Region>
                <Region
                    name="team1ScoreContainer"
                    params={16}
                    layout={{ position: 'absolute', left: 203, width: 80, top: 10, height: 101 }}
                >
                    <ThemeImage
                        name="team1ScoreBackground"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={layoutImage('blue_glove.png')}
                        layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 101 }}
                    />
                    <Region
                        name="team1Score_stroke"
                        tags={[ 'stroke' ]}
                        params={16}
                        layout={{ position: 'absolute', left: 13, width: 49, top: 41, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="245"
                            textOptions={{ fill: '#1077ac', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="team1Score"
                        params={16}
                        layout={{ position: 'absolute', left: 13, width: 49, top: 41, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="245"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="team2ScoreContainer"
                    params={16}
                    layout={{ position: 'absolute', left: 598, width: 80, top: 10, height: 101 }}
                >
                    <ThemeImage
                        name="team2ScoreBackground"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={layoutImage('red_glove.png')}
                        layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 101 }}
                    />
                    <Region
                        name="team2Score_stroke"
                        tags={[ 'stroke' ]}
                        params={16}
                        layout={{ position: 'absolute', left: 20, width: 49, top: 41, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="245"
                            textOptions={{ fill: '#fd6859', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="team2Score"
                        params={16}
                        layout={{ position: 'absolute', left: 20, width: 49, top: 41, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="245"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="headerContainer"
                    params={208}
                    layout={{ position: 'absolute', left: 216, width: 450, top: 118, height: 35 }}
                >
                    <Region
                        name="endingInformation_stroke"
                        tags={[ 'stroke' ]}
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 450, top: 0, height: 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="Blue team wins!"
                            textOptions={{ fill: '#1077ac', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="endingInformation"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 450, top: 0, height: 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="Blue team wins!"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="loadingContainer"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 337, width: 208, top: 167, height: 235 }}
                >
                    <Region
                        name="loadingText_stroke"
                        tags={[ 'stroke' ]}
                        params={208}
                        layout={{ position: 'absolute', left: 0, width: 208, top: 0, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('snowwar.waiting_players')}
                            textOptions={{ fill: '#1077ac', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="loadingText"
                        params={208}
                        layout={{ position: 'absolute', left: 0, width: 208, top: 0, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('snowwar.waiting_players')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <ThemeImage
                        name="arenaPreview"
                        tags={[ 'bitmap' ]}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 208, top: 35, height: 100 }}
                    />
                    <Region
                        name="arenaName"
                        params={208}
                        layout={{ position: 'absolute', left: 102, width: 4, top: 140, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    />
                    <ThemeImage
                        name="mainLoadingIcon"
                        tags={[ 'bitmap' ]}
                        params={208}
                        src={undefined}
                        layout={{ position: 'absolute', left: 79, width: 50, top: 180, height: 50 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
