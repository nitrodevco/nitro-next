import { BoxLayout, CheckBox } from '#base/theme';

/** Row template `allow_joining_cbx` of DiscordSettingsLayout - pass real rows through its `items…` slot. */
export interface DiscordSettingsLayoutAllowJoiningCbxItemProps {
    layout?: BoxLayout;
    onAllowJoiningCbx?: () => void;
}

export const DiscordSettingsLayoutAllowJoiningCbxItem = ({ layout, onAllowJoiningCbx }: DiscordSettingsLayoutAllowJoiningCbxItemProps) => {
    return (
        <CheckBox
            variant="101"
            name="allow_joining_cbx"
            onPointerTap={onAllowJoiningCbx}
            layout={{ width: 21, height: 21, flexShrink: 0, minHeight: 21, maxHeight: 21, ...layout }}
        />
    );
};
