import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `task_achieved` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutTaskAchievedItemProps {
    badge?: ReactNode;
    captionDescription?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    srcAchieved?: string;
    visibleAchieved?: boolean;
    visibleBadge?: boolean;
    visibleBorder?: boolean;
    visibleDescription?: boolean;
    visibleTitle?: boolean;
}

export const TalentTrackLayoutTaskAchievedItem = ({ badge, captionDescription, captionTitle, layout, srcAchieved, visibleAchieved, visibleBadge, visibleBorder, visibleDescription, visibleTitle }: TalentTrackLayoutTaskAchievedItemProps) => {
    return (
        <Region
            name="task_achieved"
            layout={{ width: 210, height: 80, flexShrink: 0, ...layout }}
        >
            {(visibleBorder ?? true) && (
                <Border
                    variant="102"
                    name="border"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 60 }}
                >
                    {(visibleBadge ?? true) && (
                        <WidgetSlot
                            widgetType="badge_image"
                            name="badge"
                            options={{ 'badge_image:badge_id': 'ACH_RegistrationDuration3', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                            layout={{ position: 'absolute', left: 0, width: 60, top: 0, bottom: 0 }}
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
                </Border>
            )}
            {(visibleAchieved ?? true) && (
                <ThemeImage
                    name="achieved"
                    src={srcAchieved ?? layoutImage('talent_check_mark_circle.png')}
                    layout={{ position: 'absolute', left: 182, width: 20, top: 11, height: 20 }}
                />
            )}
        </Region>
    );
};
