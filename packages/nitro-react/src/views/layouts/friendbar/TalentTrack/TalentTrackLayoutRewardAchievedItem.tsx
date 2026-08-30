import { ReactNode } from 'react';

import { Border, BoxLayout, ThemeText, WidgetSlot } from '#base/theme';

/** Row template `reward_achieved` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutRewardAchievedItemProps {
    achieved?: ReactNode;
    captionDescription?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    visibleAchieved?: boolean;
    visibleDescription?: boolean;
    visibleTitle?: boolean;
}

export const TalentTrackLayoutRewardAchievedItem = ({ achieved, captionDescription, captionTitle, layout, visibleAchieved, visibleDescription, visibleTitle }: TalentTrackLayoutRewardAchievedItemProps) => {
    return (
        <Border
            variant="104"
            name="reward_achieved"
            blend={0.3}
            layout={{ width: 200, height: 60, flexShrink: 0, ...layout }}
        >
            {(visibleAchieved ?? true) && (
                <WidgetSlot
                    widgetType="badge_image"
                    name="achieved"
                    options={{ 'badge_image:type': 'perk', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, bottom: 0 }}
                >
                    {achieved}
                </WidgetSlot>
            )}
            {(visibleTitle ?? true) && (
                <ThemeText
                    text={captionTitle ?? 'Reward name'}
                    textStyle="text-style-il-heading-3"
                    textOptions={{ fill: '#ffffff' }}
                    name="title"
                    layout={{ position: 'absolute', left: 60, width: 68, top: 10, height: 15 }}
                />
            )}
            {(visibleDescription ?? true) && (
                <ThemeText
                    text={captionDescription ?? 'Reward description'}
                    textStyle="text-style-il-regular-white"
                    textOptions={{ wordWrap: true, wordWrapWidth: 135 }}
                    name="description"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 60, width: 135, top: 25, height: 16 }}
                />
            )}
        </Border>
    );
};
