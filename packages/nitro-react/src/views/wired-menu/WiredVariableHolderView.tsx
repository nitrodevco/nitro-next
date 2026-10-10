/**
 * Every permanent variable one user, pet or bot holds - `VariableManagementDetailView` on
 * `variables_management_detail_xml`, opened centred (`show`'s `_window.center()`): who it is, their
 * variables with values editable in place, "delete", "add" and the "add variable" bubble
 * (`useWiredCreateVariableBubble`), and "refresh". The window stretches in height; the table's
 * container takes the difference.
 *
 * - `PermanentVariableHolderPreviewer` in `info_box`: a pet as the pet image widget draws it
 *   (`pet_preview`), anyone else's head (`avatar_preview`, cropped), centred in `preview`, with
 *   `avatar_preview_region` over it opening the profile on a click.
 * - `updateInfoBoxUI`: `info_box_text` names the holder - the owner too for a pet or a bot.
 * - `updateTableviewUI`: the table goes into `variable_values_table_container`; a value is editable
 *   for someone who may modify wired, where the variable has a value that can be written.
 * - `searching_icon` turns (`LoadingIcon`) while a change or a refresh waits for the fresh list.
 *
 * The reference server (turbo-cloud) does not implement these packets.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import type { IWiredUserPermanentVariablesList, IWiredVariable } from '@nitrodevco/nitro-packets';
import { isWiredVariablePersisted } from '@nitrodevco/nitro-packets';
import { useEffect, useState } from 'react';

import { closeWiredHolderCreateBubble, closeWiredVariableHolder, createWiredHolderVariable, deleteWiredHolderVariable, openWiredUserProfile, refreshWiredVariableHolder, selectWiredHolderVariable, setWiredHolderVariableValue, toggleWiredHolderCreateBubble } from '#base/commands';
import { AvatarImage } from '#base/components/AvatarImage';
import { useWebSocketContext } from '#base/context/communication';
import { useRoom } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { useWiredHasWritePermission, useWiredStore, WiredVariableValueRow } from '#base/context/wired';
import { useChatPetFace } from '#base/hooks';
import { Box, TemplateWindow, ThemeImage } from '#base/theme';
import { TableCell, TableColumn, TableView } from '#base/views/shared/table/TableView';
import { sortVariables, WIRED_SOURCE_USER } from '#base/wired';

import { useWiredCreateVariableBubble } from './useWiredCreateVariableBubble';
import { wiredVariableValueCell } from './wiredVariableValueCell';

/** `RoomObjectUserType` as the packets carry it. */
const ENTITY_USER = 1;
const ENTITY_PET = 2;
const ENTITY_BOT = 4;

/** `LoadingIcon.FRAMES`: the `searching_icon` styles it steps through, one each `LoadingIcon` tick. */
const LOADING_FRAMES = [ 23, 24, 25, 26 ];
const LOADING_FRAME_MS = 160;

const PetHolderPreview = ({ figure }: { figure: string }) => {
    const { texture } = useChatPetFace(figure, undefined, { direction: 2 });

    if (!texture) return null;

    return <ThemeImage texture={texture} />;
};

export interface WiredVariableHolderViewProps {
    holder: IWiredUserPermanentVariablesList;
}

export const WiredVariableHolderView = ({ holder }: WiredVariableHolderViewProps) => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const roomId = useRoom()?.roomId ?? 0;
    const variablesById = useWiredStore(x => x.variableHolderVariablesById);
    const loading = useWiredStore(x => x.variableHolderLoading);
    const selectedId = useWiredStore(x => x.variableHolderSelectedId);
    const createBubble = useWiredStore(x => x.variableHolderCreateBubble);
    const createVariables = useWiredStore(x => x.variableHolderCreateVariables);
    const hasWritePermission = useWiredHasWritePermission();
    const [ loadingFrame, setLoadingFrame ] = useState(0);

    // `LoadingIcon.onTimer`: the frame it stopped on is kept for the next run.
    useEffect(() => {
        if (!loading) return;

        const timer = setInterval(() => setLoadingFrame(current => ((current + 1) % LOADING_FRAMES.length)), LOADING_FRAME_MS);

        return () => clearInterval(timer);
    }, [ loading ]);

    // `updateTableviewUI`.
    const known = holder.variableStorage.filter(storage => storage.variableId && variablesById[storage.variableId]);
    const values = new Map(known.map(storage => [ storage.variableId ?? '', storage.value ]));
    const rows: WiredVariableValueRow[] = sortVariables(known.map(storage => variablesById[storage.variableId ?? '']))
        .filter(variable => !variable.isInvisible)
        .map(variable => ({ variable, value: values.get(variable.variableId) ?? 0 }));

    const columns: TableColumn[] = [
        { id: 'variable', title: t('wiredmenu.inspection.variables.variable', 'wiredmenu.inspection.variables.variable'), widthFactor: 0.65, alignment: 'left' },
        { id: 'value', title: t('wiredmenu.inspection.variables.value', 'wiredmenu.inspection.variables.value'), widthFactor: 0.35, alignment: 'right' },
    ];

    const getCell = (row: WiredVariableValueRow, columnId: string): TableCell => ((columnId === 'variable')
        ? { text: row.variable.variableName, inspectable: true, textFieldValue: row.variable.variableName }
        : wiredVariableValueCell(row.variable, row.value, key => t(key, key), false, hasWritePermission && row.variable.hasValue && row.variable.canWriteValue));

    // `updateButtonsUI`.
    const selectedRow = rows.find(row => row.variable.variableId === selectedId);

    // `variableFilter`: permanent variables the holder does not have yet.
    const heldIds = new Set(holder.variableStorage.map(storage => storage.variableId));
    const variableFilter = (variable: IWiredVariable) => variable.canCreateAndDelete && !heldIds.has(variable.variableId) && isWiredVariablePersisted(variable.availabilityType);

    const bubble = useWiredCreateVariableBubble({
        open: createBubble,
        variables: createVariables,
        filter: variableFilter,
        target: WIRED_SOURCE_USER,
        roomId,
        canDelete: hasWritePermission && !!selectedRow?.variable.canCreateAndDelete,
        canAdd: hasWritePermission,
        onDelete: () => deleteWiredHolderVariable(send),
        onAdd: () => toggleWiredHolderCreateBubble(send),
        onCreate: (variable, valueText) => createWiredHolderVariable(send, variable, valueText),
        onClose: closeWiredHolderCreateBubble,
    });

    // `updateInfoBoxUI`: a user's text names it; a pet's and a bot's their owner too.
    const params: Record<string, string> = { name: holder.entityName, id: String(holder.entityId), owner_name: holder.ownerName ?? '', owner_id: String(holder.ownerId ?? '') };
    const infoText = (holder.entityType === ENTITY_USER)
        ? t('wiredmenu.variable_management_detail.info.user', '', params)
        : (holder.entityType === ENTITY_PET)
                ? t('wiredmenu.variable_management_detail.info.pet', '', params)
                : (holder.entityType === ENTITY_BOT) ? t('wiredmenu.variable_management_detail.info.bot', '', params) : '';

    const isPet = holder.entityType === ENTITY_PET;

    return (
        <TemplateWindow
            id="habbo-user-defined-room-events-com/variables_management_detail_xml"
            frame={{ id: 'wired_variable_holder', centered: true, rememberPosition: false, resizeDirection: 'y', onClose: closeWiredVariableHolder, onPointerTap: bubble.onWindowTap }}
            bindings={{
                // `onRefreshClick`.
                refresh_btn: { onPointerTap: () => refreshWiredVariableHolder(send) },
                searching_icon: { visible: loading, style: String(LOADING_FRAMES[loadingFrame]) },
                // `updatePreviewUI` / `setUserPreview`: the region opens the holder's profile (`onPreviewAvatarClicked`).
                avatar_preview_region: { visible: !isPet, onPointerTap: () => openWiredUserProfile(send, holder.entityId) },
                preview: {
                    children: (
                        <Box
                            eventMode="none"
                            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                        >
                            {isPet
                                ? <PetHolderPreview figure={holder.entityFigure} />
                                : (
                                        <AvatarImage
                                            figure={holder.entityFigure}
                                            gender={AvatarGenderType.Male}
                                            headOnly
                                            cropped
                                            direction={2}
                                        />
                                    )}
                        </Box>
                    ),
                },
                info_box_text: { caption: infoText.replace(/\r/g, '\n') },
                variable_values_table_container: {
                    children: (
                        <TableView
                            columns={columns}
                            rows={rows}
                            getRowId={row => row.variable.variableId}
                            getCell={getCell}
                            selectedId={selectedRow ? selectedId : null}
                            onRowSelected={row => selectWiredHolderVariable(row?.variable.variableId ?? null)}
                            onCellEdit={(row, columnId, value) => {
                                if (columnId === 'value') setWiredHolderVariableValue(send, row.variable, value);
                            }}
                            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                        />
                    ),
                },
                ...bubble.bindings,
            }}
        />
    );
};
