import { useDialogContext } from "../useDialogContext";

export const useDialogEventDispatch = () => useDialogContext(x => x.dispatchDialogEvent);
