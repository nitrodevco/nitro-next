import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `meter_container` of CommunityGoalVotingLayout - configured through the parent's `meterContainer` prop. */
export interface CommunityGoalVotingLayoutMeterContainerProps {
    captionCommunityTotalStatus?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
    srcMeterLevel0?: string;
    srcMeterLevel1?: string;
    srcMeterLevel1Icon?: string;
    srcMeterLevel1IconLocked?: string;
    srcMeterLevel2?: string;
    srcMeterLevel2Icon?: string;
    srcMeterLevel2IconLocked?: string;
    srcMeterLevel3?: string;
    srcMeterLevel3Icon?: string;
    srcMeterLevel3IconLocked?: string;
    srcMeterNeedle?: string;
    visibleMeterLevel1Icon?: boolean;
    visibleMeterLevel1IconLocked?: boolean;
    visibleMeterLevel2Icon?: boolean;
    visibleMeterLevel2IconLocked?: boolean;
    visibleMeterLevel3Icon?: boolean;
    visibleMeterLevel3IconLocked?: boolean;
}

export const CommunityGoalVotingLayoutMeterContainer = ({ captionCommunityTotalStatus, colorableTextColor, layout, srcMeterLevel0, srcMeterLevel1, srcMeterLevel1Icon, srcMeterLevel1IconLocked, srcMeterLevel2, srcMeterLevel2Icon, srcMeterLevel2IconLocked, srcMeterLevel3, srcMeterLevel3Icon, srcMeterLevel3IconLocked, srcMeterNeedle, visibleMeterLevel1Icon, visibleMeterLevel1IconLocked, visibleMeterLevel2Icon, visibleMeterLevel2IconLocked, visibleMeterLevel3Icon, visibleMeterLevel3IconLocked }: CommunityGoalVotingLayoutMeterContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="meter_container"
            layout={{ position: 'absolute', right: 0, width: 226, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                name="community_total_status"
                layout={{ position: 'absolute', left: 10, width: 200, top: 145, height: 16, minWidth: 200, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionCommunityTotalStatus ?? t('landing.view.community.meter')}
                    textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 200, align: 'center' }}
                />
            </Region>
            <ThemeImage
                name="meter_level_0"
                src={srcMeterLevel0 ?? '${image.library.url}reception/meter_level_0.png'}
                layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, width: 183, top: 0, height: 144 }}
            />
            <ThemeImage
                name="meter_level_1"
                src={srcMeterLevel1 ?? '${image.library.url}reception/meter_level_1.png'}
                layout={{ position: 'absolute', left: 30, width: 88, top: 39, height: 93 }}
            />
            {(visibleMeterLevel1Icon ?? false) && (
                <ThemeImage
                    name="meter_level_1_icon"
                    src={srcMeterLevel1Icon}
                    layout={{ position: 'absolute', left: 30, width: 88, top: 39, height: 93 }}
                />
            )}
            {(visibleMeterLevel1IconLocked ?? false) && (
                <ThemeImage
                    name="meter_level_1_icon_locked"
                    src={srcMeterLevel1IconLocked}
                    layout={{ position: 'absolute', left: 30, width: 88, top: 39, height: 93 }}
                />
            )}
            <ThemeImage
                name="meter_level_2"
                src={srcMeterLevel2 ?? '${image.library.url}reception/meter_level_2.png'}
                layout={{ position: 'absolute', marginLeft: 3.5, marginRight: -3.5, width: 133, top: 10, height: 78 }}
            />
            {(visibleMeterLevel2Icon ?? false) && (
                <ThemeImage
                    name="meter_level_2_icon"
                    src={srcMeterLevel2Icon}
                    layout={{ position: 'absolute', marginLeft: 3.5, marginRight: -3.5, width: 133, top: 10, height: 78 }}
                />
            )}
            {(visibleMeterLevel2IconLocked ?? false) && (
                <ThemeImage
                    name="meter_level_2_icon_locked"
                    src={srcMeterLevel2IconLocked}
                    layout={{ position: 'absolute', marginLeft: 3.5, marginRight: -3.5, width: 133, top: 10, height: 78 }}
                />
            )}
            <ThemeImage
                name="meter_level_3"
                src={srcMeterLevel3 ?? '${image.library.url}reception/meter_level_3.png'}
                layout={{ position: 'absolute', left: 125, width: 69, top: 39, height: 93 }}
            />
            {(visibleMeterLevel3Icon ?? false) && (
                <ThemeImage
                    name="meter_level_3_icon"
                    src={srcMeterLevel3Icon}
                    layout={{ position: 'absolute', left: 125, width: 69, top: 39, height: 93 }}
                />
            )}
            {(visibleMeterLevel3IconLocked ?? false) && (
                <ThemeImage
                    name="meter_level_3_icon_locked"
                    src={srcMeterLevel3IconLocked}
                    layout={{ position: 'absolute', left: 125, width: 69, top: 39, height: 93 }}
                />
            )}
            <ThemeImage
                name="meter_needle"
                src={srcMeterNeedle ?? layoutImage('landing_view_needle_meter_needle0.png')}
                layout={{ position: 'absolute', left: 60, width: 96, top: 48, height: 85 }}
            />
        </Region>
    );
};
