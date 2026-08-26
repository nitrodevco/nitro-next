import { DialogTypeEnum } from "@nitrodevco/nitro-api";
import { useShallow } from "zustand/shallow";

import { useDialogContext } from "../useDialogContext";

export const useDialogTypeIds = (type: DialogTypeEnum) => useDialogContext(useShallow(x => x.dialogs.filter(dialog => dialog.type === type).map(dialog => dialog.id)));
