import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CompetitionStatusMessageType = object;

export class CompetitionStatusMessage implements IIncomingPacket<CompetitionStatusMessageType> {
    public parse(wrapper: IMessageDataWrapper): CompetitionStatusMessageType {
        const packet: CompetitionStatusMessageType = {
        };

        return packet;
    }
}
