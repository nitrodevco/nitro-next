import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `reload` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutReloadItemProps {
    layout?: BoxLayout;
    onReload?: () => void;
}

export const FloorPlanEditorBcLayoutReloadItem = ({ layout, onReload }: FloorPlanEditorBcLayoutReloadItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="3"
            name="reload"
            onPointerTap={onReload}
            textStyle="text-style-button-shiny-bold"
            layout={{ width: 120, height: 35, flexShrink: 0, minWidth: 100, maxWidth: 120, ...layout }}
        >
            {t('floor.plan.editor.reload')}
        </ButtonThick>
    );
};
