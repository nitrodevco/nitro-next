import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `334_games_main_xml` (layout "games_main", 413x530) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GamesMainLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    quickPlayContainer?: GamesMainLayoutQuickPlayContainerProps;
    snowwarLobbyCont?: GamesMainLayoutSnowwarLobbyContProps;
    srcQuickPlayBackground?: string;
}

export const GamesMainLayout = ({ layout, onClose, quickPlayContainer, snowwarLobbyCont, srcQuickPlayBackground }: GamesMainLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('games.main.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 413, height: 530, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ThemeImage
                    name="quick_play_background"
                    src={srcQuickPlayBackground ?? layoutImage('quick_play_background.png')}
                    layout={{ position: 'absolute', left: 0, width: 407, top: 0, height: 355 }}
                />
                <GamesMainLayoutQuickPlayContainer {...quickPlayContainer} />
                <GamesMainLayoutSnowwarLobbyCont {...snowwarLobbyCont} />
            </Region>
        </Frame>
    );
};

/** Named region `header_text_container` of GamesMainLayout - configured through the parent's `headerTextContainer` prop. */
export interface GamesMainLayoutHeaderTextContainerProps {
    captionHeader?: string;
    captionHeader2?: string;
    captionHeaderStroke?: string;
    layout?: BoxLayout;
}

export const GamesMainLayoutHeaderTextContainer = ({ captionHeader, captionHeader2, captionHeaderStroke, layout }: GamesMainLayoutHeaderTextContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header_text_container"
            layout={{ position: 'absolute', left: 70, width: 279, top: 107, height: 165, ...layout }}
        >
            <Region
                name="header_stroke"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 139, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionHeaderStroke ?? t('snowwar.descriptionHeader')}
                    textOptions={{ fill: '#1077ac', align: 'center' }}
                />
            </Region>
            <Region
                name="header"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 139, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionHeader ?? t('snowwar.descriptionHeader')}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
            <Region
                name="header"
                layout={{ position: 'absolute', left: 18, right: 18, top: 30, bottom: 117, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionHeader2 ?? t('snowwar.descriptionBody')}
                    textOptions={{ fill: '#1077ac', wordWrap: true, wordWrapWidth: 243, align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `teaser_container` of GamesMainLayout - configured through the parent's `teaserContainer` prop. */
export interface GamesMainLayoutTeaserContainerProps {
    captionInstructionsLink?: string;
    captionLeaderboardLink?: string;
    headerTextContainer?: GamesMainLayoutHeaderTextContainerProps;
    layout?: BoxLayout;
    onInstructionsLink?: () => void;
    onLeaderboardLink?: () => void;
    srcQuickPlayTeaser?: string;
}

export const GamesMainLayoutTeaserContainer = ({ captionInstructionsLink, captionLeaderboardLink, headerTextContainer, layout, onInstructionsLink, onLeaderboardLink, srcQuickPlayTeaser }: GamesMainLayoutTeaserContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="teaser_container"
            layout={{ position: 'absolute', left: 0, width: 407, top: 0, height: 436, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="quick_play_teaser"
                src={srcQuickPlayTeaser ?? layoutImage('quick_play_teaser.png')}
                layout={{ position: 'absolute', left: 0, width: 407, top: 160, height: 130 }}
            />
            <GamesMainLayoutHeaderTextContainer {...headerTextContainer} />
            <Region
                name="instructions_link"
                layout={{ position: 'absolute', width: 407, top: 280, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                onPointerTap={onInstructionsLink}
                cursor="pointer"
            >
                <ThemeText
                    text={captionInstructionsLink ?? t('snowwar.instructions.link')}
                    textOptions={{ fill: '#1077ac', align: 'center' }}
                />
            </Region>
            <Region
                name="leaderboard_link"
                layout={{ position: 'absolute', width: 407, top: 315, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                onPointerTap={onLeaderboardLink}
                cursor="pointer"
            >
                <ThemeText
                    text={captionLeaderboardLink ?? t('snowwar.leaderboards.link')}
                    textOptions={{ fill: '#1077ac', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `instructions_prev` of GamesMainLayout - configured through the parent's `instructionsPrev` prop. */
export interface GamesMainLayoutInstructionsPrevProps {
    layout?: BoxLayout;
    onInstructionsPrev?: () => void;
}

export const GamesMainLayoutInstructionsPrev = ({ layout, onInstructionsPrev }: GamesMainLayoutInstructionsPrevProps) => {
    return (
        <Region
            name="instructions_prev"
            onPointerTap={onInstructionsPrev}
            cursor="pointer"
            layout={{ position: 'absolute', left: 10, width: 50, top: 140, height: 50, ...layout }}
        >
            <ThemeImage
                src={layoutImage('scroll_left.png')}
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
            />
        </Region>
    );
};

/** Named region `instructions_next` of GamesMainLayout - configured through the parent's `instructionsNext` prop. */
export interface GamesMainLayoutInstructionsNextProps {
    layout?: BoxLayout;
    onInstructionsNext?: () => void;
}

export const GamesMainLayoutInstructionsNext = ({ layout, onInstructionsNext }: GamesMainLayoutInstructionsNextProps) => {
    return (
        <Region
            name="instructions_next"
            onPointerTap={onInstructionsNext}
            cursor="pointer"
            layout={{ position: 'absolute', left: 345, width: 50, top: 140, height: 50, ...layout }}
        >
            <ThemeImage
                src={layoutImage('scroll_right.png')}
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
            />
        </Region>
    );
};

/** Row template `page_0` of GamesMainLayout - pass real rows through its `items…` slot. */
export interface GamesMainLayoutPage0ItemProps {
    layout?: BoxLayout;
    onPage0?: () => void;
}

export const GamesMainLayoutPage0Item = ({ layout, onPage0 }: GamesMainLayoutPage0ItemProps) => {
    return (
        <Region
            name="page_0"
            onPointerTap={onPage0}
            cursor="pointer"
            layout={{ width: 25, height: 25, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={undefined}
                layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 25 }}
            />
        </Region>
    );
};

/** Row template `page_1` of GamesMainLayout - pass real rows through its `items…` slot. */
export interface GamesMainLayoutPage1ItemProps {
    layout?: BoxLayout;
    onPage1?: () => void;
}

export const GamesMainLayoutPage1Item = ({ layout, onPage1 }: GamesMainLayoutPage1ItemProps) => {
    return (
        <Region
            name="page_1"
            onPointerTap={onPage1}
            cursor="pointer"
            layout={{ width: 25, height: 25, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={undefined}
                layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 25 }}
            />
        </Region>
    );
};

/** Row template `page_2` of GamesMainLayout - pass real rows through its `items…` slot. */
export interface GamesMainLayoutPage2ItemProps {
    layout?: BoxLayout;
    onPage2?: () => void;
}

export const GamesMainLayoutPage2Item = ({ layout, onPage2 }: GamesMainLayoutPage2ItemProps) => {
    return (
        <Region
            name="page_2"
            onPointerTap={onPage2}
            cursor="pointer"
            layout={{ width: 25, height: 25, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={undefined}
                layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 25 }}
            />
        </Region>
    );
};

/** Row template `page_3` of GamesMainLayout - pass real rows through its `items…` slot. */
export interface GamesMainLayoutPage3ItemProps {
    layout?: BoxLayout;
    onPage3?: () => void;
}

export const GamesMainLayoutPage3Item = ({ layout, onPage3 }: GamesMainLayoutPage3ItemProps) => {
    return (
        <Region
            name="page_3"
            onPointerTap={onPage3}
            cursor="pointer"
            layout={{ width: 25, height: 25, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={undefined}
                layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 25 }}
            />
        </Region>
    );
};

/** Row template `page_4` of GamesMainLayout - pass real rows through its `items…` slot. */
export interface GamesMainLayoutPage4ItemProps {
    layout?: BoxLayout;
    onPage4?: () => void;
}

export const GamesMainLayoutPage4Item = ({ layout, onPage4 }: GamesMainLayoutPage4ItemProps) => {
    return (
        <Region
            name="page_4"
            onPointerTap={onPage4}
            cursor="pointer"
            layout={{ width: 25, height: 25, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={undefined}
                layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 25 }}
            />
        </Region>
    );
};

/** Named region `page_list` of GamesMainLayout - configured through the parent's `pageList` prop. */
export interface GamesMainLayoutPageListProps {
    itemsPageList?: ReactNode;
    layout?: BoxLayout;
}

export const GamesMainLayoutPageList = ({ itemsPageList, layout }: GamesMainLayoutPageListProps) => {
    return (
        <Region
            name="page_list"
            layout={{ position: 'absolute', width: 125, top: 239, height: 25, flexDirection: 'row', ...layout }}
        >
            {itemsPageList ?? (
                <>
                    <GamesMainLayoutPage0Item />
                    <GamesMainLayoutPage1Item />
                    <GamesMainLayoutPage2Item />
                    <GamesMainLayoutPage3Item />
                    <GamesMainLayoutPage4Item />
                </>
            )}
        </Region>
    );
};

/** Named region `instructions_container` of GamesMainLayout - configured through the parent's `instructionsContainer` prop. */
export interface GamesMainLayoutInstructionsContainerProps {
    captionInstructionsBack?: string;
    captionInstructionText?: string;
    instructionsNext?: GamesMainLayoutInstructionsNextProps;
    instructionsPrev?: GamesMainLayoutInstructionsPrevProps;
    layout?: BoxLayout;
    onInstructionsBack?: () => void;
    pageList?: GamesMainLayoutPageListProps;
    srcInstructionsImage?: string;
    visibleInstructionsContainer?: boolean;
}

export const GamesMainLayoutInstructionsContainer = ({ captionInstructionsBack, captionInstructionText, instructionsNext, instructionsPrev, layout, onInstructionsBack, pageList, srcInstructionsImage, visibleInstructionsContainer }: GamesMainLayoutInstructionsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="instructions_container"
            visible={visibleInstructionsContainer ?? false}
            layout={{ position: 'absolute', left: 0, width: 407, top: 0, height: 436, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="instructions_image"
                src={srcInstructionsImage}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 250, top: 80, height: 166 }}
            />
            <Region
                name="instructions_back"
                layout={{ position: 'absolute', left: 18, width: 160, top: 324, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                onPointerTap={onInstructionsBack}
                cursor="pointer"
            >
                <ThemeText
                    text={captionInstructionsBack ?? t('snowwar.instructions.back')}
                    textOptions={{ fill: '#1077ac' }}
                />
            </Region>
            <GamesMainLayoutInstructionsPrev {...instructionsPrev} />
            <GamesMainLayoutInstructionsNext {...instructionsNext} />
            <Region
                name="instruction_text"
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 280, top: 269, height: 21, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionInstructionText ?? 'lorem ipsum'}
                    textOptions={{ fill: '#1077ac', wordWrap: true, wordWrapWidth: 280, align: 'center' }}
                />
            </Region>
            <GamesMainLayoutPageList {...pageList} />
        </Region>
    );
};

/** Named region `games_left_region` of GamesMainLayout - configured through the parent's `gamesLeftRegion` prop. */
export interface GamesMainLayoutGamesLeftRegionProps {
    captionGamesLeft?: string;
    captionGamesLeftStroke?: string;
    captionGamesLobbyGetGames?: string;
    layout?: BoxLayout;
    onGamesLeftRegion?: () => void;
    srcBtnMoreGames10?: string;
    srcBtnMoreGames100?: string;
    srcBtnMoreGames300?: string;
}

export const GamesMainLayoutGamesLeftRegion = ({ captionGamesLeft, captionGamesLeftStroke, captionGamesLobbyGetGames, layout, onGamesLeftRegion, srcBtnMoreGames10, srcBtnMoreGames100, srcBtnMoreGames300 }: GamesMainLayoutGamesLeftRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="games_left_region"
            onPointerTap={onGamesLeftRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 11, width: 229, top: 0, height: 121, ...layout }}
        >
            <Region
                backgroundColor="#b9e2ec"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 28, flexDirection: 'row', gap: 5 }}
            >
                <Region layout={{ width: 135, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText text={t('snowwar.games_left')} />
                </Region>
                <Region layout={{ width: 60, height: 30, flexShrink: 0 }}>
                    <Region
                        name="games_left_stroke"
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionGamesLeftStroke ?? '0'}
                            textOptions={{ fill: '#1077ac' }}
                        />
                    </Region>
                    <Region
                        name="games_left"
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionGamesLeft ?? '0'}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
            </Region>
            <Region
                name="games.lobby.get.games"
                layout={{ position: 'absolute', left: 0, width: 175, top: 31, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionGamesLobbyGetGames ?? t('snowwar.buy_more_games')} />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 220, top: 52, height: 70, flexDirection: 'row', gap: 8 }}>
                <ThemeImage
                    name="btn_more_games_10"
                    src={srcBtnMoreGames10 ?? layoutImage('btn_more_games_10.png')}
                    layout={{ width: 52, height: 62, flexShrink: 0 }}
                />
                <ThemeImage
                    name="btn_more_games_100"
                    src={srcBtnMoreGames100 ?? layoutImage('btn_more_games_100.png')}
                    layout={{ width: 52, height: 62, flexShrink: 0 }}
                />
                <ThemeImage
                    name="btn_more_games_300"
                    src={srcBtnMoreGames300 ?? layoutImage('btn_more_games_300.png')}
                    layout={{ width: 52, height: 62, flexShrink: 0 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `games_vip_region` of GamesMainLayout - configured through the parent's `gamesVipRegion` prop. */
export interface GamesMainLayoutGamesVipRegionProps {
    captionGamesLobbyGetVip?: string;
    layout?: BoxLayout;
    onGamesVipRegion?: () => void;
    srcHcIcon?: string;
}

export const GamesMainLayoutGamesVipRegion = ({ captionGamesLobbyGetVip, layout, onGamesVipRegion, srcHcIcon }: GamesMainLayoutGamesVipRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="games_vip_region"
            onPointerTap={onGamesVipRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 202, width: 187, top: -2, height: 44, maxWidth: 200, ...layout }}
        >
            <ThemeImage
                name="hc_icon"
                src={srcHcIcon ?? layoutImage('hc_icon.png')}
                layout={{ position: 'absolute', left: 0, width: 24, top: 6, height: 24 }}
            />
            <Region
                name="games.lobby.get.vip"
                layout={{ position: 'absolute', left: 31, width: 158, top: 2, height: 35, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionGamesLobbyGetVip ?? t('snowwar.get_more_games')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 158 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `footer_container` of GamesMainLayout - configured through the parent's `footerContainer` prop. */
export interface GamesMainLayoutFooterContainerProps {
    captionPlayText?: string;
    gamesLeftRegion?: GamesMainLayoutGamesLeftRegionProps;
    gamesVipRegion?: GamesMainLayoutGamesVipRegionProps;
    layout?: BoxLayout;
    onPlayButton?: () => void;
}

export const GamesMainLayoutFooterContainer = ({ captionPlayText, gamesLeftRegion, gamesVipRegion, layout, onPlayButton }: GamesMainLayoutFooterContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="footer_container"
            layout={{ position: 'absolute', left: 0, width: 407, top: 364, height: 124, ...layout }}
        >
            <GamesMainLayoutGamesLeftRegion {...gamesLeftRegion} />
            <GamesMainLayoutGamesVipRegion {...gamesVipRegion} />
            <ContainerButton
                variant="3"
                name="play.button"
                tintColor="#55cc00"
                onPointerTap={onPlayButton}
                layout={{ position: 'absolute', right: 13, width: 190, top: 64, height: 50, justifyContent: 'center' }}
            >
                <Region
                    name="play_text"
                    layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, top: 10, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayText ?? t('snowwar.play')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Named region `quick_play_container` of GamesMainLayout - configured through the parent's `quickPlayContainer` prop. */
export interface GamesMainLayoutQuickPlayContainerProps {
    footerContainer?: GamesMainLayoutFooterContainerProps;
    instructionsContainer?: GamesMainLayoutInstructionsContainerProps;
    layout?: BoxLayout;
    teaserContainer?: GamesMainLayoutTeaserContainerProps;
}

export const GamesMainLayoutQuickPlayContainer = ({ footerContainer, instructionsContainer, layout, teaserContainer }: GamesMainLayoutQuickPlayContainerProps) => {
    return (
        <Region
            name="quick_play_container"
            layout={{ position: 'absolute', left: 0, right: 6, top: 0, height: 485, ...layout }}
        >
            <GamesMainLayoutTeaserContainer {...teaserContainer} />
            <GamesMainLayoutInstructionsContainer {...instructionsContainer} />
            <GamesMainLayoutFooterContainer {...footerContainer} />
        </Region>
    );
};

/** Named region `players_grid` of GamesMainLayout - configured through the parent's `playersGrid` prop. */
export interface GamesMainLayoutPlayersGridProps {
    layout?: BoxLayout;
}

export const GamesMainLayoutPlayersGrid = ({ layout }: GamesMainLayoutPlayersGridProps) => {
    return (
        <Region
            name="players_grid"
            layout={{ position: 'absolute', left: 40, width: 335, top: 178, height: 130, flexDirection: 'row', flexWrap: 'wrap', gap: 3, ...layout }}
        />
    );
};

/** Named region `cancel_link_region` of GamesMainLayout - configured through the parent's `cancelLinkRegion` prop. */
export interface GamesMainLayoutCancelLinkRegionProps {
    captionCancelLink?: string;
    layout?: BoxLayout;
    onCancelLinkRegion?: () => void;
}

export const GamesMainLayoutCancelLinkRegion = ({ captionCancelLink, layout, onCancelLinkRegion }: GamesMainLayoutCancelLinkRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cancel_link_region"
            onPointerTap={onCancelLinkRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 178, width: 63, top: 385, height: 23, ...layout }}
        >
            <Region
                name="cancel_link"
                layout={{ position: 'absolute', left: 0, width: 83, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionCancelLink ?? t('generic.cancel')} />
            </Region>
        </Region>
    );
};

/** Named region `snowwar_lobby_cont` of GamesMainLayout - configured through the parent's `snowwarLobbyCont` prop. */
export interface GamesMainLayoutSnowwarLobbyContProps {
    cancelLinkRegion?: GamesMainLayoutCancelLinkRegionProps;
    captionWaitText?: string;
    captionWaitTextStroke?: string;
    layout?: BoxLayout;
    playersGrid?: GamesMainLayoutPlayersGridProps;
    visibleSnowwarLobbyCont?: boolean;
}

export const GamesMainLayoutSnowwarLobbyCont = ({ cancelLinkRegion, captionWaitText, captionWaitTextStroke, layout, playersGrid, visibleSnowwarLobbyCont }: GamesMainLayoutSnowwarLobbyContProps) => {
    return (
        <Region
            name="snowwar_lobby_cont"
            visible={visibleSnowwarLobbyCont ?? false}
            layout={{ position: 'absolute', left: 0, right: 6, top: 0, height: 436, ...layout }}
        >
            <Region
                name="wait_text_stroke"
                layout={{ position: 'absolute', left: 40, width: 335, top: 118, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionWaitTextStroke ?? 'Waiting for players...'}
                    textOptions={{ fill: '#1077ac', align: 'center' }}
                />
            </Region>
            <Region
                name="wait_text"
                layout={{ position: 'absolute', left: 40, width: 335, top: 118, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionWaitText ?? 'Waiting for players...'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
            <GamesMainLayoutPlayersGrid {...playersGrid} />
            <GamesMainLayoutCancelLinkRegion {...cancelLinkRegion} />
        </Region>
    );
};
