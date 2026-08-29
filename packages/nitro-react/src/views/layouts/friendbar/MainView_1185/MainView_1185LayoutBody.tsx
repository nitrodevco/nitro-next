import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { MainView_1185LayoutNextBtnItem } from './MainView_1185LayoutNextBtnItem';
import { MainView_1185LayoutOwnContainer, MainView_1185LayoutOwnContainerProps } from './MainView_1185LayoutOwnContainer';
import { MainView_1185LayoutPreviousBtnItem } from './MainView_1185LayoutPreviousBtnItem';
import { MainView_1185LayoutRankingList, MainView_1185LayoutRankingListProps } from './MainView_1185LayoutRankingList';

/** Named region `body` of MainView_1185Layout - configured through the parent's `body` prop. */
export interface MainView_1185LayoutBodyProps {
    captionRankTypeInfo?: string;
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
    ownContainer?: MainView_1185LayoutOwnContainerProps;
    rankingList?: MainView_1185LayoutRankingListProps;
    srcInfoBg?: string;
    srcRankTypeExtendedImg?: string;
}

export const MainView_1185LayoutBody = ({ captionRankTypeInfo, itemsButtons, layout, ownContainer, rankingList, srcInfoBg, srcRankTypeExtendedImg }: MainView_1185LayoutBodyProps) => {
    return (
        <Region
            name="body"
            layout={{ position: 'absolute', left: 6, right: 30, top: 59, bottom: 17, justifyContent: 'center', ...layout }}
        >
            <Region
                name="info_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 54 }}
            >
                <ThemeImage
                    name="info_bg"
                    src={srcInfoBg ?? layoutImage('badge_leaderboard_header.png')}
                    layout={{ position: 'absolute', left: 0, width: 376, top: 0, height: 54 }}
                />
                <ThemeImage
                    name="rank_type_extended_img"
                    src={srcRankTypeExtendedImg ?? layoutImage('badge_rarity_badges_emblem_unique_extended.png')}
                    layout={{ position: 'absolute', left: 4, width: 65, top: 1, height: 47 }}
                />
                <Region
                    name="rank_type_info"
                    layout={{ position: 'absolute', left: 74, width: 295, alignSelf: 'center', marginTop: -1, marginBottom: 1, height: 40, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRankTypeInfo ?? 'Players with the most unique badges.Unique badges can be obtained from exceptional events where only a single user is awarded the badge.'}
                        textOptions={{ fill: '#222222', wordWrap: true, wordWrapWidth: 295 }}
                    />
                </Region>
            </Region>
            <MainView_1185LayoutRankingList {...rankingList} />
            <MainView_1185LayoutOwnContainer {...ownContainer} />
            <Region
                name="buttons"
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 279, bottom: 3, height: 26, flexDirection: 'row', gap: 79 }}
            >
                {itemsButtons ?? (
                    <>
                        <MainView_1185LayoutPreviousBtnItem />
                        <MainView_1185LayoutNextBtnItem />
                    </>
                )}
            </Region>
        </Region>
    );
};
