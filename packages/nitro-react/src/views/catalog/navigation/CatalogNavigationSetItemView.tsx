import { ICatalogNode } from "@nitrodevco/nitro-api"
import { useState } from "react";

import { useConfigValue } from "#base/context";
import { useCatalogNavigation } from "#base/hooks";
import { BitmapText, cn } from "#base/theme";

import { CatalogNavigationSetView } from "./CatalogNavigationSetView";

type CatalogNavigationSetItemViewProps = {
    node: ICatalogNode;
    depth?: number;
}

export const CatalogNavigationSetItemView = (props: CatalogNavigationSetItemViewProps) => {
    const { node, depth = 0 } = props;
    const { activateNode } = useCatalogNavigation();
    const catalogIconUrl = useConfigValue<string>('catalog.icons.url') ?? '';
    const hasChildren = node.children.length > 0;
    const [isHovered, setIsHovered] = useState(false);
    const isHighlighted = node.isActive || isHovered;

    return (
        <>
            <button
                type="button"
                className={cn('catalog-navigation-item', depth > 0 && 'is-child', node.isActive && 'is-active')}
                aria-current={node.isActive ? 'page' : undefined}
                aria-expanded={hasChildren ? node.isOpen : undefined}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
                onClick={() => activateNode(node)}>
                <span className="catalog-navigation-row" style={{ paddingLeft: `${depth * 15}px` }}>
                    <span className="catalog-navigation-icon">
                        <img src={catalogIconUrl?.replace('%name%', node.icon.toString())} alt="" />
                    </span>
                    <span className="catalog-navigation-copy">
                        <BitmapText
                            recipe={depth > 0 ? 'bold-italic-12' : 'bold-12'}
                            color={isHighlighted ? '#ffffff' : depth > 0 ? '#52819a' : '#666666'}
                            shadowColor={isHighlighted ? '#b4b4ae' : undefined}
                            shadowY={-1}
                            className={cn('catalog-navigation-label', depth > 0 && 'is-child')}>
                            {node.localization || node.pageName}
                        </BitmapText>
                        {hasChildren &&
                            <span className={cn('habbo-icon catalog-navigation-disclosure', node.isOpen ? 'icon-tri-arrow-down' : 'icon-tri-arrow-right')} />}
                    </span>
                </span>
            </button>
            {node.isOpen && hasChildren && <CatalogNavigationSetView node={node} depth={depth + 1} />}
        </>
    );
}
