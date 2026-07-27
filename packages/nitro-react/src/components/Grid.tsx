import { forwardRef } from 'react';

import { cn, cva } from '#base/utils';
import { AlignContentType, AlignItemsType, AlignSelfType, DisplayType, GapType, GridColSpanType, GridColStartType, GridColumnsType, GridFlowType, GridRowSpanType, GridRowsType, JustifyContentType, JustifyItemsType, JustifySelfType, OverflowType, PositionType } from '#base/utils/styles';

import { Base, type BaseProps } from './Base';

const gridVariants = cva(
    '',
    {
        variants: {
            display: DisplayType,
            columns: GridColumnsType,
            rows: GridRowsType,
            colSpan: GridColSpanType,
            colStart: GridColStartType,
            rowSpan: GridRowSpanType,
            flow: GridFlowType,
            justify: JustifyContentType,
            justifyItems: JustifyItemsType,
            justifySelf: JustifySelfType,
            align: AlignItemsType,
            alignContent: AlignContentType,
            alignSelf: AlignSelfType,
            gap: GapType.all,
            gapX: GapType.x,
            gapY: GapType.y,
            overflow: OverflowType.all,
            overflowX: OverflowType.x,
            overflowY: OverflowType.y,
            position: PositionType
        },
        defaultVariants: {
            display: 'grid',
            columns: 12,
            gap: 2
        }
    }
);

type GridVariantProps = NonNullable<Parameters<typeof gridVariants>[0]>;

export interface GridProps extends Omit<BaseProps, 'display'>, Omit<GridVariantProps, 'display' | 'className'> {
    center?: boolean;
    inline?: boolean;
    maxContent?: boolean;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
    ({
        className,
        center,
        inline,
        maxContent,
        columns,
        rows,
        colSpan,
        colStart,
        rowSpan,
        flow,
        justify,
        justifyItems,
        justifySelf,
        align,
        alignContent,
        alignSelf,
        gap,
        gapX,
        gapY,
        overflow,
        overflowX,
        overflowY,
        position,
        ...props
    }, ref) => (
        <Base
            ref={ref}
            className={cn(
                gridVariants({
                    display: inline ? 'inlineGrid' : 'grid',
                    columns,
                    rows,
                    colSpan,
                    colStart,
                    rowSpan,
                    flow,
                    justify: justify ?? (center ? 'center' : undefined),
                    justifyItems,
                    justifySelf,
                    align: align ?? (center ? 'center' : undefined),
                    alignContent,
                    alignSelf,
                    gap,
                    gapX,
                    gapY,
                    overflow,
                    overflowX,
                    overflowY,
                    position
                }),
                maxContent && 'basis-[max-content]',
                className
            )}
            {...props}
        />
    )
);

Grid.displayName = 'Grid';
