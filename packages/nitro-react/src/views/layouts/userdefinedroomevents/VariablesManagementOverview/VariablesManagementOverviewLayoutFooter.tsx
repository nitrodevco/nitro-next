import { BoxLayout, Region } from '#base/theme';

import { VariablesManagementOverviewLayoutPagination, VariablesManagementOverviewLayoutPaginationProps } from './VariablesManagementOverviewLayoutPagination';

/** Named region `footer` of VariablesManagementOverviewLayout - configured through the parent's `footer` prop. */
export interface VariablesManagementOverviewLayoutFooterProps {
    layout?: BoxLayout;
    pagination?: VariablesManagementOverviewLayoutPaginationProps;
}

export const VariablesManagementOverviewLayoutFooter = ({ layout, pagination }: VariablesManagementOverviewLayoutFooterProps) => {
    return (
        <Region
            name="footer"
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 35, height: 60, ...layout }}
        >
            <VariablesManagementOverviewLayoutPagination {...pagination} />
        </Region>
    );
};
