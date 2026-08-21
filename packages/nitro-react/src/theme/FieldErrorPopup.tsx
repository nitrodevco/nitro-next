import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { Border } from './Border';
import { NitroIcon } from './NitroIcon';
import { cn } from './utils';

interface FieldErrorPopupProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    text: string;
}

/**
 * nav_error_popup — the bubble TextFieldManager.displayError puts above an invalid
 * input. Layout: popup_container 184x33 holding a style-0 border 184x23 with
 * error_text at (8,4) in Volter 9 on black, and popup_arrow_down (11x11) at y=22.
 * displayError sizes it to the text (border width = textWidth + 15) and centres it
 * over the input, with the arrow centred on the bubble.
 */
export const FieldErrorPopup = forwardRef<HTMLDivElement, FieldErrorPopupProps>(
    ({ className, text, ...props }, ref) => (
        <div ref={ref} className={cn('pointer-events-none flex w-max flex-col items-center', className)} {...props}>
            <Border className="flex items-center px-2 min-h-5.75" variant="0">
                <span className="text-style-regular whitespace-nowrap text-black">{text}</span>
            </Border>
            <NitroIcon className="-mt-0.25" icon="icon-nav-popup-arrow-down" />
        </div>
    )
);

FieldErrorPopup.displayName = 'FieldErrorPopup';
