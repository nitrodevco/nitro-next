import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `104_AchievementResolutionProgress_xml` (layout "AchievementResolutionProgress", 419x273) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementResolutionProgressLayoutProps {
    elementList?: AchievementResolutionProgressLayoutElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const AchievementResolutionProgressLayout = ({ elementList, layout, onClose }: AchievementResolutionProgressLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('resolution.progress.title')}
            onClose={onClose}
            layout={{ width: 419, height: 273, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <AchievementResolutionProgressLayoutElementList {...elementList} />
            </Region>
        </Frame>
    );
};

/** Named region `progress_container` of AchievementResolutionProgressLayout - configured through the parent's `progressContainer` prop. */
export interface AchievementResolutionProgressLayoutProgressContainerProps {
    layout?: BoxLayout;
    srcAchievedLeft?: string;
    srcAchievedMid?: string;
    srcAchievedRight?: string;
    srcUnachievedLeft?: string;
    srcUnachievedMid?: string;
    srcUnachievedRight?: string;
}

export const AchievementResolutionProgressLayoutProgressContainer = ({ layout, srcAchievedLeft, srcAchievedMid, srcAchievedRight, srcUnachievedLeft, srcUnachievedMid, srcUnachievedRight }: AchievementResolutionProgressLayoutProgressContainerProps) => {
    return (
        <Region
            name="progress_container"
            layout={{ position: 'absolute', left: 0, width: 404, top: 0, height: 16, ...layout }}
        >
            <ThemeImage
                name="unachieved_left"
                src={srcUnachievedLeft ?? layoutImage('talent_unachieved_left.png')}
                layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 16 }}
            />
            <ThemeImage
                name="unachieved_mid"
                src={srcUnachievedMid ?? layoutImage('talent_unachieved_mid.png')}
                layout={{ position: 'absolute', left: 4, width: 396, top: 0, height: 16 }}
            />
            <ThemeImage
                name="unachieved_right"
                src={srcUnachievedRight ?? layoutImage('talent_unachieved_right.png')}
                layout={{ position: 'absolute', left: 396, width: 4, top: 0, height: 16 }}
            />
            <ThemeImage
                name="achieved_left"
                src={srcAchievedLeft ?? layoutImage('talent_achieved_left.png')}
                layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 16 }}
            />
            <ThemeImage
                name="achieved_mid"
                src={srcAchievedMid ?? layoutImage('talent_achieved_mid.png')}
                layout={{ position: 'absolute', left: 4, width: 396, top: 0, height: 16 }}
            />
            <ThemeImage
                name="achieved_right"
                src={srcAchievedRight ?? layoutImage('talent_achieved_right.png')}
                layout={{ position: 'absolute', left: 396, width: 4, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Row template `progress_main_container` of AchievementResolutionProgressLayout - pass real rows through its `items…` slot. */
export interface AchievementResolutionProgressLayoutProgressMainContainerItemProps {
    captionProgressText?: string;
    layout?: BoxLayout;
    progressContainer?: AchievementResolutionProgressLayoutProgressContainerProps;
}

export const AchievementResolutionProgressLayoutProgressMainContainerItem = ({ captionProgressText, layout, progressContainer }: AchievementResolutionProgressLayoutProgressMainContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="progress_main_container"
            layout={{ width: 404, height: 42, flexShrink: 0, ...layout }}
        >
            <AchievementResolutionProgressLayoutProgressContainer {...progressContainer} />
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
        </Region>
    );
};

/** Named region `element_list` of AchievementResolutionProgressLayout - configured through the parent's `elementList` prop. */
export interface AchievementResolutionProgressLayoutElementListProps {
    captionAchievementDesc?: string;
    captionAchievementName?: string;
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
    onResetButton?: () => void;
}

export const AchievementResolutionProgressLayoutElementList = ({ captionAchievementDesc, captionAchievementName, itemsElementList, layout, onResetButton }: AchievementResolutionProgressLayoutElementListProps) => {
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
                        />
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
                />
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
