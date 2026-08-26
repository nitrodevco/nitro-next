import { useEffect, useRef } from 'react';

/**
 * IHabboContext.createLinkEvent / ILinkEventTracker — components register a
 * linkPattern prefix and receive every link whose url starts with it. Flash
 * uses this for all cross-component actions (catalog/open/..., navigator/goto/...).
 */
type LinkListener = { pattern: string; handler: (url: string) => void };

const listeners = new Set<LinkListener>();

export const createLinkEvent = (url: string) => {
    for (const listener of listeners) {
        if (url.startsWith(listener.pattern)) listener.handler(url);
    }
};

export const useLinkEventTracker = (pattern: string, handler: (url: string) => void) => {
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    });

    useEffect(() => {
        const listener: LinkListener = { pattern, handler: url => handlerRef.current(url) };

        listeners.add(listener);

        return () => { listeners.delete(listener); };
    }, [pattern]);
};
