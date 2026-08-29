import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { TalentTrackLayoutRewardList, TalentTrackLayoutRewardListProps } from './TalentTrackLayoutRewardList';

/** Row template `level_reward` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutLevelRewardItemProps {
    captionDescriptionAchieved?: string;
    captionDescriptionLocked?: string;
    captionTitleAchieved?: string;
    captionTitleLocked?: string;
    captionUnlocked?: string;
    layout?: BoxLayout;
    rewardList?: TalentTrackLayoutRewardListProps;
    srcAchieved?: string;
    srcLocked?: string;
    visibleAchieved?: boolean;
    visibleBorder?: boolean;
    visibleDescriptionAchieved?: boolean;
    visibleDescriptionLocked?: boolean;
    visibleLocked?: boolean;
    visibleRewardList?: boolean;
    visibleTitleAchieved?: boolean;
    visibleTitleLocked?: boolean;
    visibleUnlocked?: boolean;
}

export const TalentTrackLayoutLevelRewardItem = ({ captionDescriptionAchieved, captionDescriptionLocked, captionTitleAchieved, captionTitleLocked, captionUnlocked, layout, rewardList, srcAchieved, srcLocked, visibleAchieved, visibleBorder, visibleDescriptionAchieved, visibleDescriptionLocked, visibleLocked, visibleRewardList, visibleTitleAchieved, visibleTitleLocked, visibleUnlocked }: TalentTrackLayoutLevelRewardItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="level_reward"
            layout={{ width: 350, height: 180, flexShrink: 0, ...layout }}
        >
            {(visibleBorder ?? true) && (
                <Border
                    variant="104"
                    name="border"
                    tintColor="#bdbdbd"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 155 }}
                >
                    {(visibleUnlocked ?? true) && (
                        <Region
                            name="unlocked"
                            layout={{ position: 'absolute', left: 10, width: 127, top: 8, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionUnlocked ?? t('talent.track.common.unlocked')}
                                textStyle="text-style-il-small"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    )}
                    {(visibleTitleAchieved ?? true) && (
                        <Region
                            name="title_achieved"
                            layout={{ position: 'absolute', left: 10, width: 4, top: 22, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionTitleAchieved ?? ''}
                                textStyle="text-style-il-heading-2"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    )}
                    {(visibleTitleLocked ?? true) && (
                        <Region
                            name="title_locked"
                            layout={{ position: 'absolute', left: 10, width: 4, top: 22, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionTitleLocked ?? ''}
                                textStyle="text-style-il-heading-2"
                            />
                        </Region>
                    )}
                    {(visibleDescriptionAchieved ?? true) && (
                        <Region
                            name="description_achieved"
                            layout={{ position: 'absolute', left: 10, width: 330, top: 38, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionDescriptionAchieved ?? 'Reward description achieved'}
                                textStyle="text-style-il-regular-white"
                                textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
                            />
                        </Region>
                    )}
                    {(visibleDescriptionLocked ?? false) && (
                        <Region
                            name="description_locked"
                            layout={{ position: 'absolute', left: 10, width: 330, top: 38, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionDescriptionLocked ?? 'Reward description locked'}
                                textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
                            />
                        </Region>
                    )}
                    {(visibleRewardList ?? true) && (
                        <TalentTrackLayoutRewardList {...rewardList} />
                    )}
                </Border>
            )}
            {(visibleLocked ?? true) && (
                <ThemeImage
                    name="locked"
                    src={srcLocked ?? layoutImage('talent_locked_stripe.png')}
                    layout={{ position: 'absolute', left: 1, width: 70, top: 21, height: 25 }}
                />
            )}
            {(visibleAchieved ?? true) && (
                <ThemeImage
                    name="achieved"
                    src={srcAchieved ?? layoutImage('talent_check_mark_circle.png')}
                    layout={{ position: 'absolute', right: 10, width: 20, top: 11, height: 20 }}
                />
            )}
        </Region>
    );
};
