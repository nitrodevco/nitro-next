import { DialogButtonEnum, DialogFlagEnum, DialogKindEnum, DialogUtilities, IDialogData } from "@nitrodevco/nitro-api";
import DOMPurify from "dompurify";
import type { ReactNode } from "react";

import { useTranslation } from "#base/context";
import { useDialogEventDispatch } from "#base/context/dialog";
import { Button, ButtonThick, cn, Frame } from "#base/theme";

import { DialogLinkButtonView } from "../DialogLinkButtonView";

const DIALOG_WIDTHS: Partial<Record<DialogKindEnum, string>> = {
    [DialogKindEnum.Alert]: 'w-69.5',
    [DialogKindEnum.Confirm]: 'w-75',
    [DialogKindEnum.AlertLink]: 'w-69.5'
}

const DIALOG_BUTTON_ALIGNS: Partial<Record<DialogKindEnum, string>> = {
    [DialogKindEnum.Alert]: 'justify-center gap-8',
    [DialogKindEnum.Confirm]: 'justify-between gap-2',
    [DialogKindEnum.AlertLink]: 'justify-between gap-2'
}

const DIALOG_PADDINGS: Partial<Record<DialogKindEnum, string>> = {
    [DialogKindEnum.Alert]: 'px-6 pt-2 pb-1',
    [DialogKindEnum.Confirm]: 'px-4 pt-2 pb-1.75',
    [DialogKindEnum.AlertLink]: 'px-6 pt-2 pb-1'
}

type AlertDialogViewProps = {
    dialog: IDialogData;
    children?: ReactNode;
}

export const AlertDialogView = ({ dialog, children }: AlertDialogViewProps) => {
    const { id, kind, flags, title, summary, titleBarColor, captions } = dialog;

    const dispatchDialogEvent = useDialogEventDispatch();

    const t = useTranslation();

    const resolve = (value: string) => {
        const key = DialogUtilities.unwrapLocalizationKey(value);

        return t(key, key);
    }

    const hasFlag = (flag: DialogFlagEnum) => DialogUtilities.hasFlag(flags, flag);

    const body = resolve(summary);
    const okCaption = captions[DialogFlagEnum.ButtonOk]?.text ?? t('generic.ok', 'generic.ok');
    const bodyClassName = cn('text-style-u-regular', kind === DialogKindEnum.Confirm && 'min-h-18');

    return (
        <Frame
            variant="3"
            resizable={ false }
            className={ cn('h-fit', DIALOG_WIDTHS[kind]) }
            contentClassName={ cn('overflow-hidden', DIALOG_PADDINGS[kind]) }
            caption={ resolve(title) }
            tintColor={ titleBarColor ?? undefined }
            onClose={ () => dispatchDialogEvent(id, DialogButtonEnum.Close) }>
            { hasFlag(DialogFlagEnum.TextHtml)
                ? <div className={ bodyClassName } dangerouslySetInnerHTML={ { __html: DOMPurify.sanitize(body) } } />
                : <div className={ cn(bodyClassName, 'whitespace-pre-wrap') }>{ body }</div> }
            <div className={ cn('flex items-center mt-4', DIALOG_BUTTON_ALIGNS[kind]) }>
                { hasFlag(DialogFlagEnum.ButtonCancel) && (
                    <DialogLinkButtonView onClick={ () => dispatchDialogEvent(id, DialogButtonEnum.Cancel) }>
                        { captions[DialogFlagEnum.ButtonCancel]?.text ?? t('generic.cancel', 'generic.cancel') }
                    </DialogLinkButtonView>
                ) }
                { hasFlag(DialogFlagEnum.ButtonCustom) && (
                    <Button variant="3" className="h-6 min-w-12.5" onClick={ () => dispatchDialogEvent(id, DialogButtonEnum.Custom) }>
                        { captions[DialogFlagEnum.ButtonCustom]?.text ?? '' }
                    </Button>
                ) }
                { hasFlag(DialogFlagEnum.ButtonOk) && (kind === DialogKindEnum.AlertLink
                    ? <DialogLinkButtonView onClick={ () => dispatchDialogEvent(id, DialogButtonEnum.Ok) }>{ okCaption }</DialogLinkButtonView>
                    : <ButtonThick variant="3" className={ cn('min-w-12.5 px-3', kind === DialogKindEnum.Confirm ? 'h-7' : 'h-6') } onClick={ () => dispatchDialogEvent(id, DialogButtonEnum.Ok) }>{ okCaption }</ButtonThick>) }
                { children }
            </div>
        </Frame>
    );
}
