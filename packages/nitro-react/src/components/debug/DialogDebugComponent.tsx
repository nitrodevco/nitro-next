import { DialogCallback, DialogFlagEnum, DialogTypeEnum, DialogUtilities } from "@nitrodevco/nitro-api";
import { useShallow } from "zustand/shallow";

import { useDialogActions, useDialogContext } from "#base/context/dialog";

import { DebugButton, DebugPanel, DebugSection } from "./DebugPanel";

const DEBUG_IMAGE_URL = '/assets/flash/notifications/frank.gif';
const DEBUG_LINK_URL = 'https://www.habbo.com';
const DEBUG_EVENT_URL = 'event:navigator/goto/1';

const OK_ONLY = DialogFlagEnum.TextTitle | DialogFlagEnum.TextSummary | DialogFlagEnum.ButtonOk;
const OK_CANCEL = OK_ONLY | DialogFlagEnum.ButtonCancel;
const CANCEL_ONLY = DialogFlagEnum.TextTitle | DialogFlagEnum.TextSummary | DialogFlagEnum.ButtonCancel;
const NO_TITLE = DialogFlagEnum.TextSummary | DialogFlagEnum.ButtonOk;
const WITH_ICON = OK_ONLY | DialogFlagEnum.BitmapIcon;
const WITH_HTML = OK_ONLY | DialogFlagEnum.TextHtml;

const LONG_SUMMARY = 'A deliberately long summary so the dialog grows past its nominal height and you can watch the text wrap, the frame stretch and the buttons stay centered at the bottom of the content area.';

const log = (label: string): DialogCallback => (handle, event) => console.log(`[debug] ${ label }`, handle.id, event.type, handle.disposed ? 'disposed' : 'open');

export const DialogDebugComponent = () => {
    const { notify, alert, alertWithModal, alertWithLink, confirm, confirmWithModal, simpleAlert, notificationPopup } = useDialogActions();

    const closeDialog = useDialogContext(x => x.closeDialog);
    const ids = useDialogContext(useShallow(x => x.dialogs.map(dialog => dialog.id)));
    const modalCount = useDialogContext(x => x.dialogs.filter(dialog => dialog.type === DialogTypeEnum.Modal).length);

    const closeAll = () => ids.forEach(id => closeDialog(id));

    return (
        <DebugPanel
            title="Dialogs debug"
            label="Debug Dialogs"
            className="left-76"
            status={ `open ${ ids.length } · modal ${ modalCount } · default ${ ids.length - modalCount }` }>
            <DebugSection title="Alerts">
                <DebugButton onClick={ () => notify('Notification', 'notify() resolves flags to the default set.', null) }>notify</DebugButton>
                <DebugButton onClick={ () => alert('Alert', 'alert() with flags 0, so DEFAULT_FLAGS apply.', DialogFlagEnum.Null, null) }>alert</DebugButton>
                <DebugButton onClick={ () => alertWithModal('Modal alert', 'Rendered on the modal layer, above the default one.', DialogFlagEnum.Null, null) }>alert modal</DebugButton>
                <DebugButton onClick={ () => confirm('Confirm', 'A callback keeps this one open until you dispose it.', OK_CANCEL, log('confirm')) }>confirm</DebugButton>
                <DebugButton onClick={ () => confirmWithModal('Modal confirm', 'Same as confirm, on the modal layer.', OK_CANCEL, log('confirm modal')) }>confirm modal</DebugButton>
                <DebugButton onClick={ () => confirm('Confirm without callback', 'No callback, so Confirm stays open on both buttons.', OK_CANCEL, null) }>confirm no cb</DebugButton>
                <DebugButton onClick={ () => alertWithLink('Update available', 'The link button opens a new window instead of firing the callback.', 'Open habbo.com', DEBUG_LINK_URL, DialogFlagEnum.Null, null) }>alert + link</DebugButton>
            </DebugSection>
            <DebugSection title="Flags">
                <DebugButton onClick={ () => alert('Ok only', `flags ${ OK_ONLY }`, OK_ONLY, null) }>ok</DebugButton>
                <DebugButton onClick={ () => alert('Ok and cancel', `flags ${ OK_CANCEL }`, OK_CANCEL, log('ok+cancel')) }>ok + cancel</DebugButton>
                <DebugButton onClick={ () => alert('Cancel only', `flags ${ CANCEL_ONLY }`, CANCEL_ONLY, log('cancel')) }>cancel</DebugButton>
                <DebugButton onClick={ () => alert('Hidden title', `flags ${ NO_TITLE }, TextTitle is off.`, NO_TITLE, null) }>no title</DebugButton>
                <DebugButton onClick={ () => alert('Bitmap icon', `flags ${ WITH_ICON }`, WITH_ICON, null) }>icon</DebugButton>
                <DebugButton onClick={ () => alert('Html text', 'Summary flagged as <b>html</b>.', WITH_HTML, null) }>html</DebugButton>
                <DebugButton onClick={ () => alert('Every flag', 'All 13 bits set at once.', 4095, log('all flags')) }>all flags</DebugButton>
            </DebugSection>
            <DebugSection title="simpleAlert">
                <DebugButton onClick={ () => simpleAlert('Simple alert', '', 'No subtitle, no image, no link.') }>plain</DebugButton>
                <DebugButton onClick={ () => simpleAlert('Simple alert', 'With a subtitle', 'The subtitle sits between the title bar and the message.') }>subtitle</DebugButton>
                <DebugButton onClick={ () => simpleAlert('Simple alert', 'With an image', 'The image renders above the message.', { imageUrl: DEBUG_IMAGE_URL }) }>image</DebugButton>
                <DebugButton onClick={ () => simpleAlert('Simple alert', '', 'An http link opens the page and keeps the dialog open.', { linkTitle: 'Open habbo.com', linkUrl: DEBUG_LINK_URL }) }>http link</DebugButton>
                <DebugButton onClick={ () => simpleAlert('Simple alert', '', 'An event link closes the dialog.', { linkTitle: 'Go to room', linkUrl: DEBUG_EVENT_URL }) }>event link</DebugButton>
                <DebugButton onClick={ () => simpleAlert('Simple alert', '', 'onLink runs, then the dialog closes.', { linkTitle: 'Run callback', onLink: () => console.log('[debug] simpleAlert onLink') }) }>onLink</DebugButton>
                <DebugButton onClick={ () => simpleAlert('Simple alert', '', 'onClose runs when the dialog is disposed.', { onClose: () => console.log('[debug] simpleAlert onClose') }) }>onClose</DebugButton>
                <DebugButton onClick={ () => simpleAlert('Dropped link', '', 'linkTitle without linkUrl or onLink is discarded.', { linkTitle: 'Never rendered' }) }>orphan link</DebugButton>
            </DebugSection>
            <DebugSection title="notificationPopup">
                <DebugButton onClick={ () => notificationPopup('Hotel announcement', 'A server driven popup with no extras.') }>plain</DebugButton>
                <DebugButton onClick={ () => notificationPopup('Hotel announcement', 'With an image above the message.', { imageUrl: DEBUG_IMAGE_URL }) }>image</DebugButton>
                <DebugButton onClick={ () => notificationPopup('Read more', 'An http link opens the page and keeps the popup open.', { linkTitle: 'Open habbo.com', linkUrl: DEBUG_LINK_URL }) }>http link</DebugButton>
                <DebugButton onClick={ () => notificationPopup('Internal link', 'An event link closes the popup.', { linkTitle: 'Go', linkUrl: DEBUG_EVENT_URL }) }>event link</DebugButton>
            </DebugSection>
            <DebugSection title="Text">
                <DebugButton onClick={ () => alert('Long summary', LONG_SUMMARY, DialogFlagEnum.Null, null) }>long text</DebugButton>
                <DebugButton onClick={ () => alert('Line breaks', DialogUtilities.parseLineBreaks('Line one.\\rLine two.\\rLine three.'), DialogFlagEnum.Null, null) }>line breaks</DebugButton>
                <DebugButton onClick={ () => alert('${generic.alert.title}', '${generic.alert.default}', DialogFlagEnum.Null, null) }>localization key</DebugButton>
                <DebugButton onClick={ () => simpleAlert('${generic.alert.title}', '', LONG_SUMMARY, { imageUrl: DEBUG_IMAGE_URL, linkTitle: 'Open habbo.com', linkUrl: DEBUG_LINK_URL }) }>simple, everything</DebugButton>
            </DebugSection>
            <DebugSection title="Pipeline">
                <DebugButton onClick={ () => { alert('Stacked 1', 'Three default dialogs at once.', DialogFlagEnum.Null, null); alert('Stacked 2', 'Three default dialogs at once.', DialogFlagEnum.Null, null); alert('Stacked 3', 'Three default dialogs at once.', DialogFlagEnum.Null, null); } }>stack x3</DebugButton>
                <DebugButton onClick={ () => { alert('Under the modal', 'Opened first, on the default layer.', DialogFlagEnum.Null, null); alertWithModal('Over the alert', 'Opened second, on the modal layer.', DialogFlagEnum.Null, null); } }>default + modal</DebugButton>
                <DebugButton onClick={ () => { const handle = alert('Handle', 'Opened and disposed from its own handle.', DialogFlagEnum.Null, null); console.log('[debug] handle', handle.id, 'disposed', handle.disposed); handle.dispose(); console.log('[debug] handle', handle.id, 'disposed', handle.disposed); } }>handle dispose</DebugButton>
                <DebugButton onClick={ closeAll }>close all</DebugButton>
            </DebugSection>
        </DebugPanel>
    );
}
