/**
 * `HabbiconCollectionTrayView` + `HabbiconCollectionTrayGroupView` - the owned and favourited tabs,
 * `habbicon_view.xml`'s `tray_container`: the tab's name as `tray_title`, a `tray_summary` (how many
 * habbicons, or the empty text), and one `tray_group_template` clone per group in `tray_group_list`,
 * scrolled back to the top on every `refresh`.
 *
 * A group: its title, and one `tray_tile_template` clone per habbicon in its `tray_group_grid`.
 * `resizeToContent` grows the grid to its rows and the group to hold it with `BOTTOM_PADDING` (8)
 * below, never under the sizes the clone had (`arrangeHabbiconTrayGroups`, once the tiles are in).
 * The owned tab has a group per set, the favourited tab one `${habbicons.favourites.title}` group.
 */
import { FederatedPointerEvent, Texture } from 'pixi.js';

import { HabbiconEntryModel, HabbiconSetModel, HabbiconTabMode, HabbiconTabModeName } from '#base/context/habbicons';
import { useTranslation } from '#base/context/system';
import { TemplateBindings, TemplateWindows } from '#base/theme';

import { findHabbiconWindows } from './habbiconTemplate';
import { habbiconTileItem } from './habbiconTileItems';

/** `HabbiconCollectionTrayGroupView.BOTTOM_PADDING`. */
const BOTTOM_PADDING = 8;

export interface HabbiconCollectionTrayBindingsOptions {
    tab: HabbiconTabModeName;
    groups: readonly HabbiconSetModel[];
    t: ReturnType<typeof useTranslation>;
    previews: Readonly<Record<number, Texture>>;
    lockedPreviews: Readonly<Record<number, Texture>>;
    /** Changes with every `refresh`, which scrolls the list back to the top. */
    resetKey: string;
    activeTileId: string | undefined;
    hoveredTileId: string | undefined;
    onTileClick: (entry: HabbiconEntryModel, event: FederatedPointerEvent) => void;
    onTileHover: (entry: HabbiconEntryModel, hovered: boolean) => void;
}

/** `HabbiconCollectionTrayView.refresh`. */
export const habbiconCollectionTrayBindings = ({ tab, groups, t, previews, lockedPreviews, resetKey, activeTileId, hoveredTileId, onTileClick, onTileHover }: HabbiconCollectionTrayBindingsOptions): TemplateBindings => {
    const favourited = (tab === HabbiconTabMode.FAVOURITED);
    // `resolveSummaryText`.
    const summary = groups.length
        ? t(favourited ? 'habbicon_book.tray.favourited.summary' : 'habbicon_book.tray.owned.summary', '', { count: String(groups.reduce((total, group) => total + group.habbicons.length, 0)) })
        : (favourited ? '${habbicon_book.tray.empty.favourited}' : '${habbicon_book.tray.empty.owned}');

    return {
        tray_title: { caption: favourited ? '${habbicon_book.tab.favourited}' : '${habbicon_book.tab.owned}' },
        tray_summary: { caption: summary },
        tray_group_list: {
            scrollResetKey: resetKey,
            // `HabbiconCollectionTrayGroupView.initialize`.
            items: groups.map(group => ({
                key: group.id,
                from: 'tray_group_template',
                bindings: {
                    tray_group_title: { caption: group.title },
                    tray_group_grid: {
                        items: group.habbicons.map(entry => habbiconTileItem({
                            from: 'tray_tile_template',
                            entry,
                            texture: (entry.owned || entry.claimable) ? previews[entry.habbiconId] : lockedPreviews[entry.habbiconId],
                            active: entry.id === activeTileId,
                            hovered: entry.id === hoveredTileId,
                            onClick: onTileClick,
                            onHover: onTileHover,
                        })),
                    },
                },
            })),
        },
    };
};

/** `HabbiconCollectionTrayGroupView.resizeToContent`, on each group once its tiles are in. */
export const arrangeHabbiconTrayGroups = ({ find }: TemplateWindows) => {
    for (const group of findHabbiconWindows(find('tray_group_list'), 'tray_group_template')) {
        const [ grid ] = findHabbiconWindows(group, 'tray_group_grid');

        if (!grid) continue;

        grid.setHeight(Math.max(grid.element?.height ?? 0, grid.scrollableRegion.height));
        group.setHeight(Math.max(group.element?.height ?? 0, grid.y + grid.height + BOTTOM_PADDING));
    }
};
