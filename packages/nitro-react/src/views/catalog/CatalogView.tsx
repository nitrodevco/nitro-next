import { useCatalogStore } from '#base/context/catalog';
import { useTranslation } from '#base/context/system';
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
    const rootNode = useCatalogStore(x => x.rootNode);
    const activeNodes = useCatalogStore(x => x.activeNodes);
    const { activateNode } = useCatalogNavigation();
    const { hide } = useCatalogVisibility();
    const t = useTranslation();

    if (!rootNode) return null;

    return (
        <>
            <Frame
                id="catalog"
                resizeDirection="y"
                variant="3"
                defaultPosition={{ x: 20, y: 20 }}
                layout={{ position: 'absolute', width: 570, height: 635 }}
                caption={t('catalog.title')}
                onClose={hide}
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
                    layout={{ position: 'relative', flex: 1, flexDirection: 'row', width: '100%', marginTop: 95, paddingLeft: 3, paddingRight: 3, paddingTop: 5, gap: 5, overflow: 'hidden' }}
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
