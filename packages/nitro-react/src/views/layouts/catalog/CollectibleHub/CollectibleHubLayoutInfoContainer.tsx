import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CollectibleHubLayoutCategoryContentBackground, CollectibleHubLayoutCategoryContentBackgroundProps } from './CollectibleHubLayoutCategoryContentBackground';

/** Named region `infoContainer` of CollectibleHubLayout - configured through the parent's `infoContainer` prop. */
export interface CollectibleHubLayoutInfoContainerProps {
    categoryContentBackground?: CollectibleHubLayoutCategoryContentBackgroundProps;
    layout?: BoxLayout;
    visibleInfoContainer?: boolean;
}

export const CollectibleHubLayoutInfoContainer = ({ categoryContentBackground, layout, visibleInfoContainer }: CollectibleHubLayoutInfoContainerProps) => {
    return (
        (visibleInfoContainer ?? false) && (
            <Region
                name="infoContainer"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 98, top: 125, height: 419, overflow: 'hidden', ...layout }}
            >
                <CollectibleHubLayoutCategoryContentBackground {...categoryContentBackground} />
                <ThemeImage
                    src={layoutImage('collectables_collection_default.png')}
                    layout={{ position: 'absolute', left: 128, width: 216, top: 155, height: 264 }}
                />
            </Region>
        )
    );
};
