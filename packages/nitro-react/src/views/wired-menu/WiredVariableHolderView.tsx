/**
 * Every permanent variable one user, pet or bot holds - `VariableManagementDetailView` on
 * `variables_management_detail_xml`: who it is (`PermanentVariableHolderPreviewer` - a head for a
 * user or bot, a click on it opening the profile, a pet as the pet image widget draws it - and the
 * info text), their variables with values editable in place, "delete", "add" and the "add
 * variable" bubble, and "refresh". The loading icon turns while a change or a refresh waits for
 * the fresh list. The window stretches in height; the table takes the difference.
 *
 * The reference server (turbo-cloud) does not implement these packets.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import type { IWiredUserPermanentVariablesList, IWiredVariable } from '@nitrodevco/nitro-packets';
import { isWiredVariablePersisted } from '@nitrodevco/nitro-packets';
import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useRef } from 'react';

import { closeWiredHolderCreateBubble, closeWiredVariableHolder, createWiredHolderVariable, deleteWiredHolderVariable, openWiredUserProfile, refreshWiredVariableHolder, selectWiredHolderVariable, setWiredHolderVariableValue, toggleWiredHolderCreateBubble } from '#base/commands';
import { AvatarImage } from '#base/components/AvatarImage';
import { useWebSocketContext } from '#base/context/communication';
import { useRoom } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { useWiredHasWritePermission, useWiredStore, WiredVariableValueRow } from '#base/context/wired';
import { useChatPetFace } from '#base/hooks';
import { Border, Box, Button, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { sortVariables } from '#base/wired';

import { WiredLoadingIcon } from '../wired-common/WiredLoadingIcon';
import { WiredTableCell, WiredTableColumn, WiredTableView } from '../wired-common/WiredTableView';
import { WiredMenuCreateVariableBubble } from './WiredMenuCreateVariableBubble';
import { isWithinContainer } from './wiredMenuPointer';
import { wiredVariableValueCell } from './wiredVariableValueCell';

/** `WiredInputSourcePicker.USER_SOURCE` - the bubble's picker lists user variables. */
const USER_SOURCE = 1;
/** `RoomObjectUserType` as the packets carry it. */
const ENTITY_USER = 1;
const ENTITY_PET = 2;
const ENTITY_BOT = 4;

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
    const bubbleRef = useRef<PixiContainer>(null);
    const addButtonRef = useRef<PixiContainer>(null);

    // `updateTableviewUI`.
    const known = holder.variableStorage.filter(storage => storage.variableId && variablesById[storage.variableId]);
    const values = new Map(known.map(storage => [ storage.variableId ?? '', storage.value ]));
    const rows: WiredVariableValueRow[] = sortVariables(known.map(storage => variablesById[storage.variableId ?? '']))
        .filter(variable => !variable.isInvisible)
        .map(variable => ({ variable, value: values.get(variable.variableId) ?? 0 }));

    const columns: WiredTableColumn[] = [
        { id: 'variable', title: t('wiredmenu.inspection.variables.variable', 'wiredmenu.inspection.variables.variable'), widthFactor: 0.65, alignment: 'left' },
        { id: 'value', title: t('wiredmenu.inspection.variables.value', 'wiredmenu.inspection.variables.value'), widthFactor: 0.35, alignment: 'right' },
    ];

    const getCell = (row: WiredVariableValueRow, columnId: string): WiredTableCell => ((columnId === 'variable')
        ? { text: row.variable.variableName, inspectable: true, textFieldValue: row.variable.variableName }
        : wiredVariableValueCell(row.variable, row.value, key => t(key, key), false, hasWritePermission && row.variable.hasValue && row.variable.canWriteValue));

    // `updateButtonsUI`.
    const selectedRow = rows.find(row => row.variable.variableId === selectedId);
    const canDelete = hasWritePermission && !!selectedRow?.variable.canCreateAndDelete;
    const canAdd = hasWritePermission;

    // `variableFilter`: permanent variables the holder does not have yet.
    const heldIds = new Set(holder.variableStorage.map(storage => storage.variableId));
    const variableFilter = (variable: IWiredVariable) => variable.canCreateAndDelete && !heldIds.has(variable.variableId) && isWiredVariablePersisted(variable.availabilityType);

    // `updateInfoBoxUI`.
    const params: Record<string, string> = { name: holder.entityName, id: String(holder.entityId), owner_name: holder.ownerName ?? '', owner_id: String(holder.ownerId ?? '') };
    const infoText = (holder.entityType === ENTITY_USER)
        ? t('wiredmenu.variable_management_detail.info.user', '', params)
        : (holder.entityType === ENTITY_PET)
                ? t('wiredmenu.variable_management_detail.info.pet', '', params)
                : (holder.entityType === ENTITY_BOT) ? t('wiredmenu.variable_management_detail.info.bot', '', params) : '';

    // `windowProcedure`.
    const onWindowTap = (event: FederatedPointerEvent) => {
        if (!createBubble || isWithinContainer(event.target, bubbleRef.current) || isWithinContainer(event.target, addButtonRef.current)) return;

        closeWiredHolderCreateBubble();
    };

    const boldText = (key: string) => (
        <ThemeText
            text={t(key, key)}
            textStyle="u_bold"
            textOptions={{ fill: '#000000' }}
            verticalAlign="top"
            layout={{ position: 'absolute', left: 0, top: 0, height: 19 }}
        />
    );

    return (
        <Frame
            variant="3"
            id="wired_variable_holder"
            caption={t('wiredmenu.variable_management_detail.title', 'wiredmenu.variable_management_detail.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="y"
            centered
            rememberPosition={false}
            onClose={closeWiredVariableHolder}
            onPointerTap={onWindowTap}
            layout={{ position: 'absolute', width: 339, height: 512, minWidth: 339, maxWidth: 339, minHeight: 400, maxHeight: 650 }}
        >
            <Box layout={{ position: 'absolute', left: 18, top: 7, width: 303, height: 57 }}>
                <Border
                    variant="4"
                    layout={{ position: 'absolute', left: 0, top: 0, width: 228, height: 57 }}
                >
                    <ThemeText
                        text={t('wiredmenu.variable_management_detail.info', 'wiredmenu.variable_management_detail.info')}
                        textStyle="u_regular"
                        textOptions={{ fill: '#000000', align: 'center', wordWrap: true, wordWrapWidth: 214 }}
                        verticalAlign="middle"
                        layout={{ position: 'absolute', left: 5, top: 12, width: 218, height: 32 }}
                    />
                </Border>
                <Button
                    variant="3"
                    onPointerTap={() => refreshWiredVariableHolder(send)}
                    layout={{ position: 'absolute', left: 241, top: 13, width: 62, height: 30 }}
                >
                    {t('wiredmenu.list_view.refresh', 'wiredmenu.list_view.refresh')}
                </Button>
                <WiredLoadingIcon
                    visible={loading}
                    layout={{ position: 'absolute', left: 288, top: 48 }}
                />
            </Box>
            <Box layout={{ position: 'absolute', left: 18, top: 73, width: 303, height: 114 }}>
                {boldText('wiredmenu.variable_management_detail.holder_info')}
                <Border
                    variant="2"
                    tintColor="#dadada"
                    layout={{ position: 'absolute', left: 0, top: 20, width: 94, height: 94, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}
                >
                    {(holder.entityType === ENTITY_PET)
                        ? <PetHolderPreview figure={holder.entityFigure} />
                        : (
                                <Region
                                    cursor="pointer"
                                    onPointerTap={() => openWiredUserProfile(send, holder.entityId)}
                                    layout={{ width: 74, height: 74, alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <AvatarImage
                                        figure={holder.entityFigure}
                                        gender={AvatarGenderType.Male}
                                        headOnly
                                        direction={2}
                                    />
                                </Region>
                            )}
                </Border>
                <Border
                    variant="10"
                    layout={{ position: 'absolute', left: 109, top: 20, width: 194, height: 94 }}
                >
                    <TextInput
                        value={infoText.replace(/\r/g, '\n')}
                        onChange={() => {}}
                        onKeyDown={() => true}
                        multiline
                        textStyle="u_regular"
                        layout={{ position: 'absolute', left: 6, top: 6, width: 182, height: 80 }}
                    />
                </Border>
            </Box>
            <Box layout={{ position: 'absolute', left: 18, top: 196, width: 303, bottom: 18 }}>
                {boldText('wiredmenu.variable_management_detail.variables')}
                <Box layout={{ position: 'absolute', left: 0, top: 20, width: 303, bottom: 34 }}>
                    <WiredTableView
                        columns={columns}
                        rows={rows}
                        getRowId={row => row.variable.variableId}
                        getCell={getCell}
                        selectedId={selectedRow ? selectedId : null}
                        onRowSelected={row => selectWiredHolderVariable(row?.variable.variableId ?? null)}
                        onCellEdit={(row, columnId, value) => {
                            if (columnId === 'value') setWiredHolderVariableValue(send, row.variable, value);
                        }}
                    />
                </Box>
                <Box layout={{ position: 'absolute', left: 0, bottom: 0, width: 303, height: 25, flexDirection: 'row', gap: 13 }}>
                    <Box
                        alpha={canDelete ? 1 : 0.5}
                        layout={{ width: 145, height: 25 }}
                    >
                        <Button
                            variant="3"
                            disabled={!canDelete}
                            onPointerTap={() => deleteWiredHolderVariable(send)}
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
                            onPointerTap={() => toggleWiredHolderCreateBubble(send)}
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
                        target={USER_SOURCE}
                        roomId={roomId}
                        bubbleRef={bubbleRef}
                        onCreate={(variable, valueText) => createWiredHolderVariable(send, variable, valueText)}
                        layout={{ left: 122, top: 95 }}
                    />
                )}
            </Box>
        </Frame>
    );
};
