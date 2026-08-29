import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `372_snowwar_leaderboard_xml` (layout "snowwar_leaderboard", 437x511) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarLeaderboardLayoutProps {
    allTimeRegion?: SnowwarLeaderboardLayoutAllTimeRegionProps;
    borderContainer?: SnowwarLeaderboardLayoutBorderContainerProps;
    captionChangeFriendsView?: string;
    captionChangeGroupView?: string;
    captionChangeView?: string;
    captionResetText?: string;
    captionResetTextStroke?: string;
    layout?: BoxLayout;
    list?: SnowwarLeaderboardLayoutListProps;
    nextWeek?: SnowwarLeaderboardLayoutNextWeekProps;
    onChangeFriendsView?: () => void;
    onChangeGroupView?: () => void;
    onChangeView?: () => void;
    onClose?: () => void;
    previousWeek?: SnowwarLeaderboardLayoutPreviousWeekProps;
    srcBackground?: string;
    thisWeekRegion?: SnowwarLeaderboardLayoutThisWeekRegionProps;
}

export const SnowwarLeaderboardLayout = ({ allTimeRegion, borderContainer, captionChangeFriendsView, captionChangeGroupView, captionChangeView, captionResetText, captionResetTextStroke, layout, list, nextWeek, onChangeFriendsView, onChangeGroupView, onChangeView, onClose, previousWeek, srcBackground, thisWeekRegion }: SnowwarLeaderboardLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 437, height: 511, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <ThemeImage
                    name="background"
                    tags={[ 'bitmap' ]}
                    src={srcBackground ?? layoutImage('leaderboard_bg.png')}
                    layout={{ position: 'absolute', left: 0, right: 6, top: 0, bottom: 39 }}
                />
                <SnowwarLeaderboardLayoutThisWeekRegion {...thisWeekRegion} />
                <SnowwarLeaderboardLayoutAllTimeRegion {...allTimeRegion} />
                <SnowwarLeaderboardLayoutBorderContainer {...borderContainer} />
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
                <SnowwarLeaderboardLayoutList {...list} />
                <SnowwarLeaderboardLayoutPreviousWeek {...previousWeek} />
                <SnowwarLeaderboardLayoutNextWeek {...nextWeek} />
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

/** Named region `this_week_region` of SnowwarLeaderboardLayout - configured through the parent's `thisWeekRegion` prop. */
export interface SnowwarLeaderboardLayoutThisWeekRegionProps {
    captionThisWeekText?: string;
    layout?: BoxLayout;
    onThisWeekRegion?: () => void;
    srcThisWeekImage?: string;
    tags?: string[];
}

export const SnowwarLeaderboardLayoutThisWeekRegion = ({ captionThisWeekText, layout, onThisWeekRegion, srcThisWeekImage, tags }: SnowwarLeaderboardLayoutThisWeekRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="this_week_region"
            tags={tags}
            backgroundColor="#000000"
            onPointerTap={onThisWeekRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 107, width: 119, top: 0, height: 28, ...layout }}
        >
            <ThemeImage
                name="this_week_image"
                tags={[ 'bitmap' ]}
                src={srcThisWeekImage ?? layoutImage('left_black.png')}
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
    );
};

/** Named region `all_time_region` of SnowwarLeaderboardLayout - configured through the parent's `allTimeRegion` prop. */
export interface SnowwarLeaderboardLayoutAllTimeRegionProps {
    captionAllTimeText?: string;
    layout?: BoxLayout;
    onAllTimeRegion?: () => void;
    srcAllTimeImage?: string;
    tags?: string[];
}

export const SnowwarLeaderboardLayoutAllTimeRegion = ({ captionAllTimeText, layout, onAllTimeRegion, srcAllTimeImage, tags }: SnowwarLeaderboardLayoutAllTimeRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="all_time_region"
            tags={tags}
            backgroundColor="#000000"
            onPointerTap={onAllTimeRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 226, width: 119, top: 0, height: 28, ...layout }}
        >
            <ThemeImage
                name="all_time_image"
                tags={[ 'bitmap' ]}
                src={srcAllTimeImage ?? layoutImage('right_blue.png')}
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
    );
};

/** Named region `scrollUp` of SnowwarLeaderboardLayout - configured through the parent's `scrollUp` prop. */
export interface SnowwarLeaderboardLayoutScrollUpProps {
    layout?: BoxLayout;
    onScrollUp?: () => void;
    tags?: string[];
}

export const SnowwarLeaderboardLayoutScrollUp = ({ layout, onScrollUp, tags }: SnowwarLeaderboardLayoutScrollUpProps) => {
    return (
        <Region
            name="scrollUp"
            tags={tags}
            onPointerTap={onScrollUp}
            cursor="pointer"
            layout={{ position: 'absolute', width: 58, top: 1, height: 28, ...layout }}
        >
            <ThemeImage
                src={undefined}
                layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 28 }}
            />
        </Region>
    );
};

/** Named region `scrollDown` of SnowwarLeaderboardLayout - configured through the parent's `scrollDown` prop. */
export interface SnowwarLeaderboardLayoutScrollDownProps {
    layout?: BoxLayout;
    onScrollDown?: () => void;
    tags?: string[];
}

export const SnowwarLeaderboardLayoutScrollDown = ({ layout, onScrollDown, tags }: SnowwarLeaderboardLayoutScrollDownProps) => {
    return (
        <Region
            name="scrollDown"
            tags={tags}
            onPointerTap={onScrollDown}
            cursor="pointer"
            layout={{ position: 'absolute', width: 58, bottom: 0, height: 28, ...layout }}
        >
            <ThemeImage
                src={undefined}
                layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 28 }}
            />
        </Region>
    );
};

/** Named region `borderContainer` of SnowwarLeaderboardLayout - configured through the parent's `borderContainer` prop. */
export interface SnowwarLeaderboardLayoutBorderContainerProps {
    layout?: BoxLayout;
    scrollDown?: SnowwarLeaderboardLayoutScrollDownProps;
    scrollUp?: SnowwarLeaderboardLayoutScrollUpProps;
    tags?: string[];
}

export const SnowwarLeaderboardLayoutBorderContainer = ({ layout, scrollDown, scrollUp, tags }: SnowwarLeaderboardLayoutBorderContainerProps) => {
    return (
        <Region
            name="borderContainer"
            tags={tags}
            layout={{ position: 'absolute', left: 40, width: 350, alignSelf: 'center', marginTop: -31, marginBottom: 31, height: 389, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="0"
                name="listBorder"
                blend={0.5}
                layout={{ position: 'absolute', width: 350, top: 28, height: 336 }}
            />
            <SnowwarLeaderboardLayoutScrollUp {...scrollUp} />
            <SnowwarLeaderboardLayoutScrollDown {...scrollDown} />
        </Region>
    );
};

/** Named region `list` of SnowwarLeaderboardLayout - configured through the parent's `list` prop. */
export interface SnowwarLeaderboardLayoutListProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const SnowwarLeaderboardLayoutList = ({ layout, tags }: SnowwarLeaderboardLayoutListProps) => {
    return (
        <Region
            name="list"
            tags={tags}
            layout={{ position: 'absolute', marginLeft: -3.5, marginRight: 3.5, width: 356, alignSelf: 'center', marginTop: -29.5, marginBottom: 29.5, height: 336, flexDirection: 'column', ...layout }}
        />
    );
};

/** Named region `previousWeek` of SnowwarLeaderboardLayout - configured through the parent's `previousWeek` prop. */
export interface SnowwarLeaderboardLayoutPreviousWeekProps {
    layout?: BoxLayout;
    onPreviousWeek?: () => void;
    tags?: string[];
}

export const SnowwarLeaderboardLayoutPreviousWeek = ({ layout, onPreviousWeek, tags }: SnowwarLeaderboardLayoutPreviousWeekProps) => {
    return (
        <Region
            name="previousWeek"
            tags={tags}
            onPointerTap={onPreviousWeek}
            cursor="pointer"
            layout={{ position: 'absolute', left: 17, width: 14, top: 199, height: 18, ...layout }}
        >
            <ThemeImage
                tags={[ 'bitmap' ]}
                src={layoutImage('scroll_left.png')}
                layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 18 }}
            />
        </Region>
    );
};

/** Named region `nextWeek` of SnowwarLeaderboardLayout - configured through the parent's `nextWeek` prop. */
export interface SnowwarLeaderboardLayoutNextWeekProps {
    layout?: BoxLayout;
    onNextWeek?: () => void;
    tags?: string[];
}

export const SnowwarLeaderboardLayoutNextWeek = ({ layout, onNextWeek, tags }: SnowwarLeaderboardLayoutNextWeekProps) => {
    return (
        <Region
            name="nextWeek"
            tags={tags}
            onPointerTap={onNextWeek}
            cursor="pointer"
            layout={{ position: 'absolute', left: 400, width: 14, top: 199, height: 18, ...layout }}
        >
            <ThemeImage
                tags={[ 'bitmap' ]}
                src={layoutImage('scroll_right.png')}
                layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 18 }}
            />
        </Region>
    );
};
