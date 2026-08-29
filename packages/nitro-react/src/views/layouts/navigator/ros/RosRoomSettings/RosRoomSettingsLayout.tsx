import { useTranslation } from '#base/context';
import { BoxLayout, Frame, TabButton, TabContext } from '#base/theme';

import { RosRoomSettingsLayoutContentContainer, RosRoomSettingsLayoutContentContainerProps } from './RosRoomSettingsLayoutContentContainer';

/** Generated from `3065_ros_room_settings_xml` (layout "ros_room_settings", 341x477) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RosRoomSettingsLayoutProps {
    contentContainer?: RosRoomSettingsLayoutContentContainerProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onTab1?: () => void;
    onTab2?: () => void;
    onTab3?: () => void;
    onTab4?: () => void;
    onTab5?: () => void;
    selectedTabContext?: string;
}

export const RosRoomSettingsLayout = ({ contentContainer, layout, onClose, onTab1, onTab2, onTab3, onTab4, onTab5, selectedTabContext }: RosRoomSettingsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="event_window"
            name="event_window"
            caption={t('navigator.roomsettings')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 341, height: 477, ...layout }}
        >
            <TabContext
                variant="3"
                name="tab_context"
                layout={{ position: 'absolute', left: -6, width: 354, top: 3, height: 32 }}
            >
                <TabButton
                    variant="3"
                    name="tab_1"
                    selected={selectedTabContext === 'tab_1'}
                    onPointerTap={onTab1}
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 32 }}
                >
                    {t('navigator.roomsettings.tab.1')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="tab_2"
                    selected={selectedTabContext === 'tab_2'}
                    onPointerTap={onTab2}
                    layout={{ position: 'absolute', left: 185, width: 185, top: 0, height: 32 }}
                >
                    {t('navigator.roomsettings.tab.2')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="tab_3"
                    selected={selectedTabContext === 'tab_3'}
                    onPointerTap={onTab3}
                    layout={{ position: 'absolute', left: 370, width: 185, top: 0, height: 32 }}
                >
                    {t('navigator.roomsettings.tab.3')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="tab_4"
                    selected={selectedTabContext === 'tab_4'}
                    onPointerTap={onTab4}
                    layout={{ position: 'absolute', left: 555, width: 186, top: 0, height: 32 }}
                >
                    {t('navigator.roomsettings.tab.4')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="tab_5"
                    selected={selectedTabContext === 'tab_5'}
                    onPointerTap={onTab5}
                    layout={{ position: 'absolute', left: 741, width: 185, top: 0, height: 32 }}
                >
                    {t('navigator.roomsettings.tab.5')}
                </TabButton>
            </TabContext>
            <RosRoomSettingsLayoutContentContainer {...contentContainer} />
        </Frame>
    );
};
