import { BoxLayout, CheckBox } from '#base/theme';

/** Row template `ignore_room_invites_checkbox` of MeMenuOtherSettingsLayout - pass real rows through its `items…` slot. */
export interface MeMenuOtherSettingsLayoutIgnoreRoomInvitesCheckboxItemProps {
    layout?: BoxLayout;
    onIgnoreRoomInvitesCheckbox?: () => void;
}

export const MeMenuOtherSettingsLayoutIgnoreRoomInvitesCheckboxItem = ({ layout, onIgnoreRoomInvitesCheckbox }: MeMenuOtherSettingsLayoutIgnoreRoomInvitesCheckboxItemProps) => {
    return (
        <CheckBox
            variant="3"
            name="ignore_room_invites_checkbox"
            onPointerTap={onIgnoreRoomInvitesCheckbox}
            layout={{ width: 15, height: 15, flexShrink: 0, ...layout }}
        />
    );
};
