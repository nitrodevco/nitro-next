import { forwardRef,type HTMLAttributes } from 'react';

import { cn, cva } from '#base/utils';
import { AlignContentType, AlignItemsType, AlignSelfType, DisplayType, FlexDirectionType, FlexGrowType, FlexShrinkType, FlexType, FlexWrapType, GapType, JustifyContentType, JustifySelfType, OverflowType, PositionType } from '#base/utils/styles';

const flexVariants = cva(
    '',
    {
        variants: {
            display: DisplayType,
            direction: FlexDirectionType,
            justify: JustifyContentType,
            align: AlignItemsType,
            alignContent: AlignContentType,
            alignSelf: AlignSelfType,
            justifySelf: JustifySelfType,
            wrap: FlexWrapType,
            flex: FlexType,
            grow: FlexGrowType,
            shrink: FlexShrinkType,
            gap: GapType.all,
            gapX: GapType.x,
            gapY: GapType.y,
            overflow: OverflowType.all,
            overflowX: OverflowType.x,
            overflowY: OverflowType.y,
            position: PositionType
        },
        defaultVariants: {
            display: 'flex',
            gap: 2
        }
    }
);

type FlexVariantProps = NonNullable<Parameters<typeof flexVariants>[0]>;

export interface FlexProps extends HTMLAttributes<HTMLDivElement>, Omit<FlexVariantProps, 'display' | 'className'> {
    className?: string;
    column?: boolean;
    reverse?: boolean;
    center?: boolean;
    inline?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
    ({
        className,
        column,
        reverse,
        center,
        inline,
        fullWidth,
        fullHeight,
        direction,
        justify,
        align,
        alignContent,
        alignSelf,
        justifySelf,
        wrap,
        flex,
        grow,
        shrink,
        gap,
        gapX,
        gapY,
        overflow,
        overflowX,
        overflowY,
        position,
        ...props
    }, ref) => {
        const resolvedDirection = direction ?? (column
            ? (reverse ? 'colReverse' : 'col')
            : (reverse ? 'rowReverse' : undefined)
        );

        return (
            <div
                ref={ref}
                className={cn(
                    flexVariants({
                        display: inline ? 'inlineFlex' : 'flex',
                        direction: resolvedDirection,
                        justify: justify ?? (center ? 'center' : undefined),
                        align: align ?? (center ? 'center' : undefined),
                        alignContent,
                        alignSelf,
                        justifySelf,
                        wrap,
                        flex,
                        grow,
                        shrink,
                        gap,
                        gapX,
                        gapY,
                        overflow,
                        overflowX,
                        overflowY,
                        position
                    }),
                    fullWidth && 'w-full',
                    fullHeight && 'h-full',
                    className
                )}
                {...props}
            />
        );
    }
);

Flex.displayName = 'Flex';
