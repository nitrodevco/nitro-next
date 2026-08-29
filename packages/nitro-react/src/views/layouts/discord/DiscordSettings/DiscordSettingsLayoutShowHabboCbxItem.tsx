import { BoxLayout, CheckBox } from '#base/theme';

/** Row template `show_habbo_cbx` of DiscordSettingsLayout - pass real rows through its `items…` slot. */
export interface DiscordSettingsLayoutShowHabboCbxItemProps {
    layout?: BoxLayout;
    onShowHabboCbx?: () => void;
}

export const DiscordSettingsLayoutShowHabboCbxItem = ({ layout, onShowHabboCbx }: DiscordSettingsLayoutShowHabboCbxItemProps) => {
    return (
        <CheckBox
            variant="101"
            name="show_habbo_cbx"
            onPointerTap={onShowHabboCbx}
            layout={{ width: 21, height: 21, flexShrink: 0, minHeight: 21, maxHeight: 21, ...layout }}
        />
    );
};
