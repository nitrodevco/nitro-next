/**
 * URL of a bitmap the Flash client's window layouts draw with.
 *
 * `file` is `<component>/<asset name>`: the art is filed under `public/assets/<component>/` by
 * the client component that names it (`room-ui`, `catalog`, `wired`, ... - see
 * `scripts/generate-layout-views.ts`, which copies it there out of the SWF's asset library), and
 * one bitmap two components draw is in `shared/`. The file name itself is the Flash asset name.
 */
export const LayoutImage = (file: string): string => `./assets/${file}`;
