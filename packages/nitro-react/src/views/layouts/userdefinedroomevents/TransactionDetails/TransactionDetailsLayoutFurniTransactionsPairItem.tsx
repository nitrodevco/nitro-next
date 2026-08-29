import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `furni_transactions_pair` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutFurniTransactionsPairItemProps {
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutFurniTransactionsPairItem = ({ layout }: TransactionDetailsLayoutFurniTransactionsPairItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="furni_transactions_pair"
            layout={{ width: 89, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2, ...layout }}
        >
            <Region layout={{ width: 79, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                {t('wiredchests.log_details.transactions')}
            </Region>
            <Region layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                -
            </Region>
        </Region>
    );
};
