import { ReactNode } from 'react';

import { BoxLayout, Region, WidgetSlot } from '#base/theme';

/** Generated from `56_avatar_image_xml` (layout "avatar_image", 90x130) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarImage_56LayoutProps {
    avatarImage?: ReactNode;
    layout?: BoxLayout;
}

export const AvatarImage_56Layout = ({ avatarImage, layout }: AvatarImage_56LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 90, height: 130, ...layout }}>
            <WidgetSlot
                widgetType="avatar_image"
                name="avatar_image"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 130 }}
            >
                {avatarImage}
            </WidgetSlot>
        </Region>
    );
};
