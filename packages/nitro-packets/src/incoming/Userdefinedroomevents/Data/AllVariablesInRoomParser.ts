import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IAllVariablesInRoom } from './IAllVariablesInRoom';

export const AllVariablesInRoomParser = (wrapper: IMessageDataWrapper): IAllVariablesInRoom => {
    return {
        hash: wrapper.readInt(),
    };
};
