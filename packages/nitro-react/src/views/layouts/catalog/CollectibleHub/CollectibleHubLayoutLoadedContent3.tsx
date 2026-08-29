import { BoxLayout, Region } from '#base/theme';

import { CollectibleHubLayoutCollectionContent2, CollectibleHubLayoutCollectionContent2Props } from './CollectibleHubLayoutCollectionContent2';
import { CollectibleHubLayoutNavigationContainer2, CollectibleHubLayoutNavigationContainer2Props } from './CollectibleHubLayoutNavigationContainer2';

/** Named region `loaded_content` of CollectibleHubLayout - configured through the parent's `loadedContent` prop. */
export interface CollectibleHubLayoutLoadedContent3Props {
    collectionContent?: CollectibleHubLayoutCollectionContent2Props;
    layout?: BoxLayout;
    navigationContainer?: CollectibleHubLayoutNavigationContainer2Props;
}

export const CollectibleHubLayoutLoadedContent3 = ({ collectionContent, layout, navigationContainer }: CollectibleHubLayoutLoadedContent3Props) => {
    return (
        <Region
            name="loaded_content"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <CollectibleHubLayoutNavigationContainer2 {...navigationContainer} />
            <CollectibleHubLayoutCollectionContent2 {...collectionContent} />
        </Region>
    );
};
