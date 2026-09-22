import { WebSocketConnection } from '#base/context/communication';

import { bridgeRecyclerRoomSession, registerCatalogPlacementHandlers, registerCatalogRecyclerHandlers, registerCatalogRentHandlers, registerCatalogVoucherHandlers, registerTargetedOfferHandlers } from './catalog';
import { bridgeCollectiblesInventoryAndPurse, registerCollectiblesHandlers } from './collectibles';
import { registerEarningsHandlers } from './earnings';
import { registerGameTokensHandlers } from './game-tokens';
import { registerHabbiconHandlers } from './habbicons';
import { registerInventoryBadgesHandlers, registerInventoryFurniHandlers, registerInventoryMarketplaceHandlers } from './inventory';
import { registerNavigatorHandlers, registerRoomQueueHandlers } from './navigator';
import { registerNotificationHandlers } from './notifications';
import { bridgeOfferCenter, registerOfferCenterHandlers } from './offer-center';
import {
    registerRoomAreaHideHandlers, registerRoomBotHandlers, registerRoomChatHandlers, registerRoomConfigurationItemsHandlers, registerRoomCraftingHandlers, registerRoomDataHandlers, registerRoomDimmerHandlers,
    registerRoomDirectoryHandlers, registerRoomDoorbellHandlers, registerRoomFloorPlanHandlers, registerRoomFriendFurniHandlers, registerRoomFriendRequestHandlers,
    registerRoomFurnitureHandlers, registerRoomGuildFurniHandlers, registerRoomInfostandHandlers, registerRoomJukeboxHandlers, registerRoomLinkHandlers, registerRoomMappingHandlers,
    registerRoomMysteryBoxHandlers, registerRoomPermissionsHandlers, registerRoomPetHandlers, registerRoomPetPackageHandlers, registerRoomPollHandlers,
    registerRoomPresentHandlers, registerRoomQuizHandlers, registerRoomRentableSpaceHandlers, registerRoomSettingsHandlers,
    registerRoomUserHandlers, registerRoomVariableFxHandlers, registerRoomYoutubeHandlers,
} from './room';
import { registerSpecialItemsHandlers } from './special-items';
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
        // The catalogue's voucher answers - alerts only, whichever catalogue window is open.
        registerCatalogVoucherHandlers(socket),
        // The vault's income rewards (`EarningsController`), after the wallet whose duckets its claims weigh.
        registerEarningsHandlers(socket),
        // `HabboCatalog`'s session-long parts outside the catalogue window: the special items
        // display's claim, the snowwar token offers, and the offer centre (built with the club centre).
        registerSpecialItemsHandlers(socket),
        registerGameTokensHandlers(socket),
        registerOfferCenterHandlers(socket),
        bridgeOfferCenter(),
        // The targeted offers (`OfferController`): asked for once the user object is in.
        registerTargetedOfferHandlers(socket),
        // The rent and buyout confirmation the infostand and the inventory open, and a dropped
        // offer's bought item placed where it was dropped.
        registerCatalogRentHandlers(socket),
        registerCatalogPlacementHandlers(socket),
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
        registerInventoryBadgesHandlers(socket),
        // The inventory's marketplace model (`MarketplaceModel`) and the catalogue's recycler (`RecyclerLogic`,
        // which the inventory reaches too), with the room session ending that empties the recycler.
        registerInventoryMarketplaceHandlers(socket),
        registerCatalogRecyclerHandlers(socket),
        bridgeRecyclerRoomSession(),
        // The habbicon controller (`HabbiconController`, a component `HabboCatalog` attaches for the session).
        registerHabbiconHandlers(socket),
        // The collectibles hub (`CollectiblesController`, attached for the session), after the inventory and wallet it reads.
        registerCollectiblesHandlers(socket),
        bridgeCollectiblesInventoryAndPurse(socket),
    ];

    return () => {
        for (const unsubscribe of unsubscribes) unsubscribe();
    };
};
