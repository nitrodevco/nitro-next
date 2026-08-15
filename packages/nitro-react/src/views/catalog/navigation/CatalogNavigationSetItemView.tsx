import { ICatalogNode } from "@nitrodevco/nitro-api"

import { useCatalogSelectors } from "#base/context";
import { useCatalogNavigation } from "#base/hooks";
import { useConfigurationStore } from "#base/stores";
import { cn } from "#base/theme";

import { CatalogNavigationSetView } from "./CatalogNavigationSetView";

type CatalogNavigationSetItemViewProps = {
    node: ICatalogNode;
    child?: boolean;
}

export const CatalogNavigationSetItemView = (props: CatalogNavigationSetItemViewProps) => {
    const { node } = props;
    const { activateNode } = useCatalogNavigation();
    const { activeNodes, openNodeIds } = useCatalogSelectors();
    const catalogIconUrl = useConfigurationStore(state => state.config['catalog.icons.url']) as string | undefined;
    const isActive = activeNodes.includes(node);
    const isOpen = openNodeIds.includes(node.pageId);
    const hasChildren = node.children.length > 0;

    return (
        <>
            <div className={cn('flex items-center py-0.5 cursor-pointer border-b border-transparent', isActive && 'bg-[#82d1ed] border-[#B4B4AE]!')} onClick={() => activateNode(node)} style={{ paddingLeft: `${(node.depth - 2) * 10}px` }}>
                <div className={cn('flex items-center w-full px-px min-h-4 max-h-4 text-[#666666]', isActive && 'bg-[#63c5e9] text-white')}>
                    <div className="flex items-center justify-center w-5">
                        <img src={catalogIconUrl?.replace('%name%', node.icon.toString())} />
                    </div>
                    <div className="flex items-center w-full px-2.5">
                        <span className="text-style-u-bold w-full">{node.localization}</span>
                        {hasChildren &&
                            <>
                                {isOpen && <div className="habbo-icon icon-tri-arrow-up" />}
                                {!isOpen && <div className="habbo-icon icon-tri-arrow-down" />}
                            </>}
                    </div>
                </div>
            </div>
            {isOpen && hasChildren && <CatalogNavigationSetView node={node} />}
        </>
    );
}
