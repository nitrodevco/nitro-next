import { ModalDialog, TemplateWindow, TemplateWindows, useTemplateFrame } from '#base/theme';

/**
 * `IHabboWindowManager.simpleAlert` - `SimpleAlertDialog` over
 * `habbo-window-manager-com/simple_alert_xml`, built as a modal dialog (`buildModalDialogFromXML`): centred over the darkened
 * desktop, its header close disposed so only `close_button` closes it. The frame takes the caption,
 * `message` the message; the `subtitle`, the `link` and the `illustration` are each disposed when the
 * alert has none.
 *
 * Drawn by `SystemDialogsView` for every `simpleAlert` the system store holds.
 */
const TEMPLATE = 'habbo-window-manager-com/simple_alert_xml';

/** `SimpleAlertDialog.WINDOW_MARGIN`. */
const WINDOW_MARGIN = 10;

/** `resizeWindow`: the window is its `list` and this much more. */
const WINDOW_HEIGHT_MARGIN = 40;

export interface SimpleAlertViewProps {
    /** The dialog's id in the system store, which names its frame. */
    id: number;
    /** `caption` of the frame, as shown. */
    caption: string;
    /** The red heading over the message; left out or empty, `subtitle` is disposed. */
    subtitle?: string;
    /** The `formatted_text` message, as shown. */
    message: string;
    /** The link's caption; left out, `link` is disposed. */
    linkTitle?: string;
    onLink?: () => void;
    /** The `illustration` bitmap's asset (`assetUri`); left out, it is disposed. */
    illustration?: string;
    /** `close_button`. */
    onClose: () => void;
}

/**
 * `onIllustrationResized` once the illustration has its size - `list_top` moved right of it and at
 * least as tall, `list_bottom` and the window widened to match - then `resizeWindow`: the window
 * `list.height + 40` high.
 */
const arrange = (illustrated: boolean) => ({ find, root }: TemplateWindows) => {
    const window = root();
    const list = find('list');
    const listTop = find('list_top');
    const listBottom = find('list_bottom');
    const illustration = find('illustration');

    if (!window || !list || !listTop || !listBottom) return;

    if (illustrated && illustration && (illustration.width > 1)) {
        listTop.setX(illustration.width + WINDOW_MARGIN);
        listTop.setHeight(Math.max(listTop.height, illustration.height + WINDOW_MARGIN));
        listBottom.setWidth(listTop.x + listTop.width);
        window.setWidth(listTop.x + listTop.width + (2 * WINDOW_MARGIN));
    }

    window.setHeight(list.height + WINDOW_HEIGHT_MARGIN);
};

const arrangePlain = arrange(false);
const arrangeIllustrated = arrange(true);

export const SimpleAlertView = ({ id, caption, subtitle, message, linkTitle, onLink, illustration, onClose }: SimpleAlertViewProps) => {
    const frame = useTemplateFrame({ id: `simple_alert_${id}`, modal: true, rememberPosition: false, closeButtonVisible: false });

    return (
        <ModalDialog>
            <TemplateWindow
                id={TEMPLATE}
                frame={frame}
                bindings={{
                    '': { caption },
                    subtitle: { visible: !!subtitle, caption: subtitle ?? '' },
                    message: { caption: message },
                    close_button: { onPointerTap: onClose },
                    link: { visible: !!linkTitle, caption: linkTitle ?? '', onPointerTap: onLink },
                    illustration: { visible: !!illustration, asset: illustration ?? '' },
                }}
                arrange={illustration ? arrangeIllustrated : arrangePlain}
            />
        </ModalDialog>
    );
};
