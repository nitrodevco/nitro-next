import { BoxLayout, Region } from '#base/theme';

import { RosRoomSettingsLayoutFlexibleContent, RosRoomSettingsLayoutFlexibleContentProps } from './RosRoomSettingsLayoutFlexibleContent';
import { RosRoomSettingsLayoutNormalAccessContainer, RosRoomSettingsLayoutNormalAccessContainerProps } from './RosRoomSettingsLayoutNormalAccessContainer';

/** Named region `tab_container_2` of RosRoomSettingsLayout - configured through the parent's `tabContainer2` prop. */
export interface RosRoomSettingsLayoutTabContainer2Props {
    flexibleContent?: RosRoomSettingsLayoutFlexibleContentProps;
    layout?: BoxLayout;
    normalAccessContainer?: RosRoomSettingsLayoutNormalAccessContainerProps;
    onTabContainer2?: () => void;
    visibleTabContainer2?: boolean;
}

export const RosRoomSettingsLayoutTabContainer2 = ({ flexibleContent, layout, normalAccessContainer, onTabContainer2, visibleTabContainer2 }: RosRoomSettingsLayoutTabContainer2Props) => {
    return (
        (visibleTabContainer2 ?? false) && (
            <Region
                name="tab_container_2"
                onPointerTap={onTabContainer2}
                cursor="pointer"
                layout={{ position: 'absolute', left: 6, width: 321, top: 0, height: 366, ...layout }}
            >
                <RosRoomSettingsLayoutNormalAccessContainer {...normalAccessContainer} />
                <RosRoomSettingsLayoutFlexibleContent {...flexibleContent} />
            </Region>
        )
    );
};
