/**
 * The catalogue window - `HabboCatalog.createMainWindow` over the `habbo-catalog-com` window templates:
 * `catalog_ubuntu_with_tabs`, or `catalog_ubuntu` - no tabs - for the Builders Club catalogue
 * (`useNonTabbedCatalog`), which `createWindowState` makes 15px taller.
 *
 * - `refreshCatalogWindowChrome`: the frame's colour and caption, the header's fills and which
 *   mode header shows (`catalog.mode.header` / `builder.mode.header`).
 * - `TopViewSelector`: a clone of `tab_button` per visible top-level category, `alignTabs` sharing the
 *   tab strip's width between them; a tab shows its category in the navigation list.
 * - `CatalogNavigator` / `CatalogNodeRenderable`: the navigation list holds the selected category's
 *   children, each a clone of `<mode>_topitem_template` or `<mode>_subitem_template` (by depth,
 *   `getItemTemplate`), an open branch followed by a clone of `<mode>_list_template` holding its
 *   children - or, while searching, the matching pages.
 * - The header: `LocalizationCatalogWidget` fills `catalog.header.*` from the page; the Builders Club
 *   header is `refreshBuilderStatus`'s.
 * - `CatalogViewer.showCatalogPage`: the page goes into `layoutContainer`, which takes the page
 *   window's width and stays right-aligned (`x = parent.width - width - 8`); a page that leaves less
 *   than 130px to its left (`frontpage_featured`) hides the search and the navigation.
 *
 * - `setCatalogBusy`: while a page is on its way (`loadCatalogPage` until `onCatalogPage`) the title
 *   reads `${generic.loading}` and `search_waiting_for_results_mask` covers the window. The search
 *   itself is local and never waits.
 */
import { CatalogTypeEnum, ICatalogNode } from '@nitrodevco/nitro-api';
import { Container as PixiContainer } from 'pixi.js';
import { useEffect, useState } from 'react';

import { refreshBuilderStatus, updateBuilderStatus } from '#base/commands';
import { CATALOG_HEADER_DESCRIPTION, CATALOG_HEADER_IMAGE, CatalogPage, getCatalogPageImage, getCatalogPageText, getCatalogWindowName, isNonTabbedCatalog, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useCatalogNavigation, useWindowVisibility } from '#base/hooks';
import { Box, TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows, useLayoutSize, useTemplateLibrary } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';

import { useCatalogSearch } from './navigation/useCatalogSearch';
import { CatalogPageView } from './page/CatalogPageView';
import { CATALOG_LIBRARY, catalogTemplateId, resolveCatalogPageTemplate } from './page/catalogTemplates';

/** `createWindowState`: the Builders Club window is this much taller (`mainContainer.height += 15`). */
const BUILDERS_CLUB_EXTRA_HEIGHT = 15;

/** `CatalogViewer.showCatalogPage`: the gap right of `layoutContainer`, and the room the left pane needs. */
const LAYOUT_CONTAINER_RIGHT_GAP = 8;
const LEFT_PANE_MIN_X = 130;

/** `CatalogNodeRenderable`: a row's height, which an open branch's child list is sized by. */
const NODE_ROW_HEIGHT = 21;

/** `refreshCatalogWindowChrome`: the frame's and the header's colours, per mode. */
const BUILDER_FRAME_COLOR = 16758076;
const NORMAL_FRAME_COLOR = 4296112;
// The header's two windows are `background` fills, which take the colour's alpha byte (`4283320388`, `4281149220`):
// without it they are drawn fully transparent.
const BUILDER_HEADER_BORDER = 0xff4e4844;
const BUILDER_HEADER_BODY = 0xff2d2724;

/** `HabboCatalog.update` runs every frame; the builder status refreshes at most every 500 ms of it. */
const BUILDER_STATUS_UPDATE_INTERVAL = 500;

/** `refreshBuilderStatus` sets every status value as `<font color="#ff8d00"><b>value</b></font>`. */
const builderStatusValue = (value: string) => `<font color="#ff8d00"><b>${value}</b></font>`;

/** `layoutContainer`'s laid-out height, which the page takes (`window.height = container.height`). */
const CatalogLayoutContainer = () => {
    const [ node, setNode ] = useState<PixiContainer | null>(null);
    const { height } = useLayoutSize(node);

    return (
        <Box
            ref={setNode}
            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
        >
            <CatalogPageView height={height || undefined} />
        </Box>
    );
};

export const CatalogView = () => {
    const rootNode = useCatalogStore(x => x.rootNode);
    const activeNodes = useCatalogStore(x => x.activeNodes);
    const openNodes = useCatalogStore(x => x.openNodes);
    const catalogType = useCatalogStore(x => x.catalogType);
    const isBusy = useCatalogStore(x => x.isBusy);
    const activePage = useCatalogStore(x => x.activePage);
    const searchResult = useCatalogStore(x => x.searchResult);
    const builderIsMember = useCatalogStore(x => x.builderIsMember);
    const builderIsInGrace = useCatalogStore(x => x.builderIsInGrace);
    const builderStatusSecondsLeft = useCatalogStore(x => x.builderStatusSecondsLeft);
    const builderFurniCount = useCatalogStore(x => x.builderFurniCount);
    const builderFurniLimit = useCatalogStore(x => x.builderFurniLimit);
    const store = useCatalogStoreApi();
    const { activateNode } = useCatalogNavigation();
    const windowName = getCatalogWindowName(catalogType);
    const { hide } = useWindowVisibility(windowName);
    const catalogIconUrl = useConfigValue<string>('catalog.icons.url') ?? '';
    const catalogImageUrl = useConfigValue<string>('asset.urls.catalog') ?? '';
    const isDeepHierarchy = String(useConfigValue('catalog.deep.hierarchy')) === 'true';
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
    const { searchValue, setSearchValue } = useCatalogSearch();
    const [ hoveredNode, setHoveredNode ] = useState<ICatalogNode>();
    const t = useTranslation();
    const isBuilder = (catalogType === CatalogTypeEnum.BuildersClub);
    const nonTabbed = isNonTabbedCatalog(catalogType);
    const [ frame ] = useState(() => ({ id: windowName, defaultPosition: { x: 20, y: 20 }, resizeDirection: 'y' as const, onClose: hide }));

    useEffect(() => {
        if (!isBuilder) return;

        refreshBuilderStatus(store);

        const interval = setInterval(() => updateBuilderStatus(store), BUILDER_STATUS_UPDATE_INTERVAL);

        return () => clearInterval(interval);
    }, [ isBuilder, store ]);

    if (!rootNode || !templates) return null;

    const mode = isBuilder ? 'builders_club' : 'normal';
    const windowTemplateId = catalogTemplateId(nonTabbed ? 'catalog_ubuntu' : 'catalog_ubuntu_with_tabs');
    const windowTemplate = templates[windowTemplateId];
    const pageTemplateId = activePage ? resolveCatalogPageTemplate(templates, activePage.layoutCode) : undefined;
    const pageWidth = pageTemplateId ? templates[pageTemplateId].width : undefined;
    // `setLeftPaneVisibility(container.x >= 130)`, the container right-aligned in the window's width.
    const leftPaneVisible = (pageWidth === undefined) || ((windowTemplate.width - pageWidth - LAYOUT_CONTAINER_RIGHT_GAP) >= LEFT_PANE_MIN_X);

    // The header (`LocalizationCatalogWidget.initLocalizables`, `refreshBuilderStatus`).
    const activeNode = activeNodes.find(x => x.pageId === activePage?.pageId);
    const headerImage = getCatalogPageImage(activePage, CATALOG_HEADER_IMAGE) ?? 'catalog_header_roombuilder';
    const headerIcon = activePage?.isBuilderPage ? '193' : (activeNode?.icon.toString() ?? '1');
    const builderStatus = t(`builder.header.status.${builderIsMember ? 'member' : (builderIsInGrace ? 'grace' : 'trial')}`);
    const builderDuration = (builderIsMember || builderIsInGrace) ? GetFriendlyTime(t, builderStatusSecondsLeft) : builderStatus;

    /** `CatalogNavigator.getItemTemplate`: a top item at depth 1 (to 2 with the deep hierarchy), a sub item below. */
    const isTopItem = (node: ICatalogNode) => (isDeepHierarchy ? (node.depth <= 2) : (node.depth === 1));

    /** An open branch's child list: as tall as its rows and their own open lists (`updateChildListHeight`). */
    const childListHeight = (node: ICatalogNode): number => node.children.reduce((height, child) => (child.visible
        ? height + NODE_ROW_HEIGHT + ((openNodes.includes(child) && child.children.length) ? childListHeight(child) : 0)
        : height), 0);

    /** `CatalogNodeRenderable.createWindow` and its looks: a row of the navigation list, and an open branch's list after it. */
    const nodeItems = (node: ICatalogNode, key: string, inSearch: boolean): TemplateItem[] => {
        const top = isTopItem(node);
        const look = activeNodes.includes(node) || (hoveredNode === node);
        const open = !inSearch && openNodes.includes(node) && (node.children.length > 0);
        const depth = node.depth;
        const row: TemplateItem = {
            key,
            from: `${mode}_${top ? 'topitem' : 'subitem'}_template`,
            bindings: {
                '': {
                    onPointerTap: () => activateNode(node),
                    onPointerOver: () => setHoveredNode(node),
                    onPointerOut: () => setHoveredNode(current => (current === node ? undefined : current)),
                },
                '#SELECTION_HILIGHT': { visible: look },
                // `setActiveLook`: white with the template's etching; `setInactiveLook`: its own colour, no etching.
                '#ITEM_TITLE': { caption: node.localization, ...(look ? { color: 0xffffff } : { etchingColor: 0 }) },
                icon: { visible: !(isDeepHierarchy && depth === 1), asset: catalogIconUrl.replace('%name%', node.icon.toString()) },
                '#DOWNBTN': { visible: node.children.length > 0, style: open ? '7' : '5' },
            },
            // The deep hierarchy steps the icon and title 6px right per level past 3, and at depth 1 starts the title at 0.
            arrange: isDeepHierarchy
                ? ({ find }) => {
                        if (depth === 1) find('#ITEM_TITLE')?.setX(0);

                        if (depth > 3) {
                            find('icon')?.setX(15 + (6 * (depth - 3)));
                            find('#ITEM_TITLE')?.setX(42 + (6 * (depth - 3)));
                        }
                    }
                : undefined,
        };

        if (!open) return [ row ];

        return [
            row,
            {
                key: `${key}/children`,
                from: `${mode}_list_template`,
                bindings: { '': { items: childItems(node, key) } },
                arrange: ({ root }) => root()?.setHeight(childListHeight(node)),
            },
        ];
    };

    const childItems = (node: ICatalogNode, key: string) => node.children.flatMap((child, index) => (child.visible ? nodeItems(child, `${key}/${index}:${child.pageName}`, false) : []));

    // `CatalogNavigator.showNodeContent` for the selected tab (the first category without tabs), or `addSearchNodesToList`.
    const navigationItems = searchResult
        ? searchResult.nodes.flatMap((node, index) => nodeItems(node, `search/${index}:${node.pageName}`, true))
        : (activeNodes[0] ? childItems(activeNodes[0], 'nodes') : []);

    const tabs = rootNode.children.filter(x => x.visible);

    const bindings: TemplateBindings = {
        '': {
            caption: t(isBusy ? 'generic.loading' : (isBuilder ? 'builder.catalog.title' : 'catalog.title')),
            color: isBuilder ? BUILDER_FRAME_COLOR : NORMAL_FRAME_COLOR,
        },

        ...(isBuilder && {
            'catalog.header.background.border': { color: BUILDER_HEADER_BORDER },
            'catalog.header.background.body': { color: BUILDER_HEADER_BODY },
        }),
        'catalog.header.image': { asset: catalogImageUrl.replace('%name%', headerImage) },
        'catalog.header.icon': { asset: catalogIconUrl.replace('%name%', headerIcon) },
        'catalog.mode.header': { visible: !isBuilder },
        'builder.mode.header': { visible: isBuilder },
        'catalog.header.title': { caption: activeNode?.localization ?? t((activePage?.mode === CatalogPage.MODE_SEARCH) ? 'catalog.search.header' : 'catalog.header') },
        'catalog.header.description': { caption: getCatalogPageText(activePage, CATALOG_HEADER_DESCRIPTION) ?? '' },
        'builder.header.title': { caption: t('builder.header.title', 'builder.header.title', { bcstatus: builderStatus }) },
        'builder.header.status.membership': { caption: t('builder.header.status.membership', 'builder.header.status.membership', { duration: builderStatusValue(builderDuration) }) },
        'builder.header.status.limit': { caption: t('builder.header.status.limit', 'builder.header.status.limit', { count: builderStatusValue(builderFurniCount.toString()), limit: builderStatusValue(builderFurniLimit.toString()) }) },

        // `onSearchInputEvent`: the helper shows while the field is empty, the clear button empties it.
        'search.helper': { visible: !searchValue.length },
        'search.input': { caption: searchValue, onChange: setSearchValue },
        clear_search_button: { onPointerTap: () => searchValue.length && setSearchValue('') },
        'search.clear.icon': { asset: searchValue.length ? 'habbo-window-manager-com-icons_close' : 'habbo-window-manager-com-common_small_pen' },
        search_waiting_for_results_mask: { visible: isBusy },
        searchContainer: { visible: leftPaneVisible },
        navigationContainer: { visible: leftPaneVisible },

        navigationList: { items: navigationItems },

        ...(!nonTabbed && {
            tab_context: {
                items: tabs.map((node, index) => ({
                    key: `${index}:${node.pageName}`,
                    from: 'tab_button',
                    bindings: {
                        '': {
                            caption: node.localization.length ? node.localization : node.pageName,
                            selected: activeNodes.includes(node),
                            onPointerTap: () => activateNode(node),
                        },
                    },
                    // `alignTabs`: every tab the strip's width over their count, as the window's `int` width.
                    arrange: ({ root }: TemplateWindows) => {
                        const tab = root();
                        const strip = tab?.parent;

                        if (tab && strip) tab.setWidth(Math.trunc(strip.width / Math.max(1, tabs.length)));
                    },
                })),
            },
        }),

        layoutContainer: { children: <CatalogLayoutContainer /> },
    };

    /** `CatalogViewer.showCatalogPage`: the container as wide as the page, right-aligned; the left pane only with room for it. */
    const arrange = ({ find }: TemplateWindows) => {
        const container = find('layoutContainer');

        if (!container?.parent || pageWidth === undefined) return;

        container.setWidth(pageWidth);
        container.setX(container.parent.width - pageWidth - LAYOUT_CONTAINER_RIGHT_GAP);
    };

    return (
        <TemplateWindow
            id={windowTemplateId}
            frame={frame}
            height={isBuilder ? windowTemplate.height + BUILDERS_CLUB_EXTRA_HEIGHT : undefined}
            bindings={bindings}
            arrange={arrange}
        />
    );
};
