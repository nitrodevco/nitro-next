import type { IRoomInfo } from '@nitrodevco/nitro-packets';
import { ForwardToARandomPromotedRoomComposer, NavigatorAddCollapsedCategoryComposer, NavigatorAddSavedSearchComposer, NavigatorRemoveCollapsedCategoryComposer, NavigatorSetSearchCodeViewModeComposer, NewNavigatorSearchComposer, OpenFlatConnectionComposer } from '@nitrodevco/nitro-packets';

import { useNavigatorActions, useNavigatorSelectors, useTranslation, useWebSocketContext } from '#base/context';
import { useNavigatorVisibility } from '#base/hooks';
import { Border, Box, Frame, NitroIcon, ScrollArea, TabButton, TabContent, TabContext, Text } from '#base/theme-pixi';

import { NavigatorCategoryViewPixi } from './NavigatorCategoryViewPixi';
import { NavigatorQuickLinksViewPixi } from './NavigatorQuickLinksViewPixi';
import { NavigatorSearchViewPixi } from './NavigatorSearchViewPixi';

export type NavigatorViewWindowParams = { searchCode?: string };

const FRAME_WIDTH_EXPANDED = 578;
const FRAME_WIDTH_COLLAPSED = 425;
const TAB_OFFSET_EXPANDED = 85;
const TAB_OFFSET_COLLAPSED = 5;
/** etching_color 0x3f000000 at etching_position bottom-right. */
const NAV_BUTTON_DROP_SHADOW = { color: 0x000000, alpha: 0.247, distance: 1, blur: 0, angle: Math.PI / 4 };
const PROMOTE_SEARCH_CODES = [ 'roomads_view', 'myworld_view' ];

/**
 * Pixi port of views/navigator/NavigatorView.tsx. Drops the `getBoundingClientRect`-driven
 * window-preference-sync effect (periodically telling the server this window's screen
 * position/size) - Pixi's `Frame` doesn't forward a ref to its underlying container (every
 * other themed component does; Frame is the one exception, owning its own ref internally via
 * useFrameDrag), and widening Frame's own ref contract - the single most-used component in this
 * package - for a background telemetry feature with no visible effect on the user wasn't judged
 * worth it. Flagged rather than silently dropped.
 */
export const NavigatorViewPixi = () => {
    const { topLevelContexts, topLevelContext, searchResult, isSearching, leftPaneHidden, collapsedCategories, preferences } = useNavigatorSelectors();
    const { setTopLevelContext, setIsSearching, setLeftPaneHidden, toggleCollapsedCategory, setViewMode } = useNavigatorActions();
    const { hideNavigator } = useNavigatorVisibility();
    const { send } = useWebSocketContext();
    const t = useTranslation();

    const selectContext = (searchCode: string) => {
        const next = topLevelContexts.find(x => x.searchCode === searchCode);

        if (!next) return;

        setTopLevelContext(next);
        setIsSearching(true);

        send(new NewNavigatorSearchComposer({ searchCodeOriginal: searchCode, filteringData: '' }));
    };

    const enterRoom = (room: IRoomInfo) => {
        send(new OpenFlatConnectionComposer({ roomId: room.roomId, password: '', unknown1: -1 }));

        hideNavigator();
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

    return (
        <Frame
            caption={t('navigator.title')}
            id="navigator"
            layout={{ position: 'absolute', top: 20, left: 20, width: leftPaneHidden ? FRAME_WIDTH_COLLAPSED : FRAME_WIDTH_EXPANDED, height: preferences?.windowHeight ?? 628 }}
            resizeDirection="y"
            variant="3"
            onClose={hideNavigator}
        >
            <Box layout={{ flexDirection: 'row', alignItems: 'center', flexShrink: 0 }}>
                <Box
                    eventMode="static"
                    cursor="pointer"
                    onPointerTap={() => setLeftPaneHidden(!leftPaneHidden)}
                    layout={{ flexShrink: 0, marginLeft: 4 }}
                >
                    <NitroIcon
                        icon="icon-nav-quicklink-add"
                        layout={{}}
                    />
                </Box>
                <TabContext
                    variant="3"
                    layout={{ marginLeft: leftPaneHidden ? TAB_OFFSET_COLLAPSED : TAB_OFFSET_EXPANDED }}
                >
                    {topLevelContexts.map(context => (
                        <TabButton
                            key={context.searchCode}
                            selected={topLevelContext?.searchCode === context.searchCode}
                            onPress={() => selectContext(context.searchCode)}
                            layout={{ width: 88 }}
                        >
                            {t(`navigator.toplevelview.${context.searchCode}`)}
                        </TabButton>
                    ))}
                </TabContext>
            </Box>
            <TabContent layout={{ flexDirection: 'row', gap: 12, flex: 1, minHeight: 0 }}>
                <NavigatorQuickLinksViewPixi />
                <Box
                    sortableChildren
                    layout={{ flexDirection: 'column', flex: 1, minWidth: 0, height: '100%' }}
                >
                    <Box
                        zIndex={5}
                        layout={{}}
                    >
                        <NavigatorSearchViewPixi />
                    </Box>
                    <Border
                        blend={0.5}
                        variant="6"
                        layout={{ flex: 1, minHeight: 0, padding: 4 }}
                    >
                        <ScrollArea
                            variant="3"
                            layout={{ flex: 1, minHeight: 0 }}
                        >
                            {isSearching && (
                                <Box layout={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 53 }}>
                                    <Text
                                        text={t('navigator.searching')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#000000' }}
                                    />
                                </Box>
                            )}
                            {!isSearching && !searchResult?.blocks.length && (
                                <Box layout={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 53 }}>
                                    <Text
                                        text={t('navigator.search.returned.no.results')}
                                        textStyle="text-style-headline-small"
                                        textOptions={{ fontSize: 16, fill: '#000000' }}
                                    />
                                </Box>
                            )}
                            {!isSearching && searchResult?.blocks.map(block => (
                                <NavigatorCategoryViewPixi
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
                        </ScrollArea>
                    </Border>
                    <Box layout={{ flexDirection: 'row', gap: 16, flexShrink: 0, paddingTop: 20, paddingBottom: 10 }}>
                        <Box
                            eventMode="static"
                            cursor="pointer"
                            layout={{ position: 'relative', width: 189, height: 60 }}
                        >
                            <Border
                                variant="4"
                                layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
                            />
                            <Box layout={{ position: 'absolute', top: 2, left: 2, width: 185, height: 56, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                                <NitroIcon
                                    icon="icon-nav-create-room"
                                    layout={{}}
                                />
                            </Box>
                            <Text
                                layout={{ position: 'absolute', top: 24, left: 62, width: 125 }}
                                text={t('navigator.create.room')}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff', dropShadow: NAV_BUTTON_DROP_SHADOW }}
                            />
                        </Box>
                        {PROMOTE_SEARCH_CODES.includes(searchResult?.searchCodeOriginal ?? '')
                            ? (
                                    <Box
                                        eventMode="static"
                                        cursor="pointer"
                                        layout={{ position: 'relative', width: 189, height: 60 }}
                                    >
                                        <Border
                                            variant="5"
                                            layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
                                        />
                                        <Box layout={{ position: 'absolute', top: 2, left: 2, width: 185, height: 56, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                                            <NitroIcon
                                                icon="icon-nav-promote-room"
                                                layout={{}}
                                            />
                                        </Box>
                                        <Text
                                            layout={{ position: 'absolute', top: 24, left: 62, width: 125 }}
                                            text={t('navigator.promote.room')}
                                            textStyle="text-style-u-bold"
                                            textOptions={{ fill: '#ffffff', dropShadow: NAV_BUTTON_DROP_SHADOW }}
                                        />
                                    </Box>
                                )
                            : (
                                    <Box
                                        eventMode="static"
                                        cursor="pointer"
                                        onPointerTap={() => { send(new ForwardToARandomPromotedRoomComposer({ category: '' })); hideNavigator(); }}
                                        layout={{ position: 'relative', width: 189, height: 60 }}
                                    >
                                        <Border
                                            variant="5"
                                            layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
                                        />
                                        <Box layout={{ position: 'absolute', top: 2, left: 2, width: 185, height: 56, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                                            <NitroIcon
                                                icon="icon-nav-random-room"
                                                layout={{}}
                                            />
                                        </Box>
                                        <Text
                                            layout={{ position: 'absolute', top: 24, left: 62, width: 125 }}
                                            text={t('navigator.random.room')}
                                            textStyle="text-style-u-bold"
                                            textOptions={{ fill: '#ffffff', dropShadow: NAV_BUTTON_DROP_SHADOW }}
                                        />
                                    </Box>
                                )}
                    </Box>
                </Box>
            </TabContent>
        </Frame>
    );
};
