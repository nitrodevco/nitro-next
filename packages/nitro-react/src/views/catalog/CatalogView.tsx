import { CatalogTypeEnum } from '@nitrodevco/nitro-api';

import { CATALOG_LAYOUT_WIDTHS, getCatalogWindowName, isNonTabbedCatalog, resolveCatalogLayout, useCatalogStore } from '#base/context/catalog';
import { useTranslation } from '#base/context/system';
import { useCatalogNavigation, useWindowVisibility } from '#base/hooks';
import { Frame, Region, TabButton, TabContext } from '#base/theme';

import { CatalogHeaderView } from './CatalogHeaderView';
import { CatalogNavigationView } from './navigation/CatalogNavigationView';
import { CatalogSearchView } from './navigation/CatalogSearchView';
import { CatalogPageView } from './page/CatalogPageView';

export type CatalogViewWindowParams = { pageId?: number; pageName?: string; offerId?: number };

/** `layoutContainer`'s right edge: the layout puts the 360px container at x 200 with 8px to spare. */
const LAYOUT_CONTAINER_RIGHT = 200 + 360;

/** `CatalogViewer.setLeftPaneVisibility(_container.x >= 130)`. */
const LEFT_PANE_MIN_X = 130;

/**
 * `catalog_ubuntu`, the Builders Club catalogue's window: 640 high (`height_min` 540) and 15px
 * taller again (`createCatalogWindowState` adds them), with no `tab_context` - the header starts at
 * the top of the content, so everything under it sits 35px higher than in `catalog_ubuntu_with_tabs`.
 */
const NON_TABBED_HEIGHT = 640 + 15;
const NON_TABBED_MIN_HEIGHT = 540;
const NON_TABBED_OFFSET = -35;

/**
 * The catalogue window, `catalog_ubuntu_with_tabs.xml` (`catalog_main_container`) - or, for the
 * Builders Club catalogue, `catalog_ubuntu.xml` (`useNonTabbedCatalog`): the same window without
 * the tabs, 35px higher inside and 20px taller in all (`NON_TABBED_*`). The header,
 * the search box and the navigation list on the left, the page's layout in `layoutContainer`, and
 * the root's visible children as tabs (`TopViewSelector.addTabItem`, each tab
 * `tab_context.width / numTabItems` wide). The frame's colour and caption follow the catalogue
 * mode the way `HabboCatalog.setCatalogMode` sets them.
 *
 * Only the height scales (`width_min` = `width_max` = 570); the navigation container and the
 * layout container are anchored to the bottom and grow with it. The layout's
 * `search_waiting_for_results_mask` is not drawn: the port's search is local and never waits.
 *
 * `CatalogViewer.showCatalogPage` sizes `layoutContainer` to the page layout's width and keeps it
 * right-aligned; a layout that leaves the left pane less than 130px (`frontpage_featured`) hides
 * the search and the navigation under it.
 */
export const CatalogView = () => {
    const rootNode = useCatalogStore(x => x.rootNode);
    const activeNodes = useCatalogStore(x => x.activeNodes);
    const catalogType = useCatalogStore(x => x.catalogType);
    const activeLayoutCode = useCatalogStore(x => x.activePage?.layoutCode);
    const { activateNode } = useCatalogNavigation();
    const windowName = getCatalogWindowName(catalogType);
    const { hide } = useWindowVisibility(windowName);
    const t = useTranslation();

    if (!rootNode) return null;

    const isBuilder = (catalogType === CatalogTypeEnum.BuildersClub);
    const nonTabbed = isNonTabbedCatalog(catalogType);
    const activeLayout = (activeLayoutCode !== undefined) ? resolveCatalogLayout(activeLayoutCode) : undefined;
    const layoutWidth = activeLayout ? CATALOG_LAYOUT_WIDTHS[activeLayout] : 360;
    const layoutLeft = LAYOUT_CONTAINER_RIGHT - layoutWidth;
    const leftPaneVisible = (layoutLeft >= LEFT_PANE_MIN_X);

    return (
        <>
            <Frame
                id={windowName}
                variant="3"
                resizeDirection="y"
                defaultPosition={{ x: 20, y: 20 }}
                caption={t(isBuilder ? 'builder.catalog.title' : 'catalog.title')}
                tintColor={isBuilder ? '#ffb53c' : '#418db0'}
                dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
                margins={[ 0, 33, 0, 3 ]}
                onClose={hide}
                layout={{ position: 'absolute', width: 570, height: nonTabbed ? NON_TABBED_HEIGHT : 635, minWidth: 570, maxWidth: 570, minHeight: nonTabbed ? NON_TABBED_MIN_HEIGHT : 570 }}
            >
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: nonTabbed ? NON_TABBED_OFFSET : 0, bottom: 0 }}>
                    <CatalogHeaderView />
                    <CatalogSearchView visible={leftPaneVisible} />
                    {/* `CatalogNavigator.showNodeContent`: the list is the selected tab's own children (the first tab's without tabs - `showIndex`). */}
                    <CatalogNavigationView
                        node={activeNodes[0]}
                        visible={leftPaneVisible}
                    />
                    <Region
                        name="layoutContainer"
                        layout={{ position: 'absolute', left: layoutLeft, width: layoutWidth, top: 131, bottom: 8 }}
                    >
                        <CatalogPageView />
                    </Region>
                </Region>
                {!nonTabbed && (
                    <TabContext
                        variant="3"
                        name="tab_context"
                        layout={{ position: 'absolute', left: 0, width: 568, top: 5, height: 30 }}
                    >
                        {rootNode.children.map((x, index) => (x.visible
                            ? (
                                    <TabButton
                                        key={`${index}:${x.pageName}`}
                                        variant="3"
                                        name={x.pageName}
                                        selected={activeNodes.includes(x)}
                                        onPointerTap={() => activateNode(x)}
                                        layout={{ flexGrow: 1, flexBasis: 0 }}
                                    >
                                        {x.localization.length ? x.localization : x.pageName}
                                    </TabButton>
                                )
                            : null))}
                    </TabContext>
                )}
            </Frame>
        </>
    );
};
