import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { AchievementResolutionProgressLayoutProgressMainContainerItem } from './AchievementResolutionProgressLayoutProgressMainContainerItem';

/** Named region `element_list` of AchievementResolutionProgressLayout - configured through the parent's `elementList` prop. */
export interface AchievementResolutionProgressLayoutElementListProps {
    achievementBadge?: ReactNode;
    captionAchievementDesc?: string;
    captionAchievementName?: string;
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
    onResetButton?: () => void;
    timeLeftWidget?: ReactNode;
}

export const AchievementResolutionProgressLayoutElementList = ({ achievementBadge, captionAchievementDesc, captionAchievementName, itemsElementList, layout, onResetButton, timeLeftWidget }: AchievementResolutionProgressLayoutElementListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="element_list"
            layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsElementList ?? (
                <AchievementResolutionProgressLayoutProgressMainContainerItem />
            )}
            <Border
                variant="102"
                layout={{ width: 404, height: 112, flexShrink: 0, minWidth: 338 }}
            >
                <Region layout={{ position: 'absolute', left: 11, top: 10, flexDirection: 'row', gap: 10 }}>
                    <Region layout={{ width: 82, height: 90, flexShrink: 0, justifyContent: 'center' }}>
                        <ThemeImage
                            src={layoutImage('icons_hilighter_yellow.png')}
                            layout={{ position: 'absolute', width: 82, top: 0, height: 90, minHeight: 90, maxHeight: 90 }}
                        />
                        <WidgetSlot
                            widgetType="badge_image"
                            name="achievement_badge"
                            options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                            layout={{ position: 'absolute', left: 16, width: 50, top: 15, height: 50 }}
                        >
                            {achievementBadge}
                        </WidgetSlot>
                    </Region>
                    <Region layout={{ flexShrink: 0, flexDirection: 'column', gap: 5 }}>
                        <Region
                            name="achievement.name"
                            layout={{ width: 110, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionAchievementName ?? 'Achievement name'}
                                textStyle="text-style-il-heading-2"
                            />
                        </Region>
                        <Region
                            name="achievement.desc"
                            layout={{ width: 294, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionAchievementDesc ?? 'Achievement description'}
                                textOptions={{ wordWrap: true, wordWrapWidth: 294 }}
                            />
                        </Region>
                        <Button
                            variant="102"
                            name="reset_button"
                            onPointerTap={onResetButton}
                            layout={{ width: 153, height: 32, flexShrink: 0 }}
                        >
                            {t('resolution.progress.reset')}
                        </Button>
                    </Region>
                </Region>
            </Border>
            <ThemeImage
                src={layoutImage('illumina_horizontal_separator.png')}
                layout={{ width: 404, height: 2, flexShrink: 0 }}
            />
            <Region layout={{ width: 404, height: 39, flexShrink: 0 }}>
                <WidgetSlot
                    widgetType="countdown"
                    name="time_left_widget"
                    layout={{ position: 'absolute', left: 142, width: 99, top: 1, height: 37 }}
                >
                    {timeLeftWidget}
                </WidgetSlot>
                <Region layout={{ position: 'absolute', left: -11, width: 144, top: 2, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <ThemeText
                        text={t('resolution.progress.time.left')}
                        textStyle="text-style-u-headline-small"
                        textOptions={{ align: 'right' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
