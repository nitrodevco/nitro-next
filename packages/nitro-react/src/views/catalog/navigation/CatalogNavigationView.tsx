import { ICatalogNode } from '@nitrodevco/nitro-api';

import { useCatalogStore } from '#base/context/catalog';
import { Border, Region, ScrollArea } from '#base/theme';

import { CatalogNavigationSetItemView } from './CatalogNavigationSetItemView';
import { CatalogNavigationSetView } from './CatalogNavigationSetView';

export interface CatalogNavigationViewProps {
    node: ICatalogNode;
    /** `CatalogViewer.setLeftPaneVisibility`: hidden while a wide layout covers it. */
    visible?: boolean;
}

/**
 * `navigationContainer` of `catalog_ubuntu_with_tabs.xml`: the half-blended style 6 border and,
 * inside it, `navigationList` - the `scrollable_itemlist_vertical` `CatalogNavigator` fills with
 * the selected tab's children (`showNodeContent`) or with the search matches
 * (`addSearchNodesToList`). Both are anchored to the frame's bottom. The 17px scrollbar sits flush
 * against the list and hides while the list fits, which then takes the whole width
 * (`habbo_window_layout_scrollable_itemlist_vertical_ubuntu`, `ScrollableItemListWindow`).
 */
export const CatalogNavigationView = ({ node, visible = true }: CatalogNavigationViewProps) => {
    const searchResult = useCatalogStore(x => x.searchResult);

    if (!node) return null;

    return (
        <Region
            name="navigationContainer"
            visible={visible}
            layout={{ position: 'absolute', left: 8, width: 184, top: 159, bottom: 7 }}
        >
            <Border
                variant="6"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, width: 184, top: 0, bottom: 0 }}
            />
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 3, width: 178, top: 5, bottom: 5, gap: 0 }}
            >
                <Region
                    name="navigationList"
                    layout={{ flexDirection: 'column', width: '100%' }}
                >
                    {searchResult && searchResult.nodes.length > 0 && searchResult.nodes.map((x, index) => (
                        <CatalogNavigationSetItemView
                            key={`${index}:${x.pageName}`}
                            node={x}
                        />
                    ))}
                    {!searchResult && (
                        <CatalogNavigationSetView
                            key={`${node.pageId}:${node.pageName}`}
                            node={node}
                        />
                    )}
                </Region>
            </ScrollArea>
        </Region>
    );
};
