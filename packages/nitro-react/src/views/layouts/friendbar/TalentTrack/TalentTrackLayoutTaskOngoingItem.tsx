import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `task_ongoing` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutTaskOngoingItemProps {
    badge?: ReactNode;
    captionDescription?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    onTaskOngoingRegion?: () => void;
    srcTaskProgressBg?: string;
    srcTaskProgressFg?: string;
    srcTaskProgressLeft?: string;
    srcTaskProgressRight?: string;
    taskOngoingRegion?: ReactNode;
    visibleBadge?: boolean;
    visibleBorder?: boolean;
    visibleDescription?: boolean;
    visibleTaskOngoingRegion?: boolean;
    visibleTaskProgress?: boolean;
    visibleTaskProgressBg?: boolean;
    visibleTaskProgressFg?: boolean;
    visibleTaskProgressLeft?: boolean;
    visibleTaskProgressRight?: boolean;
    visibleTitle?: boolean;
}

export const TalentTrackLayoutTaskOngoingItem = ({ badge, captionDescription, captionTitle, layout, onTaskOngoingRegion, srcTaskProgressBg, srcTaskProgressFg, srcTaskProgressLeft, srcTaskProgressRight, taskOngoingRegion, visibleBadge, visibleBorder, visibleDescription, visibleTaskOngoingRegion, visibleTaskProgress, visibleTaskProgressBg, visibleTaskProgressFg, visibleTaskProgressLeft, visibleTaskProgressRight, visibleTitle }: TalentTrackLayoutTaskOngoingItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="task_ongoing"
            layout={{ width: 210, height: 80, flexShrink: 0, ...layout }}
        >
            {(visibleBorder ?? true) && (
                <Border
                    variant="101"
                    name="border"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 60 }}
                >
                    {(visibleBadge ?? true) && (
                        <WidgetSlot
                            widgetType="badge_image"
                            name="badge"
                            options={{ 'badge_image:badge_id': 'ACH_RegistrationDuration3', 'badge_image:pivot_point': 'top center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:greyscale': 'true' }}
                            layout={{ position: 'absolute', left: 0, width: 60, top: 5, height: 45 }}
                        >
                            {badge}
                        </WidgetSlot>
                    )}
                    {(visibleTitle ?? true) && (
                        <ThemeText
                            text={captionTitle ?? 'TASK NAME'}
                            textStyle="text-style-il-heading-3"
                            textOptions={{ wordWrap: true, wordWrapWidth: 145 }}
                            name="title"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 60, width: 145, top: 10, height: 15, maxHeight: 28 }}
                        />
                    )}
                    {(visibleDescription ?? true) && (
                        <ThemeText
                            text={captionDescription ?? 'Task description!'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 145 }}
                            name="description"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 60, width: 145, top: 25, height: 16 }}
                        />
                    )}
                    {(visibleTaskProgress ?? true) && (
                        <Region
                            name="task_progress"
                            layout={{ position: 'absolute', left: 5, width: 50, top: 48, height: 6 }}
                        >
                            {(visibleTaskProgressLeft ?? true) && (
                                <ThemeImage
                                    name="task_progress_left"
                                    src={srcTaskProgressLeft ?? layoutImage('talent_task_progress_left.png')}
                                    layout={{ position: 'absolute', left: 0, width: 2, top: 0, height: 6 }}
                                />
                            )}
                            {(visibleTaskProgressRight ?? true) && (
                                <ThemeImage
                                    name="task_progress_right"
                                    src={srcTaskProgressRight ?? layoutImage('talent_task_progress_right.png')}
                                    layout={{ position: 'absolute', left: 48, width: 2, top: 0, height: 6 }}
                                />
                            )}
                            {(visibleTaskProgressBg ?? true) && (
                                <ThemeImage
                                    name="task_progress_bg"
                                    src={srcTaskProgressBg ?? layoutImage('talent_task_progress_bg.png')}
                                    layout={{ position: 'absolute', left: 2, width: 46, top: 0, height: 6 }}
                                />
                            )}
                            {(visibleTaskProgressFg ?? true) && (
                                <ThemeImage
                                    name="task_progress_fg"
                                    src={srcTaskProgressFg ?? layoutImage('talent_task_progress_fg.png')}
                                    layout={{ position: 'absolute', left: 1, width: 48, top: 0, height: 6 }}
                                />
                            )}
                        </Region>
                    )}
                </Border>
            )}
            {(visibleTaskOngoingRegion ?? true) && (
                <Region
                    name="task_ongoing_region"
                    tooltip={t('talent.track.common.view.progress.tooltip')}
                    onPointerTap={onTaskOngoingRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {taskOngoingRegion}
                </Region>
            )}
        </Region>
    );
};
