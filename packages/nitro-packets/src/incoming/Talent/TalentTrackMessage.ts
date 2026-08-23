import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TalentTrackMessageType = object;

export class TalentTrackMessage implements IIncomingPacket<TalentTrackMessageType> {
    public parse(wrapper: IMessageDataWrapper): TalentTrackMessageType {
        const packet: TalentTrackMessageType = {
        };

        return packet;
    }
}
