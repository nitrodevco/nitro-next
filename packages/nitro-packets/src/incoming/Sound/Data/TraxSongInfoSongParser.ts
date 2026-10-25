// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ITraxSongInfoSong } from './ITraxSongInfoSong';

export const TraxSongInfoSongParser = (wrapper: IMessageDataWrapper): ITraxSongInfoSong => ({
    id: wrapper.readInt(),
    code: wrapper.readString(),
    songName: wrapper.readString(),
    data: wrapper.readString(),
    length: wrapper.readInt(),
    creator: wrapper.readString(),
});
