import { DialogButtonEnum, DialogUtilities, IDialogData } from "@nitrodevco/nitro-api";
import DOMPurify from "dompurify";

import { useTranslation } from "#base/context";
import { useDialogEventDispatch } from "#base/context/dialog";
import { ButtonThick, Frame } from "#base/theme";

import { DialogLinkButtonView } from "../DialogLinkButtonView";

type SimpleAlertDialogViewProps = {
    dialog: IDialogData;
}

export const SimpleAlertDialogView = ({ dialog }: SimpleAlertDialogViewProps) => {
    const { id, title, subtitle, summary, linkTitle, imageUrl } = dialog;

    const dispatchDialogEvent = useDialogEventDispatch();

    const t = useTranslation();

    const resolve = (value: string) => {
        const key = DialogUtilities.unwrapLocalizationKey(value);

        return t(key, key);
    }

    const message = DOMPurify.sanitize(resolve(summary).replace(/\r\n|\r|\n/g, '<br />'));

    const close = () => dispatchDialogEvent(id, DialogButtonEnum.Close);

    return (
        <Frame variant="3" resizable={ false } closable={ false } className="w-fit h-fit" contentClassName="px-2.5 pt-2! pb-1.5! overflow-hidden" caption={ resolve(title) }>
            <div className="flex gap-2.5">
                { !!imageUrl.length && <img src={ imageUrl } alt="" className="shrink-0 self-start pixel-art" /> }
                <div className="flex flex-col gap-0.5 w-72.75">
                    { !!subtitle.length && <div className="text-style-headline-small text-[#c30000]">{ resolve(subtitle) }</div> }
                    <div className="text-style-il-regular" dangerouslySetInnerHTML={ { __html: message } } />
                </div>
            </div>
            <div className="flex flex-col items-center gap-1.25 mt-0.75 pt-3 border-t border-black/15">
                <ButtonThick variant="3" className="h-7 w-31.5" onClick={ close }>
                    { t('alert.close.button', 'alert.close.button') }
                </ButtonThick>
                { !!linkTitle.length && (
                    <DialogLinkButtonView className="text-style-il-regular" onClick={ () => dispatchDialogEvent(id, DialogButtonEnum.Link) }>
                        { resolve(linkTitle) }
                    </DialogLinkButtonView>
                ) }
            </div>
        </Frame>
    );
}
