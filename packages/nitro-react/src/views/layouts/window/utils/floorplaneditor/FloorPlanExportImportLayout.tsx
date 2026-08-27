import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, TextInput } from '#base/theme';

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
            params={98305}
            caption={t('floor.plan.editor.import.export')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 379, height: 374, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="105"
                    params={2193}
                    tintColor="#ffffff"
                    layout={{ position: 'absolute', left: 8, width: 348, top: 12, height: 269 }}
                >
                    <TextInput
                        value={dataValue}
                        onChange={setDataValue}
                        multiline
                        layout={{ position: 'absolute', left: 0, width: 347, top: 1, height: 266 }}
                    />
                </Border>
                {/* <scrollbar_vertical> for data - rendered by that list's ScrollArea */}
                {/* <scrollbar_horizontal> for data - rendered by that list's ScrollArea */}
                <Button
                    variant="101"
                    name="revert"
                    params={132113}
                    tintColor="#bbbbbb"
                    onPointerTap={onRevert}
                    layout={{ position: 'absolute', left: -3, width: 191, top: 294, height: 49, maxWidth: 191 }}
                >
                    {t('floor.plan.editor.revert.to.last.received.map')}
                </Button>
                <Button
                    variant="101"
                    name="save"
                    params={394321}
                    tintColor="#bbbbbb"
                    onPointerTap={onSave}
                    layout={{ position: 'absolute', left: 301, width: 73, top: 294, height: 49, maxWidth: 73 }}
                >
                    {t('floor.plan.editor.save')}
                </Button>
            </Region>
        </Frame>
    );
};
