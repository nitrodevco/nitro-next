import { openClientLink } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { SystemMessageDialog, SystemSimpleAlertDialog, useSystemStore, useTranslation, useWindowActions } from '#base/context/system';
import { Box, ButtonThick, Frame, ModalDialog, ReflectResize, Region, ThemeText } from '#base/theme';

import { SimpleAlertView } from './SimpleAlertView';

/** `_alert_frame`'s `margin_*` vars: the content box of both layouts. */
const FRAME_MARGINS = [ 6, 25, 6, 7 ] as const;

/**
 * The geometry of `habbo_window_alert` (`IHabboWindowManager.alert`) and `habbo_window_confirm`
 * (`confirm`): the frame, and the description text's box - `auto_size` left, `word_wrap`, never
 * under `height_min`.
 */
const LAYOUTS = {
    alert: { width: 278, height: 141, text: { left: 27, top: 14, width: 210, minHeight: 57 } },
    confirm: { width: 300, height: 165, text: { left: 16, top: 14, width: 253, minHeight: 72 } },
} as const;

/**
 * The client-wide dialogs of the system store (`SystemDialogsSlice`), the newest on top: every
 * `simpleAlert` is a `SimpleAlertView`, and the alerts and confirmations are drawn here.
 *
 * The alert and confirmation windows are `window/utils/AlertDialog` and `ConfirmDialog`, each a
 * style 3 frame tinted `0x418db0` that `window.center()` puts in the middle of the desktop - or,
 * built by `alertWithModal` / `confirmWithModal`, a `ModalDialog` over the darkened desktop.
 *
 * The description carries `reflect_vertical_resize_to_parent` (`ReflectResize`), so a text that
 * grows past its `height_min` grows the frame by as much; the buttons are anchored to the bottom and move with it.
 * An alert keeps only its `_alert_button_ok` (`alert` passes no button flags, which is ok only), the
 * `button_thick` in the middle of the centred `_alert_button_list`, its caption the layout's own
 * "Ok". A confirmation has the underlined `${generic.cancel}` link and the `${generic.ok}` button.
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
                window.open(linkUrl, '_blank', 'noopener');
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
            illustration={dialog.illustration}
            onClose={close}
        />
    );
};

const SystemMessageDialogView = ({ dialog }: { dialog: SystemMessageDialog }) => {
    const frame = <SystemMessageDialogFrame dialog={dialog} />;

    return dialog.modal ? <ModalDialog>{frame}</ModalDialog> : frame;
};

const SystemMessageDialogFrame = ({ dialog }: { dialog: SystemMessageDialog }) => {
    const t = useTranslation();
    const { closeDialog } = useWindowActions();
    const { width, height, text } = LAYOUTS[dialog.kind];

    // `WE_CANCEL`: the header close and the cancel link.
    const close = () => {
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

    return (
        <Frame
            variant="3"
            id={`system-dialog-${dialog.id}`}
            caption={dialog.title}
            tintColor="#418db0"
            onClose={close}
            centered={!dialog.modal}
            rememberPosition={false}
            resizeDirection="none"
            margins={FRAME_MARGINS}
            layout={dialog.modal ? { width, height } : { position: 'absolute', width, height }}
        >
            <ReflectResize
                height={text.minHeight}
                layout={{ position: 'absolute', left: text.left, top: text.top, width: text.width, minHeight: text.minHeight }}
            >
                <ThemeText
                    text={dialog.message}
                    textStyle="u_regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: text.width - 4 }}
                    verticalAlign="top"
                />
            </ReflectResize>
            {(dialog.kind === 'alert') && (
                <Box layout={{ position: 'absolute', left: 0, right: 0, bottom: 4, height: 24, flexDirection: 'row', justifyContent: 'center' }}>
                    <ButtonThick
                        variant="3"
                        onPointerTap={confirm}
                        layout={{ minWidth: 50, height: 24 }}
                    >
                        Ok
                    </ButtonThick>
                </Box>
            )}
            {(dialog.kind === 'confirm') && (
                <>
                    <Region
                        cursor="pointer"
                        onPointerTap={close}
                        layout={{ position: 'absolute', left: 20, bottom: 14, width: 100, flexDirection: 'row', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('generic.cancel')}
                            textStyle="u_regular"
                            flashFormat={{ underline: true }}
                            verticalAlign="top"
                        />
                    </Region>
                    <ButtonThick
                        variant="3"
                        tintColor="#efefef"
                        onPointerTap={confirm}
                        layout={{ position: 'absolute', left: 196, bottom: 7, minWidth: 50, height: 28 }}
                    >
                        {t('generic.ok')}
                    </ButtonThick>
                </>
            )}
        </Frame>
    );
};
