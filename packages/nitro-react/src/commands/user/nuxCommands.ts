/**
 * Habbo's new user lobbies (`nux.lobbies.enabled`), for a "real noob" (`NoobnessLevel` 2,
 * `SessionDataManager.isRealNoob`):
 *
 * - `isNoobLobbyUser`: the check every piece makes first.
 * - `onRoomSessionForNoobLobbyOffer` (`HabboNuxDialogs.onRoomSessionEvent`): entering the home
 *   room starts a timer of `nux.noob.lobby.popup.delay` seconds (70 by default; Habbo has 90), and
 *   when it runs out "Enter a room to meet other new users" comes up at 20,20
 *   (`createNoobRoomOfferView`, which logs `NewNavigator/nux.offer.lobby`). Any other room, or
 *   leaving, takes the offer and its timer down. `nux/lobbyoffer/show` and `/hide` do the same.
 * - `goToNoobLobby` (`NuxNoobRoomOfferView.onGo`): `navigator/goto/predefined_noob_lobby`, a room
 *   the server picks. The offer stays up until that room is entered.
 * - `leaveRoomAsNewUser` (`RoomUI.roomSessionStateEventHandler` RSE_ENDED with the landing page):
 *   instead of the hotel view, out of a lobby (door mode 4) goes home and out of anywhere else
 *   to a lobby - the toolbar's reception button too. (In a lobby the toolbar shows its
 *   `VISIBLE_NOOB` icons, home rather than reception: `ToolbarView`.)
 */
import { NoobnessLevelEnum, RoomDoorModeEnum } from '@nitrodevco/nitro-api';
import { EventLogComposer, ForwardToSomeRoomComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { navigatorStore } from '#base/context/navigator';
import { onboardingStore } from '#base/context/onboarding';
import { configBoolean, configString, systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';

import { goToHomeRoom } from '../navigator/navigatorCommands';

/** `getInteger("nux.noob.lobby.popup.delay", 70)`. */
const DEFAULT_POPUP_DELAY_SECONDS = 70;

/** What `navigator/goto/predefined_noob_lobby` asks the server for. */
const NOOB_LOBBY = 'predefined_noob_lobby';

let offerTimer: ReturnType<typeof setTimeout> | undefined;

/** `getBoolean("nux.lobbies.enabled") && isRealNoob`. */
export const isNoobLobbyUser = (): boolean =>
    configBoolean('nux.lobbies.enabled')
    && Number(userStore.getState().noobnessLevel) === Number(NoobnessLevelEnum.RealNoob);

/** `destroyNoobRoomOfferView`: the timer and the window. */
export const hideNoobLobbyOffer = () => {
    if (offerTimer !== undefined) clearTimeout(offerTimer);

    offerTimer = undefined;

    onboardingStore.getState().setNoobLobbyOffer(false);
};

/** `createNoobRoomOfferView`. */
export const showNoobLobbyOffer = (send: Send) => {
    if (!isNoobLobbyUser()) return;

    hideNoobLobbyOffer();
    onboardingStore.getState().setNoobLobbyOffer(true);
    send(new EventLogComposer({ event: 'NewNavigator', data: 'nux.offer.lobby', action: 'nux.offer.lobby', extraString: '', extraInt: 0 }));
};

/** `onRoomSessionEvent`: RSE_STARTED with the room's id, RSE_ENDED with none. */
export const onRoomSessionForNoobLobbyOffer = (send: Send, roomId: number | undefined) => {
    if (!isNoobLobbyUser()) return;

    const homeRoomId = systemStore.getState().homeRoomId;

    if ((roomId === undefined) || (roomId !== homeRoomId)) {
        hideNoobLobbyOffer();

        return;
    }

    const seconds = parseInt(configString('nux.noob.lobby.popup.delay'), 10);

    if (offerTimer !== undefined) clearTimeout(offerTimer);

    offerTimer = setTimeout(() => {
        offerTimer = undefined;
        showNoobLobbyOffer(send);
    }, (Number.isNaN(seconds) ? DEFAULT_POPUP_DELAY_SECONDS : seconds) * 1000);
};

/** `onGo`: the link `navigator/goto/predefined_noob_lobby`. */
export const goToNoobLobby = (send: Send) => send(new ForwardToSomeRoomComposer({ forwardData: NOOB_LOBBY }));

/** Whether the room the user was last let into is a new user lobby (`isNoobRoom`). */
const isInNoobLobby = () => Number(navigatorStore.getState().enteredRoom?.info.doorMode) === Number(RoomDoorModeEnum.NoobLobby);

/**
 * RSE_ENDED with the landing page, for a new user: home out of a lobby, the lobby out of anywhere
 * else. False when the user is not one, and the hotel view comes up as usual.
 */
export const leaveRoomAsNewUser = (send: Send): boolean => {
    if (!isNoobLobbyUser()) return false;

    if (isInNoobLobby()) goToHomeRoom(send);
    else goToNoobLobby(send);

    return true;
};
