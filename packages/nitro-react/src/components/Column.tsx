import { forwardRef } from 'react';

import { Flex, type FlexProps } from './Flex';

export type ColumnProps = Omit<FlexProps, 'direction' | 'column'>;

export const Column = forwardRef<HTMLDivElement, ColumnProps>(
    ({
        gap = 2,
        ...props
    }, ref) => (
        <Flex ref={ref} {...props} gap={gap} column />
    )
);

Column.displayName = 'Column';
