/**
 * `ChatEventHandler.onRoomChat` and `HabboFreeFlowChat.insertChat`: a `RoomSessionChatEvent` - from
 * a chat packet (`registerRoomChatHandlers`) or raised by the client itself (`:ping`) - becomes a
 * `ChatBubbleData` in the room store, which `RoomChatBubbles` renders, and a line in the chat
 * history. The speaker's live location vector is copied onto the bubble, as `ChatItem` did.
 */
import { RoomChatTypeEnum, RoomObjectCategoryEnum, RoomObjectUserType, Vector3d } from '@nitrodevco/nitro-api';
import { IChatLink } from '@nitrodevco/nitro-packets';

import { createChatBubbleId, GetChatStyleLibrary } from '#base/chat';
import { ChatHistoryIgnoreTarget, chatHistoryStore } from '#base/context/chat-history';
import { getRoom, roomStore } from '#base/context/room';
import { userStore } from '#base/context/user';

/** `ChatBubbleFactory.isSystemNotificationChat`: the chat types 3-10 and 12. */
const SYSTEM_NOTIFICATION_CHAT_TYPES: ReadonlySet<RoomChatTypeEnum> = new Set([
    RoomChatTypeEnum.Respect, RoomChatTypeEnum.PetRespect, RoomChatTypeEnum.HandItem, RoomChatTypeEnum.PetTreat, RoomChatTypeEnum.PetRevive,
    RoomChatTypeEnum.PetRebreed, RoomChatTypeEnum.PetSpeed, RoomChatTypeEnum.MuteRemaining, RoomChatTypeEnum.SpecialSystem,
]);

/** `SystemChatStyleEnum.GENERIC` - the anonymous grey bubble every system notice uses. */
export const GENERIC_CHAT_STYLE = 1;

let lastAddedChatMs = 0;
let chatFakeMsIncrementor = 0;

/**
 * `onRoomChat` then `insertChat`: nothing without a room, or for a negative room index unless the
 * chat names its tile. Since WIN63-202610201032 a chat may carry a tile (`ChatMessageParser.location`,
 * the WIRED Link Speaker's bubble: no speaker, index -1): the bubble stands there
 * (`ChatEventHandler.onRoomChat`), and a chat with no speaker shows no name (`ChatItem`'s
 * `hideUsername || userId < 0`).
 */
export const insertRoomChat = (objectId: number, text: string, chatType: RoomChatTypeEnum, styleId: number, links: IChatLink[] = [], extraParam: number = 0, hideUsername: boolean = false, customLocation: { x: number; y: number } | null = null) => {
    const room = getRoom();

    if (!room || ((objectId < 0) && !customLocation)) return;

    const roomObject = (objectId < 0) ? null : room.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);
    const location = customLocation ? new Vector3d(customLocation.x, customLocation.y) : roomObject?.getLocation();
    const now = Math.floor(performance.now());

    // Messages that share a millisecond still need a strict order for the collision rules.
    if (now === lastAddedChatMs) chatFakeMsIncrementor++;
    else chatFakeMsIncrementor = 0;

    lastAddedChatMs = now;

    const bubble = {
        id: createChatBubbleId(),
        roomId: room.roomId,
        objectId,
        text,
        chatType,
        styleId,
        links,
        // `ChatItem` copies the location: the bubble keeps where its speaker stood when they spoke.
        userLocation: location ? new Vector3d(location.x, location.y, location.z) : undefined,
        timestamp: now + chatFakeMsIncrementor,
        extraParam,
        hideUsername: hideUsername || (objectId < 0),
        hasCustomLocation: !!customLocation,
    };

    // `ChatBubbleFactory.getHistoryLineEntry` draws the line from who spoke it then: a user's
    // name and figure are kept with it, as the history outlives the room's user list.
    const speaker = roomStore.getState().usersByRoomObjectId[objectId];

    // `canIgnore`: a user's line, not your own, in a style that is not a notification, of a
    // chat type that is not a system notice.
    const ignore: ChatHistoryIgnoreTarget | undefined = (speaker && (speaker.userType === RoomObjectUserType.User) && (speaker.webID > 0)
        && (speaker.webID !== userStore.getState().userId) && !GetChatStyleLibrary().getStyle(styleId)?.isNotification && !SYSTEM_NOTIFICATION_CHAT_TYPES.has(chatType))
        ? { webId: speaker.webID, userName: speaker.name }
        : undefined;

    chatHistoryStore.getState().insertChat((speaker?.userType === RoomObjectUserType.User) ? { ...bubble, forcedUserName: speaker.name, forcedFigure: speaker.figure } : bubble, ignore);
    roomStore.getState().addChatBubble(bubble);
};
