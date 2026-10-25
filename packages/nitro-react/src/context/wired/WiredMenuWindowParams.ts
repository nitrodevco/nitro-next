/**
 * What the `wired_menu` window is opened with - the `wiredmenu/...` client links of
 * `WiredMenuController.linkReceived`, already taken apart by `openClientLink`:
 *
 * - `wiredmenu/open` opens the menu where it was left; `wiredmenu/open/<tab>` selects a tab
 *   (`monitor`, `variable_overview`, `inspection`, `chests`, `settings`, `info`).
 * - `wiredmenu/open/inspection/<sourceType>/<id>` (`routeInspectionLink`) inspects a furni
 *   (`sourceType` 0) or a user (1); `wiredmenu/open/variable_overview/<name>`
 *   (`routeOverviewLink`) jumps to a variable by name.
 * - `wiredmenu/logs` opens the room logs list on top of the menu.
 *
 * The window acts on a request once and clears it with `updateWindowParams`, the way
 * `useCatalogPageRequest` does. The type lives with the wired store rather than on the menu's
 * view because the setup dialog raises these links before that view exists to be imported.
 */
export type WiredMenuWindowParams = {
    tab?: string;
    /** `routeInspectionLink`: what to inspect once the inspection tab is up. */
    inspect?: { sourceType: number; id: number };
    /** `routeOverviewLink`: the variable to jump to once the overview tab is up. */
    variableName?: string;
    /** `wiredmenu/logs`: the room logs list is wanted. */
    logs?: boolean;
};
