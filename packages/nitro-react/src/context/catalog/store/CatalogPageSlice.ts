/**
 * The page the catalogue shows - Flash's `CatalogViewer`: the page it asked the server for
 * (`loadCatalogPage`, with the busy flag the window shows while it waits), the `CatalogPage` it
 * built from the answer, `_forceRefresh`, and the front page items that answer carried.
 *
 * `setActivePage` disposes the page it replaces, as `CatalogViewer.disposeCurrentPage` does, so
 * the old page's widget events go with it, and clears the forced refresh. `pageSerial` counts the
 * pages built: the view keys the layout on it, so a new page mounts new widgets even when it has
 * the same id (a forced refresh).
 */
import { ICatalogFrontPageItem } from '@nitrodevco/nitro-api';
import { StateCreator } from 'zustand';

import { CatalogPage } from '../page/CatalogPage';

type State = {
    isBusy: boolean;
    activePageId: number;
    activePage: CatalogPage | undefined;
    pageSerial: number;
    /** `CatalogViewer._forceRefresh`: rebuild the page even when the server sends the one on show (a link opened it). */
    forceRefresh: boolean;
    frontPageItems: ICatalogFrontPageItem[];
};

type Actions = {
    setIsBusy: (isBusy: boolean) => void;
    setActivePageId: (activePageId: number) => void;
    setActivePage: (activePage: CatalogPage | undefined) => void;
    setForceRefresh: () => void;
    setFrontPageItems: (frontPageItems: ICatalogFrontPageItem[]) => void;
};

export const CatalogPageSliceInitialState: State = {
    isBusy: false,
    activePageId: -1,
    activePage: undefined,
    pageSerial: 0,
    forceRefresh: false,
    frontPageItems: [],
};

export type CatalogPageSlice = State & Actions;

export const createCatalogPageSlice: StateCreator<CatalogPageSlice, [], [], CatalogPageSlice> = set => ({
    ...CatalogPageSliceInitialState,
    setIsBusy: isBusy => set({ isBusy }),
    setActivePageId: activePageId => set({ activePageId }),
    setActivePage: activePage => set((x) => {
        if (x.activePage && (x.activePage !== activePage)) x.activePage.dispose();

        return { activePage, pageSerial: x.pageSerial + 1, forceRefresh: false };
    }),
    setForceRefresh: () => set({ forceRefresh: true }),
    setFrontPageItems: frontPageItems => set({ frontPageItems }),
});
