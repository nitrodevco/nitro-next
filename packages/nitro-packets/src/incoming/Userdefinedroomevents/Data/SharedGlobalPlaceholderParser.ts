import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ISharedGlobalPlaceholder } from './ISharedGlobalPlaceholder';

export const SharedGlobalPlaceholderParser = (wrapper: IMessageDataWrapper): ISharedGlobalPlaceholder => {
    return {
        roomId: wrapper.readInt(),
        roomName: wrapper.readString(),
        placeholderName: wrapper.readString(),
    };
};
