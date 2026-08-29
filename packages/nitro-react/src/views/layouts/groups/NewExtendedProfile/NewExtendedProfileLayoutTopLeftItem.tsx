import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText, WidgetSlot } from '#base/theme';

import { NewExtendedProfileLayoutUserInfo, NewExtendedProfileLayoutUserInfoProps } from './NewExtendedProfileLayoutUserInfo';

/** Row template `top_left` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutTopLeftItemProps {
    avatarImage?: ReactNode;
    badge0?: ReactNode;
    badge1?: ReactNode;
    badge2?: ReactNode;
    badge3?: ReactNode;
    badge4?: ReactNode;
    captionChangeBadges?: string;
    captionChangeLooks?: string;
    layout?: BoxLayout;
    onChangeBadges?: () => void;
    onChangeLooks?: () => void;
    userInfo?: NewExtendedProfileLayoutUserInfoProps;
    visibleAvatar?: boolean;
    visibleAvatarImage?: boolean;
    visibleBadge0?: boolean;
    visibleBadge1?: boolean;
    visibleBadge2?: boolean;
    visibleBadge3?: boolean;
    visibleBadge4?: boolean;
    visibleBadges?: boolean;
    visibleChangeBadges?: boolean;
    visibleChangeLooks?: boolean;
    visibleChangeOwnAttributes?: boolean;
    visibleUserInfo?: boolean;
}

export const NewExtendedProfileLayoutTopLeftItem = ({ avatarImage, badge0, badge1, badge2, badge3, badge4, captionChangeBadges, captionChangeLooks, layout, onChangeBadges, onChangeLooks, userInfo, visibleAvatar, visibleAvatarImage, visibleBadge0, visibleBadge1, visibleBadge2, visibleBadge3, visibleBadge4, visibleBadges, visibleChangeBadges, visibleChangeLooks, visibleChangeOwnAttributes, visibleUserInfo }: NewExtendedProfileLayoutTopLeftItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="top_left"
            layout={{ width: 257, height: 192, flexShrink: 0, ...layout }}
        >
            {(visibleAvatar ?? true) && (
                <Region
                    name="avatar"
                    layout={{ position: 'absolute', left: 0, width: 56, top: 0, height: 113 }}
                >
                    {(visibleAvatarImage ?? true) && (
                        <WidgetSlot
                            widgetType="avatar_image"
                            name="avatar_image"
                            options={{ 'avatar_image:cropped': 'true' }}
                            layout={{ position: 'absolute', right: 12, width: 34, bottom: 29, height: 84 }}
                        >
                            {avatarImage}
                        </WidgetSlot>
                    )}
                </Region>
            )}
            {(visibleUserInfo ?? true) && (
                <NewExtendedProfileLayoutUserInfo {...userInfo} />
            )}
            {(visibleChangeOwnAttributes ?? true) && (
                <Region
                    name="change_own_attributes"
                    layout={{ position: 'absolute', left: 0, width: 257, top: 117, height: 15 }}
                >
                    {(visibleChangeLooks ?? true) && (
                        <Region
                            name="change_looks"
                            layout={{ position: 'absolute', left: 0, width: 160, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            onPointerTap={onChangeLooks}
                            cursor="pointer"
                        >
                            <ThemeText
                                text={captionChangeLooks ?? t('extended.profile.change.looks')}
                                textStyle="text-style-il-link-regular"
                            />
                        </Region>
                    )}
                    {(visibleChangeBadges ?? true) && (
                        <Region
                            name="change_badges"
                            layout={{ position: 'absolute', right: 3, width: 169, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            onPointerTap={onChangeBadges}
                            cursor="pointer"
                        >
                            <ThemeText
                                text={captionChangeBadges ?? t('extended.profile.change.badges')}
                                textStyle="text-style-il-link-regular"
                            />
                        </Region>
                    )}
                </Region>
            )}
            {(visibleBadges ?? true) && (
                <Border
                    variant="2"
                    name="badges"
                    tintColor="#afafaf"
                    layout={{ position: 'absolute', left: 1, width: 256, top: 136, height: 55 }}
                >
                    {(visibleBadge0 ?? true) && (
                        <WidgetSlot
                            widgetType="badge_image"
                            name="badge_0"
                            options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                            layout={{ position: 'absolute', left: 7, width: 42, top: 6, height: 42 }}
                        >
                            {badge0}
                        </WidgetSlot>
                    )}
                    {(visibleBadge1 ?? true) && (
                        <WidgetSlot
                            widgetType="badge_image"
                            name="badge_1"
                            options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                            layout={{ position: 'absolute', left: 57, width: 42, top: 6, height: 42 }}
                        >
                            {badge1}
                        </WidgetSlot>
                    )}
                    {(visibleBadge2 ?? true) && (
                        <WidgetSlot
                            widgetType="badge_image"
                            name="badge_2"
                            options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                            layout={{ position: 'absolute', left: 107, width: 42, top: 6, height: 42 }}
                        >
                            {badge2}
                        </WidgetSlot>
                    )}
                    {(visibleBadge3 ?? true) && (
                        <WidgetSlot
                            widgetType="badge_image"
                            name="badge_3"
                            options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                            layout={{ position: 'absolute', left: 157, width: 42, top: 6, height: 42 }}
                        >
                            {badge3}
                        </WidgetSlot>
                    )}
                    {(visibleBadge4 ?? true) && (
                        <WidgetSlot
                            widgetType="badge_image"
                            name="badge_4"
                            options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                            layout={{ position: 'absolute', left: 207, width: 42, top: 6, height: 42 }}
                        >
                            {badge4}
                        </WidgetSlot>
                    )}
                </Border>
            )}
        </Region>
    );
};
