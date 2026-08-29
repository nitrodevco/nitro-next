import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `username_pair` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutUsernamePairItemProps {
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutUsernamePairItem = ({ layout }: TransactionDetailsLayoutUsernamePairItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="username_pair"
            layout={{ width: 74, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2, ...layout }}
        >
            <Region layout={{ width: 64, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                {t('wiredchests.log_details.username')}
            </Region>
            <Region layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                -
            </Region>
        </Region>
    );
};
