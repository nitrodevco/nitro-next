import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `420_snowwar_ending_xml` (layout "snowwar_ending", 882x510) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarEndingLayoutProps {
    captionArenaName?: string;
    captionEndingInformation?: string;
    captionEndingInformationStroke?: string;
    captionLeaveLink?: string;
    captionLoadingText?: string;
    captionLoadingTextStroke?: string;
    captionMostHitsLabel?: string;
    captionMostHitsLabelStroke?: string;
    captionMostKillsLabel?: string;
    captionMostKillsLabelStroke?: string;
    captionPlayerName?: string;
    captionPlayerName2?: string;
    captionTeam1Score?: string;
    captionTeam1ScoreStroke?: string;
    captionTeam2Score?: string;
    captionTeam2ScoreStroke?: string;
    layout?: BoxLayout;
    onButtonBuyGames?: () => void;
    onButtonPlayAgain?: () => void;
    onButtonRematch?: () => void;
    onLeaveLinkRegion?: () => void;
    srcArenaPreview?: string;
    srcBackgroundImage?: string;
    srcBackgroundImage2?: string;
    srcMainLoadingIcon?: string;
    srcPlayerImage?: string;
    srcPlayerImage2?: string;
    srcSnowwarLogo?: string;
    srcTeam1ScoreBackground?: string;
    srcTeam2ScoreBackground?: string;
    statusContainer?: SnowwarEndingLayoutStatusContainerProps;
    strokeTextColor?: string;
    visibleButtonBuyGames?: boolean;
    visibleButtonPlayAgain?: boolean;
    visibleButtonsContainer?: boolean;
    visibleLoadingContainer?: boolean;
}

export const SnowwarEndingLayout = ({ captionArenaName, captionEndingInformation, captionEndingInformationStroke, captionLeaveLink, captionLoadingText, captionLoadingTextStroke, captionMostHitsLabel, captionMostHitsLabelStroke, captionMostKillsLabel, captionMostKillsLabelStroke, captionPlayerName, captionPlayerName2, captionTeam1Score, captionTeam1ScoreStroke, captionTeam2Score, captionTeam2ScoreStroke, layout, onButtonBuyGames, onButtonPlayAgain, onButtonRematch, onLeaveLinkRegion, srcArenaPreview, srcBackgroundImage, srcBackgroundImage2, srcMainLoadingIcon, srcPlayerImage, srcPlayerImage2, srcSnowwarLogo, srcTeam1ScoreBackground, srcTeam2ScoreBackground, statusContainer, strokeTextColor, visibleButtonBuyGames, visibleButtonPlayAgain, visibleButtonsContainer, visibleLoadingContainer }: SnowwarEndingLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 882, height: 510, ...layout }}>
            <Region
                backgroundColor="#eeeeff"
                layout={{ position: 'absolute', marginLeft: -25, marginRight: 25, width: 882, top: 0, height: 510, minWidth: 455, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="snowwar_logo"
                    src={srcSnowwarLogo ?? layoutImage('snowstorm_logo.png')}
                    layout={{ position: 'absolute', width: 308, top: 0, height: 83 }}
                />
                <Region
                    name="team1PlayersList"
                    layout={{ position: 'absolute', left: 0, width: 289, top: 115, height: 318, flexDirection: 'column', gap: 2 }}
                />
                <Region
                    name="team2PlayersList"
                    layout={{ position: 'absolute', right: 0, width: 289, top: 115, height: 318, flexDirection: 'column', gap: 2 }}
                />
                <SnowwarEndingLayoutStatusContainer {...statusContainer} />
                {(visibleButtonsContainer ?? false) && (
                    <Region
                        name="buttonsContainer"
                        layout={{ position: 'absolute', width: 180, top: 430, height: 50, justifyContent: 'center' }}
                    >
                        {(visibleButtonPlayAgain ?? false) && (
                            <ButtonThick
                                variant="5"
                                name="button_play_again"
                                tintColor="#00ff00"
                                onPointerTap={onButtonPlayAgain}
                                layout={{ position: 'absolute', width: 180, top: 0, height: 50, minWidth: 180, minHeight: 50 }}
                            >
                                {t('snowwar.new_game')}
                            </ButtonThick>
                        )}
                        <ButtonThick
                            variant="5"
                            name="button_rematch"
                            tintColor="#00ff00"
                            onPointerTap={onButtonRematch}
                            layout={{ position: 'absolute', width: 180, top: 0, height: 50, minWidth: 180, minHeight: 50 }}
                        >
                            Rematch
                        </ButtonThick>
                        {(visibleButtonBuyGames ?? false) && (
                            <ButtonThick
                                variant="5"
                                name="button_buy_games"
                                tintColor="#00ff00"
                                onPointerTap={onButtonBuyGames}
                                layout={{ position: 'absolute', width: 180, top: 0, height: 50, minWidth: 180, minHeight: 50 }}
                            >
                                {t('snowwar.buy_x_games')}
                            </ButtonThick>
                        )}
                    </Region>
                )}
                <Region
                    name="leave_link_region"
                    onPointerTap={onLeaveLinkRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 127, top: 405, height: 17 }}
                >
                    <Icon
                        variant="4"
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 0, width: 10, top: 5, height: 10 }}
                    />
                    <Region
                        name="leave_link"
                        layout={{ position: 'absolute', left: 5, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionLeaveLink ?? t('snowwar.leave_game')}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                </Region>
                <Region
                    name="mostKillsContainer"
                    layout={{ position: 'absolute', left: 300, width: 130, top: 180, height: 117, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="backgroundImage"
                        src={srcBackgroundImage ?? layoutImage('blue_square.png')}
                        layout={{ position: 'absolute', width: 70, top: 26, height: 70 }}
                    />
                    <Region
                        name="mostKillsLabel_stroke"
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 115, top: 2, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionMostKillsLabelStroke ?? t('snowwar.most_kills')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: strokeTextColor, align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="mostKillsLabel"
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 115, top: 2, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionMostKillsLabel ?? t('snowwar.most_kills')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="playerName"
                        layout={{ position: 'absolute', width: 130, top: 92, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionPlayerName ?? 'yyyy yyyyyy'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: strokeTextColor ?? '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <ThemeImage
                        name="playerImage"
                        src={srcPlayerImage}
                        layout={{ position: 'absolute', width: 70, top: 26, height: 70 }}
                    />
                </Region>
                <Region
                    name="mostHitsContainer"
                    layout={{ position: 'absolute', left: 450, width: 130, top: 180, height: 117, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="backgroundImage"
                        src={srcBackgroundImage2 ?? layoutImage('red_square.png')}
                        layout={{ position: 'absolute', width: 70, top: 26, height: 70 }}
                    />
                    <Region
                        name="mostHitsLabel_stroke"
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 115, top: 2, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionMostHitsLabelStroke ?? t('snowwar.most_hits')}
                            textOptions={{ fill: strokeTextColor, align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="mostHitsLabel"
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 115, top: 2, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionMostHitsLabel ?? t('snowwar.most_hits')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="playerName"
                        layout={{ position: 'absolute', width: 130, top: 92, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionPlayerName2 ?? 'xxxxx xxxxx'}
                            textOptions={{ fill: strokeTextColor ?? '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <ThemeImage
                        name="playerImage"
                        src={srcPlayerImage2}
                        layout={{ position: 'absolute', width: 70, top: 26, height: 70 }}
                    />
                </Region>
                <Region
                    name="team1ScoreContainer"
                    layout={{ position: 'absolute', left: 203, width: 80, top: 10, height: 101 }}
                >
                    <ThemeImage
                        name="team1ScoreBackground"
                        src={srcTeam1ScoreBackground ?? layoutImage('blue_glove.png')}
                        layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 101 }}
                    />
                    <Region
                        name="team1Score_stroke"
                        layout={{ position: 'absolute', left: 13, width: 49, top: 41, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionTeam1ScoreStroke ?? '245'}
                            textOptions={{ fill: strokeTextColor ?? '#1077ac', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="team1Score"
                        layout={{ position: 'absolute', left: 13, width: 49, top: 41, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionTeam1Score ?? '245'}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="team2ScoreContainer"
                    layout={{ position: 'absolute', left: 598, width: 80, top: 10, height: 101 }}
                >
                    <ThemeImage
                        name="team2ScoreBackground"
                        src={srcTeam2ScoreBackground ?? layoutImage('red_glove.png')}
                        layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 101 }}
                    />
                    <Region
                        name="team2Score_stroke"
                        layout={{ position: 'absolute', left: 20, width: 49, top: 41, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionTeam2ScoreStroke ?? '245'}
                            textOptions={{ fill: strokeTextColor ?? '#fd6859', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="team2Score"
                        layout={{ position: 'absolute', left: 20, width: 49, top: 41, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionTeam2Score ?? '245'}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="headerContainer"
                    layout={{ position: 'absolute', width: 450, top: 118, height: 35 }}
                >
                    <Region
                        name="endingInformation_stroke"
                        layout={{ position: 'absolute', left: 0, width: 450, top: 0, height: 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionEndingInformationStroke ?? 'Blue team wins!'}
                            textOptions={{ fill: strokeTextColor ?? '#1077ac', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="endingInformation"
                        layout={{ position: 'absolute', left: 0, width: 450, top: 0, height: 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionEndingInformation ?? 'Blue team wins!'}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Region>
                {(visibleLoadingContainer ?? false) && (
                    <Region
                        name="loadingContainer"
                        layout={{ position: 'absolute', left: 337, width: 208, top: 167, height: 235, justifyContent: 'center' }}
                    >
                        <Region
                            name="loadingText_stroke"
                            layout={{ position: 'absolute', width: 208, top: 0, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionLoadingTextStroke ?? t('snowwar.waiting_players')}
                                textOptions={{ fill: strokeTextColor ?? '#1077ac', align: 'center' }}
                            />
                        </Region>
                        <Region
                            name="loadingText"
                            layout={{ position: 'absolute', width: 208, top: 0, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionLoadingText ?? t('snowwar.waiting_players')}
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                        <ThemeImage
                            name="arenaPreview"
                            src={srcArenaPreview}
                            layout={{ position: 'absolute', left: 0, width: 208, top: 35, height: 100 }}
                        />
                        <Region
                            name="arenaName"
                            layout={{ position: 'absolute', width: 4, top: 140, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionArenaName ?? ''}
                                textOptions={{ fill: '#1077ac' }}
                            />
                        </Region>
                        <ThemeImage
                            name="mainLoadingIcon"
                            src={srcMainLoadingIcon}
                            layout={{ position: 'absolute', width: 50, top: 180, height: 50 }}
                        />
                    </Region>
                )}
            </Region>
        </Region>
    );
};

/** Named region `statusContainer` of SnowwarEndingLayout - configured through the parent's `statusContainer` prop. */
export interface SnowwarEndingLayoutStatusContainerProps {
    captionGamesLeft?: string;
    captionGamesLeftStroke?: string;
    captionStatusTextGetMoreGames?: string;
    captionStatusTextGetVip?: string;
    layout?: BoxLayout;
    onStatusContainer?: () => void;
    visibleStatusTextGetMoreGames?: boolean;
}

export const SnowwarEndingLayoutStatusContainer = ({ captionGamesLeft, captionGamesLeftStroke, captionStatusTextGetMoreGames, captionStatusTextGetVip, layout, onStatusContainer, visibleStatusTextGetMoreGames }: SnowwarEndingLayoutStatusContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="statusContainer"
            onPointerTap={onStatusContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 293, width: 297, top: 321, height: 61, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', top: 0, flexDirection: 'row', gap: 5 }}>
                <Region layout={{ width: 127, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    {t('snowwar.games_left')}
                </Region>
                <Region layout={{ width: 15, height: 26, flexShrink: 0 }}>
                    <Region
                        name="games_left_stroke"
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionGamesLeftStroke ?? '3'}
                            textOptions={{ fill: '#1077ac' }}
                        />
                    </Region>
                    <Region
                        name="games_left"
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionGamesLeft ?? '3'}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
            </Region>
            <Region
                name="status.text_get_vip"
                layout={{ position: 'absolute', width: 297, top: 27, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionStatusTextGetVip ?? t('snowwar.get_more_games')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
            {(visibleStatusTextGetMoreGames ?? false) && (
                <Region
                    name="status.text_get_more_games"
                    layout={{ position: 'absolute', width: 297, top: 27, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionStatusTextGetMoreGames ?? t('snowwar.buy_x_games')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            )}
        </Region>
    );
};
