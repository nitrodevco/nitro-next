import { DialogTypeEnum } from "@nitrodevco/nitro-api";

import { DialogCenterView } from "#base/views/dialogs/DialogCenterView";

export const DialogComponent = () => {
    return (
        <>
            <DialogCenterView type={ DialogTypeEnum.Default } />
            <DialogCenterView type={ DialogTypeEnum.Modal } />
        </>
    );
}
