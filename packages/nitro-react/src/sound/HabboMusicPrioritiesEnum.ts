/**
 * The slots `HabboMusicController` keeps a song request in - Flash's `HabboMusicPrioritiesEnum`.
 * The highest slot holding a request is the one that plays: a catalogue preview (3) talks over the
 * room's jukebox or sound machine (0), which resumes when the preview ends.
 */
export class HabboMusicPrioritiesEnum {
    public static readonly PRIORITY_ROOM_PLAYLIST = 0;
    public static readonly PRIORITY_USER_PLAYLIST = 1;
    public static readonly PRIORITY_SONG_PLAY = 2;
    public static readonly PRIORITY_PURCHASE_PREVIEW = 3;
    public static readonly PRIORITY_COUNT = 4;
}
