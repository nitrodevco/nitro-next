// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type IsUserPartOfCompetitionMessageType = {
    /** Whether the user has a room entered in the competition. */
    isPartOf: boolean;
    /** The entered room's id. */
    targetId: number;
};

/** `IsUserPartOfCompetitionMessageParser`: the answer to `GetIsUserPartOfCompetitionMessageComposer`. */
export class IsUserPartOfCompetitionMessage implements IIncomingPacket<IsUserPartOfCompetitionMessageType> {
    public parse(wrapper: IMessageDataWrapper): IsUserPartOfCompetitionMessageType {
        const packet: IsUserPartOfCompetitionMessageType = {
            isPartOf: wrapper.readBoolean(),
            targetId: wrapper.readInt(),
        };

        return packet;
    }
}
