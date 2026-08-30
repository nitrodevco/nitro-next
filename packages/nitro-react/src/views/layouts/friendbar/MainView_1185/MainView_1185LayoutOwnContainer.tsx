import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { MainView_1185LayoutRankTypeImgItem2 } from './MainView_1185LayoutRankTypeImgItem2';
import { MainView_1185LayoutScoreTxtItem2 } from './MainView_1185LayoutScoreTxtItem2';

/** Named region `own_container` of MainView_1185Layout - configured through the parent's `ownContainer` prop. */
export interface MainView_1185LayoutOwnContainerProps {
    captionRankOwn?: string;
    captionUsernameTxt?: string;
    itemsRightAligned?: ReactNode;
    layout?: BoxLayout;
    onRegionProfile?: () => void;
    srcCanvas?: string;
    srcOwnBg?: string;
    tintCanvas?: string;
}

export const MainView_1185LayoutOwnContainer = ({ captionRankOwn, captionUsernameTxt, itemsRightAligned, layout, onRegionProfile, srcCanvas, srcOwnBg, tintCanvas }: MainView_1185LayoutOwnContainerProps) => {
    return (
        <Region
            name="own_container"
            layout={{ position: 'absolute', left: 3, right: 3, bottom: 39, height: 43, ...layout }}
        >
            <ThemeImage
                name="own_bg"
                src={srcOwnBg ?? layoutImage('badge_leaderboard_entry_self.png')}
                layout={{ position: 'absolute', left: 0, width: 370, top: 0, height: 43 }}
            />
            <Region
                name="rank_container"
                layout={{ position: 'absolute', left: 5, width: 45, alignSelf: 'center', height: 39, justifyContent: 'center' }}
            >
                <Border
                    variant="14"
                    name="rank_border"
                    tintColor="#6382aa"
                    layout={{ position: 'absolute', width: 27, top: 7, height: 25 }}
                >
                    <ThemeText
                        text={captionRankOwn ?? '--'}
                        textOptions={{ fill: '#ffffff' }}
                        name="rank_own"
                        layout={{ position: 'absolute', left: 6, top: 2, height: 20 }}
                    />
                </Border>
            </Region>
            <Region
                name="region_profile"
                onPointerTap={onRegionProfile}
                cursor="pointer"
                layout={{ position: 'absolute', left: 51, right: 275, top: 4, height: 35 }}
            >
                <Region layout={{ position: 'absolute', left: -3, width: 50, top: -18, height: 70, overflow: 'hidden', justifyContent: 'center' }}>
                    <ThemeImage
                        name="canvas"
                        src={srcCanvas}
                        tint={tintCanvas}
                        layout={{ position: 'absolute', width: 10, alignSelf: 'center', height: 10, overflow: 'hidden' }}
                    />
                </Region>
            </Region>
            <ThemeText
                text={captionUsernameTxt ?? 'sirjonasxx-XIVXXI'}
                name="username_txt"
                layout={{ position: 'absolute', left: 97, width: 99, alignSelf: 'center', height: 17 }}
            />
            <Region
                name="right_aligned"
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
    );
};
