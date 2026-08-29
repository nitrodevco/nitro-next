import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `transaction_type_pair` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutTransactionTypePairItemProps {
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutTransactionTypePairItem = ({ layout }: TransactionDetailsLayoutTransactionTypePairItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="transaction_type_pair"
            layout={{ width: 111, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2, ...layout }}
        >
            <Region layout={{ width: 101, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                {t('wiredchests.log_details.type')}
            </Region>
            <Region layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                -
            </Region>
        </Region>
    );
};
