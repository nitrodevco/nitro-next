import { forwardRef } from 'react';

import { cn } from '#base/utils';

import { Base, type BaseProps } from './Base';

interface NitroIconProps extends BaseProps {
    icon: string;
}

export const NitroIcon = forwardRef<HTMLDivElement, NitroIconProps>(
    ({ className, icon, ...props }, ref) => (
        <Base
            display="inlineBlock"
            ref={ref}
            className={cn('nitro-icon', icon, className)}
            {...props}
        />
    )
);

NitroIcon.displayName = 'NitroIcon';
