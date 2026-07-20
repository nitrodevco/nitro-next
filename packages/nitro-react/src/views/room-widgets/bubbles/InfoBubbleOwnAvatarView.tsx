import { IRoomUserData } from "@nitrodevco/nitro-api";
import { forwardRef, HtmlHTMLAttributes } from "react";

import { cn } from "#base/utils";

interface InfoBubbleOwnAvatarViewProps extends HtmlHTMLAttributes<HTMLDivElement> {
    activeData: IRoomUserData;
    className?: string;
}

export const InfoBubbleOwnAvatarView = forwardRef<HTMLDivElement, InfoBubbleOwnAvatarViewProps>(
    ({ activeData, className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(`flex`, className)}
            {...props}
        >
            {activeData.name}
            {children}
        </div>
    )
);

InfoBubbleOwnAvatarView.displayName = 'InfoBubbleOwnAvatarView';