import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { SnowwarEndingLayoutStatusContainer, SnowwarEndingLayoutStatusContainerProps } from './SnowwarEndingLayoutStatusContainer';

/** Generated from `420_snowwar_ending_xml` (layout "snowwar_ending", 882x510) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarEndingLayoutProps {
    captionArenaName?: string;
    captionEndingInformation?: string;
    captionEndingInformationStroke?: string;
    captionLeaveLink?: string;
    captionLoadingText?: string;
    captionLoadingTextStroke?: string;
    captionMostHitsContainerPlayerName?: string;
    captionMostHitsLabel?: string;
    captionMostHitsLabelStroke?: string;
    captionMostKillsLabel?: string;
    captionMostKillsLabelStroke?: string;
    captionPlayerName?: string;
    captionTeam1Score?: string;
    captionTeam1ScoreStroke?: string;
    captionTeam2Score?: string;
    captionTeam2ScoreStroke?: string;
    itemsTeam1PlayersList?: ReactNode;
    itemsTeam2PlayersList?: ReactNode;
    layout?: BoxLayout;
    onButtonBuyGames?: () => void;
    onButtonPlayAgain?: () => void;
    onButtonRematch?: () => void;
    onLeaveLinkRegion?: () => void;
    srcArenaPreview?: string;
    srcBackgroundImage?: string;
    srcMainLoadingIcon?: string;
    srcMostHitsContainerBackgroundImage?: string;
    srcMostHitsContainerPlayerImage?: string;
    srcPlayerImage?: string;
    srcSnowwarLogo?: string;
    srcTeam1ScoreBackground?: string;
    srcTeam2ScoreBackground?: string;
    statusContainer?: SnowwarEndingLayoutStatusContainerProps;
    strokeTextColor?: string;
    tintArenaPreview?: string;
    tintBackgroundImage?: string;
    tintMainLoadingIcon?: string;
    tintMostHitsContainerBackgroundImage?: string;
    tintMostHitsContainerPlayerImage?: string;
    tintPlayerImage?: string;
    tintSnowwarLogo?: string;
    tintTeam1ScoreBackground?: string;
    tintTeam2ScoreBackground?: string;
    visibleButtonBuyGames?: boolean;
    visibleButtonPlayAgain?: boolean;
    visibleButtonsContainer?: boolean;
    visibleLoadingContainer?: boolean;
}

export const SnowwarEndingLayout = ({ captionArenaName, captionEndingInformation, captionEndingInformationStroke, captionLeaveLink, captionLoadingText, captionLoadingTextStroke, captionMostHitsContainerPlayerName, captionMostHitsLabel, captionMostHitsLabelStroke, captionMostKillsLabel, captionMostKillsLabelStroke, captionPlayerName, captionTeam1Score, captionTeam1ScoreStroke, captionTeam2Score, captionTeam2ScoreStroke, itemsTeam1PlayersList, itemsTeam2PlayersList, layout, onButtonBuyGames, onButtonPlayAgain, onButtonRematch, onLeaveLinkRegion, srcArenaPreview, srcBackgroundImage, srcMainLoadingIcon, srcMostHitsContainerBackgroundImage, srcMostHitsContainerPlayerImage, srcPlayerImage, srcSnowwarLogo, srcTeam1ScoreBackground, srcTeam2ScoreBackground, statusContainer, strokeTextColor, tintArenaPreview, tintBackgroundImage, tintMainLoadingIcon, tintMostHitsContainerBackgroundImage, tintMostHitsContainerPlayerImage, tintPlayerImage, tintSnowwarLogo, tintTeam1ScoreBackground, tintTeam2ScoreBackground, visibleButtonBuyGames, visibleButtonPlayAgain, visibleButtonsContainer, visibleLoadingContainer }: SnowwarEndingLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 882, height: 510, ...layout }}>
            <Region
                backgroundColor="#eeeeff"
                layout={{ position: 'absolute', marginLeft: -25, marginRight: 25, width: 882, top: 0, bottom: 0, minWidth: 455, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="snowwar_logo"
                    src={srcSnowwarLogo ?? layoutImage('snowstorm_logo.png')}
                    tint={tintSnowwarLogo}
                    layout={{ position: 'absolute', width: 308, top: 0, height: 83 }}
                />
                <Region
                    name="team1PlayersList"
                    layout={{ position: 'absolute', left: 0, width: 289, top: 115, height: 318, flexDirection: 'column', gap: 2 }}
                >
                    {itemsTeam1PlayersList}
                </Region>
                <Region
                    name="team2PlayersList"
                    layout={{ position: 'absolute', right: 0, width: 289, top: 115, height: 318, flexDirection: 'column', gap: 2 }}
                >
                    {itemsTeam2PlayersList}
                </Region>
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
                                layout={{ position: 'absolute', width: 180, top: 0, bottom: 0, minWidth: 180, minHeight: 50 }}
                            >
                                {t('snowwar.new_game')}
                            </ButtonThick>
                        )}
                        <ButtonThick
                            variant="5"
                            name="button_rematch"
                            tintColor="#00ff00"
                            onPointerTap={onButtonRematch}
                            layout={{ position: 'absolute', width: 180, top: 0, bottom: 0, minWidth: 180, minHeight: 50 }}
                        >
                            Rematch
                        </ButtonThick>
                        {(visibleButtonBuyGames ?? false) && (
                            <ButtonThick
                                variant="5"
                                name="button_buy_games"
                                tintColor="#00ff00"
                                onPointerTap={onButtonBuyGames}
                                layout={{ position: 'absolute', width: 180, top: 0, bottom: 0, minWidth: 180, minHeight: 50 }}
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
                    <ThemeText
                        text={captionLeaveLink ?? t('snowwar.leave_game')}
                        textStyle="text-style-u-bold"
                        name="leave_link"
                        layout={{ position: 'absolute', left: 5, top: 0, bottom: 0 }}
                    />
                </Region>
                <Region
                    name="mostKillsContainer"
                    layout={{ position: 'absolute', left: 300, width: 130, top: 180, height: 117, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="backgroundImage"
                        src={srcBackgroundImage ?? layoutImage('blue_square.png')}
                        tint={tintBackgroundImage}
                        layout={{ position: 'absolute', width: 70, top: 26, height: 70 }}
                    />
                    <ThemeText
                        text={captionMostKillsLabelStroke ?? t('snowwar.most_kills')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: strokeTextColor, align: 'center' }}
                        name="mostKillsLabel_stroke"
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 115, top: 2, height: 23 }}
                    />
                    <ThemeText
                        text={captionMostKillsLabel ?? t('snowwar.most_kills')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="mostKillsLabel"
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 115, top: 2, height: 23 }}
                    />
                    <ThemeText
                        text={captionPlayerName ?? 'yyyy yyyyyy'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: strokeTextColor ?? '#ffffff', align: 'center' }}
                        name="playerName"
                        layout={{ position: 'absolute', width: 130, top: 92, height: 19 }}
                    />
                    <ThemeImage
                        name="playerImage"
                        src={srcPlayerImage}
                        tint={tintPlayerImage}
                        layout={{ position: 'absolute', width: 70, top: 26, height: 70 }}
                    />
                </Region>
                <Region
                    name="mostHitsContainer"
                    layout={{ position: 'absolute', left: 450, width: 130, top: 180, height: 117, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="backgroundImage"
                        src={srcMostHitsContainerBackgroundImage ?? layoutImage('red_square.png')}
                        tint={tintMostHitsContainerBackgroundImage}
                        layout={{ position: 'absolute', width: 70, top: 26, height: 70 }}
                    />
                    <ThemeText
                        text={captionMostHitsLabelStroke ?? t('snowwar.most_hits')}
                        textOptions={{ fill: strokeTextColor, align: 'center' }}
                        name="mostHitsLabel_stroke"
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 115, top: 2, height: 23 }}
                    />
                    <ThemeText
                        text={captionMostHitsLabel ?? t('snowwar.most_hits')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="mostHitsLabel"
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 115, top: 2, height: 23 }}
                    />
                    <ThemeText
                        text={captionMostHitsContainerPlayerName ?? 'xxxxx xxxxx'}
                        textOptions={{ fill: strokeTextColor ?? '#ffffff', align: 'center' }}
                        name="playerName"
                        layout={{ position: 'absolute', width: 130, top: 92, height: 19 }}
                    />
                    <ThemeImage
                        name="playerImage"
                        src={srcMostHitsContainerPlayerImage}
                        tint={tintMostHitsContainerPlayerImage}
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
                        tint={tintTeam1ScoreBackground}
                        layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 101 }}
                    />
                    <ThemeText
                        text={captionTeam1ScoreStroke ?? '245'}
                        textOptions={{ fill: strokeTextColor ?? '#1077ac', align: 'center' }}
                        name="team1Score_stroke"
                        layout={{ position: 'absolute', left: 13, width: 49, top: 41, height: 30 }}
                    />
                    <ThemeText
                        text={captionTeam1Score ?? '245'}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="team1Score"
                        layout={{ position: 'absolute', left: 13, width: 49, top: 41, height: 30 }}
                    />
                </Region>
                <Region
                    name="team2ScoreContainer"
                    layout={{ position: 'absolute', left: 598, width: 80, top: 10, height: 101 }}
                >
                    <ThemeImage
                        name="team2ScoreBackground"
                        src={srcTeam2ScoreBackground ?? layoutImage('red_glove.png')}
                        tint={tintTeam2ScoreBackground}
                        layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 101 }}
                    />
                    <ThemeText
                        text={captionTeam2ScoreStroke ?? '245'}
                        textOptions={{ fill: strokeTextColor ?? '#fd6859', align: 'center' }}
                        name="team2Score_stroke"
                        layout={{ position: 'absolute', left: 20, width: 49, top: 41, height: 30 }}
                    />
                    <ThemeText
                        text={captionTeam2Score ?? '245'}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="team2Score"
                        layout={{ position: 'absolute', left: 20, width: 49, top: 41, height: 30 }}
                    />
                </Region>
                <Region
                    name="headerContainer"
                    layout={{ position: 'absolute', width: 450, top: 118, height: 35 }}
                >
                    <ThemeText
                        text={captionEndingInformationStroke ?? 'Blue team wins!'}
                        textOptions={{ fill: strokeTextColor ?? '#1077ac', align: 'center' }}
                        name="endingInformation_stroke"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                    <ThemeText
                        text={captionEndingInformation ?? 'Blue team wins!'}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="endingInformation"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                </Region>
                {(visibleLoadingContainer ?? false) && (
                    <Region
                        name="loadingContainer"
                        layout={{ position: 'absolute', left: 337, width: 208, top: 167, height: 235, justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLoadingTextStroke ?? t('snowwar.waiting_players')}
                            textOptions={{ fill: strokeTextColor ?? '#1077ac', align: 'center' }}
                            name="loadingText_stroke"
                            layout={{ position: 'absolute', width: 208, top: 0, height: 23 }}
                        />
                        <ThemeText
                            text={captionLoadingText ?? t('snowwar.waiting_players')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                            name="loadingText"
                            layout={{ position: 'absolute', width: 208, top: 0, height: 23 }}
                        />
                        <ThemeImage
                            name="arenaPreview"
                            src={srcArenaPreview}
                            tint={tintArenaPreview}
                            layout={{ position: 'absolute', left: 0, width: 208, top: 35, height: 100 }}
                        />
                        <ThemeText
                            text={captionArenaName ?? ''}
                            textOptions={{ fill: '#1077ac' }}
                            name="arenaName"
                            layout={{ position: 'absolute', width: 4, top: 140, height: 4 }}
                        />
                        <ThemeImage
                            name="mainLoadingIcon"
                            src={srcMainLoadingIcon}
                            tint={tintMainLoadingIcon}
                            layout={{ position: 'absolute', width: 50, top: 180, height: 50 }}
                        />
                    </Region>
                )}
            </Region>
        </Region>
    );
};
