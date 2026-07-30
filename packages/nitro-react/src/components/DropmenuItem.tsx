import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const dropmenuItemVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--dropmenuitem-0-default-src)] [border-image-slice:2_2_2_2_fill] [border-image-width:2px_2px_2px_2px] [border-image-repeat:stretch] hover:[border-image-source:var(--dropmenuitem-0-hovering-src)] aria-selected:[border-image-source:var(--dropmenuitem-0-selected-src)] text-[#000000] text-style-regular',
        // black
        '1': '[border-image-source:var(--dropmenuitem-1-default-src)] [border-image-slice:2_2_2_2_fill] [border-image-width:2px_2px_2px_2px] [border-image-repeat:stretch] hover:[border-image-source:var(--dropmenuitem-1-hovering-src)] aria-selected:[border-image-source:var(--dropmenuitem-1-selected-src)] text-[#ffffff] text-style-regular',
        // default — art has no "default" state, transparent until hovered/selected
        '3': 'hover:[border-image-source:var(--dropmenuitem-3-hovering-src)] hover:[border-image-slice:2_2_2_2_fill] hover:[border-image-width:2px_2px_2px_2px] hover:[border-image-repeat:stretch] aria-selected:[border-image-source:var(--dropmenuitem-3-selected-src)] aria-selected:[border-image-slice:2_2_2_2_fill] aria-selected:[border-image-width:2px_2px_2px_2px] aria-selected:[border-image-repeat:stretch] text-[#000000] text-style-regular',
    },
} as const;

const dropmenuItemVariants = cva(
    'flex items-center h-4.75 px-1 cursor-pointer leading-0 whitespace-nowrap',
    {
        variants: dropmenuItemVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type DropmenuItemVariantProps = VariantProps<typeof dropmenuItemVariantsConfig>;

interface DropmenuItemProps extends HTMLAttributes<HTMLDivElement>, DropmenuItemVariantProps {
    className?: string;
}

export const DropmenuItem = forwardRef<HTMLDivElement, DropmenuItemProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            role="option"
            className={cn(dropmenuItemVariants({ variant }), className)}
            {...props}
        />
    )
);

DropmenuItem.displayName = 'DropmenuItem';
