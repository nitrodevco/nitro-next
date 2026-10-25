// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseStrings } from '@nitrodevco/nitro-api';

import { IModeratorRoomInfoRoom } from './IModeratorRoomInfoRoom';

export const ModeratorRoomInfoRoomParser = (wrapper: IMessageDataWrapper): IModeratorRoomInfoRoom => {
    const exists = wrapper.readBoolean();

    // A room that no longer exists is just the flag.
    if (!exists) return { exists, name: undefined, desc: undefined, tags: [] };

    const name = wrapper.readString();
    const desc = wrapper.readString();
    const tags = ParseStrings(wrapper);

    return { exists, name, desc, tags };
};
