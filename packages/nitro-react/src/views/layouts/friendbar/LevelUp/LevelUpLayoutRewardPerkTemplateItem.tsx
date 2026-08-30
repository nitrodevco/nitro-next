import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Row template `reward_perk_template` of LevelUpLayout - pass real rows through its `items…` slot. */
export interface LevelUpLayoutRewardPerkTemplateItemProps {
    captionPerkName?: string;
    layout?: BoxLayout;
    perkImage?: ReactNode;
    visiblePerkImage?: boolean;
    visiblePerkName?: boolean;
}

export const LevelUpLayoutRewardPerkTemplateItem = ({ captionPerkName, layout, perkImage, visiblePerkImage, visiblePerkName }: LevelUpLayoutRewardPerkTemplateItemProps) => {
    return (
        <Region
            name="reward_perk_template"
            layout={{ width: 99, height: 35, flexShrink: 0, ...layout }}
        >
            {(visiblePerkImage ?? true) && (
                <WidgetSlot
                    widgetType="badge_image"
                    name="perk_image"
                    options={{ 'badge_image:type': 'perk', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 0, width: 35, top: 0, bottom: 0 }}
                >
                    {perkImage}
                </WidgetSlot>
            )}
            {(visiblePerkName ?? true) && (
                <ThemeText
                    text={captionPerkName ?? 'perk name'}
                    textStyle="text-style-il-heading-2"
                    textOptions={{ fill: '#222222' }}
                    name="perk_name"
                    layout={{ position: 'absolute', left: 37, width: 62, alignSelf: 'center', height: 17 }}
                />
            )}
        </Region>
    );
};
