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
        <Frame id="catalog" variant="3" className="w-142.5 h-150" caption={t('catalog.title')} onClose={hideCatalog} contentClassName="p-0!">
            <TabContext className="-mb-0.5" data-name="tabs">
                {rootNode.children.map(x =>
                    x.visible ? <TabButton key={x.pageId} className="w-full" aria-selected={activeNodes.includes(x)} onClick={_ => activateNode(x)}>{x.localization.length ? x.localization : x.pageName}</TabButton> : null)}
            </TabContext>
            <CatalogHeaderView />
            <div className="flex h-full p-2 gap-1.5 overflow-hidden">
                <div className="flex flex-col flex-4 w-full gap-0.5">
                    <CatalogSearchView />
                    <CatalogNavigationView node={activeNodes[0]?.children[0]} />
                </div>
                <div className="flex flex-col flex-8 size-full gap-1">
                    <CatalogActivePage />
                </div>
            </div>
        </Frame>
    );
}
