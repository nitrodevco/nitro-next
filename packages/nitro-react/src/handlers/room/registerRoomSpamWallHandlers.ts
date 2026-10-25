import { RoomObjectCategoryEnum, RoomWidgetEnum } from '@nitrodevco/nitro-api';
import { RequestSpamWallPostItMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { inventoryStore } from '#base/context/inventory';
import { roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

/** `SpamWallPostItWidgetHandler`: the note's type unless an inventory post-it says otherwise. */
const DEFAULT_POST_IT_TYPE = 'post_it';
const POST_IT_TYPE_PREFIX = 'post_it_';

/** What the spam wall's note is told: the item and wall location `AddSpamWallPostItMessageComposer` sends back. */
export type SpamWallPostItData = {
    itemId: number;
    location: string;
};

/**
 * The spam wall - `SpamWallPostItWidgetHandler.onSpamWallPostItRequest`: the server asks for a note
 * (`RequestSpamWallPostItMessageEvent`) with the id of an inventory post-it pad and the wall location
 * it was dropped on - Turbo does when a user without rights drops a pad in a room with a post-it wall -
 * and the note's editor opens on it (`RWSWPUE_OPEN_EDITOR`). Its type is `post_it`, or the type of the
 * inventory wall item with that id when that is a `post_it_` one.
 */
export const registerRoomSpamWallHandlers = ({ subscribe }: WebSocketConnection) => {
    const { openRoomWidget, updateRoomWidgetData } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(RequestSpamWallPostItMessage, (data) => {
            const item = inventoryStore.getState().furniGroups.flatMap(group => group.items).find(held => held.isWallItem && (held.id === data.itemId));
            const itemType = item ? (systemStore.getState().wallItems[item.typeId]?.className ?? '') : '';
            const objectType = itemType.startsWith(POST_IT_TYPE_PREFIX) ? itemType : DEFAULT_POST_IT_TYPE;

            openRoomWidget({
                type: RoomWidgetEnum.SPAMWALL_POSTIT_WIDGET,
                objectId: data.itemId,
                category: RoomObjectCategoryEnum.Wall,
                objectType,
            });
            updateRoomWidgetData(RoomWidgetEnum.SPAMWALL_POSTIT_WIDGET, { itemId: data.itemId, location: data.location } satisfies SpamWallPostItData);
        }),
    ]);
};
