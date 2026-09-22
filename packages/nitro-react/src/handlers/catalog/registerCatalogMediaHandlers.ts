/**
 * The packets the catalogue's song disk page waits for - the listener
 * `SongDiskProductViewCatalogWidget` adds in its constructor (`OfficialSongIdMessageEvent`,
 * `onOfficialSongIdMessageEvent`). Each answer goes into `CatalogMediaSlice.officialSongIds`,
 * where the widget finds the id for the code it asked for.
 *
 * The song's length (`SongInfoReceivedEvent` from the sound manager's `TraxSongInfoMessage`) is
 * not read here: `registerRoomJukeboxHandlers` already keeps every song the client is told about in
 * `roomStore.songInfoById`, the port's stand-in for `HabboMusicController`'s song cache.
 */
import { OfficialSongIdMessage } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { CatalogStore } from '#base/context/catalog';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerCatalogMediaHandlers = (store: StoreApi<CatalogStore>, { subscribe }: WebSocketConnection) => {
    const { setOfficialSongId } = store.getState();

    return subscribeAll(subscribe, [
        on(OfficialSongIdMessage, data => setOfficialSongId(data.officialSongId, data.songId)),
    ]);
};
