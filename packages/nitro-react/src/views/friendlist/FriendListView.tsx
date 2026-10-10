import { FriendRequestStateType, IMessengerFriend, IMessengerSearchResult } from '@nitrodevco/nitro-packets';
import { useEffect, useMemo, useState } from 'react';

import {
    acceptAllFriendRequests,
    acceptFriendRequest,
    askForAFriend,
    canOpenRoomInvite,
    declineAllFriendRequests,
    declineFriendRequest,
    followFriend,
    openMessengerConversation,
    openProfile,
    searchAvatar,
    showFriendLimitReachedAlert,
    showFriendRequestSentAlert,
} from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useFriendsActions, useFriendsStore } from '#base/context/friend';
import { useConfigValue, useSystemActions, useTranslation, useWindowParams } from '#base/context/system';
import { useFriendRequests, useOfflineFriends, useOnlineFriends, useOwnUserId, userStore, useUserMessengerActions, useUserStore } from '#base/context/user';
import { getGlobalRect, getStoredFramePosition, GlobalRect, LayoutWindow, TemplateBindings, TemplateFrameOptions, TemplateItem, TemplateWindow, TemplateWindows, useTemplate } from '#base/theme';

import { buttonImage, FRIEND_LIST_PAGE_SIZE, FriendCategoryRow, friendListImage, FriendListTip, friendsTabRows, requestsTabRows, searchTabRows } from './friendListEntries';
import { FriendListRelationshipChooser } from './FriendListRelationshipChooser';

export type FriendListViewWindowParams = { tab?: '' | 'friends' | 'requests' | 'search' };

type FriendListTabName = Exclude<FriendListViewWindowParams['tab'], '' | undefined>;

const LIBRARY = 'habbo-friend-list-com';

/** `FriendListView.DEFAULT_LOCATION`. */
const DEFAULT_LOCATION = { x: 110, y: 50 };

/**
 * `FriendListTabs`: the three tabs by their `flt_<id>` in `main_window`, with the footer each adds
 * to its `tab_content` and its header bitmap. `FriendListLaf.getTabTextColor` / `getTabBgColor`
 * give the caption's and the content's colours.
 */
const TABS: readonly { name: FriendListTabName; id: number; caption: string; footer: string; header: string; textColor: number; background: number }[] = [
    { name: 'friends', id: 1, caption: '${friendlist.friends}', footer: 'friends_footer', header: 'hdr_friends', textColor: 0x000000, background: 0xffffffff },
    { name: 'requests', id: 2, caption: '${friendlist.tab.friendrequests}', footer: 'friend_requests_footer', header: 'hdr_friend_requests', textColor: 0xf6f6f6, background: 0xffffffff },
    { name: 'search', id: 3, caption: '${generic.search}', footer: 'search_footer', header: 'hdr_search', textColor: 0xefefef, background: 0xffb6b6b6 },
];

/** `FriendListTabs._windowWidth`, and the least `onWindow` lets a resize leave it. */
const WINDOW_WIDTH = 230;
const MIN_WINDOW_WIDTH = 147;
/** `FriendListView.prepare`'s `height = 350`, the window with a tab open. */
const WINDOW_HEIGHT = 350;
/** The least `onWindow` lets a resize leave `tabContentHeight`. */
const MIN_TAB_CONTENT_HEIGHT = 100;
/** A tab's `header`: its header bitmap's height. */
const TAB_HEADER_HEIGHT = 18;
/**
 * What the window is around its tabs: `main_content` starts them at y 1 and ends a pixel under the
 * last, the 30px `footer` follows, and the window is its content plus 30 (`refreshWindowSize`).
 */
const WINDOW_CHROME_HEIGHT = 62;
/** `refreshScrollBarVisibility`: the list is 22 narrower while it scrolls; the rows are 20 high. */
const SCROLLBAR_ROOM = 22;
const ENTRY_HEIGHT = 20;

/** `Util.getLowestPoint`: the bottom of a window's lowest visible child. */
const lowestPoint = (window: LayoutWindow) => window.children.reduce((lowest, child) => (child.visible ? Math.max(lowest, child.y + child.height) : lowest), 0);

/** `Util.layoutChildrenInArea`: the visible children left to right, wrapped onto rows of the given height. */
const layoutChildrenInArea = (window: LayoutWindow, width: number, rowHeight: number) => {
    let x = 0;
    let y = 0;

    for (const child of window.children) {
        if (!child.visible) continue;

        if ((x > 0) && ((x + child.width) > width)) {
            x = 0;
            y += rowHeight;
        }

        child.setX(x);
        child.setY(y);
        x += child.width;
    }
};

/** `IItemListWindow.getListItemAt`: a list's items are its `container`'s children. */
const listItems = (list: LayoutWindow): readonly LayoutWindow[] => (('container' in list) ? (list.container as LayoutWindow).children : list.children);

const childNamed = (window: LayoutWindow, name: string) => window.children.find(child => child.element?.name === name);

/**
 * The friend list window - `main_window` as `FriendListView` and `FriendListTabsView` fill it: a
 * `flt_<id>` per tab in `main_content`, each its 18px `header` and, while it is the open tab, the
 * `tab_content` holding its list and footer; the window's `footer` under them carries the
 * `info_text` `showInfo` fills with the hovered control's tip. `open_edit_ctgs_but` is hidden:
 * `friendship.category.management.enabled` is not set.
 *
 * With every tab closed the window is as tall as its headers; with one open its height comes from
 * the window - 350 at first, then what the user resizes it to - and the open tab takes what the
 * headers leave (`onWindow`'s `tabContentHeight`), so the scaler only works with a tab open. Where
 * Flash grows the window when the requests tab appears, this keeps the window and shortens the
 * open tab.
 */
export const FriendListView = () => {
    const { tab: activeTab = 'friends' } = useWindowParams('friendlist');
    const { showWindow, toggleWindow, updateWindowParams } = useSystemActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();

    const tooltip = useFriendsStore(x => x.tooltip);
    const filterValue = useFriendsStore(x => x.filterValue);
    const selectedFriendIds = useFriendsStore(x => x.selectedFriendIds);
    const showListSearchInput = useFriendsStore(x => x.showListSearchInput);
    const listSearchValue = useFriendsStore(x => x.listSearchValue);
    const relationshipDropdownId = useFriendsStore(x => x.relationshipDropdownId);
    const { setListSearchValue, setFilterValue, setSelectedFriendIds, setRelationshipDropdownId, setWindowRect, toggleListSearchInput, toggleSelectedFriendId, tooltipHandlers } = useFriendsActions();

    const onlineFriends = useOnlineFriends();
    const offlineFriends = useOfflineFriends();
    const requests = Object.values(useFriendRequests());
    const searchFriends = useUserStore(x => x.searchFriends);
    const searchOthers = useUserStore(x => x.searchOthers);
    const searchResultsReceived = useUserStore(x => x.searchResultsReceived);
    const sentFriendRequestIds = useUserStore(x => x.sentFriendRequestIds);
    const ownUserId = useOwnUserId();
    const highlightedTabs = useUserStore(x => x.friendListTabsHighlighted);
    const { clearAnsweredFriendRequests, markFriendRequestsListShown, setFriendListTabHighlighted } = useUserMessengerActions();

    const messagesPersisted = useConfigValue<boolean>('friend_list.persistent_message_status.enabled') === true;
    const relationshipsEnabled = useConfigValue<boolean>('relationship.status.enabled') === true;
    const selectAllEnabled = useConfigValue<boolean>('friend_list.select_all.enabled') === true;

    /** `FriendCategory.open` and `pageIndex`, by category. */
    const [ openCategories, setOpenCategories ] = useState<number[]>([ 0 ]);
    const [ pageIndexes, setPageIndexes ] = useState<Record<number, number>>({});
    /** The row whose `user_info_region` eye shows its hover state (`setUserInfoState`). */
    const [ hoveredInfo, setHoveredInfo ] = useState<number | undefined>(undefined);
    const [ searchValue, setSearchValue ] = useState('');
    /** `friend_search.focus()`: the filter input holds the focus from when it opens until it loses it. */
    const [ filterFocused, setFilterFocused ] = useState(false);
    const [ chooserAt, setChooserAt ] = useState<GlobalRect | null>(null);
    /** The size the user gave the window, which `onWindow` turns into the tab's and the window's. */
    const [ frameSize, setFrameSize ] = useState<{ width: number; height: number } | null>(null);
    /** Where the window is, for the alerts that open over it (`Util.getLocationRelativeTo`). */
    const [ position, setPosition ] = useState(() => {
        const stored = getStoredFramePosition('friendlist');

        return stored ? { x: stored.dx, y: stored.dy } : DEFAULT_LOCATION;
    });

    const templates = {
        tabContent: useTemplate(`${LIBRARY}/tab_content_xml`),
        friendEntry: useTemplate(`${LIBRARY}/friend_entry_xml`),
        requestEntry: useTemplate(`${LIBRARY}/friend_request_entry_xml`),
        searchEntry: useTemplate(`${LIBRARY}/search_entry_xml`),
        pagelink: useTemplate(`${LIBRARY}/pagelink_xml`),
        friends_footer: useTemplate(`${LIBRARY}/friends_footer_xml`),
        friend_requests_footer: useTemplate(`${LIBRARY}/friend_requests_footer_xml`),
        search_footer: useTemplate(`${LIBRARY}/search_footer_xml`),
    };

    // `FriendRequestsView.fillList`: the requests list exists from the first time the tab is shown.
    useEffect(() => {
        if (activeTab === 'requests') markFriendRequestsListShown();
    }, [ activeTab, markFriendRequestsListShown ]);

    // `FriendListTab.setSelected(true)`: an opened tab is no longer highlighted.
    useEffect(() => {
        if ((activeTab === 'friends') || (activeTab === 'requests')) setFriendListTabHighlighted(activeTab, false);
    }, [ activeTab, setFriendListTabHighlighted ]);

    const resizable = !!activeTab;
    const frame = useMemo<TemplateFrameOptions>(() => ({
        id: 'friendlist',
        defaultPosition: DEFAULT_LOCATION,
        resizeDirection: resizable ? 'all' : 'none',
        onResize: setFrameSize,
        onPositionChange: setPosition,
        onClose: () => toggleWindow('friendlist'),
    }), [ resizable, toggleWindow ]);

    const tip: FriendListTip = (key) => {
        const handlers = tooltipHandlers(key);

        return { onPointerOver: handlers.onMouseEnter, onPointerOut: handlers.onMouseLeave };
    };

    // `FriendListTabsView.isTabVisible`: the requests tab only while there are requests.
    const tabs = TABS.filter(tab => (tab.name !== 'requests') || (requests.length > 0));
    const windowWidth = Math.max(MIN_WINDOW_WIDTH, frameSize?.width ?? WINDOW_WIDTH);
    const tabContentWidth = windowWidth - 2;
    const headersHeight = tabs.length * TAB_HEADER_HEIGHT;
    const openTab = tabs.find(tab => tab.name === activeTab);
    const tabContentHeight = openTab ? Math.max(MIN_TAB_CONTENT_HEIGHT, (frameSize?.height ?? WINDOW_HEIGHT) - headersHeight - WINDOW_CHROME_HEIGHT) : 0;
    const windowHeight = headersHeight + tabContentHeight + WINDOW_CHROME_HEIGHT;

    useEffect(() => {
        setWindowRect({ x: position.x, y: position.y, width: windowWidth, height: windowHeight });
    }, [ position, windowWidth, windowHeight, setWindowRect ]);

    /**
     * `FriendListTabsView.onTabClick`: every tab hears it - the requests tab lets its answered
     * requests go once its list was built, the friends tab drops the relationship chooser - and the
     * tab opens, or closes when it was the open one.
     */
    const clickTab = (name: FriendListTabName) => {
        if (userStore.getState().friendRequestsListShown) clearAnsweredFriendRequests();

        setRelationshipDropdownId(0);
        updateWindowParams('friendlist', { tab: (activeTab === name) ? '' : name });
    };

    // `HabboFriendList`'s two categories, named with `getText`.
    const categories: FriendCategoryRow[] = [
        { id: 0, name: t('friendlist.friends'), friends: onlineFriends },
        { id: -1, name: t('friendlist.friends.offlinecaption'), friends: offlineFriends },
    ].map((category) => {
        const friends = !filterValue ? category.friends : category.friends.filter((friend: IMessengerFriend) => friend.name.toLowerCase().includes(filterValue));
        // `FriendCategory.getPageCount` / `checkPageIndex`: a page past the end falls back to the last one.
        const pageCount = Math.ceil(friends.length / FRIEND_LIST_PAGE_SIZE);
        const pageIndex = Math.max(0, Math.min(pageIndexes[category.id] ?? 0, pageCount - 1));

        return {
            ...category,
            open: openCategories.includes(category.id),
            friends,
            pageCount,
            pageIndex,
            shown: friends.slice(pageIndex * FRIEND_LIST_PAGE_SIZE, (pageIndex + 1) * FRIEND_LIST_PAGE_SIZE),
        };
    });

    const askForFriend = (result: IMessengerSearchResult) => {
        if (askForAFriend(send, result.playerId, result.name)) showFriendRequestSentAlert(result.name);
        else showFriendLimitReachedAlert();
    };

    const rowsOf = (name: FriendListTabName): TemplateItem[] => {
        switch (name) {
            case 'friends':
                return templates.friendEntry && templates.pagelink
                    ? friendsTabRows({
                            entry: templates.friendEntry,
                            pagelink: templates.pagelink,
                            categories,
                            selectedIds: selectedFriendIds,
                            hoveredInfo,
                            messagesPersisted,
                            relationshipsEnabled,
                            selectAllEnabled,
                            tip,
                            onHoverInfo: setHoveredInfo,
                            onToggleCategory: id => setOpenCategories(open => (open.includes(id) ? open.filter(x => x !== id) : [ ...open, id ])),
                            onSelectPage: (id, page) => setPageIndexes(indexes => ({ ...indexes, [id]: page })),
                            onSelectAll: (category, select) => {
                                const ids = category.friends.map(friend => friend.playerId);

                                setSelectedFriendIds(select ? [ ...new Set([ ...selectedFriendIds, ...ids ]) ] : selectedFriendIds.filter(id => !ids.includes(id)));
                            },
                            onToggleFriend: friend => toggleSelectedFriendId(friend.playerId),
                            onStartChat: id => openMessengerConversation(send, id),
                            onFollow: id => followFriend(send, id),
                            onRelationship: (friend, event) => {
                                setChooserAt(getGlobalRect(event.currentTarget));
                                setRelationshipDropdownId(friend.playerId);
                            },
                            onProfile: id => openProfile(send, id),
                        })
                    : [];
            case 'requests':
                return templates.requestEntry
                    ? requestsTabRows({
                            entry: templates.requestEntry,
                            requests,
                            hoveredInfo,
                            tip,
                            onHoverInfo: setHoveredInfo,
                            onAccept: id => acceptFriendRequest(send, id),
                            onDecline: id => declineFriendRequest(send, id),
                            onProfile: id => openProfile(send, id),
                        })
                    : [];
            case 'search':
                return templates.searchEntry
                    ? searchTabRows({
                            entry: templates.searchEntry,
                            received: searchResultsReceived,
                            friends: searchFriends,
                            others: searchOthers,
                            ownUserId,
                            sentRequestIds: sentFriendRequestIds,
                            messagesPersisted,
                            hoveredInfo,
                            tip,
                            onHoverInfo: setHoveredInfo,
                            onStartChat: id => openMessengerConversation(send, id),
                            onAskForFriend: askForFriend,
                            onProfile: id => openProfile(send, id),
                        })
                    : [];
        }
    };

    /** Each tab's `fillFooter`. */
    const footerBindings = (name: FriendListTabName): TemplateBindings => {
        switch (name) {
            case 'friends':
                // `FriendsView.refreshButtons` and its buttons' procedures.
                return {
                    button_room_invite: {
                        disabled: selectedFriendIds.length < 1,
                        ...tip('friendlist.tip.invite'),
                        onPointerTap: () => {
                            if (canOpenRoomInvite()) showWindow('friendlist_invite');
                        },
                    },
                    'button_room_invite/icon': buttonImage('room_invite'),
                    button_open_homepage: { disabled: selectedFriendIds.length !== 1, ...tip('friendlist.tip.home') },
                    'button_open_homepage/icon': buttonImage('open_homepage'),
                    // `onSearchButtonClick`: the button gives way to the filter input and its clear region.
                    button_search: {
                        visible: !showListSearchInput,
                        ...tip('friendlist.tip.search'),
                        onPointerTap: () => {
                            toggleListSearchInput(true);
                            setFilterFocused(true);
                        },
                    },
                    'button_search/icon': buttonImage('search'),
                    friend_search: {
                        visible: showListSearchInput,
                        caption: listSearchValue,
                        focused: filterFocused,
                        onFocus: () => setFilterFocused(true),
                        onBlur: () => setFilterFocused(false),
                        ...tip('friendlist.tip.search'),
                        onChange: setListSearchValue,
                        // `searchInputProcedure`: Enter applies the filter, Escape clears it.
                        onEnter: () => setFilterValue(listSearchValue.toLowerCase()),
                        onKeyDown: (key) => {
                            if (key === 'Escape') toggleListSearchInput(false);
                        },
                    },
                    clear_input_region: { visible: showListSearchInput, onPointerTap: () => toggleListSearchInput(false) },
                    button_remove_friend: {
                        disabled: selectedFriendIds.length < 1,
                        ...tip('friendlist.tip.remove'),
                        onPointerTap: () => toggleWindow('friendlist_remove_confirmation'),
                    },
                    'button_remove_friend/icon': buttonImage('remove_friend'),
                };
            case 'requests': {
                // `refreshButtons`: both only while a request is open.
                const anyOpen = requests.some(request => request.state === FriendRequestStateType.Open);

                return {
                    accept_all_but: { disabled: !anyOpen, ...tip('friendlist.tip.acceptall'), onPointerTap: () => acceptAllFriendRequests(send) },
                    reject_all_but: { disabled: !anyOpen, ...tip('friendlist.tip.declineall'), onPointerTap: () => declineAllFriendRequests(send) },
                };
            }
            case 'search':
                return {
                    // `onSearchStrInput`: Enter searches; the text is cut at 25 characters.
                    search_str: { caption: searchValue, maxChars: 25, ...tip('friendlist.tip.searchstr'), onChange: setSearchValue, onEnter: () => searchAvatar(send, searchValue) },
                    search_but: { ...tip('friendlist.tip.search'), onPointerTap: () => searchAvatar(send, searchValue) },
                    'search_but/search': buttonImage('search'),
                };
        }
    };

    const footerTemplate = openTab && templates[openTab.footer as keyof typeof templates];
    const rows = openTab ? rowsOf(openTab.name) : [];
    // `refreshScrollBarVisibility`: the list scrolls when its rows reach past it.
    const listHeight = Math.max(0, tabContentHeight - 5 - (footerTemplate?.elements[0]?.height ?? 0));
    const scrolls = (rows.length * ENTRY_HEIGHT) > listHeight;

    /** `getTabContent`: `tab_content` in the tab's colour, its footer added and its list filled. */
    const tabContent = (tab: typeof TABS[number]): TemplateItem[] => ((templates.tabContent && footerTemplate)
        ? [ {
                key: `tab_content:${tab.name}`,
                from: templates.tabContent,
                bindings: {
                    '': { color: tab.background, added: [ { key: 'footer', from: footerTemplate, bindings: footerBindings(tab.name) } ] },
                    list_content: { color: tab.background, items: rows },
                    scroller: { visible: scrolls },
                },
            } ]
        : []);

    const bindings: TemplateBindings = {
        open_edit_ctgs_but: { visible: false },
        info_text: { caption: tooltip ? `\${${tooltip}}` : '' },
    };

    for (const tab of TABS) {
        const visible = tabs.includes(tab);
        const selected = tab === openTab;
        // `refreshHeader`: a tab a new message arrived for shows `hdr_hilite` in place of its own
        // header, its caption white (`getTabTextColor(true)`); the black arrows are the friends tab's
        // while it is not highlighted.
        const highlighted = (tab.name !== 'search') && highlightedTabs[tab.name];
        const black = (tab.id === 1) && !highlighted;
        const prefix = `flt_${tab.id}`;

        bindings[prefix] = { visible, added: (visible && selected) ? tabContent(tab) : [] };
        bindings[`${prefix}/header`] = { ...tip(`friendlist.tip.tab.${tab.id}`), onPointerTap: () => clickTab(tab.name) };
        bindings[`${prefix}/header/hdr_hilite`] = { visible: highlighted, asset: friendListImage('hdr_hilite') };
        bindings[`${prefix}/header/${tab.header}`] = { visible: !highlighted, asset: friendListImage(tab.header) };
        // `refreshTabText` sets `name + " (" + getEntryCount() + ")"`, and a text starting with `${`
        // shows only its key's text: the count never shows (official-20261009/friends.png).
        bindings[`${prefix}/header/caption_text`] = { caption: tab.caption, color: highlighted ? 0xffffff : tab.textColor };
        bindings[`${prefix}/header/arrow_down_black`] = { visible: selected && black, ...buttonImage('arrow_down_black') };
        bindings[`${prefix}/header/arrow_right_black`] = { visible: !selected && black, ...buttonImage('arrow_right_black') };
        bindings[`${prefix}/header/arrow_down_white`] = { visible: selected && !black, ...buttonImage('arrow_down_white') };
        bindings[`${prefix}/header/arrow_right_white`] = { visible: !selected && !black, ...buttonImage('arrow_right_white') };
    }

    /** `FriendListTabsView.refresh`, `refreshTabContentDims`, `refreshScrollBarVisibility` and `FriendListView.refreshWindowSize`. */
    const arrange = ({ find }: TemplateWindows) => {
        const content = find('main_content');
        const background = find('main_content/bg');

        if (!content || !background) return;

        content.setWidth(tabContentWidth);
        background.setWidth(tabContentWidth);

        let y = 1;

        for (const tab of tabs) {
            const container = find(`flt_${tab.id}`);
            const header = find(`flt_${tab.id}/header`);
            const picture = find(`flt_${tab.id}/header/${tab.header}`);
            const caption = find(`flt_${tab.id}/header/caption_text`);

            if (!container || !header || !picture || !caption) continue;

            container.setWidth(tabContentWidth);
            container.setY(y);
            header.setWidth(tabContentWidth);
            header.setHeight(TAB_HEADER_HEIGHT);
            // `showBgImage`: the header bitmap shown - its own or `hdr_hilite` - as wide as the tab.
            for (const bitmap of [ picture, find(`flt_${tab.id}/header/hdr_hilite`) ]) {
                bitmap?.setWidth(tabContentWidth);
                bitmap?.setHeight(TAB_HEADER_HEIGHT);
            }

            for (const [ arrow, offset ] of [ [ 'arrow_down_black', 12 ], [ 'arrow_right_black', 15 ], [ 'arrow_down_white', 12 ], [ 'arrow_right_white', 15 ] ] as const) {
                find(`flt_${tab.id}/header/${arrow}`)?.setX(caption.textWidth + offset);
            }

            container.setHeight(TAB_HEADER_HEIGHT + ((tab === openTab) ? tabContentHeight : 0));
            y += container.height;
        }

        content.setHeight(y + 1);
        background.setHeight(content.height);

        const tabContentWindow = find('tab_content');
        const list = find('tab_content/list');
        const listContent = find('list_content');
        const scroller = find('tab_content/scroller');
        const footer = find('tab_content/footer');

        if (tabContentWindow && list && listContent && scroller && footer) {
            const listContentHeight = Math.max(tabContentHeight - list.y - footer.height, 0);
            const rowWidth = (tabContentWidth - 10) - (scrolls ? SCROLLBAR_ROOM : 0);

            tabContentWindow.setHeight(tabContentHeight);
            tabContentWindow.setWidth(tabContentWidth);
            list.setHeight(listContentHeight);
            scroller.setHeight(listContentHeight);
            listContent.setHeight(listContentHeight);
            list.setWidth(tabContentWidth);
            listContent.setWidth(rowWidth);
            scroller.setX(tabContentWidth - 27);
            footer.setY(tabContentHeight - footer.height);
            footer.setWidth(tabContentWidth);

            for (const row of listItems(listContent)) {
                row.setWidth(rowWidth);

                // `refreshPager`: the page links laid out in the pager's width, the row as tall as what it shows.
                const pager = childNamed(row, 'pager');

                if (pager?.visible) {
                    layoutChildrenInArea(pager, pager.width, 15);
                    pager.setHeight(lowestPoint(pager));
                    row.setHeight(Math.max(lowestPoint(row), ENTRY_HEIGHT));
                }
            }
        }

        // `refreshWindowSize`: the footer under the tabs.
        find('footer')?.setY(content.y + content.height);
    };

    const chooserFriendId = chooserAt ? relationshipDropdownId : 0;

    return (
        <>
            <TemplateWindow
                id={`${LIBRARY}/main_window_xml`}
                frame={frame}
                width={windowWidth}
                height={windowHeight}
                bindings={bindings}
                arrange={arrange}
                parameters={{
                    'friendlist.search.friendscaption': { cnt: String(searchFriends.length) },
                    'friendlist.search.otherscaption': { cnt: String(searchOthers.length) },
                }}
            />
            {(chooserFriendId > 0) && chooserAt && (
                <FriendListRelationshipChooser
                    friendId={chooserFriendId}
                    x={chooserAt.x}
                    y={chooserAt.y}
                    onClose={() => setRelationshipDropdownId(0)}
                />
            )}
        </>
    );
};
