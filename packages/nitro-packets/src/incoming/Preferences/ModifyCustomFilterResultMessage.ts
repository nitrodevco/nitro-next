// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ModifyCustomFilterResultMessageType = {
    /** `CUSTOM_FILTER_RESULT_*` in `UserWordFilterSlice`: 1 the word was added, 3 it was removed. */
    result: number;
    word: string;
};

export class ModifyCustomFilterResultMessage implements IIncomingPacket<ModifyCustomFilterResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): ModifyCustomFilterResultMessageType {
        const result = wrapper.readInt();
        const word = wrapper.readString();

        return { result, word };
    }
}
