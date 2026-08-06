import { FurniturePickupMode } from "@nitrodevco/nitro-api";

import { FurnitureImage, useInfostandFurniContext, useObjectInfostandContext } from "#base/components";
import { useLocalizationStore } from "#base/stores";
import { Border, Button, CloseButton } from "#base/theme";

export const InfostandFurniView = () => {
    const { furniData, canMove, canRotate, canUse, pickupMode, hasButtons, canSeeFurniId, godMode, processAction } = useInfostandFurniContext();
    const { onClose } = useObjectInfostandContext();
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);
    const getLocalizationValueParams = useLocalizationStore(x => x.getLocalizationValueParams);

    if (!furniData?.furnitureData) return null;

    return (
        <div className="flex flex-col items-end gap-2">
            <Border variant="1" className="infostand-container">
                <div className="infostand-header">
                    <div className="flex grow gap-1.25 items-center leading-0">
                        {furniData.name}
                    </div>
                    <CloseButton variant="1" className="infostand-close shrink-0" onClick={onClose} />
                </div>
                <hr className="infostand-separator" />
                <div className="flex w-full overflow-hidden items-center justify-center py-1.25">
                    <FurnitureImage type={furniData.furnitureData.className} colorIndex={furniData.furnitureData.colorIndex} direction={2} />
                </div>
                <hr className="infostand-separator" />
                <div className="flex w-full gap-1">
                    <p className="text-[9px] font-goldfish-bold">{getLocalizationValueParams('furni.owner', ['name'], [furniData.ownerName])}</p>
                    {canSeeFurniId && <p className="text-[9px] font-goldfish-bold">ID: {furniData.id}</p>}
                </div>
                <div className="flex w-full gap-1">
                    <Button>{getLocalizationValue('infostand.button.buy')}</Button>
                </div>
            </Border>
            {hasButtons && <div className="flex justify-end gap-2">
                {canMove && <Button variant="1" onClick={() => processAction('move')}>{getLocalizationValue('infostand.button.move')}</Button>}
                {canRotate && <Button variant="1" onClick={() => processAction('rotate')}>{getLocalizationValue('infostand.button.rotate')}</Button>}
                {pickupMode === FurniturePickupMode.Eject && <Button variant="1" onClick={() => processAction('eject')}>{getLocalizationValue(`infostand.button.eject`)}</Button>}
                {pickupMode === FurniturePickupMode.Full && <Button onClick={() => processAction('pickup')}>{getLocalizationValue(`infostand.button.pickup`)}</Button>}
                {canUse && <Button variant="1" onClick={() => processAction('use')}>{getLocalizationValue('infostand.button.use')}</Button>}
            </div>}
        </div>
    );
}
