import { BoxLayout, CheckBox } from '#base/theme';

/** Row template `share_activity_cbx` of DiscordSettingsLayout - pass real rows through its `items…` slot. */
export interface DiscordSettingsLayoutShareActivityCbxItemProps {
    layout?: BoxLayout;
    onShareActivityCbx?: () => void;
}

export const DiscordSettingsLayoutShareActivityCbxItem = ({ layout, onShareActivityCbx }: DiscordSettingsLayoutShareActivityCbxItemProps) => {
    return (
        <CheckBox
            variant="101"
            name="share_activity_cbx"
            onPointerTap={onShareActivityCbx}
            layout={{ width: 21, height: 21, flexShrink: 0, minHeight: 21, maxHeight: 21, ...layout }}
        />
    );
};
