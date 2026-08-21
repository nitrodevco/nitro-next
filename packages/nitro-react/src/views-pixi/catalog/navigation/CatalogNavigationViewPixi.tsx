import type { ICatalogNode } from '@nitrodevco/nitro-api';

import { useCatalogSelectors } from '#base/context';
import { Border, ScrollArea } from '#base/theme-pixi';

import { CatalogNavigationSetItemViewPixi } from './CatalogNavigationSetItemViewPixi';
import { CatalogNavigationSetViewPixi } from './CatalogNavigationSetViewPixi';

export interface CatalogNavigationViewPixiProps {
    node: ICatalogNode;
}

/** Pixi port of views/catalog/navigation/CatalogNavigationView.tsx. */
export const CatalogNavigationViewPixi = ({ node }: CatalogNavigationViewPixiProps) => {
    const { searchResult } = useCatalogSelectors();

    if (!node) return null;

    return (
        <Border variant="6" blend={0.5} layout={{ width: '100%', height: '100%', padding: 4 }}>
            <ScrollArea variant="3" layout={{ flex: 1 }}>
                {searchResult && searchResult.nodes.length > 0 && searchResult.nodes.map(x => <CatalogNavigationSetItemViewPixi key={x.pageId} node={x} />)}
                {!searchResult && <CatalogNavigationSetViewPixi node={node} />}
            </ScrollArea>
        </Border>
    );
};
