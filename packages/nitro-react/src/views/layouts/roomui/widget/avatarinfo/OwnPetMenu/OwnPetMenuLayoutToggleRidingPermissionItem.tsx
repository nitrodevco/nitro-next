import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, ContainerButton, Region, ThemeText } from '#base/theme';

/** Row template `toggle_riding_permission` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutToggleRidingPermissionItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    onToggleRidingPermissionCheckbox?: () => void;
    visibleButton?: boolean;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
    visibleLabel?: boolean;
    visibleToggleRidingPermissionCheckbox?: boolean;
}

export const OwnPetMenuLayoutToggleRidingPermissionItem = ({ captionLabel, layout, onButton, onToggleRidingPermissionCheckbox, visibleButton, visibleGroups, visibleLabel, visibleToggleRidingPermissionCheckbox }: OwnPetMenuLayoutToggleRidingPermissionItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.action ?? true) && (
            <Region
                name="toggle_riding_permission"
                layout={{ width: 101, height: 40, flexShrink: 0, ...layout }}
            >
                {(visibleGroups?.action ?? true) && (visibleButton ?? true) && (
                    <ContainerButton
                        variant="3"
                        name="button"
                        tintColor="#2d2a27"
                        onPointerTap={onButton}
                        layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -2 }}
                    >
                        {(visibleToggleRidingPermissionCheckbox ?? true) && (
                            <CheckBox
                                variant="1"
                                name="toggle_riding_permission_checkbox"
                                onPointerTap={onToggleRidingPermissionCheckbox}
                                layout={{ position: 'absolute', left: 9, width: 20, top: 17, height: 20 }}
                            />
                        )}
                        {(visibleLabel ?? true) && (
                            <ThemeText
                                text={captionLabel ?? t('infostand.button.toggle_riding_permission')}
                                textStyle="text-style-u-regular"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 78 }}
                                name="label"
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 26, width: 78, alignSelf: 'center', height: 40, maxWidth: 78, maxHeight: 46 }}
                            />
                        )}
                    </ContainerButton>
                )}
            </Region>
        )
    );
};
