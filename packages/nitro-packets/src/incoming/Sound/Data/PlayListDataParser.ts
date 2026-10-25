// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IPlayListData } from './IPlayListData';

export const PlayListDataParser = (wrapper: IMessageDataWrapper): IPlayListData => ({
    id: wrapper.readInt(),
    length: wrapper.readInt(),
    songName: wrapper.readString(),
    creator: wrapper.readString(),
});
