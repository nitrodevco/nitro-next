import { Border, BoxLayout, Region } from '#base/theme';

import { CollectibleHubLayoutNavigationList, CollectibleHubLayoutNavigationListProps } from './CollectibleHubLayoutNavigationList';

/** Named region `navigationContainer` of CollectibleHubLayout - configured through the parent's `navigationContainer` prop. */
export interface CollectibleHubLayoutNavigationContainerProps {
    layout?: BoxLayout;
    navigationList?: CollectibleHubLayoutNavigationListProps;
}

export const CollectibleHubLayoutNavigationContainer = ({ layout, navigationList }: CollectibleHubLayoutNavigationContainerProps) => {
    return (
        <Region
            name="navigationContainer"
            layout={{ position: 'absolute', left: 4, width: 184, top: 88, bottom: 0, ...layout }}
        >
            <Border
                variant="6"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, width: 184, top: 0, bottom: 0 }}
            />
            <CollectibleHubLayoutNavigationList {...navigationList} />
        </Region>
    );
};
