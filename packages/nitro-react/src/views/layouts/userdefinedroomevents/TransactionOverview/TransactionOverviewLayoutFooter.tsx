import { BoxLayout, Region } from '#base/theme';

import { TransactionOverviewLayoutPagination, TransactionOverviewLayoutPaginationProps } from './TransactionOverviewLayoutPagination';

/** Named region `footer` of TransactionOverviewLayout - configured through the parent's `footer` prop. */
export interface TransactionOverviewLayoutFooterProps {
    layout?: BoxLayout;
    pagination?: TransactionOverviewLayoutPaginationProps;
}

export const TransactionOverviewLayoutFooter = ({ layout, pagination }: TransactionOverviewLayoutFooterProps) => {
    return (
        <Region
            name="footer"
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 35, height: 60, ...layout }}
        >
            <TransactionOverviewLayoutPagination {...pagination} />
        </Region>
    );
};
