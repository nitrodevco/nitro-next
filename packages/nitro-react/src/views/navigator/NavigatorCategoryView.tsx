import { IRoomInfo, ISearchResultList } from '@nitrodevco/nitro-packets';

import { useInterpolate, useNavigatorSelectors } from '#base/context';
import { Box, ColorLayer, NitroIcon, ThemeText } from '#base/theme';

import { ALTERNATING_COLOR_MOD, ALTERNATING_COLOR_NONE, getModulatedBackgroundColor, ROW_BASE_COLOR, TILE_BASE_COLOR } from './NavigatorRoomEntryUtils';
import { NavigatorRoomEntryView } from './NavigatorRoomEntryView';

export const RESULTS_MODE_ROWS = 0;
export const RESULTS_MODE_TILES = 1;

export interface NavigatorCategoryViewProps {
    block: ISearchResultList;
    onEnter: (room: IRoomInfo) => void;
    onShowInfo?: (room: IRoomInfo) => void;
    onCollapse: (searchCode: string) => void;
    onShowMore: (searchCode: string) => void;
    onBack: () => void;
    onAddQuickLink: (searchCode: string) => void;
    onToggleMode: (searchCode: string, viewMode: number) => void;
}

/**
 * Pixi port of views/navigator/NavigatorCategoryView.tsx. DOM's `title="..."` attributes (the
 * browser's own native hover tooltip, not this app's custom tooltip system) have no Pixi
 * equivalent and are dropped throughout this file - same for NavigatorRoomEntryView.tsx.
 */
export const NavigatorCategoryView = ({ block, onEnter, onShowInfo, onCollapse, onShowMore, onBack, onAddQuickLink, onToggleMode }: NavigatorCategoryViewProps) => {
    const { collapsedCategories, searchResult, viewModes, perks } = useNavigatorSelectors();
    const interpolate = useInterpolate();

    const isSingleBlock = (searchResult?.blocks.length ?? 0) === 1;
    const isCollapsed = (collapsedCategories.includes(block.searchCode) && !isSingleBlock) || block.forceClosed;
    const storedMode = viewModes[block.searchCode] ?? block.viewMode;
    const isOfficialView = (searchResult?.searchCodeOriginal ?? '').indexOf('official_view') !== -1;
    const canToggleView = perks.some(x => x.code === 'NAVIGATOR_ROOM_THUMBNAIL_CAMERA' && x.isAllowed);

    const title = block.text === '' ? `\${navigator.searchcode.title.${block.searchCode}}` : block.text;
    const mode = (!canToggleView && searchResult?.searchCodeOriginal !== 'official_view') ? RESULTS_MODE_ROWS : storedMode;

    return (
        <Box layout={{ position: 'relative', flexDirection: 'column', flexShrink: 0, width: '100%' }}>
            <ColorLayer color="#ffffff" />
            <Box layout={{ position: 'relative', height: isCollapsed ? 26 : 30 }}>
                <Box
                    eventMode="static"
                    cursor="pointer"
                    onPointerTap={() => onCollapse(block.searchCode)}
                    layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
                >
                    {block.actionAllowed !== 2 && (
                        <NitroIcon
                            icon={isCollapsed ? 'icon-nav-plus' : 'icon-nav-minus'}
                            layout={{ position: 'absolute', left: 5, top: isCollapsed ? 4 : 7 }}
                        />
                    )}
                    <ThemeText
                        layout={{ position: 'absolute', top: 5, left: 20, width: 320 }}
                        text={interpolate(title)}
                        textStyle="text-style-regular"
                        textOptions={{ fontSize: 14, fill: '#0F557B' }}
                    />
                </Box>
                <Box layout={{ position: 'absolute', top: 5, right: 14, flexDirection: 'row', alignItems: 'flex-start', gap: 5 }}>
                    {!isCollapsed && canToggleView && (
                        <Box
                            eventMode="static"
                            cursor="pointer"
                            onPointerTap={() => onToggleMode(block.searchCode, mode === RESULTS_MODE_ROWS ? RESULTS_MODE_TILES : RESULTS_MODE_ROWS)}
                            layout={{}}
                        >
                            <NitroIcon
                                icon={mode === RESULTS_MODE_ROWS ? 'icon-nav-thumbnail' : 'icon-nav-inline'}
                                layout={{}}
                            />
                        </Box>
                    )}
                    {block.actionAllowed === 1 && (
                        <Box
                            eventMode="static"
                            cursor="pointer"
                            onPointerTap={() => onShowMore(block.searchCode)}
                            layout={{}}
                        >
                            <NitroIcon
                                icon="icon-nav-category-show-more"
                                layout={{}}
                            />
                        </Box>
                    )}
                    {!isCollapsed && block.actionAllowed === 2 && (
                        <Box
                            eventMode="static"
                            cursor="pointer"
                            onPointerTap={onBack}
                            layout={{}}
                        >
                            <NitroIcon
                                icon="icon-nav-view-mini"
                                layout={{}}
                            />
                        </Box>
                    )}
                    {!isOfficialView && (
                        <Box
                            eventMode="static"
                            cursor="pointer"
                            onPointerTap={() => onAddQuickLink(block.searchCode)}
                            layout={{}}
                        >
                            <NitroIcon
                                icon="icon-nav-quicklink-add"
                                layout={{}}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
            {!isCollapsed && (
                <Box layout={mode === RESULTS_MODE_TILES
                    ? { flexDirection: 'row', flexWrap: 'wrap', gap: 7, paddingLeft: 4, paddingRight: 4, paddingBottom: 4 }
                    : { flexDirection: 'column', paddingLeft: 4, paddingRight: 4, paddingBottom: 4 }}
                >
                    {block.guestRooms.map((room, index) => {
                        const accumulator = 1 + (mode === RESULTS_MODE_TILES ? Math.floor(index / 3) : index);
                        const modulation = (accumulator % 2 === 0) ? ALTERNATING_COLOR_NONE : ALTERNATING_COLOR_MOD;
                        const base = mode === RESULTS_MODE_TILES ? TILE_BASE_COLOR : ROW_BASE_COLOR;

                        return (
                            <NavigatorRoomEntryView
                                key={room.roomId}
                                backgroundColor={getModulatedBackgroundColor(modulation, base)}
                                mode={mode}
                                room={room}
                                onEnter={onEnter}
                                onShowInfo={onShowInfo}
                            />
                        );
                    })}
                </Box>
            )}
        </Box>
    );
};
