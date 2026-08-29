import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `timestamp_pair` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutTimestampPairItemProps {
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutTimestampPairItem = ({ layout }: TransactionDetailsLayoutTimestampPairItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="timestamp_pair"
            layout={{ width: 77, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2, ...layout }}
        >
            <Region layout={{ width: 67, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                {t('wiredchests.log_details.timestamp')}
            </Region>
            <Region layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                -
            </Region>
        </Region>
    );
};
