import { BoxLayout, Frame } from '#base/theme';

/** Generated from `1115_user_info_frame_xml` (layout "user_info_frame", 292x225) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserInfoFrameLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const UserInfoFrameLayout = ({ layout, onClose }: UserInfoFrameLayoutProps) => {
    return (
        <Frame
            variant="0"
            caption="User info"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 292, height: 225, minWidth: 292, minHeight: 225, ...layout }}
        />
    );
};
