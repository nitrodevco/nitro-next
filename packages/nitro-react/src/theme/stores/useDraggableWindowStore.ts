import { create } from 'zustand';
import { DraggableWindowState, DraggableWindowPosition } from '../types';

interface DraggableWindowStore {
  positions: DraggableWindowState;
  setPosition: (windowId: string, position: DraggableWindowPosition) => void;
  getPosition: (windowId: string) => DraggableWindowPosition | undefined;
  removePosition: (windowId: string) => void;
  clearPositions: () => void;
  loadPositions: (positions: DraggableWindowState) => void;
}

const POSITIONS_STORAGE_KEY = 'nitro-window-positions';

const getStoredPositions = (): DraggableWindowState => {
  if (typeof window === 'undefined') return {};

  try {
    const stored = localStorage.getItem(POSITIONS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as DraggableWindowState;
    }
  } catch (e) {
    console.error('Failed to load window positions from storage:', e);
  }
  return {};
};

export const useDraggableWindowStore = create<DraggableWindowStore>((set, get) => ({
  positions: getStoredPositions(),

  setPosition: (windowId, position) => {
    set((state) => {
      const newPositions = {
        ...state.positions,
        [windowId]: position,
      };

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(POSITIONS_STORAGE_KEY, JSON.stringify(newPositions));
        } catch (e) {
          console.error('Failed to save window position to storage:', e);
        }
      }

      return { positions: newPositions };
    });
  },

  getPosition: (windowId) => {
    return get().positions[windowId];
  },

  removePosition: (windowId) => {
    set((state) => {
      const newPositions = { ...state.positions };
      delete newPositions[windowId];

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(POSITIONS_STORAGE_KEY, JSON.stringify(newPositions));
        } catch (e) {
          console.error('Failed to remove window position from storage:', e);
        }
      }

      return { positions: newPositions };
    });
  },

  clearPositions: () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(POSITIONS_STORAGE_KEY);
      } catch (e) {
        console.error('Failed to clear window positions from storage:', e);
      }
    }
    set({ positions: {} });
  },

  loadPositions: (positions) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(POSITIONS_STORAGE_KEY, JSON.stringify(positions));
      } catch (e) {
        console.error('Failed to load window positions to storage:', e);
      }
    }
    set({ positions });
  },
}));
