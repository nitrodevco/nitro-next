import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `420_snowwar_ending_xml` (layout "snowwar_ending", 882x510) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarEndingLayoutProps {
    buttonsContainer?: SnowwarEndingLayoutButtonsContainerProps;
    headerContainer?: SnowwarEndingLayoutHeaderContainerProps;
    layout?: BoxLayout;
    leaveLinkRegion?: SnowwarEndingLayoutLeaveLinkRegionProps;
    loadingContainer?: SnowwarEndingLayoutLoadingContainerProps;
    mostHitsContainer?: SnowwarEndingLayoutMostHitsContainerProps;
    mostKillsContainer?: SnowwarEndingLayoutMostKillsContainerProps;
    srcSnowwarLogo?: string;
    statusContainer?: SnowwarEndingLayoutStatusContainerProps;
    team1PlayersList?: SnowwarEndingLayoutTeam1PlayersListProps;
    team1ScoreContainer?: SnowwarEndingLayoutTeam1ScoreContainerProps;
    team2PlayersList?: SnowwarEndingLayoutTeam2PlayersListProps;
    team2ScoreContainer?: SnowwarEndingLayoutTeam2ScoreContainerProps;
}

export const SnowwarEndingLayout = ({ buttonsContainer, headerContainer, layout, leaveLinkRegion, loadingContainer, mostHitsContainer, mostKillsContainer, srcSnowwarLogo, statusContainer, team1PlayersList, team1ScoreContainer, team2PlayersList, team2ScoreContainer }: SnowwarEndingLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 882, height: 510, ...layout }}>
            <Region
                params={192}
                backgroundColor="#eeeeff"
                layout={{ position: 'absolute', marginLeft: -25, marginRight: 25, width: 882, top: 0, height: 510, minWidth: 455, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="snowwar_logo"
                    tags={[ 'bitmap' ]}
                    params={208}
                    src={srcSnowwarLogo ?? layoutImage('snowstorm_logo.png')}
                    layout={{ position: 'absolute', width: 308, top: 0, height: 83 }}
                />
                <SnowwarEndingLayoutTeam1PlayersList {...team1PlayersList} />
                <SnowwarEndingLayoutTeam2PlayersList {...team2PlayersList} />
                <SnowwarEndingLayoutStatusContainer {...statusContainer} />
                <SnowwarEndingLayoutButtonsContainer {...buttonsContainer} />
                <SnowwarEndingLayoutLeaveLinkRegion {...leaveLinkRegion} />
                <SnowwarEndingLayoutMostKillsContainer {...mostKillsContainer} />
                <SnowwarEndingLayoutMostHitsContainer {...mostHitsContainer} />
                <SnowwarEndingLayoutTeam1ScoreContainer {...team1ScoreContainer} />
                <SnowwarEndingLayoutTeam2ScoreContainer {...team2ScoreContainer} />
                <SnowwarEndingLayoutHeaderContainer {...headerContainer} />
                <SnowwarEndingLayoutLoadingContainer {...loadingContainer} />
            </Region>
        </Region>
    );
};

/** Named region `team1PlayersList` of SnowwarEndingLayout - configured through the parent's `team1PlayersList` prop. */
export interface SnowwarEndingLayoutTeam1PlayersListProps {
    layout?: BoxLayout;
}

export const SnowwarEndingLayoutTeam1PlayersList = ({ layout }: SnowwarEndingLayoutTeam1PlayersListProps) => {
    return (
        <Region
            name="team1PlayersList"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 289, top: 115, height: 318, flexDirection: 'column', gap: 2, ...layout }}
        />
    );
};

/** Named region `team2PlayersList` of SnowwarEndingLayout - configured through the parent's `team2PlayersList` prop. */
export interface SnowwarEndingLayoutTeam2PlayersListProps {
    layout?: BoxLayout;
}

export const SnowwarEndingLayoutTeam2PlayersList = ({ layout }: SnowwarEndingLayoutTeam2PlayersListProps) => {
    return (
        <Region
            name="team2PlayersList"
            params={80}
            layout={{ position: 'absolute', right: 0, width: 289, top: 115, height: 318, flexDirection: 'column', gap: 2, ...layout }}
        />
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
}

export const SnowwarEndingLayoutStatusContainer = ({ captionGamesLeft, captionGamesLeftStroke, captionStatusTextGetMoreGames, captionStatusTextGetVip, layout, onStatusContainer }: SnowwarEndingLayoutStatusContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="statusContainer"
            params={17}
            onPointerTap={onStatusContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 293, width: 297, top: 321, height: 61, justifyContent: 'center', ...layout }}
        >
            <Region
                params={147664}
                layout={{ position: 'absolute', top: 0, flexDirection: 'row', gap: 5 }}
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
                            text={captionGamesLeftStroke ?? '3'}
                            textOptions={{ fill: '#1077ac' }}
                        />
                    </Region>
                    <Region
                        name="games_left"
                        params={16}
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
                params={786448}
                layout={{ position: 'absolute', width: 297, top: 27, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionStatusTextGetVip ?? t('snowwar.get_more_games')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <Region
                name="status.text_get_more_games"
                params={786448}
                visible={false}
                layout={{ position: 'absolute', width: 297, top: 27, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionStatusTextGetMoreGames ?? t('snowwar.buy_x_games')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `buttonsContainer` of SnowwarEndingLayout - configured through the parent's `buttonsContainer` prop. */
export interface SnowwarEndingLayoutButtonsContainerProps {
    layout?: BoxLayout;
    onButtonBuyGames?: () => void;
    onButtonPlayAgain?: () => void;
    onButtonRematch?: () => void;
    visibleButtonBuyGames?: boolean;
    visibleButtonPlayAgain?: boolean;
    visibleButtonsContainer?: boolean;
}

export const SnowwarEndingLayoutButtonsContainer = ({ layout, onButtonBuyGames, onButtonPlayAgain, onButtonRematch, visibleButtonBuyGames, visibleButtonPlayAgain, visibleButtonsContainer }: SnowwarEndingLayoutButtonsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="buttonsContainer"
            params={208}
            visible={visibleButtonsContainer ?? false}
            layout={{ position: 'absolute', width: 180, top: 430, height: 50, justifyContent: 'center', ...layout }}
        >
            <Region
                visible={visibleButtonPlayAgain ?? false}
                layout={{ position: 'absolute', width: 180, top: 0, height: 50, minWidth: 180, minHeight: 50 }}
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
                layout={{ position: 'absolute', width: 180, top: 0, height: 50, minWidth: 180, minHeight: 50 }}
            >
                Rematch
            </ButtonThick>
            <Region
                visible={visibleButtonBuyGames ?? false}
                layout={{ position: 'absolute', width: 180, top: 0, height: 50, minWidth: 180, minHeight: 50 }}
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
    );
};

/** Named region `leave_link_region` of SnowwarEndingLayout - configured through the parent's `leaveLinkRegion` prop. */
export interface SnowwarEndingLayoutLeaveLinkRegionProps {
    captionLeaveLink?: string;
    layout?: BoxLayout;
    onLeaveLinkRegion?: () => void;
}

export const SnowwarEndingLayoutLeaveLinkRegion = ({ captionLeaveLink, layout, onLeaveLinkRegion }: SnowwarEndingLayoutLeaveLinkRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="leave_link_region"
            params={934097}
            onPointerTap={onLeaveLinkRegion}
            cursor="pointer"
            layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 127, top: 405, height: 17, ...layout }}
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
                layout={{ position: 'absolute', left: 5, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionLeaveLink ?? t('snowwar.leave_game')}
                    textStyle="text-style-u-bold"
                />
            </Region>
        </Region>
    );
};

/** Named region `mostKillsContainer` of SnowwarEndingLayout - configured through the parent's `mostKillsContainer` prop. */
export interface SnowwarEndingLayoutMostKillsContainerProps {
    captionMostKillsLabel?: string;
    captionMostKillsLabelStroke?: string;
    captionPlayerName?: string;
    layout?: BoxLayout;
    srcBackgroundImage?: string;
    srcPlayerImage?: string;
}

export const SnowwarEndingLayoutMostKillsContainer = ({ captionMostKillsLabel, captionMostKillsLabelStroke, captionPlayerName, layout, srcBackgroundImage, srcPlayerImage }: SnowwarEndingLayoutMostKillsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="mostKillsContainer"
            params={16}
            layout={{ position: 'absolute', left: 300, width: 130, top: 180, height: 117, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="backgroundImage"
                tags={[ 'bitmap' ]}
                params={208}
                src={srcBackgroundImage ?? layoutImage('blue_square.png')}
                layout={{ position: 'absolute', width: 70, top: 26, height: 70 }}
            />
            <Region
                name="mostKillsLabel_stroke"
                tags={[ 'stroke' ]}
                params={208}
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 115, top: 2, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionMostKillsLabelStroke ?? t('snowwar.most_kills')}
                    textStyle="text-style-u-bold"
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <Region
                name="mostKillsLabel"
                params={208}
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
                tags={[ 'stroke' ]}
                params={786640}
                layout={{ position: 'absolute', width: 130, top: 92, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionPlayerName ?? 'yyyy yyyyyy'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
            <ThemeImage
                name="playerImage"
                tags={[ 'bitmap' ]}
                params={208}
                src={srcPlayerImage}
                layout={{ position: 'absolute', width: 70, top: 26, height: 70 }}
            />
        </Region>
    );
};

/** Named region `mostHitsContainer` of SnowwarEndingLayout - configured through the parent's `mostHitsContainer` prop. */
export interface SnowwarEndingLayoutMostHitsContainerProps {
    captionMostHitsLabel?: string;
    captionMostHitsLabelStroke?: string;
    captionPlayerName?: string;
    layout?: BoxLayout;
    srcBackgroundImage?: string;
    srcPlayerImage?: string;
}

export const SnowwarEndingLayoutMostHitsContainer = ({ captionMostHitsLabel, captionMostHitsLabelStroke, captionPlayerName, layout, srcBackgroundImage, srcPlayerImage }: SnowwarEndingLayoutMostHitsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="mostHitsContainer"
            params={16}
            layout={{ position: 'absolute', left: 450, width: 130, top: 180, height: 117, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="backgroundImage"
                tags={[ 'bitmap' ]}
                params={208}
                src={srcBackgroundImage ?? layoutImage('red_square.png')}
                layout={{ position: 'absolute', width: 70, top: 26, height: 70 }}
            />
            <Region
                name="mostHitsLabel_stroke"
                tags={[ 'stroke' ]}
                params={208}
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 115, top: 2, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionMostHitsLabelStroke ?? t('snowwar.most_hits')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <Region
                name="mostHitsLabel"
                params={208}
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 115, top: 2, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionMostHitsLabel ?? t('snowwar.most_hits')}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
            <Region
                name="playerName"
                tags={[ 'stroke' ]}
                params={786640}
                layout={{ position: 'absolute', width: 130, top: 92, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionPlayerName ?? 'xxxxx xxxxx'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
            <ThemeImage
                name="playerImage"
                params={208}
                src={srcPlayerImage}
                layout={{ position: 'absolute', width: 70, top: 26, height: 70 }}
            />
        </Region>
    );
};

/** Named region `team1ScoreContainer` of SnowwarEndingLayout - configured through the parent's `team1ScoreContainer` prop. */
export interface SnowwarEndingLayoutTeam1ScoreContainerProps {
    captionTeam1Score?: string;
    captionTeam1ScoreStroke?: string;
    layout?: BoxLayout;
    srcTeam1ScoreBackground?: string;
}

export const SnowwarEndingLayoutTeam1ScoreContainer = ({ captionTeam1Score, captionTeam1ScoreStroke, layout, srcTeam1ScoreBackground }: SnowwarEndingLayoutTeam1ScoreContainerProps) => {
    return (
        <Region
            name="team1ScoreContainer"
            params={16}
            layout={{ position: 'absolute', left: 203, width: 80, top: 10, height: 101, ...layout }}
        >
            <ThemeImage
                name="team1ScoreBackground"
                tags={[ 'bitmap' ]}
                params={16}
                src={srcTeam1ScoreBackground ?? layoutImage('blue_glove.png')}
                layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 101 }}
            />
            <Region
                name="team1Score_stroke"
                tags={[ 'stroke' ]}
                params={16}
                layout={{ position: 'absolute', left: 13, width: 49, top: 41, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionTeam1ScoreStroke ?? '245'}
                    textOptions={{ fill: '#1077ac', align: 'center' }}
                />
            </Region>
            <Region
                name="team1Score"
                params={16}
                layout={{ position: 'absolute', left: 13, width: 49, top: 41, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionTeam1Score ?? '245'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `team2ScoreContainer` of SnowwarEndingLayout - configured through the parent's `team2ScoreContainer` prop. */
export interface SnowwarEndingLayoutTeam2ScoreContainerProps {
    captionTeam2Score?: string;
    captionTeam2ScoreStroke?: string;
    layout?: BoxLayout;
    srcTeam2ScoreBackground?: string;
}

export const SnowwarEndingLayoutTeam2ScoreContainer = ({ captionTeam2Score, captionTeam2ScoreStroke, layout, srcTeam2ScoreBackground }: SnowwarEndingLayoutTeam2ScoreContainerProps) => {
    return (
        <Region
            name="team2ScoreContainer"
            params={16}
            layout={{ position: 'absolute', left: 598, width: 80, top: 10, height: 101, ...layout }}
        >
            <ThemeImage
                name="team2ScoreBackground"
                tags={[ 'bitmap' ]}
                params={16}
                src={srcTeam2ScoreBackground ?? layoutImage('red_glove.png')}
                layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 101 }}
            />
            <Region
                name="team2Score_stroke"
                tags={[ 'stroke' ]}
                params={16}
                layout={{ position: 'absolute', left: 20, width: 49, top: 41, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionTeam2ScoreStroke ?? '245'}
                    textOptions={{ fill: '#fd6859', align: 'center' }}
                />
            </Region>
            <Region
                name="team2Score"
                params={16}
                layout={{ position: 'absolute', left: 20, width: 49, top: 41, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionTeam2Score ?? '245'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `headerContainer` of SnowwarEndingLayout - configured through the parent's `headerContainer` prop. */
export interface SnowwarEndingLayoutHeaderContainerProps {
    captionEndingInformation?: string;
    captionEndingInformationStroke?: string;
    layout?: BoxLayout;
}

export const SnowwarEndingLayoutHeaderContainer = ({ captionEndingInformation, captionEndingInformationStroke, layout }: SnowwarEndingLayoutHeaderContainerProps) => {
    return (
        <Region
            name="headerContainer"
            params={208}
            layout={{ position: 'absolute', width: 450, top: 118, height: 35, ...layout }}
        >
            <Region
                name="endingInformation_stroke"
                tags={[ 'stroke' ]}
                params={16}
                layout={{ position: 'absolute', left: 0, width: 450, top: 0, height: 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionEndingInformationStroke ?? 'Blue team wins!'}
                    textOptions={{ fill: '#1077ac', align: 'center' }}
                />
            </Region>
            <Region
                name="endingInformation"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 450, top: 0, height: 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionEndingInformation ?? 'Blue team wins!'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `loadingContainer` of SnowwarEndingLayout - configured through the parent's `loadingContainer` prop. */
export interface SnowwarEndingLayoutLoadingContainerProps {
    captionArenaName?: string;
    captionLoadingText?: string;
    captionLoadingTextStroke?: string;
    layout?: BoxLayout;
    srcArenaPreview?: string;
    srcMainLoadingIcon?: string;
    visibleLoadingContainer?: boolean;
}

export const SnowwarEndingLayoutLoadingContainer = ({ captionArenaName, captionLoadingText, captionLoadingTextStroke, layout, srcArenaPreview, srcMainLoadingIcon, visibleLoadingContainer }: SnowwarEndingLayoutLoadingContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="loadingContainer"
            params={16}
            visible={visibleLoadingContainer ?? false}
            layout={{ position: 'absolute', left: 337, width: 208, top: 167, height: 235, justifyContent: 'center', ...layout }}
        >
            <Region
                name="loadingText_stroke"
                tags={[ 'stroke' ]}
                params={208}
                layout={{ position: 'absolute', width: 208, top: 0, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionLoadingTextStroke ?? t('snowwar.waiting_players')}
                    textOptions={{ fill: '#1077ac', align: 'center' }}
                />
            </Region>
            <Region
                name="loadingText"
                params={208}
                layout={{ position: 'absolute', width: 208, top: 0, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionLoadingText ?? t('snowwar.waiting_players')}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
            <ThemeImage
                name="arenaPreview"
                tags={[ 'bitmap' ]}
                src={srcArenaPreview}
                layout={{ position: 'absolute', left: 0, width: 208, top: 35, height: 100 }}
            />
            <Region
                name="arenaName"
                params={208}
                layout={{ position: 'absolute', width: 4, top: 140, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionArenaName ?? ''}
                    textOptions={{ fill: '#1077ac' }}
                />
            </Region>
            <ThemeImage
                name="mainLoadingIcon"
                tags={[ 'bitmap' ]}
                params={208}
                src={srcMainLoadingIcon}
                layout={{ position: 'absolute', width: 50, top: 180, height: 50 }}
            />
        </Region>
    );
};
