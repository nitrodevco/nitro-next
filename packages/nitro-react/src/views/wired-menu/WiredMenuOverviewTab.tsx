/**
 * The wired menu's variable overview tab - `WiredMenuOverviewTab` on `variable_overview_container`
 * of `wired_menu_view_xml` (the 2026 layout, with the red "delete all" button beside "highlight" and
 * "manage"): the type picker, the list of the room's variables of that target
 * (`VariableTableObject`), the selected variable's properties (`PropertyTableObject`) and the texts
 * its values connect to (`TextTableObject`).
 *
 * The three `TableView`s are built into the layout's `variable_list_container`,
 * `variable_properties_table_container` and `variable_texts_table_container`. `updateButtonsUI`
 * `Util.disableSection`s each button the selected variable does not allow; `updateTextTableUI` does
 * the texts table's container while the variable has no text connector.
 */
import type { IWiredVariable } from '@nitrodevco/nitro-packets';

import { canDeleteWiredVariable, canHighlightWiredVariable, canManageWiredVariable, deleteWiredOverviewVariableHolders, manageWiredOverviewVariable, selectWiredOverviewType, selectWiredOverviewVariable, toggleWiredOverviewHighlight } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useWiredHasWritePermission, useWiredStore } from '#base/context/wired';
import { Box, TemplateWindow } from '#base/theme';
import { TableCell, TableColumn, TableView } from '#base/views/shared/table/TableView';

import { wiredMenuTypePickerBindings } from './wiredMenuTypePicker';

/** `MAX_TEXT_CONNECTIONS` - a variable with more texts than this shows none. */
const MAX_TEXT_CONNECTIONS = 400;

/** A table built into its `*_table_container`, filling it. */
const FILL = { position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 } as const;

interface PropertyRow {
    key: string;
    value: string;
    inspectable: boolean;
}

interface TextRow {
    value: number;
    text: string;
}

export const WiredMenuOverviewTab = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const type = useWiredStore(x => x.overviewType);
    const variables = useWiredStore(x => x.overviewVariables);
    const selectedId = useWiredStore(x => x.overviewSelectedId);
    const highlightEnabled = useWiredStore(x => x.overviewHighlightEnabled);
    const listScrollKey = useWiredStore(x => x.overviewListScrollKey);
    const textsScrollKey = useWiredStore(x => x.overviewTextsScrollKey);
    const hasWritePermission = useWiredHasWritePermission();

    const loc = (key: string) => t(key, '');
    const bool = (value: boolean) => t(`wiredmenu.bool.${value ? 'yes' : 'no'}`, `wiredmenu.bool.${value ? 'yes' : 'no'}`);

    const listed = (variables ?? []).filter(variable => !variable.isInvisible && (Number(variable.variableTarget) === type));
    const selected: IWiredVariable | undefined = listed.find(variable => variable.variableId === selectedId);

    // `getTargetString`.
    const targetString = (variable: IWiredVariable): string => {
        switch (Number(variable.variableTarget)) {
            case 0: return loc('wiredfurni.params.sourcetype.furni');
            case 1: return loc('wiredfurni.params.sourcetype.users');
            case -10: return loc('wiredfurni.params.sourcetype.global');
            case -20: return loc('wiredfurni.params.sourcetype.context');
            default: return '';
        }
    };

    // `updatePropertiesTableUI`.
    const properties: PropertyRow[] = selected
        ? [
                { key: 'name', value: selected.variableName, inspectable: true },
                { key: 'type', value: loc(`wiredfurni.params.variables.idtype.${selected.variableType}`), inspectable: false },
                { key: 'target', value: targetString(selected), inspectable: false },
                { key: 'availability', value: t(`wiredfurni.params.variables.availability.${selected.availabilityType}`, loc('wiredfurni.params.variables.availability.misc')), inspectable: false },
                { key: 'has_value', value: bool(selected.hasValue), inspectable: false },
                { key: 'can_write_to', value: bool(selected.canWriteValue), inspectable: false },
                { key: 'can_create_delete', value: bool(selected.canCreateAndDelete), inspectable: false },
                { key: 'can_intercept', value: bool(selected.canInterceptChanges), inspectable: false },
                { key: 'is_always_available', value: bool(selected.alwaysAvailable), inspectable: false },
                { key: 'can_read_creation_time', value: bool(selected.canReadCreationTime), inspectable: false },
                { key: 'can_read_last_update_time', value: bool(selected.canReadLastUpdateTime), inspectable: false },
                { key: 'is_text_connected', value: bool(!!selected.textConnector), inspectable: false },
            ]
        : [];

    // `updateTextTableUI`.
    const connector = selected?.textConnector;
    const hasTexts = !!connector;
    const textKeys = connector ? [ ...connector.keys() ].sort((a, b) => a - b) : [];
    const texts: TextRow[] = (connector && (textKeys.length <= MAX_TEXT_CONNECTIONS)) ? textKeys.map(value => ({ value, text: connector.get(value) ?? '' })) : [];

    const listColumns: TableColumn[] = [ { id: 'variable', title: '', widthFactor: 1, alignment: 'left' } ];
    const propertyColumns: TableColumn[] = [
        { id: 'property', title: loc('wiredmenu.variable_overview.properties.column.property'), widthFactor: 0.52, alignment: 'left' },
        { id: 'value', title: loc('wiredmenu.variable_overview.properties.column.value'), widthFactor: 0.48, alignment: 'left' },
    ];
    const textColumns: TableColumn[] = [
        { id: 'value', title: loc('wiredmenu.variable_overview.text.column.value'), widthFactor: 0.2, alignment: 'left' },
        { id: 'text', title: loc('wiredmenu.variable_overview.text.column.text'), widthFactor: 0.8, alignment: 'right' },
    ];

    const canHighlight = canHighlightWiredVariable(selected);
    const canManage = canManageWiredVariable(selected);
    const canDelete = canDeleteWiredVariable(selected, hasWritePermission);

    const propertyCell = (row: PropertyRow, columnId: string): TableCell => ((columnId === 'property')
        ? { text: t(`wiredmenu.variable_overview.properties.${row.key}`, `wiredmenu.variable_overview.properties.${row.key}`) }
        : { text: row.value, inspectable: row.inspectable });

    return (
        <TemplateWindow
            id="habbo-user-defined-room-events-com/wired_menu_view_xml"
            part="variable_overview_container"
            bindings={{
                '': { visible: true },
                ...wiredMenuTypePickerBindings(type, sourceType => selectWiredOverviewType(send, sourceType)),
                variable_list_container: {
                    children: (
                        <TableView
                            columns={listColumns}
                            rows={listed}
                            getRowId={variable => variable.variableId}
                            getCell={variable => ({ text: variable.variableName })}
                            showHeader={false}
                            selectedId={selected ? selected.variableId : null}
                            scrollResetKey={listScrollKey}
                            onRowSelected={(variable) => {
                                if (variable) selectWiredOverviewVariable(send, variable.variableId);
                            }}
                            layout={FILL}
                        />
                    ),
                },
                // `updateButtonsUI`; `startHighlight` / `stopHighlight` set the caption.
                highlight_holders_button: {
                    caption: loc(highlightEnabled ? 'wiredmenu.variable_overview.unhighlight_holders' : 'wiredmenu.variable_overview.highlight_holders'),
                    disableSection: !canHighlight,
                    onPointerTap: () => toggleWiredOverviewHighlight(send),
                },
                manage_button: { disableSection: !canManage, onPointerTap: () => manageWiredOverviewVariable(send) },
                delete_button: { disableSection: !canDelete, onPointerTap: () => deleteWiredOverviewVariableHolders(send) },
                variable_properties_table_container: {
                    children: (
                        <TableView
                            columns={propertyColumns}
                            rows={properties}
                            getRowId={row => row.key}
                            getCell={propertyCell}
                            layout={FILL}
                        />
                    ),
                },
                variable_texts_table_container: {
                    disableSection: !hasTexts,
                    // `disableSection` walks into the windows the table built in the container too:
                    // every one of them faded and taking no input.
                    children: (
                        <Box
                            alpha={hasTexts ? 1 : 0.5}
                            eventMode={hasTexts ? 'auto' : 'none'}
                            layout={FILL}
                        >
                            <TableView
                                columns={textColumns}
                                rows={texts}
                                getRowId={row => String(row.value)}
                                getCell={(row, columnId) => ({ text: (columnId === 'value') ? String(row.value) : row.text, inspectable: true })}
                                scrollResetKey={textsScrollKey}
                                layout={FILL}
                            />
                        </Box>
                    ),
                },
            }}
        />
    );
};
