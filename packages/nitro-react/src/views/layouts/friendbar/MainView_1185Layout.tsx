import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1185_main_view_xml` (layout "main_view", 412x650) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MainView_1185LayoutProps {
    captionRankOwn?: string;
    captionRankTypeInfo?: string;
    captionTitleTxt?: string;
    captionTitleTxtShadow0?: string;
    captionTitleTxtShadow1?: string;
    captionTitleTxtShadow2?: string;
    captionTitleTxtShadow3?: string;
    captionUsernameTxt?: string;
    itemsButtons?: ReactNode;
    itemsRankingList?: ReactNode;
    itemsRightAligned?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onDropdownRegion?: () => void;
    onHiddenDropdown?: () => void;
    onRegionProfile?: () => void;
    srcCanvas?: string;
    srcDropdownOpener?: string;
    srcInfoBg?: string;
    srcOwnBg?: string;
    srcRankTypeExtendedImg?: string;
}

export const MainView_1185Layout = ({ captionRankOwn, captionRankTypeInfo, captionTitleTxt, captionTitleTxtShadow0, captionTitleTxtShadow1, captionTitleTxtShadow2, captionTitleTxtShadow3, captionUsernameTxt, itemsButtons, itemsRankingList, itemsRightAligned, layout, onClose, onDropdownRegion, onHiddenDropdown, onRegionProfile, srcCanvas, srcDropdownOpener, srcInfoBg, srcOwnBg, srcRankTypeExtendedImg }: MainView_1185LayoutProps) => {
    return (
        <Frame
            variant="10000"
            params={32769}
            onClose={onClose}
            layout={{ width: 412, height: 650, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="frame_header_override"
                    params={144}
                    layout={{ position: 'absolute', left: 88, right: 113, top: 3, height: 32 }}
                >
                    <Region
                        params={208}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -57.5, width: 115, top: 0, height: 32, flexDirection: 'row', gap: 6 }}
                    >
                        <Region
                            name="hacky_title"
                            params={147472}
                            layout={{ width: 96, height: 27, flexShrink: 0 }}
                        >
                            <Region
                                name="title_txt_shadow_0"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 94, top: 5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={captionTitleTxtShadow0 ?? 'Top Badges'} />
                            </Region>
                            <Region
                                name="title_txt_shadow_1"
                                params={16}
                                layout={{ position: 'absolute', left: 1, width: 94, top: 4, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={captionTitleTxtShadow1 ?? 'Top Badges'} />
                            </Region>
                            <Region
                                name="title_txt_shadow_2"
                                params={16}
                                layout={{ position: 'absolute', left: 2, width: 94, top: 5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={captionTitleTxtShadow2 ?? 'Top Badges'} />
                            </Region>
                            <Region
                                name="title_txt_shadow_3"
                                params={16}
                                layout={{ position: 'absolute', left: 1, width: 94, top: 6, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={captionTitleTxtShadow3 ?? 'Top Badges'} />
                            </Region>
                            <Region
                                name="title_txt"
                                params={16}
                                layout={{ position: 'absolute', left: 1, width: 94, top: 5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionTitleTxt ?? 'Top Badges'}
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="dropdown_region"
                            params={1}
                            dynamicStyle="button"
                            onPointerTap={onDropdownRegion}
                            cursor="pointer"
                            layout={{ width: 13, height: 9, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="dropdown_opener"
                                tags={[ '#icon' ]}
                                params={16}
                                src={srcDropdownOpener ?? layoutImage('badge_leaderboard_dropdown_opener.png')}
                                layout={{ position: 'absolute', left: 0, width: 13, top: 0, height: 8 }}
                            />
                            <Dropmenu
                                variant="100"
                                name="hidden_dropdown"
                                params={17}
                                onPointerTap={onHiddenDropdown}
                                layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 0 }}
                            />
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="body"
                    params={2192}
                    layout={{ position: 'absolute', left: 6, right: 30, top: 59, bottom: 17 }}
                >
                    <Region
                        name="info_container"
                        params={144}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 54 }}
                    >
                        <ThemeImage
                            name="info_bg"
                            params={16}
                            src={srcInfoBg ?? layoutImage('badge_leaderboard_header.png')}
                            layout={{ position: 'absolute', left: 0, width: 376, top: 0, height: 54 }}
                        />
                        <ThemeImage
                            name="rank_type_extended_img"
                            params={16}
                            src={srcRankTypeExtendedImg ?? layoutImage('badge_rarity_badges_emblem_unique_extended.png')}
                            layout={{ position: 'absolute', left: 4, width: 65, top: 1, height: 47 }}
                        />
                        <Region
                            name="rank_type_info"
                            params={3145744}
                            layout={{ position: 'absolute', left: 74, width: 295, top: '50%', marginTop: -21, height: 40, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionRankTypeInfo ?? 'Players with the most unique badges.Unique badges can be obtained from exceptional events where only a single user is awarded the badge.'}
                                textOptions={{ fill: '#222222', wordWrap: true, wordWrapWidth: 295 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="ranking_list"
                        params={2192}
                        layout={{ position: 'absolute', left: 7, right: 7, top: 60, bottom: 86, flexDirection: 'column', gap: 2 }}
                    >
                        {itemsRankingList ?? (
                            <MainView_1185LayoutEntryTemplateItem />
                        )}
                    </Region>
                    <Region
                        name="own_container"
                        params={1168}
                        layout={{ position: 'absolute', left: 3, right: 3, bottom: 39, height: 43 }}
                    >
                        <ThemeImage
                            name="own_bg"
                            params={16}
                            src={srcOwnBg ?? layoutImage('badge_leaderboard_entry_self.png')}
                            layout={{ position: 'absolute', left: 0, width: 370, top: 0, height: 43 }}
                        />
                        <Region
                            name="rank_container"
                            params={3088}
                            layout={{ position: 'absolute', left: 5, width: 45, top: '50%', marginTop: -19.5, height: 39 }}
                        >
                            <Border
                                variant="14"
                                name="rank_border"
                                params={786640}
                                tintColor="#6382aa"
                                layout={{ position: 'absolute', left: '50%', marginLeft: -13.5, width: 27, top: 7, height: 25 }}
                            >
                                <Region
                                    name="rank_own"
                                    params={4194320}
                                    layout={{ position: 'absolute', left: 6, top: 2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionRankOwn ?? '--'}
                                        textOptions={{ fill: '#ffffff' }}
                                    />
                                </Region>
                            </Border>
                        </Region>
                        <Region
                            name="region_profile"
                            params={145}
                            onPointerTap={onRegionProfile}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 51, right: 275, top: 4, height: 35 }}
                        >
                            <Region
                                params={1073741840}
                                layout={{ position: 'absolute', left: -3, width: 50, top: -18, height: 70, overflow: 'hidden' }}
                            >
                                <ThemeImage
                                    name="canvas"
                                    params={1077673984}
                                    src={srcCanvas}
                                    layout={{ position: 'absolute', left: '50%', marginLeft: -5, width: 10, top: '50%', marginTop: -5, height: 10, overflow: 'hidden' }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="username_txt"
                            params={3088}
                            layout={{ position: 'absolute', left: 97, width: 99, top: '50%', marginTop: -8.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionUsernameTxt ?? 'sirjonasxx-XIVXXI'} />
                        </Region>
                        <Region
                            name="right_aligned"
                            params={262224}
                            layout={{ position: 'absolute', right: 11, width: 64, top: 7, height: 26, flexDirection: 'row', gap: 8 }}
                        >
                            {itemsRightAligned ?? (
                                <>
                                    <MainView_1185LayoutScoreTxtItem2 />
                                    <MainView_1185LayoutRankTypeImgItem2 />
                                </>
                            )}
                        </Region>
                    </Region>
                    <Region
                        name="buttons"
                        params={787664}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -139, width: 279, bottom: 3, height: 26, flexDirection: 'row', gap: 79 }}
                    >
                        {itemsButtons ?? (
                            <>
                                <MainView_1185LayoutPreviousBtnItem />
                                <MainView_1185LayoutNextBtnItem />
                            </>
                        )}
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `score_txt` of MainView_1185Layout - pass real rows through its `items…` slot. */
export interface MainView_1185LayoutScoreTxtItemProps {
    captionScoreTxt?: string;
    layout?: BoxLayout;
}

export const MainView_1185LayoutScoreTxtItem = ({ captionScoreTxt, layout }: MainView_1185LayoutScoreTxtItemProps) => {
    return (
        <Region
            name="score_txt"
            params={16}
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
}

export const MainView_1185LayoutRankTypeImgItem = ({ layout, srcRankTypeImg }: MainView_1185LayoutRankTypeImgItemProps) => {
    return (
        <ThemeImage
            name="rank_type_img"
            params={16}
            src={srcRankTypeImg ?? layoutImage('badge_rarity_badges_emblem_unique.png')}
            layout={{ width: 25, height: 25, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `entry_template` of MainView_1185Layout - pass real rows through its `items…` slot. */
export interface MainView_1185LayoutEntryTemplateItemProps {
    captionRankNumber?: string;
    captionUsernameTxt?: string;
    itemsRightAligned?: ReactNode;
    layout?: BoxLayout;
    onRegionProfile?: () => void;
    srcCanvas?: string;
    srcEntryBgEven?: string;
    srcEntryBgUneven?: string;
}

export const MainView_1185LayoutEntryTemplateItem = ({ captionRankNumber, captionUsernameTxt, itemsRightAligned, layout, onRegionProfile, srcCanvas, srcEntryBgEven, srcEntryBgUneven }: MainView_1185LayoutEntryTemplateItemProps) => {
    return (
        <Region
            name="entry_template"
            params={144}
            layout={{ width: 362, height: 41, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="entry_bg_even"
                params={16}
                src={srcEntryBgEven ?? layoutImage('badge_leaderboard_entry_even.png')}
                layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 41 }}
            />
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 41 }}
            >
                <ThemeImage
                    name="entry_bg_uneven"
                    params={16}
                    src={srcEntryBgUneven ?? layoutImage('badge_leaderboard_entry_uneven.png')}
                    layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 41 }}
                />
            </Region>
            <Region
                name="rank_container"
                params={3088}
                layout={{ position: 'absolute', left: 5, width: 45, top: '50%', marginTop: -19.5, height: 39 }}
            >
                <Border
                    variant="14"
                    name="rank_border"
                    params={786640}
                    tintColor="#6382aa"
                    layout={{ position: 'absolute', left: '50%', marginLeft: -12.5, width: 25, top: 7, height: 25 }}
                >
                    <Region
                        name="rank_number"
                        params={4194320}
                        layout={{ position: 'absolute', left: 6, top: 2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionRankNumber ?? '1'}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Border>
            </Region>
            <Region
                name="region_profile"
                params={145}
                onPointerTap={onRegionProfile}
                cursor="pointer"
                layout={{ position: 'absolute', left: 51, right: 267, top: 3, height: 35 }}
            >
                <Region
                    params={1073741840}
                    layout={{ position: 'absolute', left: -3, width: 50, top: -18, height: 70, overflow: 'hidden' }}
                >
                    <ThemeImage
                        name="canvas"
                        params={1077673984}
                        src={srcCanvas}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -5, width: 10, top: '50%', marginTop: -5, height: 10, overflow: 'hidden' }}
                    />
                </Region>
            </Region>
            <Region
                name="username_txt"
                params={3088}
                layout={{ position: 'absolute', left: 98, width: 114, top: '50%', marginTop: -8.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionUsernameTxt ?? 'Username very long'} />
            </Region>
            <Region
                name="right_aligned"
                params={262224}
                layout={{ position: 'absolute', right: 11, width: 64, top: 7, height: 26, flexDirection: 'row', gap: 8 }}
            >
                {itemsRightAligned ?? (
                    <>
                        <MainView_1185LayoutScoreTxtItem />
                        <MainView_1185LayoutRankTypeImgItem />
                    </>
                )}
            </Region>
        </Region>
    );
};

/** Row template `score_txt` of MainView_1185Layout - pass real rows through its `items…` slot. */
export interface MainView_1185LayoutScoreTxtItem2Props {
    captionScoreTxt?: string;
    layout?: BoxLayout;
}

export const MainView_1185LayoutScoreTxtItem2 = ({ captionScoreTxt, layout }: MainView_1185LayoutScoreTxtItem2Props) => {
    return (
        <Region
            name="score_txt"
            params={16}
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
}

export const MainView_1185LayoutRankTypeImgItem2 = ({ layout, srcRankTypeImg }: MainView_1185LayoutRankTypeImgItem2Props) => {
    return (
        <ThemeImage
            name="rank_type_img"
            params={16}
            src={srcRankTypeImg ?? layoutImage('badge_rarity_badges_emblem_unique.png')}
            layout={{ width: 25, height: 25, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `previous_btn` of MainView_1185Layout - pass real rows through its `items…` slot. */
export interface MainView_1185LayoutPreviousBtnItemProps {
    layout?: BoxLayout;
    onPreviousBtn?: () => void;
}

export const MainView_1185LayoutPreviousBtnItem = ({ layout, onPreviousBtn }: MainView_1185LayoutPreviousBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="previous_btn"
            params={131089}
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
}

export const MainView_1185LayoutNextBtnItem = ({ layout, onNextBtn }: MainView_1185LayoutNextBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="next_btn"
            params={131089}
            onPointerTap={onNextBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 100, height: 26, flexShrink: 0, minWidth: 100, maxWidth: 100, ...layout }}
        >
            {t('badge_leaderboard.next')}
        </Button>
    );
};
