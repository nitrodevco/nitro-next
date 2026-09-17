import { GetHabboGroupBadgesComposer, HabboUserBadgesMessage, RelationshipStatusInfoEventMessage, RoomReadyMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * What the infostand shows about a person that the room itself does not carry: the badges they
 * wear and their relationship counts, both asked for when they are selected. The group badges of
 * the room's occupants are asked for as the room opens - `HabboGroupInfoManager.onRoomReady`.
 */
export const registerRoomInfostandHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const { setBadges, setRelationships } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(RoomReadyMessage, () => send(new GetHabboGroupBadgesComposer({}))),

        on(HabboUserBadgesMessage, data => setBadges(data.userId, data.selectedBadges)),

        on(RelationshipStatusInfoEventMessage, data => setRelationships(data.userId, data.relationships)),
    ]);
};
