/**
 * The asset name of a bitmap the Flash client's window layouts draw with - what a `ThemeImage`'s
 * `src` takes, and what `GetAssetManager().getTexture(...)` answers to.
 *
 * `file` is `<component>/<asset name>.png`: the art is filed under `public/assets/<component>/`
 * by the client component that names it (`room-ui`, `catalog`, `wired`, ... - see
 * `scripts/generate-layout-views.ts`, which copies it there out of the SWF's asset library), and
 * one bitmap two components draw is in `shared/`. The file name itself is the Flash asset name.
 *
 * Those files are the input of `scripts/build-asset-bundles.ts`, not something the client fetches:
 * it packs them into `public/assets/bundles/*.nitro` and names each one after its path, extension
 * dropped and `/` turned into `-`. That is all this does - `room-ui/roomtools_gear.png` becomes
 * `room-ui-roomtools_gear`, so a call site still names the file the layout named.
 */
export const LayoutImage = (file: string): string => file
    .replace(/\.[^./]+$/, '')
    .replace(/\//g, '-')
    // A dot left in the stem goes the same way - `GraphicAssetCollection.removeFileExtension`
    // would otherwise cut the name there. See `assetName` in the builder.
    .replace(/\./g, '-');
