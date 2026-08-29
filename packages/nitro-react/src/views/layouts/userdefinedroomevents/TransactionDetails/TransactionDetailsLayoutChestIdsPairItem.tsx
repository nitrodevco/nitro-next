import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `chest_ids_pair` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutChestIdsPairItemProps {
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutChestIdsPairItem = ({ layout }: TransactionDetailsLayoutChestIdsPairItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="chest_ids_pair"
            layout={{ width: 78, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2, ...layout }}
        >
            <Region layout={{ width: 68, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                {t('wiredchests.log_details.chest_ids')}
            </Region>
            <Region layout={{ width: 8, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                -
            </Region>
        </Region>
    );
};
