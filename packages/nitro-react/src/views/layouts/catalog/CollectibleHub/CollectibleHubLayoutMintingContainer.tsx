import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CollectibleHubLayoutLoadedContent, CollectibleHubLayoutLoadedContentProps } from './CollectibleHubLayoutLoadedContent';

/** Named region `mintingContainer` of CollectibleHubLayout - configured through the parent's `mintingContainer` prop. */
export interface CollectibleHubLayoutMintingContainerProps {
    layout?: BoxLayout;
    loadedContent?: CollectibleHubLayoutLoadedContentProps;
    srcLoadingIcon?: string;
    visibleLoadingContents?: boolean;
    visibleMintingContainer?: boolean;
}

export const CollectibleHubLayoutMintingContainer = ({ layout, loadedContent, srcLoadingIcon, visibleLoadingContents, visibleMintingContainer }: CollectibleHubLayoutMintingContainerProps) => {
    return (
        (visibleMintingContainer ?? false) && (
            <Region
                name="mintingContainer"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 10, top: 125, height: 430, overflow: 'hidden', ...layout }}
            >
                <CollectibleHubLayoutLoadedContent {...loadedContent} />
                {(visibleLoadingContents ?? false) && (
                    <Region
                        name="loading_contents"
                        layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429 }}
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
