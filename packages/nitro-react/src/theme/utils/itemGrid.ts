/**
 * The geometry of Flash's item grid (`ItemGridController`, inside a `ScrollableItemGridWindow`),
 * which `InfiniteGrid`'s `itemGrid` option lays its cells out by.
 */

/** `habbo_window_layout_scrollable_itemgrid_vertical(_ubuntu)_xml`: the `_SCROLLBAR` is 17 wide, flush right of the `_ITEMGRID`. */
export const ITEM_GRID_SCROLLBAR_WIDTH = 17;

/**
 * Every cell is `width` x `height`, with `spacing` between cells both ways - or
 * `verticalSpacing` between rows when the grid sets it (`ItemGridController.verticalSpacing`,
 * which each column's item list takes as its own `spacing`).
 */
export interface ItemGridLayout {
    width: number;
    height: number;
    spacing?: number;
    verticalSpacing?: number;
}

/**
 * How many columns `ItemGridController.resolveColumnForNextItem` opens in a grid `gridWidth`
 * wide. The first item opens column 0; while the first row is filling, an item opens another
 * column when the last one's `right + item.width <= grid width` - the spacing before the new
 * column is not counted, so the last column may reach up to `spacing` past the grid's edge, where
 * the grid clips it. Column `k` sits at `k * (width + spacing)`, so column `n` opens while
 * `(n - 2) * (width + spacing) + 2 * width <= gridWidth`.
 */
export const itemGridColumnCount = (gridWidth: number, cellWidth: number, spacing: number): number => {
    if (gridWidth < (2 * cellWidth)) return 1;

    return Math.floor((gridWidth - (2 * cellWidth)) / (cellWidth + spacing)) + 2;
};
