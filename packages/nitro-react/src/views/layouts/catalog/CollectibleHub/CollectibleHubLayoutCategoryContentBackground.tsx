import { BoxLayout, Region } from '#base/theme';

import { CollectibleHubLayoutCategoryCollectorHeaderRegion, CollectibleHubLayoutCategoryCollectorHeaderRegionProps } from './CollectibleHubLayoutCategoryCollectorHeaderRegion';

/** Named region `category_content_background` of CollectibleHubLayout - configured through the parent's `categoryContentBackground` prop. */
export interface CollectibleHubLayoutCategoryContentBackgroundProps {
    categoryCollectorHeaderRegion?: CollectibleHubLayoutCategoryCollectorHeaderRegionProps;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutCategoryContentBackground = ({ categoryCollectorHeaderRegion, layout }: CollectibleHubLayoutCategoryContentBackgroundProps) => {
    return (
        <Region
            name="category_content_background"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 390, top: 0, height: 400, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutCategoryCollectorHeaderRegion {...categoryCollectorHeaderRegion} />
        </Region>
    );
};
