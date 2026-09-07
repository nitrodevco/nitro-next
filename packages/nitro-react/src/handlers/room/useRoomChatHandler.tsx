import { IRoomUserData, RoomChatTypeEnum, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { ChatMessage, FloodControlMessage, HandItemReceivedMessage, IChatLink, PetRespectNotificationEventMessage, PetSupplementedNotificationEventMessage, RemainingMutePeriodMessage, RespectNotificationMessage, RoomChatSettingsMessage, ShoutMessage, WhisperMessage } from '@nitrodevco/nitro-packets';
import { useContext, useRef } from 'react';

import { createChatBubbleId } from '#base/chat';
import { RoomContext, useOwnRoomObjectId, useRoomChatActions, useRoomSelector, useRoomSettingActions } from '#base/context';
import { useMessageListener } from '#base/hooks';

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
export const useRoomChatHandler = () => {
    const room = useRoomSelector();
    const ownRoomObjectId = useOwnRoomObjectId();
    const { addChatBubble, setFloodBlock } = useRoomChatActions();
    const { setChatSettings } = useRoomSettingActions();
    // Read the user table straight off the store when a packet lands rather than subscribing -
    // the room root would otherwise re-render on every user update.
    const roomStore = useContext(RoomContext);
    const lastAddedChatMsRef = useRef(0);
    const chatFakeMsIncrementorRef = useRef(0);

    const findUser = (predicate: (user: IRoomUserData) => boolean): IRoomUserData | undefined => {
        for (const user of Object.values(roomStore?.getState().usersByRoomObjectId ?? {})) {
            if (predicate(user)) return user;
        }

        return undefined;
    };

    const addChat = (objectId: number, text: string, chatType: RoomChatTypeEnum, styleId: number, links: IChatLink[] = [], extraParam: number = 0) => {
        if (!room || (objectId < 0)) return;

        const roomObject = room.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);
        const now = Math.floor(performance.now());

        // Messages that share a millisecond still need a strict order for the collision rules.
        if (now === lastAddedChatMsRef.current) chatFakeMsIncrementorRef.current++;
        else chatFakeMsIncrementorRef.current = 0;

        lastAddedChatMsRef.current = now;

        addChatBubble({
            id: createChatBubbleId(),
            roomId: room.roomId,
            objectId,
            text,
            chatType,
            styleId,
            links,
            userLocation: roomObject?.getLocation(),
            timestamp: now + chatFakeMsIncrementorRef.current,
            extraParam,
        });
    };

    const addSpokenChat = (objectId: number, text: string, chatType: RoomChatTypeEnum, styleId: number, links: IChatLink[]) => {
        if (!room) return;

        room.updateRoomObjectUserAction(objectId, RoomObjectVariableEnum.FigureTalk, text.split(' ').length);

        addChat(objectId, text, chatType, styleId, links);
    };

    useMessageListener(ChatMessage, (data) => {
        addSpokenChat(data.objectId, data.text, RoomChatTypeEnum.Speak, data.styleId, data.links);
    });

    useMessageListener(ShoutMessage, (data) => {
        addSpokenChat(data.objectId, data.text, RoomChatTypeEnum.Shout, data.styleId, data.links);
    });

    useMessageListener(WhisperMessage, (data) => {
        addSpokenChat(data.objectId, data.text, RoomChatTypeEnum.Whisper, data.styleId, data.links);
    });

    useMessageListener(HandItemReceivedMessage, (data) => {
        addChat(data.giverUserId, '', RoomChatTypeEnum.HandItem, GENERIC_CHAT_STYLE, [], data.handItemType);
    });

    useMessageListener(RespectNotificationMessage, (data) => {
        const user = findUser(x => (x.webID === data.userId) && (x.userType === RoomObjectUserType.User));

        if (user) addChat(user.objectId, '', RoomChatTypeEnum.Respect, GENERIC_CHAT_STYLE);
    });

    useMessageListener(PetRespectNotificationEventMessage, (data) => {
        const pet = findUser(x => (x.webID === data.petId) && (x.userType === RoomObjectUserType.Pet));

        if (pet) addChat(pet.objectId, '', data.isTreat ? RoomChatTypeEnum.PetTreat : RoomChatTypeEnum.PetRespect, GENERIC_CHAT_STYLE);
    });

    useMessageListener(PetSupplementedNotificationEventMessage, (data) => {
        const pet = findUser(x => (x.webID === data.petId) && (x.userType === RoomObjectUserType.Pet));

        if (!pet) return;

        const giver = findUser(x => (x.webID === data.userId) && (x.userType === RoomObjectUserType.User));
        const chatType = PET_SUPPLEMENT_CHAT_TYPES[data.supplementType] ?? RoomChatTypeEnum.PetRevive;

        addChat(pet.objectId, '', chatType, GENERIC_CHAT_STYLE, [], giver?.objectId ?? -1);
    });

    useMessageListener(FloodControlMessage, (data) => {
        setFloodBlock(data.seconds);
    });

    useMessageListener(RemainingMutePeriodMessage, (data) => {
        addChat(ownRoomObjectId, '', RoomChatTypeEnum.MuteRemaining, GENERIC_CHAT_STYLE, [], data.secondsRemaining);
    });

    useMessageListener(RoomChatSettingsMessage, (data) => {
        setChatSettings(data.chat);
    });
};
