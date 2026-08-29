import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

import { TransactionOverviewLayoutFooter, TransactionOverviewLayoutFooterProps } from './TransactionOverviewLayoutFooter';
import { TransactionOverviewLayoutHeader, TransactionOverviewLayoutHeaderProps } from './TransactionOverviewLayoutHeader';

/** Generated from `1134_transaction_overview_xml` (layout "transaction_overview", 880x391) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TransactionOverviewLayoutProps {
    footer?: TransactionOverviewLayoutFooterProps;
    header?: TransactionOverviewLayoutHeaderProps;
    layout?: BoxLayout;
    onClose?: () => void;
    tableView?: ReactNode;
}

export const TransactionOverviewLayout = ({ footer, header, layout, onClose, tableView }: TransactionOverviewLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('wiredchests.logs.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 880, height: 391, ...layout }}
        >
            <TransactionOverviewLayoutHeader {...header} />
            <Region
                name="middle"
                layout={{ position: 'absolute', left: 1, right: 1, top: 62, bottom: 95 }}
            >
                <Region
                    name="table_view"
                    layout={{ position: 'absolute', left: 13, right: 13, top: 0, bottom: 0 }}
                >
                    {tableView}
                </Region>
            </Region>
            <TransactionOverviewLayoutFooter {...footer} />
        </Frame>
    );
};
