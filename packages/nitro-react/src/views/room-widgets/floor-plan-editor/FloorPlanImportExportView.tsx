import { useState } from 'react';

import { TemplateWindow } from '#base/theme';

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
 * `habbo-window-manager-com/floor_plan_export_import` layout. The map as text in `data`, to copy out
 * of or paste into; `data` is `multiline` without `word_wrap`, so every row of the map stays one
 * line, its tiles in columns. `revert` puts the last received map back in it.
 *
 * Its save is not the editor's: Flash sends the pasted text with the entry point and the two
 * thicknesses but leaves the fixed wall height off the packet entirely, so the room keeps whatever
 * wall height it had. The typed text is never written back into the editor - the server answers
 * with a fresh `FloorHeightMapMessage`, and that is what the map becomes.
 *
 * The layout's two scrollbars scroll `data` (their `scrollable`), and the field follows its caret
 * while it is typed in.
 */
export const FloorPlanImportExportView = ({ modelData, receivedModel, canSave, onSave, onClose }: FloorPlanImportExportViewProps) => {
    const [ value, setValue ] = useState(modelData);

    return (
        <TemplateWindow
            id="habbo-window-manager-com/floor_plan_export_import_xml"
            frame={{ id: 'floor-plan-import-export', centered: true, onClose }}
            bindings={{
                data: { caption: value, onChange: setValue },
                revert: { onPointerTap: () => setValue(receivedModel) },
                // `visible`: the save only with Builder's Club time left, or `hasSecurity(4)`.
                save: { disabled: !canSave, onPointerTap: () => onSave(value) },
            }}
        />
    );
};
