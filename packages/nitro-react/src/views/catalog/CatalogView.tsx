import { useCatalogSelectors, useTranslation } from "#base/context";
import { useCatalogNavigation, useCatalogVisibility } from "#base/hooks";
import { Frame, TabButton, TabContext } from "#base/theme";

import { CatalogHeaderView } from "./CatalogHeaderView";
import { CatalogNavigationView } from "./navigation/CatalogNavigationView";
import { CatalogSearchView } from "./navigation/CatalogSearchView";
import { CatalogActivePage } from "./page/CatalogActivePage";

export const CatalogView = () => {
    const { rootNode, activeNodes } = useCatalogSelectors();
    const { activateNode } = useCatalogNavigation();
    const { hideCatalog } = useCatalogVisibility();
    const t = useTranslation();

    if (!rootNode) return null;

    return (
        <Frame id="catalog" variant="3" className="catalog-window" caption={t('catalog.title')} onClose={hideCatalog} contentClassName="p-0!">
            <TabContext className="catalog-tabs" data-name="tabs">
                {rootNode.children.map(x =>
                    x.visible ? <TabButton key={x.pageId} className="w-full" aria-selected={x.isActive} onClick={_ => activateNode(x)}>{x.localization.length ? x.localization : x.pageName}</TabButton> : null)}
            </TabContext>
            <CatalogHeaderView />
            <div className="catalog-body">
                <div className="catalog-sidebar">
                    <CatalogSearchView />
                    <CatalogNavigationView node={activeNodes[0]?.children[0]} />
                </div>
                <div className="catalog-page-column">
                    <CatalogActivePage />
                </div>
            </div>
        </Frame>
    );
}