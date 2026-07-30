import { forwardRef, type HTMLAttributes, type KeyboardEvent, type ReactNode, useCallback, useEffect, useId, useRef, useState } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

import { Border } from './Border';
import { DropmenuItem } from './DropmenuItem';
import { Scrollbar } from './Scrollbar';

const dropmenuVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--dropmenu-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] min-w-10 min-h-5.5 text-[#000000] text-style-regular',
        // black
        '1': '[border-image-source:var(--button-1-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] min-w-10 min-h-5.5 text-[#ffffff] text-style-regular',
        // default
        '3': 'inline-block min-w-10 min-h-5.75 [background-image:var(--dropmenu-3-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--dropmenu-3-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] text-[#000000] text-style-u-regular',
        // default
        '100': '[border-image-source:var(--dropmenu-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] min-w-10 min-h-5.5 text-[#000000] text-style-il-regular',
    },
} as const;

const dropmenuVariants = cva(
    'flex items-center justify-between gap-1 px-1.5 cursor-pointer select-none',
    {
        variants: dropmenuVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type DropmenuVariantProps = VariantProps<typeof dropmenuVariantsConfig>;
type DropmenuItemVariant = '0' | '1' | '3';

export type DropmenuOption = {
    value: string;
    label: ReactNode;
    disabled?: boolean;
};

interface DropmenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>, DropmenuVariantProps {
    className?: string;
    options: DropmenuOption[];
    /** Controlled selected value — omit to let Dropmenu track selection itself (seeded from `defaultValue`). */
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    placeholder?: ReactNode;
    /** Variant for the popover's option rows — defaults to the closest match for the trigger's own variant. */
    itemVariant?: DropmenuItemVariant;
    disabled?: boolean;
}

const defaultItemVariantFor = (variant: string | undefined): DropmenuItemVariant => (variant === '1' ? '1' : '0');

export const Dropmenu = forwardRef<HTMLDivElement, DropmenuProps>(
    ({ className, variant, options, value, defaultValue, onChange, placeholder, itemVariant, disabled, ...props }, ref) => {
        const rootRef = useRef<HTMLDivElement>(null);
        const listboxId = useId();

        const [open, setOpen] = useState(false);
        const [internalValue, setInternalValue] = useState(defaultValue);

        const isControlled = value !== undefined;
        const currentValue = isControlled ? value : internalValue;
        const selectedOption = options.find((option) => option.value === currentValue);

        const close = useCallback(() => setOpen(false), []);

        useEffect(() => {
            if (!open) return;

            const handlePointerDown = (event: PointerEvent) => {
                if (rootRef.current && !rootRef.current.contains(event.target as Node)) close();
            };

            window.addEventListener('pointerdown', handlePointerDown);

            return () => window.removeEventListener('pointerdown', handlePointerDown);
        }, [open, close]);

        const select = useCallback((option: DropmenuOption) => {
            if (option.disabled) return;

            if (!isControlled) setInternalValue(option.value);
            onChange?.(option.value);
            close();
        }, [isControlled, onChange, close]);

        const handleTriggerClick = useCallback(() => {
            if (disabled) return;

            setOpen((current) => !current);
        }, [disabled]);

        const handleTriggerKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
            if (disabled) return;

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setOpen((current) => !current);
            } else if (event.key === 'Escape') {
                close();
            } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();
                setOpen(true);
            }
        }, [disabled, close]);

        const resolvedItemVariant = itemVariant ?? defaultItemVariantFor(variant);

        return (
            <div ref={rootRef} className="relative inline-block">
                <div
                    ref={ref}
                    role="button"
                    tabIndex={disabled ? -1 : 0}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-controls={listboxId}
                    aria-disabled={disabled}
                    onClick={handleTriggerClick}
                    onKeyDown={handleTriggerKeyDown}
                    className={cn(dropmenuVariants({ variant }), disabled && 'pointer-events-none opacity-50', className)}
                    {...props}
                >
                    <span className="overflow-hidden text-ellipsis">{selectedOption?.label ?? placeholder}</span>
                </div>
                {open && (
                    <Border variant="0" className="absolute left-0 top-full z-50 mt-0.5 w-max min-w-full p-0.5">
                        <Scrollbar
                            id={listboxId}
                            role="listbox"
                            variant={resolvedItemVariant}
                            className="max-h-40"
                            contentClassName="flex flex-col gap-px"
                        >
                            {options.map((option) => (
                                <DropmenuItem
                                    key={option.value}
                                    variant={resolvedItemVariant}
                                    aria-selected={option.value === currentValue}
                                    aria-disabled={option.disabled}
                                    className={option.disabled ? 'pointer-events-none opacity-50' : undefined}
                                    onClick={() => select(option)}
                                >
                                    {option.label}
                                </DropmenuItem>
                            ))}
                        </Scrollbar>
                    </Border>
                )}
            </div>
        );
    }
);

Dropmenu.displayName = 'Dropmenu';
