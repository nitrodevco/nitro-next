/**
 * The variables of a Flash bitmap window that `FlashBitmap` draws - `BitmapDataController`'s
 * property table, under its own names, and `PivotPoint.PIVOT_NAMES`.
 */

/** `PivotPoint.PIVOT_NAMES`, in the order the client numbers them (0 = `top left`). */
export const PIVOT_POINTS = [ 'top left', 'top center', 'top right', 'center left', 'center', 'center right', 'bottom left', 'bottom center', 'bottom right' ] as const;

export type PivotPoint = typeof PIVOT_POINTS[number];

/**
 * The variables of a Flash bitmap window (`static_bitmap` / `bitmap`) that decide its pixels,
 * under the names `BitmapDataController`'s property table gives them. An omitted field is the
 * client's default - the one `ThemeManager.getPropertyDefaults` hands every theme - so
 * `bitmap={{}}` is a plain bitmap window: stretched to its box on both axes.
 */
export interface FlashBitmapVars {
    /** `stretched_x` (default true): the bitmap is scaled to the window's width, not drawn at its own. */
    stretchedX?: boolean;
    /** `stretched_y` (default true). */
    stretchedY?: boolean;
    /** `zoom_x` (default 1): multiplies the drawn width; a negative zoom mirrors. */
    zoomX?: number;
    /** `zoom_y` (default 1). */
    zoomY?: number;
    /** `pivot_point` (default `top left`): where in the window an unstretched bitmap sits. */
    pivot?: PivotPoint;
    /** `wrap_x` (default false): the drawn bitmap is tiled across the window. */
    wrapX?: boolean;
    /** `wrap_y` (default false). */
    wrapY?: boolean;
    /** `flip_x` (default false): mirrored; a negative `zoom_x` flips it back. */
    flipX?: boolean;
    /** `flip_y` (default false). */
    flipY?: boolean;
    /** `rotation` in degrees (default 0) - see `getTextureRotated`. */
    rotation?: number;
    /** `etching_color` as `0xAARRGGBB` (default 0, none): a silhouette drawn under the bitmap at the etching point. */
    etchingColor?: number;
    /**
     * `fit_size_to_contents` (default false): the window takes the bitmap's size times the zoom
     * (`BitmapDataController.fitSize`), whatever size the layout gave it.
     */
    fitSizeToContents?: boolean;
}
