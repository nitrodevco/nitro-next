import { forwardRef,type HTMLAttributes } from 'react';

import { cn, cva } from '#base/utils';
import { CursorType, DisplayType, FlexGrowType, FlexShrinkType, OverflowType, PositionType, TextColorType } from '#base/utils/styles';

import { DEFAULT_TOOLTIP_ID, type NitroTooltipFollowType, type NitroTooltipPlacementType } from './NitroTooltip';

const baseVariants = cva(
    '',
    {
        variants: {
            display: DisplayType,
            grow: FlexGrowType,
            shrink: FlexShrinkType,
            overflow: OverflowType.all,
            position: PositionType,
            cursor: CursorType,
            textColor: TextColorType
        }
    }
);

type BaseVariantProps = NonNullable<Parameters<typeof baseVariants>[0]>;

interface TooltipProps {
    tooltipId?: string;
    tooltipContent?: string;
    tooltipFollow?: NitroTooltipFollowType;
    tooltipPlacement?: NitroTooltipPlacementType;
    tooltipDelay?: number;
    tooltipFixed?: boolean;
    tooltipClassName?: string;
}

const tooltipAttributes = ({ tooltipId, tooltipContent, tooltipFollow, tooltipPlacement, tooltipDelay, tooltipFixed, tooltipClassName }: TooltipProps) => {
    if ((tooltipContent == null) && (tooltipId == null)) return null;

    return {
        'data-tooltip-id': tooltipId ?? DEFAULT_TOOLTIP_ID,
        'data-tooltip-content': tooltipContent,
        'data-tooltip-follow': (tooltipFollow == null) ? undefined : String(tooltipFollow),
        'data-tooltip-placement': tooltipPlacement,
        'data-tooltip-delay': (tooltipDelay == null) ? undefined : String(tooltipDelay),
        'data-tooltip-fixed': tooltipFixed ? '' : undefined,
        'data-tooltip-class': tooltipClassName
    };
};

export interface BaseProps extends HTMLAttributes<HTMLDivElement>, Omit<BaseVariantProps, 'className'>, TooltipProps {
    className?: string;
    fit?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
    visible?: boolean;
}

export const Base = forwardRef<HTMLDivElement, BaseProps>(
    ({
        className,
        fit,
        fullWidth,
        fullHeight,
        visible,
        display,
        grow,
        shrink,
        overflow,
        position,
        cursor,
        textColor,
        tooltipId,
        tooltipContent,
        tooltipFollow,
        tooltipPlacement,
        tooltipDelay,
        tooltipFixed,
        tooltipClassName,
        ...props
    }, ref) => (
        <div
            ref={ref}
            className={cn(
                baseVariants({
                    display,
                    grow,
                    shrink,
                    overflow,
                    position,
                    cursor,
                    textColor
                }),
                fit && 'size-fit',
                fullWidth && 'w-full',
                fullHeight && 'h-full',
                (visible === true) && 'visible',
                (visible === false) && 'invisible',
                className
            )}
            {...tooltipAttributes({ tooltipId, tooltipContent, tooltipFollow, tooltipPlacement, tooltipDelay, tooltipFixed, tooltipClassName })}
            {...props}
        />
    )
);

Base.displayName = 'Base';
