import { IDialogData } from "@nitrodevco/nitro-api";

import { AlertDialogView } from "./AlertDialogView";

type ConfirmDialogViewProps = {
    dialog: IDialogData;
}

export const ConfirmDialogView = ({ dialog }: ConfirmDialogViewProps) => <AlertDialogView dialog={ dialog } />;
