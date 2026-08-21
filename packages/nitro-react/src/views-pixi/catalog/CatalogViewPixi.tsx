import { useCatalogSelectors, useTranslation } from "#base/context";
import { useCatalogNavigation, useCatalogVisibility } from "#base/hooks";
import { Frame } from "#base/theme-pixi";

export type CatalogViewWindowParams = { pageId?: number; pageName?: string; offerId?: number };

export const CatalogViewPixi = () => {
    const { rootNode, activeNodes } = useCatalogSelectors();
    const { activateNode } = useCatalogNavigation();
    const { hideCatalog } = useCatalogVisibility();
    const t = useTranslation();

    if (!rootNode) return null;

    return (
        <Frame id="catalog" caption={t('catalog.title')} layout={{ top: 10, left: 10 }} onClose={hideCatalog}>
            test
        </Frame>
    )
}