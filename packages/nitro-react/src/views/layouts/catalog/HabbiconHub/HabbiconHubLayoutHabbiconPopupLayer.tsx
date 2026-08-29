import { BoxLayout, Region } from '#base/theme';

import { HabbiconHubLayoutHabbiconItemPopup, HabbiconHubLayoutHabbiconItemPopupProps } from './HabbiconHubLayoutHabbiconItemPopup';

/** Named region `habbicon_popup_layer` of HabbiconHubLayout - configured through the parent's `habbiconPopupLayer` prop. */
export interface HabbiconHubLayoutHabbiconPopupLayerProps {
    habbiconItemPopup?: HabbiconHubLayoutHabbiconItemPopupProps;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutHabbiconPopupLayer = ({ habbiconItemPopup, layout }: HabbiconHubLayoutHabbiconPopupLayerProps) => {
    return (
        <Region
            name="habbicon_popup_layer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 102, bottom: 40, ...layout }}
        >
            <HabbiconHubLayoutHabbiconItemPopup {...habbiconItemPopup} />
        </Region>
    );
};
