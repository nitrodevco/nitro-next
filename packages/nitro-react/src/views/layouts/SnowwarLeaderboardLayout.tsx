import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `372_snowwar_leaderboard_xml` (layout "snowwar_leaderboard", 437x511) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarLeaderboardLayoutProps {
    layout?: BoxLayout;
    onChangeFriendsView?: () => void;
    onChangeGroupView?: () => void;
    onChangeView?: () => void;
    onClose?: () => void;
}

export const SnowwarLeaderboardLayout = ({ layout, onChangeFriendsView, onChangeGroupView, onChangeView, onClose }: SnowwarLeaderboardLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={32769}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 437, height: 511, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ThemeImage
                    name="background"
                    tags={[ 'bitmap' ]}
                    params={2192}
                    src={layoutImage('leaderboard_bg.png')}
                    layout={{ position: 'absolute', left: 0, width: 431, top: 0, height: 472 }}
                />
                <Region
                    name="this_week_region"
                    params={17}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 107, width: 119, top: 0, height: 28 }}
                >
                    <ThemeImage
                        name="this_week_image"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={layoutImage('left_black.png')}
                        layout={{ position: 'absolute', left: 0, width: 119, top: 0, height: 28 }}
                    />
                    <Region
                        name="this_week_text"
                        params={2192}
                        layout={{ position: 'absolute', left: 0, width: 119, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('snowwar.leaderboard.this_week')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="all_time_region"
                    params={17}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 226, width: 119, top: 0, height: 28 }}
                >
                    <ThemeImage
                        name="all_time_image"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={layoutImage('right_blue.png')}
                        layout={{ position: 'absolute', left: 0, width: 119, top: 0, height: 28 }}
                    />
                    <Region
                        name="all_time_text"
                        params={2192}
                        layout={{ position: 'absolute', left: 0, width: 119, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('snowwar.leaderboard.all_time')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="borderContainer"
                    params={3145744}
                    layout={{ position: 'absolute', left: 40, width: 350, top: 30, height: 389 }}
                >
                    <Border
                        variant="0"
                        name="listBorder"
                        params={8388816}
                        blend={0.5}
                        layout={{ position: 'absolute', left: 0, width: 350, top: 28, height: 336 }}
                    />
                    <Region
                        name="scrollUp"
                        params={209}
                        layout={{ position: 'absolute', left: 146, width: 58, top: 1, height: 28 }}
                    >
                        <ThemeImage
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 28 }}
                        />
                    </Region>
                    <Region
                        name="scrollDown"
                        params={1233}
                        layout={{ position: 'absolute', left: 146, width: 58, top: 361, height: 28 }}
                    >
                        <ThemeImage
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 28 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="changeView"
                    params={1}
                    layout={{ position: 'absolute', left: 0, width: 150, top: 445, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPointerTap={onChangeView}
                    cursor="pointer"
                >
                    <ThemeText
                        text={t('snowwar.leaderboard.all')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Region
                    name="list"
                    params={3145920}
                    layout={{ position: 'absolute', left: 37, width: 356, top: 58, height: 336, flexDirection: 'column' }}
                />
                <Region
                    name="previousWeek"
                    params={17}
                    layout={{ position: 'absolute', left: 17, width: 14, top: 199, height: 18 }}
                >
                    <ThemeImage
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={layoutImage('scroll_left.png')}
                        layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 18 }}
                    />
                </Region>
                <Region
                    name="nextWeek"
                    params={17}
                    layout={{ position: 'absolute', left: 400, width: 14, top: 199, height: 18 }}
                >
                    <ThemeImage
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={layoutImage('scroll_right.png')}
                        layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 18 }}
                    />
                </Region>
                <Region
                    name="reset_text_stroke"
                    params={16}
                    layout={{ position: 'absolute', left: 251, width: 49, top: 397, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="Reset: "
                        textOptions={{ fill: '#1077ac' }}
                    />
                </Region>
                <Region
                    name="reset_text"
                    params={16}
                    layout={{ position: 'absolute', left: 251, width: 49, top: 397, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="Reset: "
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="changeGroupView"
                    params={1}
                    layout={{ position: 'absolute', left: 280, width: 150, top: 445, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPointerTap={onChangeGroupView}
                    cursor="pointer"
                >
                    <ThemeText
                        text={t('people.groups.title')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Region
                    name="changeFriendsView"
                    params={1}
                    layout={{ position: 'absolute', left: 135, width: 150, top: 445, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPointerTap={onChangeFriendsView}
                    cursor="pointer"
                >
                    <ThemeText
                        text={t('snowwar.leaderboard.friends')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
