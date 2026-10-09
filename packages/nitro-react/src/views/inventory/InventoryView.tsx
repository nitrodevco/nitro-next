/**
 * The inventory window - Flash `InventoryMainView` over `habbo-inventory-com/inventory_xml`: a
 * frame (490x342, height down to 300) whose `top_content` holds the `tabs`, the `empty_container`
 * and `loading_container` the furni page shows while it has nothing to list, and `contentArea`, with
 * `subContentArea` under it for the trade.
 *
 * - `getWindow`: the frame opens at `DEFAULT_VIEW_LOCATION` (120,150) and scales only with
 *   `inventory.allow.scaling`; every page is taken out of `contentArea` (`extractWindow`) and only
 *   the selected one is put back (`setViewToCategory`), which is each page window's `visible` here.
 *   The tabs are taken out and re-added in layout order - furni, collectibles, rentables, pets,
 *   badges, bots: `collectibles` only with `web3trade.enabled` and only while a trade runs
 *   (`showCollectiblesTab`), `rentables` never (the port merges rented furni into the furni page,
 *   `mergeRentFurni`), `bots` only with `inventory.bots.enabled`.
 * - `disableNonTradingTabs`: while a trade runs, every tab but furni and collectibles is disabled
 *   (`Util.disableSection`).
 * - `windowEventProc`: `WE_SELECTED` on the tabs switches the page, resetting the unseen items of
 *   the page left (`resetUnseenCounters`); closing the window on a page resets that page's
 *   (`hideInventory` -> `closingInventoryView`); `open_catalog_btn` opens the catalogue.
 * - `createCounter` / `updateCounter`: a tab with unseen items (furni category 1, pets 3, badges 4,
 *   bots 5) gets the window manager's red counter (`unseen_item_counter_xml`), its right edge 3 in
 *   from the tab's and 3 down; the count is set once it is built, so the border shrinks from the
 *   layout's `999` to the count. `updateCounter` would widen the title's right margin by the counter,
 *   but it finds the title by its `TITLE` tag, which `inventory_xml`'s tab labels do not carry: the
 *   tab keeps its width and the counter lies over the end of its caption.
 * - The pages' `updateContainerVisibility`: `loading_container` until the selected page's list has
 *   arrived and `empty_container` while it holds nothing (`InventoryPage.state`).
 * - `setSubViewToCategory` / `resizeToFitContents`: while a trade runs it is docked in
 *   `subContentArea` - the window drops to its least height (`disableScaling`, which also stops
 *   `top_content` stretching), the dock goes 5 under `top_content`, takes the trade's height, and
 *   the window fits its content. The trade follows the tab and the window's closing
 *   (`InventoryTradingDock`).
 *
 * The pages are `useInventory<Page>Page` (`inventoryPage`). Not ported: `enableScaling` after a
 * trade - Flash leaves the window at its least height once a trade has docked and gone; here it
 * goes back to the size it had.
 */
import { useEffect, useMemo } from 'react';

import { resetInventoryUnseenCounters } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { inventoryStore, UnseenItemCategory, useInventoryStore, useInventoryUnseenItemCount } from '#base/context/inventory';
import { useConfigValue, useSystemActions, useWindowParams, WindowParams } from '#base/context/system';
import { useWiredTradingStore } from '#base/context/wired-trading';
import { LayoutWindow, TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows, useTemplate, useTemplateLibrary } from '#base/theme';

import { INVENTORY_LIBRARY, InventoryPage, InventoryPageName, inventoryPagePath, inventoryTemplateId } from './inventoryPage';
import { InventoryTradingDock } from './trading/InventoryTradingDock';
import { useInventoryTradingDockHeight } from './trading/inventoryTradingLayout';
import { useInventoryBadgesPage } from './useInventoryBadgesPage';
import { useInventoryBotsPage } from './useInventoryBotsPage';
import { useInventoryCollectiblesPage } from './useInventoryCollectiblesPage';
import { useInventoryFurniPage } from './useInventoryFurniPage';
import { useInventoryPetsPage } from './useInventoryPetsPage';

export type InventoryViewWindowParams = { tab?: InventoryPageName };

type InventoryTab = NonNullable<WindowParams<'inventory'>['tab']>;

/** `getWindow`'s tab order, as the layout has the tabs. */
const TABS: readonly InventoryTab[] = [ 'furni', 'collectibles', 'pets', 'badges', 'bots' ];

/** `InventoryMainView.COUNTER_MARGIN`. */
const COUNTER_MARGIN = 3;

/** `Util.disableSection`'s blend for what it disables. */
const DISABLED_ALPHA = 0.5;

/** `setSubViewToCategory`: the dock goes this far under `top_content`. */
const SUB_CONTENT_GAP = 5;

/** `relative_vertical_scale_strech`, which `disableScaling` takes off `top_content`. */
const VERTICAL_STRETCH = 2048;

/** `DEFAULT_VIEW_LOCATION`. */
const DEFAULT_VIEW_LOCATION = { x: 120, y: 150 };

const COUNTER_TEMPLATE = 'habbo-window-manager-com/unseen_item_counter_xml';

/** `Util.getLowestPoint`: the bottom of the lowest visible child with a height. */
const lowestPoint = (window: LayoutWindow) => window.children.reduce((lowest, child) => ((child.visible && child.height > 0) ? Math.max(lowest, child.y + child.height) : lowest), 0);

export const InventoryView = () => {
    const { tab: activeTab = 'furni' } = useWindowParams('inventory');
    const { toggleWindow, showWindow, updateWindowParams } = useSystemActions();
    const allowScaling = useConfigValue<boolean>('inventory.allow.scaling') === true;
    const botsEnabled = useConfigValue<boolean>('inventory.bots.enabled') === true;
    const web3TradeEnabled = useConfigValue<boolean>('web3trade.enabled') === true;
    const userTradeActive = useInventoryStore(x => x.tradingActive);
    const wiredTradeRunning = useWiredTradingStore(x => x.tradeRunning);
    const dockHeight = useInventoryTradingDockHeight();
    const unseenCounts: Partial<Record<InventoryTab, number>> = {
        furni: useInventoryUnseenItemCount(UnseenItemCategory.OWNED_FURNI),
        pets: useInventoryUnseenItemCount(UnseenItemCategory.PET),
        badges: useInventoryUnseenItemCount(UnseenItemCategory.BADGE),
        bots: useInventoryUnseenItemCount(UnseenItemCategory.BOT),
    };
    const templates = useTemplateLibrary(INVENTORY_LIBRARY);
    const counterTemplate = useTemplate(COUNTER_TEMPLATE);
    const { send } = useWebSocketContext();

    // `HabboInventory.tradingActive`: either trade.
    const tradingActive = userTradeActive || wiredTradeRunning;
    const docked = dockHeight > 0;

    const frame = useMemo(() => ({
        id: 'inventory',
        defaultPosition: DEFAULT_VIEW_LOCATION,
        // `setParamFlag(65536, inventory.allow.scaling)`; `disableScaling` while the trade is docked.
        resizeDirection: (allowScaling && !docked) ? 'y' as const : 'none' as const,
        onClose: () => toggleWindow('inventory'),
    }), [ allowScaling, docked, toggleWindow ]);

    // `categoryViewId`: the toolbar reopens the window on this page.
    useEffect(() => {
        if (activeTab !== 'collectibles') inventoryStore.getState().setLastPage(activeTab);
    }, [ activeTab ]);

    // `resetUnseenCounters(previous tab)` on a switch, and the showing page's `closingInventoryView` on close.
    useEffect(() => () => resetInventoryUnseenCounters(send, activeTab), [ send, activeTab ]);

    const pageContext = (page: InventoryPageName) => ({ active: !!templates && (activeTab === page), templates: templates ?? {} });
    const pages: Record<InventoryPageName, InventoryPage> = {
        furni: useInventoryFurniPage(pageContext('furni')),
        collectibles: useInventoryCollectiblesPage(pageContext('collectibles')),
        pets: useInventoryPetsPage(pageContext('pets')),
        bots: useInventoryBotsPage(pageContext('bots')),
        badges: useInventoryBadgesPage(pageContext('badges')),
    };

    if (!templates) return null;

    const shownTabs = TABS.filter((tab) => {
        if (tab === 'collectibles') return web3TradeEnabled && tradingActive;
        if (tab === 'bots') return botsEnabled;

        return true;
    });

    /** A tab, re-added: the counter it carries while it has unseen items, disabled by a trade. */
    const tabItem = (tab: InventoryTab): TemplateItem => {
        const count = unseenCounts[tab] ?? 0;
        const disabled = tradingActive && (tab !== 'furni') && (tab !== 'collectibles');

        return {
            key: tab,
            from: `tabs/${tab}`,
            bindings: {
                '': {
                    selected: activeTab === tab,
                    alpha: disabled ? DISABLED_ALPHA : undefined,
                    // `WE_SELECTED`: the page changes only when the tab is another one.
                    onPointerTap: disabled ? undefined : () => (activeTab !== tab) && updateWindowParams('inventory', { tab }),
                    added: (counterTemplate && (count > 0)) ? [ { key: 'counter', from: counterTemplate, bindings: { count: { caption: String(count), setCaptionAfterBuild: true } } } ] : undefined,
                },
            },
        };
    };

    const bindings: TemplateBindings = {
        tabs: { items: shownTabs.map(tabItem) },
        empty_container: { visible: pages[activeTab].state === 'empty' },
        loading_container: { visible: pages[activeTab].state === 'loading' },
        // `windowEventProc`: `catalog.openCatalog()`.
        open_catalog_btn: { onPointerTap: () => showWindow('catalog') },
        subContentArea: { visible: docked, keepMounted: true, children: <InventoryTradingDock activeTab={activeTab} /> },
    };

    for (const [ page, view ] of Object.entries(pages) as [ InventoryPageName, InventoryPage ][]) {
        bindings[inventoryPagePath(page)] = { visible: page === activeTab };

        Object.assign(bindings, view.bindings);
    }

    const arrange = (windows: TemplateWindows) => {
        const { find, root } = windows;

        // `createCounter`: the counter's right edge 3 in from the tab's, 3 down.
        for (const tab of shownTabs) {
            const counter = find(`tabs/${tab}/unseen_item_container`);
            const button = find(`tabs/${tab}`);

            if (!counter || !button) continue;

            counter.setX(button.width - counter.width - COUNTER_MARGIN);
            counter.setY(COUNTER_MARGIN);
        }

        pages[activeTab].arrange?.(windows);

        const window = root();
        const top = find('top_content');
        const sub = find('subContentArea');

        if (!window || !top || !sub?.parent) return;

        if (!docked) {
            sub.setHeight(0);

            return;
        }

        // `disableScaling`, then `setSubViewToCategory` and `resizeToFitContents`.
        window.setHeight(window.minHeight);
        top.setParamFlag(VERTICAL_STRETCH, false);
        sub.setY(top.y + top.height + SUB_CONTENT_GAP);
        sub.setHeight(dockHeight);
        window.setHeight(window.height - sub.parent.height + lowestPoint(sub.parent));
    };

    return (
        <TemplateWindow
            id={inventoryTemplateId('inventory_xml')}
            frame={frame}
            bindings={bindings}
            arrange={arrange}
        />
    );
};
