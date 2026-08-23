import { ICatalogNode } from '@nitrodevco/nitro-api';

import { Box } from '#base/theme-pixi';

import { CatalogNavigationSetItemViewPixi } from './CatalogNavigationSetItemViewPixi';

export interface CatalogNavigationSetViewPixiProps {
    node: ICatalogNode;
}

/** Pixi port of views/catalog/navigation/CatalogNavigationSetView.tsx. */
export const CatalogNavigationSetViewPixi = ({ node }: CatalogNavigationSetViewPixiProps) => {
    if (!node.children.length) return null;

    return (
        <Box layout={{ flexDirection: 'column', gap: 2 }}>
            {node.children.map(x => (x.visible
                ? (
                        <CatalogNavigationSetItemViewPixi
                            key={x.pageId}
                            node={x}
                        />
                    )
                : null))}
        </Box>
    );
};
