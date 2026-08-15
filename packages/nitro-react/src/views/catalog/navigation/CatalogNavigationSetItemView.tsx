import { ICatalogNode } from "@nitrodevco/nitro-api"

import { useCatalogSelectors } from "#base/context";
import { useCatalogNavigation } from "#base/hooks";
import { useConfigurationStore } from "#base/stores";
import { cn } from "#base/theme";

import { CatalogNavigationSetView } from "./CatalogNavigationSetView";

type CatalogNavigationSetItemViewProps = {
    node: ICatalogNode;
    depth?: number;
}

export const CatalogNavigationSetItemView = (props: CatalogNavigationSetItemViewProps) => {
    const { node, depth = 0 } = props;
    const { activateNode } = useCatalogNavigation();
    const { activeNodes, openNodeIds } = useCatalogSelectors();
    const catalogIconUrl = useConfigurationStore(state => state.config['catalog.icons.url']) as string | undefined;
    const isActive = activeNodes.includes(node);
    const isOpen = openNodeIds.includes(node.pageId);
    const hasChildren = node.children.length > 0;

    return (
        <>
            <button
                type="button"
                className={cn('catalog-navigation-item', isActive && 'is-active')}
                aria-current={isActive ? 'page' : undefined}
                aria-expanded={hasChildren ? isOpen : undefined}
                onClick={() => activateNode(node)}>
                <span className="catalog-navigation-row" style={{ paddingLeft: `${depth * 15}px` }}>
                    <span className="catalog-navigation-icon">
                        <img src={catalogIconUrl?.replace('%name%', node.icon.toString())} alt="" />
                    </span>
                    <span className="catalog-navigation-copy">
                        <span className={cn('catalog-navigation-label', depth > 0 && 'is-child')}>{node.localization || node.pageName}</span>
                        {hasChildren &&
                            <span className={cn('habbo-icon catalog-navigation-disclosure', isOpen ? 'icon-tri-arrow-down' : 'icon-tri-arrow-right')} />}
                    </span>
                </span>
            </button>
            {isOpen && hasChildren && <CatalogNavigationSetView node={node} depth={depth + 1} />}
        </>
    );
}
