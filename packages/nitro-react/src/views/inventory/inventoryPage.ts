/**
 * What one page of the inventory does to `inventory_xml` - Flash's `IInventoryView` over the page
 * window `InventoryMainView.extractWindow` took out of `contentArea` (`getView(name)`), which
 * `setViewToCategory` puts back while its tab is selected.
 *
 * Every page is a hook the window calls on each render, with whether its page is the one showing:
 * a page that is not showing returns nothing, and its models still hold what it had. Its bindings
 * and `arrange` name elements by their full path from the window (`inventoryPagePath`), so they
 * can be merged with the window's own.
 */
import type { WindowParams } from '#base/context/system';
import { findTemplateChild, Template, TemplateBindings, TemplateElement, TemplateItem, TemplateWindows } from '#base/theme';

export interface InventoryPage {
    bindings: TemplateBindings;
    /**
     * `updateContainerVisibility`: the window's `loading_container` while the page's list has not
     * arrived, its `empty_container` while it holds nothing; neither otherwise.
     */
    state?: 'loading' | 'empty';
    /** What the page's code sizes and moves once the window is laid out. */
    arrange?: (windows: TemplateWindows) => void;
}

/** What every page hook is handed. */
export interface InventoryPageContext {
    /** The page's tab is the selected one: its window is in `contentArea` and visible. */
    active: boolean;
    /** `habbo-inventory-com`'s templates - the thumbs a grid clones (`inventory_thumb_xml`). */
    templates: Record<string, Template>;
}

export type InventoryPageName = NonNullable<WindowParams<'inventory'>['tab']>;

/** The library every inventory window is built from (`HabboInventoryCom`). */
export const INVENTORY_LIBRARY = 'habbo-inventory-com';

/** A template of the library by its asset name (`inventory_thumb_xml`). */
export const inventoryTemplateId = (asset: string) => `${INVENTORY_LIBRARY}/${asset}`;

/** An element of a page, found as `getView(page).findChildByName(name)` is - within the page's window. */
export const inventoryPagePath = (page: InventoryPageName, name?: string) => (name ? `contentArea/${page}/${name}` : `contentArea/${page}`);

/** `GroupItem.updateBackgroundVisual` and its kin: a thumb's `BG_COLOR` ground, green while it is unseen. */
export const INVENTORY_THUMB_COLOR = 13421772;
export const INVENTORY_THUMB_COLOR_UNSEEN = 10275685;

/**
 * An element of `inventory_xml` by its `/` path, each name looked up within the last - the
 * prototype a page clones (`FurniGridView`'s first `item_grid_pages` item).
 */
export const findInventoryElement = (templates: Record<string, Template>, path: string): TemplateElement | undefined => path.split('/').reduce<TemplateElement | undefined>(
    (found, name, index) => findTemplateChild((index === 0) ? (templates[inventoryTemplateId('inventory_xml')]?.elements ?? []) : (found?.children ?? []), name),
    undefined,
);

/** The thumbs' common bindings: `BG_COLOR`'s ground and the selection `outline` (`updateSelectionVisual`). */
export const inventoryThumbLook = (selected: boolean, unseen: boolean): TemplateBindings => ({
    '#BG_COLOR': { color: unseen ? INVENTORY_THUMB_COLOR_UNSEEN : INVENTORY_THUMB_COLOR },
    outline: { visible: selected },
});

/** `FurniGridView.§_-pM§` / `BadgeGridView.§_-pM§`: the thumbs on one page of a grid. */
export const INVENTORY_GRID_PAGE_SIZE = 200;

/** `pageCount`: `int(passed / 200 + 1)` - a full last page is followed by an empty one. */
export const inventoryGridPageCount = (count: number) => Math.trunc((count / INVENTORY_GRID_PAGE_SIZE) + 1);

/** `updatePaging` / `onPageEventProc`: the current or hovered page number's colour, and the others'. */
const PAGE_COLOR_CURRENT = 16711680;
const PAGE_COLOR = 0;

export interface InventoryGridPaging {
    count: number;
    current: number;
    hovered: number;
    onPage: (page: number) => void;
    onHover: (page: number, over: boolean) => void;
}

/**
 * `updatePaging`: `item_grid_pages`' first item (`prototype`) cloned once per page, numbered from 0,
 * the current page's number red, and a hovered one red too (`onPageEventProc`). The number is not
 * underlined, as no binding sets `ITextWindow.underline`.
 */
export const inventoryGridPageItems = (prototype: TemplateElement | undefined, paging: InventoryGridPaging): TemplateItem[] => {
    if (!prototype) return [];

    return Array.from({ length: paging.count }, (unused, index) => ({
        key: `page_${index}`,
        from: prototype,
        bindings: {
            '': {
                onPointerTap: () => paging.onPage(index),
                onPointerOver: () => paging.onHover(index, true),
                onPointerOut: () => paging.onHover(index, false),
            },
            '#PAGE': { caption: String(index), color: ((index === paging.current) || (index === paging.hovered)) ? PAGE_COLOR_CURRENT : PAGE_COLOR },
        },
    }));
};

/** `setViewToState` / `updateState`: 1 loading until the list arrives, 2 empty while it holds nothing. */
export const inventoryPageState = (listInitialized: boolean, count: number): InventoryPage['state'] => {
    if (!listInitialized) return 'loading';

    return (count > 0) ? undefined : 'empty';
};

/** No page: what an inactive page hook returns. */
export const NO_INVENTORY_PAGE: InventoryPage = { bindings: {} };
