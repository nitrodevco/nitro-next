/**
 * The state behind `WindowLayer`: the one container that is window context 1's desktop -
 * `HabboWindowManagerComponent.getDesktop(1)`, what `buildFromXML(xml, 1)` adds a window to.
 *
 * Flash puts a window on its context's desktop wherever the code that built it sits: the room
 * info window `RoomInfoViewCtrl` builds from inside the room (`getXmlWindow('iro_room_details_framed')`,
 * context 1) is a child of the same desktop as the navigator and the catalog, so `activate()`
 * orders all of them together. A `Frame` is where React mounts it, and a frame mounted over the
 * room canvas is a sibling of the whole window layer rather than of the windows inside it: the
 * z-index `useFrameDrag` counts up for it sorts against nothing (the stage does not sort its
 * children), and no press can move it through the other windows. So a frame that is not already
 * on a desktop moves its container into this layer after mount, the way `ModalDialog` and
 * `FloatingPopup` move theirs.
 */
import { Container } from 'pixi.js';
import { createContext } from 'react';

let windowLayer: Container | null = null;

const listeners = new Set<() => void>();

/** For `useSyncExternalStore`: told whenever the layer is mounted or torn down. */
export const subscribeWindowLayer = (listener: () => void) => {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
};

export const getWindowLayer = (): Container | null => windowLayer;

export const setWindowLayer = (node: Container | null) => {
    windowLayer = node;

    listeners.forEach(listener => listener());
};

/**
 * True inside anything that already places a window of its own: the layer itself, and every
 * `Frame` (a frame nested in another one is part of that window, not a window of its own).
 */
export const WindowPlacedContext = createContext(false);
