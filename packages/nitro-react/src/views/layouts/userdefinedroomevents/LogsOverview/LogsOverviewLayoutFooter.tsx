import { BoxLayout, Region } from '#base/theme';

import { LogsOverviewLayoutPagination, LogsOverviewLayoutPaginationProps } from './LogsOverviewLayoutPagination';

/** Named region `footer` of LogsOverviewLayout - configured through the parent's `footer` prop. */
export interface LogsOverviewLayoutFooterProps {
    layout?: BoxLayout;
    pagination?: LogsOverviewLayoutPaginationProps;
}

export const LogsOverviewLayoutFooter = ({ layout, pagination }: LogsOverviewLayoutFooterProps) => {
    return (
        <Region
            name="footer"
            layout={{ position: 'absolute', left: 0, right: -12, bottom: -6, height: 60, ...layout }}
        >
            <LogsOverviewLayoutPagination {...pagination} />
        </Region>
    );
};
