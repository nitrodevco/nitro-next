import { AnimatePresence, motion } from 'motion/react';
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

import { cn } from '#base/lib/utils';

interface Position { x: number; y: number; }
interface Size { width: number; height: number; }

interface DraggableWindowProps {
    title: string;
    storageKey: string;
    isOpen: boolean;
    onClose: () => void;
    defaultPosition?: Position;
    defaultSize?: Size;
    minSize?: Size;
    className?: string;
    children: ReactNode;
}

function loadFromStorage<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}

export const DraggableWindow = ({
    title,
    storageKey,
    isOpen,
    onClose,
    defaultPosition = { x: 120, y: 80 },
    defaultSize = { width: 420, height: 380 },
    minSize = { width: 200, height: 160 },
    className,
    children,
}: DraggableWindowProps) => {
    const [pos, setPos] = useState<Position>(() =>
        loadFromStorage(`nitro:window:${storageKey}:pos`, defaultPosition)
    );
    const [size, setSize] = useState<Size>(() =>
        loadFromStorage(`nitro:window:${storageKey}:size`, defaultSize)
    );

    const posRef = useRef(pos);
    const sizeRef = useRef(size);
    useEffect(() => { posRef.current = pos; }, [pos]);
    useEffect(() => { sizeRef.current = size; }, [size]);

    /* ── Drag ── */
    const dragging = useRef(false);
    const dragOffset = useRef<Position>({ x: 0, y: 0 });

    const onHeaderPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest('button')) return;
        dragging.current = true;
        dragOffset.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y };
        e.currentTarget.setPointerCapture(e.pointerId);
    }, []);

    const onHeaderPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (!dragging.current) return;
        const next = {
            x: Math.max(0, e.clientX - dragOffset.current.x),
            y: Math.max(0, e.clientY - dragOffset.current.y),
        };
        setPos(next);
    }, []);

    const onHeaderPointerUp = useCallback(() => {
        if (!dragging.current) return;
        dragging.current = false;
        localStorage.setItem(`nitro:window:${storageKey}:pos`, JSON.stringify(posRef.current));
    }, [storageKey]);

    /* ── Resize ── */
    const resizing = useRef(false);
    const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

    const onResizePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        resizing.current = true;
        resizeStart.current = { x: e.clientX, y: e.clientY, w: sizeRef.current.width, h: sizeRef.current.height };
        e.currentTarget.setPointerCapture(e.pointerId);
    }, []);

    const onResizePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (!resizing.current) return;
        setSize({
            width:  Math.max(minSize.width,  resizeStart.current.w + e.clientX - resizeStart.current.x),
            height: Math.max(minSize.height, resizeStart.current.h + e.clientY - resizeStart.current.y),
        });
    }, [minSize]);

    const onResizePointerUp = useCallback(() => {
        if (!resizing.current) return;
        resizing.current = false;
        localStorage.setItem(`nitro:window:${storageKey}:size`, JSON.stringify(sizeRef.current));
    }, [storageKey]);

    const portal = typeof document !== 'undefined'
        ? document.getElementById('draggable-windows-container')
        : null;

    if (!portal) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key={storageKey}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.12 }}
                    style={{ left: pos.x, top: pos.y, width: size.width, height: size.height }}
                    className={cn(
                        'absolute flex flex-col pointer-events-auto select-none',
                        'habbo-panel rounded-sm overflow-hidden',
                        className
                    )}
                >
                    {/* Header / drag handle */}
                    <div
                        className="habbo-panel-header flex items-center justify-between px-2 shrink-0 cursor-move"
                        style={{ height: 'var(--spacing-card-header-h)' }}
                        onPointerDown={onHeaderPointerDown}
                        onPointerMove={onHeaderPointerMove}
                        onPointerUp={onHeaderPointerUp}
                    >
                        <span className="text-xs font-bold text-habbo-text uppercase tracking-wider truncate">
                            {title}
                        </span>
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center w-5 h-5 rounded-sm text-habbo-text-muted hover:text-habbo-text hover:bg-habbo-danger transition-colors duration-100 shrink-0 ml-2"
                        >
                            <IoClose size={14} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-hidden relative">
                        {children}
                    </div>

                    {/* Resize handle */}
                    <div
                        className="resize-handle"
                        onPointerDown={onResizePointerDown}
                        onPointerMove={onResizePointerMove}
                        onPointerUp={onResizePointerUp}
                    />
                </motion.div>
            )}
        </AnimatePresence>,
        portal
    );
};
