import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, ContainerButton, Region, ThemeText } from '#base/theme';

/** Row template `toggle_breeding_permission` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutToggleBreedingPermissionItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    onToggleBreedingPermissionCheckbox?: () => void;
    visibleButton?: boolean;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
    visibleLabel?: boolean;
    visibleToggleBreedingPermissionCheckbox?: boolean;
}

export const OwnPetMenuLayoutToggleBreedingPermissionItem = ({ captionLabel, layout, onButton, onToggleBreedingPermissionCheckbox, visibleButton, visibleGroups, visibleLabel, visibleToggleBreedingPermissionCheckbox }: OwnPetMenuLayoutToggleBreedingPermissionItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.action ?? true) && (
            <Region
                name="toggle_breeding_permission"
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
                        {(visibleToggleBreedingPermissionCheckbox ?? true) && (
                            <CheckBox
                                variant="1"
                                name="toggle_breeding_permission_checkbox"
                                onPointerTap={onToggleBreedingPermissionCheckbox}
                                layout={{ position: 'absolute', left: 9, width: 20, top: 17, height: 20 }}
                            />
                        )}
                        {(visibleLabel ?? true) && (
                            <ThemeText
                                text={captionLabel ?? t('infostand.button.toggle_breeding_permission')}
                                textStyle="text-style-u-regular"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 78 }}
                                name="label"
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 26, width: 78, alignSelf: 'center', height: 46, maxWidth: 78, maxHeight: 46 }}
                            />
                        )}
                    </ContainerButton>
                )}
            </Region>
        )
    );
};
