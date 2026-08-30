import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

/** Row template `advanced_container` of RoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RoomSettingsLayoutAdvancedContainerItemProps {
    captionAllowFoodConsumeText?: string;
    captionAllowPetsText?: string;
    captionMuteAllPetsText?: string;
    captionPetsContainer?: string;
    layout?: BoxLayout;
    onAllowFoodconsumeCheckbox?: () => void;
    onAllowPetsCheckbox?: () => void;
    onMuteAllPetsCheckbox?: () => void;
    visibleAllowFoodconsumeCheckbox?: boolean;
    visibleAllowFoodConsumeText?: boolean;
    visibleAllowPetsCheckbox?: boolean;
    visibleAllowPetsText?: boolean;
    visibleMuteAllPetsCheckbox?: boolean;
    visibleMuteAllPetsText?: boolean;
    visiblePetsContainer?: boolean;
}

export const RoomSettingsLayoutAdvancedContainerItem = ({ captionAllowFoodConsumeText, captionAllowPetsText, captionMuteAllPetsText, captionPetsContainer, layout, onAllowFoodconsumeCheckbox, onAllowPetsCheckbox, onMuteAllPetsCheckbox, visibleAllowFoodconsumeCheckbox, visibleAllowFoodConsumeText, visibleAllowPetsCheckbox, visibleAllowPetsText, visibleMuteAllPetsCheckbox, visibleMuteAllPetsText, visiblePetsContainer }: RoomSettingsLayoutAdvancedContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="advanced_container"
            layout={{ width: 278, height: 82, flexShrink: 0, ...layout }}
        >
            {(visibleAllowPetsCheckbox ?? true) && (
                <CheckBox
                    variant="0"
                    name="allow_pets_checkbox"
                    onPointerTap={onAllowPetsCheckbox}
                    layout={{ position: 'absolute', left: 3, width: 270, top: 19, height: 20 }}
                />
            )}
            {(visibleAllowPetsText ?? true) && (
                <ThemeText
                    text={captionAllowPetsText ?? t('navigator.roomsettings.allowpets')}
                    textStyle="text-style-u-regular"
                    name="allow_pets_text"
                    layout={{ position: 'absolute', left: 18, width: 191, top: 18, height: 17 }}
                />
            )}
            {(visibleAllowFoodconsumeCheckbox ?? true) && (
                <CheckBox
                    variant="0"
                    name="allow_foodconsume_checkbox"
                    onPointerTap={onAllowFoodconsumeCheckbox}
                    layout={{ position: 'absolute', left: 3, width: 270, top: 39, height: 20 }}
                />
            )}
            {(visibleAllowFoodConsumeText ?? true) && (
                <ThemeText
                    text={captionAllowFoodConsumeText ?? t('navigator.roomsettings.allowfoodconsume')}
                    textStyle="text-style-u-regular"
                    name="allow_food_consume_text"
                    layout={{ position: 'absolute', left: 18, width: 245, top: 38, height: 17 }}
                />
            )}
            {(visibleMuteAllPetsCheckbox ?? true) && (
                <CheckBox
                    variant="0"
                    name="mute_all_pets_checkbox"
                    onPointerTap={onMuteAllPetsCheckbox}
                    layout={{ position: 'absolute', left: 3, width: 270, top: 59, height: 20 }}
                />
            )}
            {(visibleMuteAllPetsText ?? true) && (
                <ThemeText
                    text={captionMuteAllPetsText ?? t('navigator.roomsettings.mute_all_pets')}
                    textStyle="text-style-u-regular"
                    name="mute_all_pets_text"
                    layout={{ position: 'absolute', left: 18, width: 245, top: 58, height: 17 }}
                />
            )}
            {(visiblePetsContainer ?? true) && (
                <ThemeText
                    text={captionPetsContainer ?? t('navigator.roomsettings.pets')}
                    textStyle="text-style-u-bold"
                    name="pets_container"
                    layout={{ position: 'absolute', left: 0, width: 162, top: 0, height: 17 }}
                />
            )}
        </Region>
    );
};
