import { openClientLink } from '#base/commands';
import { useAlertIllustration } from '#base/context/client-modules';
import { useWebSocketContext } from '#base/context/communication';
import { SystemMessageDialog, SystemSimpleAlertDialog, useSystemStore, useWindowActions } from '#base/context/system';
import { ModalDialog, TemplateWindow, useTemplateFrame } from '#base/theme';
import { openWebPage } from '#base/utils';

import { SimpleAlertView } from './SimpleAlertView';

/**
 * The client-wide dialogs of the system store (`SystemDialogsSlice`), the newest on top: every
 * `simpleAlert` is a `SimpleAlertView`, and the alerts and confirmations are drawn here.
 */
export const SystemDialogsView = () => {
    const dialogs = useSystemStore(x => x.dialogs);

    return (
        <>
            {dialogs.map((dialog) => {
                if (dialog.kind === 'simpleAlert') {
                    return (
                        <SystemSimpleAlertView
                            key={dialog.id}
                            dialog={dialog}
                        />
                    );
                }

                return (
                    <SystemMessageDialogView
                        key={dialog.id}
                        dialog={dialog}
                    />
                );
            })}
        </>
    );
};

/**
 * `SimpleAlertDialog`'s behaviour around the view: `close_button` disposes it, which runs the
 * close callback; the link follows an `event:` url on the client's link bus and closes, opens any
 * other url as a web page and stays, and with no url runs the link callback and closes.
 */
const SystemSimpleAlertView = ({ dialog }: { dialog: SystemSimpleAlertDialog }) => {
    const { closeDialog } = useWindowActions();
    const { send } = useWebSocketContext();
    const linkUrl = dialog.linkUrl ?? '';
    const hasLink = !!dialog.linkTitle && (!!linkUrl || !!dialog.onLink);
    // A client module may give the alert another picture (`notifications.setIllustration`).
    const illustration = useAlertIllustration({ kind: 'alert', caption: dialog.caption, message: dialog.message, illustration: dialog.illustration });

    const close = () => {
        closeDialog(dialog.id);
        dialog.onClose?.();
    };

    const followLink = () => {
        if (linkUrl.length) {
            if (linkUrl.startsWith('event:')) {
                openClientLink(send, linkUrl.substring(6));
                close();
            } else {
                openWebPage(linkUrl);
            }

            return;
        }

        dialog.onLink?.();
        close();
    };

    return (
        <SimpleAlertView
            id={dialog.id}
            caption={dialog.caption}
            subtitle={dialog.subtitle}
            message={dialog.message}
            linkTitle={hasLink ? dialog.linkTitle : undefined}
            onLink={followLink}
            illustration={illustration}
            onClose={close}
        />
    );
};

/** `alert` passes no button flags, so `AlertDialog` keeps only `_alert_button_ok`; a confirmation has cancel and ok. */
const TEMPLATES = {
    alert: 'habbo-window-manager-com/habbo_window_alert_xml',
    confirm: 'habbo-window-manager-com/habbo_window_confirm_xml',
} as const;

/**
 * `window/utils/AlertDialog` and `ConfirmDialog` over `habbo_window_alert_xml` and
 * `habbo_window_confirm_xml`: the frame captioned with the title and the `DESCRIPTION`-tagged text
 * the message, centred (`window.center()`) - or, built by `alertWithModal` / `confirmWithModal`, a
 * modal dialog over the darkened desktop. An alert disposes its cancel and custom buttons. `WE_OK`
 * is the ok button; `WE_CANCEL` the header close and the cancel link.
 */
const SystemMessageDialogView = ({ dialog }: { dialog: SystemMessageDialog }) => {
    const { closeDialog } = useWindowActions();

    // `WE_CANCEL`: the header close and the cancel link.
    const cancel = () => {
        closeDialog(dialog.id);
        dialog.onCancel?.();
        dialog.onClose?.('WE_CANCEL');
    };

    // `WE_OK`.
    const confirm = () => {
        closeDialog(dialog.id);
        dialog.onConfirm?.();
        dialog.onClose?.('WE_OK');
    };

    const frame = useTemplateFrame({ id: `system_dialog_${dialog.id}`, modal: dialog.modal, centered: !dialog.modal, rememberPosition: false, onClose: cancel });

    const window = (
        <TemplateWindow
            id={TEMPLATES[dialog.kind]}
            frame={frame}
            bindings={{
                '': { caption: dialog.title },
                '#DESCRIPTION': { caption: dialog.message },
                _alert_button_ok: { ...((dialog.okCaption !== undefined) ? { caption: dialog.okCaption } : {}), onPointerTap: confirm },
                _alert_button_cancel: { visible: dialog.kind === 'confirm', onPointerTap: cancel },
                ...((dialog.kind === 'alert') ? { _alert_button_custom: { visible: false } } : {}),
            }}
        />
    );

    return dialog.modal ? <ModalDialog>{window}</ModalDialog> : window;
};
