import { WebSocketConnection } from '#base/context/communication';

import { registerNavigatorHandlers, registerRoomQueueHandlers } from './navigator';
import { registerMessengerHandlers } from './registerMessengerHandlers';
import { registerWalletHandlers } from './registerWalletHandlers';
import {
    registerRoomAreaHideHandlers, registerRoomBotHandlers, registerRoomChatHandlers, registerRoomCraftingHandlers, registerRoomDataHandlers, registerRoomDimmerHandlers,
    registerRoomDirectoryHandlers, registerRoomDoorbellHandlers, registerRoomFriendFurniHandlers, registerRoomFriendRequestHandlers,
    registerRoomFurnitureHandlers, registerRoomGuildFurniHandlers, registerRoomInfostandHandlers, registerRoomJukeboxHandlers, registerRoomLinkHandlers, registerRoomMappingHandlers,
    registerRoomMysteryBoxHandlers, registerRoomPermissionsHandlers, registerRoomPetHandlers, registerRoomPetPackageHandlers, registerRoomPollHandlers,
    registerRoomPresentHandlers, registerRoomQuizHandlers, registerRoomRentableSpaceHandlers, registerRoomSettingsHandlers, registerRoomTileHeights,
    registerRoomUserHandlers, registerRoomVariableFxHandlers, registerRoomYoutubeHandlers,
} from './room';
import { registerAvatarEffectsHandlers, registerUserInfoHandlers, registerUserSocialHandlers } from './user';

/**
 * Every packet handler that lives as long as the connection, registered once. The stores they
 * write to are app-wide singletons, so none of them depends on where in the tree it is mounted.
 *
 * Room first, then the navigator, then the account: when one packet has several listeners they
 * run in this order, which is the order the old hook tree subscribed them in.
 *
 * Handlers whose store only exists while a window is open (the avatar editor) register from
 * that window instead.
 *
 * Returns one unsubscribe for all of them.
 */
export const registerHandlers = (socket: WebSocketConnection) => {
    const unsubscribes = [
        registerRoomAreaHideHandlers(socket),
        registerRoomChatHandlers(socket),
        registerRoomDataHandlers(socket),
        registerRoomDirectoryHandlers(socket),
        registerRoomDoorbellHandlers(socket),
        registerRoomFurnitureHandlers(socket),
        registerRoomMappingHandlers(socket),
        registerRoomPermissionsHandlers(socket),
        registerRoomPetHandlers(socket),
        registerRoomPetPackageHandlers(socket),
        registerRoomPollHandlers(socket),
        registerRoomQuizHandlers(socket),
        registerRoomSettingsHandlers(socket),
        registerRoomFriendFurniHandlers(socket),
        registerRoomFriendRequestHandlers(socket),
        registerRoomInfostandHandlers(socket),
        registerRoomBotHandlers(socket),
        registerRoomUserHandlers(socket),
        registerRoomVariableFxHandlers(socket),
        // Furniture dialogs: a payload for a dialog that is not open is dropped by the store.
        registerRoomCraftingHandlers(socket),
        registerRoomDimmerHandlers(socket),
        registerRoomGuildFurniHandlers(socket),
        registerRoomJukeboxHandlers(socket),
        registerRoomLinkHandlers(socket),
        registerRoomMysteryBoxHandlers(socket),
        registerRoomPresentHandlers(socket),
        registerRoomRentableSpaceHandlers(socket),
        registerRoomYoutubeHandlers(socket),
        registerRoomTileHeights(),
        registerNavigatorHandlers(socket),
        registerRoomQueueHandlers(socket),
        registerUserInfoHandlers(socket),
        registerUserSocialHandlers(socket),
        registerAvatarEffectsHandlers(socket),
        registerMessengerHandlers(socket),
        registerWalletHandlers(socket),
    ];

    return () => {
        for (const unsubscribe of unsubscribes) unsubscribe();
    };
};
