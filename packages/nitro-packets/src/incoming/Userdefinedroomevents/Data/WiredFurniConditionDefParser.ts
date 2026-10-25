// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredFurniConditionDef } from './IWiredFurniConditionDef';
import { QuantifierType } from './QuantifierType';
import { WiredFurniActionDefBaseParser } from './WiredFurniActionDefBaseParser';

export const WiredFurniConditionDefParser = (wrapper: IMessageDataWrapper): IWiredFurniConditionDef => {
    let quantifierCode: number = 0;
    let quantifierType: QuantifierType = QuantifierType.None;
    let isInvert: boolean = false;
    const hooks = {
        readDefinitionSpecifics: (wrapper: IMessageDataWrapper) => {
            quantifierCode = wrapper.readInt();
        },
        readTypeSpecifics: (wrapper: IMessageDataWrapper) => {
            quantifierType = wrapper.readByte();
            isInvert = wrapper.readBoolean();
        },
    };
    const base = WiredFurniActionDefBaseParser(wrapper, hooks);
    return { ...base, quantifierCode, quantifierType, isInvert };
};
