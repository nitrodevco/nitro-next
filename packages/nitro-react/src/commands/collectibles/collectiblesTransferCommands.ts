/**
 * The collectibles hub's transfer tab - Flash `tabs/TransferNftsTab`.
 * Part of Flash `catalog/collectibles/CollectiblesController` - see `collectiblesCommands`.
 */
import { GetNftTransferFeeComposer, NftTransferAssetsComposer } from '@nitrodevco/nitro-packets';

import { collectiblesStore } from '#base/context/collectibles';
import { Send } from '#base/context/communication';
import { systemStore, translate as t } from '#base/context/system';
import { userStore } from '#base/context/user';

import { notifyCollectibles } from './collectiblesCommands';

/** `initializeData`: the fee is asked for; the wallets the hub already has fill the menu (all of them, as Flash passes `walletAddresses` here). */
export const initializeTransferData = (send: Send) => {
    const { walletAddresses, patchCollectiblesTransfer } = collectiblesStore.getState();

    patchCollectiblesTransfer({ transferFeePending: true });
    send(new GetNftTransferFeeComposer({}));

    if (walletAddresses) initializeTransferWallets(walletAddresses);

    patchCollectiblesTransfer({ transferWaitingForAddresses: walletAddresses === null });
    updateTransferButtonState();
};

/** `initializeTransferWallets`: the menu is filled and its first wallet picked. */
export const initializeTransferWallets = (wallets: string[]) => {
    collectiblesStore.getState().patchCollectiblesTransfer({ transferWallets: wallets, transferSelectedIndex: (wallets.length > 0) ? 0 : -1, transferWaitingForAddresses: false });
    updateTransferButtonState();
};

/** `onSelectWallet`. */
export const selectTransferWallet = (index: number) => collectiblesStore.getState().patchCollectiblesTransfer({ transferSelectedIndex: index });

/** `selectedWallet`. */
const getSelectedTransferWallet = (): string | null => {
    const { transferWallets, transferSelectedIndex } = collectiblesStore.getState();

    if (!transferWallets || (transferSelectedIndex < 0) || (transferSelectedIndex >= transferWallets.length)) return null;

    return transferWallets[transferSelectedIndex];
};

/** `updateTransferButtonState`: the purse covers the fee, there is a Collector wallet, no transfer is running and a wallet is picked. */
export const updateTransferButtonState = () => {
    const { transferFee, stardustWallet, transferring, patchCollectiblesTransfer } = collectiblesStore.getState();
    const enabled = (transferFee <= userStore.getState().silver) && (stardustWallet !== null) && (stardustWallet !== '') && !transferring && (getSelectedTransferWallet() !== null);

    patchCollectiblesTransfer({ transferButtonEnabled: enabled });
};

/** `onNftTransferFeeMessage`. */
export const onNftTransferFee = (transferFee: number) => {
    collectiblesStore.getState().patchCollectiblesTransfer({ transferFeePending: false, transferFee });
    updateTransferButtonState();
};

/** `onTransferClicked` + `onTransferConfirm`. */
export const transferCollectibles = (send: Send) => {
    const { showConfirm, interpolate } = systemStore.getState();

    collectiblesStore.getState().patchCollectiblesTransfer({ transferButtonEnabled: false });

    showConfirm(interpolate('${collectibles.transfer}'), interpolate('${collectibles.transfer.confirm}'), () => {
        collectiblesStore.getState().patchCollectiblesTransfer({ transferring: true });
        send(new NftTransferAssetsComposer({ walletAddress: getSelectedTransferWallet() ?? '' }));
        updateTransferButtonState();
    }, { onCancel: updateTransferButtonState });
};

/** `onNftTransferResultMessage`. */
export const onNftTransferResult = (resultCode: number) => {
    notifyCollectibles((resultCode === 0) ? t('collectibles.transfer.success') : t('collectibles.transfer.error', '', { id: String(resultCode) }));

    collectiblesStore.getState().patchCollectiblesTransfer({ transferring: false });
    updateTransferButtonState();
};
