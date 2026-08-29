import { BoxLayout, Region } from '#base/theme';

import { CollectibleHubLayoutItemContainer2, CollectibleHubLayoutItemContainer2Props } from './CollectibleHubLayoutItemContainer2';
import { CollectibleHubLayoutPreviewContainer3, CollectibleHubLayoutPreviewContainer3Props } from './CollectibleHubLayoutPreviewContainer3';

/** Named region `collection_content` of CollectibleHubLayout - configured through the parent's `collectionContent` prop. */
export interface CollectibleHubLayoutCollectionContent2Props {
    itemContainer?: CollectibleHubLayoutItemContainer2Props;
    layout?: BoxLayout;
    previewContainer?: CollectibleHubLayoutPreviewContainer3Props;
}

export const CollectibleHubLayoutCollectionContent2 = ({ itemContainer, layout, previewContainer }: CollectibleHubLayoutCollectionContent2Props) => {
    return (
        <Region
            name="collection_content"
            layout={{ position: 'absolute', left: 200, width: 290, top: 3, height: 425, ...layout }}
        >
            <CollectibleHubLayoutPreviewContainer3 {...previewContainer} />
            <CollectibleHubLayoutItemContainer2 {...itemContainer} />
        </Region>
    );
};
