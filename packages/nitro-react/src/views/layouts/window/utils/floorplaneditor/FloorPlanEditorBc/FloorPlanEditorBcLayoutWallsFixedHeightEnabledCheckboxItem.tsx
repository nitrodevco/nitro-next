import { BoxLayout, CheckBox } from '#base/theme';

/** Row template `walls_fixed_height_enabled_checkbox` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutWallsFixedHeightEnabledCheckboxItemProps {
    layout?: BoxLayout;
    onWallsFixedHeightEnabledCheckbox?: () => void;
}

export const FloorPlanEditorBcLayoutWallsFixedHeightEnabledCheckboxItem = ({ layout, onWallsFixedHeightEnabledCheckbox }: FloorPlanEditorBcLayoutWallsFixedHeightEnabledCheckboxItemProps) => {
    return (
        <CheckBox
            variant="3"
            name="walls_fixed_height_enabled_checkbox"
            onPointerTap={onWallsFixedHeightEnabledCheckbox}
            layout={{ width: 18, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
