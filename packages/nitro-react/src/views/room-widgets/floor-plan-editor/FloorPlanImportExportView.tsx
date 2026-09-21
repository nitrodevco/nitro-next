import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Border, Button, Frame, TextInput } from '#base/theme';

export interface FloorPlanImportExportViewProps {
    /** The map the dialog opens on - `_floorPlanCache.getData()` at the moment it was shown. */
    modelData: string;
    /** `BCFloorPlanEditor.lastReceivedFloorPlan` - what the revert button puts back. */
    receivedModel: string;
    canSave: boolean;
    onSave: (modelData: string) => void;
    onClose: () => void;
}

/**
 * The floor plan editor's import/export dialog - `ImportExportDialog`, on the
 * `floor_plan_export_import` layout. The map as text, to copy out of or paste into.
 *
 * Its save is not the editor's: Flash sends the pasted text with the entry point and the two
 * thicknesses but leaves the fixed wall height off the packet entirely, so the room keeps whatever
 * wall height it had. The typed text is never written back into the editor - the server answers
 * with a fresh `FloorHeightMapMessage`, and that is what the map becomes.
 */
export const FloorPlanImportExportView = ({ modelData, receivedModel, canSave, onSave, onClose }: FloorPlanImportExportViewProps) => {
    const t = useTranslation();
    const [ value, setValue ] = useState(modelData);

    return (
        <Frame
            variant="3"
            id="floor-plan-import-export"
            caption={t('floor.plan.editor.import.export')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            centered
            layout={{ width: 379, height: 374, minWidth: 379, minHeight: 374 }}
        >
            <Border
                variant="105"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 8, right: 11, top: 12, bottom: 52 }}
            >
                <TextInput
                    value={value}
                    onChange={setValue}
                    multiline
                    layout={{ position: 'absolute', left: 0, right: 1, top: 1, bottom: 2 }}
                />
            </Border>
            <Button
                variant="101"
                name="revert"
                tintColor="#bbbbbb"
                onPointerTap={() => setValue(receivedModel)}
                layout={{ position: 'absolute', left: -3, width: 191, bottom: -10, height: 49, maxWidth: 191 }}
            >
                {t('floor.plan.editor.revert.to.last.received.map')}
            </Button>
            <Button
                variant="101"
                name="save"
                tintColor="#bbbbbb"
                disabled={!canSave}
                onPointerTap={() => onSave(value)}
                layout={{ position: 'absolute', right: -7, width: 73, bottom: -10, height: 49, maxWidth: 73 }}
            >
                {t('floor.plan.editor.save')}
            </Button>
        </Frame>
    );
};
