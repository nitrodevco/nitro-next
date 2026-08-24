import { ICatalogNode } from '@nitrodevco/nitro-api';

import { useCatalogSelectors } from '#base/context';
import { Border, ScrollArea } from '#base/theme';

import { CatalogNavigationSetItemView } from './CatalogNavigationSetItemView';
import { CatalogNavigationSetView } from './CatalogNavigationSetView';

export interface CatalogNavigationViewProps {
    node: ICatalogNode;
}

/** Pixi port of views/catalog/navigation/CatalogNavigationView.tsx. */
export const CatalogNavigationView = ({ node }: CatalogNavigationViewProps) => {
    const { searchResult } = useCatalogSelectors();

    if (!node) return null;

    return (
        <Border
            variant="6"
            blend={0.5}
            layout={{ width: '100%', height: '100%', padding: 4 }}
        >
            <ScrollArea
                variant="3"
                layout={{ flex: 1 }}
            >
                {searchResult && searchResult.nodes.length > 0 && searchResult.nodes.map(x => (
                    <CatalogNavigationSetItemView
                        key={x.pageId}
                        node={x}
                    />
                ))}
                {!searchResult && <CatalogNavigationSetView node={node} />}
            </ScrollArea>
        </Border>
    );
};
