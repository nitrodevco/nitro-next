import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `cancel` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutCancelItemProps {
    layout?: BoxLayout;
    onCancel?: () => void;
}

export const FloorPlanEditorBcLayoutCancelItem = ({ layout, onCancel }: FloorPlanEditorBcLayoutCancelItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="3"
            name="cancel"
            onPointerTap={onCancel}
            textStyle="text-style-button-shiny-bold"
            layout={{ width: 120, height: 35, flexShrink: 0, minWidth: 90, maxWidth: 120, ...layout }}
        >
            {t('floor.plan.editor.cancel')}
        </ButtonThick>
    );
};
