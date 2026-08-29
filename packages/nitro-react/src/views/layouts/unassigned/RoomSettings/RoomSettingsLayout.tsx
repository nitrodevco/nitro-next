import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { RoomSettingsLayoutContents, RoomSettingsLayoutContentsProps } from './RoomSettingsLayoutContents';

/** Generated from `3199_room_settings_xml` (layout "room_settings", 341x584) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomSettingsLayoutProps {
    contents?: RoomSettingsLayoutContentsProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const RoomSettingsLayout = ({ contents, layout, onClose }: RoomSettingsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="event_window"
            name="event_window"
            caption={t('navigator.roomsettings')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 341, height: 584, ...layout }}
        >
            <RoomSettingsLayoutContents {...contents} />
        </Frame>
    );
};
