import { useCatalogSelectors, useTranslation } from '#base/context';
import { useCatalogNavigation, useCatalogVisibility } from '#base/hooks';
import { Box, Frame, TabButton, TabContent, TabContext } from '#base/theme-pixi';

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
                layout={{ position: 'absolute', top: 20, left: 20, width: 570, height: 600 }}
                caption={t('catalog.title')}
                onClose={hideCatalog}
            >
                <TabContext
                    variant="3"
                    layout={{}}
                >
                    {rootNode.children.map(x => (x.visible
                        ? (
                                <TabButton
                                    key={x.pageId}
                                    selected={x.isActive}
                                    onPress={() => activateNode(x)}
                                    layout={{ width: '100%' }}
                                >
                                    {x.localization.length ? x.localization : x.pageName}
                                </TabButton>
                            )
                        : null))}
                </TabContext>
                <CatalogHeaderView />
                <TabContent layout={{ flexDirection: 'row', gap: 8, flex: 1, minHeight: 0 }}>
                    <Box layout={{ flexDirection: 'column', flex: 4, height: '100%', gap: 2 }}>
                        <CatalogSearchView />
                        <CatalogNavigationView node={activeNodes[0]?.children[0]} />
                    </Box>
                    <Box layout={{ flexDirection: 'column', flex: 8, height: '100%', gap: 4 }}>
                        <CatalogActivePagePixi />
                    </Box>
                </TabContent>
            </Frame>
            <CatalogPurchaseConfirmationView />
        </>
    );
};
