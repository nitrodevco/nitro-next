import { RoomChatTypeEnum, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { ChatMessage, FloodControlMessage, HandItemReceivedMessage, IChatLink, PetRespectNotificationEventMessage, PetSupplementedNotificationEventMessage, RemainingMutePeriodMessage, RespectNotificationMessage, RoomChatSettingsMessage, ShoutMessage, WhisperMessage } from '@nitrodevco/nitro-packets';

import { createChatBubbleId } from '#base/chat';
import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/** `SystemChatStyleEnum.GENERIC` - the anonymous grey bubble every system notice uses. */
const GENERIC_CHAT_STYLE = 1;

/** `PetSupplementedNotification.supplementType` -> the Flash chat types 7/8/9. */
const PET_SUPPLEMENT_CHAT_TYPES: Record<number, RoomChatTypeEnum> = {
    0: RoomChatTypeEnum.PetRevive,
    1: RoomChatTypeEnum.PetRebreed,
    2: RoomChatTypeEnum.PetSpeed,
};

/**
 * The Flash `RoomChatHandler` + `ChatEventHandler`: every chat-ish packet becomes a
 * `ChatBubbleData` in the room store (which `RoomChatBubbles` renders), and a spoken message
 * also makes the speaker's avatar mouth it (one second per word - `ObjectAvatarChatUpdateMessage`).
 * The speaker's live location vector is handed to the bubble (as the Flash `ChatEventHandler`
 * did), so its pointer keeps following them while they walk. Flood control and the room's chat settings land in the store for the chat input.
 */
export const registerRoomChatHandlers = ({ subscribe }: WebSocketConnection) => {
    const getRoom = () => roomStore.getState().room;
    const { addChatBubble, setFloodBlock, setChatSettings } = roomStore.getState();
    let lastAddedChatMs = 0;
    let chatFakeMsIncrementor = 0;

    const findUser = (webId: number, userType: RoomObjectUserType) => roomStore.getState().getUserByWebId(webId, userType);

    const addChat = (objectId: number, text: string, chatType: RoomChatTypeEnum, styleId: number, links: IChatLink[] = [], extraParam: number = 0) => {
        const room = getRoom();

        if (!room || (objectId < 0)) return;

        const roomObject = room.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);
        const now = Math.floor(performance.now());

        // Messages that share a millisecond still need a strict order for the collision rules.
        if (now === lastAddedChatMs) chatFakeMsIncrementor++;
        else chatFakeMsIncrementor = 0;

        lastAddedChatMs = now;

        addChatBubble({
            id: createChatBubbleId(),
            roomId: room.roomId,
            objectId,
            text,
            chatType,
            styleId,
            links,
            userLocation: roomObject?.getLocation(),
            timestamp: now + chatFakeMsIncrementor,
            extraParam,
        });
    };

    const addSpokenChat = (objectId: number, text: string, chatType: RoomChatTypeEnum, styleId: number, links: IChatLink[]) => {
        const room = getRoom();

        if (!room) return;

        room.updateRoomObjectUserAction(objectId, RoomObjectVariableEnum.FigureTalk, text.split(' ').length);

        addChat(objectId, text, chatType, styleId, links);
    };

    return subscribeAll(subscribe, [
        on(ChatMessage, (data) => {
            addSpokenChat(data.objectId, data.text, RoomChatTypeEnum.Speak, data.styleId, data.links);
        }),

        on(ShoutMessage, (data) => {
            addSpokenChat(data.objectId, data.text, RoomChatTypeEnum.Shout, data.styleId, data.links);
        }),

        on(WhisperMessage, (data) => {
            addSpokenChat(data.objectId, data.text, RoomChatTypeEnum.Whisper, data.styleId, data.links);
        }),

        on(HandItemReceivedMessage, (data) => {
            addChat(data.giverUserId, '', RoomChatTypeEnum.HandItem, GENERIC_CHAT_STYLE, [], data.handItemType);
        }),

        on(RespectNotificationMessage, (data) => {
            const user = findUser(data.userId, RoomObjectUserType.User);

            if (user) addChat(user.objectId, '', RoomChatTypeEnum.Respect, GENERIC_CHAT_STYLE);
        }),

        on(PetRespectNotificationEventMessage, (data) => {
            const pet = findUser(data.petId, RoomObjectUserType.Pet);

            if (pet) addChat(pet.objectId, '', data.isTreat ? RoomChatTypeEnum.PetTreat : RoomChatTypeEnum.PetRespect, GENERIC_CHAT_STYLE);
        }),

        on(PetSupplementedNotificationEventMessage, (data) => {
            const pet = findUser(data.petId, RoomObjectUserType.Pet);

            if (!pet) return;

            const giver = findUser(data.userId, RoomObjectUserType.User);
            const chatType = PET_SUPPLEMENT_CHAT_TYPES[data.supplementType] ?? RoomChatTypeEnum.PetRevive;

            addChat(pet.objectId, '', chatType, GENERIC_CHAT_STYLE, [], giver?.objectId ?? -1);
        }),

        on(FloodControlMessage, (data) => {
            setFloodBlock(data.seconds);
        }),

        on(RemainingMutePeriodMessage, (data) => {
            addChat(roomStore.getState().ownRoomIndex, '', RoomChatTypeEnum.MuteRemaining, GENERIC_CHAT_STYLE, [], data.secondsRemaining);
        }),

        on(RoomChatSettingsMessage, (data) => {
            setChatSettings(data.chat);
        }),
    ]);
};
