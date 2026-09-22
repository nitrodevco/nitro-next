import { ICatalogNode } from '@nitrodevco/nitro-api';

import { Region } from '#base/theme';

import { CatalogNavigationSetItemView } from './CatalogNavigationSetItemView';

export interface CatalogNavigationSetViewProps {
    node: ICatalogNode;
}

/**
 * A node's child list: `normal_list_template` of `catalog_ubuntu_with_tabs.xml`, the itemlist
 * `CatalogNodeRenderable.createChildList` clones - its visible children stacked with no spacing.
 */
export const CatalogNavigationSetView = ({ node }: CatalogNavigationSetViewProps) => {
    if (!node.children.length) return null;

    return (
        <Region layout={{ flexDirection: 'column', width: 178 }}>
            {node.children.map((x, index) => (x.visible
                ? (
                        <CatalogNavigationSetItemView
                            key={`${index}:${x.pageName}`}
                            node={x}
                        />
                    )
                : null))}
        </Region>
    );
};
