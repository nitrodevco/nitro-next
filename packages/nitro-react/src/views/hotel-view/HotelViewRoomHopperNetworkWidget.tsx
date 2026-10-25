/**
 * `RoomHopperNetworkWidget`: `room_hopper_network`, a room network the hotel promotes - its picture
 * `landing.view.roomhopper.image.uri` in `bitmap`, the rest the layout's own texts
 * (`landing.view.roomhoppernetwork.*`). `button` (`onRoomForwardButton`) takes the user into the
 * network `landing.view.roomhopper.network.id` (`getInteger`, 0 when unset), not to their home room
 * (`HabboNavigator.goToRoomNetwork(id, false)`).
 *
 * It is an `ISettingsAwareWidget`, but its layout tags no text `COLORABLE`, so the hotel's widget
 * colours change nothing. Flash's list of its `title`, `header` and `info` texts is never read.
 */
import { goToRoomNetwork } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { hotelViewProperty, useConfigData } from '#base/context/system';
import { Box, TemplateWindow } from '#base/theme';

import { hotelViewTemplateId } from './hotelViewTemplate';

export const HotelViewRoomHopperNetworkWidget = () => {
    const { send } = useWebSocketContext();
    const config = useConfigData();
    const networkId = parseInt(hotelViewProperty(config, 'landing.view.roomhopper.network.id'), 10);

    return (
        <Box layout={{ flexShrink: 0 }}>
            <TemplateWindow
                id={hotelViewTemplateId('room_hopper_network')}
                bindings={{
                    bitmap: { asset: hotelViewProperty(config, 'landing.view.roomhopper.image.uri') },
                    button: { onPointerTap: () => goToRoomNetwork(send, Number.isNaN(networkId) ? 0 : networkId, false) },
                }}
            />
        </Box>
    );
};
