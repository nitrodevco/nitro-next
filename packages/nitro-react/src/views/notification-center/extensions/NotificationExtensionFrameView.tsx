import type { ReactNode } from "react";

import { Border, cn } from "#base/theme";

type NotificationExtensionFrameViewProps = {
    children: ReactNode;
    color?: string;
    className?: string;
    onClick?: () => void;
}

export const NotificationExtensionFrameView = ({ children, color, className, onClick }: NotificationExtensionFrameViewProps) => {
    return (
        <Border
            variant="9"
            tintColor={ color }
            className={ cn('pointer-events-auto w-48 overflow-hidden flex flex-col items-center gap-1 px-2 py-1.5', onClick && 'cursor-pointer', className) }
            onClick={ onClick }>
            { children }
        </Border>
    );
}
