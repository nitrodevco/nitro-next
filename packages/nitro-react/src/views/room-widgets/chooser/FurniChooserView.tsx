import { FurniId } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { ChooserItem } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { useViewportSize } from '#base/hooks';
import { TemplateWindow } from '#base/theme';
import { TableCell, TableColumn, TableView } from '#base/views/shared/table/TableView';

/** `FurniView`'s columns. */
const COLUMN_FURNI_NAME = 'name';
const COLUMN_FURNI_OWNER = 'owner';
const COLUMN_ID = 'id';

/** `createWindow`: the window opens 10 from the desktop's right edge and 10 down. */
const WINDOW_MARGIN = 10;
const WINDOW_WIDTH = 413;

/** `ChooserItem.owner`: a Builders Club or temporary furni names where it came from instead of an owner. */
const chooserItemOwner = (item: ChooserItem): string | undefined => {
    if (FurniId.isBuilderClubId(item.id)) return 'Builders Club';
    if (FurniId.isTempId(item.id)) return 'Temp (Wired)';

    return item.ownerName;
};

export interface FurniChooserViewProps {
    items: readonly ChooserItem[];
    onChoose: (item: ChooserItem) => void;
    onClose: () => void;
}

/**
 * The furni chooser - `FurniView` on `new_furni_chooser_view`: every furni of the room in a table
 * (`TableView`: name, owner, id), filtered by the search text - every word of it must be in the
 * name - and by the owner picked in `username_dropdown`; a row's click selects that furni in the
 * room (`ChooserWidgetBase.choose`). `constructOwners` fills the drop menu with "all" and each
 * owner once, and disables it at half blend when there is only one owner to pick; the pick goes
 * back to "all" when the owners change. A Builders Club or temporary furni's owner column reads
 * "-" (`FurniChooserTableObject`), though its owner still names it in the drop menu.
 */
export const FurniChooserView = ({ items, onChoose, onClose }: FurniChooserViewProps) => {
    const t = useTranslation();
    const { width: viewportWidth } = useViewportSize();
    const [ search, setSearch ] = useState('');
    const [ owner, setOwner ] = useState<string | undefined>(undefined);

    // `constructOwners`: "all", then each owner in the order the furni name them.
    const owners: string[] = [];

    for (const item of items) {
        const itemOwner = (chooserItemOwner(item) ?? '');

        if (!owners.includes(itemOwner)) owners.push(itemOwner);
    }

    const ownerOptions = [ t('new_furni_chooser.owner_selector.default', 'new_furni_chooser.owner_selector.default'), ...owners ];
    const selectedOwner = (owner !== undefined) && owners.includes(owner) ? owner : undefined;
    const ownerDisabled = ownerOptions.length <= 2;

    // `populateWithFilters`.
    const words = search.toLowerCase().split(' ');
    const rows = items.filter(item => words.every(word => item.lowerCaseName.indexOf(word) !== -1) && ((selectedOwner === undefined) || ((chooserItemOwner(item) ?? '') === selectedOwner)));

    const columns: TableColumn[] = [
        { id: COLUMN_FURNI_NAME, title: t('new_furni_chooser.col.name', 'new_furni_chooser.col.name'), widthFactor: 0.5, alignment: 'left' },
        { id: COLUMN_FURNI_OWNER, title: t('new_furni_chooser.col.owner', 'new_furni_chooser.col.owner'), widthFactor: 0.25, alignment: 'left' },
        { id: COLUMN_ID, title: t('new_furni_chooser.col.id', 'new_furni_chooser.col.id'), widthFactor: 0.25, alignment: 'left' },
    ];

    // `FurniChooserTableObject.getTableCell`.
    const getCell = (item: ChooserItem, columnId: string): TableCell => {
        switch (columnId) {
            case COLUMN_FURNI_NAME:
                return { text: item.name, inspectable: true };
            case COLUMN_FURNI_OWNER: {
                const itemOwner = chooserItemOwner(item);

                return ((itemOwner === undefined) || FurniId.isBuilderClubId(item.id) || FurniId.isTempId(item.id)) ? { text: '-' } : { text: itemOwner, inspectable: true };
            }
            default:
                return { text: String(item.id), inspectable: true };
        }
    };

    return (
        <TemplateWindow
            id="habbo-room-ui-com/new_furni_chooser_view"
            frame={{ id: 'furni-chooser', defaultPosition: { x: viewportWidth - WINDOW_WIDTH - WINDOW_MARGIN, y: WINDOW_MARGIN }, onClose }}
            bindings={{
                '': { caption: t('widget.chooser.furni.title') },
                search_placeholder: { visible: !search.length },
                text_input: { caption: search, onChange: setSearch },
                clear_button: { visible: !!search.length, onPointerTap: () => setSearch('') },
                username_dropdown: {
                    options: ownerOptions,
                    selection: (selectedOwner === undefined) ? 0 : (owners.indexOf(selectedOwner) + 1),
                    onSelect: index => setOwner((index > 0) ? ownerOptions[index] : undefined),
                    disabled: ownerDisabled,
                    alpha: ownerDisabled ? 0.5 : 1,
                },
                table_container: {
                    children: (
                        <TableView
                            columns={columns}
                            rows={rows}
                            getRowId={item => `${item.category}-${item.id}`}
                            getCell={getCell}
                            onRowClicked={onChoose}
                            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                        />
                    ),
                },
                amount_indicator: { caption: t('new_furni_chooser.amount_indicator', '', { amount: String(rows.length) }) },
            }}
        />
    );
};
