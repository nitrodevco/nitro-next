import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `import_export` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutImportExportItemProps {
    layout?: BoxLayout;
    onImportExport?: () => void;
}

export const FloorPlanEditorBcLayoutImportExportItem = ({ layout, onImportExport }: FloorPlanEditorBcLayoutImportExportItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="3"
            name="import_export"
            onPointerTap={onImportExport}
            textStyle="text-style-button-shiny-bold"
            layout={{ width: 120, height: 35, flexShrink: 0, minWidth: 90, maxWidth: 120, ...layout }}
        >
            {t('floor.plan.editor.import.export')}
        </ButtonThick>
    );
};
