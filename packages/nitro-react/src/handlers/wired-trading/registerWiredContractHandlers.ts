/**
 * Wired contracts - Flash `WiredContractController.onOpenContract`, `onContractContents` and
 * `onContractUpdateResult`. The server asks for a contract to be opened, the client asks for its
 * contents, and the window for the contract's type opens with them; a save is answered with a
 * result that closes the window or explains the failure.
 *
 * A contract whose definition lacks what its type needs (a payment or trade contract without
 * "you give" rules, a trade or reward contract without a "you get" rule) opens nothing, as each
 * Flash window's `show` refuses it.
 *
 * The reference server (turbo-cloud) sends none of the contract packets; this follows Flash.
 */
import { WiredContractContentsMessage, WiredContractType, WiredContractUpdateResultMessage, WiredOpenContractComposer, WiredOpenContractMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';
import { wiredTradingStore } from '#base/context/wired-trading';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerWiredContractHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const { setContractRequested, openContract, closeContract } = wiredTradingStore.getState();

    return subscribeAll(subscribe, [
        on(WiredOpenContractMessage, (data) => {
            setContractRequested(data.contractId);
            send(new WiredOpenContractComposer({ contractId: data.contractId }));
        }),

        on(WiredContractContentsMessage, (data) => {
            if (data.contractId !== wiredTradingStore.getState().contractRequestedId) return;

            closeContract();
            setContractRequested(-1);

            const { youGiveRule, youGetRule } = data.definition;

            switch (data.contractType) {
                case WiredContractType.Payment:
                    if (!youGiveRule) return;
                    break;
                case WiredContractType.Trade:
                    if (!youGiveRule || !youGetRule) return;
                    break;
                case WiredContractType.Reward:
                    if (!youGetRule) return;
                    break;
                default:
                    return;
            }

            openContract(data);
        }),

        on(WiredContractUpdateResultMessage, (data) => {
            if (data.isSuccess) {
                closeContract();

                return;
            }

            const { getLocalizationValue, interpolate, showAlert } = systemStore.getState();
            const key = `wiredcontracts.error.${data.failCode}`;

            showAlert(interpolate('${wiredfurni.error.title}'), getLocalizationValue(key, key));
        }),
    ]);
};
