import { forwardRef } from 'react';

import { Grid, type GridProps } from './Grid';

export interface AutoGridProps extends Omit<GridProps, 'columns'> {
    columnMinWidth?: number;
    columnMinHeight?: number;
}

export const AutoGrid = forwardRef<HTMLDivElement, AutoGridProps>(
    ({
        columnMinWidth = 40,
        columnMinHeight = 40,
        maxContent = true,
        overflow = 'auto',
        style,
        ...props
    }, ref) => (
        <Grid
            ref={ref}
            columns="none"
            maxContent={maxContent}
            overflow={overflow}
            {...props}
            style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(${columnMinWidth}px, 1fr))`,
                gridAutoRows: `minmax(${columnMinHeight}px, auto)`,
                ...style
            }}
        />
    )
);

AutoGrid.displayName = 'AutoGrid';
