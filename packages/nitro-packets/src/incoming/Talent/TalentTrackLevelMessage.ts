import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TalentTrackLevelMessageType = object;

export class TalentTrackLevelMessage implements IIncomingPacket<TalentTrackLevelMessageType> {
    public parse(wrapper: IMessageDataWrapper): TalentTrackLevelMessageType {
        const packet: TalentTrackLevelMessageType = {
        };

        return packet;
    }
}
