import { ReactNode } from 'react';

import { Border, BoxLayout, Region } from '#base/theme';

import { HabbiconHubLayoutHabbiconPopupContentList, HabbiconHubLayoutHabbiconPopupContentListProps } from './HabbiconHubLayoutHabbiconPopupContentList';

/** Row template `habbicon_popup_background` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutHabbiconPopupBackgroundItemProps {
    habbiconPopupContentList?: HabbiconHubLayoutHabbiconPopupContentListProps;
    layout?: BoxLayout;
    pointerCrossover?: ReactNode;
    visibleHabbiconPopupContentList?: boolean;
    visiblePointerCrossover?: boolean;
}

export const HabbiconHubLayoutHabbiconPopupBackgroundItem = ({ habbiconPopupContentList, layout, pointerCrossover, visibleHabbiconPopupContentList, visiblePointerCrossover }: HabbiconHubLayoutHabbiconPopupBackgroundItemProps) => {
    return (
        <Border
            variant="4"
            name="habbicon_popup_background"
            tintColor="#efefef"
            layout={{ width: 180, height: 121, flexShrink: 0, ...layout }}
        >
            {(visibleHabbiconPopupContentList ?? true) && (
                <HabbiconHubLayoutHabbiconPopupContentList {...habbiconPopupContentList} />
            )}
            {(visiblePointerCrossover ?? true) && (
                <Region
                    name="pointer_crossover"
                    backgroundColor="#efefef"
                    layout={{ position: 'absolute', left: 84, width: 13, bottom: 0, height: 2 }}
                >
                    {pointerCrossover}
                </Region>
            )}
        </Border>
    );
};
