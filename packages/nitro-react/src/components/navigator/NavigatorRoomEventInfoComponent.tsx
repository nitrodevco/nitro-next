import { RoomControllerLevelEnum } from '@nitrodevco/nitro-api';

import { openCatalogRoomAdsExtendPage, openClientLink, ROOM_AD_CATALOG_PAGE } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorActions, useNavigatorStore } from '#base/context/navigator';
import { useOwnControllerLevel, useRoomStore } from '#base/context/room';
import { useConfigValue } from '#base/context/system';
import { ClientGates, useClientGate } from '#base/context/user';
import { Box } from '#base/theme';
import { NavigatorRoomEventInfoView } from '#base/views/navigator/NavigatorRoomEventInfoView';

/**
 * Whether the room event card is docked, and what its links do - `RoomEventInfoCtrl.refresh`'s
 * gating. It needs `eventinfo.enabled`, and is kept off under the new identity's hidden UI
 * (`new.identity` not 0 with `new.identity.hide.ui`); it needs a room session; and it shows only
 * while an event runs or for whoever may make one - the room's owner (`currentRoomOwner`), an event
 * moderator (`eventMod`) or a room controller (`roomControllerLevel == 1`).
 *
 * Pressing the card folds or unfolds a running event, or, with none, opens the room ads page
 * (`openCatalogRoomAdsPage`). The edit link toggles the event's settings window
 * (`roomEventViewCtrl.show`); the extend link opens the room ads page to extend the event
 * (`openCatalogRoomAdsExtendPage`, with the entered room's name).
 *
 * Flash docks it after the quest timer and tracker (`attachExtension("room_event_info", ..., -1,
 * ["next_quest_timer", "quest_tracker"])`), which the client does not have; the group banner goes
 * before it, so it is under the banner, 2 below what is over it (`extension_grid`'s spacing).
 */
export const NavigatorRoomEventInfoComponent = () => {
    const roomEventData = useNavigatorStore(x => x.roomEventData);
    const canExtend = useNavigatorStore(x => x.roomEventExtendable);
    const expanded = useNavigatorStore(x => x.roomEventInfoExpanded);
    const isOwner = useNavigatorStore(x => x.currentRoomOwner);
    const enteredRoom = useNavigatorStore(x => x.enteredRoom);
    const settingsVisible = useNavigatorStore(x => x.roomEventSettingsVisible);
    const { setRoomEventInfoExpanded, setRoomEventSettingsVisible } = useNavigatorActions();
    const inRoom = useRoomStore(x => !!x.room);
    const controllerLevel = useOwnControllerLevel();
    const eventMod = useClientGate(ClientGates.RoomEventModerator);
    const eventInfoEnabled = useConfigValue<boolean>('eventinfo.enabled') === true;
    const newIdentity = Number(useConfigValue<number>('new.identity') ?? 0);
    const newIdentityHidesUi = useConfigValue<boolean>('new.identity.hide.ui') === true;
    const { send } = useWebSocketContext();

    const enabled = eventInfoEnabled && ((newIdentity === 0) || !newIdentityHidesUi);
    const hasEvent = !!roomEventData;
    const canModify = isOwner || eventMod || (Number(controllerLevel) === Number(RoomControllerLevelEnum.Guest));

    if (!enabled || !inRoom || (!hasEvent && !isOwner && !canModify)) return null;

    return (
        <Box layout={{ position: 'relative', marginTop: 2, flexShrink: 0 }}>
            <NavigatorRoomEventInfoView
                eventName={roomEventData?.eventName}
                eventDescription={roomEventData?.eventDescription ?? ''}
                expanded={expanded}
                isOwner={isOwner}
                canModify={canModify}
                canExtend={canExtend}
                onBackgroundClick={() => {
                    if (hasEvent) setRoomEventInfoExpanded(!expanded);
                    else openClientLink(send, `catalog/open/${ROOM_AD_CATALOG_PAGE}`);
                }}
                onModify={() => setRoomEventSettingsVisible(!settingsVisible)}
                onExtend={() => {
                    if (!roomEventData) return;

                    openCatalogRoomAdsExtendPage({
                        name: roomEventData.eventName,
                        description: roomEventData.eventDescription,
                        roomName: enteredRoom?.info.name ?? '',
                        expirationTime: roomEventData.expirationDate,
                        categoryId: roomEventData.categoryId,
                        flatId: enteredRoom?.info.roomId ?? roomEventData.flatId,
                    });
                }}
            />
        </Box>
    );
};
