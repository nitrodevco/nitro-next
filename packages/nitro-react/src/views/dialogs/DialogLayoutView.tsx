import { DialogKindEnum } from "@nitrodevco/nitro-api";

import { useDialog } from "#base/context/dialog";

import { AlertDialogView } from "./types/AlertDialogView";
import { AlertLinkDialogView } from "./types/AlertLinkDialogView";
import { ConfirmDialogView } from "./types/ConfirmDialogView";
import { SimpleAlertDialogView } from "./types/SimpleAlertDialogView";

type DialogLayoutViewProps = {
    id: number;
}

export const DialogLayoutView = ({ id }: DialogLayoutViewProps) => {
    const dialog = useDialog(id);

    if (!dialog) return null;

    switch (dialog.kind) {
        case DialogKindEnum.Confirm:
            return <ConfirmDialogView dialog={ dialog } />;
        case DialogKindEnum.AlertLink:
            return <AlertLinkDialogView dialog={ dialog } />;
        case DialogKindEnum.SimpleAlert:
            return <SimpleAlertDialogView dialog={ dialog } />;
        default:
            return <AlertDialogView dialog={ dialog } />;
    }
}
