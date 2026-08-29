import { BoxLayout, Region } from '#base/theme';

import { TransactionDetailsLayoutDepositsContainer, TransactionDetailsLayoutDepositsContainerProps } from './TransactionDetailsLayoutDepositsContainer';
import { TransactionDetailsLayoutWithdrawalsContainer, TransactionDetailsLayoutWithdrawalsContainerProps } from './TransactionDetailsLayoutWithdrawalsContainer';

/** Row template `furni_details` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutFurniDetailsItemProps {
    depositsContainer?: TransactionDetailsLayoutDepositsContainerProps;
    layout?: BoxLayout;
    visibleDepositsContainer?: boolean;
    visibleWithdrawalsContainer?: boolean;
    withdrawalsContainer?: TransactionDetailsLayoutWithdrawalsContainerProps;
}

export const TransactionDetailsLayoutFurniDetailsItem = ({ depositsContainer, layout, visibleDepositsContainer, visibleWithdrawalsContainer, withdrawalsContainer }: TransactionDetailsLayoutFurniDetailsItemProps) => {
    return (
        <Region
            name="furni_details"
            layout={{ width: 380, height: 161, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 345, top: 0, height: 161, flexDirection: 'row', gap: 15 }}>
                {(visibleWithdrawalsContainer ?? true) && (
                    <TransactionDetailsLayoutWithdrawalsContainer {...withdrawalsContainer} />
                )}
                {(visibleDepositsContainer ?? true) && (
                    <TransactionDetailsLayoutDepositsContainer {...depositsContainer} />
                )}
            </Region>
        </Region>
    );
};
