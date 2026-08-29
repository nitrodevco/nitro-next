import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CollectibleHubLayoutLoadedContent4, CollectibleHubLayoutLoadedContent4Props } from './CollectibleHubLayoutLoadedContent4';

/** Named region `transferContainer` of CollectibleHubLayout - configured through the parent's `transferContainer` prop. */
export interface CollectibleHubLayoutTransferContainerProps {
    layout?: BoxLayout;
    loadedContent?: CollectibleHubLayoutLoadedContent4Props;
    srcLoadingIcon?: string;
    visibleLoadingContents?: boolean;
    visibleTransferContainer?: boolean;
}

export const CollectibleHubLayoutTransferContainer = ({ layout, loadedContent, srcLoadingIcon, visibleLoadingContents, visibleTransferContainer }: CollectibleHubLayoutTransferContainerProps) => {
    return (
        (visibleTransferContainer ?? false) && (
            <Region
                name="transferContainer"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 15, top: 125, height: 429, overflow: 'hidden', ...layout }}
            >
                <CollectibleHubLayoutLoadedContent4 {...loadedContent} />
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
