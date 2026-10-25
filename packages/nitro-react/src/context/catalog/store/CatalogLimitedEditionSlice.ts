/**
 * The limited edition raffle of the open purchase confirmation - what `HabboCatalog` forwards to
 * its `PurchaseConfirmationDialog`: `onLtdRaffleEntered` calls the dialog's `ltdRaffleStarted`
 * (its `raffle_container` shows and the dots start running), and `onLtdRaffleResult` its
 * `ltdRaffleEnded` before disposing the dialog. The dialog reads `ltdRaffleRunning`; the packets
 * are handled in `handlers/catalog/registerCatalogLimitedEditionHandlers`.
 */
import { StateCreator } from 'zustand';

type State = {
    /** Between the dialog's `ltdRaffleStarted` and `ltdRaffleEnded` (or its disposal). */
    ltdRaffleRunning: boolean;
};

type Actions = {
    setLtdRaffleRunning: (ltdRaffleRunning: boolean) => void;
};

export const CatalogLimitedEditionSliceInitialState: State = {
    ltdRaffleRunning: false,
};

export type CatalogLimitedEditionSlice = State & Actions;

export const createCatalogLimitedEditionSlice: StateCreator<CatalogLimitedEditionSlice, [], [], CatalogLimitedEditionSlice> = set => ({
    ...CatalogLimitedEditionSliceInitialState,
    setLtdRaffleRunning: ltdRaffleRunning => set({ ltdRaffleRunning }),
});
