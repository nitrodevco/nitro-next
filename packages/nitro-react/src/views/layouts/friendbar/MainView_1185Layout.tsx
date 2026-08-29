import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1185_main_view_xml` (layout "main_view", 412x650) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MainView_1185LayoutProps {
    body?: MainView_1185LayoutBodyProps;
    frameHeaderOverride?: MainView_1185LayoutFrameHeaderOverrideProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const MainView_1185Layout = ({ body, frameHeaderOverride, layout, onClose }: MainView_1185LayoutProps) => {
    return (
        <Frame
            variant="10000"
            onClose={onClose}
            layout={{ width: 412, height: 650, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <MainView_1185LayoutFrameHeaderOverride {...frameHeaderOverride} />
                <MainView_1185LayoutBody {...body} />
            </Region>
        </Frame>
    );
};

/** Named region `hacky_title` of MainView_1185Layout - configured through the parent's `hackyTitle` prop. */
export interface MainView_1185LayoutHackyTitleProps {
    captionTitleTxt?: string;
    captionTitleTxtShadow0?: string;
    captionTitleTxtShadow1?: string;
    captionTitleTxtShadow2?: string;
    captionTitleTxtShadow3?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const MainView_1185LayoutHackyTitle = ({ captionTitleTxt, captionTitleTxtShadow0, captionTitleTxtShadow1, captionTitleTxtShadow2, captionTitleTxtShadow3, layout, tags }: MainView_1185LayoutHackyTitleProps) => {
    return (
        <Region
            name="hacky_title"
            tags={tags}
            layout={{ width: 96, height: 27, flexShrink: 0, ...layout }}
        >
            <Region
                name="title_txt_shadow_0"
                layout={{ position: 'absolute', left: 0, width: 94, top: 5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitleTxtShadow0 ?? 'Top Badges'} />
            </Region>
            <Region
                name="title_txt_shadow_1"
                layout={{ position: 'absolute', left: 1, width: 94, top: 4, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitleTxtShadow1 ?? 'Top Badges'} />
            </Region>
            <Region
                name="title_txt_shadow_2"
                layout={{ position: 'absolute', left: 2, width: 94, top: 5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitleTxtShadow2 ?? 'Top Badges'} />
            </Region>
            <Region
                name="title_txt_shadow_3"
                layout={{ position: 'absolute', left: 1, width: 94, top: 6, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitleTxtShadow3 ?? 'Top Badges'} />
            </Region>
            <Region
                name="title_txt"
                layout={{ position: 'absolute', left: 1, width: 94, top: 5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTitleTxt ?? 'Top Badges'}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `dropdown_region` of MainView_1185Layout - configured through the parent's `dropdownRegion` prop. */
export interface MainView_1185LayoutDropdownRegionProps {
    layout?: BoxLayout;
    onDropdownRegion?: () => void;
    onHiddenDropdown?: () => void;
    srcDropdownOpener?: string;
    tags?: string[];
}

export const MainView_1185LayoutDropdownRegion = ({ layout, onDropdownRegion, onHiddenDropdown, srcDropdownOpener, tags }: MainView_1185LayoutDropdownRegionProps) => {
    return (
        <Region
            name="dropdown_region"
            tags={tags}
            dynamicStyle="button"
            onPointerTap={onDropdownRegion}
            cursor="pointer"
            layout={{ width: 13, height: 9, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="dropdown_opener"
                tags={[ '#icon' ]}
                src={srcDropdownOpener ?? layoutImage('badge_leaderboard_dropdown_opener.png')}
                layout={{ position: 'absolute', left: 0, width: 13, top: 0, height: 8 }}
            />
            <Dropmenu
                variant="100"
                name="hidden_dropdown"
                onPointerTap={onHiddenDropdown}
                layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 0 }}
            />
        </Region>
    );
};

/** Named region `frame_header_override` of MainView_1185Layout - configured through the parent's `frameHeaderOverride` prop. */
export interface MainView_1185LayoutFrameHeaderOverrideProps {
    dropdownRegion?: MainView_1185LayoutDropdownRegionProps;
    hackyTitle?: MainView_1185LayoutHackyTitleProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const MainView_1185LayoutFrameHeaderOverride = ({ dropdownRegion, hackyTitle, layout, tags }: MainView_1185LayoutFrameHeaderOverrideProps) => {
    return (
        <Region
            name="frame_header_override"
            tags={tags}
            layout={{ position: 'absolute', left: 88, right: 113, top: 3, height: 32, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', width: 115, top: 0, height: 32, flexDirection: 'row', gap: 6 }}>
                <MainView_1185LayoutHackyTitle {...hackyTitle} />
                <MainView_1185LayoutDropdownRegion {...dropdownRegion} />
            </Region>
        </Region>
    );
};

/** Named region `info_container` of MainView_1185Layout - configured through the parent's `infoContainer` prop. */
export interface MainView_1185LayoutInfoContainerProps {
    captionRankTypeInfo?: string;
    layout?: BoxLayout;
    srcInfoBg?: string;
    srcRankTypeExtendedImg?: string;
    tags?: string[];
}

export const MainView_1185LayoutInfoContainer = ({ captionRankTypeInfo, layout, srcInfoBg, srcRankTypeExtendedImg, tags }: MainView_1185LayoutInfoContainerProps) => {
    return (
        <Region
            name="info_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 54, ...layout }}
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
    );
};

/** Named region `rank_container` of MainView_1185Layout - configured through the parent's `rankContainer` prop. */
export interface MainView_1185LayoutRankContainerProps {
    captionRankNumber?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const MainView_1185LayoutRankContainer = ({ captionRankNumber, layout, tags }: MainView_1185LayoutRankContainerProps) => {
    return (
        <Region
            name="rank_container"
            tags={tags}
            layout={{ position: 'absolute', left: 5, width: 45, alignSelf: 'center', height: 39, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="14"
                name="rank_border"
                tintColor="#6382aa"
                layout={{ position: 'absolute', width: 25, top: 7, height: 25 }}
            >
                <Region
                    name="rank_number"
                    layout={{ position: 'absolute', left: 6, top: 2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRankNumber ?? '1'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `region_profile` of MainView_1185Layout - configured through the parent's `regionProfile` prop. */
export interface MainView_1185LayoutRegionProfileProps {
    layout?: BoxLayout;
    onRegionProfile?: () => void;
    srcCanvas?: string;
    tags?: string[];
}

export const MainView_1185LayoutRegionProfile = ({ layout, onRegionProfile, srcCanvas, tags }: MainView_1185LayoutRegionProfileProps) => {
    return (
        <Region
            name="region_profile"
            tags={tags}
            onPointerTap={onRegionProfile}
            cursor="pointer"
            layout={{ position: 'absolute', left: 51, right: 267, top: 3, height: 35, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: -3, width: 50, top: -18, height: 70, overflow: 'hidden', justifyContent: 'center' }}>
                <ThemeImage
                    name="canvas"
                    src={srcCanvas}
                    layout={{ position: 'absolute', width: 10, alignSelf: 'center', height: 10, overflow: 'hidden' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `score_txt` of MainView_1185Layout - pass real rows through its `items…` slot. */
export interface MainView_1185LayoutScoreTxtItemProps {
    captionScoreTxt?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const MainView_1185LayoutScoreTxtItem = ({ captionScoreTxt, layout, tags }: MainView_1185LayoutScoreTxtItemProps) => {
    return (
        <Region
            name="score_txt"
            tags={tags}
            layout={{ width: 31, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionScoreTxt ?? '7864'} />
        </Region>
    );
};

/** Row template `rank_type_img` of MainView_1185Layout - pass real rows through its `items…` slot. */
export interface MainView_1185LayoutRankTypeImgItemProps {
    layout?: BoxLayout;
    srcRankTypeImg?: string;
    tags?: string[];
}

export const MainView_1185LayoutRankTypeImgItem = ({ layout, srcRankTypeImg, tags }: MainView_1185LayoutRankTypeImgItemProps) => {
    return (
        <ThemeImage
            name="rank_type_img"
            tags={tags}
            src={srcRankTypeImg ?? layoutImage('badge_rarity_badges_emblem_unique.png')}
            layout={{ width: 25, height: 25, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `right_aligned` of MainView_1185Layout - configured through the parent's `rightAligned` prop. */
export interface MainView_1185LayoutRightAlignedProps {
    itemsRightAligned?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const MainView_1185LayoutRightAligned = ({ itemsRightAligned, layout, tags }: MainView_1185LayoutRightAlignedProps) => {
    return (
        <Region
            name="right_aligned"
            tags={tags}
            layout={{ position: 'absolute', right: 11, width: 64, top: 7, height: 26, flexDirection: 'row', gap: 8, ...layout }}
        >
            {itemsRightAligned ?? (
                <>
                    <MainView_1185LayoutScoreTxtItem />
                    <MainView_1185LayoutRankTypeImgItem />
                </>
            )}
        </Region>
    );
};

/** Row template `entry_template` of MainView_1185Layout - pass real rows through its `items…` slot. */
export interface MainView_1185LayoutEntryTemplateItemProps {
    captionUsernameTxt?: string;
    layout?: BoxLayout;
    rankContainer?: MainView_1185LayoutRankContainerProps;
    regionProfile?: MainView_1185LayoutRegionProfileProps;
    rightAligned?: MainView_1185LayoutRightAlignedProps;
    srcEntryBgEven?: string;
    srcEntryBgUneven?: string;
    tags?: string[];
}

export const MainView_1185LayoutEntryTemplateItem = ({ captionUsernameTxt, layout, rankContainer, regionProfile, rightAligned, srcEntryBgEven, srcEntryBgUneven, tags }: MainView_1185LayoutEntryTemplateItemProps) => {
    return (
        <Region
            name="entry_template"
            tags={tags}
            layout={{ width: 362, height: 41, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="entry_bg_even"
                src={srcEntryBgEven ?? layoutImage('badge_leaderboard_entry_even.png')}
                layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 41 }}
            />
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 41 }}
            >
                <ThemeImage
                    name="entry_bg_uneven"
                    src={srcEntryBgUneven ?? layoutImage('badge_leaderboard_entry_uneven.png')}
                    layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 41 }}
                />
            </Region>
            <MainView_1185LayoutRankContainer {...rankContainer} />
            <MainView_1185LayoutRegionProfile {...regionProfile} />
            <Region
                name="username_txt"
                layout={{ position: 'absolute', left: 98, width: 114, alignSelf: 'center', height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionUsernameTxt ?? 'Username very long'} />
            </Region>
            <MainView_1185LayoutRightAligned {...rightAligned} />
        </Region>
    );
};

/** Named region `ranking_list` of MainView_1185Layout - configured through the parent's `rankingList` prop. */
export interface MainView_1185LayoutRankingListProps {
    itemsRankingList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const MainView_1185LayoutRankingList = ({ itemsRankingList, layout, tags }: MainView_1185LayoutRankingListProps) => {
    return (
        <Region
            name="ranking_list"
            tags={tags}
            layout={{ position: 'absolute', left: 7, right: 7, top: 60, bottom: 86, flexDirection: 'column', gap: 2, ...layout }}
        >
            {itemsRankingList ?? (
                <MainView_1185LayoutEntryTemplateItem />
            )}
        </Region>
    );
};

/** Named region `rank_container` of MainView_1185Layout - configured through the parent's `rankContainer` prop. */
export interface MainView_1185LayoutRankContainer2Props {
    captionRankOwn?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const MainView_1185LayoutRankContainer2 = ({ captionRankOwn, layout, tags }: MainView_1185LayoutRankContainer2Props) => {
    return (
        <Region
            name="rank_container"
            tags={tags}
            layout={{ position: 'absolute', left: 5, width: 45, alignSelf: 'center', height: 39, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="14"
                name="rank_border"
                tintColor="#6382aa"
                layout={{ position: 'absolute', width: 27, top: 7, height: 25 }}
            >
                <Region
                    name="rank_own"
                    layout={{ position: 'absolute', left: 6, top: 2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRankOwn ?? '--'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `region_profile` of MainView_1185Layout - configured through the parent's `regionProfile` prop. */
export interface MainView_1185LayoutRegionProfile2Props {
    layout?: BoxLayout;
    onRegionProfile?: () => void;
    srcCanvas?: string;
    tags?: string[];
}

export const MainView_1185LayoutRegionProfile2 = ({ layout, onRegionProfile, srcCanvas, tags }: MainView_1185LayoutRegionProfile2Props) => {
    return (
        <Region
            name="region_profile"
            tags={tags}
            onPointerTap={onRegionProfile}
            cursor="pointer"
            layout={{ position: 'absolute', left: 51, right: 275, top: 4, height: 35, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: -3, width: 50, top: -18, height: 70, overflow: 'hidden', justifyContent: 'center' }}>
                <ThemeImage
                    name="canvas"
                    src={srcCanvas}
                    layout={{ position: 'absolute', width: 10, alignSelf: 'center', height: 10, overflow: 'hidden' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `score_txt` of MainView_1185Layout - pass real rows through its `items…` slot. */
export interface MainView_1185LayoutScoreTxtItem2Props {
    captionScoreTxt?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const MainView_1185LayoutScoreTxtItem2 = ({ captionScoreTxt, layout, tags }: MainView_1185LayoutScoreTxtItem2Props) => {
    return (
        <Region
            name="score_txt"
            tags={tags}
            layout={{ width: 31, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionScoreTxt ?? '7864'} />
        </Region>
    );
};

/** Row template `rank_type_img` of MainView_1185Layout - pass real rows through its `items…` slot. */
export interface MainView_1185LayoutRankTypeImgItem2Props {
    layout?: BoxLayout;
    srcRankTypeImg?: string;
    tags?: string[];
}

export const MainView_1185LayoutRankTypeImgItem2 = ({ layout, srcRankTypeImg, tags }: MainView_1185LayoutRankTypeImgItem2Props) => {
    return (
        <ThemeImage
            name="rank_type_img"
            tags={tags}
            src={srcRankTypeImg ?? layoutImage('badge_rarity_badges_emblem_unique.png')}
            layout={{ width: 25, height: 25, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `right_aligned` of MainView_1185Layout - configured through the parent's `rightAligned` prop. */
export interface MainView_1185LayoutRightAligned2Props {
    itemsRightAligned?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const MainView_1185LayoutRightAligned2 = ({ itemsRightAligned, layout, tags }: MainView_1185LayoutRightAligned2Props) => {
    return (
        <Region
            name="right_aligned"
            tags={tags}
            layout={{ position: 'absolute', right: 11, width: 64, top: 7, height: 26, flexDirection: 'row', gap: 8, ...layout }}
        >
            {itemsRightAligned ?? (
                <>
                    <MainView_1185LayoutScoreTxtItem2 />
                    <MainView_1185LayoutRankTypeImgItem2 />
                </>
            )}
        </Region>
    );
};

/** Named region `own_container` of MainView_1185Layout - configured through the parent's `ownContainer` prop. */
export interface MainView_1185LayoutOwnContainerProps {
    captionUsernameTxt?: string;
    layout?: BoxLayout;
    rankContainer?: MainView_1185LayoutRankContainer2Props;
    regionProfile?: MainView_1185LayoutRegionProfile2Props;
    rightAligned?: MainView_1185LayoutRightAligned2Props;
    srcOwnBg?: string;
    tags?: string[];
}

export const MainView_1185LayoutOwnContainer = ({ captionUsernameTxt, layout, rankContainer, regionProfile, rightAligned, srcOwnBg, tags }: MainView_1185LayoutOwnContainerProps) => {
    return (
        <Region
            name="own_container"
            tags={tags}
            layout={{ position: 'absolute', left: 3, right: 3, bottom: 39, height: 43, ...layout }}
        >
            <ThemeImage
                name="own_bg"
                src={srcOwnBg ?? layoutImage('badge_leaderboard_entry_self.png')}
                layout={{ position: 'absolute', left: 0, width: 370, top: 0, height: 43 }}
            />
            <MainView_1185LayoutRankContainer2 {...rankContainer} />
            <MainView_1185LayoutRegionProfile2 {...regionProfile} />
            <Region
                name="username_txt"
                layout={{ position: 'absolute', left: 97, width: 99, alignSelf: 'center', height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionUsernameTxt ?? 'sirjonasxx-XIVXXI'} />
            </Region>
            <MainView_1185LayoutRightAligned2 {...rightAligned} />
        </Region>
    );
};

/** Row template `previous_btn` of MainView_1185Layout - pass real rows through its `items…` slot. */
export interface MainView_1185LayoutPreviousBtnItemProps {
    layout?: BoxLayout;
    onPreviousBtn?: () => void;
    tags?: string[];
}

export const MainView_1185LayoutPreviousBtnItem = ({ layout, onPreviousBtn, tags }: MainView_1185LayoutPreviousBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="previous_btn"
            tags={tags}
            onPointerTap={onPreviousBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 100, height: 26, flexShrink: 0, minWidth: 100, maxWidth: 100, ...layout }}
        >
            {t('badge_leaderboard.previous')}
        </Button>
    );
};

/** Row template `next_btn` of MainView_1185Layout - pass real rows through its `items…` slot. */
export interface MainView_1185LayoutNextBtnItemProps {
    layout?: BoxLayout;
    onNextBtn?: () => void;
    tags?: string[];
}

export const MainView_1185LayoutNextBtnItem = ({ layout, onNextBtn, tags }: MainView_1185LayoutNextBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="next_btn"
            tags={tags}
            onPointerTap={onNextBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 100, height: 26, flexShrink: 0, minWidth: 100, maxWidth: 100, ...layout }}
        >
            {t('badge_leaderboard.next')}
        </Button>
    );
};

/** Named region `buttons` of MainView_1185Layout - configured through the parent's `buttons` prop. */
export interface MainView_1185LayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const MainView_1185LayoutButtons = ({ itemsButtons, layout, tags }: MainView_1185LayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            tags={tags}
            layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 279, bottom: 3, height: 26, flexDirection: 'row', gap: 79, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <MainView_1185LayoutPreviousBtnItem />
                    <MainView_1185LayoutNextBtnItem />
                </>
            )}
        </Region>
    );
};

/** Named region `body` of MainView_1185Layout - configured through the parent's `body` prop. */
export interface MainView_1185LayoutBodyProps {
    buttons?: MainView_1185LayoutButtonsProps;
    infoContainer?: MainView_1185LayoutInfoContainerProps;
    layout?: BoxLayout;
    ownContainer?: MainView_1185LayoutOwnContainerProps;
    rankingList?: MainView_1185LayoutRankingListProps;
    tags?: string[];
}

export const MainView_1185LayoutBody = ({ buttons, infoContainer, layout, ownContainer, rankingList, tags }: MainView_1185LayoutBodyProps) => {
    return (
        <Region
            name="body"
            tags={tags}
            layout={{ position: 'absolute', left: 6, right: 30, top: 59, bottom: 17, justifyContent: 'center', ...layout }}
        >
            <MainView_1185LayoutInfoContainer {...infoContainer} />
            <MainView_1185LayoutRankingList {...rankingList} />
            <MainView_1185LayoutOwnContainer {...ownContainer} />
            <MainView_1185LayoutButtons {...buttons} />
        </Region>
    );
};
