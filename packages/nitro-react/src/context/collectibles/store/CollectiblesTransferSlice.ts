/**
 * The transfer tab - Flash `tabs/TransferNftsTab`: the silver fee (`onNftTransferFeeMessage`), the
 * wallets it may transfer to (`initializeTransferWallets` - every wallet when the tab is built
 * after they arrived, the non-Collector ones on every later update, as Flash does), the wallet
 * picked, whether a transfer is on its way, and the transfer button as
 * `updateTransferButtonState` left it.
 */
import { StateCreator } from 'zustand';

type State = {
    /** `§_-J1N§`. */
    transferFeePending: boolean;
    /** `_waitingForAddresses`. */
    transferWaitingForAddresses: boolean;
    /** `§_-ym§`. */
    transferFee: number;
    /** `_isTransferring`. */
    transferring: boolean;
    /** `§_-s1J§`: null until the menu is filled. */
    transferWallets: string[] | null;
    /** `transfer_wallet_selection.selection`. */
    transferSelectedIndex: number;
    /** `transfer_button`. */
    transferButtonEnabled: boolean;
};

type Actions = {
    patchCollectiblesTransfer: (patch: Partial<State>) => void;
};

export const CollectiblesTransferSliceInitialState: State = {
    transferFeePending: false,
    transferWaitingForAddresses: false,
    transferFee: 0,
    transferring: false,
    transferWallets: null,
    transferSelectedIndex: -1,
    transferButtonEnabled: true,
};

export type CollectiblesTransferSlice = State & Actions;

export const createCollectiblesTransferSlice: StateCreator<CollectiblesTransferSlice, [], [], CollectiblesTransferSlice> = set => ({
    ...CollectiblesTransferSliceInitialState,
    patchCollectiblesTransfer: patch => set(patch),
});
