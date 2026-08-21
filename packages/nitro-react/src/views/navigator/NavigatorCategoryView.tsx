import type { IRoomInfo, ISearchResultList } from '@nitrodevco/nitro-packets';

import { useInterpolate, useNavigatorSelectors, useTranslation } from '#base/context';
import { NitroIcon } from '#base/theme';

import { ALTERNATING_COLOR_MOD, ALTERNATING_COLOR_NONE, getModulatedBackgroundColor, ROW_BASE_COLOR, TILE_BASE_COLOR } from './NavigatorRoomEntryUtils';
import { NavigatorRoomEntryView } from './NavigatorRoomEntryView';

/** ResultsModeEnum — ROWS = 0, TILES = 1 */
export const RESULTS_MODE_ROWS = 0;
export const RESULTS_MODE_TILES = 1;

type NavigatorCategoryViewProps = {
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
 * CategoryElementFactory.getCategoryElement — header control visibility is driven
 * entirely by SearchResultList.actionAllowed:
 *   category_back        visible when actionAllowed == 2
 *   category_collapse    visible when actionAllowed != 2
 *   category_show_more   visible when actionAllowed == 1
 * category_toggle_tiles/rows are mutually exclusive on the current resultMode, and
 * category_add_quick_link is hidden while the search code is official_view.
 */
export const NavigatorCategoryView = ({ block, onEnter, onShowInfo, onCollapse, onShowMore, onBack, onAddQuickLink, onToggleMode }: NavigatorCategoryViewProps) => {
    const { collapsedCategories, searchResult, viewModes, perks } = useNavigatorSelectors();
    const t = useTranslation();
    const interpolate = useInterpolate();

    /*
     * BlockResultsView renders a block expanded when
     *   (!isMinimized(searchCode) || isSingleBlock(resultSet)) && !forceClosed
     * isMinimized  = collapsedCategories.indexOf(searchCode) != -1
     * isSingleBlock = resultSet.blocks.length == 1  — a lone block is never collapsed
     */
    const isSingleBlock = (searchResult?.blocks.length ?? 0) === 1;
    const isCollapsed = (collapsedCategories.includes(block.searchCode) && !isSingleBlock) || block.forceClosed;
    // _searchCodeViewMode[searchCode], seeded from the block and updated on toggle
    const storedMode = viewModes[block.searchCode] ?? block.viewMode;
    const isOfficialView = (searchResult?.searchCodeOriginal ?? '').indexOf('official_view') !== -1;
    // CategoryElementFactory removes category_toggle_tiles/rows entirely without this perk
    const canToggleView = perks.some(x => x.code === 'NAVIGATOR_ROOM_THUMBNAIL_CAMERA' && x.isAllowed);

    /*
     * BlockResultsView.renderCurrentResultsBlock:
     *   title = text == "" ? "${navigator.searchcode.title." + searchCode + "}" : text
     *   resultMode = (!isPerkAllowed("NAVIGATOR_ROOM_THUMBNAIL_CAMERA")
     *                 && searchCodeOriginal != "official_view") ? 0 : block.viewMode
     */
    const title = block.text === '' ? `\${navigator.searchcode.title.${block.searchCode}}` : block.text;
    const mode = (!canToggleView && searchResult?.searchCodeOriginal !== 'official_view') ? RESULTS_MODE_ROWS : storedMode;

    return (
        <div className="flex flex-col shrink-0 w-full bg-white">
            {/*
              * category_header is 30 high expanded and 26 collapsed, but Flash positions
              * its children absolutely, so they do NOT recentre when that height changes:
              *   icon  category_collapse y=7 (expanded) / category_expand y=4 (collapsed)
              *   text  category_name     y=5 in BOTH states
              * Collapsed also drops the toggles and category_back, leaving only
              * category_show_more and category_add_quick_link.
              */}
            <div className={`relative ${isCollapsed ? 'h-6.5' : 'h-7.5'}`}>
                <div
                    className="absolute inset-0 cursor-pointer"
                    title={t(isCollapsed ? 'navigator.tooltip.category.expand' : 'navigator.tooltip.category.collapse')}
                    onClick={() => onCollapse(block.searchCode)}>
                    {block.actionAllowed !== 2 && (
                        <NitroIcon
                            className={`absolute left-1.25 ${isCollapsed ? 'top-1' : 'top-1.75'}`}
                            icon={isCollapsed ? 'icon-nav-plus' : 'icon-nav-minus'} />
                    )}
                    {/* category_name — x=20 y=5 h=19, font_size 14, text_color 0xf557b */}
                    <span className="absolute top-1.25 left-5 right-25 truncate font-ubuntu text-[14px] leading-[19px] text-[#0F557B]">
                        {interpolate(title)}
                    </span>
                </div>
                {/*
                  * category_controls_itemlist, spacing 5. category_add_quick_link resolves to
                  * x=363 y=5 in BOTH states: expanded it is 299+64 inside a 396-wide container
                  * (14px from the right), collapsed 347+16 inside a 387-wide one (4px from the
                  * right). The differing insets only compensate for the container narrowing —
                  * this container keeps one width, so the inset must stay constant to match.
                  */}
                <div className="absolute top-1.25 right-0 flex items-start gap-1.25 pr-3.5">
                    {!isCollapsed && canToggleView && (
                        <NitroIcon
                            className="cursor-pointer"
                            icon={mode === RESULTS_MODE_ROWS ? 'icon-nav-thumbnail' : 'icon-nav-inline'}
                            title={t(mode === RESULTS_MODE_ROWS ? 'navigator.tooltip.tiles' : 'navigator.tooltip.rows')}
                            onClick={() => onToggleMode(block.searchCode, mode === RESULTS_MODE_ROWS ? RESULTS_MODE_TILES : RESULTS_MODE_ROWS)} />
                    )}
                    {block.actionAllowed === 1 && (
                        <NitroIcon
                            className="cursor-pointer"
                            icon="icon-nav-category-show-more"
                            title={t('navigator.tooltip.category.show.more')}
                            onClick={() => onShowMore(block.searchCode)} />
                    )}
                    {!isCollapsed && block.actionAllowed === 2 && (
                        <NitroIcon
                            className="cursor-pointer"
                            icon="icon-nav-view-mini"
                            title={t('navigator.back')}
                            onClick={onBack} />
                    )}
                    {!isOfficialView && (
                        <NitroIcon
                            className="cursor-pointer"
                            icon="icon-nav-quicklink-add"
                            title={t('navigator.tooltip.add.saved.search')}
                            onClick={() => onAddQuickLink(block.searchCode)} />
                    )}
                </div>
            </div>
            {/* category_content — roomList.spacing is 0 in ROWS mode, tiles spaced 7 */}
            {!isCollapsed && (
                <div className={mode === RESULTS_MODE_TILES
                    ? 'flex flex-wrap gap-1.75 px-1 pb-1'
                    : 'flex flex-col px-1 pb-1'}>
                    {block.guestRooms.map((room, index) => {
                        // CategoryElementFactory: accumulator starts at 1 and steps per row,
                        // or once per completed group of 3 tiles
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
                                onShowInfo={onShowInfo} />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
