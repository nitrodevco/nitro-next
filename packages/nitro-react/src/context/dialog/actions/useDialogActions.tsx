import { useShallow } from "zustand/shallow";

import { useDialogContext } from "../useDialogContext";

export const useDialogActions = () => useDialogContext(useShallow(x => ({
    notify: x.notify,
    alert: x.alert,
    alertWithModal: x.alertWithModal,
    alertWithLink: x.alertWithLink,
    confirm: x.confirm,
    confirmWithModal: x.confirmWithModal,
    simpleAlert: x.simpleAlert,
})));
