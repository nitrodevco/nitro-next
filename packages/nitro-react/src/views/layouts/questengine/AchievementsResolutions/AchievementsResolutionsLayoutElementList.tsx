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
            layout={{ position: 'absolute', left: 0, top: 0, maxWidth: 310, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsElementList ?? (
                <>
                    <AchievementsResolutionsLayoutTitleItem />
                    <AchievementsResolutionsLayoutAchievementsItem />
                </>
            )}
            <Region layout={{ flexShrink: 0, flexDirection: 'row' }}>
                <Region layout={{ width: 75, height: 90, flexShrink: 0, justifyContent: 'center' }}>
                    <ThemeImage
                        src={layoutImage('common_star.png')}
                        layout={{ position: 'absolute', width: 75, top: 0, height: 90, minHeight: 90, maxHeight: 90 }}
                    />
                    <WidgetSlot
                        widgetType="badge_image"
                        name="achievement_badge"
                        options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                        layout={{ position: 'absolute', left: 13, width: 50, top: 14, height: 50 }}
                    >
                        {achievementBadge}
                    </WidgetSlot>
                </Region>
                <Region layout={{ flexShrink: 0, maxWidth: 220, flexDirection: 'column', gap: 5 }}>
                    <Region
                        name="achievement.name"
                        layout={{ width: 220, height: 17, flexShrink: 0, maxWidth: 220, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionAchievementName ?? 'Achievement name '}
                            textStyle="text-style-il-heading-2"
                            textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                        />
                    </Region>
                    <Region
                        name="achievement.description"
                        layout={{ width: 220, height: 16, flexShrink: 0, minWidth: 0, maxWidth: 220, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionAchievementDescription ?? 'Achievement description'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                        />
                    </Region>
                    <Region layout={{ width: 220, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2 }}>
                        <Region layout={{ width: 153, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            {t('resolution.achievement.level')}
                        </Region>
                        <Region
                            name="achievement.level"
                            layout={{ width: 173, height: 15, flexShrink: 0, minWidth: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionAchievementLevel ?? '0'}
                                textStyle="text-style-il-heading-3"
                            />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
