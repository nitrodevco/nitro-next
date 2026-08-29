import { BoxLayout, Region } from '#base/theme';

import { CollectibleHubLayoutItemgridCollection, CollectibleHubLayoutItemgridCollectionProps } from './CollectibleHubLayoutItemgridCollection';

/** Named region `item_container` of CollectibleHubLayout - configured through the parent's `itemContainer` prop. */
export interface CollectibleHubLayoutItemContainerProps {
    itemgridCollection?: CollectibleHubLayoutItemgridCollectionProps;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutItemContainer = ({ itemgridCollection, layout }: CollectibleHubLayoutItemContainerProps) => {
    return (
        <Region
            name="item_container"
            layout={{ position: 'absolute', left: 0, width: 290, top: 300, height: 123, ...layout }}
        >
            <CollectibleHubLayoutItemgridCollection {...itemgridCollection} />
        </Region>
    );
};
