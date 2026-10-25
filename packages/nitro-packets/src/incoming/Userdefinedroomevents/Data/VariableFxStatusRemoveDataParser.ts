// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, IVariableFxStatusRemoveData, ParseVariableFxStatusRemoveKey } from '@nitrodevco/nitro-api';

export const VariableFxStatusRemoveDataParser = (wrapper: IMessageDataWrapper): IVariableFxStatusRemoveData => {
    const fullKey = wrapper.readString();

    return {
        fullKey,
        ...ParseVariableFxStatusRemoveKey(fullKey),
    };
};
