import { WebSocketConnection } from '#base/context/communication';

import { registerInventoryFurniHandlers } from './inventory';
import { registerNavigatorHandlers, registerRoomQueueHandlers } from './navigator';
import { registerNotificationHandlers } from './notifications';
import {
    registerRoomAreaHideHandlers, registerRoomBotHandlers, registerRoomChatHandlers, registerRoomConfigurationItemsHandlers, registerRoomCraftingHandlers, registerRoomDataHandlers, registerRoomDimmerHandlers,
    registerRoomDirectoryHandlers, registerRoomDoorbellHandlers, registerRoomFloorPlanHandlers, registerRoomFriendFurniHandlers, registerRoomFriendRequestHandlers,
    registerRoomFurnitureHandlers, registerRoomGuildFurniHandlers, registerRoomInfostandHandlers, registerRoomJukeboxHandlers, registerRoomLinkHandlers, registerRoomMappingHandlers,
    registerRoomMysteryBoxHandlers, registerRoomPermissionsHandlers, registerRoomPetHandlers, registerRoomPetPackageHandlers, registerRoomPollHandlers,
    registerRoomPresentHandlers, registerRoomQuizHandlers, registerRoomRentableSpaceHandlers, registerRoomSettingsHandlers,
    registerRoomUserHandlers, registerRoomVariableFxHandlers, registerRoomYoutubeHandlers,
} from './room';
import { registerAvatarEditorHandlers, registerAvatarEffectsHandlers, registerMessengerHandlers, registerUserInfoHandlers, registerUserSocialHandlers, registerWalletHandlers } from './user';
import { bridgeWiredRoomLifecycle, registerWiredEnvironmentHandlers, registerWiredMenuHandlers, registerWiredPermissionsHandlers, registerWiredSetupHandlers, registerWiredVariablesHandlers, registerWiredWebApiKeyHandlers } from './wired';
import { bridgeWiredTradingLifecycle, registerSelfDonationHandlers, registerWiredChestHandlers, registerWiredContractHandlers, registerWiredTradeHandlers, registerWiredTransactionHandlers, registerWiredTransactionNotificationHandlers } from './wired-trading';

/**
 * Every packet handler that lives as long as the connection, registered once. The stores they
 * write to are app-wide singletons, so none of them depends on where in the tree it is mounted.
 *
 * Room first, then the navigator, then the account: when one packet has several listeners they
 * run in this order, which is the order the old hook tree subscribed them in.
 *
 * Returns one unsubscribe for all of them.
 */
export const registerHandlers = (socket: WebSocketConnection) => {
    const unsubscribes = [
        registerRoomAreaHideHandlers(socket),
        registerRoomChatHandlers(socket),
        registerRoomConfigurationItemsHandlers(socket),
        registerRoomDataHandlers(socket),
        registerRoomDirectoryHandlers(socket),
        registerRoomDoorbellHandlers(socket),
        registerRoomFurnitureHandlers(socket),
        registerRoomMappingHandlers(socket),
        registerRoomFloorPlanHandlers(socket),
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
        registerNavigatorHandlers(socket),
        registerRoomQueueHandlers(socket),
        // The server's own bubbles and alerts, after the room and navigator listeners that may raise one.
        registerNotificationHandlers(socket),
        registerUserInfoHandlers(socket),
        registerUserSocialHandlers(socket),
        registerAvatarEffectsHandlers(socket),
        registerAvatarEditorHandlers(socket),
        registerMessengerHandlers(socket),
        registerWalletHandlers(socket),
        // Wired: the setup dialog, the room's wired environment, the variables cache and the permissions.
        registerWiredSetupHandlers(socket),
        registerWiredEnvironmentHandlers(socket),
        registerWiredVariablesHandlers(socket),
        registerWiredPermissionsHandlers(socket),
        // The variables web api addon's generated keys.
        registerWiredWebApiKeyHandlers(socket),
        // The wired menu, after the permissions it reacts to.
        registerWiredMenuHandlers(socket),
        bridgeWiredRoomLifecycle(),
        // Wired trading: chests (after the furni handlers, whose data they read), contracts, trades, transactions, rewards, self donation.
        registerWiredChestHandlers(socket),
        registerWiredContractHandlers(socket),
        registerWiredTradeHandlers(socket),
        registerWiredTransactionHandlers(socket),
        registerWiredTransactionNotificationHandlers(socket),
        registerSelfDonationHandlers(socket),
        bridgeWiredTradingLifecycle(socket),
        registerInventoryFurniHandlers(socket),
    ];

    return () => {
        for (const unsubscribe of unsubscribes) unsubscribe();
    };
};
