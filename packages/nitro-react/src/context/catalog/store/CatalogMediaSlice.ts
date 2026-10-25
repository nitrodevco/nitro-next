/**
 * What the catalogue's song disk page learns from the server - the answers to
 * `SongDiskProductViewCatalogWidget`'s `GetOfficialSongIdMessageComposer`: an official song's code
 * (a disk's non-numeric extra parameter) against the song id it stands for.
 *
 * Flash's widget subscribes to `OfficialSongIdMessageEvent` itself and takes the id when the code
 * is the one it asked for (`onOfficialSongIdMessageEvent`). The port's widgets register no packet
 * listeners, so `registerCatalogMediaHandlers` writes every answer here and the widget reads the
 * one for its code. The table is only ever added to - a code always stands for the same song - so
 * `resetCatalog` leaves it alone.
 */
import { StateCreator } from 'zustand';

type State = {
    /** `OfficialSongIdMessageParser.officialSongId` -> `songId`. */
    officialSongIds: Readonly<Record<string, number>>;
};

type Actions = {
    setOfficialSongId: (officialSongId: string, songId: number) => void;
};

export const CatalogMediaSliceInitialState: State = {
    officialSongIds: {},
};

export type CatalogMediaSlice = State & Actions;

export const createCatalogMediaSlice: StateCreator<CatalogMediaSlice, [], [], CatalogMediaSlice> = set => ({
    ...CatalogMediaSliceInitialState,
    setOfficialSongId: (officialSongId, songId) => set(x => ({ officialSongIds: { ...x.officialSongIds, [officialSongId]: songId } })),
});
