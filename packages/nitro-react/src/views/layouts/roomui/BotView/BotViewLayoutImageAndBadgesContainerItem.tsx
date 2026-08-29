import { ReactNode } from 'react';

import { Border, BoxLayout, Region, WidgetSlot } from '#base/theme';

/** Row template `image_and_badges_container` of BotViewLayout - pass real rows through its `items…` slot. */
export interface BotViewLayoutImageAndBadgesContainerItemProps {
    avatarImage?: ReactNode;
    badge0?: ReactNode;
    badge1?: ReactNode;
    badge2?: ReactNode;
    badge3?: ReactNode;
    badge4?: ReactNode;
    badgeGroup?: ReactNode;
    layout?: BoxLayout;
    visibleAvatarImage?: boolean;
    visibleBadge0?: boolean;
    visibleBadge1?: boolean;
    visibleBadge2?: boolean;
    visibleBadge3?: boolean;
    visibleBadge4?: boolean;
    visibleBadgeGroup?: boolean;
    visibleGreyBg?: boolean;
}

export const BotViewLayoutImageAndBadgesContainerItem = ({ avatarImage, badge0, badge1, badge2, badge3, badge4, badgeGroup, layout, visibleAvatarImage, visibleBadge0, visibleBadge1, visibleBadge2, visibleBadge3, visibleBadge4, visibleBadgeGroup, visibleGreyBg }: BotViewLayoutImageAndBadgesContainerItemProps) => {
    return (
        <Region
            name="image_and_badges_container"
            backgroundColor="#6d6d6d"
            layout={{ width: 193, height: 132, flexShrink: 0, ...layout }}
        >
            {(visibleGreyBg ?? true) && (
                <Border
                    variant="0"
                    name="grey_bg"
                    tintColor="#666666"
                    layout={{ position: 'absolute', left: 16, width: 67, top: 0, height: 130, justifyContent: 'center' }}
                >
                    {(visibleAvatarImage ?? true) && (
                        <WidgetSlot
                            widgetType="avatar_image"
                            name="avatar_image"
                            options={{ 'avatar_image:cropped': 'true', 'avatar_image:direction': 'southwest' }}
                            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 34, alignSelf: 'center', height: 84 }}
                        >
                            {avatarImage}
                        </WidgetSlot>
                    )}
                </Border>
            )}
            {(visibleBadge0 ?? true) && (
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_0"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 88, width: 42, top: 1, height: 42 }}
                >
                    {badge0}
                </WidgetSlot>
            )}
            {(visibleBadgeGroup ?? true) && (
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_group"
                    options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 131, width: 42, top: 1, height: 42 }}
                >
                    {badgeGroup}
                </WidgetSlot>
            )}
            {(visibleBadge1 ?? true) && (
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_1"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 88, width: 42, top: 44, height: 42 }}
                >
                    {badge1}
                </WidgetSlot>
            )}
            {(visibleBadge2 ?? true) && (
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_2"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 131, width: 42, top: 44, height: 42 }}
                >
                    {badge2}
                </WidgetSlot>
            )}
            {(visibleBadge3 ?? true) && (
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_3"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 88, width: 42, top: 87, height: 42 }}
                >
                    {badge3}
                </WidgetSlot>
            )}
            {(visibleBadge4 ?? true) && (
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_4"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 131, width: 42, top: 87, height: 42 }}
                >
                    {badge4}
                </WidgetSlot>
            )}
        </Region>
    );
};
