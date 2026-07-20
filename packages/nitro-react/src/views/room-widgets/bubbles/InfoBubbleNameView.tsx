import { IRoomObjectNameData } from "@nitrodevco/nitro-api";
import { forwardRef, HtmlHTMLAttributes } from "react";

import { cn } from "#base/utils";

interface InfoBubbleNameProps extends HtmlHTMLAttributes<HTMLDivElement> {
    nameData: IRoomObjectNameData;
    className?: string;
}

export const InfoBubbleNameView = forwardRef<HTMLDivElement, InfoBubbleNameProps>(
    ({ nameData, className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(`flex`, className)}
            {...props}
        >
            {nameData.name}
            {children}
        </div>
    )
);

InfoBubbleNameView.displayName = 'InfoBubbleNameView';