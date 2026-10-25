import { CatalogTypeEnum } from '@nitrodevco/nitro-api';
import { GetFurnitureAliasesComposer, InfoRetrieveComposer } from '@nitrodevco/nitro-packets';
import { GetTicker } from '@nitrodevco/nitro-renderer';
import { useEffect } from 'react';

import { trackEventLog } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue } from '#base/context/system';
import { useWindowVisibility } from '#base/hooks';

import { AvatarEditorComponent, CatalogWrapper, FriendListWrapper, InventoryComponent, MysteryBoxToolbarExtensionComponent, NavigatorComponent, NavigatorRoomEventInfoComponent, RoomWrapper, ToolbarChatSettingsComponent, ToolbarOtherSettingsComponent, ToolbarSoundSettingsComponent, ToolbarWordFilterComponent, WalletComponent, WiredChestComponent, WiredContractComponent, WiredLinkComponent, WiredMenuComponent, WiredRewardNotificationsComponent, WiredSelfDonationComponent, WiredSetupComponent, WiredTransactionsComponent } from './components';
import { AchievementsComponent } from './components/achievements';
import { TargetedOfferComponent } from './components/catalog/TargetedOfferComponent';
import { CollectiblesComponent } from './components/collectibles';
import { CursedDragonAdoptionComponent } from './components/cursed-dragon-adoption';
import { EarningsComponent } from './components/earnings';
import { GroupCreatedComponent, GroupHcRequiredComponent, GroupInfoComponent, GroupManagementComponent, GroupMembersComponent, GroupRoomInfoComponent } from './components/groups';
import { HabbiconsComponent } from './components/habbicons';
import { HelpComponent } from './components/help';
import { HotelViewComponent } from './components/hotel-view';
import { ModerationComponent } from './components/moderation';
import { EpicPopupComponent, MotdNotificationComponent } from './components/notifications';
import { OfferCenterComponent } from './components/offer-center';
import { OnboardingComponent } from './components/onboarding';
import { QuestsComponent, QuestTrackerComponent } from './components/quests';
import { RoomEffectsWidget } from './components/room/widgets/effects/RoomEffectsWidget';
import { RoomSettingsWidget } from './components/room/widgets/room-settings';
import { SpecialItemsComponent } from './components/special-items';
import { UserProfileComponent } from './components/user-profile';
import { registerHandlers } from './handlers';
import { useRegisterHandlers } from './hooks';
import { Box, ModalLayer, TooltipLayer, WindowLayer } from './theme';
import { BadgeLeaderboardView } from './views/badge-leaderboard/BadgeLeaderboardView';
import { MallOfferMinimizedView } from './views/catalog/targeted-offers/MallOfferMinimizedView';
import { TargetedOfferMinimizedView } from './views/catalog/targeted-offers/TargetedOfferMinimizedView';
import { ClientModuleAvatarOverlaysView } from './views/client-modules/ClientModuleAvatarOverlaysView';
import { ClientModuleWindowsView } from './views/client-modules/ClientModuleWindowsView';
import { DailyTasksView } from './views/daily-tasks/DailyTasksView';
import { GamesMainView } from './views/game-center/GamesMainView';
import { GroupForumDialogs } from './views/group-forums/GroupForumDialogs';
import { GroupForumView } from './views/group-forums/GroupForumView';
import { HabboPagesView } from './views/habbo-pages/HabboPagesView';
import { NameChangeView } from './views/help/NameChangeView';
import { HintArrowView } from './views/hints/HintArrowView';
import { MessengerView } from './views/messenger/MessengerView';
import { ClubGiftNotificationView } from './views/notifications/ClubGiftNotificationView';
import { NewFeatureNotificationsView } from './views/notifications/NewFeatureNotificationView';
import { NotificationPopupsView } from './views/notifications/NotificationPopupsView';
import { NotificationsExtensionAnchor } from './views/notifications/NotificationsExtensionAnchor';
import { NotificationsView } from './views/notifications/NotificationsView';
import { SafetyLockedNotificationView } from './views/notifications/SafetyLockedNotificationView';
import { NoobLobbyOfferView } from './views/onboarding/NoobLobbyOfferView';
import { NuxGiftSelectionView } from './views/onboarding/NuxGiftSelectionView';
import { ActivityPointsView } from './views/purse/ActivityPointsView';
import { PurseTemplateView } from './views/purse/PurseTemplateView';
import { RewardTrackPremiumConfirmationView } from './views/reward-track/RewardTrackPremiumConfirmationView';
import { RewardTrackView } from './views/reward-track/RewardTrackView';
import { CameraPhotoLabView } from './views/room-widgets/camera/CameraPhotoLabView';
import { CameraView } from './views/room-widgets/camera/CameraView';
import { PhotoPurchaseConfirmationView } from './views/room-widgets/camera/PhotoPurchaseConfirmationView';
import { RoomChatInputView } from './views/room-widgets/chat-input/RoomChatInputView';
import { PetTrainingView } from './views/room-widgets/pet-training/PetTrainingView';
import { SystemDialogsView } from './views/system/SystemDialogsView';
import { TemplatePreviewView } from './views/system/TemplatePreviewView';
import { ViewErrorBoundaries } from './views/system/ViewErrorBoundary';
import { ClubDiscountPromoView } from './views/toolbar/ClubDiscountPromoView';
import { ToolbarTransitionsView } from './views/toolbar/ToolbarTransitionsView';
import { ToolbarView } from './views/toolbar/ToolbarView';
import { VipQuestsPromoView } from './views/toolbar/VipQuestsPromoView';

/**
 * The client once `NitroView` shows it: the room and hotel view under the window layer, which holds
 * every window, the toolbar, the purse and the notifications, with the modal and tooltip layers on
 * top. It registers the connection's packet handlers, applies `fps.limit` to the ticker, and only
 * once the whole tree is mounted asks for the user info and furni aliases and lets the packets queued
 * meanwhile through.
 */
export const MainView = () => {
    const { setReady, send } = useWebSocketContext();
    const maxFPS = useConfigValue<number>('fps.limit') ?? 60;
    const { isWindowVisible: isMessengerVisible } = useWindowVisibility('messenger');

    // Every connection-lifetime packet handler, attached before the effect below lets the queued packets through.
    useRegisterHandlers(registerHandlers);

    useEffect(() => {
        GetTicker().maxFPS = maxFPS;
    }, [ maxFPS ]);

    /*
     * Effects run children first, so by the time this one runs every listener in the tree below -
     * and the handlers registered above - is attached. Only then are the packets that arrived
     * while the UI was mounting let through.
     */
    useEffect(() => {
        send(new InfoRetrieveComposer({}));
        // `onAuthenticationOK` logs the login, then asks for the furni aliases right after the user object.
        trackEventLog(send, 'Login', 'socket', 'client.auth_ok');
        send(new GetFurnitureAliasesComposer({}));
        setReady();
    }, []);

    return (
        <>
            <ViewErrorBoundaries>
                <RoomWrapper />
                <HotelViewComponent />
                {/* `HintManager`'s arrow at an element of the room's desktop (context 0): over the room, under every window. */}
                <HintArrowView context={0} />
            </ViewErrorBoundaries>
            {/* Window context 1's desktop: every window is drawn and ordered in here. */}
            <WindowLayer>
                <ViewErrorBoundaries>
                    {/* What client modules draw over the avatars: over the room, under every window. */}
                    <ClientModuleAvatarOverlaysView />
                    {/*
                      * `extension_grid`: a 192 wide itemlist at `desktop.width - 192 - 3`. The list only stacks its windows,
                      * each keeps its own x - 0 for every docked window (the 195 wide ones overhang on the right), -38 for the
                      * purse. The box takes the purse's 38 in as padding, so the purse stays inside the box it is hit-tested in.
                      */}
                    <Box layout={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        marginRight: 3,
                        width: 230,
                        paddingLeft: 38,
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}
                    >
                        <PurseTemplateView />
                        <Box layout={{
                            flex: 1,
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            width: 192,
                        }}
                        >
                            <ActivityPointsView />
                            {/* `club_promo` (priority 10) docks above the targeted offer (13); `vip_quests` (10) detaches it and docks there. */}
                            <ClubDiscountPromoView />
                            <VipQuestsPromoView />
                            {/* `targeted_offer` (13): the targeted offer's or the Habbo Mall offer's, whichever is up. */}
                            <TargetedOfferMinimizedView />
                            <MallOfferMinimizedView />
                            {/* `SingularNotificationController`'s extensions, docked at the end of the column. */}
                            <SafetyLockedNotificationView />
                            <ClubGiftNotificationView />
                            <NewFeatureNotificationsView />
                        </Box>
                        {/* `MysteryBoxToolbarExtension` docks `mystery_box` at the column's end as the first room opens, before the banner and event card. */}
                        <MysteryBoxToolbarExtensionComponent />
                        {/* `GroupRoomInfoCtrl` docks the banner in this column, before the quest tracker and the event card. */}
                        <GroupRoomInfoComponent />
                        {/* `RoomEventInfoCtrl` docks the room's event card here, under the group banner and over the quest trackers. */}
                        <NavigatorRoomEventInfoComponent />
                        {/* `QuestController`'s trackers dock here, after the group banner and the event card. */}
                        <QuestTrackerComponent />
                        <NotificationsExtensionAnchor />
                    </Box>
                    <AvatarEditorComponent />
                    <TemplatePreviewView />
                    <CatalogWrapper catalogType={CatalogTypeEnum.Normal} />
                    <CatalogWrapper catalogType={CatalogTypeEnum.BuildersClub} />
                    <InventoryComponent />
                    <FriendListWrapper />
                    <NavigatorComponent />
                    {isMessengerVisible && <MessengerView />}
                    {/* `RoomSettingsCtrl` is the navigator's, not the room's: it also edits a room you are not in. */}
                    <RoomSettingsWidget />
                    <WalletComponent />
                    <WiredSetupComponent />
                    <WiredMenuComponent />
                    <WiredLinkComponent />
                    <WiredChestComponent />
                    <WiredContractComponent />
                    <WiredTransactionsComponent />
                    <WiredSelfDonationComponent />
                    <WiredRewardNotificationsComponent />
                    <EarningsComponent />
                    <AchievementsComponent />
                    <QuestsComponent />
                    <SpecialItemsComponent />
                    <CursedDragonAdoptionComponent />
                    <HelpComponent />
                    <ModerationComponent />
                    <GroupInfoComponent />
                    <GroupMembersComponent />
                    <GroupManagementComponent />
                    <GroupCreatedComponent />
                    <GroupHcRequiredComponent />
                    {/* `GroupForumController`'s window: drawn only while open. */}
                    <GroupForumView />
                    <GroupForumDialogs />
                    {/* `CameraWidget`'s viewfinder: drawn only while shown, its photos kept. */}
                    <CameraView />
                    <CameraPhotoLabView />
                    <PhotoPurchaseConfirmationView />
                    {/* `DailyTasksController`'s two windows: drawn only while shown. */}
                    <DailyTasksView />
                    {/* `BadgeLeaderboardController`: drawn only while shown. */}
                    <BadgeLeaderboardView />
                    {/* `GamesMainViewController`'s games window: drawn only while open. */}
                    <GamesMainView />
                    {/* `RewardTrackController`'s track window and its premium confirmation: drawn only while shown. */}
                    <RewardTrackView />
                    <RewardTrackPremiumConfirmationView />
                    {/* `HabboNuxDialogs`' new user lobby offer: drawn only while shown. */}
                    <NoobLobbyOfferView />
                    {/* `HabboNuxDialogs`' new user gift selection: drawn only while offered. */}
                    <NuxGiftSelectionView />
                    {/* `HabboPagesViewer`: drawn only while shown. */}
                    <HabboPagesView />
                    {/* `PetCommandTool`: drawn only while shown. */}
                    <PetTrainingView />
                    {/* `NameChangeView`: drawn only while shown. */}
                    <NameChangeView />
                    {/* The client modules' windows: drawn only while open. */}
                    <ClientModuleWindowsView />
                    <UserProfileComponent />
                    <CollectiblesComponent />
                    <HabbiconsComponent />
                    <OfferCenterComponent />
                    <TargetedOfferComponent />
                    <ToolbarView />
                    <ToolbarOtherSettingsComponent />
                    <ToolbarSoundSettingsComponent />
                    <ToolbarChatSettingsComponent />
                    <ToolbarWordFilterComponent />
                    {/* Drawn after the toolbar because it sits inside it when it fits; it renders nothing outside a room. */}
                    <RoomChatInputView />
                    {/* `EffectsWidget` is a window on this desktop, activated when it opens: over the toolbar and the chat input, which it sits beside. */}
                    <RoomEffectsWidget />
                    <NotificationsView />
                    <MotdNotificationComponent />
                    <EpicPopupComponent />
                    <NotificationPopupsView />
                    <SystemDialogsView />
                    {/* Context 3: every `ModalDialog` is moved in here, over the windows and their popups. */}
                    <ModalLayer />
                    {/* Desktop 2: the pictures `animateToIcon` flies into the toolbar, over every window. */}
                    <ToolbarTransitionsView />
                    {/* `HintManager`'s arrow at an element of this desktop (context 1), over every window. */}
                    <HintArrowView context={1} />
                    <TooltipLayer />
                </ViewErrorBoundaries>
            </WindowLayer>
            {/* `HabboLandingView`'s new user flow: over the whole client while it runs. */}
            <ViewErrorBoundaries>
                <OnboardingComponent />
            </ViewErrorBoundaries>
        </>
    );
};
