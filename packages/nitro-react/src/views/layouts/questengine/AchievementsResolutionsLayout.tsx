import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `103_AchievementsResolutions_xml` (layout "AchievementResolutions", 312x525) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementsResolutionsLayoutProps {
    captionDisabledReason?: string;
    elementList?: AchievementsResolutionsLayoutElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onSaveButton?: () => void;
}

export const AchievementsResolutionsLayout = ({ captionDisabledReason, elementList, layout, onClose, onSaveButton }: AchievementsResolutionsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('resolution.title')}
            onClose={onClose}
            layout={{ width: 312, height: 525, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Border
                    variant="103"
                    layout={{ position: 'absolute', left: 0, width: 310, top: 50, height: 389, minWidth: 310, maxWidth: 310 }}
                />
                <AchievementsResolutionsLayoutElementList {...elementList} />
                <Button
                    variant="102"
                    name="save_button"
                    onPointerTap={onSaveButton}
                    layout={{ position: 'absolute', marginLeft: -3, marginRight: 3, width: 180, top: 395, height: 30, minWidth: 180, maxWidth: 180 }}
                >
                    {t('resolution.button.ok')}
                </Button>
                <Region
                    name="disabled.reason"
                    visible={false}
                    layout={{ position: 'absolute', left: 5, width: 300, top: 403, height: 15, minWidth: 0, maxWidth: 300, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionDisabledReason ?? 'Disabled for reason.'}
                        textStyle="text-style-il-border"
                        textOptions={{ wordWrap: true, wordWrapWidth: 300, align: 'center' }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="countdown"
                    name="countdown_widget"
                    layout={{ position: 'absolute', left: 103, width: 99, top: 444, height: 37 }}
                />
            </Region>
        </Frame>
    );
};

/** Row template `title` of AchievementsResolutionsLayout - pass real rows through its `items…` slot. */
export interface AchievementsResolutionsLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const AchievementsResolutionsLayoutTitleItem = ({ captionTitle, layout, tags }: AchievementsResolutionsLayoutTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="title"
            tags={tags}
            layout={{ width: 264, height: 50, flexShrink: 0, minHeight: 50, maxHeight: 50, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTitle ?? t('resolution.header')}
                textOptions={{ wordWrap: true, wordWrapWidth: 264 }}
            />
        </Region>
    );
};

/** Row template `achievements` of AchievementsResolutionsLayout - pass real rows through its `items…` slot. */
export interface AchievementsResolutionsLayoutAchievementsItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const AchievementsResolutionsLayoutAchievementsItem = ({ layout, tags }: AchievementsResolutionsLayoutAchievementsItemProps) => {
    return (
        <Region
            name="achievements"
            tags={tags}
            layout={{ width: 290, height: 230, flexShrink: 0, flexDirection: 'row', flexWrap: 'wrap', gap: 6, ...layout }}
        />
    );
};

/** Named region `element_list` of AchievementsResolutionsLayout - configured through the parent's `elementList` prop. */
export interface AchievementsResolutionsLayoutElementListProps {
    captionAchievementDescription?: string;
    captionAchievementLevel?: string;
    captionAchievementName?: string;
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const AchievementsResolutionsLayoutElementList = ({ captionAchievementDescription, captionAchievementLevel, captionAchievementName, itemsElementList, layout, tags }: AchievementsResolutionsLayoutElementListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="element_list"
            tags={tags}
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
                    />
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
                            <ThemeText text={t('resolution.achievement.level')} />
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
