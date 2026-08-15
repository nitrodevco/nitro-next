import { ICatalogNode } from "@nitrodevco/nitro-api";

import { Border, ScrollArea } from "#base/theme";

import { CatalogNavigationSetView } from "./CatalogNavigationSetView";

type CatalogNavigationViewProps = {
    node: ICatalogNode;
}

export const CatalogNavigationView = (props: CatalogNavigationViewProps) => {
    const { node } = props;

    if (!node) return null;

    return (
        <Border variant="6" className="catalog-navigation" blend={0.5}>
            <ScrollArea variant="3" className="catalog-navigation-scroll" contentClassName="catalog-navigation-content">
                <CatalogNavigationSetView node={node} />
            </ScrollArea>
        </Border>
    )
}
