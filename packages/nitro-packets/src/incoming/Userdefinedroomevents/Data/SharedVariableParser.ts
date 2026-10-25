import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ISharedVariable } from './ISharedVariable';
import { WiredVariableParser } from './WiredVariableParser';

export const SharedVariableParser = (wrapper: IMessageDataWrapper): ISharedVariable => {
    return {
        roomId: wrapper.readInt(),
        roomName: wrapper.readString(),
        wiredVariable: WiredVariableParser(wrapper),
    };
};
