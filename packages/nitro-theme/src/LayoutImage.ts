/**
 * The asset name of a bitmap the Flash client's window layouts draw with - what a `ThemeImage`'s
 * `src` takes, and what `GetAssetManager().getTexture(...)` answers to.
 *
 * `file` is `<library>/<asset name>.png`: the Flash library that has the bitmap
 * (`habbo-room-ui-com`, `habbo-window-manager-com`, ...) and the asset name it has there - the way
 * `getAssetByName` finds it, in the component's own library, else the window manager's. Nitro
 * Studio publishes each library's bitmaps in its bundle (named after the library), named
 * after the library: `habbo-room-ui-com/packagecard_icon_hc.png` is `habbo-room-ui-com-packagecard_icon_hc`.
 *
 * The art the client draws that no library has is under nitro-react's `public/assets/<folder>/`,
 * packed by `scripts/build-asset-bundles.ts` and named after its path the same way:
 * `window-manager/tile_preview_0.png` is `window-manager-tile_preview_0`. That is all this does - extension dropped and
 * `/` turned into `-`.
 */
export const LayoutImage = (file: string): string => file
    .replace(/\.[^./]+$/, '')
    .replace(/\//g, '-')
    // A dot left in the stem goes the same way - `GraphicAssetCollection.removeFileExtension`
    // would otherwise cut the name there. See `assetName` in the builder.
    .replace(/\./g, '-');
