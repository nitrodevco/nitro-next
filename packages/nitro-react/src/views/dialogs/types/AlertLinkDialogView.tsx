import { DialogButtonEnum, DialogUtilities, IDialogData } from "@nitrodevco/nitro-api";

import { useTranslation } from "#base/context";
import { useDialogEventDispatch } from "#base/context/dialog";
import { ButtonThick } from "#base/theme";

import { AlertDialogView } from "./AlertDialogView";

type AlertLinkDialogViewProps = {
    dialog: IDialogData;
}

export const AlertLinkDialogView = ({ dialog }: AlertLinkDialogViewProps) => {
    const dispatchDialogEvent = useDialogEventDispatch();

    const t = useTranslation();

    const linkTitle = DialogUtilities.resolveText(dialog.linkTitle, t);

    return (
        <AlertDialogView dialog={ dialog }>
            <ButtonThick variant="3" className="h-6 min-w-12.5 px-3" onClick={ () => dispatchDialogEvent(dialog.id, DialogButtonEnum.Link) }>
                { linkTitle }
            </ButtonThick>
        </AlertDialogView>
    );
}
