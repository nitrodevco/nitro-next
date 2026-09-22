/**
 * The wired menu's inspection tab - `WiredMenuInspectionTab` on `inspection_container`: the type
 * picker (furni, user, global), the preview with its pin option, and the inspected object's
 * variable values (`VariableValueTableObject`), editable in place, with "delete" and "add" under
 * them and the "add variable" bubble. The table is greyed out while nothing is inspected.
 *
 * Buttons follow `updateButtonsUI`: for someone who may modify wired, with a furni or user
 * inspected, "add" is on, and "delete" is on for a selected variable that can be taken away.
 */
import type { IWiredVariable } from '@nitrodevco/nitro-packets';
import { VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';
import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useRef } from 'react';

import { closeWiredInspectionCreateBubble, createWiredInspectedVariable, deleteWiredInspectedVariable, selectWiredInspectionRow, selectWiredInspectionType, setWiredInspectedValue, setWiredInspectionPinned, toggleWiredInspectionCreateBubble, toggleWiredInspectionHighlights } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useRoom } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { useWiredHasWritePermission, useWiredStore, WIRED_INSPECTION_STATE_NOTHING, WiredVariableValueRow } from '#base/context/wired';
import { Box, Button, ThemeText } from '#base/theme';

import { WiredTableCell, WiredTableColumn, WiredTableView } from '../wired-common/WiredTableView';
import { WiredMenuCheckOption } from './WiredMenuCheckOption';
import { WiredMenuCreateVariableBubble } from './WiredMenuCreateVariableBubble';
import { WiredMenuInspectionPreview } from './WiredMenuInspectionPreview';
import { isWithinContainer } from './wiredMenuPointer';
import { WiredMenuTypePicker } from './WiredMenuTypePicker';
import { wiredVariableValueCell } from './wiredVariableValueCell';

const FURNI_SOURCE = 0;

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
    const bubbleRef = useRef<PixiContainer>(null);
    const addButtonRef = useRef<PixiContainer>(null);

    const loc = (key: string) => t(key, '');

    const columns: WiredTableColumn[] = [
        { id: 'variable', title: loc('wiredmenu.inspection.variables.variable'), widthFactor: 0.65, alignment: 'left' },
        { id: 'value', title: loc('wiredmenu.inspection.variables.value'), widthFactor: 0.35, alignment: 'right' },
    ];

    const getCell = (row: WiredVariableValueRow, columnId: string): WiredTableCell => ((columnId === 'variable')
        ? { text: row.variable.variableName, inspectable: true, textFieldValue: row.variable.variableName }
        : wiredVariableValueCell(row.variable, row.value, key => t(key, key), highlightChanges, hasWritePermission));

    // `updateButtonsUI`.
    const inspectsHolder = hasWritePermission && !!data && (Number(data.type) !== Number(VariableExtraSourceTypes.GLOBAL_SOURCE));
    const selectedRow = rows.find(row => row.variable.variableId === selectedId);
    const canDelete = inspectsHolder && !!selectedRow?.variable.canCreateAndDelete;
    const canAdd = inspectsHolder;

    // `updatePreviewUI`: the highlight button is there for furni, and on for a furni that is configured in wired boxes.
    const canHighlight = !!data && (Number(data.type) === FURNI_SOURCE) && !!data.configuredInWireds.length;

    // `variableFilter`: what the object may be given and does not hold yet.
    const variableFilter = (variable: IWiredVariable) => variable.canCreateAndDelete && (!data || !data.variableValues.has(variable.variableId));

    // `windowProcedure`: a click in the tab that is neither in the bubble nor on "add" closes the bubble.
    const onContainerTap = (event: FederatedPointerEvent) => {
        if (!createBubble || isWithinContainer(event.target, bubbleRef.current) || isWithinContainer(event.target, addButtonRef.current)) return;

        closeWiredInspectionCreateBubble();
    };

    return (
        <Box
            onPointerTap={onContainerTap}
            layout={{ position: 'absolute', left: 0, top: 0, width: 500, height: 382 }}
        >
            <Box layout={{ position: 'absolute', left: 14, top: 18 }}>
                <WiredMenuTypePicker
                    titleKey="wiredmenu.inspection.type"
                    count={3}
                    selected={type}
                    onSelect={sourceType => selectWiredInspectionType(send, sourceType)}
                />
            </Box>
            <Box layout={{ position: 'absolute', left: 14, top: 94, width: 150, height: 274, overflow: 'hidden' }}>
                <ThemeText
                    text={t('wiredmenu.inspection.preview', 'wiredmenu.inspection.preview')}
                    textStyle="u_regular"
                    flashFormat={{ bold: true }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, top: 0, width: 165, height: 19 }}
                />
                <WiredMenuInspectionPreview
                    preview={preview}
                    showHighlightButton={type === FURNI_SOURCE}
                    highlightEnabled={canHighlight}
                    onHighlight={toggleWiredInspectionHighlights}
                />
                <Box layout={{ position: 'absolute', left: 0, top: 254 }}>
                    <WiredMenuCheckOption
                        label={t('wiredmenu.inspection.pin', 'wiredmenu.inspection.pin')}
                        selected={pinned}
                        rowDisabled={type === Number(VariableExtraSourceTypes.GLOBAL_SOURCE)}
                        onToggle={setWiredInspectionPinned}
                        width={197}
                        height={18}
                        labelWidth={82}
                        labelHeight={17}
                    />
                </Box>
            </Box>
            <Box layout={{ position: 'absolute', left: 183, top: 17, width: 303, height: 351, overflow: 'hidden' }}>
                <ThemeText
                    text={t('wiredmenu.inspection.variables', 'wiredmenu.inspection.variables')}
                    textStyle="u_regular"
                    flashFormat={{ bold: true }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, top: 0, width: 188, height: 19 }}
                />
                <Box
                    alpha={(state === WIRED_INSPECTION_STATE_NOTHING) ? 0.5 : 1}
                    eventMode={(state === WIRED_INSPECTION_STATE_NOTHING) ? 'none' : 'auto'}
                    layout={{ position: 'absolute', left: 0, top: 20, width: 303, height: 297 }}
                >
                    <WiredTableView
                        columns={columns}
                        rows={rows}
                        getRowId={row => row.variable.variableId}
                        getCell={getCell}
                        selectedId={selectedId}
                        onRowSelected={row => selectWiredInspectionRow(row?.variable.variableId ?? null)}
                        onCellEdit={(row, columnId, value) => {
                            if (columnId === 'value') setWiredInspectedValue(send, row.variable, value);
                        }}
                        layout={{ width: 303, height: 297, flex: 0 }}
                    />
                </Box>
                <Box layout={{ position: 'absolute', left: 0, top: 326, width: 303, height: 30, flexDirection: 'row', gap: 13 }}>
                    <Box
                        alpha={canDelete ? 1 : 0.5}
                        layout={{ width: 145, height: 25 }}
                    >
                        <Button
                            variant="3"
                            disabled={!canDelete}
                            onPointerTap={() => deleteWiredInspectedVariable(send)}
                            layout={{ width: 145, height: 25 }}
                        >
                            {t('wiredmenu.inspection.delete', 'wiredmenu.inspection.delete')}
                        </Button>
                    </Box>
                    <Box
                        ref={addButtonRef}
                        alpha={canAdd ? 1 : 0.5}
                        layout={{ width: 145, height: 25 }}
                    >
                        <Button
                            variant="3"
                            disabled={!canAdd}
                            onPointerTap={() => toggleWiredInspectionCreateBubble(send)}
                            layout={{ width: 145, height: 25 }}
                        >
                            {t('wiredmenu.inspection.add', 'wiredmenu.inspection.add')}
                        </Button>
                    </Box>
                </Box>
                {createBubble && (
                    <WiredMenuCreateVariableBubble
                        variables={createVariables}
                        filter={variableFilter}
                        target={type}
                        roomId={roomId}
                        bubbleRef={bubbleRef}
                        onCreate={(variable, valueText) => createWiredInspectedVariable(send, variable, valueText)}
                        layout={{ left: 122, top: 181 }}
                    />
                )}
            </Box>
        </Box>
    );
};
