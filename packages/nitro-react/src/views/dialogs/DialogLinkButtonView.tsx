import type { ButtonHTMLAttributes } from "react";

import { cn } from "#base/theme";

type DialogLinkButtonViewProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
}

export const DialogLinkButtonView = ({ className, children, ...props }: DialogLinkButtonViewProps) => {
    return (
        <button type="button" className={ cn('cursor-pointer underline text-center', className) } { ...props }>
            { children }
        </button>
    );
}
