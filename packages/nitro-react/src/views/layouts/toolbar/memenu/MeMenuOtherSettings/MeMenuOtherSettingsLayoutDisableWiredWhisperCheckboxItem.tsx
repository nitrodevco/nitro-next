import { BoxLayout, CheckBox } from '#base/theme';

/** Row template `disable_wired_whisper_checkbox` of MeMenuOtherSettingsLayout - pass real rows through its `items…` slot. */
export interface MeMenuOtherSettingsLayoutDisableWiredWhisperCheckboxItemProps {
    layout?: BoxLayout;
    onDisableWiredWhisperCheckbox?: () => void;
}

export const MeMenuOtherSettingsLayoutDisableWiredWhisperCheckboxItem = ({ layout, onDisableWiredWhisperCheckbox }: MeMenuOtherSettingsLayoutDisableWiredWhisperCheckboxItemProps) => {
    return (
        <CheckBox
            variant="3"
            name="disable_wired_whisper_checkbox"
            onPointerTap={onDisableWiredWhisperCheckbox}
            layout={{ width: 15, height: 15, flexShrink: 0, ...layout }}
        />
    );
};
