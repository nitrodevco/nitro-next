import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

import { TransactionDetailsLayoutItemGrid2, TransactionDetailsLayoutItemGrid2Props } from './TransactionDetailsLayoutItemGrid2';

/** Named region `deposits_container` of TransactionDetailsLayout - configured through the parent's `depositsContainer` prop. */
export interface TransactionDetailsLayoutDepositsContainerProps {
    captionEmptyText?: string;
    itemGrid?: TransactionDetailsLayoutItemGrid2Props;
    layout?: BoxLayout;
    visibleEmptyText?: boolean;
}

export const TransactionDetailsLayoutDepositsContainer = ({ captionEmptyText, itemGrid, layout, visibleEmptyText }: TransactionDetailsLayoutDepositsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="deposits_container"
            layout={{ width: 165, height: 161, flexShrink: 0, ...layout }}
        >
            <ThemeText
                text={t('wiredchests.log_details.transactions.deposit')}
                textOptions={{ align: 'center' }}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 17 }}
            />
            <Border
                variant="4"
                tintColor="#e2e2e2"
                layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 141 }}
            >
                <TransactionDetailsLayoutItemGrid2 {...itemGrid} />
                {(visibleEmptyText ?? false) && (
                    <Region
                        name="empty_text"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 61, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionEmptyText ?? t('wiredchests.log_details.transactions.none_placeholder')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                )}
            </Border>
        </Region>
    );
};
