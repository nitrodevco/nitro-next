import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `334_games_main_xml` (layout "games_main", 413x530) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GamesMainLayoutProps {
    captionCancelLink?: string;
    captionGamesLeft?: string;
    captionGamesLeftStroke?: string;
    captionGamesLobbyGetGames?: string;
    captionGamesLobbyGetVip?: string;
    captionHeader?: string;
    captionHeader2?: string;
    captionHeaderStroke?: string;
    captionInstructionsBack?: string;
    captionInstructionsLink?: string;
    captionInstructionText?: string;
    captionLeaderboardLink?: string;
    captionPlayText?: string;
    captionWaitText?: string;
    captionWaitTextStroke?: string;
    itemsPageList?: ReactNode;
    layout?: BoxLayout;
    onCancelLinkRegion?: () => void;
    onClose?: () => void;
    onGamesLeftRegion?: () => void;
    onGamesVipRegion?: () => void;
    onInstructionsBack?: () => void;
    onInstructionsLink?: () => void;
    onInstructionsNext?: () => void;
    onInstructionsPrev?: () => void;
    onLeaderboardLink?: () => void;
    onPlayButton?: () => void;
    srcBtnMoreGames10?: string;
    srcBtnMoreGames100?: string;
    srcBtnMoreGames300?: string;
    srcHcIcon?: string;
    srcInstructionsImage?: string;
    srcQuickPlayBackground?: string;
    srcQuickPlayTeaser?: string;
    visibleInstructionsContainer?: boolean;
    visibleSnowwarLobbyCont?: boolean;
}

export const GamesMainLayout = ({ captionCancelLink, captionGamesLeft, captionGamesLeftStroke, captionGamesLobbyGetGames, captionGamesLobbyGetVip, captionHeader, captionHeader2, captionHeaderStroke, captionInstructionsBack, captionInstructionsLink, captionInstructionText, captionLeaderboardLink, captionPlayText, captionWaitText, captionWaitTextStroke, itemsPageList, layout, onCancelLinkRegion, onClose, onGamesLeftRegion, onGamesVipRegion, onInstructionsBack, onInstructionsLink, onInstructionsNext, onInstructionsPrev, onLeaderboardLink, onPlayButton, srcBtnMoreGames10, srcBtnMoreGames100, srcBtnMoreGames300, srcHcIcon, srcInstructionsImage, srcQuickPlayBackground, srcQuickPlayTeaser, visibleInstructionsContainer, visibleSnowwarLobbyCont }: GamesMainLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={32769}
            caption={t('games.main.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 413, height: 530, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ThemeImage
                    name="quick_play_background"
                    tags={[ 'bitmap' ]}
                    params={16}
                    src={srcQuickPlayBackground ?? layoutImage('quick_play_background.png')}
                    layout={{ position: 'absolute', left: 0, width: 407, top: 0, height: 355 }}
                />
                <Region
                    name="quick_play_container"
                    params={144}
                    layout={{ position: 'absolute', left: 0, right: 6, top: 0, height: 485 }}
                >
                    <Region
                        name="teaser_container"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 407, top: 0, height: 436 }}
                    >
                        <ThemeImage
                            name="quick_play_teaser"
                            tags={[ 'bitmap' ]}
                            params={16}
                            src={srcQuickPlayTeaser ?? layoutImage('quick_play_teaser.png')}
                            layout={{ position: 'absolute', left: 0, width: 407, top: 160, height: 130 }}
                        />
                        <Region
                            name="header_text_container"
                            params={16400}
                            layout={{ position: 'absolute', left: 70, width: 279, top: 107, height: 165 }}
                        >
                            <Region
                                name="header_stroke"
                                params={2192}
                                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 139, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={captionHeaderStroke ?? t('snowwar.descriptionHeader')}
                                    textOptions={{ fill: '#1077ac', align: 'center' }}
                                />
                            </Region>
                            <Region
                                name="header"
                                params={2192}
                                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 139, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={captionHeader ?? t('snowwar.descriptionHeader')}
                                    textOptions={{ fill: '#ffffff', align: 'center' }}
                                />
                            </Region>
                            <Region
                                name="header"
                                params={2192}
                                layout={{ position: 'absolute', left: 18, right: 18, top: 30, bottom: 117, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={captionHeader2 ?? t('snowwar.descriptionBody')}
                                    textOptions={{ fill: '#1077ac', wordWrap: true, wordWrapWidth: 243, align: 'center' }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="instructions_link"
                            params={193}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -203.5, width: 407, top: 280, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
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
                            params={193}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -203.5, width: 407, top: 315, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            onPointerTap={onLeaderboardLink}
                            cursor="pointer"
                        >
                            <ThemeText
                                text={captionLeaderboardLink ?? t('snowwar.leaderboards.link')}
                                textOptions={{ fill: '#1077ac', align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="instructions_container"
                        params={16}
                        visible={visibleInstructionsContainer ?? false}
                        layout={{ position: 'absolute', left: 0, width: 407, top: 0, height: 436 }}
                    >
                        <ThemeImage
                            name="instructions_image"
                            tags={[ 'bitmap' ]}
                            params={208}
                            src={srcInstructionsImage}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -125.5, width: 250, top: 80, height: 166 }}
                        />
                        <Region
                            name="instructions_back"
                            params={1}
                            layout={{ position: 'absolute', left: 18, width: 160, top: 324, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            onPointerTap={onInstructionsBack}
                            cursor="pointer"
                        >
                            <ThemeText
                                text={captionInstructionsBack ?? t('snowwar.instructions.back')}
                                textOptions={{ fill: '#1077ac' }}
                            />
                        </Region>
                        <Region
                            name="instructions_prev"
                            params={17}
                            onPointerTap={onInstructionsPrev}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 10, width: 50, top: 140, height: 50 }}
                        >
                            <ThemeImage
                                tags={[ 'bitmap' ]}
                                params={16}
                                src={layoutImage('scroll_left.png')}
                                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                            />
                        </Region>
                        <Region
                            name="instructions_next"
                            params={17}
                            onPointerTap={onInstructionsNext}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 345, width: 50, top: 140, height: 50 }}
                        >
                            <ThemeImage
                                tags={[ 'bitmap' ]}
                                params={16}
                                src={layoutImage('scroll_right.png')}
                                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                            />
                        </Region>
                        <Region
                            name="instruction_text"
                            params={208}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -140.5, width: 280, top: 269, height: 21, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionInstructionText ?? 'lorem ipsum'}
                                textOptions={{ fill: '#1077ac', wordWrap: true, wordWrapWidth: 280, align: 'center' }}
                            />
                        </Region>
                        <Region
                            name="page_list"
                            params={208}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -62.5, width: 125, top: 239, height: 25, flexDirection: 'row' }}
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
                    </Region>
                    <Region
                        name="footer_container"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 407, top: 364, height: 124 }}
                    >
                        <Region
                            name="games_left_region"
                            params={17}
                            onPointerTap={onGamesLeftRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 11, width: 229, top: 0, height: 121 }}
                        >
                            <Region
                                params={16}
                                backgroundColor="#b9e2ec"
                                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 28, flexDirection: 'row', gap: 5 }}
                            >
                                <Region
                                    params={16}
                                    layout={{ width: 135, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={t('snowwar.games_left')} />
                                </Region>
                                <Region
                                    params={16}
                                    layout={{ width: 60, height: 30, flexShrink: 0 }}
                                >
                                    <Region
                                        name="games_left_stroke"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={captionGamesLeftStroke ?? '0'}
                                            textOptions={{ fill: '#1077ac' }}
                                        />
                                    </Region>
                                    <Region
                                        name="games_left"
                                        params={16}
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
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 175, top: 31, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={captionGamesLobbyGetGames ?? t('snowwar.buy_more_games')} />
                            </Region>
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 220, top: 52, height: 70, flexDirection: 'row', gap: 8 }}
                            >
                                <ThemeImage
                                    name="btn_more_games_10"
                                    tags={[ 'bitmap' ]}
                                    params={17}
                                    src={srcBtnMoreGames10 ?? layoutImage('btn_more_games_10.png')}
                                    layout={{ width: 52, height: 62, flexShrink: 0 }}
                                />
                                <ThemeImage
                                    name="btn_more_games_100"
                                    tags={[ 'bitmap' ]}
                                    params={17}
                                    src={srcBtnMoreGames100 ?? layoutImage('btn_more_games_100.png')}
                                    layout={{ width: 52, height: 62, flexShrink: 0 }}
                                />
                                <ThemeImage
                                    name="btn_more_games_300"
                                    tags={[ 'bitmap' ]}
                                    params={17}
                                    src={srcBtnMoreGames300 ?? layoutImage('btn_more_games_300.png')}
                                    layout={{ width: 52, height: 62, flexShrink: 0 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="games_vip_region"
                            params={17}
                            onPointerTap={onGamesVipRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 202, width: 187, top: -2, height: 44, maxWidth: 200 }}
                        >
                            <ThemeImage
                                name="hc_icon"
                                tags={[ 'bitmap' ]}
                                params={16}
                                src={srcHcIcon ?? layoutImage('hc_icon.png')}
                                layout={{ position: 'absolute', left: 0, width: 24, top: 6, height: 24 }}
                            />
                            <Region
                                name="games.lobby.get.vip"
                                params={16}
                                layout={{ position: 'absolute', left: 31, width: 158, top: 2, height: 35, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionGamesLobbyGetVip ?? t('snowwar.get_more_games')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 158 }}
                                />
                            </Region>
                        </Region>
                        <ContainerButton
                            variant="3"
                            name="play.button"
                            params={262161}
                            tintColor="#55cc00"
                            onPointerTap={onPlayButton}
                            layout={{ position: 'absolute', right: 13, width: 190, top: 64, height: 50 }}
                        >
                            <Region
                                name="play_text"
                                params={4194512}
                                layout={{ position: 'absolute', left: '50%', marginLeft: -67, top: 10, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionPlayText ?? t('snowwar.play')}
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                        </ContainerButton>
                    </Region>
                </Region>
                <Region
                    name="snowwar_lobby_cont"
                    params={144}
                    visible={visibleSnowwarLobbyCont ?? false}
                    layout={{ position: 'absolute', left: 0, right: 6, top: 0, height: 436 }}
                >
                    <Region
                        name="wait_text_stroke"
                        params={16}
                        layout={{ position: 'absolute', left: 40, width: 335, top: 118, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionWaitTextStroke ?? 'Waiting for players...'}
                            textOptions={{ fill: '#1077ac', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="wait_text"
                        params={16}
                        layout={{ position: 'absolute', left: 40, width: 335, top: 118, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionWaitText ?? 'Waiting for players...'}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="players_grid"
                        params={16}
                        layout={{ position: 'absolute', left: 40, width: 335, top: 178, height: 130, flexDirection: 'row', flexWrap: 'wrap', gap: 3 }}
                    />
                    <Region
                        name="cancel_link_region"
                        params={17}
                        onPointerTap={onCancelLinkRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 178, width: 63, top: 385, height: 23 }}
                    >
                        <Region
                            name="cancel_link"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 83, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionCancelLink ?? t('generic.cancel')} />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Frame>
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
            params={17}
            onPointerTap={onPage0}
            cursor="pointer"
            layout={{ width: 25, height: 25, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
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
            params={17}
            onPointerTap={onPage1}
            cursor="pointer"
            layout={{ width: 25, height: 25, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
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
            params={17}
            onPointerTap={onPage2}
            cursor="pointer"
            layout={{ width: 25, height: 25, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
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
            params={17}
            onPointerTap={onPage3}
            cursor="pointer"
            layout={{ width: 25, height: 25, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
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
            params={17}
            onPointerTap={onPage4}
            cursor="pointer"
            layout={{ width: 25, height: 25, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
                src={undefined}
                layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 25 }}
            />
        </Region>
    );
};
