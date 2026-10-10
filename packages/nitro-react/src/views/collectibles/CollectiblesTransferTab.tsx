/**
 * The transfer tab - `tabs/TransferNftsTab` in `transferContainer` of `collectible_view.xml`: the
 * description, the safe, and in `transfer_container` the wallet menu (the wallets to transfer to;
 * greyed and disabled with none), the silver fee (text and icon only for a fee above 0) and the
 * transfer button. Until the fee and the wallets are in, `loading_contents` covers it.
 *
 * The menu's caption is the picked wallet cut to 32 characters and `...` (`onSelectWallet`).
 */
import { selectTransferWallet, transferCollectibles } from '#base/commands';
import { useCollectiblesStore } from '#base/context/collectibles';
import { useWebSocketContext } from '#base/context/communication';

import { CollectiblesTabWindow } from './CollectiblesTabWindow';
import { collectiblesLoadingBindings } from './collectiblesTemplate';

/** `initializeTransferWallets`: the menu's colour with no wallets, and with some. */
const WALLET_MENU_DISABLED_COLOR = 13421772;
const WALLET_MENU_ENABLED_COLOR = 16777215;
/** `onSelectWallet` cuts a longer caption. */
const WALLET_CAPTION_LENGTH = 32;

export const CollectiblesTransferTab = () => {
    const { send } = useWebSocketContext();
    const feePending = useCollectiblesStore(x => x.transferFeePending);
    const waitingForAddresses = useCollectiblesStore(x => x.transferWaitingForAddresses);
    const fee = useCollectiblesStore(x => x.transferFee);
    const wallets = useCollectiblesStore(x => x.transferWallets);
    const selectedIndex = useCollectiblesStore(x => x.transferSelectedIndex);
    const buttonEnabled = useCollectiblesStore(x => x.transferButtonEnabled);
    const ready = !waitingForAddresses && !feePending;
    const list = wallets ?? [];
    const selected = list[selectedIndex] ?? '';

    return (
        <CollectiblesTabWindow
            container="transferContainer"
            bindings={{
                ...collectiblesLoadingBindings(ready),
                transfer_wallet_selection: wallets
                    ? {
                            options: list,
                            selection: selectedIndex,
                            ...((selected.length > WALLET_CAPTION_LENGTH) && { caption: `${selected.substring(0, WALLET_CAPTION_LENGTH)}...` }),
                            color: list.length ? WALLET_MENU_ENABLED_COLOR : WALLET_MENU_DISABLED_COLOR,
                            disabled: !list.length,
                            onSelect: selectTransferWallet,
                        }
                    : {},
                transfer_fee_text: { visible: fee > 0, caption: String(fee) },
                transfer_fee_icon: { visible: fee > 0 },
                transfer_button: { disabled: !buttonEnabled, onPointerTap: () => transferCollectibles(send) },
            }}
        />
    );
};
