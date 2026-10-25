// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseStrings } from '@nitrodevco/nitro-api';

export type CompetitionEntrySubmitResultMessageType = {
    goalId: number;
    goalCode: string;
    /** One of the parser's result codes, 0-6. */
    result: number;
    requiredFurnis: string[];
    /** The furni Flash's parser keeps as keys of a `Dictionary` and answers `isMissing` from. */
    missingFurnis: string[];
};

/** Flash's obfuscated `§_-n1q§` (`CompetitionEntrySubmitResultMessageEvent.getParser`). */
export class CompetitionEntrySubmitResultMessage implements IIncomingPacket<CompetitionEntrySubmitResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): CompetitionEntrySubmitResultMessageType {
        const goalId = wrapper.readInt();
        const goalCode = wrapper.readString();
        const result = wrapper.readInt();
        const requiredFurnis = ParseStrings(wrapper);
        const missingFurnis: string[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            missingFurnis.push(wrapper.readString());
            count--;
        }

        return { goalId, goalCode, result, requiredFurnis, missingFurnis };
    }
}
