import { useCatalogSelectors, useTranslation } from '#base/context';
import { useCatalogNavigation, useCatalogVisibility } from '#base/hooks';
import { Box, Frame, Region, TabButton, TabContext } from '#base/theme';

import { CatalogHeaderView } from './CatalogHeaderView';
import { CatalogPurchaseConfirmationView } from './CatalogPurchaseConfirmationView';
import { CatalogNavigationView } from './navigation/CatalogNavigationView';
import { CatalogSearchView } from './navigation/CatalogSearchView';
import { CatalogActivePagePixi } from './page/CatalogActivePagePixi';

export type CatalogViewWindowParams = { pageId?: number; pageName?: string; offerId?: number };

/** Pixi port of views/catalog/CatalogView.tsx. */
export const CatalogView = () => {
    const { rootNode, activeNodes } = useCatalogSelectors();
    const { activateNode } = useCatalogNavigation();
    const { hideCatalog } = useCatalogVisibility();
    const t = useTranslation();

    if (!rootNode) return null;

    return (
        <>
            <Frame
                id="catalog"
                resizeDirection="y"
                variant="3"
                layout={{ position: 'absolute', top: 20, left: 20, width: 570, height: 635 }}
                caption={t('catalog.title')}
                onClose={hideCatalog}
            >
                <TabContext
                    variant="3"
                    name="tab_context"
                    layout={{ width: '100%', height: 30 }}
                >
                    {rootNode.children.map(x => (x.visible
                        ? (
                                <TabButton
                                    key={x.pageId}
                                    selected={x.isActive}
                                    onPointerTap={() => activateNode(x)}
                                    layout={{ width: '100%' }}
                                >
                                    {x.localization.length ? x.localization : x.pageName}
                                </TabButton>
                            )
                        : null))}
                </TabContext>
                <CatalogHeaderView />
                <Region
                    name="layoutContainer"
                    layout={{ position: 'absolute', flexDirection: 'row', width: '100%', top: 131 }}
                >
                    <Box layout={{ flexDirection: 'column', flex: 4, height: '100%', gap: 2 }}>
                        <CatalogSearchView />
                        <CatalogNavigationView node={activeNodes[0]?.children[0]} />
                    </Box>
                    <Box layout={{ flexDirection: 'column', flex: 8, height: '100%', gap: 4 }}>
                        <CatalogActivePagePixi />
                    </Box>
                </Region>
            </Frame>
            <CatalogPurchaseConfirmationView />
        </>
    );
};
