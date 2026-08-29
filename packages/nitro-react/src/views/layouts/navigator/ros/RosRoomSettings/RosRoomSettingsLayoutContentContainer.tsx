import { BoxLayout, Region } from '#base/theme';

import { RosRoomSettingsLayoutTabContainer1, RosRoomSettingsLayoutTabContainer1Props } from './RosRoomSettingsLayoutTabContainer1';
import { RosRoomSettingsLayoutTabContainer2, RosRoomSettingsLayoutTabContainer2Props } from './RosRoomSettingsLayoutTabContainer2';
import { RosRoomSettingsLayoutTabContainer3, RosRoomSettingsLayoutTabContainer3Props } from './RosRoomSettingsLayoutTabContainer3';
import { RosRoomSettingsLayoutTabContainer4, RosRoomSettingsLayoutTabContainer4Props } from './RosRoomSettingsLayoutTabContainer4';
import { RosRoomSettingsLayoutTabContainer5, RosRoomSettingsLayoutTabContainer5Props } from './RosRoomSettingsLayoutTabContainer5';

/** Named region `content_container` of RosRoomSettingsLayout - configured through the parent's `contentContainer` prop. */
export interface RosRoomSettingsLayoutContentContainerProps {
    layout?: BoxLayout;
    onContentContainer?: () => void;
    tabContainer1?: RosRoomSettingsLayoutTabContainer1Props;
    tabContainer2?: RosRoomSettingsLayoutTabContainer2Props;
    tabContainer3?: RosRoomSettingsLayoutTabContainer3Props;
    tabContainer4?: RosRoomSettingsLayoutTabContainer4Props;
    tabContainer5?: RosRoomSettingsLayoutTabContainer5Props;
    visibleTabContainer1?: boolean;
    visibleTabContainer2?: boolean;
    visibleTabContainer3?: boolean;
    visibleTabContainer5?: boolean;
}

export const RosRoomSettingsLayoutContentContainer = ({ layout, onContentContainer, tabContainer1, tabContainer2, tabContainer3, tabContainer4, tabContainer5, visibleTabContainer1, visibleTabContainer2, visibleTabContainer3, visibleTabContainer5 }: RosRoomSettingsLayoutContentContainerProps) => {
    return (
        <Region
            name="content_container"
            onPointerTap={onContentContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 10, width: 327, top: 42, height: 369, ...layout }}
        >
            {(visibleTabContainer1 ?? false) && (
                <RosRoomSettingsLayoutTabContainer1 {...tabContainer1} />
            )}
            {(visibleTabContainer2 ?? false) && (
                <RosRoomSettingsLayoutTabContainer2 {...tabContainer2} />
            )}
            {(visibleTabContainer3 ?? false) && (
                <RosRoomSettingsLayoutTabContainer3 {...tabContainer3} />
            )}
            <RosRoomSettingsLayoutTabContainer4 {...tabContainer4} />
            {(visibleTabContainer5 ?? false) && (
                <RosRoomSettingsLayoutTabContainer5 {...tabContainer5} />
            )}
        </Region>
    );
};
