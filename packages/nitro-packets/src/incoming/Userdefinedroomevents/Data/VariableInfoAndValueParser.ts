import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IVariableInfoAndValue } from './IVariableInfoAndValue';
import { WiredVariableParser } from './WiredVariableParser';

export const VariableInfoAndValueParser = (wrapper: IMessageDataWrapper): IVariableInfoAndValue => {
    return {
        variable: WiredVariableParser(wrapper),
        value: wrapper.readInt(),
    };
};
