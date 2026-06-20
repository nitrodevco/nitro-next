import { ChatMessage, FloodControlMessage, HandItemReceivedMessage, PetRespectNotificationEventMessage, PetSupplementedNotificationEventMessage, RemainingMutePeriodMessage, RespectNotificationMessage, ShoutMessage, WhisperMessage } from "@nitrodevco/nitro-shared";

import { useMessageListener } from "#base/hooks";

export const useRoomChatHandler = () => {
    useMessageListener(ChatMessage, data => {
    });

    useMessageListener(ShoutMessage, data => {
    });

    useMessageListener(WhisperMessage, data => {
    });

    useMessageListener(HandItemReceivedMessage, data => {
    });

    useMessageListener(RespectNotificationMessage, data => {
    });

    useMessageListener(PetRespectNotificationEventMessage, data => {
    });

    useMessageListener(PetSupplementedNotificationEventMessage, data => {
    });

    useMessageListener(FloodControlMessage, data => {
    });

    useMessageListener(RemainingMutePeriodMessage, data => {
    });
}