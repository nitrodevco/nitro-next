import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `progress_main_container` of AchievementResolutionProgressLayout - pass real rows through its `items…` slot. */
export interface AchievementResolutionProgressLayoutProgressMainContainerItemProps {
    captionProgressText?: string;
    layout?: BoxLayout;
    srcAchievedLeft?: string;
    srcAchievedMid?: string;
    srcAchievedRight?: string;
    srcUnachievedLeft?: string;
    srcUnachievedMid?: string;
    srcUnachievedRight?: string;
    visibleAchievedLeft?: boolean;
    visibleAchievedMid?: boolean;
    visibleAchievedRight?: boolean;
    visibleProgressContainer?: boolean;
    visibleProgressText?: boolean;
    visibleUnachievedLeft?: boolean;
    visibleUnachievedMid?: boolean;
    visibleUnachievedRight?: boolean;
}

export const AchievementResolutionProgressLayoutProgressMainContainerItem = ({ captionProgressText, layout, srcAchievedLeft, srcAchievedMid, srcAchievedRight, srcUnachievedLeft, srcUnachievedMid, srcUnachievedRight, visibleAchievedLeft, visibleAchievedMid, visibleAchievedRight, visibleProgressContainer, visibleProgressText, visibleUnachievedLeft, visibleUnachievedMid, visibleUnachievedRight }: AchievementResolutionProgressLayoutProgressMainContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="progress_main_container"
            layout={{ width: 404, height: 42, flexShrink: 0, ...layout }}
        >
            {(visibleProgressContainer ?? true) && (
                <Region
                    name="progress_container"
                    layout={{ position: 'absolute', left: 0, width: 404, top: 0, height: 16 }}
                >
                    {(visibleUnachievedLeft ?? true) && (
                        <ThemeImage
                            name="unachieved_left"
                            src={srcUnachievedLeft ?? layoutImage('talent_unachieved_left.png')}
                            layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 16 }}
                        />
                    )}
                    {(visibleUnachievedMid ?? true) && (
                        <ThemeImage
                            name="unachieved_mid"
                            src={srcUnachievedMid ?? layoutImage('talent_unachieved_mid.png')}
                            layout={{ position: 'absolute', left: 4, width: 396, top: 0, height: 16 }}
                        />
                    )}
                    {(visibleUnachievedRight ?? true) && (
                        <ThemeImage
                            name="unachieved_right"
                            src={srcUnachievedRight ?? layoutImage('talent_unachieved_right.png')}
                            layout={{ position: 'absolute', left: 396, width: 4, top: 0, height: 16 }}
                        />
                    )}
                    {(visibleAchievedLeft ?? true) && (
                        <ThemeImage
                            name="achieved_left"
                            src={srcAchievedLeft ?? layoutImage('talent_achieved_left.png')}
                            layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 16 }}
                        />
                    )}
                    {(visibleAchievedMid ?? true) && (
                        <ThemeImage
                            name="achieved_mid"
                            src={srcAchievedMid ?? layoutImage('talent_achieved_mid.png')}
                            layout={{ position: 'absolute', left: 4, width: 396, top: 0, height: 16 }}
                        />
                    )}
                    {(visibleAchievedRight ?? true) && (
                        <ThemeImage
                            name="achieved_right"
                            src={srcAchievedRight ?? layoutImage('talent_achieved_right.png')}
                            layout={{ position: 'absolute', left: 396, width: 4, top: 0, height: 16 }}
                        />
                    )}
                </Region>
            )}
            {(visibleProgressText ?? true) && (
                <Region
                    name="progress_text"
                    layout={{ position: 'absolute', left: 0, width: 404, top: 15, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionProgressText ?? t('resolution.progress.progress')}
                        textStyle="text-style-il-heading-2"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            )}
        </Region>
    );
};
