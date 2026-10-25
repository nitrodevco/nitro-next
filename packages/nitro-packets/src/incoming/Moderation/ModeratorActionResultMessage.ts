import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** `ModeratorActionResultMessageParser` (1318 AS3 :26): the player acted on and whether it went through. */
export type ModeratorActionResultMessageType = {
    userId: number;
    success: boolean;
};

export class ModeratorActionResultMessage implements IIncomingPacket<ModeratorActionResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): ModeratorActionResultMessageType {
        return { userId: wrapper.readInt(), success: wrapper.readBoolean() };
    }
}
