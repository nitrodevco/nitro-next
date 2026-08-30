import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { AchievementsResolutionsLayoutAchievementsItem } from './AchievementsResolutionsLayoutAchievementsItem';
import { AchievementsResolutionsLayoutTitleItem } from './AchievementsResolutionsLayoutTitleItem';

/** Named region `element_list` of AchievementsResolutionsLayout - configured through the parent's `elementList` prop. */
export interface AchievementsResolutionsLayoutElementListProps {
    achievementBadge?: ReactNode;
    captionAchievementDescription?: string;
    captionAchievementLevel?: string;
    captionAchievementName?: string;
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
}

export const AchievementsResolutionsLayoutElementList = ({ achievementBadge, captionAchievementDescription, captionAchievementLevel, captionAchievementName, itemsElementList, layout }: AchievementsResolutionsLayoutElementListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="element_list"
            layout={{ position: 'absolute', left: 0, right: -10, top: 0, maxWidth: 310, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsElementList ?? (
                <>
                    <AchievementsResolutionsLayoutTitleItem />
                    <AchievementsResolutionsLayoutAchievementsItem />
                </>
            )}
            <Region layout={{ flexShrink: 0, flexDirection: 'row' }}>
                <Region layout={{ width: 75, alignSelf: 'stretch', flexShrink: 0, justifyContent: 'center' }}>
                    <ThemeImage
                        src={layoutImage('common_star.png')}
                        layout={{ position: 'absolute', width: 75, top: 0, height: 90, minHeight: 90, maxHeight: 90 }}
                    />
                    <WidgetSlot
                        widgetType="badge_image"
                        name="achievement_badge"
                        options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                        layout={{ position: 'absolute', right: 12, width: 50, top: 14, height: 50 }}
                    >
                        {achievementBadge}
                    </WidgetSlot>
                </Region>
                <Region layout={{ flexShrink: 0, maxWidth: 220, flexDirection: 'column', gap: 5 }}>
                    <ThemeText
                        text={captionAchievementName ?? 'Achievement name '}
                        textStyle="text-style-il-heading-2"
                        textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                        name="achievement.name"
                        verticalAlign="top"
                        layout={{ alignSelf: 'stretch', height: 17, flexShrink: 0, maxWidth: 220 }}
                    />
                    <ThemeText
                        text={captionAchievementDescription ?? 'Achievement description'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                        name="achievement.description"
                        verticalAlign="top"
                        layout={{ alignSelf: 'stretch', height: 16, flexShrink: 0, minWidth: 0, maxWidth: 220 }}
                    />
                    <Region layout={{ alignSelf: 'stretch', height: 20, flexShrink: 0, flexDirection: 'row', gap: 2 }}>
                        <ThemeText
                            text={t('resolution.achievement.level')}
                            layout={{ width: 153, alignSelf: 'stretch', flexShrink: 0 }}
                        />
                        <ThemeText
                            text={captionAchievementLevel ?? '0'}
                            textStyle="text-style-il-heading-3"
                            name="achievement.level"
                            layout={{ width: 173, alignSelf: 'stretch', flexShrink: 0, minWidth: 0 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
