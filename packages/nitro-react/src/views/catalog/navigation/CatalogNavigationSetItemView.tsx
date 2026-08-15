import { ICatalogNode } from "@nitrodevco/nitro-api"

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
    const catalogIconUrl = useConfigurationStore(state => state.config['catalog.icons.url']) as string | undefined;
    const hasChildren = node.children.length > 0;

    return (
        <>
            <button
                type="button"
                className={cn('catalog-navigation-item', node.isActive && 'is-active')}
                aria-current={node.isActive ? 'page' : undefined}
                aria-expanded={hasChildren ? node.isOpen : undefined}
                onClick={() => activateNode(node)}>
                <span className="catalog-navigation-row" style={{ paddingLeft: `${depth * 15}px` }}>
                    <span className="catalog-navigation-icon">
                        <img src={catalogIconUrl?.replace('%name%', node.icon.toString())} alt="" />
                    </span>
                    <span className="catalog-navigation-copy">
                        <span className={cn('catalog-navigation-label', depth > 0 && 'is-child')}>{node.localization || node.pageName}</span>
                        {hasChildren &&
                            <span className={cn('habbo-icon catalog-navigation-disclosure', node.isOpen ? 'icon-tri-arrow-down' : 'icon-tri-arrow-right')} />}
                    </span>
                </span>
            </button>
            {node.isOpen && hasChildren && <CatalogNavigationSetView node={node} depth={depth + 1} />}
        </>
    );
}
