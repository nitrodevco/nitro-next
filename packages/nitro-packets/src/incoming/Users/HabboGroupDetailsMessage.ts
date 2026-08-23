import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboGroupDetailsMessageType = object;

export class HabboGroupDetailsMessage implements IIncomingPacket<HabboGroupDetailsMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboGroupDetailsMessageType {
        const packet: HabboGroupDetailsMessageType = {
        };

        return packet;
    }
}
