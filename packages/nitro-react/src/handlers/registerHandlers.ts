import { WebSocketConnection } from '#base/context/communication';

import { registerAchievementHandlers } from './achievements';
import { bridgeRecyclerRoomSession, registerCatalogPlacementHandlers, registerCatalogRecyclerHandlers, registerCatalogRentHandlers, registerCatalogVoucherHandlers, registerTargetedOfferHandlers } from './catalog';
import { bridgeCollectiblesInventoryAndPurse, registerCollectiblesHandlers } from './collectibles';
import { registerDailyTasksHandlers } from './daily-tasks';
import { registerEarningsHandlers } from './earnings';
import { registerGameTokensHandlers } from './game-tokens';
import { registerBadgeLeaderboardHandlers, registerGroupForumHandlers, registerGroupHandlers } from './groups';
import { registerHabbiconHandlers } from './habbicons';
import { registerHelpHandlers } from './help';
import { registerInventoryBadgesHandlers, registerInventoryBotsHandlers, registerInventoryFurniHandlers, registerInventoryMarketplaceHandlers, registerInventoryPetsHandlers, registerInventoryTradingHandlers, registerInventoryUnseenHandlers } from './inventory';
import { registerNavigatorHandlers, registerRaidProtectionHandlers, registerRoomQueueHandlers } from './navigator';
import { registerAlertDialogHandlers, registerNotificationHandlers, registerSingularNotificationHandlers } from './notifications';
import { bridgeOfferCenter, registerOfferCenterHandlers } from './offer-center';
import { registerQuestHandlers } from './quests';
import { registerRewardTrackHandlers } from './reward-track';
import {
    registerRoomAreaHideHandlers, registerRoomBotHandlers, registerRoomBuildersClubHandlers, registerRoomChatHandlers, registerRoomConfigurationItemsHandlers, registerRoomCraftingHandlers, registerRoomDataHandlers, registerRoomDimmerHandlers,
    registerRoomDirectoryHandlers, registerRoomDoorbellHandlers, registerRoomFloorPlanHandlers, registerRoomFriendFurniHandlers, registerRoomFriendRequestHandlers,
    registerRoomFurnitureHandlers, registerRoomGenericErrorHandlers, registerRoomGuildFurniHandlers, registerRoomInfostandHandlers, registerRoomJukeboxHandlers, registerRoomLinkHandlers, registerRoomMappingHandlers,
    registerRoomMysteryBoxHandlers, registerRoomPermissionsHandlers, registerRoomPetHandlers, registerRoomPetPackageHandlers, registerRoomPollHandlers, registerRoomPresentHandlers, registerRoomPurchasableClothingHandlers, registerRoomQuizHandlers, registerRoomRentableSpaceHandlers, registerRoomSettingsHandlers,
    registerRoomSpamWallHandlers,
    registerRoomThumbnailCameraHandlers,
    registerRoomUserHandlers, registerRoomVariableFxHandlers, registerRoomYoutubeHandlers,
} from './room';
import { bridgeSoundManager, registerSoundManagerHandlers } from './sound';
import { registerSpecialItemsHandlers } from './special-items';
import { registerFurnitureDataHandlers, registerHotelViewHandlers } from './system';
import { registerAvatarEditorHandlers, registerAvatarEffectsHandlers, registerChatCommandHandlers, registerFriendBarHandlers, registerMessengerHandlers, registerUserInfoHandlers, registerUserSocialHandlers, registerWalletHandlers, registerWordFilterHandlers } from './user';
import { registerProfileHandlers } from './user-profile';
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
        registerHotelViewHandlers(socket),
        registerRoomAreaHideHandlers(socket),
        registerRoomBuildersClubHandlers(socket),
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
        registerRoomSpamWallHandlers(socket),
        registerRoomThumbnailCameraHandlers(socket),
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
        registerRoomGenericErrorHandlers(socket),
        registerRoomGuildFurniHandlers(socket),
        registerRoomJukeboxHandlers(socket),
        // The sound manager: trax music, the room's jukebox or sound machine, the sound blocks and the volumes.
        registerSoundManagerHandlers(socket),
        bridgeSoundManager(),
        registerRoomLinkHandlers(socket),
        registerRoomMysteryBoxHandlers(socket),
        registerRoomPresentHandlers(socket),
        registerRoomPurchasableClothingHandlers(socket),
        registerRoomRentableSpaceHandlers(socket),
        registerRoomYoutubeHandlers(socket),
        registerNavigatorHandlers(socket),
        // `RaidProtectionSettingsController`, after the navigator handlers whose current room it checks.
        registerRaidProtectionHandlers(socket),
        registerRoomQueueHandlers(socket),
        // The server's own bubbles and alerts, after the room and navigator listeners that may raise one.
        registerNotificationHandlers(socket),
        // `HabboAlertDialogManager`'s moderation and opening-hours alerts, and the MOTD, club gift and safety lock windows.
        registerAlertDialogHandlers(socket),
        registerSingularNotificationHandlers(socket),
        registerUserInfoHandlers(socket),
        registerChatCommandHandlers(socket),
        registerUserSocialHandlers(socket),
        registerProfileHandlers(socket),
        // Groups: the details cache the infostand also reads, and every group window's own answers.
        registerGroupHandlers(socket),
        // The group forums' unread count, polled for the me menu.
        registerGroupForumHandlers(socket),
        // `DailyTasksController`, a component of the quest engine.
        registerDailyTasksHandlers(socket),
        // `BadgeLeaderboardController`, a component of the groups manager.
        registerBadgeLeaderboardHandlers(socket),
        registerAvatarEffectsHandlers(socket),
        registerAvatarEditorHandlers(socket),
        registerMessengerHandlers(socket),
        registerFriendBarHandlers(socket),
        registerWalletHandlers(socket),
        // The account's own word filter, whose list the settings window asks for when it opens.
        registerWordFilterHandlers(socket),
        // The catalogue's voucher answers - alerts only, whichever catalogue window is open.
        registerCatalogVoucherHandlers(socket),
        // The furnidata again when a catalogue publish says it changed, once for both catalogue windows.
        registerFurnitureDataHandlers(socket),
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
        registerAchievementHandlers(socket),
        // `RewardTrackController`, a component of the quest engine: the tracks the server sends unasked.
        registerRewardTrackHandlers(socket),
        registerQuestHandlers(socket),
        registerInventoryPetsHandlers(socket),
        registerInventoryBotsHandlers(socket),
        registerInventoryUnseenHandlers(socket),
        // The user-to-user trade, after the furni list whose locks its item lists re-read.
        registerInventoryTradingHandlers(socket),
        // The inventory's marketplace model (`MarketplaceModel`) and the catalogue's recycler (`RecyclerLogic`,
        // which the inventory reaches too), with the room session ending that empties the recycler.
        registerInventoryMarketplaceHandlers(socket),
        registerCatalogRecyclerHandlers(socket),
        bridgeRecyclerRoomSession(),
        // The habbicon controller (`HabbiconController`, a component `HabboCatalog` attaches for the session).
        registerHabbiconHandlers(socket),
        registerHelpHandlers(socket),
        // The collectibles hub (`CollectiblesController`, attached for the session), after the inventory and wallet it reads.
        registerCollectiblesHandlers(socket),
        bridgeCollectiblesInventoryAndPurse(socket),
    ];

    return () => {
        for (const unsubscribe of unsubscribes) unsubscribe();
    };
};
