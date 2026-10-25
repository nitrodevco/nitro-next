import { RoomChatTypeEnum, RoomObjectUserType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { ChatMessage, CloseConnectionMessage, FloodControlMessage, GetGuestRoomResultMessage, HandItemReceivedMessage, IChatLink, PetRespectNotificationEventMessage, PetSupplementedNotificationEventMessage, RemainingMutePeriodMessage, RespectNotificationMessage, RoomChatSettingsMessage, RoomEntryInfoMessage, ShoutMessage, SpecialSystemChatMessage, WhisperMessage } from '@nitrodevco/nitro-packets';

import { GENERIC_CHAT_STYLE, insertRoomChat } from '#base/commands';
import { chatHistoryStore } from '#base/context/chat-history';
import { WebSocketConnection } from '#base/context/communication';
import { getRoom, roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/** `PetSupplementedNotification.supplementType` -> the Flash chat types 7/8/9. */
const PET_SUPPLEMENT_CHAT_TYPES: Record<number, RoomChatTypeEnum> = {
    0: RoomChatTypeEnum.PetRevive,
    1: RoomChatTypeEnum.PetRebreed,
    2: RoomChatTypeEnum.PetSpeed,
};

/**
 * The Flash `RoomChatHandler`: every chat-ish packet becomes a chat event `insertRoomChat` puts in
 * the room (`ChatEventHandler`), and a spoken message also makes the speaker's avatar mouth it
 * (one second per word - `ObjectAvatarChatUpdateMessage`). Flood control and the room's chat settings land in the store for the chat input.
 */
export const registerRoomChatHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setFloodBlock, setChatSettings } = roomStore.getState();

    const findUser = (webId: number, userType: RoomObjectUserType) => roomStore.getState().getUserByWebId(webId, userType);

    const addSpokenChat = (objectId: number, text: string, chatType: RoomChatTypeEnum, styleId: number, links: IChatLink[], hideUsername: boolean, location: { x: number; y: number } | null) => {
        const room = getRoom();

        if (!room) return;

        // A chat at a tile with no speaker (index -1, the WIRED Link Speaker) moves no mouth.
        if (objectId >= 0) room.updateRoomObjectUserAction(objectId, RoomObjectVariableEnum.FigureTalk, text.split(' ').length);

        insertRoomChat(objectId, text, chatType, styleId, links, 0, hideUsername, location);
    };

    return subscribeAll(subscribe, [
        // `HabboFreeFlowChat.onRoomEnter` / `onGuestRoomData`: the first room data after an entry is the history's room change line.
        on(RoomEntryInfoMessage, () => chatHistoryStore.getState().resetRoomChange()),

        // `HabboFreeFlowChat.onGuestRoomData`: the room change goes in the history, and the room's
        // chat settings come with the entry answer - Habbo sends no RoomChatSettings on entering
        // (only the entry answer: the same message answers room info for other rooms).
        on(GetGuestRoomResultMessage, (data) => {
            chatHistoryStore.getState().insertRoomChange(data.roomInfo.name);

            if (data.chat && data.enterRoom) setChatSettings(data.chat);
        }),

        on(CloseConnectionMessage, () => chatHistoryStore.getState().reset()),

        on(ChatMessage, (data) => {
            addSpokenChat(data.objectId, data.text, RoomChatTypeEnum.Speak, data.styleId, data.links, data.hideUsername, data.location);
        }),

        on(ShoutMessage, (data) => {
            addSpokenChat(data.objectId, data.text, RoomChatTypeEnum.Shout, data.styleId, data.links, data.hideUsername, data.location);
        }),

        on(WhisperMessage, (data) => {
            addSpokenChat(data.objectId, data.text, RoomChatTypeEnum.Whisper, data.styleId, data.links, data.hideUsername, data.location);
        }),

        on(HandItemReceivedMessage, (data) => {
            insertRoomChat(data.giverUserId, '', RoomChatTypeEnum.HandItem, GENERIC_CHAT_STYLE, [], data.handItemType);
        }),

        /*
         * `RoomChatHandler.onSpecialSystemChat`: a notice from the user at that room index, with no
         * text of its own - `ChatBubbleFactory.applySpecialChatContent` decides what it says.
         */
        on(SpecialSystemChatMessage, (data) => {
            if (!roomStore.getState().usersByRoomObjectId[data.userIndex]) return;

            insertRoomChat(data.userIndex, '', RoomChatTypeEnum.SpecialSystem, GENERIC_CHAT_STYLE, [], data.specialSystemType);
        }),

        on(RespectNotificationMessage, (data) => {
            const user = findUser(data.userId, RoomObjectUserType.User);

            if (user) insertRoomChat(user.objectId, '', RoomChatTypeEnum.Respect, GENERIC_CHAT_STYLE);
        }),

        on(PetRespectNotificationEventMessage, (data) => {
            const pet = findUser(data.petId, RoomObjectUserType.Pet);

            if (pet) insertRoomChat(pet.objectId, '', data.isTreat ? RoomChatTypeEnum.PetTreat : RoomChatTypeEnum.PetRespect, GENERIC_CHAT_STYLE);
        }),

        on(PetSupplementedNotificationEventMessage, (data) => {
            const pet = findUser(data.petId, RoomObjectUserType.Pet);

            if (!pet) return;

            const giver = findUser(data.userId, RoomObjectUserType.User);
            const chatType = PET_SUPPLEMENT_CHAT_TYPES[data.supplementType] ?? RoomChatTypeEnum.PetRevive;

            insertRoomChat(pet.objectId, '', chatType, GENERIC_CHAT_STYLE, [], giver?.objectId ?? -1);
        }),

        on(FloodControlMessage, (data) => {
            setFloodBlock(data.seconds);
        }),

        on(RemainingMutePeriodMessage, (data) => {
            insertRoomChat(roomStore.getState().ownRoomIndex, '', RoomChatTypeEnum.MuteRemaining, GENERIC_CHAT_STYLE, [], data.secondsRemaining);
        }),

        on(RoomChatSettingsMessage, (data) => {
            setChatSettings(data.chat);
        }),
    ]);
};
