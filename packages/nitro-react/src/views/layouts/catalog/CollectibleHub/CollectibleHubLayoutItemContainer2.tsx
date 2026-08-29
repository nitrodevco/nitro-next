import { BoxLayout, Region } from '#base/theme';

import { CollectibleHubLayoutItemgridShop, CollectibleHubLayoutItemgridShopProps } from './CollectibleHubLayoutItemgridShop';

/** Named region `item_container` of CollectibleHubLayout - configured through the parent's `itemContainer` prop. */
export interface CollectibleHubLayoutItemContainer2Props {
    itemgridShop?: CollectibleHubLayoutItemgridShopProps;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutItemContainer2 = ({ itemgridShop, layout }: CollectibleHubLayoutItemContainer2Props) => {
    return (
        <Region
            name="item_container"
            layout={{ position: 'absolute', left: 0, width: 290, top: 270, height: 153, ...layout }}
        >
            <CollectibleHubLayoutItemgridShop {...itemgridShop} />
        </Region>
    );
};
