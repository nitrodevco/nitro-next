import { RoomObjectUserType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { ChooserItem } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { useViewportSize } from '#base/hooks';
import { TemplateWindow } from '#base/theme';
import { TableCell, TableColumn, TableView } from '#base/views/shared/table/TableView';

/** `UsersView`'s columns. */
const COLUMN_USER_NAME = 'name';
const COLUMN_TYPE = 'type';

/** `createWindow`: the window opens 10 from the desktop's right edge and 10 down. */
const WINDOW_MARGIN = 10;
const WINDOW_WIDTH = 290;

/**
 * `type_dropdown`'s entries are all, users, pets and bots (`new_user_chooser.usertype.4`): the
 * pick is the user type, except that the fourth entry (index 3) is the bots' type 4.
 */
const typeOfSelection = (selection: number) => ((selection === 3) ? Number(RoomObjectUserType.RentableBot) : selection);

export interface UserChooserViewProps {
    items: readonly ChooserItem[];
    onChoose: (item: ChooserItem) => void;
    onClose: () => void;
}

/**
 * The user chooser - `UsersView` on `new_user_chooser_view`: everyone in the room in a table
 * (`TableView`: name, type), filtered by the search text in the name and by the type picked in
 * `type_dropdown`, whose entries come with the layout; a row's click selects that user in the room
 * (`ChooserWidgetBase.choose`).
 */
export const UserChooserView = ({ items, onChoose, onClose }: UserChooserViewProps) => {
    const t = useTranslation();
    const { width: viewportWidth } = useViewportSize();
    const [ search, setSearch ] = useState('');
    const [ typeSelection, setTypeSelection ] = useState(0);

    // `populateWithFilters`.
    const needle = search.toLowerCase();
    const type = typeOfSelection(typeSelection);
    const rows = items.filter(item => (!needle.length || (item.lowerCaseName.indexOf(needle) !== -1)) && ((type <= 0) || (item.type === type)));

    const columns: TableColumn[] = [
        { id: COLUMN_USER_NAME, title: t('new_user_chooser.col.name', 'new_user_chooser.col.name'), widthFactor: 0.65, alignment: 'left' },
        { id: COLUMN_TYPE, title: t('new_user_chooser.col.type', 'new_user_chooser.col.type'), widthFactor: 0.35, alignment: 'left' },
    ];

    // `UsersChooserTableObject.getTableCell`.
    const getCell = (item: ChooserItem, columnId: string): TableCell => ((columnId === COLUMN_USER_NAME)
        ? { text: item.name, inspectable: true }
        : { text: t(`new_user_chooser.usertype.${item.type}`) });

    return (
        <TemplateWindow
            id="habbo-room-ui-com/new_user_chooser_view"
            frame={{ id: 'user-chooser', defaultPosition: { x: viewportWidth - WINDOW_WIDTH - WINDOW_MARGIN, y: WINDOW_MARGIN }, onClose }}
            bindings={{
                '': { caption: t('widget.chooser.user.title') },
                search_placeholder: { visible: !search.length },
                text_input: { caption: search, onChange: setSearch },
                clear_button: { visible: !!search.length, onPointerTap: () => setSearch('') },
                type_dropdown: { selection: typeSelection, onSelect: setTypeSelection },
                table_container: {
                    children: (
                        <TableView
                            columns={columns}
                            rows={rows}
                            getRowId={item => `${item.type}-${item.id}`}
                            getCell={getCell}
                            onRowClicked={onChoose}
                            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                        />
                    ),
                },
                amount_indicator: { caption: t('new_user_chooser.amount_indicator', '', { amount: String(rows.length) }) },
            }}
        />
    );
};
