import { BoxLayout, Region } from '#base/theme';

import { CollectibleHubLayoutPaddedCont, CollectibleHubLayoutPaddedContProps } from './CollectibleHubLayoutPaddedCont';

/** Named region `completion_header_container` of CollectibleHubLayout - configured through the parent's `completionHeaderContainer` prop. */
export interface CollectibleHubLayoutCompletionHeaderContainerProps {
    layout?: BoxLayout;
    paddedCont?: CollectibleHubLayoutPaddedContProps;
}

export const CollectibleHubLayoutCompletionHeaderContainer = ({ layout, paddedCont }: CollectibleHubLayoutCompletionHeaderContainerProps) => {
    return (
        <Region
            name="completion_header_container"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 60, ...layout }}
        >
            <CollectibleHubLayoutPaddedCont {...paddedCont} />
        </Region>
    );
};
