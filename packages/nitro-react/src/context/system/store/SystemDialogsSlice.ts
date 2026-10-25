/**
 * The client-wide dialogs `HabboWindowManagerComponent` raises for the whole client, open over
 * everything until they are answered:
 *
 * - `alert` / `alertWithModal` (`AlertDialog` on `habbo_window_alert`) and `notify`, which is the
 *   same non-modal alert with its arguments in another order - kind `alert`. Its callback hears
 *   `WE_OK` from the ok button and `WE_CANCEL` from the header close; here that is `onClose`.
 * - `confirm` / `confirmWithModal` (`ConfirmDialog` on `habbo_window_confirm`) - kind `confirm`.
 *   Its callback hears `WE_OK` from the ok button and `WE_CANCEL` from the cancel link and the
 *   header close; here those are `onConfirm` and `onCancel`, and `onClose` hears both.
 * - `simpleAlert` (`SimpleAlertDialog` on `simple_alert`, always modal) - kind `simpleAlert`,
 *   with Flash's caption, subtitle, message, link title and url, illustration, link callback and
 *   close callback.
 *
 * `alertWithLink` (`habbo_window_alert_link`) is not here: no Flash class of this revision calls it.
 *
 * Texts are shown as given, so pass them translated. Flash's `simpleAlert` also takes a map of
 * parameters it registers on the `${key}` texts; a caller here resolves those itself
 * (`getLocalizationValue(key, '', params)`) before passing the text.
 */
import { StateCreator } from 'zustand';

/** The `WindowEvent` type an `AlertDialog` / `ConfirmDialog` callback hears as the dialog is answered. */
export type SystemDialogCloseEvent = 'WE_OK' | 'WE_CANCEL';

export interface SystemDialogOptions {
    /** `alertWithModal` / `confirmWithModal`: built with `buildModalDialogFromXML` rather than on the desktop. */
    modal?: boolean;
    /**
     * The dialog's callback (`dialogEventProc` -> `_callback(this, event)`), run as the dialog is
     * answered and taken down: `WE_OK` from the ok button, `WE_CANCEL` from the header close (and
     * a confirmation's cancel link). A dialog taken down from outside (`closeDialog`, Flash's
     * `dispose()`) runs no callback.
     */
    onClose?: (event: SystemDialogCloseEvent) => void;
}

export interface SystemConfirmOptions extends SystemDialogOptions {
    /** `WE_CANCEL`: the cancel link or the header close. */
    onCancel?: () => void;
}

/** One `AlertDialog` or `ConfirmDialog`. */
export interface SystemMessageDialog {
    id: number;
    kind: 'alert' | 'confirm';
    title: string;
    message: string;
    modal: boolean;
    /** `WE_OK`: the ok button. */
    onConfirm?: () => void;
    onCancel?: () => void;
    onClose?: (event: SystemDialogCloseEvent) => void;
}

/** `IHabboWindowManager.simpleAlert`'s arguments, in its order. */
export interface SimpleAlert {
    caption: string;
    /** The red heading over the message; empty, `subtitle` is disposed. */
    subtitle?: string;
    /** `formatted_text`: markup is honoured. */
    message: string;
    /** The link under the button; shown only with a `linkUrl` or an `onLink` to follow. */
    linkTitle?: string;
    /** `event:<link>` goes to the client's link bus and closes the alert; anything else opens a web page. */
    linkUrl?: string;
    /** The `illustration` bitmap's asset name (`assetUri`); left out, it is disposed. */
    illustration?: string;
    /** Run from the link when there is no `linkUrl`; the alert then closes. */
    onLink?: () => void;
    /** Run whenever the alert closes. */
    onClose?: () => void;
}

export interface SystemSimpleAlertDialog extends SimpleAlert {
    id: number;
    kind: 'simpleAlert';
}

export type SystemDialog = SystemMessageDialog | SystemSimpleAlertDialog;

type State = {
    /** Every open dialog, oldest first. */
    dialogs: SystemDialog[];
};

type Actions = {
    /** `alert` (`alertWithModal` with `modal`); answers the dialog's id. */
    showAlert: (title: string, message: string, options?: SystemDialogOptions) => number;
    /** `confirm` (`confirmWithModal` with `modal`); answers the dialog's id. */
    showConfirm: (title: string, message: string, onConfirm: () => void, options?: SystemConfirmOptions) => number;
    /** `simpleAlert`; answers the dialog's id. */
    showSimpleAlert: (alert: SimpleAlert) => number;
    /** Takes the dialog down without running any of its callbacks - `dispose()` from outside. */
    closeDialog: (id: number) => void;
};

export const SystemDialogsSliceInitialState: State = {
    dialogs: [],
};

export type SystemDialogsSlice = State & Actions;

let nextDialogId = 1;

export const createSystemDialogsSlice: StateCreator<SystemDialogsSlice, [], [], SystemDialogsSlice> = (set) => {
    const add = (dialog: SystemDialog) => {
        set(x => ({ dialogs: [ ...x.dialogs, dialog ] }));

        return dialog.id;
    };

    return {
        ...SystemDialogsSliceInitialState,
        showAlert: (title, message, options) => add({ id: nextDialogId++, kind: 'alert', title, message, modal: options?.modal === true, onClose: options?.onClose }),
        showConfirm: (title, message, onConfirm, options) => add({ id: nextDialogId++, kind: 'confirm', title, message, modal: options?.modal === true, onConfirm, onCancel: options?.onCancel, onClose: options?.onClose }),
        showSimpleAlert: alert => add({ ...alert, id: nextDialogId++, kind: 'simpleAlert' }),
        closeDialog: id => set(x => (x.dialogs.some(dialog => dialog.id === id) ? { dialogs: x.dialogs.filter(dialog => dialog.id !== id) } : x)),
    };
};
