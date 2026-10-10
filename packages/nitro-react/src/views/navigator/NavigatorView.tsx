/**
 * The new navigator's window: `NavigatorView.as` over the `habbo-new-navigator/navigator_frame_2_xml`
 * window template.
 *
 * `createMainWindow` takes its prototypes out of the layout and clones them as results come: one
 * `category_container` (or `category_container_collapsed`, or `no_results_container`) per result
 * block into `block_results` (`BlockResultsView.displayCurrentResults`), a `navigator_entry_row_container`
 * per room - or a `navigator_entry_tile_container` per three `navigator_entry_tile`s - into each open
 * block's `category_content` (`CategoryElementFactory` / `RoomEntryElementFactory`), a `quick_link` per
 * saved search into `quicklinks_list` (`QuickLinksView`) and a `top_view_select_tab_button` per
 * top-level search into the tab context (`TopViewSelector`). Those are the `items` bindings here.
 *
 * - `SearchView`: the drop menu picks the filter mode and Enter in the field searches with it; the
 *   field holds the grey italic placeholder until it is focused; the clear button empties it. The
 *   refresh button shows while the results carry a filter and repeats the search.
 * - `setLeftPaneVisibility` is the `arrange`: hidden, the window narrows by the left pane, the right
 *   pane moves in to x 7 without stretching and the tabs move left by half as much.
 * - `onSearchResults`: `random_room` - or `promote_room` for `roomads_view` / `myworld_view`.
 * - `isBusy`: `${navigator.title.is.busy}` and the `search_waiting_for_results_mask` while a search is out.
 * - A room's info button opens the room info bubble (`showRoomInfoBubbleAt`), or closes an open one;
 *   hovering a room moves an open one to it.
 * - A block's `category_back` (`actionAllowed == 2`) is `goBack`: the search before this one
 *   (`goBackNavigatorSearch`). The refresh button is `performLastSearch` (`refreshNavigatorSearch`).
 * - Saving a search shows the left pane its quick link goes into (`addSavedSearch`).
 * - The window opens where it was last (`_lastWindowX` / `_lastWindowY` / `_lastWindowHeight`), or
 *   where the server's preferences put it, and reports its place and size for
 *   `useNavigatorWindowPreferencesSync` to send. Its place and size are the server's, so the frame
 *   keeps neither of its own.
 *
 * Not ported: `keepWindowInsideScreenRegion`, and the hotel view's collapse defaults written back
 * into the collapsed list (they are applied as the results draw).
 */
import { ForwardToARandomPromotedRoomComposer, GetGuestRoomComposer, IRoomInfo, ISearchResultList, NavigatorAddCollapsedCategoryComposer, NavigatorAddSavedSearchComposer, NavigatorDeleteSavedSearchComposer, NavigatorRemoveCollapsedCategoryComposer, NavigatorSetSearchCodeViewModeComposer } from '@nitrodevco/nitro-packets';
import { FederatedPointerEvent } from 'pixi.js';
import { useEffect, useState } from 'react';

import { goBackNavigatorSearch, openClientLink, performNavigatorSearch, refreshNavigatorSearch, requestRoomGroupDetails } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { NAVIGATOR_FILTER_TYPES, splitNavigatorFilter, useNavigatorActions, useNavigatorOpeningGeometry, useNavigatorStore } from '#base/context/navigator';
import { useConfigValue, useSystemActions, useTranslation } from '#base/context/system';
import { PerkCodes, useOwnPerkAllowed } from '#base/context/user';
import { useWindowVisibility } from '#base/hooks';
import { getGlobalRect, LayoutWindow, TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows } from '#base/theme';

import { isRepeatedEnter } from './navigatorEnterGuard';
import { ALTERNATING_COLOR_MOD, ALTERNATING_COLOR_NONE, getModulatedBackgroundColor, getUserCountColor, ROW_BASE_COLOR } from './NavigatorRoomEntryUtils';
import { NavigatorRoomInfoPopup } from './NavigatorRoomInfoPopup';

/**
 * `NavigatorView.showRoomInfoBubbleAt(room, x, y, hover)`: `x` / `y` are the screen point the
 * bubble's pointer goes to. A click toggles the bubble; a hover (`hover`) only moves one already up.
 */
export type NavigatorShowRoomInfo = (room: IRoomInfo, x: number, y: number, hover: boolean) => void;

const TEMPLATE = 'habbo-new-navigator/navigator_frame_2_xml';

/** `ResultsModeEnum`. */
const RESULTS_MODE_ROWS = 0;
const RESULTS_MODE_TILES = 1;
/** `RoomEntryElementFactory.TILES_PER_CONTAINER`. */
const TILES_PER_CONTAINER = 3;
/** `CategoryElementFactory.MARGIN_LAYOUT_CATEGORY_CONTAINER`. */
const MARGIN_LAYOUT_CATEGORY_CONTAINER = 13;
/** `navigator_entry_row_container`'s height - `rowEntryTemplateHeight`. */
const ROW_ENTRY_HEIGHT = 20;
/** `setLeftPaneVisibility`: the right pane's x while the left one is hidden, and the gap it keeps. */
const RIGHT_PANE_X_HIDDEN = 7;
const PANE_GAP = 7;
/** `STARTING_TAB_POSITION`. */
const STARTING_TAB_POSITION = 115;
/** `WindowParam`'s horizontal stretch bit, which `setLeftPaneVisibility` lifts off the right pane while it narrows the window. */
const H_STRETCH = 128;
const PROMOTE_SEARCH_CODES = [ 'roomads_view', 'myworld_view' ];
/** `BlockResultsView.HOT_ROOMS_SEARCH_CODE` / `POPULAR_ROOMS_SEARCH_CODE`. */
const HOT_ROOMS = 'hot';
const POPULAR_ROOMS = 'popular';

/** `ViewMode.isEventViewMode(ViewMode.getViewMode(searchCode))`: room ads and event categories show the ad's name. */
const isEventView = (searchCode: string) => searchCode === 'roomads_view' || searchCode === 'new_ads' || searchCode.startsWith('eventcategory__');

/** `RoomEntryUtils.getDoorModeIconAsset`: none for an open door. */
const DOOR_MODE_ASSETS: Record<number, string> = {
    1: 'habbo-window-manager-com-newnavigator_doormode_doorbell_small',
    2: 'habbo-window-manager-com-newnavigator_doormode_password_small',
    3: 'habbo-window-manager-com-newnavigator_doormode_invisible_small',
};

/** The colour helpers' `#rrggbb` as the number a binding's `color` takes. */
const colorNumber = (hex: string) => Number.parseInt(hex.slice(1), 16);

/** The first ancestor of `window` that the layout names `name`. */
const ancestorNamed = (window: LayoutWindow | undefined, name: string) => {
    for (let parent = window?.parent; parent; parent = parent.parent) {
        if (parent.element?.name === name) return parent;
    }

    return undefined;
};

/**
 * `BlockResultsView.applyHotelViewExpansionDefaults`: in the hotel view the hot rooms open and popular
 * closes when there are hot rooms, and the other way round.
 */
const collapsedFor = (searchCodeOriginal: string, blocks: readonly ISearchResultList[], collapsed: readonly string[]) => {
    if (searchCodeOriginal !== 'hotel_view') return collapsed;

    const hasHot = blocks.some(block => block.searchCode === HOT_ROOMS);
    const result = collapsed.filter(code => code !== HOT_ROOMS && code !== POPULAR_ROOMS);

    if (!hasHot) result.push(HOT_ROOMS);
    if (hasHot && blocks.some(block => block.searchCode === POPULAR_ROOMS)) result.push(POPULAR_ROOMS);

    return result;
};

/** The room the info bubble shows and where; `serial` counts each `showRoomInfoBubbleAt`. */
interface RoomInfoBubble {
    room: IRoomInfo;
    x: number;
    y: number;
    serial: number;
}

export const NavigatorView = () => {
    const topLevelContexts = useNavigatorStore(x => x.topLevelContexts);
    const topLevelContext = useNavigatorStore(x => x.topLevelContext);
    const savedSearches = useNavigatorStore(x => x.savedSearches);
    const searchResult = useNavigatorStore(x => x.searchResult);
    const searchFilter = useNavigatorStore(x => x.searchFilter);
    const filterType = useNavigatorStore(x => x.filterType);
    const isSearching = useNavigatorStore(x => x.isSearching);
    const leftPaneHidden = useNavigatorStore(x => x.leftPaneHidden);
    const collapsedCategories = useNavigatorStore(x => x.collapsedCategories);
    const viewModes = useNavigatorStore(x => x.viewModes);
    const preferences = useNavigatorStore(x => x.preferences);
    const { setTopLevelContext, setLeftPaneHidden, toggleCollapsedCategory, setViewMode, setSearchFilter, setFilterType, setWindowGeometry } = useNavigatorActions();
    const canToggleView = useOwnPerkAllowed(PerkCodes.NavigatorRoomThumbnailCamera);
    const thumbnailUrlBase = useConfigValue<string>('navigator.thumbnail.url_base') ?? '';
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const thumbnailsInAmazon = useConfigValue<boolean | string>('new.navigator.official.room.thumbnails.in.amazon');
    const groupBadgeUrl = useConfigValue<string>('badge.asset.group.url') ?? '';
    const { hide } = useWindowVisibility('navigator');
    const { showWindow } = useSystemActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const [ roomInfoBubble, setRoomInfoBubble ] = useState<RoomInfoBubble>();
    const [ roomInfoBubbleResults, setRoomInfoBubbleResults ] = useState(searchResult);
    const [ hoveredQuickLink, setHoveredQuickLink ] = useState<number>();
    // `SearchView.setInputToFilterPlaceHolder`: the field holds the placeholder until focused, and again
    // once results come without a filter (`setTextAndSearchModeFromFilter`).
    const [ placeholderShown, setPlaceholderShown ] = useState(true);
    const [ placeholderResults, setPlaceholderResults ] = useState(searchResult);
    // `createMainWindow`: where the window was last, else where the preferences put it.
    const openingGeometry = useNavigatorOpeningGeometry();
    const openingHeight = openingGeometry?.height || preferences?.windowHeight;
    // The frame's own close and position, made once (`createMainWindow`).
    const [ frame ] = useState(() => ({
        id: 'navigator',
        defaultPosition: { x: openingGeometry?.x ?? preferences?.windowX ?? 20, y: openingGeometry?.y ?? preferences?.windowY ?? 20 },
        rememberPosition: false,
        rememberSize: false,
        onPositionChange: (position: { x: number; y: number }) => setWindowGeometry(position),
        resizeDirection: 'y' as const,
        onClose: hide,
    }));

    // The window's place until it is first dragged; its size comes from `arrange`.
    useEffect(() => {
        setWindowGeometry(frame.defaultPosition);
    }, [ frame, setWindowGeometry ]);

    // `onSearchResults` ends with `_roomInfoPopup.show(false)`, and puts the results' filter in the field.
    if (roomInfoBubbleResults !== searchResult) {
        setRoomInfoBubbleResults(searchResult);
        setRoomInfoBubble(undefined);
    }

    if (placeholderResults !== searchResult) {
        setPlaceholderResults(searchResult);
        setPlaceholderShown(splitNavigatorFilter(searchResult?.filteringData ?? '').searchFilter === '');
    }

    const search = (searchCode: string, filteringData: string) => performNavigatorSearch(send, searchCode, filteringData);

    /** `NavigatorView.showRoomInfoBubbleAt`: a click on an open bubble closes it, a hover only moves one that is up. */
    const showRoomInfo: NavigatorShowRoomInfo = (room, x, y, hover) => {
        if (roomInfoBubble && !hover) {
            setRoomInfoBubble(undefined);

            return;
        }

        if (!roomInfoBubble && hover) return;

        requestRoomGroupDetails(send, room.groupId);
        setRoomInfoBubble({ room, x, y, serial: (roomInfoBubble?.serial ?? 0) + 1 });
    };

    const hideRoomInfo = () => setRoomInfoBubble(undefined);

    /** `RoomEntryElementFactory`'s handlers hand the bubble a point off the region's global rectangle. */
    const showRoomInfoFrom = (event: FederatedPointerEvent, room: IRoomInfo, hover: boolean, dx = 0, dy = 0) => {
        const rect = getGlobalRect(event.currentTarget);

        showRoomInfo(room, rect.x + rect.width + dx, rect.y + (rect.height / 2) + dy, hover);
    };

    /*
     * HabboNewNavigator.goToRoom: ask for the room info with roomForward set and close the
     * navigator; the GetGuestRoomResult handler in registerNavigatorHandlers then opens the flat
     * connection, or shows the doorbell / password popup first for a locked room.
     */
    const enterRoom = (room: IRoomInfo) => {
        if (isRepeatedEnter(room.roomId)) return;

        send(new GetGuestRoomComposer({ roomId: room.roomId, enterRoom: false, roomForward: true }));
        hide();
    };

    const searchCodeOriginal = searchResult?.searchCodeOriginal ?? '';
    const blocks = searchResult?.blocks ?? [];
    const collapsed = collapsedFor(searchCodeOriginal, blocks, collapsedCategories);
    const isOfficialView = searchCodeOriginal.includes('official_view');
    const showPromote = PROMOTE_SEARCH_CODES.includes(searchCodeOriginal);
    const eventView = isEventView(searchCodeOriginal);
    // `setTextAndSearchModeFromFilter`: the refresh button and the clear icon while the results carry a filter.
    const showRefresh = splitNavigatorFilter(searchResult?.filteringData ?? '').searchFilter.length > 0;
    const filterPrefix = NAVIGATOR_FILTER_TYPES.find(x => x.type === filterType)?.prefix ?? '';

    /** `updateCommonEntryElements`: what a row and a tile share. */
    const commonEntryBindings = (room: IRoomInfo, tile: boolean): TemplateBindings => ({
        room_usercount: { caption: String(room.population) },
        room_name: { caption: eventView ? room.adName : room.name },
        go_to_room_region: {
            onPointerTap: () => enterRoom(room),
            // `onTileGoToRoomMouseOver` / `onGoToRoomMouseOver`: an open bubble follows the pointer.
            onPointerOver: event => showRoomInfoFrom(event, room, true, tile ? -6 : 20, tile ? 56 : 0),
        },
        info_popup_click_region: {
            onPointerTap: event => showRoomInfoFrom(event, room, false),
            onPointerOver: event => showRoomInfoFrom(event, room, true),
        },
        room_info_usercount_border: { color: colorNumber(getUserCountColor(room.population, room.playersMax)) },
        doormode_icon: { asset: DOOR_MODE_ASSETS[room.doorMode] ?? '' },
    });

    /** `getNewRowElement`: the row's colour stepped by the alternating modulation. */
    const rowItem = (room: IRoomInfo, alternatingColor: number): TemplateItem => ({
        key: String(room.roomId),
        from: 'navigator_entry_row_container',
        bindings: {
            ...commonEntryBindings(room, false),
            navigator_entry_row_container: { color: colorNumber(getModulatedBackgroundColor(alternatingColor, ROW_BASE_COLOR)) },
            grouphome_icon: { visible: room.groupBadge !== '' },
        },
    });

    /** `getNewTileElement`: the group's badge, and the room's picture - official, or its camera thumbnail. */
    const tileItem = (room: IRoomInfo): TemplateItem => {
        const officialBase = (thumbnailsInAmazon === true || thumbnailsInAmazon === 'true') ? thumbnailUrlBase : imageLibraryUrl;

        return {
            key: String(room.roomId),
            from: 'navigator_entry_tile',
            bindings: {
                ...commonEntryBindings(room, true),
                room_group_badge: room.groupBadge !== '' ? { visible: true, asset: groupBadgeUrl.replace('%badgedata%', room.groupBadge) } : {},
                room_pic_placeholder: { asset: room.officialRoomPicRef ? officialBase + room.officialRoomPicRef : `${thumbnailUrlBase}${room.roomId}.png` },
            },
        };
    };

    const collapse = (searchCode: string) => {
        send(new NavigatorAddCollapsedCategoryComposer({ categoryName: searchCode }));
        toggleCollapsedCategory(searchCode);
    };

    const expand = (searchCode: string) => {
        send(new NavigatorRemoveCollapsedCategoryComposer({ categoryName: searchCode }));
        toggleCollapsedCategory(searchCode);
    };

    /** `HabboNewNavigator.addSavedSearch`: sent while there are results, and the left pane shown either way. */
    const addQuickLink = (searchCode: string) => {
        if (searchResult) send(new NavigatorAddSavedSearchComposer({ searchCode, filter: searchResult.filteringData }));

        setLeftPaneHidden(false);
    };

    const showMore = (searchCode: string) => search(searchCode, searchResult?.filteringData ?? '');

    /** `onCategoryToggleModeClicked`. */
    const toggleMode = (searchCode: string, mode: number) => {
        const next = mode === RESULTS_MODE_ROWS ? RESULTS_MODE_TILES : RESULTS_MODE_ROWS;

        send(new NavigatorSetSearchCodeViewModeComposer({ categoryName: searchCode, viewMode: next }));
        setViewMode(searchCode, next);
    };

    /** `BlockResultsView.renderCurrentResultsBlock`. */
    const blockItem = (block: ISearchResultList, index: number): TemplateItem => {
        const title = block.text === '' ? `\${navigator.searchcode.title.${block.searchCode}}` : block.text;
        const key = `${index}:${block.searchCode}`;
        const open = (!collapsed.includes(block.searchCode) || blocks.length === 1) && !block.forceClosed;
        // `CategoryElementFactory` sizes the block to the list it is going into.
        const fitToList = ({ root }: TemplateWindows) => {
            const container = root();
            const list = ancestorNamed(container, 'block_results');

            if (container && list) container.setWidth(list.width - MARGIN_LAYOUT_CATEGORY_CONTAINER);
        };

        if (!open) {
            return {
                key,
                from: 'category_container_collapsed',
                arrange: fitToList,
                bindings: {
                    category_name: { caption: title },
                    category_show_more: { visible: block.actionAllowed === 1, onPointerTap: () => showMore(block.searchCode) },
                    category_expand: { onPointerTap: () => expand(block.searchCode) },
                    category_name_region: { onPointerTap: () => expand(block.searchCode) },
                    category_add_quick_link: { visible: !isOfficialView, onPointerTap: () => addQuickLink(block.searchCode) },
                },
            };
        }

        const mode = (!canToggleView && searchCodeOriginal !== 'official_view') ? RESULTS_MODE_ROWS : (viewModes[block.searchCode] ?? block.viewMode);
        // The alternating colour steps once per row, or once per full tile container.
        const rowItems = block.guestRooms.map((room, roomIndex) => rowItem(room, ((1 + roomIndex) % 2 === 0) ? ALTERNATING_COLOR_NONE : ALTERNATING_COLOR_MOD));
        const tileContainers: TemplateItem[] = [];

        for (let start = 0; start < block.guestRooms.length; start += TILES_PER_CONTAINER) {
            const rooms = block.guestRooms.slice(start, start + TILES_PER_CONTAINER);

            tileContainers.push({
                key: `tiles:${rooms[0].roomId}`,
                from: 'navigator_entry_tile_container',
                bindings: { navigator_entry_tile_container: { items: rooms.map(tileItem) } },
            });
        }

        return {
            key,
            from: 'category_container',
            arrange: (windows) => {
                // `getOpenCategoryElement` sizes the block to a row per room and one over before adding them.
                const rowsHeight = ROW_ENTRY_HEIGHT * (block.guestRooms.length + 1);

                fitToList(windows);
                windows.root()?.setHeight(16 + rowsHeight);
                windows.find('category_content_background')?.setHeight(12 + rowsHeight);
            },
            bindings: {
                category_name: { caption: title },
                category_back: { visible: block.actionAllowed === 2, onPointerTap: () => goBackNavigatorSearch(send) },
                category_collapse: { visible: block.actionAllowed !== 2, onPointerTap: () => collapse(block.searchCode) },
                category_name_region: { onPointerTap: () => collapse(block.searchCode) },
                category_show_more: { visible: block.actionAllowed === 1, onPointerTap: () => showMore(block.searchCode) },
                category_add_quick_link: { visible: !isOfficialView, onPointerTap: () => addQuickLink(block.searchCode) },
                // Without the thumbnail camera perk both toggles are removed from the controls.
                category_toggle_tiles: { visible: canToggleView && mode === RESULTS_MODE_ROWS, onPointerTap: () => toggleMode(block.searchCode, mode) },
                category_toggle_rows: { visible: canToggleView && mode === RESULTS_MODE_TILES, onPointerTap: () => toggleMode(block.searchCode, mode) },
                // `roomList.spacing = 0` for rows: the layout's 5 is the tile containers'.
                category_content: mode === RESULTS_MODE_ROWS ? { spacing: 0, items: rowItems } : { items: tileContainers },
            },
        };
    };

    /** `QuickLinksView.setQuickLinks`: the search's title, its filter after a dash; a category's own name. */
    const quickLinkCaption = (searchCode: string, filter: string) => {
        const suffix = filter !== '' ? ` - ${filter}` : '';

        if (searchCode.startsWith('category__')) return searchCode.slice('category__'.length) + suffix;

        return t(`navigator.searchcode.title.${searchCode}`, searchCode) + suffix;
    };

    const bindings: TemplateBindings = {
        '': { caption: isSearching ? '${navigator.title.is.busy}' : '${navigator.title}' },
        search_waiting_for_results_mask: { visible: isSearching },

        left_pane: { visible: !leftPaneHidden },
        left_hide_container: { visible: !leftPaneHidden },
        left_show_container: { visible: leftPaneHidden },
        temp_back: {
            onPointerTap: () => {
                setLeftPaneHidden(!leftPaneHidden);
                hideRoomInfo();
            },
        },
        quicklinks_list: {
            items: savedSearches.map(link => ({
                key: String(link.id),
                from: 'quick_link',
                bindings: {
                    quick_link: {
                        onPointerTap: () => search(link.searchCode, link.filter),
                        onPointerOver: () => setHoveredQuickLink(link.id),
                        onPointerOut: () => setHoveredQuickLink(undefined),
                    },
                    quick_link_text: { caption: quickLinkCaption(link.searchCode, link.filter) },
                    remove_quick_link: {
                        visible: hoveredQuickLink === link.id,
                        onPointerTap: (event) => {
                            // The button's click is its own: the row's search does not run.
                            event.stopPropagation();
                            send(new NavigatorDeleteSavedSearchComposer({ searchId: link.id }));
                        },
                    },
                },
            })),
        },

        top_view_select_tab_context: {
            items: topLevelContexts.map(context => ({
                key: context.searchCode,
                from: 'top_view_select_tab_button',
                bindings: {
                    top_view_select_tab_button: {
                        caption: `\${navigator.toplevelview.${context.searchCode}}`,
                        selected: topLevelContext?.searchCode === context.searchCode,
                        onPointerTap: () => {
                            setTopLevelContext(context);
                            search(context.searchCode, '');
                        },
                    },
                },
            })),
        },

        create_room: {
            // `createRoomProcedure` -> `HabboNewNavigator.createRoom`: the room creation window.
            onPointerTap: () => {
                showWindow('navigator_room_create');
                hideRoomInfo();
            },
        },
        random_room_border: { visible: !showPromote },
        random_room: {
            onPointerTap: () => {
                send(new ForwardToARandomPromotedRoomComposer({ category: '' }));
                hideRoomInfo();
                hide();
            },
        },
        promote_room_border: { visible: showPromote },
        promote_room: {
            onPointerTap: () => {
                openClientLink(send, 'catalog/open/room_ad');
                hideRoomInfo();
            },
        },

        filter_type_drop_menu: {
            selection: Math.max(0, NAVIGATOR_FILTER_TYPES.findIndex(x => x.type === filterType)),
            onSelect: index => setFilterType(NAVIGATOR_FILTER_TYPES[index].type),
        },
        search_input: {
            caption: placeholderShown ? t('navigator.filter.input.placeholder', 'filter rooms by...') : searchFilter,
            // `INPUT_PLACEHOLDER_TEXTCOLOR` and italic for the placeholder, black for the text.
            color: placeholderShown ? 0x9f9f9f : 0x000000,
            italic: placeholderShown,
            onFocus: () => setPlaceholderShown(false),
            onChange: setSearchFilter,
            onEnter: () => search(searchCodeOriginal, filterPrefix + searchFilter),
        },
        clear_search_button: {
            onPointerTap: () => {
                setPlaceholderShown(false);
                setSearchFilter('');
            },
        },
        'search.clear.icon': { asset: (showRefresh && searchFilter !== '') ? 'habbo-window-manager-com-icons_close' : 'habbo-window-manager-com-common_small_pen' },
        refreshButtonContainer: { visible: showRefresh },
        refreshButton: { onPointerTap: () => refreshNavigatorSearch(send) },

        block_results: {
            // `createMainWindow`: `block_results.autoHideScrollBar = false`.
            autoHideScrollBar: false,
            items: blocks.length
                ? blocks.map(blockItem)
                : [ { key: 'no_results', from: 'no_results_container' } ],
        },
    };

    /**
     * `setLeftPaneVisibility(false)`: the window loses the left pane and the right pane moves in.
     * Then the window's size, which the preference sync reads (`_window.width` / `_window.height`).
     */
    const arrange = ({ find, root }: TemplateWindows) => {
        const window = root();

        if (!window) return;

        const leftPane = find('left_pane');
        const rightPane = find('right_pane');

        if (leftPaneHidden && leftPane && rightPane) {
            const tabs = find('top_view_select_tab_context');
            const shift = rightPane.x - leftPane.x + PANE_GAP;
            const width = window.width - shift + RIGHT_PANE_X_HIDDEN;

            rightPane.setParamFlag(H_STRETCH, false);
            rightPane.setX(RIGHT_PANE_X_HIDDEN);
            window.minWidth = width;
            window.maxWidth = width;
            window.setWidth(width);
            rightPane.setParamFlag(H_STRETCH, true);
            tabs?.setX(Math.trunc(STARTING_TAB_POSITION - (shift / 2)));
        }

        setWindowGeometry({ width: window.width, height: window.height });
    };

    return (
        <>
            <TemplateWindow
                id={TEMPLATE}
                frame={frame}
                height={openingHeight}
                bindings={bindings}
                arrange={arrange}
            />
            {roomInfoBubble && (
                <NavigatorRoomInfoPopup
                    room={roomInfoBubble.room}
                    x={roomInfoBubble.x}
                    y={roomInfoBubble.y}
                    serial={roomInfoBubble.serial}
                    onClose={hideRoomInfo}
                />
            )}
        </>
    );
};
