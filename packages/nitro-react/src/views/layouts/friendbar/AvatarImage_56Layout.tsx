import { BoxLayout, Region, WidgetSlot } from '#base/theme';

/** Generated from `56_avatar_image_xml` (layout "avatar_image", 90x130) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarImage_56LayoutProps {
    layout?: BoxLayout;
}

export const AvatarImage_56Layout = ({ layout }: AvatarImage_56LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 90, height: 130, ...layout }}>
            <WidgetSlot
                widgetType="avatar_image"
                name="avatar_image"
                layout={{ position: 'absolute', left: 0, width: 90, bottom: 0, height: 130 }}
            />
        </Region>
    );
};
