import { DialogButtonEnum, DialogUtilities, IDialogData } from "@nitrodevco/nitro-api";
import DOMPurify from "dompurify";

import { useTranslation } from "#base/context";
import { useDialogEventDispatch } from "#base/context/dialog";
import { ButtonThick, Frame } from "#base/theme";

import { DialogLinkButtonView } from "../DialogLinkButtonView";

type NotificationPopupDialogViewProps = {
    dialog: IDialogData;
}

export const NotificationPopupDialogView = ({ dialog }: NotificationPopupDialogViewProps) => {
    const { id, title, summary, linkTitle, linkUrl, imageUrl } = dialog;

    const dispatchDialogEvent = useDialogEventDispatch();

    const t = useTranslation();

    const resolve = (value: string) => DialogUtilities.resolveText(value, t);

    const message = DOMPurify.sanitize(resolve(summary).replace(/\r\n|\r|\n/g, '<br />'));
    const isLinkEvent = DialogUtilities.isLinkEvent(linkUrl);

    return (
        <Frame variant="3" resizable={ false } className="w-76.5 h-fit" contentClassName="px-2.5 pt-2 pb-1.5 overflow-hidden" caption={ resolve(title) } onClose={ () => dispatchDialogEvent(id, DialogButtonEnum.Close) }>
            <div className="flex gap-2.5">
                { !!imageUrl.length && <img src={ imageUrl } alt="" className="shrink-0 self-start pixel-art" /> }
                <div className="text-style-il-regular flex-1 min-w-0 wrap-break-word" dangerouslySetInnerHTML={ { __html: message } } />
            </div>
            { !!linkTitle.length && (
                <div className="flex justify-center items-center mt-2">
                    { isLinkEvent
                        ? <ButtonThick variant="3" className="h-7 px-6" onClick={ () => dispatchDialogEvent(id, DialogButtonEnum.Link) }>{ resolve(linkTitle) }</ButtonThick>
                        : <DialogLinkButtonView className="text-style-il-regular" onClick={ () => dispatchDialogEvent(id, DialogButtonEnum.Link) }>{ resolve(linkTitle) }</DialogLinkButtonView> }
                </div>
            ) }
        </Frame>
    );
}
