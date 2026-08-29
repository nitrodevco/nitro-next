import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CollectibleHubLayoutLoadedContent3, CollectibleHubLayoutLoadedContent3Props } from './CollectibleHubLayoutLoadedContent3';

/** Named region `shopContainer` of CollectibleHubLayout - configured through the parent's `shopContainer` prop. */
export interface CollectibleHubLayoutShopContainerProps {
    layout?: BoxLayout;
    loadedContent?: CollectibleHubLayoutLoadedContent3Props;
    srcLoadingIcon?: string;
    visibleLoadingContents?: boolean;
    visibleShopContainer?: boolean;
}

export const CollectibleHubLayoutShopContainer = ({ layout, loadedContent, srcLoadingIcon, visibleLoadingContents, visibleShopContainer }: CollectibleHubLayoutShopContainerProps) => {
    return (
        (visibleShopContainer ?? false) && (
            <Region
                name="shopContainer"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: -5, right: 3, top: 125, height: 428, overflow: 'hidden', ...layout }}
            >
                <CollectibleHubLayoutLoadedContent3 {...loadedContent} />
                {(visibleLoadingContents ?? false) && (
                    <Region
                        name="loading_contents"
                        layout={{ position: 'absolute', left: 5, width: 485, top: 0, height: 429 }}
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
        )
    );
};
