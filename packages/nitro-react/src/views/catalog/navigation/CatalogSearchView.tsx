import { CatalogTypeEnum, ICatalogNode, IFurnitureData, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { showCatalogPage } from '#base/commands';
import { CatalogPage, useCatalogActions, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useSystemStore, useTranslation } from '#base/context/system';
import { useCatalogOfferActions } from '#base/hooks';
import { Border, LayoutImage, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/**
 * The catalogue search, `searchContainer` of `catalog_ubuntu_with_tabs.xml` - Flash's
 * `HabboCatalog.onSearchInputEvent` / `performSearch`. The layout's `search.helper` text stands in
 * for a placeholder: it sits under the transparent `search.input` and shows while it is empty.
 */
export interface CatalogSearchViewProps {
    /** `CatalogViewer.setLeftPaneVisibility`: hidden while a wide layout covers it. */
    visible?: boolean;
}

export const CatalogSearchView = ({ visible = true }: CatalogSearchViewProps) => {
    const [ searchValue, setSearchValue ] = useState('');
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);
    const catalogType = useCatalogStore(x => x.catalogType);
    const rootNode = useCatalogStore(x => x.rootNode);
    const offersToNodes = useCatalogStore(x => x.offersToNodes);
    const { setSearchResult } = useCatalogActions();
    const store = useCatalogStoreApi();
    const { processAsOffer } = useCatalogOfferActions();
    const t = useTranslation();

    const onIconPress = () => {
        if (searchValue.length > 0) setSearchValue('');
    };

    const getOfferNodes = (offerId: number, flag: boolean = false) => {
        if (!flag) return offersToNodes[offerId] ?? [];

        const allowedNodes: ICatalogNode[] = [];

        for (const node of offersToNodes[offerId]) {
            if (node.visible) allowedNodes.push(node);
        }

        return allowedNodes;
    };

    /**
     * `CatalogNavigator.markSearchNodes` / `addSearchNodesToList`: the visible pages whose name or
     * localization matches, in tree order. Flash tests `param1.children` and recurses, so the
     * index root is never a result of its own - that is structural, not the `pageId > 0` test:
     * the root's page id is whatever the server writes for it, and some write a real one.
     */
    const filterNodes = (search: string, furniLines: string[], node: ICatalogNode, nodes: ICatalogNode[]) => {
        for (const child of node.children) {
            if (child.visible && (child.pageId > 0)) {
                let nodeAdded = false;

                const hayStack = [ child.pageName, child.localization ].join(' ').toLowerCase().replace(/ /gi, '');

                if (hayStack.indexOf(search) > -1) {
                    nodes.push(child);

                    nodeAdded = true;
                }

                if (!nodeAdded) {
                    for (const furniLine of furniLines) {
                        if (hayStack.indexOf(furniLine) >= 0) {
                            nodes.push(child);

                            break;
                        }
                    }
                }
            }

            filterNodes(search, furniLines, child, nodes);
        }
    };

    useEffect(() => {
        const search = searchValue?.toLocaleLowerCase().replace(' ', '');

        if (!search || !search.length) {
            setSearchResult(undefined);

            return;
        }

        const timeout = setTimeout(() => {
            if (!rootNode) return;

            const furnitureDatas: Record<number, IFurnitureData> = { ...floorItems, ...wallItems };
            const foundFurniture: IFurnitureData[] = [];
            const foundFurniLines: string[] = [];

            for (const furnitureData of Object.values(furnitureDatas)) {
                if (!furnitureData) continue;

                if ((catalogType === CatalogTypeEnum.BuildersClub) && !furnitureData.availableForBuildersClub) continue;

                if ((catalogType === CatalogTypeEnum.Normal) && furnitureData.excludeDynamic) continue;

                const searchValues = [ furnitureData.className, furnitureData.localizedName, furnitureData.description ].join(' ').replace(/ /gi, '').toLowerCase();

                if ((catalogType === CatalogTypeEnum.BuildersClub) && (furnitureData.purchaseOfferId === -1) && (furnitureData.rentOfferId === -1)) {
                    if ((furnitureData.furniLine !== '') && (foundFurniLines.indexOf(furnitureData.furniLine) < 0)) {
                        if (searchValues.indexOf(search) >= 0) foundFurniLines.push(furnitureData.furniLine);
                    }
                } else {
                    const foundNodes = [
                        ...getOfferNodes(furnitureData.purchaseOfferId),
                        ...getOfferNodes(furnitureData.rentOfferId),
                    ];

                    if (foundNodes.length) {
                        if (searchValues.indexOf(search) >= 0) foundFurniture.push(furnitureData);

                        if (foundFurniture.length === 250) break;
                    }
                }
            }

            const purchasableOffers: IPurchasableOffer[] = [];

            for (const furniture of foundFurniture) {
                const offer = processAsOffer(furniture);

                if (!offer) continue;

                purchasableOffers.push(offer);
            }

            const nodes: ICatalogNode[] = [];

            filterNodes(search, foundFurniLines, rootNode, nodes);

            setSearchResult({
                searchValue: search,
                offers: purchasableOffers,
                nodes: nodes.filter(x => x.visible),
            });

            showCatalogPage(store, -1, 'default_3x3', { imageDatas: [], textDatas: [] }, purchasableOffers, -1, false, CatalogPage.MODE_SEARCH);
        }, 300);

        return () => clearTimeout(timeout);
    }, [ offersToNodes, catalogType, rootNode, searchValue ]);

    return (
        <Border
            variant="105"
            name="searchContainer"
            visible={visible}
            layout={{ position: 'absolute', left: 8, width: 184, top: 131, height: 24 }}
        >
            {/* `search.helper`: shown while the field is empty (`onSearchInputEvent`). */}
            {!searchValue.length && (
                <ThemeText
                    name="search.helper"
                    text={t('catalog.search')}
                    textStyle="u_regular"
                    textOptions={{ fill: '#666666' }}
                    markup
                    alpha={0.5}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 4, top: 3 }}
                />
            )}
            <TextInput
                value={searchValue}
                onChange={setSearchValue}
                textStyle="u_regular"
                textColor="#666666"
                flashPlacement
                backgroundColor={null}
                focusedBackgroundColor={null}
                layout={{ position: 'absolute', left: 4, width: 144, top: 3, height: 18 }}
            />
            <Region
                name="clear_search_button"
                cursor="pointer"
                onPointerTap={onIconPress}
                layout={{ position: 'absolute', left: 160, width: 20, top: 2, height: 20 }}
            >
                {/* `HabboCatalog.onSearchInputEvent`: `search.clear.icon` is the `icons_close`
                    cross while the field has text and the `common_small_pen` pencil when it is
                    empty - both library bitmaps, not icon-set styles. */}
                <ThemeImage
                    name="search.clear.icon"
                    src={LayoutImage(searchValue.length > 0 ? 'shared/icons_close.png' : 'shared/common_small_pen.png')}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                />
            </Region>
        </Border>
    );
};
