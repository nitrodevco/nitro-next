/**
 * What the catalogue's song disk page asks the server - `SongDiskProductViewCatalogWidget`'s
 * `GetOfficialSongIdMessageComposer` (the answer lands in `CatalogMediaSlice`), and the sound
 * manager's `HabboMusicController.requestSongInfoWithoutSamples` that its `getSongLength` falls
 * back on, whose `TraxSongInfoMessage` answer `registerRoomJukeboxHandlers` keeps in
 * `roomStore.songInfoById`.
 */
import { GetOfficialSongIdComposer, GetSongInfoComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';

type Send = WebSocketConnection['send'];

/** `onSelectProduct`: the song id behind a disk whose extra parameter is an official song's code. */
export const requestOfficialSongId = (send: Send, officialSongId: string) => send(new GetOfficialSongIdComposer({ officialSongId }));

/**
 * `HabboMusicController.requestSongInfoWithoutSamples`: the song's name and length, without the
 * samples a preview would load. Flash queues the id and sends the queue on its next update; the
 * port asks at once, one id per request.
 */
export const requestSongInfoWithoutSamples = (send: Send, songId: number) => send(new GetSongInfoComposer({ songIds: [ songId ] }));
