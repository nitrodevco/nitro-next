import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ScrollArea } from '#base/theme';

import { CollectibleHubLayoutItemTemplateItem4 } from './CollectibleHubLayoutItemTemplateItem4';

/** Named region `navigationContainer` of CollectibleHubLayout - configured through the parent's `navigationContainer` prop. */
export interface CollectibleHubLayoutNavigationContainer2Props {
    itemsNavigationList?: ReactNode;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutNavigationContainer2 = ({ itemsNavigationList, layout }: CollectibleHubLayoutNavigationContainer2Props) => {
    return (
        <Region
            name="navigationContainer"
            layout={{ position: 'absolute', left: 8, width: 184, top: 3, bottom: 0, ...layout }}
        >
            <Border
                variant="6"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 3, width: 178, top: 5, bottom: 5 }}
            >
                <Region
                    name="navigationList"
                    layout={{ flexDirection: 'column', width: '100%' }}
                >
                    {itemsNavigationList ?? (
                        <CollectibleHubLayoutItemTemplateItem4 />
                    )}
                </Region>
            </ScrollArea>
        </Region>
    );
};
