import { ICatalogNode } from "@nitrodevco/nitro-api"

import { CatalogNavigationSetItemView } from "./CatalogNavigationSetItemView";

type CatalogNavigationSetViewProps = {
    node: ICatalogNode;
    depth?: number;
}

export const CatalogNavigationSetView = (props: CatalogNavigationSetViewProps) => {
    const { node, depth = 0 } = props;

    if (!node.children.length) return null;

    return (
        <div className="catalog-navigation-list">
            {node.children.map(x => {
                return x.visible ? <CatalogNavigationSetItemView key={x.pageId} node={x} depth={depth} /> : null;
            })}
        </div>
    )
}
