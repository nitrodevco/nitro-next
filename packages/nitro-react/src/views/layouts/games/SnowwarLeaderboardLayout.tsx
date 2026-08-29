import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `372_snowwar_leaderboard_xml` (layout "snowwar_leaderboard", 437x511) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarLeaderboardLayoutProps {
    captionAllTimeText?: string;
    captionChangeFriendsView?: string;
    captionChangeGroupView?: string;
    captionChangeView?: string;
    captionResetText?: string;
    captionResetTextStroke?: string;
    captionThisWeekText?: string;
    itemsList?: ReactNode;
    layout?: BoxLayout;
    onAllTimeRegion?: () => void;
    onChangeFriendsView?: () => void;
    onChangeGroupView?: () => void;
    onChangeView?: () => void;
    onClose?: () => void;
    onNextWeek?: () => void;
    onPreviousWeek?: () => void;
    onScrollDown?: () => void;
    onScrollUp?: () => void;
    onThisWeekRegion?: () => void;
    srcAllTimeImage?: string;
    srcBackground?: string;
    srcThisWeekImage?: string;
    tintAllTimeImage?: string;
    tintBackground?: string;
    tintThisWeekImage?: string;
}

export const SnowwarLeaderboardLayout = ({ captionAllTimeText, captionChangeFriendsView, captionChangeGroupView, captionChangeView, captionResetText, captionResetTextStroke, captionThisWeekText, itemsList, layout, onAllTimeRegion, onChangeFriendsView, onChangeGroupView, onChangeView, onClose, onNextWeek, onPreviousWeek, onScrollDown, onScrollUp, onThisWeekRegion, srcAllTimeImage, srcBackground, srcThisWeekImage, tintAllTimeImage, tintBackground, tintThisWeekImage }: SnowwarLeaderboardLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 437, height: 511, minWidth: 437, minHeight: 511, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <ThemeImage
                    name="background"
                    src={srcBackground ?? layoutImage('leaderboard_bg.png')}
                    tint={tintBackground}
                    layout={{ position: 'absolute', left: 0, right: -6, top: 0, bottom: -2 }}
                />
                <Region
                    name="this_week_region"
                    backgroundColor="#000000"
                    onPointerTap={onThisWeekRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 107, width: 119, top: 0, height: 28 }}
                >
                    <ThemeImage
                        name="this_week_image"
                        src={srcThisWeekImage ?? layoutImage('left_black.png')}
                        tint={tintThisWeekImage}
                        layout={{ position: 'absolute', left: 0, width: 119, top: 0, height: 28 }}
                    />
                    <Region
                        name="this_week_text"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 5, bottom: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionThisWeekText ?? t('snowwar.leaderboard.this_week')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="all_time_region"
                    backgroundColor="#000000"
                    onPointerTap={onAllTimeRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 226, width: 119, top: 0, height: 28 }}
                >
                    <ThemeImage
                        name="all_time_image"
                        src={srcAllTimeImage ?? layoutImage('right_blue.png')}
                        tint={tintAllTimeImage}
                        layout={{ position: 'absolute', left: 0, width: 119, top: 0, height: 28 }}
                    />
                    <Region
                        name="all_time_text"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 5, bottom: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionAllTimeText ?? t('snowwar.leaderboard.all_time')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="borderContainer"
                    layout={{ position: 'absolute', left: 40, width: 350, alignSelf: 'center', marginTop: -10.5, marginBottom: 10.5, height: 389, justifyContent: 'center' }}
                >
                    <Border
                        variant="0"
                        name="listBorder"
                        blend={0.5}
                        layout={{ position: 'absolute', width: 350, top: 28, height: 336 }}
                    />
                    <Region
                        name="scrollUp"
                        onPointerTap={onScrollUp}
                        cursor="pointer"
                        layout={{ position: 'absolute', width: 58, top: 1, height: 28 }}
                    >
                        <ThemeImage
                            src={undefined}
                            layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 28 }}
                        />
                    </Region>
                    <Region
                        name="scrollDown"
                        onPointerTap={onScrollDown}
                        cursor="pointer"
                        layout={{ position: 'absolute', width: 58, bottom: 0, height: 28 }}
                    >
                        <ThemeImage
                            src={undefined}
                            layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 28 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="changeView"
                    layout={{ position: 'absolute', left: 0, width: 150, top: 445, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPointerTap={onChangeView}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionChangeView ?? t('snowwar.leaderboard.all')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Region
                    name="list"
                    layout={{ position: 'absolute', marginLeft: 2.5, marginRight: -2.5, width: 356, alignSelf: 'center', marginTop: -9, marginBottom: 9, height: 336, flexDirection: 'column' }}
                >
                    {itemsList}
                </Region>
                <Region
                    name="previousWeek"
                    onPointerTap={onPreviousWeek}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 17, width: 14, top: 199, height: 18 }}
                >
                    <ThemeImage
                        src={layoutImage('scroll_left.png')}
                        layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 18 }}
                    />
                </Region>
                <Region
                    name="nextWeek"
                    onPointerTap={onNextWeek}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 400, width: 14, top: 199, height: 18 }}
                >
                    <ThemeImage
                        src={layoutImage('scroll_right.png')}
                        layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 18 }}
                    />
                </Region>
                <Region
                    name="reset_text_stroke"
                    layout={{ position: 'absolute', left: 251, width: 49, top: 397, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionResetTextStroke ?? 'Reset: '}
                        textOptions={{ fill: '#1077ac' }}
                    />
                </Region>
                <Region
                    name="reset_text"
                    layout={{ position: 'absolute', left: 251, width: 49, top: 397, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionResetText ?? 'Reset: '}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="changeGroupView"
                    layout={{ position: 'absolute', left: 280, width: 150, top: 445, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPointerTap={onChangeGroupView}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionChangeGroupView ?? t('people.groups.title')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Region
                    name="changeFriendsView"
                    layout={{ position: 'absolute', left: 135, width: 150, top: 445, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPointerTap={onChangeFriendsView}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionChangeFriendsView ?? t('snowwar.leaderboard.friends')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
