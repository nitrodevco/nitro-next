// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, IVariableFxConfigUpdateData, ReadLong } from '@nitrodevco/nitro-api';

import { ParseStringMap } from './ParseStringMap';

export const VariableFxConfigUpdateDataParser = (wrapper: IMessageDataWrapper): IVariableFxConfigUpdateData => {
    return {
        configId: wrapper.readInt(),
        isUserFx: wrapper.readBoolean(),
        showMode: wrapper.readInt(),
        showTriggerMask: wrapper.readInt(),
        showOnMouseHover: wrapper.readBoolean(),
        showDuration: wrapper.readInt(),
        categoryId: wrapper.readInt(),
        styleId: wrapper.readInt(),
        colorId: wrapper.readInt(),
        widthId: wrapper.readInt(),
        rendererId: wrapper.readInt(),
        defaultMinValue: ReadLong(wrapper),
        defaultMaxValue: ReadLong(wrapper),
        extra: ParseStringMap(wrapper),
    };
};
