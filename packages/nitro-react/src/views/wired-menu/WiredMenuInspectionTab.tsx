/**
 * The wired menu's inspection tab - `WiredMenuInspectionTab` on `inspection_container` of
 * `wired_menu_view_xml`: the type picker (furni, user, global), the preview with its pin option,
 * and the inspected object's variable values (`VariableValueTableObject`), editable in place, with
 * "delete" and "add" under them and the "add variable" bubble (`useWiredCreateVariableBubble`).
 *
 * - `updateTableUI`: the table goes into `variable_values_table_container`, which is
 *   `Util.disableSection`ed while nothing is inspected.
 * - `updatePreviewUI`: `pin_option_container` is disabled for the globals; the preview shows what
 *   `VariableHolderPreviewer` is given (`WiredMenuInspectionPreview`): an instruction, the globals'
 *   placeholder or the object. The "highlight wireds" button is there for furni, and disabled
 *   unless the inspected furni is configured in wired boxes. Its icon is
 *   `${image.library.url}catalogue/icon_80.png` in the layout - the catalogue icon set, which this
 *   client reaches through `catalog.icons.url`.
 * - `updateButtonsUI`: for someone who may modify wired, with a furni or user inspected, "add" is
 *   on, and "delete" is on for a selected variable that can be taken away.
 */
import type { IWiredVariable } from '@nitrodevco/nitro-packets';
import { VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { closeWiredInspectionCreateBubble, createWiredInspectedVariable, deleteWiredInspectedVariable, selectWiredInspectionRow, selectWiredInspectionType, setWiredInspectedValue, setWiredInspectionPinned, toggleWiredInspectionCreateBubble, toggleWiredInspectionHighlights } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useRoom } from '#base/context/room';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useWiredHasWritePermission, useWiredStore, WIRED_INSPECTION_STATE_NOTHING, WiredVariableValueRow } from '#base/context/wired';
import { Box, TemplateWindow } from '#base/theme';
import { TableCell, TableColumn, TableView } from '#base/views/shared/table/TableView';
import { WIRED_SOURCE_FURNI } from '#base/wired';

import { useWiredCreateVariableBubble } from './useWiredCreateVariableBubble';
import { WiredMenuInspectionPreview } from './WiredMenuInspectionPreview';
import { wiredMenuTypePickerBindings } from './wiredMenuTypePicker';
import { wiredVariableValueCell } from './wiredVariableValueCell';

/** `inspection_container`'s size: the whole tab takes the clicks `windowProcedure` hears. */
const CONTAINER_WIDTH = 500;
const CONTAINER_HEIGHT = 382;

export const WiredMenuInspectionTab = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const roomId = useRoom()?.roomId ?? 0;
    const type = useWiredStore(x => x.inspectionType);
    const pinned = useWiredStore(x => x.inspectionPinned);
    const state = useWiredStore(x => x.inspectionState);
    const data = useWiredStore(x => x.inspectionData);
    const rows = useWiredStore(x => x.inspectionRows);
    const highlightChanges = useWiredStore(x => x.inspectionHighlightChanges);
    const selectedId = useWiredStore(x => x.inspectionSelectedId);
    const preview = useWiredStore(x => x.inspectionPreview);
    const createBubble = useWiredStore(x => x.inspectionCreateBubble);
    const createVariables = useWiredStore(x => x.inspectionCreateVariables);
    const hasWritePermission = useWiredHasWritePermission();
    const catalogIconsUrl = useConfigValue<string>('catalog.icons.url') ?? '';

    const loc = (key: string) => t(key, '');

    const columns: TableColumn[] = [
        { id: 'variable', title: loc('wiredmenu.inspection.variables.variable'), widthFactor: 0.65, alignment: 'left' },
        { id: 'value', title: loc('wiredmenu.inspection.variables.value'), widthFactor: 0.35, alignment: 'right' },
    ];

    const getCell = (row: WiredVariableValueRow, columnId: string): TableCell => ((columnId === 'variable')
        ? { text: row.variable.variableName, inspectable: true, textFieldValue: row.variable.variableName }
        : wiredVariableValueCell(row.variable, row.value, key => t(key, key), highlightChanges, hasWritePermission));

    // `updateButtonsUI`.
    const inspectsHolder = hasWritePermission && !!data && (Number(data.type) !== Number(VariableExtraSourceTypes.GLOBAL_SOURCE));
    const selectedRow = rows.find(row => row.variable.variableId === selectedId);

    // `updatePreviewUI`: the highlight button is there for furni, and on for a furni that is configured in wired boxes.
    const canHighlight = !!data && (Number(data.type) === WIRED_SOURCE_FURNI) && !!data.configuredInWireds.length;

    // `variableFilter`: what the object may be given and does not hold yet.
    const variableFilter = (variable: IWiredVariable) => variable.canCreateAndDelete && (!data || !data.variableValues.has(variable.variableId));

    const bubble = useWiredCreateVariableBubble({
        open: createBubble,
        variables: createVariables,
        filter: variableFilter,
        target: type,
        roomId,
        canDelete: inspectsHolder && !!selectedRow?.variable.canCreateAndDelete,
        canAdd: inspectsHolder,
        onDelete: () => deleteWiredInspectedVariable(send),
        onAdd: () => toggleWiredInspectionCreateBubble(send),
        onCreate: (variable, valueText) => createWiredInspectedVariable(send, variable, valueText),
        onClose: closeWiredInspectionCreateBubble,
    });

    const nothingInspected = state === WIRED_INSPECTION_STATE_NOTHING;

    return (
        <Box
            onPointerTap={bubble.onWindowTap}
            layout={{ position: 'absolute', left: 0, top: 0, width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
        >
            <TemplateWindow
                id="habbo-user-defined-room-events-com/wired_menu_view_xml"
                part="inspection_container"
                bindings={{
                    '': { visible: true },
                    ...wiredMenuTypePickerBindings(type, sourceType => selectWiredInspectionType(send, sourceType), 3),
                    preview_instruction_furni: { visible: preview.kind === 'furni_instructions' },
                    preview_instruction_user: { visible: preview.kind === 'user_instructions' },
                    global_placeholder: { visible: preview.kind === 'global' },
                    preview_border: { children: <WiredMenuInspectionPreview preview={preview} /> },
                    highlight_wired_btn: { visible: type === WIRED_SOURCE_FURNI, disableSection: !canHighlight, onPointerTap: toggleWiredInspectionHighlights },
                    ...(!!catalogIconsUrl.length && { 'highlight_wired_btn/@0': { asset: catalogIconsUrl.replace('%name%', '80') } }),
                    pin_option_container: { disableSection: type === Number(VariableExtraSourceTypes.GLOBAL_SOURCE) },
                    pin_checkbox: { selected: pinned, onPointerTap: () => setWiredInspectionPinned(!pinned) },
                    // `Util.disableSection` reaches the table's windows too: it fades and takes no clicks.
                    variable_values_table_container: {
                        disableSection: nothingInspected,
                        children: (
                            <Box
                                alpha={nothingInspected ? 0.5 : 1}
                                eventMode={nothingInspected ? 'none' : 'auto'}
                                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                            >
                                <TableView
                                    columns={columns}
                                    rows={rows}
                                    getRowId={row => row.variable.variableId}
                                    getCell={getCell}
                                    selectedId={selectedId}
                                    onRowSelected={row => selectWiredInspectionRow(row?.variable.variableId ?? null)}
                                    onCellEdit={(row, columnId, value) => {
                                        if (columnId === 'value') setWiredInspectedValue(send, row.variable, value);
                                    }}
                                    layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                                />
                            </Box>
                        ),
                    },
                    ...bubble.bindings,
                }}
            />
        </Box>
    );
};
