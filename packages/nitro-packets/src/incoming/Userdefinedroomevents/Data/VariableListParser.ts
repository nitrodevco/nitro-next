import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IVariableList } from './IVariableList';
import { WiredVariableParser } from './WiredVariableParser';

export const VariableListParser = (wrapper: IMessageDataWrapper): IVariableList => {
    const variables = ParseArray(wrapper, WiredVariableParser);
    return { variables };
};
