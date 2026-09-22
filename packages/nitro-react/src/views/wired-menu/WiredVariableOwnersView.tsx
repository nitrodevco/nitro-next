/**
 * Who holds a permanent user variable - `VariableManagementOverviewView` on
 * `variables_management_overview_xml`, a `PagedTableView` of 50 holders a page
 * (`VariableManagementOverviewTableObject`): user type, name (a link to a user's profile),
 * creation and last update time, value, and "manage", which opens the holder in the detail
 * window. The user type and sort menus ask for page 1 again (280 ms request limit); every page
 * that arrives puts its own filters back into the menus.
 *
 * The info text is a literal in the layout (it has no localization key), and so it is here. The
 * layout's `searching_icon` is left out: `onPageRequested`, the only thing that shows it, is never
 * called by this window. The reference server (turbo-cloud) does not implement these packets.
 *
 * Every text is style 3 without a `text_style` var (`u_regular`); the keys add `bold`, and
 * `info_text` is an `html` window (markup, `leading` 1).
 */
import type { IWiredUserVariablesElement, IWiredUserVariablesPage, IWiredVariable } from '@nitrodevco/nitro-packets';
import { useRef, useState } from 'react';

import { closeWiredVariableOwners, openWiredUserProfile, openWiredVariableHolder, requestWiredVariableOwnersPage } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { WIRED_VARIABLE_MANAGEMENT_PAGE_SIZE } from '#base/context/wired';
import { Border, Box, Button, Frame, ThemeText } from '#base/theme';

import { useWiredPageRequests } from '../wired-common/useWiredPageRequests';
import { WiredPagedTable } from '../wired-common/WiredPagedTable';
import { calculateLastPage } from '../wired-common/wiredPaging';
import { WiredTableCell, WiredTableColumn } from '../wired-common/WiredTableView';
import { WiredMenuDropmenu } from './WiredMenuDropmenu';
import { wiredVariableValueCell } from './wiredVariableValueCell';

/** `VariableManagementOverviewView.REQUEST_PAGE_RATELIMIT`. */
const REQUEST_PAGE_RATELIMIT = 280;
/** The header above `middle`. */
const HEADER_HEIGHT = 117;
/** The frame's `margin_*` vars: the content box starts under the 33px title bar. */
const FRAME_MARGINS = [ 0, 33, 0, 0 ] as const;
/** `info_text`'s caption, as the layout spells it. */
const INFO_TEXT = 'This is a tool to manage all users that hold a permanent variable.\rFor variables that are shared with other rooms, there is a possible 20 second synchronization delay.';

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

    const columns: WiredTableColumn[] = [
        { id: 'usertype', title: loc('wiredmenu.variable_management.col.usertype'), widthFactor: 0.1 },
        { id: 'name', title: loc('wiredmenu.variable_management.col.name'), widthFactor: 0.18 },
        { id: 'creation_time', title: loc('wiredmenu.variable_management.col.creation_time'), widthFactor: 0.21 },
        { id: 'last_update_time', title: loc('wiredmenu.variable_management.col.last_update_time'), widthFactor: 0.21 },
        { id: 'value', title: loc('wiredmenu.variable_management.col.value'), widthFactor: 0.18 },
        { id: 'manage', title: loc('wiredmenu.variable_management.col.manage'), widthFactor: 0.12 },
    ];

    // `VariableManagementOverviewTableObject.getTableCell`.
    const getCell = (element: IWiredUserVariablesElement, columnId: string): WiredTableCell => {
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

    const boldText = (key: string, left: number, top: number) => (
        <ThemeText
            text={loc(key)}
            textStyle="u_regular"
            flashFormat={{ bold: true }}
            verticalAlign="top"
            layout={{ position: 'absolute', left, top, height: 17 }}
        />
    );

    return (
        <Frame
            variant="3"
            id="wired_variable_owners"
            caption={loc('wiredmenu.variable_management.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="y"
            centered
            rememberPosition={false}
            onClose={closeWiredVariableOwners}
            layout={{ position: 'absolute', width: 700, height: 508, minWidth: 700, maxWidth: 700, minHeight: 380, maxHeight: 700 }}
            margins={FRAME_MARGINS}
            contentLayout={{ flexDirection: 'column' }}
        >
            <Box layout={{ width: 700, height: HEADER_HEIGHT, flexShrink: 0 }}>
                <Border
                    variant="4"
                    layout={{ position: 'absolute', left: 8, top: 7, width: 603, height: 38 }}
                >
                    <ThemeText
                        text={INFO_TEXT.replace(/\r/g, '\n')}
                        textStyle="u_regular"
                        textOptions={{ align: 'center', wordWrap: true, wordWrapWidth: 596 }}
                        flashFormat={{ leading: 1 }}
                        markup
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 1, top: 3, width: 600, height: 32 }}
                    />
                </Border>
                <Box layout={{ position: 'absolute', left: 15, top: 55, height: 20, flexDirection: 'row', gap: 2 }}>
                    <ThemeText
                        text={loc('wiredmenu.variable_management.variable_name')}
                        textStyle="u_regular"
                        flashFormat={{ bold: true }}
                        verticalAlign="top"
                        layout={{ height: 17 }}
                    />
                    <ThemeText
                        text={variable.variableName}
                        textStyle="u_regular"
                        verticalAlign="top"
                        layout={{ height: 17 }}
                    />
                </Box>
                <Box layout={{ position: 'absolute', left: 15, top: 80, width: 217, height: 25 }}>
                    {boldText('wiredmenu.variable_management.usertype', 0, 3)}
                    <WiredMenuDropmenu
                        items={userTypeItems}
                        selected={userType}
                        canSelect={() => requests.canRequestNewPage(false)}
                        onSelect={(index) => {
                            setUserType(index);
                            changeFilters(sortType, index);
                        }}
                        layout={{ position: 'absolute', left: 68, top: 0, width: 131, height: 25 }}
                    />
                </Box>
                <Box layout={{ position: 'absolute', left: 247, top: 80, width: 217, height: 25 }}>
                    {boldText('wiredmenu.variable_management.sort_by', 0, 3)}
                    <WiredMenuDropmenu
                        items={sortItems}
                        selected={sortType}
                        canSelect={() => requests.canRequestNewPage(false)}
                        onSelect={(index) => {
                            setSortType(index);
                            changeFilters(index, userType);
                        }}
                        layout={{ position: 'absolute', left: 53, top: 0, width: 135, height: 25 }}
                    />
                </Box>
                <Button
                    variant="3"
                    onPointerTap={requests.refresh}
                    layout={{ position: 'absolute', left: 621, top: 12, width: 62, height: 30 }}
                >
                    {loc('wiredmenu.list_view.refresh')}
                </Button>
            </Box>
            <WiredPagedTable
                columns={columns}
                rows={page.elements}
                getRowId={element => `${element.entityType}-${element.entityId}`}
                getCell={getCell}
                currentPage={page.currentPage}
                totalEntries={page.totalEntries}
                pageSize={WIRED_VARIABLE_MANAGEMENT_PAGE_SIZE}
                pagingTextKey="wiredmenu.variable_management.bottom_text"
                pageKey={page}
                requests={requests}
                scrollResetKey={page}
                layout={{ flex: 1 }}
            />
        </Frame>
    );
};
