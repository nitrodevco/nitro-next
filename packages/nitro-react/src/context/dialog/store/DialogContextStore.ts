import { DialogButtonEnum, DialogCallback, DialogEventTypeEnum, DialogFlagEnum, DialogKindEnum, DialogTypeEnum, DialogUtilities, IAlertDialogHandle, IAlertLinkDialogHandle, IDialogData, IDialogHandle, IDialogSimpleCallbacks, IDialogSimpleOptions } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

type State = {
    dialogs: IDialogData[];
}

type Actions = {
    notify: (title: string, summary: string, callback: DialogCallback | null, flags?: number) => IAlertDialogHandle;
    alert: (title: string, summary: string, flags: number, callback: DialogCallback | null) => IAlertDialogHandle;
    alertWithModal: (title: string, summary: string, flags: number, callback: DialogCallback | null) => IAlertDialogHandle;
    alertWithLink: (title: string, summary: string, linkTitle: string, linkUrl: string, flags: number, callback: DialogCallback | null) => IAlertLinkDialogHandle;
    confirm: (title: string, summary: string, flags: number, callback: DialogCallback | null) => IAlertDialogHandle;
    confirmWithModal: (title: string, summary: string, flags: number, callback: DialogCallback | null) => IAlertDialogHandle;
    simpleAlert: (title: string, subtitle: string, message: string, options?: IDialogSimpleOptions) => IDialogHandle;
    notificationPopup: (title: string, message: string, options?: IDialogSimpleOptions) => IDialogHandle;
    closeDialog: (id: number) => void;
    dispatchDialogEvent: (id: number, button: DialogButtonEnum) => void;
}

type DialogParts = {
    subtitle?: string;
    linkTitle?: string;
    linkUrl?: string;
    imageUrl?: string;
}

const isModalAlert = (kind: DialogKindEnum) => kind === DialogKindEnum.SimpleAlert || kind === DialogKindEnum.NotificationPopup;

const initialState: State = {
    dialogs: []
};

export type DialogContextStore = State & Actions;

export const createDialogContextStore = () => {
    const callbacks = new Map<number, DialogCallback | null>();
    const simpleCallbacks = new Map<number, IDialogSimpleCallbacks>();

    let nextId = 1;

    return createStore<DialogContextStore>()((set, get) => {
        const read = (id: number) => get().dialogs.find(dialog => dialog.id === id);

        const createHandle = ({ id, title, summary, linkTitle, linkUrl }: IDialogData): IAlertLinkDialogHandle => ({
            id,
            title,
            summary,
            linkTitle,
            linkUrl,
            get disposed() {
                return read(id) === undefined;
            },
            get callback() {
                return callbacks.get(id) ?? null;
            },
            set callback(value: DialogCallback | null) {
                callbacks.set(id, value);
            },
            dispose: () => get().closeDialog(id)
        });

        const openDialog = (kind: DialogKindEnum, modal: boolean, title: string, summary: string, flags: number, callback: DialogCallback | null, parts?: DialogParts) => {
            const id = nextId++;

            const dialog: IDialogData = {
                id,
                kind,
                type: modal ? DialogTypeEnum.Modal : DialogTypeEnum.Default,
                modal,
                flags: isModalAlert(kind) ? flags : DialogUtilities.resolveFlags(flags),
                title,
                subtitle: parts?.subtitle ?? '',
                summary,
                linkTitle: parts?.linkTitle ?? '',
                linkUrl: parts?.linkUrl ?? '',
                imageUrl: parts?.imageUrl ?? ''
            };

            callbacks.set(id, callback);

            set(x => ({ dialogs: [...x.dialogs, dialog] }));

            return createHandle(dialog);
        };

        const dispatchModalAlertEvent = (dialog: IDialogData, button: DialogButtonEnum) => {
            if (button !== DialogButtonEnum.Link) {
                get().closeDialog(dialog.id);

                return;
            }

            if (dialog.linkUrl.length) {
                if (DialogUtilities.isLinkEvent(dialog.linkUrl)) get().closeDialog(dialog.id);
                else window.open(dialog.linkUrl, 'habboMain');

                return;
            }

            const onLink = simpleCallbacks.get(dialog.id)?.onLink;

            if (!onLink) return;

            onLink();

            get().closeDialog(dialog.id);
        };

        return {
            ...initialState,
            notify: (title: string, summary: string, callback: DialogCallback | null, flags: number = 0) => openDialog(DialogKindEnum.Alert, false, title, summary, flags, callback),
            alert: (title: string, summary: string, flags: number, callback: DialogCallback | null) => openDialog(DialogKindEnum.Alert, false, title, summary, flags, callback),
            alertWithModal: (title: string, summary: string, flags: number, callback: DialogCallback | null) => openDialog(DialogKindEnum.Alert, true, title, summary, flags, callback),
            alertWithLink: (title: string, summary: string, linkTitle: string, linkUrl: string, flags: number, callback: DialogCallback | null) => openDialog(DialogKindEnum.AlertLink, false, title, summary, flags, callback, { linkTitle, linkUrl }),
            confirm: (title: string, summary: string, flags: number, callback: DialogCallback | null) => openDialog(DialogKindEnum.Confirm, false, title, summary, flags, callback),
            confirmWithModal: (title: string, summary: string, flags: number, callback: DialogCallback | null) => openDialog(DialogKindEnum.Confirm, true, title, summary, flags, callback),
            notificationPopup: (title: string, message: string, options: IDialogSimpleOptions = {}) => openDialog(DialogKindEnum.NotificationPopup, true, title, message, DialogFlagEnum.Null, null, {
                linkTitle: options.linkUrl?.length ? options.linkTitle : '',
                linkUrl: options.linkUrl,
                imageUrl: options.imageUrl
            }),
            simpleAlert: (title: string, subtitle: string, message: string, options: IDialogSimpleOptions = {}) => {
                const hasLink = !!options.linkTitle?.length && (!!options.linkUrl?.length || !!options.onLink);

                const handle = openDialog(DialogKindEnum.SimpleAlert, true, title, message, DialogFlagEnum.Null, null, {
                    subtitle,
                    linkTitle: hasLink ? options.linkTitle : '',
                    linkUrl: hasLink ? options.linkUrl : '',
                    imageUrl: options.imageUrl
                });

                if (options.onLink || options.onClose) simpleCallbacks.set(handle.id, { onLink: options.onLink, onClose: options.onClose });

                return handle;
            },
            closeDialog: (id: number) => {
                if (!read(id)) return;

                const onClose = simpleCallbacks.get(id)?.onClose;

                callbacks.delete(id);
                simpleCallbacks.delete(id);

                set(x => ({ dialogs: x.dialogs.filter(dialog => dialog.id !== id) }));

                if (onClose) onClose();
            },
            dispatchDialogEvent: (id: number, button: DialogButtonEnum) => {
                const dialog = read(id);

                if (!dialog) return;

                if (isModalAlert(dialog.kind)) {
                    dispatchModalAlertEvent(dialog, button);

                    return;
                }

                if (dialog.kind === DialogKindEnum.AlertLink && button === DialogButtonEnum.Link) {
                    window.open(dialog.linkUrl, '_empty');

                    return;
                }

                if (button === DialogButtonEnum.Custom) return;

                const callback = callbacks.get(id) ?? null;
                const type = button === DialogButtonEnum.Ok ? DialogEventTypeEnum.Ok : DialogEventTypeEnum.Cancel;

                if (callback) {
                    callback(createHandle(dialog), { type });

                    return;
                }

                if (dialog.kind !== DialogKindEnum.Confirm) get().closeDialog(id);
            }
        };
    });
};
