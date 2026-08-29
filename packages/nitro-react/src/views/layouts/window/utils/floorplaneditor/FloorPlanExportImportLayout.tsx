import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, TextInput } from '#base/theme';

/** Generated from `3195_floor_plan_export_import_xml` (layout "floor_plan_export_import", 379x374) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FloorPlanExportImportLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onRevert?: () => void;
    onSave?: () => void;
}

export const FloorPlanExportImportLayout = ({ layout, onClose, onRevert, onSave }: FloorPlanExportImportLayoutProps) => {
    const t = useTranslation();
    const [ dataValue, setDataValue ] = useState('');

    return (
        <Frame
            variant="3"
            caption={t('floor.plan.editor.import.export')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 379, height: 374, ...layout }}
        >
            <Border
                variant="105"
                tintColor="#ffffff"
                layout={{ position: 'absolute', left: 8, right: 23, top: 12, bottom: 93 }}
            >
                <TextInput
                    value={dataValue}
                    onChange={setDataValue}
                    multiline
                    layout={{ position: 'absolute', left: 0, right: 1, top: 1, bottom: 2 }}
                />
            </Border>
            {/* <scrollbar_vertical> for data - rendered by that list's ScrollArea */}
            {/* <scrollbar_horizontal> for data - rendered by that list's ScrollArea */}
            <Button
                variant="101"
                name="revert"
                tintColor="#bbbbbb"
                onPointerTap={onRevert}
                layout={{ position: 'absolute', left: -3, width: 191, bottom: 31, height: 49, maxWidth: 191 }}
            >
                {t('floor.plan.editor.revert.to.last.received.map')}
            </Button>
            <Button
                variant="101"
                name="save"
                tintColor="#bbbbbb"
                onPointerTap={onSave}
                layout={{ position: 'absolute', right: 5, width: 73, bottom: 31, height: 49, maxWidth: 73 }}
            >
                {t('floor.plan.editor.save')}
            </Button>
        </Frame>
    );
};
