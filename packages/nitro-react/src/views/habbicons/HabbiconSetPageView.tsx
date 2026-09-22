/**
 * `HabbiconSetPageView` - the all sets tab's page for the selected set (`habbicon_view.xml`'s
 * `set_page_container`, 380x380 at 160,0): the style 10 `set_page_background`, the `header`
 * (its style 10 `bg1`, the set's title and description, its 154x16 progress bar with
 * `habbicon_book.set_progress.count` beside it), the reward column, and the 234x266 `set_grid`.
 *
 * The grid is a `scrollable_itemgrid_vertical` of 50x50 cells 4px apart: one `tile_template` per
 * habbicon of the set, then `empty_tile_template`s up to `VISIBLE_SLOT_COUNT` (20). With no set
 * the page is hidden.
 */
import { FederatedPointerEvent } from 'pixi.js';

import { getHabbiconSetProgressRatio, HabbiconEntryModel, HabbiconSetModel } from '#base/context/habbicons';
import { useTranslation } from '#base/context/system';
import { Border, Box, InfiniteGrid, Region, ThemeText } from '#base/theme';

import { HABBICON_SET_PROGRESS_BAR } from './habbiconProgressAnimation';
import { HabbiconProgressBarView } from './HabbiconProgressBarView';
import { HabbiconRewardPanelView } from './HabbiconRewardPanelView';
import { HabbiconEmptyTileView, HabbiconTileView } from './HabbiconTileView';

/** `HabbiconSetPageView.VISIBLE_SLOT_COUNT`. */
const VISIBLE_SLOT_COUNT = 20;

type SetGridCell = { entry: HabbiconEntryModel } | { emptySlot: number };

export interface HabbiconSetPageViewProps {
    set: HabbiconSetModel | undefined;
    animate: boolean;
    /** Changes with every `refresh`: the page is filled anew and its bar snaps. */
    resetKey: string;
    activeTileId: string | undefined;
    onTileClick: (entry: HabbiconEntryModel, event: FederatedPointerEvent) => void;
}

export const HabbiconSetPageView = ({ set, animate, resetKey, activeTileId, onTileClick }: HabbiconSetPageViewProps) => {
    const t = useTranslation();

    if (!set) return null;

    const cells: SetGridCell[] = set.habbicons.map(entry => ({ entry }));

    // `addEmptySlots`.
    for (let slot = 0; slot < Math.max(0, VISIBLE_SLOT_COUNT - set.habbicons.length); slot++) cells.push({ emptySlot: slot });

    return (
        <Region layout={{ position: 'absolute', left: 160, top: 0, width: 380, height: 380 }}>
            <Border
                variant="10"
                tintColor="#f6ebd7"
                layout={{ position: 'absolute', left: 0, top: 98, width: 380, height: 282 }}
            />
            <Region layout={{ position: 'absolute', left: 0, top: 2, width: 380, height: 92 }}>
                <Border
                    variant="10"
                    tintColor="#e0cba6"
                    layout={{ position: 'absolute', left: 0, top: 0, width: 380, height: 91 }}
                />
                <ThemeText
                    text={set.title}
                    textStyle="u_bold"
                    textOptions={{ fill: '#2b2b2b', fontSize: 17 }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 12, top: 8, width: 230, height: 22 }}
                />
                <ThemeText
                    text={set.description}
                    textStyle="u_regular"
                    textOptions={{ fill: '#3b3b3b', fontSize: 11, wordWrap: true, wordWrapWidth: 355 }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 13, top: 31, width: 359, height: 30 }}
                />
                <HabbiconProgressBarView
                    ratio={getHabbiconSetProgressRatio(set)}
                    animate={animate}
                    resetKey={resetKey}
                    geometry={HABBICON_SET_PROGRESS_BAR}
                    layout={{ left: 14, top: 65 }}
                />
                <ThemeText
                    text={t('habbicon_book.set_progress.count', '', { collected: String(set.completed), total: String(set.total) })}
                    textStyle="u_bold"
                    textOptions={{ fill: '#2b2b2b' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 178, top: 64 }}
                />
            </Region>
            <HabbiconRewardPanelView set={set} />
            <Box layout={{ position: 'absolute', left: 8, top: 106, width: 234, height: 266, flexDirection: 'column' }}>
                <InfiniteGrid
                    items={cells}
                    itemGrid={{ width: 50, height: 50, spacing: 4 }}
                    scrollbarVariant="100"
                    scrollResetKey={resetKey}
                    getKey={cell => (('entry' in cell) ? `habbicon-${cell.entry.id}` : `empty-${cell.emptySlot}`)}
                    itemRender={cell => (('entry' in cell)
                        ? (
                                <HabbiconTileView
                                    entry={cell.entry}
                                    active={cell.entry.id === activeTileId}
                                    onClick={onTileClick}
                                />
                            )
                        : <HabbiconEmptyTileView />)}
                />
            </Box>
        </Region>
    );
};
