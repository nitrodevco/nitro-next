import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IFlatController } from './IFlatController';

/** `FlatControllerData` / `BannedUserData` - both are the same pair on the wire. */
export const FlatControllerParser = (wrapper: IMessageDataWrapper): IFlatController => ({
    userId: wrapper.readInt(),
    userName: wrapper.readString(),
});
