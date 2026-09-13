import { IMessageDataWrapper, IVariableFxStatusRemoveData, ParseVariableFxStatusRemoveKey } from '@nitrodevco/nitro-api';

export const VariableFxStatusRemoveDataParser = (wrapper: IMessageDataWrapper): IVariableFxStatusRemoveData => {
    const fullKey = wrapper.readString();

    return {
        fullKey,
        ...ParseVariableFxStatusRemoveKey(fullKey),
    };
};
