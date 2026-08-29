import { BoxLayout, Region } from '#base/theme';

import { RoomSettingsLayoutFlexibleContent, RoomSettingsLayoutFlexibleContentProps } from './RoomSettingsLayoutFlexibleContent';
import { RoomSettingsLayoutNormalAccessContainer, RoomSettingsLayoutNormalAccessContainerProps } from './RoomSettingsLayoutNormalAccessContainer';

/** Row template `tab_container_2` of RoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RoomSettingsLayoutTabContainer2ItemProps {
    flexibleContent?: RoomSettingsLayoutFlexibleContentProps;
    layout?: BoxLayout;
    normalAccessContainer?: RoomSettingsLayoutNormalAccessContainerProps;
    visibleFlexibleContent?: boolean;
    visibleNormalAccessContainer?: boolean;
}

export const RoomSettingsLayoutTabContainer2Item = ({ flexibleContent, layout, normalAccessContainer, visibleFlexibleContent, visibleNormalAccessContainer }: RoomSettingsLayoutTabContainer2ItemProps) => {
    return (
        <Region
            name="tab_container_2"
            layout={{ width: 321, height: 366, flexShrink: 0, ...layout }}
        >
            {(visibleNormalAccessContainer ?? true) && (
                <RoomSettingsLayoutNormalAccessContainer {...normalAccessContainer} />
            )}
            {(visibleFlexibleContent ?? true) && (
                <RoomSettingsLayoutFlexibleContent {...flexibleContent} />
            )}
        </Region>
    );
};
