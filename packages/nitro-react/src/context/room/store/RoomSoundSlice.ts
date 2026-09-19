import { ITraxSongInfoSong } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

export type RoomMusicKind = 'jukebox' | 'sound_machine';

/** The one machine the room plays through - Flash's room playlist controller. */
export interface RoomMusic {
    objectId: number;
    kind: RoomMusicKind;
    playing: boolean;
}

/**
 * What the room's jukebox is playing and the songs the client has names for - the sound manager's
 * `roomItemPlaylist` and song cache, which the jukebox and song disk infostands read.
 */
type State = {
    /** -1 while nothing plays. */
    nowPlayingSongId: number;
    songInfoById: Record<number, ITraxSongInfoSong>;
    /** The jukebox or sound machine that announced itself last; none until one does. */
    roomMusic: RoomMusic | undefined;
};

type Actions = {
    setNowPlayingSongId: (songId: number) => void;
    addSongInfo: (songs: ITraxSongInfoSong[]) => void;
    setRoomMusic: (roomMusic: RoomMusic | undefined) => void;
    setRoomMusicPlaying: (objectId: number, playing: boolean) => void;
    /** Only the machine that is set is cleared; a stale dispose from a previous one is ignored. */
    clearRoomMusic: (objectId: number) => void;
};

export const RoomSoundSliceInitialState: State = {
    nowPlayingSongId: -1,
    songInfoById: {},
    roomMusic: undefined,
};

export type RoomSoundSlice = State & Actions;

export const createRoomSoundSlice: StateCreator<RoomSoundSlice, [], [], RoomSoundSlice> = set => ({
    ...RoomSoundSliceInitialState,
    setNowPlayingSongId: nowPlayingSongId => set({ nowPlayingSongId }),
    addSongInfo: songs => set(x => ({ songInfoById: { ...x.songInfoById, ...Object.fromEntries(songs.map(song => [ song.id, song ])) } })),
    setRoomMusic: roomMusic => set({ roomMusic }),
    setRoomMusicPlaying: (objectId, playing) => set(x => ((x.roomMusic?.objectId === objectId) ? { roomMusic: { ...x.roomMusic, playing } } : x)),
    clearRoomMusic: objectId => set(x => ((x.roomMusic?.objectId === objectId) ? { roomMusic: undefined, nowPlayingSongId: -1 } : x)),
});
