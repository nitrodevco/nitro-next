import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, Shape, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { Main_100LayoutSpacerItem } from './Main_100LayoutSpacerItem';
import { Main_100LayoutTrackDescTxtItem } from './Main_100LayoutTrackDescTxtItem';
import { Main_100LayoutTrackInstructionsTxtItem } from './Main_100LayoutTrackInstructionsTxtItem';
import { Main_100LayoutTrackTitleRegionItem } from './Main_100LayoutTrackTitleRegionItem';

/** Named region `cutout` of Main_100Layout - configured through the parent's `cutout` prop. */
export interface Main_100LayoutCutoutProps {
    captionPointsTotalCollectedTxt?: string;
    captionRewardsCollectedTxt?: string;
    itemsTrackInfo?: ReactNode;
    layout?: BoxLayout;
    ownAvatar?: ReactNode;
    recolorLight?: string;
    recolorMedium?: string;
}

export const Main_100LayoutCutout = ({ captionPointsTotalCollectedTxt, captionRewardsCollectedTxt, itemsTrackInfo, layout, ownAvatar, recolorLight, recolorMedium }: Main_100LayoutCutoutProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cutout"
            layout={{ position: 'absolute', left: 0, width: 245, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="cutout"
                layout={{ position: 'absolute', right: -32, width: 35, top: 2, bottom: 0 }}
            >
                <Shape
                    shape="ellipse"
                    color={recolorLight ?? '#ddebf9'}
                    strokeColor="#000000"
                    strokeThickness={2}
                    radius={40}
                    layout={{ position: 'absolute', left: -35, width: 70, top: -59, height: 300 }}
                />
            </Region>
            <Border
                variant="15"
                name="profile"
                tintColor={recolorLight ?? '#ddebf9'}
                layout={{ position: 'absolute', left: 0, width: 264, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <WidgetSlot
                    widgetType="avatar_image"
                    name="own_avatar"
                    layout={{ position: 'absolute', left: -3, width: 90, top: -15, height: 130 }}
                >
                    {ownAvatar}
                </WidgetSlot>
                <Region layout={{ position: 'absolute', right: 2, width: 175, top: -1, bottom: 120 }}>
                    <Region
                        name="track_info"
                        layout={{ position: 'absolute', left: 0, width: 160, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 73, flexDirection: 'column', gap: 1 }}
                    >
                        {itemsTrackInfo ?? (
                            <>
                                <Main_100LayoutTrackTitleRegionItem />
                                <Main_100LayoutSpacerItem />
                                <Main_100LayoutTrackDescTxtItem />
                                <Main_100LayoutTrackInstructionsTxtItem />
                            </>
                        )}
                    </Region>
                </Region>
                <Border
                    variant="15"
                    name="points_total_border"
                    tintColor={recolorMedium ?? '#cfe2f9'}
                    layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 179, top: 122, height: 62, justifyContent: 'center' }}
                >
                    <Region layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 72, top: 11, height: 20, minHeight: 24, maxHeight: 24, flexDirection: 'row', gap: 4 }}>
                        <ThemeImage
                            src={layoutImage('reward_track_point_large.png')}
                            layout={{ width: 27, height: 18, flexShrink: 0 }}
                        />
                        <ThemeText
                            text={captionPointsTotalCollectedTxt ?? '125'}
                            name="points_total_collected_txt"
                            layout={{ width: 41, height: 28, flexShrink: 0 }}
                        />
                    </Region>
                    <ThemeText
                        text={t('reward_track.profile.points_collected')}
                        textOptions={{ align: 'center' }}
                        layout={{ position: 'absolute', left: 10, width: 160, top: 36, height: 18 }}
                    />
                </Border>
                <Shape
                    name="splitter"
                    color={recolorLight ?? '#ddebf9'}
                    strokeThickness={1}
                    layout={{ position: 'absolute', left: 16, width: 231, top: 196, height: 2 }}
                />
                <Region layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 247, top: 204, height: 30, flexDirection: 'row', gap: 6 }}>
                    <ThemeImage
                        src={layoutImage('reward_track_checkmark.png')}
                        layout={{ width: 17, height: 15, flexShrink: 0 }}
                    />
                    <ThemeText
                        text={captionRewardsCollectedTxt ?? t('reward_track.profile.rewards_collected')}
                        name="rewards_collected_txt"
                        layout={{ width: 224, height: 17, flexShrink: 0 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
