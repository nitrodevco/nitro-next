import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `progress_container` of TalentTrackLayout - configured through the parent's `progressContainer` prop. */
export interface TalentTrackLayoutProgressContainerProps {
    captionProgressText?: string;
    layout?: BoxLayout;
    onProgressContainer?: () => void;
    progressBalloon?: ReactNode;
    progressNeedle?: ReactNode;
    srcAchievedMid?: string;
    srcAvatarGlow?: string;
    srcProgressLevelDivider?: string;
    srcUnachievedMid?: string;
}

export const TalentTrackLayoutProgressContainer = ({ captionProgressText, layout, onProgressContainer, progressBalloon, progressNeedle, srcAchievedMid, srcAvatarGlow, srcProgressLevelDivider, srcUnachievedMid }: TalentTrackLayoutProgressContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="progress_container"
            onPointerTap={onProgressContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 998, top: 309, height: 80, ...layout }}
        >
            <Region
                name="progress_text"
                layout={{ position: 'absolute', left: 24, width: 196, top: 18, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionProgressText ?? t('talent.track.common.progress.title')}
                    textStyle="text-style-il-heading-2"
                />
            </Region>
            <ThemeImage
                name="unachieved_mid"
                src={srcUnachievedMid ?? layoutImage('talent_unachieved_mid.png')}
                layout={{ position: 'absolute', left: 0, width: 1000, top: 40, height: 16 }}
            />
            <ThemeImage
                name="achieved_mid"
                src={srcAchievedMid ?? layoutImage('talent_achieved_mid.png')}
                layout={{ position: 'absolute', left: 0, width: 500, top: 40, height: 16 }}
            />
            <ThemeImage
                name="progress_level_divider"
                src={srcProgressLevelDivider ?? layoutImage('talent_achieved_div.png')}
                layout={{ position: 'absolute', left: 100, width: 2, top: 40, height: 11 }}
            />
            <ThemeImage
                name="avatar_glow"
                src={srcAvatarGlow ?? layoutImage('talent_avatar_glow.png')}
                layout={{ position: 'absolute', left: 25, width: 55, top: 15, height: 55 }}
            />
            <WidgetSlot
                widgetType="avatar_image"
                name="progress_needle"
                options={{ 'avatar_image:figure': 'hr-1863-45.hd-180-2.ch-210-66.lg-270-82.sh-300-91.wa-2007-.ri-1-', 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true' }}
                layout={{ position: 'absolute', left: 36, width: 33, bottom: 19, height: 34 }}
            >
                {progressNeedle}
            </WidgetSlot>
            <WidgetSlot
                widgetType="balloon"
                name="progress_balloon"
                layout={{ position: 'absolute', left: 42, width: 215, top: 64, height: 30 }}
            >
                {progressBalloon}
                <Region layout={{ position: 'absolute', left: 0, width: 215, top: 0, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('talent.track.common.progress.position')}
                        textStyle="text-style-il-regular-white"
                    />
                </Region>
            </WidgetSlot>
        </Region>
    );
};
