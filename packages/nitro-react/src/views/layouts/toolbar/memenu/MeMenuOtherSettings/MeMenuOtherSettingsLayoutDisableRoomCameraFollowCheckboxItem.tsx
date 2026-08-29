import { BoxLayout, CheckBox } from '#base/theme';

/** Row template `disable_room_camera_follow_checkbox` of MeMenuOtherSettingsLayout - pass real rows through its `items…` slot. */
export interface MeMenuOtherSettingsLayoutDisableRoomCameraFollowCheckboxItemProps {
    layout?: BoxLayout;
    onDisableRoomCameraFollowCheckbox?: () => void;
}

export const MeMenuOtherSettingsLayoutDisableRoomCameraFollowCheckboxItem = ({ layout, onDisableRoomCameraFollowCheckbox }: MeMenuOtherSettingsLayoutDisableRoomCameraFollowCheckboxItemProps) => {
    return (
        <CheckBox
            variant="3"
            name="disable_room_camera_follow_checkbox"
            onPointerTap={onDisableRoomCameraFollowCheckbox}
            layout={{ width: 15, height: 15, flexShrink: 0, ...layout }}
        />
    );
};
