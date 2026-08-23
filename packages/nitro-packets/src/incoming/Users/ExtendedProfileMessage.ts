import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ExtendedProfileMessageType = object;

export class ExtendedProfileMessage implements IIncomingPacket<ExtendedProfileMessageType> {
    public parse(wrapper: IMessageDataWrapper): ExtendedProfileMessageType {
        const packet: ExtendedProfileMessageType = {
        };

        return packet;
    }
}
