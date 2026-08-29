import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `description_container` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutDescriptionContainerItemProps {
    avatarImage?: ReactNode;
    badge?: ReactNode;
    layout?: BoxLayout;
    onAvatarImageProfileLink?: () => void;
    visibleAvatarImage?: boolean;
    visibleAvatarImageProfileLink?: boolean;
    visibleBadge?: boolean;
    visibleGreyBg?: boolean;
}

export const RentableBotViewLayoutDescriptionContainerItem = ({ avatarImage, badge, layout, onAvatarImageProfileLink, visibleAvatarImage, visibleAvatarImageProfileLink, visibleBadge, visibleGreyBg }: RentableBotViewLayoutDescriptionContainerItemProps) => {
    return (
        <Region
            name="description_container"
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
                    onPointerTap={onAvatarImageProfileLink}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 17, width: 66, top: 2, height: 127, justifyContent: 'center' }}
                >
                    <ThemeImage
                        src={layoutImage('infostand_bot_info_bg.png')}
                        layout={{ position: 'absolute', left: 0, width: 66, top: 0, height: 127 }}
                    />
                    {(visibleAvatarImage ?? true) && (
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
            {(visibleBadge ?? true) && (
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge"
                    options={{ 'badge_image:badge_id': 'BOT', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 116, width: 42, top: 21, height: 42 }}
                >
                    {badge}
                </WidgetSlot>
            )}
        </Region>
    );
};
