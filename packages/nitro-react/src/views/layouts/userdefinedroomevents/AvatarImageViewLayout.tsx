import { ReactNode } from 'react';

import { BoxLayout, Region, WidgetSlot } from '#base/theme';

/** Generated from `1135_avatar_image_view_xml` (layout "avatar_image_view", 90x120) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarImageViewLayoutProps {
    avatarImage?: ReactNode;
    layout?: BoxLayout;
}

export const AvatarImageViewLayout = ({ avatarImage, layout }: AvatarImageViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 90, height: 120, ...layout }}>
            <Region
                name="avatar_image_view"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <WidgetSlot
                    widgetType="avatar_image"
                    name="avatar_image"
                    options={{ 'avatar_image:direction': 'south' }}
                    layout={{ position: 'absolute', left: 0, right: 0, top: -10, bottom: 0 }}
                >
                    {avatarImage}
                </WidgetSlot>
            </Region>
        </Region>
    );
};
