import { DialogTypeEnum } from "@nitrodevco/nitro-api";

import { useDialogTypeIds } from "#base/context/dialog";
import { cn } from "#base/theme";

import { DialogLayoutView } from "./DialogLayoutView";

type DialogCenterViewProps = {
    type: DialogTypeEnum;
}

export const DialogCenterView = ({ type }: DialogCenterViewProps) => {
    const ids = useDialogTypeIds(type);

    const isModal = type === DialogTypeEnum.Modal;

    if (!ids.length) return null;

    const visibleIds = isModal ? ids.slice(-1) : ids;

    return (
        <div className={ cn('fixed inset-0 isolate grid place-items-center', isModal ? 'z-3000' : 'z-2000 pointer-events-none') }>
            { isModal && <div className="absolute inset-0 bg-black/75" /> }
            { visibleIds.map(id => <DialogLayoutView key={ id } id={ id } />) }
        </div>
    );
}
