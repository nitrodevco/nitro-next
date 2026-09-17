import { ITraxSongInfoSong } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/**
 * What the room's jukebox is playing and the songs the client has names for - the sound manager's
 * `roomItemPlaylist` and song cache, which the jukebox and song disk infostands read.
 */
type State = {
    /** -1 while nothing plays. */
    nowPlayingSongId: number;
    songInfoById: Record<number, ITraxSongInfoSong>;
};

type Actions = {
    setNowPlayingSongId: (songId: number) => void;
    addSongInfo: (songs: ITraxSongInfoSong[]) => void;
};

export const RoomSoundSliceInitialState: State = {
    nowPlayingSongId: -1,
    songInfoById: {},
};

export type RoomSoundSlice = State & Actions;

export const createRoomSoundSlice: StateCreator<RoomSoundSlice, [], [], RoomSoundSlice> = set => ({
    ...RoomSoundSliceInitialState,
    setNowPlayingSongId: nowPlayingSongId => set({ nowPlayingSongId }),
    addSongInfo: songs => set(x => ({ songInfoById: { ...x.songInfoById, ...Object.fromEntries(songs.map(song => [ song.id, song ])) } })),
});
