import { BoxLayout, CheckBox } from '#base/theme';

/** Row template `hide_in_hidden_cbx` of DiscordSettingsLayout - pass real rows through its `items…` slot. */
export interface DiscordSettingsLayoutHideInHiddenCbxItemProps {
    layout?: BoxLayout;
    onHideInHiddenCbx?: () => void;
}

export const DiscordSettingsLayoutHideInHiddenCbxItem = ({ layout, onHideInHiddenCbx }: DiscordSettingsLayoutHideInHiddenCbxItemProps) => {
    return (
        <CheckBox
            variant="101"
            name="hide_in_hidden_cbx"
            onPointerTap={onHideInHiddenCbx}
            layout={{ width: 21, height: 21, flexShrink: 0, minHeight: 21, maxHeight: 21, ...layout }}
        />
    );
};
