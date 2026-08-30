import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CollectibleHubLayoutLoadedContent5, CollectibleHubLayoutLoadedContent5Props } from './CollectibleHubLayoutLoadedContent5';

/** Named region `rewardsContainer` of CollectibleHubLayout - configured through the parent's `rewardsContainer` prop. */
export interface CollectibleHubLayoutRewardsContainerProps {
    layout?: BoxLayout;
    loadedContent?: CollectibleHubLayoutLoadedContent5Props;
    srcLoadingIcon?: string;
    visibleLoadedContent?: boolean;
    visibleLoadingContents?: boolean;
    visibleRewardsContainer?: boolean;
}

export const CollectibleHubLayoutRewardsContainer = ({ layout, loadedContent, srcLoadingIcon, visibleLoadedContent, visibleLoadingContents, visibleRewardsContainer }: CollectibleHubLayoutRewardsContainerProps) => {
    const t = useTranslation();

    return (
        (visibleRewardsContainer ?? false) && (
            <Region
                name="rewardsContainer"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 3, top: 125, height: 429, overflow: 'hidden', ...layout }}
            >
                {(visibleLoadedContent ?? false) && (
                    <CollectibleHubLayoutLoadedContent5 {...loadedContent} />
                )}
                <Region
                    name="no_content_container"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <Region
                        name="headercontainer"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 100, justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('collectibles.no_claims')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 450, align: 'center' }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', marginLeft: 1.5, marginRight: -1.5, width: 450, top: 28, bottom: 55, minWidth: 450, maxWidth: 450, minHeight: 17, maxHeight: 200 }}
                        />
                    </Region>
                    <Region
                        name="image_container"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 100, height: 332, justifyContent: 'center' }}
                    >
                        <ThemeImage
                            src={layoutImage('image_frank_dont_know.png')}
                            layout={{ position: 'absolute', width: 485, alignSelf: 'center', marginTop: -28, marginBottom: 28, height: 176 }}
                        />
                    </Region>
                </Region>
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
        )
    );
};
