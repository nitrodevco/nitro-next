import { useDialogContext } from "../useDialogContext";

export const useDialog = (id: number) => useDialogContext(x => x.dialogs.find(dialog => dialog.id === id));
