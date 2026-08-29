import { BoxLayout, Region } from '#base/theme';

import { CollectibleHubLayoutItemgridInventory, CollectibleHubLayoutItemgridInventoryProps } from './CollectibleHubLayoutItemgridInventory';
import { CollectibleHubLayoutPreviewContainer, CollectibleHubLayoutPreviewContainerProps } from './CollectibleHubLayoutPreviewContainer';

/** Named region `furniture_container` of CollectibleHubLayout - configured through the parent's `furnitureContainer` prop. */
export interface CollectibleHubLayoutFurnitureContainerProps {
    itemgridInventory?: CollectibleHubLayoutItemgridInventoryProps;
    layout?: BoxLayout;
    previewContainer?: CollectibleHubLayoutPreviewContainerProps;
}

export const CollectibleHubLayoutFurnitureContainer = ({ itemgridInventory, layout, previewContainer }: CollectibleHubLayoutFurnitureContainerProps) => {
    return (
        <Region
            name="furniture_container"
            layout={{ position: 'absolute', left: 4, width: 480, top: 60, height: 262, ...layout }}
        >
            <CollectibleHubLayoutItemgridInventory {...itemgridInventory} />
            <CollectibleHubLayoutPreviewContainer {...previewContainer} />
        </Region>
    );
};
