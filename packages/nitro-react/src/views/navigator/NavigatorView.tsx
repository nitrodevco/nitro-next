import { ForwardToARandomPromotedRoomComposer, GetGuestRoomComposer, IRoomInfo, NavigatorAddCollapsedCategoryComposer, NavigatorAddSavedSearchComposer, NavigatorRemoveCollapsedCategoryComposer, NavigatorSetSearchCodeViewModeComposer, NewNavigatorSearchComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorActions, useNavigatorStore } from '#base/context/navigator';
import { useTranslation } from '#base/context/system';
import { useWindowVisibility } from '#base/hooks';
import { Border, Frame, LayoutImage, Region, ScrollArea, TabButton, TabContext, ThemeImage, ThemeText } from '#base/theme';

import { NavigatorCategoryView } from './NavigatorCategoryView';
import { NavigatorQuickLinksView } from './NavigatorQuickLinksView';
import { NavigatorSearchView } from './NavigatorSearchView';

export type NavigatorViewWindowParams = { searchCode?: string };

/** `NavigatorView.MAX_WINDOW_WIDTH`, the layout's width. */
const FRAME_WIDTH_EXPANDED = 578;
/**
 * `setLeftPaneVisibility(false)`: the window loses `right_pane.x - left_pane.x + 7` (159 - 6 + 7)
 * and gains the 7 the right pane moves to.
 */
const LEFT_PANE_SHIFT = 160;
const RIGHT_PANE_X_HIDDEN = 7;
const FRAME_WIDTH_COLLAPSED = FRAME_WIDTH_EXPANDED - LEFT_PANE_SHIFT + RIGHT_PANE_X_HIDDEN;
/** `right_pane`'s x, and its width, which the pane keeps when it moves (horizontal scaling is off while the window narrows). */
const RIGHT_PANE_X = 159;
const RIGHT_PANE_WIDTH = 410;
/** `STARTING_TAB_POSITION`, less half the shift while the left pane is hidden. */
const TAB_CONTEXT_X = 115;
const TAB_CONTEXT_X_HIDDEN = TAB_CONTEXT_X - (LEFT_PANE_SHIFT / 2);
const PROMOTE_SEARCH_CODES = [ 'roomads_view', 'myworld_view' ];

/** A `navigator_frame_2` room button: a style 4/5 border, the art centred in its 185x56 region and the caption over it. */
interface RoomButtonProps {
    name: string;
    borderVariant: '4' | '5';
    left: number;
    image: string;
    caption: string;
    tooltip: string;
    onTap?: () => void;
}

const RoomButton = ({ name, borderVariant, left, image, caption, tooltip, onTap }: RoomButtonProps) => (
    <Border
        variant={borderVariant}
        name={`${name}_border`}
        layout={{ position: 'absolute', left, width: 189, bottom: 0, height: 60 }}
    >
        <Region
            name={name}
            tooltip={tooltip}
            onPointerTap={onTap}
            cursor="pointer"
            layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2, overflow: 'hidden' }}
        >
            <ThemeImage
                src={image}
                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                layout={{ position: 'absolute', left: 0, width: 186, top: 0, height: 59 }}
            />
            <ThemeText
                text={caption}
                textStyle="id_heading_2"
                textOptions={{ align: 'center' }}
                flashFormat={{ etchingColor: 0x3F000000, etchingPosition: 'bottom-right' }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 60, width: 125, top: 22, height: 17 }}
            />
        </Region>
    </Border>
);

/**
 * The new navigator's window: `navigator_frame_2`, driven by `NavigatorView.as`.
 *
 * - The left pane (`QuickLinksView`) hides and shows from `temp_back`
 *   (`leftPaneShowHideProcedure` -> `setLeftPaneVisibility`): hidden, the window narrows by 153,
 *   `right_pane` moves to x 7 at its own width and the tab context to 115 - 80.
 * - `onSearchResults`: `create_room` always, then `promote_room_border` for `roomads_view` /
 *   `myworld_view` and `random_room_border` otherwise, in the same place.
 * - While a search is out the window says so the way `isBusy` did: the caption turns to
 *   `${navigator.title.is.busy}` and the translucent `search_waiting_for_results_mask` (colour
 *   0x6feceae0) lies over the last results, which stay underneath - Flash shows no searching text.
 *
 * Not ported: the window-preference sync (`sendWindowPreferences`, telling the server this window's
 * position and size every 5 s after a change) - `Frame` does not hand its container out - and the
 * `room_info_popup` bubble, which `onShowInfo` would open.
 */
export const NavigatorView = () => {
    const topLevelContexts = useNavigatorStore(x => x.topLevelContexts);
    const topLevelContext = useNavigatorStore(x => x.topLevelContext);
    const searchResult = useNavigatorStore(x => x.searchResult);
    const isSearching = useNavigatorStore(x => x.isSearching);
    const leftPaneHidden = useNavigatorStore(x => x.leftPaneHidden);
    const collapsedCategories = useNavigatorStore(x => x.collapsedCategories);
    const preferences = useNavigatorStore(x => x.preferences);
    const { setTopLevelContext, setIsSearching, setLeftPaneHidden, toggleCollapsedCategory, setViewMode } = useNavigatorActions();
    const { hide } = useWindowVisibility('navigator');
    const { send } = useWebSocketContext();
    const t = useTranslation();

    const selectContext = (searchCode: string) => {
        const next = topLevelContexts.find(x => x.searchCode === searchCode);

        if (!next) return;

        setTopLevelContext(next);
        setIsSearching(true);

        send(new NewNavigatorSearchComposer({ searchCodeOriginal: searchCode, filteringData: '' }));
    };

    /*
     * HabboNewNavigator.goToRoom: ask for the room info with roomForward set and close the
     * navigator; the GetGuestRoomResult handler in registerNavigatorHandlers then opens the flat
     * connection, or shows the doorbell / password popup first for a locked room.
     */
    const enterRoom = (room: IRoomInfo) => {
        send(new GetGuestRoomComposer({ roomId: room.roomId, enterRoom: false, roomForward: true }));

        hide();
    };

    const addQuickLink = (searchCode: string) => {
        send(new NavigatorAddSavedSearchComposer({ searchCode, filter: searchResult?.filteringData ?? '' }));
    };

    const collapseCategory = (searchCode: string) => {
        const isCollapsed = collapsedCategories.includes(searchCode);

        send(isCollapsed
            ? new NavigatorRemoveCollapsedCategoryComposer({ categoryName: searchCode })
            : new NavigatorAddCollapsedCategoryComposer({ categoryName: searchCode }));

        toggleCollapsedCategory(searchCode);
    };

    const showMore = (searchCode: string) => {
        setIsSearching(true);

        send(new NewNavigatorSearchComposer({ searchCodeOriginal: searchCode, filteringData: searchResult?.filteringData ?? '' }));
    };

    const toggleMode = (searchCode: string, viewMode: number) => {
        send(new NavigatorSetSearchCodeViewModeComposer({ categoryName: searchCode, viewMode }));

        setViewMode(searchCode, viewMode);
    };

    const frameWidth = leftPaneHidden ? FRAME_WIDTH_COLLAPSED : FRAME_WIDTH_EXPANDED;
    const showPromote = PROMOTE_SEARCH_CODES.includes(searchResult?.searchCodeOriginal ?? '');

    return (
        <Frame
            caption={t(isSearching ? 'navigator.title.is.busy' : 'navigator.title')}
            id="navigator"
            defaultPosition={{ x: 20, y: 20 }}
            variant="3"
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            margins={[ 3, 36, 3, 3 ]}
            layout={{ position: 'absolute', width: frameWidth, minWidth: frameWidth, maxWidth: frameWidth, height: preferences?.windowHeight ?? 628, minHeight: 500 }}
            resizeDirection="y"
            onClose={hide}
        >
            <Border
                variant="3"
                tintColor="#eceae0"
                layout={{ position: 'absolute', left: -3, right: -2, top: -3, bottom: 14 }}
            />
            <Region
                name="white_background"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: -2, right: -2, top: -5, height: 33 }}
            />
            {!leftPaneHidden && <NavigatorQuickLinksView />}
            <Region
                name="right_pane"
                layout={{ position: 'absolute', left: leftPaneHidden ? RIGHT_PANE_X_HIDDEN : RIGHT_PANE_X, width: RIGHT_PANE_WIDTH, top: 25, bottom: 16 }}
            >
                <RoomButton
                    name="create_room"
                    borderVariant="4"
                    left={0}
                    image={LayoutImage('navigator/newnavigator_create_room.png')}
                    caption={t('navigator.create.room')}
                    tooltip={t('navigator.tooltip.create.room')}
                />
                {showPromote
                    ? (
                            <RoomButton
                                name="promote_room"
                                borderVariant="5"
                                left={205}
                                image={LayoutImage('navigator/newnavigator_promote_room.png')}
                                caption={t('navigator.promote.room')}
                                tooltip={t('navigator.tooltip.promote.room')}
                            />
                        )
                    : (
                            <RoomButton
                                name="random_room"
                                borderVariant="5"
                                left={205}
                                image={LayoutImage('navigator/newnavigator_random_room.png')}
                                caption={t('navigator.random.room')}
                                tooltip={t('navigator.tooltip.random.room')}
                                onTap={() => {
                                    send(new ForwardToARandomPromotedRoomComposer({ category: '' }));
                                    hide();
                                }}
                            />
                        )}
                <NavigatorSearchView />
                <ScrollArea
                    orientation="vertical"
                    // `createMainWindow`: `block_results.autoHideScrollBar = false`.
                    hideDisabledScrollbar={false}
                    layout={{ position: 'absolute', left: 1, right: 2, top: 45, bottom: 80, gap: 0 }}
                >
                    <Region
                        name="block_results"
                        layout={{ flexDirection: 'column', gap: 5, width: '100%' }}
                    >
                        {!searchResult?.blocks.length && (
                            <Region
                                name="no_results_container"
                                layout={{ height: 53, width: 388, flexShrink: 0 }}
                            >
                                <ThemeText
                                    text={t('navigator.search.returned.no.results')}
                                    textStyle="u_headline_medium"
                                    // auto_size left under on_resize_align_center: the text grows about its box's centre.
                                    textOptions={{ align: 'center' }}
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 51, width: 286, top: 0, height: 21 }}
                                />
                            </Region>
                        )}
                        {searchResult?.blocks.map(block => (
                            <NavigatorCategoryView
                                key={block.searchCode}
                                block={block}
                                onAddQuickLink={addQuickLink}
                                onBack={() => undefined}
                                onCollapse={collapseCategory}
                                onEnter={enterRoom}
                                onShowMore={showMore}
                                onToggleMode={toggleMode}
                            />
                        ))}
                    </Region>
                </ScrollArea>
                {isSearching && (
                    <Region
                        name="search_waiting_for_results_mask"
                        backgroundColor="#eceae0"
                        backgroundAlpha={0x6F / 0xFF}
                        layout={{ position: 'absolute', left: 0, right: 18, top: 42, bottom: 77 }}
                    />
                )}
            </Region>
            <Region
                name="temp_back"
                tooltip={t('navigator.tooltip.left.show.hide')}
                onPointerTap={() => setLeftPaneHidden(!leftPaneHidden)}
                cursor="pointer"
                layout={{ position: 'absolute', left: 4, width: 28, top: 2, height: 25 }}
            >
                <ThemeImage
                    src={LayoutImage('navigator/newnavigator_button_quicklink_add.png')}
                    bitmap={{ stretchedX: false, stretchedY: false }}
                    layout={{ position: 'absolute', left: 10, width: 18, top: 2, height: 19 }}
                />
            </Region>
            <ThemeImage
                src={LayoutImage('shared/talent_task_progress_bg.png')}
                bitmap={{}}
                layout={{ position: 'absolute', left: -2, right: -11, top: 28, height: 1 }}
            />
            <TabContext
                variant="3"
                name="top_view_select_tab_context"
                // The style 3 context's `tab_selector` sits at x 8, y 0 and lays the tabs side by side with no spacing.
                layout={{ position: 'absolute', left: leftPaneHidden ? TAB_CONTEXT_X_HIDDEN : TAB_CONTEXT_X, width: 450, top: -1, height: 30, paddingLeft: 8, paddingTop: 0, paddingRight: 0, overflow: 'hidden' }}
            >
                {topLevelContexts.map(context => (
                    <TabButton
                        key={context.searchCode}
                        variant="3"
                        tooltip={t('navigator.tooltip.select.tab')}
                        tooltipDelay={1000}
                        selected={topLevelContext?.searchCode === context.searchCode}
                        onPointerTap={() => selectContext(context.searchCode)}
                        // `top_view_select_tab_button` is 88 wide and grows round a longer caption (`resizeToAccommodateChildren`).
                        layout={{ minWidth: 88, height: 32, flexShrink: 0 }}
                    >
                        {t(`navigator.toplevelview.${context.searchCode}`)}
                    </TabButton>
                ))}
            </TabContext>
        </Frame>
    );
};
