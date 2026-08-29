import { BoxLayout, Region } from '#base/theme';

import { CollectibleHubLayoutItemlist, CollectibleHubLayoutItemlistProps } from './CollectibleHubLayoutItemlist';

/** Named region `item_container` of CollectibleHubLayout - configured through the parent's `itemContainer` prop. */
export interface CollectibleHubLayoutItemContainer3Props {
    itemlist?: CollectibleHubLayoutItemlistProps;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutItemContainer3 = ({ itemlist, layout }: CollectibleHubLayoutItemContainer3Props) => {
    return (
        <Region
            name="item_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 374, ...layout }}
        >
            <CollectibleHubLayoutItemlist {...itemlist} />
        </Region>
    );
};
