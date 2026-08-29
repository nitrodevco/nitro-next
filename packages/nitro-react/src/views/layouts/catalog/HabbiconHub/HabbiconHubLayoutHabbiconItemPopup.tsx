import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { HabbiconHubLayoutHabbiconPopupBackgroundItem } from './HabbiconHubLayoutHabbiconPopupBackgroundItem';
import { HabbiconHubLayoutHabbiconPopupPointerItem } from './HabbiconHubLayoutHabbiconPopupPointerItem';

/** Named region `habbicon_item_popup` of HabbiconHubLayout - configured through the parent's `habbiconItemPopup` prop. */
export interface HabbiconHubLayoutHabbiconItemPopupProps {
    itemsHabbiconItemPopup?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutHabbiconItemPopup = ({ itemsHabbiconItemPopup, layout }: HabbiconHubLayoutHabbiconItemPopupProps) => {
    return (
        <Region
            name="habbicon_item_popup"
            layout={{ position: 'absolute', left: 190, width: 180, top: 210, height: 136, flexDirection: 'column', ...layout }}
        >
            {itemsHabbiconItemPopup ?? (
                <>
                    <HabbiconHubLayoutHabbiconPopupBackgroundItem />
                    <HabbiconHubLayoutHabbiconPopupPointerItem />
                </>
            )}
        </Region>
    );
};
