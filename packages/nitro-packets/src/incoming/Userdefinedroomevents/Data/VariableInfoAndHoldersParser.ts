// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { ObjectIdAndValuePairParser } from '../../Data/ObjectIdAndValuePairParser';
import { IVariableInfoAndHolders } from './IVariableInfoAndHolders';
import { WiredVariableParser } from './WiredVariableParser';

export const VariableInfoAndHoldersParser = (wrapper: IMessageDataWrapper): IVariableInfoAndHolders => {
    return {
        variable: WiredVariableParser(wrapper),
        holders: ParseArray(wrapper, ObjectIdAndValuePairParser),
    };
};
