import { ICatalogNode } from '@nitrodevco/nitro-api';

import { Box } from '#base/theme';

import { CatalogNavigationSetItemView } from './CatalogNavigationSetItemView';

export interface CatalogNavigationSetViewProps {
    node: ICatalogNode;
}

/** Pixi port of views/catalog/navigation/CatalogNavigationSetView.tsx. */
export const CatalogNavigationSetView = ({ node }: CatalogNavigationSetViewProps) => {
    if (!node.children.length) return null;

    return (
        <Box layout={{ flexDirection: 'column', gap: 2 }}>
            {node.children.map(x => (x.visible
                ? (
                        <CatalogNavigationSetItemView
                            key={x.pageId}
                            node={x}
                        />
                    )
                : null))}
        </Box>
    );
};
