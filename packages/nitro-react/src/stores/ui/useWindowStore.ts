import { create } from 'zustand';

type WindowId = 'navigator' | 'inventory';

interface WindowState {
    openWindows: Set<WindowId>;
    isOpen: (id: WindowId) => boolean;
    open: (id: WindowId) => void;
    close: (id: WindowId) => void;
    toggle: (id: WindowId) => void;
}

export const useWindowStore = create<WindowState>((set, get) => ({
    openWindows: new Set(),

    isOpen: (id) => get().openWindows.has(id),

    open: (id) => set(state => ({
        openWindows: new Set([...state.openWindows, id])
    })),

    close: (id) => set(state => {
        const next = new Set(state.openWindows);
        next.delete(id);
        return { openWindows: next };
    }),

    toggle: (id) => {
        const { isOpen, open, close } = get();
        isOpen(id) ? close(id) : open(id);
    },
}));
