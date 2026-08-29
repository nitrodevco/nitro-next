import { BoxLayout, Region, WidgetSlot } from '#base/theme';

/** Generated from `1135_avatar_image_view_xml` (layout "avatar_image_view", 90x120) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarImageViewLayoutProps {
    avatarImageView?: AvatarImageViewLayoutAvatarImageViewProps;
    layout?: BoxLayout;
}

export const AvatarImageViewLayout = ({ avatarImageView, layout }: AvatarImageViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 90, height: 120, ...layout }}>
            <AvatarImageViewLayoutAvatarImageView {...avatarImageView} />
        </Region>
    );
};

/** Named region `avatar_image_view` of AvatarImageViewLayout - configured through the parent's `avatarImageView` prop. */
export interface AvatarImageViewLayoutAvatarImageViewProps {
    layout?: BoxLayout;
}

export const AvatarImageViewLayoutAvatarImageView = ({ layout }: AvatarImageViewLayoutAvatarImageViewProps) => {
    return (
        <Region
            name="avatar_image_view"
            layout={{ position: 'absolute', left: 0, width: 90, top: 0, height: 120, ...layout }}
        >
            <WidgetSlot
                widgetType="avatar_image"
                name="avatar_image"
                options={{ 'avatar_image:direction': 'south' }}
                layout={{ position: 'absolute', left: 0, width: 90, top: -10, height: 130 }}
            />
        </Region>
    );
};
