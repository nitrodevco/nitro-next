import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CollectibleHubLayoutLoadedContent2, CollectibleHubLayoutLoadedContent2Props } from './CollectibleHubLayoutLoadedContent2';

/** Named region `collectionsContainer` of CollectibleHubLayout - configured through the parent's `collectionsContainer` prop. */
export interface CollectibleHubLayoutCollectionsContainerProps {
    layout?: BoxLayout;
    loadedContent?: CollectibleHubLayoutLoadedContent2Props;
    srcLoadingIcon?: string;
    visibleLoadingContents?: boolean;
}

export const CollectibleHubLayoutCollectionsContainer = ({ layout, loadedContent, srcLoadingIcon, visibleLoadingContents }: CollectibleHubLayoutCollectionsContainerProps) => {
    return (
        <Region
            name="collectionsContainer"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 3, top: 125, height: 429, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutLoadedContent2 {...loadedContent} />
            {(visibleLoadingContents ?? false) && (
                <Region
                    name="loading_contents"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <Border
                        variant="2"
                        tintColor="#a4a49f"
                        layout={{ position: 'absolute', left: 185, width: 113, top: 155, height: 116 }}
                    />
                    <ThemeImage
                        name="loading_icon"
                        src={srcLoadingIcon ?? layoutImage('loading.png')}
                        layout={{ position: 'absolute', left: 205, width: 75, top: 175, height: 75 }}
                    />
                </Region>
            )}
        </Region>
    );
};
