import { type RefObject, useEffect, useRef } from 'react';

export const useOutsideClick = <T extends HTMLElement>(ref: RefObject<T | null>, handler: () => void, enabled: boolean = true) => {
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    });

    useEffect(() => {
        if (!enabled) return;

        const onPointerDown = (event: PointerEvent) => {
            const element = ref.current;

            if (!element || element.contains(event.target as Node)) return;

            handlerRef.current();
        };

        document.addEventListener('pointerdown', onPointerDown);

        return () => document.removeEventListener('pointerdown', onPointerDown);
    }, [ ref, enabled ]);
};
