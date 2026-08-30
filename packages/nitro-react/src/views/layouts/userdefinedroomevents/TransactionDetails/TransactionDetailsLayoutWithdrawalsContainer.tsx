import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

import { TransactionDetailsLayoutItemGrid, TransactionDetailsLayoutItemGridProps } from './TransactionDetailsLayoutItemGrid';

/** Named region `withdrawals_container` of TransactionDetailsLayout - configured through the parent's `withdrawalsContainer` prop. */
export interface TransactionDetailsLayoutWithdrawalsContainerProps {
    captionEmptyText?: string;
    itemGrid?: TransactionDetailsLayoutItemGridProps;
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutWithdrawalsContainer = ({ captionEmptyText, itemGrid, layout }: TransactionDetailsLayoutWithdrawalsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="withdrawals_container"
            layout={{ width: 165, height: 161, flexShrink: 0, ...layout }}
        >
            <ThemeText
                text={t('wiredchests.log_details.transactions.withdrawn')}
                textOptions={{ align: 'center' }}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 17 }}
            />
            <Border
                variant="4"
                tintColor="#e2e2e2"
                layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 141 }}
            >
                <TransactionDetailsLayoutItemGrid {...itemGrid} />
                <Region
                    name="empty_text"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 61, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionEmptyText ?? t('wiredchests.log_details.transactions.none_placeholder')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
