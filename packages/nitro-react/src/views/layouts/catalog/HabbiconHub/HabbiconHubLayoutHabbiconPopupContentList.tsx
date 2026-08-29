import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { HabbiconHubLayoutHabbiconPopupActionRowItem } from './HabbiconHubLayoutHabbiconPopupActionRowItem';
import { HabbiconHubLayoutHabbiconPopupBottomBarItem } from './HabbiconHubLayoutHabbiconPopupBottomBarItem';
import { HabbiconHubLayoutHabbiconPopupDescriptionItem } from './HabbiconHubLayoutHabbiconPopupDescriptionItem';
import { HabbiconHubLayoutHabbiconPopupTitleItem } from './HabbiconHubLayoutHabbiconPopupTitleItem';

/** Named region `habbicon_popup_content_list` of HabbiconHubLayout - configured through the parent's `habbiconPopupContentList` prop. */
export interface HabbiconHubLayoutHabbiconPopupContentListProps {
    itemsHabbiconPopupContentList?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutHabbiconPopupContentList = ({ itemsHabbiconPopupContentList, layout }: HabbiconHubLayoutHabbiconPopupContentListProps) => {
    return (
        <Region
            name="habbicon_popup_content_list"
            layout={{ position: 'absolute', left: 0, right: 0, top: 6, height: 108, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsHabbiconPopupContentList ?? (
                <>
                    <HabbiconHubLayoutHabbiconPopupTitleItem />
                    <HabbiconHubLayoutHabbiconPopupDescriptionItem />
                    <HabbiconHubLayoutHabbiconPopupActionRowItem />
                    <HabbiconHubLayoutHabbiconPopupBottomBarItem />
                </>
            )}
        </Region>
    );
};
