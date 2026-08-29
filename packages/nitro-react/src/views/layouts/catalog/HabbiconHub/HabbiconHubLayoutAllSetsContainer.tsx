import { Border, BoxLayout, Region } from '#base/theme';

import { HabbiconHubLayoutSetPageContainer, HabbiconHubLayoutSetPageContainerProps } from './HabbiconHubLayoutSetPageContainer';
import { HabbiconHubLayoutSetRailList, HabbiconHubLayoutSetRailListProps } from './HabbiconHubLayoutSetRailList';

/** Named region `all_sets_container` of HabbiconHubLayout - configured through the parent's `allSetsContainer` prop. */
export interface HabbiconHubLayoutAllSetsContainerProps {
    layout?: BoxLayout;
    setPageContainer?: HabbiconHubLayoutSetPageContainerProps;
    setRailList?: HabbiconHubLayoutSetRailListProps;
}

export const HabbiconHubLayoutAllSetsContainer = ({ layout, setPageContainer, setRailList }: HabbiconHubLayoutAllSetsContainerProps) => {
    return (
        <Region
            name="all_sets_container"
            layout={{ position: 'absolute', left: 7, width: 540, top: 146, bottom: 44, ...layout }}
        >
            <Border
                variant="6"
                name="set_rail_background"
                layout={{ position: 'absolute', left: 0, width: 154, top: 0, bottom: 0 }}
            />
            <HabbiconHubLayoutSetRailList {...setRailList} />
            <HabbiconHubLayoutSetPageContainer {...setPageContainer} />
        </Region>
    );
};
