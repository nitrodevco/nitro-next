import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { MainView_1185LayoutRankTypeImgItem } from './MainView_1185LayoutRankTypeImgItem';
import { MainView_1185LayoutScoreTxtItem } from './MainView_1185LayoutScoreTxtItem';

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
    tintCanvas?: string;
    visibleCanvas?: boolean;
    visibleEntryBgEven?: boolean;
    visibleEntryBgUneven?: boolean;
    visibleRankBorder?: boolean;
    visibleRankContainer?: boolean;
    visibleRankNumber?: boolean;
    visibleRegionProfile?: boolean;
    visibleRightAligned?: boolean;
    visibleUsernameTxt?: boolean;
}

export const MainView_1185LayoutEntryTemplateItem = ({ captionRankNumber, captionUsernameTxt, itemsRightAligned, layout, onRegionProfile, srcCanvas, srcEntryBgEven, srcEntryBgUneven, tintCanvas, visibleCanvas, visibleEntryBgEven, visibleEntryBgUneven, visibleRankBorder, visibleRankContainer, visibleRankNumber, visibleRegionProfile, visibleRightAligned, visibleUsernameTxt }: MainView_1185LayoutEntryTemplateItemProps) => {
    return (
        <Region
            name="entry_template"
            layout={{ width: 362, height: 41, flexShrink: 0, ...layout }}
        >
            {(visibleEntryBgEven ?? true) && (
                <ThemeImage
                    name="entry_bg_even"
                    src={srcEntryBgEven ?? layoutImage('badge_leaderboard_entry_even.png')}
                    layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 41 }}
                />
            )}
            {(visibleEntryBgUneven ?? false) && (
                <ThemeImage
                    name="entry_bg_uneven"
                    src={srcEntryBgUneven ?? layoutImage('badge_leaderboard_entry_uneven.png')}
                    layout={{ position: 'absolute', left: 0, width: 362, top: 0, height: 41 }}
                />
            )}
            {(visibleRankContainer ?? true) && (
                <Region
                    name="rank_container"
                    layout={{ position: 'absolute', left: 5, width: 45, alignSelf: 'center', height: 39, justifyContent: 'center' }}
                >
                    {(visibleRankBorder ?? true) && (
                        <Border
                            variant="14"
                            name="rank_border"
                            tintColor="#6382aa"
                            layout={{ position: 'absolute', width: 25, top: 7, height: 25 }}
                        >
                            {(visibleRankNumber ?? true) && (
                                <ThemeText
                                    text={captionRankNumber ?? '1'}
                                    textOptions={{ fill: '#ffffff' }}
                                    name="rank_number"
                                    layout={{ position: 'absolute', left: 6, top: 2, height: 20 }}
                                />
                            )}
                        </Border>
                    )}
                </Region>
            )}
            {(visibleRegionProfile ?? true) && (
                <Region
                    name="region_profile"
                    onPointerTap={onRegionProfile}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 51, right: 267, top: 3, height: 35 }}
                >
                    <Region layout={{ position: 'absolute', left: -3, width: 50, top: -18, height: 70, overflow: 'hidden', justifyContent: 'center' }}>
                        {(visibleCanvas ?? true) && (
                            <ThemeImage
                                name="canvas"
                                src={srcCanvas}
                                tint={tintCanvas}
                                layout={{ position: 'absolute', width: 10, alignSelf: 'center', height: 10, overflow: 'hidden' }}
                            />
                        )}
                    </Region>
                </Region>
            )}
            {(visibleUsernameTxt ?? true) && (
                <ThemeText
                    text={captionUsernameTxt ?? 'Username very long'}
                    name="username_txt"
                    layout={{ position: 'absolute', left: 98, width: 114, alignSelf: 'center', height: 17 }}
                />
            )}
            {(visibleRightAligned ?? true) && (
                <Region
                    name="right_aligned"
                    layout={{ position: 'absolute', right: 11, width: 64, top: 7, height: 26, flexDirection: 'row', gap: 8 }}
                >
                    {itemsRightAligned ?? (
                        <>
                            <MainView_1185LayoutScoreTxtItem />
                            <MainView_1185LayoutRankTypeImgItem />
                        </>
                    )}
                </Region>
            )}
        </Region>
    );
};
