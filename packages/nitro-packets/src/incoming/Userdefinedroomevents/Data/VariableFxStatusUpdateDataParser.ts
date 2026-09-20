// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, IVariableFxStatusUpdateData, ParseVariableFxStatusKey, ReadLong } from '@nitrodevco/nitro-api';

import { ParseStringMap } from './ParseStringMap';

export const VariableFxStatusUpdateDataParser = (wrapper: IMessageDataWrapper, allInitialize: boolean): IVariableFxStatusUpdateData => {
    const statusKey = wrapper.readString();
    const isInitialize = wrapper.readBoolean() || allInitialize;
    const isUserEntity = wrapper.readBoolean();
    const entityId = wrapper.readInt();
    const value = ReadLong(wrapper);
    const hasOverride = wrapper.readBoolean();

    let overrideMinValue: number | undefined = undefined;
    let overrideMaxValue: number | undefined = undefined;

    if (hasOverride) {
        overrideMinValue = ReadLong(wrapper);
        overrideMaxValue = ReadLong(wrapper);
    }

    const extra = ParseStringMap(wrapper);
    const { configId, variableId } = ParseVariableFxStatusKey(statusKey);

    return {
        statusKey,
        configId,
        variableId,
        isInitialize,
        isUserEntity,
        entityId,
        value,
        overrideMinValue,
        overrideMaxValue,
        extra,
    };
};
