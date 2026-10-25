/**
 * `nux/NuxNoobRoomOfferView`: "Welcome to Habbo - Enter a room to meet other new users", the
 * `habbo-toolbar-com/nux_noob_room_offer_xml` frame at 20,20, put up by `nuxCommands` a while after
 * a new user enters their home room. "Enter the room!" (`btnGo`) asks for a new user lobby and
 * leaves the window up - entering the lobby, or any room but home, takes it down; the close tag
 * takes it down at once.
 */
import { goToNoobLobby, hideNoobLobbyOffer } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useOnboardingStore } from '#base/context/onboarding';
import { TemplateWindow, useTemplateFrame } from '#base/theme';

const TEMPLATE = 'habbo-toolbar-com/nux_noob_room_offer_xml';

export const NoobLobbyOfferView = () => {
    const shown = useOnboardingStore(x => x.noobLobbyOffer);

    if (!shown) return null;

    return <NoobLobbyOfferWindow />;
};

const NoobLobbyOfferWindow = () => {
    const { send } = useWebSocketContext();
    const frame = useTemplateFrame({ id: 'nux-noob-room-offer', defaultPosition: { x: 20, y: 20 }, rememberPosition: false, resizeDirection: 'none', onClose: hideNoobLobbyOffer });

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={{
                btnGo: { onPointerTap: () => goToNoobLobby(send) },
            }}
        />
    );
};
