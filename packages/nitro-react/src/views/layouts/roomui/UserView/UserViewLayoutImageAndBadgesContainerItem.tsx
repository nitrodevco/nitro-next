import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, WidgetSlot } from '#base/theme';

/** Row template `image_and_badges_container` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutImageAndBadgesContainerItemProps {
    avatarImage?: ReactNode;
    badge0?: ReactNode;
    badge1?: ReactNode;
    badge2?: ReactNode;
    badge3?: ReactNode;
    badge4?: ReactNode;
    badgeGroup?: ReactNode;
    layout?: BoxLayout;
    onAvatarImageProfileLink?: () => void;
    visibleAvatarImage?: boolean;
    visibleAvatarImageProfileLink?: boolean;
    visibleBadge0?: boolean;
    visibleBadge1?: boolean;
    visibleBadge2?: boolean;
    visibleBadge3?: boolean;
    visibleBadge4?: boolean;
    visibleBadgeGroup?: boolean;
    visibleGreyBg?: boolean;
}

export const UserViewLayoutImageAndBadgesContainerItem = ({ avatarImage, badge0, badge1, badge2, badge3, badge4, badgeGroup, layout, onAvatarImageProfileLink, visibleAvatarImage, visibleAvatarImageProfileLink, visibleBadge0, visibleBadge1, visibleBadge2, visibleBadge3, visibleBadge4, visibleBadgeGroup, visibleGreyBg }: UserViewLayoutImageAndBadgesContainerItemProps) => {
    const t = useTranslation();

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
                    layout={{ position: 'absolute', left: 16, width: 67, top: 0, height: 130 }}
                />
            )}
            {(visibleAvatarImageProfileLink ?? true) && (
                <Region
                    name="avatar_image_profile_link"
                    tooltip={t('infostand.profile.link.tooltip')}
                    onPointerTap={onAvatarImageProfileLink}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 17, width: 66, top: 2, height: 127, justifyContent: 'center' }}
                >
                    {(visibleAvatarImage ?? false) && (
                        <WidgetSlot
                            widgetType="avatar_image"
                            name="avatar_image"
                            options={{ 'avatar_image:cropped': 'true', 'avatar_image:direction': 'southwest' }}
                            layout={{ position: 'absolute', width: 34, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 84 }}
                        >
                            {avatarImage}
                        </WidgetSlot>
                    )}
                </Region>
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
