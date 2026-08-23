import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ModeratorCautionEventMessageType = object;

export class ModeratorCautionEventMessage implements IIncomingPacket<ModeratorCautionEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): ModeratorCautionEventMessageType {
        const packet: ModeratorCautionEventMessageType = {
        };

        return packet;
    }
}
