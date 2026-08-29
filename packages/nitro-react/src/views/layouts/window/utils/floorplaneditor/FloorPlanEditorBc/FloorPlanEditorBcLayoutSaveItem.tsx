import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `save` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutSaveItemProps {
    layout?: BoxLayout;
    onSave?: () => void;
}

export const FloorPlanEditorBcLayoutSaveItem = ({ layout, onSave }: FloorPlanEditorBcLayoutSaveItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="5"
            name="save"
            tintColor="#0bb3e3"
            onPointerTap={onSave}
            textStyle="text-style-button-shiny-bold"
            layout={{ width: 120, height: 35, flexShrink: 0, minWidth: 90, maxWidth: 120, ...layout }}
        >
            {t('floor.plan.editor.save')}
        </ButtonThick>
    );
};
