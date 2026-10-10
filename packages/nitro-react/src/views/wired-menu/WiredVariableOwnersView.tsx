/**
 * Who holds a permanent user variable - `VariableManagementOverviewView` on
 * `variables_management_overview_xml`, a `PagedTableView` of 50 holders a page
 * (`VariableManagementOverviewTableObject`): user type, name (a link to a user's profile),
 * creation and last update time, value, and "manage", which opens the holder in the detail
 * window. The user type and sort menus ask for page 1 again (280 ms request limit); every page
 * that arrives puts its own filters back into the menus.
 *
 * The window is the Flash template itself (its info text is a literal of the layout): the code
 * fills `variable_name_value`, the two menus and the refresh button, puts the table into
 * `table_view` and pages through the layout's own `footer` (`useWiredPagedTableTemplate`). The
 * layout's `searching_icon` stays hidden: `onPageRequested`, the only thing that shows it, is never
 * called by this window. The reference server (turbo-cloud) does not implement these packets.
 */
import type { IWiredUserVariablesElement, IWiredUserVariablesPage, IWiredVariable } from '@nitrodevco/nitro-packets';
import { useRef, useState } from 'react';

import { closeWiredVariableOwners, openWiredUserProfile, openWiredVariableHolder, requestWiredVariableOwnersPage } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { WIRED_VARIABLE_MANAGEMENT_PAGE_SIZE } from '#base/context/wired';
import { TemplateWindow } from '#base/theme';
import { TableCell, TableColumn } from '#base/views/shared/table/TableView';

import { useWiredPagedTableTemplate } from '../wired-common/useWiredPagedTableState';
import { useWiredPageRequests } from '../wired-common/useWiredPageRequests';
import { calculateLastPage } from '../wired-common/wiredPaging';
import { wiredVariableValueCell } from './wiredVariableValueCell';

/** `VariableManagementOverviewView.REQUEST_PAGE_RATELIMIT`. */
const REQUEST_PAGE_RATELIMIT = 280;

/** `userTypeOption` (the setter): the page's user type filter as the menu's selection. */
const userTypeSelection = (userTypeFilter: number): number => {
    if (userTypeFilter === 4) return 3;
    if ((userTypeFilter === 1) || (userTypeFilter === 2)) return userTypeFilter;

    return 0;
};

/** `userTypeOption` (the getter). */
const userTypeFilterOf = (selection: number): number => {
    if (selection === 3) return 4;
    if ((selection === 1) || (selection === 2)) return selection;

    return -1;
};

export interface WiredVariableOwnersViewProps {
    page: IWiredUserVariablesPage;
    variable: IWiredVariable;
}

export const WiredVariableOwnersView = ({ page, variable }: WiredVariableOwnersViewProps) => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const [ userType, setUserType ] = useState(userTypeSelection(page.userTypeFilter));
    const [ sortType, setSortType ] = useState(page.sortTypeFilter);
    const [ shownPage, setShownPage ] = useState(page);
    const nextFilters = useRef<{ sortType: number; userTypeFilter: number } | null>(null);

    // `displayNewPage`: the menus follow the page.
    if (shownPage !== page) {
        setShownPage(page);
        setUserType(userTypeSelection(page.userTypeFilter));
        setSortType(page.sortTypeFilter);
    }

    const requests = useWiredPageRequests({
        currentPage: page.currentPage,
        lastPage: calculateLastPage(page.totalEntries, WIRED_VARIABLE_MANAGEMENT_PAGE_SIZE),
        pageKey: page,
        ratelimit: REQUEST_PAGE_RATELIMIT,
        // `requestPageWithFilters`: the page's filters unless new ones were chosen.
        onRequestPage: (requested) => {
            const filters = nextFilters.current ?? { sortType: page.sortTypeFilter, userTypeFilter: page.userTypeFilter };

            requestWiredVariableOwnersPage(send, requested, filters.sortType, filters.userTypeFilter);
        },
    });

    // `onSelectedFilter`.
    const changeFilters = (nextSortType: number, nextUserType: number) => {
        if (!requests.canRequestNewPage(false)) return;

        nextFilters.current = { sortType: nextSortType, userTypeFilter: userTypeFilterOf(nextUserType) };
        requests.requestPage(1);
        nextFilters.current = null;
    };

    const loc = (key: string) => t(key, key);

    const columns: TableColumn[] = [
        { id: 'usertype', title: loc('wiredmenu.variable_management.col.usertype'), widthFactor: 0.1 },
        { id: 'name', title: loc('wiredmenu.variable_management.col.name'), widthFactor: 0.18 },
        { id: 'creation_time', title: loc('wiredmenu.variable_management.col.creation_time'), widthFactor: 0.21 },
        { id: 'last_update_time', title: loc('wiredmenu.variable_management.col.last_update_time'), widthFactor: 0.21 },
        { id: 'value', title: loc('wiredmenu.variable_management.col.value'), widthFactor: 0.18 },
        { id: 'manage', title: loc('wiredmenu.variable_management.col.manage'), widthFactor: 0.12 },
    ];

    // `VariableManagementOverviewTableObject.getTableCell`.
    const getCell = (element: IWiredUserVariablesElement, columnId: string): TableCell => {
        switch (columnId) {
            case 'usertype': return { text: loc(`wiredfurni.params.usertype.${element.entityType}`) };
            case 'name': return (element.entityType === 1)
                ? { type: 'link', text: element.entityName, inspectable: true, onLinkClick: () => openWiredUserProfile(send, element.entityId) }
                : { text: element.entityName, inspectable: true };
            case 'creation_time': return { text: element.storage.creationTimeStr, inspectable: true };
            case 'last_update_time': return { text: element.storage.lastUpdateTimeStr, inspectable: true };
            case 'value': return wiredVariableValueCell(variable, element.storage.value, loc, false, false);
            default: return { type: 'link', text: loc('wiredmenu.variable_management.manage'), onLinkClick: () => openWiredVariableHolder(send, element.entityType, element.entityId) };
        }
    };

    const userTypeItems = [ 'all', '1', '2', '4' ].map(item => loc(`wiredmenu.variable_management.usertype.${item}`));
    const sortItems = [ 0, 1, 2, 3, 4, 5 ].map(item => loc(`wiredmenu.variable_management.sort_by.${item}`));

    const paged = useWiredPagedTableTemplate({
        columns,
        rows: page.elements,
        getRowId: element => `${element.entityType}-${element.entityId}`,
        getCell,
        currentPage: page.currentPage,
        totalEntries: page.totalEntries,
        pageSize: WIRED_VARIABLE_MANAGEMENT_PAGE_SIZE,
        pagingTextKey: 'wiredmenu.variable_management.bottom_text',
        pageKey: page,
        requests,
        scrollResetKey: page,
    });

    return (
        <TemplateWindow
            id="habbo-user-defined-room-events-com/variables_management_overview_xml"
            frame={{ id: 'wired_variable_owners', centered: true, rememberPosition: false, resizeDirection: 'y', onClose: closeWiredVariableOwners }}
            bindings={{
                variable_name_value: { caption: variable.variableName },
                user_type_menu: {
                    options: userTypeItems,
                    selection: userType,
                    // `WE_SELECT` is prevented while the limiter refuses a new page: the menu keeps its choice.
                    onSelect: (index) => {
                        if (!requests.canRequestNewPage(false)) return;

                        setUserType(index);
                        changeFilters(sortType, index);
                    },
                },
                sort_type_menu: {
                    options: sortItems,
                    selection: sortType,
                    onSelect: (index) => {
                        if (!requests.canRequestNewPage(false)) return;

                        setSortType(index);
                        changeFilters(index, userType);
                    },
                },
                refresh_btn: { onPointerTap: requests.refresh },
                table_view: { children: paged.table },
                ...paged.bindings,
            }}
        />
    );
};
