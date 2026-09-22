/**
 * The wired menu's variable overview tab - `WiredMenuOverviewTab` on `variable_overview_container`
 * (the 2026 layout, with the red "delete all" button beside "highlight" and "manage"): the type
 * picker, the list of the room's variables of that target (`VariableTableObject`), the selected
 * variable's properties (`PropertyTableObject`) and the texts its values connect to
 * (`TextTableObject`, the table greyed out when there are none).
 */
import type { IWiredVariable } from '@nitrodevco/nitro-packets';

import { canDeleteWiredVariable, canHighlightWiredVariable, canManageWiredVariable, deleteWiredOverviewVariableHolders, manageWiredOverviewVariable, selectWiredOverviewType, selectWiredOverviewVariable, toggleWiredOverviewHighlight } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useWiredHasWritePermission, useWiredStore } from '#base/context/wired';
import { Box, Button, ContainerButton, LayoutImage, ThemeImage, ThemeText } from '#base/theme';

import { WiredTableCell, WiredTableColumn, WiredTableView } from '../wired-common/WiredTableView';
import { WiredMenuTypePicker } from './WiredMenuTypePicker';

/** `MAX_TEXT_CONNECTIONS` - a variable with more texts than this shows none. */
const MAX_TEXT_CONNECTIONS = 400;

interface PropertyRow {
    key: string;
    value: string;
    inspectable: boolean;
}

interface TextRow {
    value: number;
    text: string;
}

/** A container's `title`: bold, `auto_size` none, so it is cut at its box. */
const SectionTitle = ({ text, width }: { text: string; width: number }) => (
    <ThemeText
        text={text}
        textStyle="u_regular"
        flashFormat={{ bold: true }}
        clip
        verticalAlign="top"
        layout={{ position: 'absolute', left: 0, top: 0, width, height: 19 }}
    />
);

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

    const listColumns: WiredTableColumn[] = [ { id: 'variable', title: '', widthFactor: 1, alignment: 'left' } ];
    const propertyColumns: WiredTableColumn[] = [
        { id: 'property', title: loc('wiredmenu.variable_overview.properties.column.property'), widthFactor: 0.52, alignment: 'left' },
        { id: 'value', title: loc('wiredmenu.variable_overview.properties.column.value'), widthFactor: 0.48, alignment: 'left' },
    ];
    const textColumns: WiredTableColumn[] = [
        { id: 'value', title: loc('wiredmenu.variable_overview.text.column.value'), widthFactor: 0.2, alignment: 'left' },
        { id: 'text', title: loc('wiredmenu.variable_overview.text.column.text'), widthFactor: 0.8, alignment: 'right' },
    ];

    const canHighlight = canHighlightWiredVariable(selected);
    const canManage = canManageWiredVariable(selected);
    const canDelete = canDeleteWiredVariable(selected, hasWritePermission);

    const propertyCell = (row: PropertyRow, columnId: string): WiredTableCell => ((columnId === 'property')
        ? { text: t(`wiredmenu.variable_overview.properties.${row.key}`, `wiredmenu.variable_overview.properties.${row.key}`) }
        : { text: row.value, inspectable: row.inspectable });

    return (
        <>
            <Box layout={{ position: 'absolute', left: 14, top: 18 }}>
                <WiredMenuTypePicker
                    titleKey="wiredmenu.variable_overview.type"
                    count={4}
                    selected={type}
                    onSelect={sourceType => selectWiredOverviewType(send, sourceType)}
                />
            </Box>
            <Box layout={{ position: 'absolute', left: 14, top: 94, width: 188, height: 239 }}>
                <SectionTitle
                    text={t('wiredmenu.variable_overview.picker', 'wiredmenu.variable_overview.picker')}
                    width={165}
                />
                <WiredTableView
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
                    layout={{ position: 'absolute', left: 0, top: 20, width: 188, height: 219, flex: 0 }}
                />
            </Box>
            <Box layout={{ position: 'absolute', left: 14, top: 342, width: 188, height: 25, flexDirection: 'row', gap: 8 }}>
                <Box
                    alpha={canHighlight ? 1 : 0.5}
                    layout={{ width: 73, height: 25 }}
                >
                    <Button
                        variant="3"
                        disabled={!canHighlight}
                        tooltip={t('wiredmenu.variable_overview.highlight_holders.tooltip', 'wiredmenu.variable_overview.highlight_holders.tooltip')}
                        onPointerTap={() => toggleWiredOverviewHighlight(send)}
                        layout={{ width: 73, height: 25 }}
                    >
                        {loc(highlightEnabled ? 'wiredmenu.variable_overview.unhighlight_holders' : 'wiredmenu.variable_overview.highlight_holders')}
                    </Button>
                </Box>
                <Box
                    alpha={canManage ? 1 : 0.5}
                    layout={{ width: 73, height: 25 }}
                >
                    <Button
                        variant="3"
                        disabled={!canManage}
                        tooltip={t('wiredmenu.variable_overview.manage.tooltip', 'wiredmenu.variable_overview.manage.tooltip')}
                        onPointerTap={() => manageWiredOverviewVariable(send)}
                        layout={{ width: 73, height: 25 }}
                    >
                        {t('wiredmenu.variable_overview.manage', 'wiredmenu.variable_overview.manage')}
                    </Button>
                </Box>
                {/* `delete_button` is `dynamic_style="button"`: disabled, the style fades it (0.5, and its
                    `#icon` rule halves the icon again), which is why `Util.disableSection` leaves the
                    tagged icon's blend alone - so no hand-made fade wraps this one. */}
                <Box layout={{ width: 25, height: 25 }}>
                    <ContainerButton
                        variant="7"
                        tintColor="#e33934"
                        dynamicStyle="button"
                        disabled={!canDelete}
                        tooltip={t('wiredmenu.variable_overview.delete_all.tooltip', 'wiredmenu.variable_overview.delete_all.tooltip')}
                        onPointerTap={() => deleteWiredOverviewVariableHolders(send)}
                        layout={{ width: 25, height: 25 }}
                    >
                        <ThemeImage
                            src={LayoutImage('shared/forum_forum_hide.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, etchingColor: 0x48000000, fitSizeToContents: true }}
                            dynamicRole="icon"
                            eventMode="none"
                            layout={{ position: 'absolute', left: 6, top: 2, width: 16, height: 16 }}
                        />
                    </ContainerButton>
                </Box>
            </Box>
            <Box layout={{ position: 'absolute', left: 230, top: 17, width: 256, height: 208 }}>
                <SectionTitle
                    text={t('wiredmenu.variable_overview.properties', 'wiredmenu.variable_overview.properties')}
                    width={188}
                />
                <WiredTableView
                    columns={propertyColumns}
                    rows={properties}
                    getRowId={row => row.key}
                    getCell={propertyCell}
                    layout={{ position: 'absolute', left: 0, top: 20, width: 256, height: 188, flex: 0 }}
                />
            </Box>
            <Box layout={{ position: 'absolute', left: 230, top: 233, width: 256, height: 135 }}>
                <SectionTitle
                    text={t('wiredmenu.variable_overview.text_values', 'wiredmenu.variable_overview.text_values')}
                    width={188}
                />
                <Box
                    alpha={hasTexts ? 1 : 0.5}
                    eventMode={hasTexts ? 'auto' : 'none'}
                    layout={{ position: 'absolute', left: 0, top: 20, width: 256, height: 115 }}
                >
                    <WiredTableView
                        columns={textColumns}
                        rows={texts}
                        getRowId={row => String(row.value)}
                        getCell={(row, columnId) => ({ text: (columnId === 'value') ? String(row.value) : row.text, inspectable: true })}
                        scrollResetKey={textsScrollKey}
                        layout={{ width: 256, height: 115, flex: 0 }}
                    />
                </Box>
            </Box>
        </>
    );
};
