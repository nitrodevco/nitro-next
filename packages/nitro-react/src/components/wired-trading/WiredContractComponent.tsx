/**
 * Mounts the contract windows - `WiredContractController` shows the window of the contract's
 * type (`PaymentContract`, `TradeContract`, `RewardContract`) with the contents the server sent,
 * and `AddEditContractElement` over it while a node is being added or edited. A new contract
 * remounts its window, so the form starts from the new contents.
 */
import { WiredContractType } from '@nitrodevco/nitro-packets';

import { useWiredContractActions, useWiredTradingStore } from '#base/context/wired-trading';
import { WiredContractElementView } from '#base/views/wired-trading/contracts/WiredContractElementView';
import { WiredPaymentContractView } from '#base/views/wired-trading/contracts/WiredPaymentContractView';
import { WiredRewardContractView } from '#base/views/wired-trading/contracts/WiredRewardContractView';
import { WiredTradeContractView } from '#base/views/wired-trading/contracts/WiredTradeContractView';

export const WiredContractComponent = () => {
    const contract = useWiredTradingStore(x => x.contract);
    const elementEdit = useWiredTradingStore(x => x.contractElementEdit);
    const { closeContract } = useWiredContractActions();

    if (!contract) return null;

    const type = contract.contractType;

    return (
        <>
            {(type === WiredContractType.Payment) && (
                <WiredPaymentContractView
                    key={contract.contractId}
                    contract={contract}
                    onClose={closeContract}
                />
            )}
            {(type === WiredContractType.Trade) && (
                <WiredTradeContractView
                    key={contract.contractId}
                    contract={contract}
                    onClose={closeContract}
                />
            )}
            {(type === WiredContractType.Reward) && (
                <WiredRewardContractView
                    key={contract.contractId}
                    contract={contract}
                    onClose={closeContract}
                />
            )}
            {elementEdit && <WiredContractElementView edit={elementEdit} />}
        </>
    );
};
