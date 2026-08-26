import { NotificationExtension, NotificationExtensionEnum } from "@nitrodevco/nitro-api";
import type { StateCreator } from "zustand";

type State = {
    extensions: NotificationExtension[];
    cancelledExtensions: string[];
}

type Actions = {
    attachExtension: (extension: NotificationExtension) => void;
    detachExtension: (id: string, markCancelled?: boolean) => void;
    revealExtensionLink: (id: string) => void;
}

export const NotificationExtensionsSliceInitialState: State = {
    extensions: [],
    cancelledExtensions: []
};

export type NotificationExtensionsSlice = State & Actions;

export const createNotificationExtensionsSlice: StateCreator<NotificationExtensionsSlice, [], [], NotificationExtensionsSlice> = (set, get) => ({
    ...NotificationExtensionsSliceInitialState,
    attachExtension: (extension: NotificationExtension) => {
        const { extensions, cancelledExtensions } = get();

        if (extensions.some(item => item.id === extension.id)) return;

        if (cancelledExtensions.includes(extension.id)) return;

        set(x => ({ extensions: [...x.extensions, extension] }));
    },
    detachExtension: (id: string, markCancelled: boolean = false) => set(x => {
        if (!x.extensions.some(item => item.id === id)) return x;

        return {
            extensions: x.extensions.filter(item => item.id !== id),
            cancelledExtensions: markCancelled && !x.cancelledExtensions.includes(id)
                ? [...x.cancelledExtensions, id]
                : x.cancelledExtensions
        };
    }),
    revealExtensionLink: (id: string) => set(x => {
        const index = x.extensions.findIndex(item => item.id === id);

        if (index === -1) return x;

        const current = x.extensions[index];

        if (current.kind !== NotificationExtensionEnum.NewFeature || current.linkRevealed) return x;

        const extensions = [...x.extensions];

        extensions[index] = { ...current, linkRevealed: true };

        return { extensions };
    })
});
