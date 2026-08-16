import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CompetitionEntrySubmitResultMessageType = {
    // no fields
};

export class CompetitionEntrySubmitResultMessage implements IIncomingPacket<CompetitionEntrySubmitResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): CompetitionEntrySubmitResultMessageType {
        const packet: CompetitionEntrySubmitResultMessageType = {};

        return packet;
    }
}
