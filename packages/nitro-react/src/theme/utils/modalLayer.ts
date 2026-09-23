/**
 * The state behind `ModalDialog` / `ModalLayer`: the one container that is context 3's desktop
 * (`ModalDialog.modalContext` - `getWindowContext(3)`), and the open modals in the order they were
 * built, which is the order Flash adds their background and dialog to its container. The newest
 * is the one whose background shows (`refresh()`'s `visible = i >= numChildren - 2`).
 */
import { Container } from 'pixi.js';

let modalLayer: Container | null = null;
let modalStack: readonly string[] = [];

const listeners = new Set<() => void>();

const emit = () => listeners.forEach(listener => listener());

/** For `useSyncExternalStore`: told whenever the layer or the stack changes. */
export const subscribeModalLayer = (listener: () => void) => {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
};

export const getModalLayer = (): Container | null => modalLayer;

export const setModalLayer = (node: Container | null) => {
    modalLayer = node;

    emit();
};

/** The open modals' ids, oldest first. */
export const getModalStack = (): readonly string[] => modalStack;

export const pushModal = (id: string) => {
    modalStack = [ ...modalStack, id ];

    emit();
};

export const removeModal = (id: string) => {
    modalStack = modalStack.filter(entry => (entry !== id));

    emit();
};

/** The containers `ModalDialog` has moved into the modal layer - where a `FloatingPopup` inside one stops. */
const modalDialogContainers = new WeakSet<Container>();

export const markModalDialogContainer = (node: Container, isModal: boolean) => {
    if (isModal) modalDialogContainers.add(node);
    else modalDialogContainers.delete(node);
};

/** Whether `node` is the container of an open modal dialog. */
export const isModalDialogContainer = (node: Container): boolean => modalDialogContainers.has(node);
