import { SystemDialog, useSystemStore, useTranslation, useWindowActions } from '#base/context/system';
import { Border, Box, Button, Frame, ThemeText } from '#base/theme';

const DIALOG_WIDTH = 260;

/**
 * The client-wide alert and confirmation windows - what Flash's window manager built for
 * `alert(title, text)` and `confirm(title, text, callback)`. Each is its own small frame, the
 * newest on top.
 */
export const SystemDialogsView = () => {
    const dialogs = useSystemStore(x => x.dialogs);

    return (
        <>
            {dialogs.map((dialog, index) => (
                <SystemDialogView
                    key={dialog.id}
                    dialog={dialog}
                    offset={index * 16}
                />
            ))}
        </>
    );
};

const SystemDialogView = ({ dialog, offset }: { dialog: SystemDialog; offset: number }) => {
    const t = useTranslation();
    const { closeDialog } = useWindowActions();

    const close = () => closeDialog(dialog.id);

    const confirm = () => {
        closeDialog(dialog.id);
        dialog.onConfirm?.();
    };

    return (
        <Frame
            variant="0"
            id={`system-dialog-${dialog.id}`}
            caption={dialog.title}
            onClose={close}
            defaultPosition={{ x: 360 + offset, y: 160 + offset }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: DIALOG_WIDTH, height: 170 }}
        >
            <Border layout={{ minHeight: 80, paddingLeft: 9, paddingRight: 9, paddingTop: 6, paddingBottom: 6 }}>
                <ThemeText
                    layout={{ flex: 1 }}
                    text={dialog.message}
                    textStyle="text-style-regular"
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: DIALOG_WIDTH - 30 }}
                />
            </Border>
            <Box layout={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 3 }}>
                {(dialog.kind === 'confirm') && (
                    <Button
                        layout={{ height: 22, minWidth: 60 }}
                        onPointerTap={close}
                    >
                        {t('generic.cancel')}
                    </Button>
                )}
                <Button
                    layout={{ height: 22, minWidth: 60 }}
                    onPointerTap={confirm}
                >
                    {t('generic.ok')}
                </Button>
            </Box>
        </Frame>
    );
};
