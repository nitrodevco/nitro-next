import { type HTMLAttributes, type ReactNode, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Dropmenu } from './Dropmenu';
import { DropmenuItem } from './DropmenuItem';
import { cn } from './utils';

interface DropmenuSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** wrapper size — the closed control's footprint, e.g. 'w-60 h-5.25' */
    className?: string;
    /** the title row, e.g. 'h-5.25 px-1.75' — must match the wrapper height */
    rowClassName?: string;
    variant?: string;
    options: ReactNode[];
    selectedIndex: number;
    /** shown when no option is selected */
    placeholder?: ReactNode;
    onSelect: (index: number) => void;
}

/**
 * A dropmenu window opened as a selector: the SAME frame grows downward — the title
 * row (with the arrow button) stays on top and the item list renders inside it
 * (dropmenu_xml puts the list at an x=6 inset, items 19px high). The open menu is a
 * desktop-level window in Flash, so it renders through a portal — an ancestor's
 * overflow can never crop it. Closes when the pointer clicks anywhere else.
 */
export const DropmenuSelect = ({ className, rowClassName = 'h-5.25 px-1.75', variant, options, selectedIndex, placeholder, onSelect, ...props }: DropmenuSelectProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [openRect, setOpenRect] = useState<{ left: number; top: number; width: number } | null>(null);

    const toggle = () => {
        if (openRect) {
            setOpenRect(null);

            return;
        }

        const rect = wrapperRef.current?.getBoundingClientRect();

        if (rect) setOpenRect({ left: rect.left, top: rect.top, width: rect.width });
    };

    const label = <span className="truncate">{options[selectedIndex] ?? placeholder ?? ''}</span>;

    return (
        /* no position class of its own — cn does not resolve conflicts, and callers
           position the wrapper themselves (the open list is portaled, nothing anchors here) */
        <div ref={wrapperRef} className={cn(className)}>
            <Dropmenu className="flex flex-col w-full h-full cursor-pointer" variant={variant} onClick={toggle} {...props}>
                <div className={cn('flex items-center', rowClassName)}>{label}</div>
            </Dropmenu>
            {openRect && createPortal(
                <>
                    <div className="fixed inset-0 z-[9990]" onClick={() => setOpenRect(null)} />
                    <div className="fixed z-[9991]" style={{ left: openRect.left, top: openRect.top, width: openRect.width }}>
                        <Dropmenu className="flex flex-col w-full cursor-pointer" variant={variant} onClick={toggle} {...props}>
                            <div className={cn('flex items-center', rowClassName)}>{label}</div>
                            <div className="flex flex-col px-1.5 pb-1">
                                {options.map((option, index) => (
                                    <DropmenuItem
                                        key={index}
                                        aria-selected={index === selectedIndex}
                                        className="w-full cursor-pointer"
                                        onClick={event => { event.stopPropagation(); onSelect(index); setOpenRect(null); }}>
                                        {option}
                                    </DropmenuItem>
                                ))}
                            </div>
                        </Dropmenu>
                    </div>
                </>,
                document.body
            )}
        </div>
    );
};
