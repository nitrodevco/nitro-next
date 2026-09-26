import { CatalogTypeEnum } from '@nitrodevco/nitro-api';
import { InfoRetrieveComposer } from '@nitrodevco/nitro-packets';
import { GetTicker } from '@nitrodevco/nitro-renderer';
import { useEffect } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useIsLandingViewVisible } from '#base/context/system';

import { AvatarEditorComponent, CatalogWrapper, FriendListWrapper, InventoryComponent, MessengerComponent, NavigatorComponent, RoomWrapper, ToolbarChatSettingsComponent, ToolbarOtherSettingsComponent, ToolbarSoundSettingsComponent, ToolbarWordFilterComponent, WalletComponent, WiredChestComponent, WiredContractComponent, WiredMenuComponent, WiredRewardNotificationsComponent, WiredSelfDonationComponent, WiredSetupComponent, WiredTradeComponent, WiredTransactionsComponent } from './components';
import { TargetedOfferComponent } from './components/catalog/TargetedOfferComponent';
import { CollectiblesComponent } from './components/collectibles';
import { EarningsComponent } from './components/earnings';
import { GroupCreatedComponent, GroupHcRequiredComponent, GroupInfoComponent, GroupManagementComponent, GroupMembersComponent, GroupRoomInfoComponent } from './components/groups';
import { HabbiconsComponent } from './components/habbicons';
import { OfferCenterComponent } from './components/offer-center';
import { SpecialItemsComponent } from './components/special-items';
import { UserProfileComponent } from './components/user-profile';
import { registerHandlers } from './handlers';
import { useRegisterHandlers } from './hooks';
import { Box, ModalLayer, TooltipLayer, WindowLayer } from './theme';
import { TargetedOfferMinimizedView } from './views/catalog/targeted-offers/TargetedOfferMinimizedView';
import { HotelView } from './views/hotel-view/HotelView';
import { NotificationsExtensionAnchor } from './views/notifications/NotificationsExtensionAnchor';
import { NotificationsView } from './views/notifications/NotificationsView';
import { ActivityPointsView } from './views/purse/ActivityPointsView';
import { PurseView } from './views/purse/PurseView';
import { RoomChatInputView } from './views/room-widgets/chat-input/RoomChatInputView';
import { SystemDialogsView } from './views/system/SystemDialogsView';
import { ToolbarView } from './views/toolbar/ToolbarView';

export const MainView = () => {
    const { setReady, send } = useWebSocketContext();
    const landingViewVisible = useIsLandingViewVisible();
    const maxFPS = useConfigValue<number>('fps.limit') ?? 60;

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
        setReady();
    }, []);

    return (
        <>
            <RoomWrapper />
            {landingViewVisible && <HotelView />}
            {/* Window context 1's desktop: every window is drawn and ordered in here. */}
            <WindowLayer>
                <Box layout={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    // The purse's right edge at `desktop.width - 3` (the extension grid's own inset).
                    marginRight: 3,
                    width: 230,
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                }}
                >
                    <PurseView />
                    <Box layout={{
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        width: 192,
                    }}
                    >
                        <ActivityPointsView />
                        <TargetedOfferMinimizedView />
                    </Box>
                    {/* `GroupRoomInfoCtrl` docks the banner in this column, under the quest tracker and event card. */}
                    <GroupRoomInfoComponent />
                    <NotificationsExtensionAnchor />
                </Box>
                <AvatarEditorComponent />
                <CatalogWrapper catalogType={CatalogTypeEnum.Normal} />
                <CatalogWrapper catalogType={CatalogTypeEnum.BuildersClub} />
                <InventoryComponent />
                <FriendListWrapper />
                <MessengerComponent />
                <NavigatorComponent />
                <WalletComponent />
                <WiredSetupComponent />
                <WiredMenuComponent />
                <WiredChestComponent />
                <WiredContractComponent />
                <WiredTransactionsComponent />
                <WiredTradeComponent />
                <WiredSelfDonationComponent />
                <WiredRewardNotificationsComponent />
                <EarningsComponent />
                <SpecialItemsComponent />
                <GroupInfoComponent />
                <GroupMembersComponent />
                <GroupManagementComponent />
                <GroupCreatedComponent />
                <GroupHcRequiredComponent />
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
                <NotificationsView />
                <SystemDialogsView />
                {/* Context 3: every `ModalDialog` is moved in here, over the windows and their popups. */}
                <ModalLayer />
                <TooltipLayer />
            </WindowLayer>
        </>
    );
};
