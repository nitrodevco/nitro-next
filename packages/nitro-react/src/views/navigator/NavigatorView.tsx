import type { IRoomInfo } from '@nitrodevco/nitro-packets';
import { ForwardToARandomPromotedRoomComposer, GetGuestRoomComposer, NavigatorAddCollapsedCategoryComposer, NavigatorAddSavedSearchComposer, NavigatorRemoveCollapsedCategoryComposer, NavigatorSetSearchCodeViewModeComposer, SetNewNavigatorWindowPreferencesComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useRef } from 'react';

import { useNavigatorActions, useNavigatorSelectors, useTranslation, useWebSocketContext } from '#base/context';
import { useNavigatorSearch, useNavigatorVisibility } from '#base/hooks';
import { Border, Frame, NitroIcon, ScrollArea, TabButton, TabContent, TabContext, useTooltip } from '#base/theme';

import { NavigatorCategoryView } from './NavigatorCategoryView';
import { NavigatorQuickLinksView } from './NavigatorQuickLinksView';
import { NavigatorRoomInfoPopupView } from './NavigatorRoomInfoPopupView';
import { NavigatorSearchView } from './NavigatorSearchView';

export type NavigatorViewWindowParams = { searchCode?: string };

/**
 * NavigatorView.setLeftPaneVisibility (NavigatorView.as:447) with
 * _leftPaneMargin = left_pane.x = 6, s1w = 7, V2D = right_pane.x = 159:
 *   delta  = 159 - 6 + 7 = 160
 *   hidden : width = width - delta + 7  ->  578 - 153 = 425
 *   shown  : width = min(578, width + 153)
 *   tab_context.x = hidden ? 115 - delta / 2 = 35 : 115
 *
 * Frame adds px-0.75 and TabContent px-1.25, so content starts 8px in;
 * nine-slice-border sets no border-width, so border-image costs no layout space.
 * temp_back occupies 4px margin + an 18px icon ahead of the tabs.
 */
const FRAME_WIDTH_EXPANDED = 'w-144.5';    /* 578 */
const FRAME_WIDTH_COLLAPSED = 'w-106.25';  /* 425 */
const TAB_OFFSET_EXPANDED = 'ml-21.25';    /* 115 - 8 - 22 */
const TAB_OFFSET_COLLAPSED = 'ml-1.25';    /*  35 - 8 - 22 */

/* text at region(2,2) + (60,22) = (62,24), 125x17, centred, id_heading_2 */
const NAV_BUTTON_TEXT = 'absolute top-6 left-15.5 w-31.25 h-4.25 text-center text-style-u-bold text-white';
/* etching_color 0x3f000000 at etching_position bottom-right */
const NAV_BUTTON_ETCHING = { textShadow: '1px 1px 0 rgba(0, 0, 0, 0.247)' };
/* the only two search codes that swap random_room for promote_room */
const PROMOTE_SEARCH_CODES = ['roomads_view', 'myworld_view'];

/**
 * navigator_frame_2 — frame style="3", 578x628, width pinned (width_min = width_max = 578),
 * height_min 500. Holds top_view_select_tab_context, left_pane and right_pane.
 */
export const NavigatorView = () => {
    const { topLevelContexts, topLevelContext, searchResult, searchText, isSearching, leftPaneHidden, preferences, roomInfoPopup } = useNavigatorSelectors();
    const { setTopLevelContext, setLeftPaneHidden, setCategoryCollapsed, setBlockExpanded, setViewMode, popPreviousSearchContext, showRoomInfoPopup, hideRoomInfoPopup, showCreateRoom } = useNavigatorActions();
    const { hideNavigator } = useNavigatorVisibility();
    const { performSearch, performLastSearch } = useNavigatorSearch();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const tooltip = useTooltip();
    const frameRef = useRef<HTMLDivElement>(null);
    const lastSentRef = useRef<{ x: number; y: number; height: number; paneVisible: boolean; at: number } | null>(null);

    /*
     * HabboNewNavigator.toggle() on opening: the visible setter falls back to
     * performSearch("official_view") when no results exist, then performLastSearch()
     * refetches the last search past the cache (a no-op before the first search).
     */
    useEffect(() => {
        if (!searchResult && !isSearching) performSearch('official_view');

        performLastSearch();
        // mount only — this is the window-open path
    }, []);

    /*
     * NavigatorView.update(): when windowPreferencesChanged and more than 5000ms have
     * elapsed since the last send, call
     *   sendWindowPreferences(x, y, width, height, left_pane.visible, 0)
     * windowPreferencesChanged compares the last sent x, y, height (not width) and
     * left_pane.visible. The SWF keeps left_pane.visible in a field named
     * _lastLeftPaneHidden and sends that, so the 5th wire value is *visible*.
     */
    useEffect(() => {
        const timer = window.setInterval(() => {
            const element = frameRef.current;

            if (!element) return;

            const rect = element.getBoundingClientRect();
            const x = Math.round(rect.left);
            const y = Math.round(rect.top);
            const height = Math.round(rect.height);
            const paneVisible = !leftPaneHidden;
            const last = lastSentRef.current;

            /*
             * The SWF only sends when the values differ from the LAST SENT ones, and it
             * never sends on open — so the first tick just records the baseline instead
             * of clobbering the server-stored preferences with the default position.
             */
            if (!last) {
                lastSentRef.current = { x, y, height, paneVisible, at: 0 };

                return;
            }

            const changed = last.x !== x || last.y !== y || last.height !== height || last.paneVisible !== paneVisible;

            if (!changed) return;
            if ((Date.now() - last.at) <= 5000) return;

            send(new SetNewNavigatorWindowPreferencesComposer({
                x,
                y,
                width: Math.round(rect.width),
                height,
                openSavedSearches: paneVisible,
                resultsMode: 0
            }));

            lastSentRef.current = { x, y, height, paneVisible, at: Date.now() };
        }, 1000);

        return () => window.clearInterval(timer);
        // send is intentionally omitted (unstable identity), matching the other handlers
    }, [leftPaneHidden]);

    /*
     * TopViewSelector click — performSearch(searchCode, "", currentFilterText()):
     * the search itself is unfiltered but the input text is carried across the tab
     */
    const selectContext = (searchCode: string) => {
        const next = topLevelContexts.find(x => x.searchCode === searchCode);

        if (!next) return;

        setTopLevelContext(next);

        performSearch(searchCode, '', searchText);
    };

    const enterRoom = (room: IRoomInfo) => {
        /*
         * goToRoom(flatId) — entry always starts with GetGuestRoom(roomForward); the
         * GetGuestRoomResult handler decides between opening the connection and the
         * doorbell/password dialogs
         */
        send(new GetGuestRoomComposer({ roomId: room.roomId, enterRoom: false, roomForward: true }));

        hideNavigator();
    };

    /*
     * BlockResultsView.onMouseClicked -> showRoomInfoBubbleAt(room, rect.right, rect
     * vertical centre); when the popup is already open, a click just closes it
     */
    const showRoomInfo = (room: IRoomInfo, target: HTMLElement) => {
        if (roomInfoPopup) {
            hideRoomInfoPopup();

            return;
        }

        const rect = target.getBoundingClientRect();

        showRoomInfoPopup(room, rect.right, rect.top + rect.height / 2);
    };

    /*
     * addSavedSearch — only sends while results exist, and always force-shows the
     * left pane (setLeftPaneVisibility(true))
     */
    const addQuickLink = (searchCode: string) => {
        if (searchResult) send(new NavigatorAddSavedSearchComposer({ searchCode, filter: searchResult.filteringData }));

        setLeftPaneHidden(false);
    };

    /*
     * onCategoryCollapseClicked / onCategoryExpandClicked persist to the server and
     * re-render the block via replaceBlock(id, open) — unconditionally, so the user's
     * click overrides a block that arrived with forceClosed set. The composer choice
     * follows the VISIBLE state (the AS3 binds collapse to open blocks and expand to
     * collapsed ones), not collapsedCategories membership.
     */
    const collapseCategory = (searchCode: string, isCollapsed: boolean) => {
        send(isCollapsed
            ? new NavigatorRemoveCollapsedCategoryComposer({ categoryName: searchCode })
            : new NavigatorAddCollapsedCategoryComposer({ categoryName: searchCode }));

        setCategoryCollapsed(searchCode, !isCollapsed);
        setBlockExpanded(searchCode, isCollapsed);
    };

    /* onCategoryShowMoreClicked -> performSearch(searchCode, currentResults.filteringData) */
    const showMore = (searchCode: string) => performSearch(searchCode, searchResult?.filteringData ?? '');

    /* HabboNewNavigator.goBack — re-run the previous search from the context history */
    const goBack = () => {
        const previous = popPreviousSearchContext();

        if (!previous) return;

        performSearch(previous.searchCode, previous.filter);
    };

    /*
     * BlockResultsView.onCategoryToggleModeClicked sends the composer, then writes the
     * new mode straight into the block and re-renders, so the switch is immediate.
     */
    const toggleMode = (searchCode: string, viewMode: number) => {
        send(new NavigatorSetSearchCodeViewModeComposer({ categoryName: searchCode, viewMode }));

        setViewMode(searchCode, viewMode);
    };

    /*
     * ViewMode.getViewMode: roomads_view -> 3, new_ads / eventcategory__* -> 4;
     * isEventViewMode(3|4) makes the entries show roomAdName instead of roomName
     */
    const searchCodeOriginal = searchResult?.searchCodeOriginal ?? '';
    const eventViewMode = searchCodeOriginal === 'roomads_view' || searchCodeOriginal === 'new_ads' || searchCodeOriginal.startsWith('eventcategory__');

    return (
        <Frame
            ref={frameRef}
            /* NavigatorView.set isBusy — the caption swaps while a search is running */
            caption={isSearching ? t('navigator.title.is.busy') : t('navigator.title')}
            /* height_min="500" — useFrameResize clamps the drag to the computed min-height */
            className={`${leftPaneHidden ? FRAME_WIDTH_COLLAPSED : FRAME_WIDTH_EXPANDED} h-157 min-h-125`}
            id="navigator"
            /* setInitialWindowDimensions applies windowHeight; windowX/windowY are desktop
               coordinates and this Frame positions by translate() offset, so they are not
               applied here — see the note in NavigatorView.setInitialWindowDimensions */
            style={preferences ? { height: preferences.windowHeight } : undefined}
            resizeDirection="y"
            variant="3"
            onClose={hideNavigator}>
            {/* white_background — a 576x33 pure-white strip behind the tab row.
                temp_back (28x25 at 4,2) toggles the left pane, then
                top_view_select_tab_context starts at x=115 with 88px tabs */}
            <div className="flex items-end shrink-0 h-8.25 -mx-0.75 px-0.75 bg-white">
                <NitroIcon
                    className="shrink-0 self-center ml-1 cursor-pointer"
                    icon="icon-nav-quicklink-add"
                    {...tooltip(t('navigator.tooltip.left.show.hide'))}
                    onClick={() => setLeftPaneHidden(!leftPaneHidden)} />
                <TabContext className={leftPaneHidden ? TAB_OFFSET_COLLAPSED : TAB_OFFSET_EXPANDED} data-name="tabs">
                    {topLevelContexts.map(context => (
                        <TabButton
                            key={context.searchCode}
                            aria-selected={topLevelContext?.searchCode === context.searchCode}
                            className="w-22"
                            {...tooltip(t('navigator.tooltip.select.tab'))}
                            onClick={() => selectContext(context.searchCode)}>
                            {t(`navigator.toplevelview.${context.searchCode}`)}
                        </TabButton>
                    ))}
                </TabContext>
            </div>
            <TabContent className="flex gap-3">
                <NavigatorQuickLinksView />
                {/* right_pane — 410x548 */}
                <div className="flex flex-col flex-1 min-w-0 h-full">
                    <NavigatorSearchView />
                    {/* block_results — a bare scrollable_itemlist_vertical style="3", 407x423, spacing 5 */}
                    <div className="relative flex flex-col flex-1 min-h-0">
                        <ScrollArea className="flex-1 min-h-0" contentClassName="flex flex-col gap-1.25" variant="3">
                            {/* no_results_container — 388x53 */}
                            {!isSearching && !searchResult?.blocks.length && (
                                <div className="flex items-center justify-center h-13.25 font-ubuntu-bold text-[16px]">
                                    {t('navigator.search.returned.no.results')}
                                </div>
                            )}
                            {searchResult?.blocks.map(block => (
                                <NavigatorCategoryView
                                    key={block.searchCode}
                                    block={block}
                                    eventViewMode={eventViewMode}
                                    onAddQuickLink={addQuickLink}
                                    onBack={goBack}
                                    onCollapse={collapseCategory}
                                    onEnter={enterRoom}
                                    onShowInfo={showRoomInfo}
                                    onShowMore={showMore}
                                    onToggleMode={toggleMode} />
                            ))}
                        </ScrollArea>
                        {/*
                          * search_waiting_for_results_mask — container color="0x6f6feceae0"
                          * background="true", toggled by NavigatorView.searchWaiting; the AS3
                          * uint wraps to AARRGGBB 0x6feceae0 = #eceae0 at alpha 0x6f/255
                          */}
                        {isSearching && <div className="absolute inset-0 z-10 bg-[rgba(236,234,224,0.435)]" />}
                    </div>
                    {/*
                      * create_room_border  border style=4, 189x60 at x=0,   y=488
                      * random_room_border  border style=5, 189x60 at x=205, y=488
                      * promote_room_border border style=5, same slot, visible=false
                      * Each holds a region at (2,2) 185x56 with the button bitmap at the
                      * region origin and a text at x=60 y=22 w=125 h=17, auto_size=center,
                      * text_style=id_heading_2 (Ubuntu bold 12, #ffffff) and an etching of
                      * 0x3f000000 at bottom-right.
                      * Results end at y=468, so the row sits 20px below it.
                      */}
                    {/*
                      * right_pane ends at y=573 of a 589px frame content area (628 - 36
                      * margin_top - 3 margin_bottom), leaving 16px beneath it, and the
                      * buttons sit flush with the pane's bottom. TabContent (pb-0.5) and
                      * the Frame content div (pb-1) already contribute 6px, so 10px more.
                      */}
                    <div className="flex shrink-0 gap-4 pt-5 pb-2.5">
                        {/* createRoomProcedure -> HabboNewNavigator.createRoom() -> roomCreateViewCtrl.show() */}
                        <Border className="relative w-47.25 h-15 cursor-pointer" {...tooltip(t('navigator.tooltip.create.room'))} variant="4" onClick={showCreateRoom}>
                            <div className="absolute top-0.5 left-0.5 w-46.25 h-14 overflow-hidden"><NitroIcon icon="icon-nav-create-room" /></div>
                            <span className={NAV_BUTTON_TEXT} style={NAV_BUTTON_ETCHING}>{t('navigator.create.room')}</span>
                        </Border>
                        {/*
                          * NavigatorView.as:222-233 — after each search result:
                          *   random_room_border.visible  = false
                          *   promote_room_border.visible = false
                          *   searchCodeOriginal is "roomads_view" or "myworld_view"
                          *     ? promote_room_border.visible = true
                          *     : random_room_border.visible  = true
                          * create_room_border is never hidden anywhere in the AS3.
                          */}
                        {PROMOTE_SEARCH_CODES.includes(searchResult?.searchCodeOriginal ?? '')
                            ? (
                                <Border className="relative w-47.25 h-15 cursor-pointer" {...tooltip(t('navigator.tooltip.promote.room'))} variant="5">
                                    <div className="absolute top-0.5 left-0.5 w-46.25 h-14 overflow-hidden"><NitroIcon icon="icon-nav-promote-room" /></div>
                                    <span className={NAV_BUTTON_TEXT} style={NAV_BUTTON_ETCHING}>{t('navigator.promote.room')}</span>
                                </Border>
                            )
                            : (
                                <Border
                                    className="relative w-47.25 h-15 cursor-pointer"
                                    {...tooltip(t('navigator.tooltip.random.room'))}
                                    variant="5"
                                    onClick={() => { send(new ForwardToARandomPromotedRoomComposer({ category: '' })); hideNavigator(); }}>
                                    <div className="absolute top-0.5 left-0.5 w-46.25 h-14 overflow-hidden"><NitroIcon icon="icon-nav-random-room" /></div>
                                    <span className={NAV_BUTTON_TEXT} style={NAV_BUTTON_ETCHING}>{t('navigator.random.room')}</span>
                                </Border>
                            )}
                    </div>
                </div>
            </TabContent>
            <NavigatorRoomInfoPopupView />
        </Frame>
    );
}
